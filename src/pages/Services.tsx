import { useState } from 'react';
import { Network, Shield, Cloud, Cable, Phone, Video, Server, Mail, Users, Wrench, ChevronDown } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import { handleCTAClick } from '../utils/cta';

const services = [
  {
    icon: Network,
    title: 'Managed IT Services',
    description: 'Comprehensive IT management and support for your entire infrastructure',
    details: [
      '24/7/365 Network Monitoring & Management',
      'Remote & On-site Helpdesk Support',
      'Endpoint Management & Patch Management',
      'Proactive Maintenance & System Updates',
      'IT Asset Management & Documentation',
      'Strategic IT Planning & Consulting'
    ]
  },
  {
    icon: Shield,
    title: 'Network Security',
    description: 'Enterprise-grade security solutions to protect your business',
    details: [
      'Next-Generation Firewall Configuration',
      'Advanced Threat Detection & Response',
      'Security Compliance (HIPAA, PCI-DSS, SOC 2)',
      'Vulnerability Assessments & Penetration Testing',
      'Email Security & Anti-Phishing Protection',
      'Security Awareness Training'
    ]
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Secure cloud migration, management, and optimization services',
    details: [
      'Cloud Migration & Strategy Consulting',
      'Microsoft 365 & Azure Implementation',
      'Cloud Backup & Disaster Recovery',
      'Hybrid Cloud Architecture',
      'Cloud Cost Optimization',
      'Cloud Security & Compliance'
    ]
  },
  {
    icon: Cable,
    title: 'Structured Cabling',
    description: 'Professional network infrastructure installation and certification',
    details: [
      'Cat6 & Cat6a Installation',
      'Fiber Optic Cabling & Termination',
      'Cable Certification & Testing',
      'Rack & Cabinet Installation',
      'Wireless Access Point Installation',
      'Data Center Cabling Solutions'
    ]
  },
  {
    icon: Phone,
    title: 'VoIP Phone Systems',
    description: 'Modern voice communication solutions for businesses',
    details: [
      'Cloud-based & On-premise VoIP Solutions',
      'Unified Communications Platforms',
      'Call Recording & Analytics',
      'Auto-Attendant & Call Routing',
      'Mobile Integration & Softphones',
      'SIP Trunking & Number Porting'
    ]
  },
  {
    icon: Server,
    title: 'Virtualization',
    description: 'Optimize resources with enterprise virtualization solutions',
    details: [
      'VMware & Hyper-V Implementation',
      'Virtual Desktop Infrastructure (VDI)',
      'Server Consolidation & Migration',
      'High Availability & Disaster Recovery',
      'Performance Monitoring & Optimization',
      'Virtual Environment Management'
    ]
  },
  {
    icon: Video,
    title: 'Video Conferencing',
    description: 'Professional video collaboration solutions',
    details: [
      'Zoom, Microsoft Teams, & Webex Setup',
      'Conference Room System Design',
      'Audio/Visual Equipment Installation',
      'Screen Sharing & Collaboration Tools',
      'Video Conference Integration',
      'Training & User Support'
    ]
  },
  {
    icon: Mail,
    title: 'Hosted Email',
    description: 'Secure and reliable email hosting solutions',
    details: [
      'Microsoft 365 Email Migration',
      'Email Encryption & Archiving',
      'Spam & Malware Filtering',
      'Mobile Device Synchronization',
      'Shared Calendars & Contacts',
      'Email Backup & Recovery'
    ]
  },
  {
    icon: Users,
    title: 'IT Consulting',
    description: 'Strategic technology guidance for business growth',
    details: [
      'IT Strategy & Roadmap Development',
      'Technology Assessment & Audit',
      'Vendor Management & Negotiation',
      'IT Budgeting & Cost Analysis',
      'Digital Transformation Planning',
      'Business Continuity Planning'
    ]
  },
  {
    icon: Wrench,
    title: 'Staff Augmentation',
    description: 'Expert IT professionals to supplement your team',
    details: [
      'Temporary & Project-based IT Staff',
      'Specialized Technical Expertise',
      'Network Engineers & System Admins',
      'Security Specialists & Consultants',
      'Flexible Engagement Models',
      'Knowledge Transfer & Documentation'
    ]
  }
];

function ServiceAccordion({ service, isOpen, onToggle }: { service: typeof services[0]; isOpen: boolean; onToggle: () => void }) {
  const Icon = service.icon;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
            <p className="text-slate-600 mt-1">{service.description}</p>
          </div>
        </div>
        <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="px-6 py-6 bg-slate-50 border-t border-slate-200">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openInquiryModal } = useModal();

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive IT solutions tailored to your business needs. From infrastructure to security,
            we've got you covered with 55+ years of expertise.
          </p>
        </div>

        <div className="space-y-4">
          {services.map((service, idx) => (
            <ServiceAccordion
              key={idx}
              service={service}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl mb-6 text-blue-50">
            Every business is unique. Let's discuss how we can tailor our services to meet your specific needs.
          </p>
          <button
            id="cta-services-consultation"
            onClick={() => handleCTAClick('cta-services-consultation', openInquiryModal)}
            className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
