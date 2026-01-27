import { Cable, Zap, Layers, TrendingUp } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import { handleCTAClick } from '../utils/cta';

const benefits = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Cat6a and fiber installations for maximum speed',
  },
  {
    icon: Layers,
    title: 'Future-Proof',
    description: 'Infrastructure designed to scale with your growth',
  },
  {
    icon: TrendingUp,
    title: 'Reliable Performance',
    description: 'Minimal downtime with professional installation',
  },
];

export default function CablingHighlight() {
  const { openInquiryModal } = useModal();

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Im5ldCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDAgMCBMIDYwIDYwIE0gNjAgMCBMIDAgNjAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjbmV0KSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-semibold mb-6">
            Specialty Services
          </div>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6 shadow-lg shadow-blue-500/50">
            <Cable className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Structured Cabling,<br />
            Built for Speed and Scalability
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Expert installation and design of high-performance network infrastructure that supports
            your current needs and adapts to tomorrow's demands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="inline-flex p-4 bg-blue-600/30 rounded-lg mb-4">
                <benefit.icon className="w-7 h-7 text-blue-400" strokeWidth={2.5} fill="currentColor" fillOpacity="0.1" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {benefit.title}
              </h3>

              <p className="text-slate-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            id="cta-services-cabling"
            onClick={() => handleCTAClick('cta-services-cabling', openInquiryModal)}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
          >
            Request a Cabling Quote
          </button>
        </div>
      </div>
    </section>
  );
}
