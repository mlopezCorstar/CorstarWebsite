import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const rateLimitMap = new Map<string, number>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);
  
  if (lastRequest && now - lastRequest < 10000) {
    return false;
  }
  
  rateLimitMap.set(ip, now);
  
  if (rateLimitMap.size > 1000) {
    const entries = Array.from(rateLimitMap.entries());
    entries.sort((a, b) => a[1] - b[1]);
    entries.slice(0, 500).forEach(([key]) => rateLimitMap.delete(key));
  }
  
  return true;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again in 10 seconds.' }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const payload = await req.json();
    
    const { full_name, email, phone, company, service, message, source } = payload;
    
    if (!full_name || !email) {
      return new Response(
        JSON.stringify({ error: 'Full name and email are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { error: leadError } = await supabase
      .from('leads')
      .insert({
        full_name,
        email,
        phone,
        company,
        service,
        message,
        source,
      });

    if (leadError) {
      console.error('Lead insert error:', leadError);
      return new Response(
        JSON.stringify({ error: 'Failed to submit lead' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    await supabase.from('events').insert({
      name: 'form_submitted',
      payload: {
        type: 'lead',
        source,
        email,
      },
    });

    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});