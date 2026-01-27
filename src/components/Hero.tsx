import { ArrowRight } from 'lucide-react';
import AnimatedCorstarLogo from './AnimatedCorstarLogo';
import EthernetCable from './EthernetCable';
import { useModal } from '../contexts/ModalContext';
import { handleCTAClick } from '../utils/cta';

export default function Hero() {
  const { openInquiryModal } = useModal();

  return (
    <section className="hero relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-blue-100">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <EthernetCable position="top" />
      <EthernetCable position="bottom" />

      <div className="logo-wrap relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8">
          <div className="flex justify-center mb-8">
            <AnimatedCorstarLogo />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-tight animate-fade-in-up">
            Powering Secure, Reliable IT<br />
            <span className="text-blue-600">
              for the Modern Business
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mt-4 animate-fade-in-up">
            55+ years of trusted IT expertise — protecting data, connecting teams,
            and keeping your systems online 24/7
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12 animate-fade-in-up">
            <button
              id="cta-hero-primary"
              onClick={() => handleCTAClick('cta-hero-primary', openInquiryModal)}
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 flex items-center gap-2"
            >
              Get a Free Network Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="cta-hero-secondary"
              onClick={() => handleCTAClick('cta-hero-secondary', openInquiryModal)}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              View Our Services
            </button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-6 sm:gap-8 text-slate-700 border-t border-slate-200 mt-8 pt-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-semibold">55+ Years of Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-semibold">24/7/365 Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-semibold">Certified Technicians</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent shadow-inner"></div>
    </section>
  );
}
