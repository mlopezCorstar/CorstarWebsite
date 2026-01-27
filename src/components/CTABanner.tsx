import { ArrowRight } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import { handleCTAClick } from '../utils/cta';

export default function CTABanner() {
  const { openInquiryModal } = useModal();

  return (
    <section className="relative py-24 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-24 h-1 bg-white/40 mx-auto mb-8 rounded-full"></div>

        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Discover Where Your Network Stands —<br />
          and How to Improve It
        </h2>

        <p className="text-xl text-blue-100 mb-3 max-w-3xl mx-auto leading-relaxed">
          Get a complimentary network analysis and uncover opportunities to boost performance,
          enhance security, and reduce costs
        </p>

        <p className="text-sm text-blue-200 mb-10 max-w-2xl mx-auto italic">
          Includes complimentary network and security assessment — no obligation
        </p>

        <button
          id="cta-pricing-quote"
          onClick={() => handleCTAClick('cta-pricing-quote', openInquiryModal)}
          className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 hover:shadow-blue-400/30"
        >
          Schedule Your Free Analysis
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-center gap-3 text-blue-100 text-sm mt-6">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
            No obligation
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
            30-minute consultation
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
            Actionable insights
          </span>
        </div>
      </div>
    </section>
  );
}
