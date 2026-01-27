import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface InquiryData {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  service?: string;
  timeline?: string;
  budget_range?: string;
  details?: string;
  source: string;
  intent: 'quote' | 'contact' | 'callback';
}

const rateLimitMap = new Map<string, number>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);
  
  if (lastRequest && now - lastRequest < 10000) {
    return false;
  }
  
  rateLimitMap.set(ip, now);
  
  setTimeout(() => {
    rateLimitMap.delete(ip);
  }, 10000);
  
  return true;
}

function validateInquiry(data: InquiryData): { valid: boolean; error?: string } {
  if (!data.intent || !['quote', 'contact', 'callback'].includes(data.intent)) {
    return { valid: false, error: 'Invalid intent type' };
  }

  if (!data.source || typeof data.source !== 'string') {
    return { valid: false, error: 'Source is required' };
  }

  switch (data.intent) {
    case 'contact':
      if (!data.full_name?.trim() || !data.email?.trim()) {
        return { valid: false, error: 'Full name and email are required' };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return { valid: false, error: 'Invalid email address' };
      }
      break;

    case 'quote':
      if (!data.full_name?.trim() || !data.email?.trim() || !data.location?.trim() || !data.timeline?.trim() || !data.budget_range?.trim()) {
        return { valid: false, error: 'Full name, email, location, timeline, and budget range are required for quotes' };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return { valid: false, error: 'Invalid email address' };
      }
      break;

    case 'callback':
      if (!data.full_name?.trim() || !data.phone?.trim()) {
        return { valid: false, error: 'Full name and phone number are required for callbacks' };
      }
      break;
  }

  return { valid: true };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again in a few seconds.' }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data: InquiryData = await req.json();

    const validation = validateInquiry(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabase.from('inquiries').insert({
      full_name: data.full_name,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
      location: data.location || null,
      service: data.service || null,
      timeline: data.timeline || null,
      budget_range: data.budget_range || null,
      details: data.details || null,
      source: data.source,
      intent: data.intent,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save inquiry' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
