import { Network, Shield, Cable, Cloud, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Network,
    title: 'Managed IT Services',
    description: 'Proactive monitoring, maintenance, and support to keep your infrastructure running smoothly around the clock.',
  },
  {
    icon: Shield,
    title: 'Network Security',
    description: 'Multi-layered protection against threats with advanced firewall, intrusion detection, and compliance solutions.',
  },
  {
    icon: Cable,
    title: 'Structured Cabling',
    description: 'Professional installation of Cat6, Cat6a, and fiber optic networks designed for performance and scalability.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Data Solutions',
    description: 'Seamless cloud migration, backup strategies, and disaster recovery to protect your critical business data.',
  },
];

export default function ValuePropositionCards() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Comprehensive IT Solutions for Every Need
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From cybersecurity to cloud infrastructure, we deliver enterprise-grade technology
            tailored for businesses of all sizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-10 shadow-md hover:shadow-xl hover:border-blue-600 transition-all duration-300 hover:-translate-y-2 border border-slate-200"
            >
              <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg group-hover:from-blue-600 group-hover:to-blue-500 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" strokeWidth={2} fill="currentColor" fillOpacity="0.1" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-all hover:gap-3"
          >
            See All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
