import { Shield, FileCheck, Eye, ArrowRight } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import { handleCTAClick } from '../utils/cta';

const services = [
  {
    icon: Shield,
    title: 'Multi-Factor Authentication Setup',
    description: 'Implement robust MFA across all critical systems to meet regulatory requirements.',
  },
  {
    icon: Eye,
    title: 'Asset Inventory & Vulnerability Management',
    description: 'Complete visibility into your IT assets with continuous vulnerability scanning and remediation.',
  },
  {
    icon: FileCheck,
    title: 'Incident Response Planning & Ongoing Monitoring',
    description: 'Comprehensive incident response procedures with 24/7 security monitoring and rapid response.',
  },
];

export default function ComplianceSection() {
  const { openInquiryModal } = useModal();

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNDgsIDE2MywgMTg0LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60"></div>

      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg">
              Deadline: November 2025
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Is Your Business Ready for New York's<br />
            <span className="text-blue-600">2025 Cybersecurity Deadline?</span>
          </h2>

          <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
            The updated <span className="font-semibold">NY DFS Cybersecurity Regulation (23 NYCRR 500)</span> requires stronger data protection for financial, legal, and professional firms by November 2025. Corstar helps you meet every requirement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200"
            >
              <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl group-hover:from-blue-600 group-hover:to-blue-500 transition-all duration-300">
                <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" strokeWidth={2} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="mb-8">
            <p className="text-xl font-semibold text-slate-800 mb-6">
              Stay compliant, secure, and stress-free.
            </p>
          </div>

          <button
            id="cta-compliance-assessment"
            onClick={() => handleCTAClick('cta-compliance-assessment', openInquiryModal)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
          >
            Schedule a Compliance Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
