export type CTAIntent = 'quote' | 'contact' | 'callback';

export type CTAAction =
  | {
      type: 'inquiry';
      intent: CTAIntent;
      source: string;
      title?: string;
      buttonText?: string;
      prefilledService?: string;
    }
  | { type: 'scroll'; targetId: string }
  | { type: 'link'; url: string; newTab?: boolean }
  | { type: 'tel'; phone: string }
  | { type: 'mailto'; email: string };

export const ctaMap: Record<string, CTAAction> = {
  'cta-hero-primary': {
    type: 'inquiry',
    intent: 'quote',
    source: 'hero_cta',
    title: 'Request a Quote',
    buttonText: 'Request Quote'
  },
  'cta-hero-secondary': {
    type: 'scroll',
    targetId: 'services'
  },
  'cta-services-cabling': {
    type: 'inquiry',
    intent: 'contact',
    source: 'services_cabling',
    prefilledService: 'Structured Cabling'
  },
  'cta-services-it': {
    type: 'inquiry',
    intent: 'contact',
    source: 'services_it',
    prefilledService: 'Managed IT Services'
  },
  'cta-pricing-quote': {
    type: 'inquiry',
    intent: 'quote',
    source: 'pricing_quote',
    title: 'Request a Quote',
    buttonText: 'Request Quote'
  },
  'cta-compliance-assessment': {
    type: 'inquiry',
    intent: 'quote',
    source: 'compliance_assessment',
    title: 'Schedule a Compliance Assessment',
    buttonText: 'Request Assessment'
  },
  'cta-about-contact': {
    type: 'inquiry',
    intent: 'contact',
    source: 'about_contact'
  },
  'cta-services-consultation': {
    type: 'inquiry',
    intent: 'quote',
    source: 'services_consultation',
    title: 'Schedule a Consultation',
    buttonText: 'Request Consultation'
  },
  'cta-schedule': {
    type: 'link',
    url: import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com',
    newTab: true
  },
  'cta-call': {
    type: 'tel',
    phone: '+19143472700'
  },
  'cta-email': {
    type: 'mailto',
    email: 'info@corstar.com'
  },
  'cta-footer-contact': {
    type: 'inquiry',
    intent: 'contact',
    source: 'footer_cta'
  },
};

export interface InquiryModalConfig {
  intent: CTAIntent;
  source: string;
  title?: string;
  buttonText?: string;
  prefilledService?: string;
}

export function handleCTAClick(
  ctaId: string,
  openInquiryModal?: (config: InquiryModalConfig) => void
) {
  const action = ctaMap[ctaId];
  if (!action) return;

  switch (action.type) {
    case 'inquiry':
      if (openInquiryModal) {
        openInquiryModal({
          intent: action.intent,
          source: action.source,
          title: action.title,
          buttonText: action.buttonText,
          prefilledService: action.prefilledService
        });
      }
      break;
    case 'scroll':
      const element = document.getElementById(action.targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      break;
    case 'link':
      if (action.newTab) {
        window.open(action.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = action.url;
      }
      break;
    case 'tel':
      window.location.href = `tel:${action.phone}`;
      break;
    case 'mailto':
      window.location.href = `mailto:${action.email}`;
      break;
  }
}
