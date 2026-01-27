import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const highlights = [
    'Founded in 1969 with a commitment to excellence',
    '500+ businesses trust us with their IT infrastructure',
    'Certified technicians with decades of combined experience',
    'Local presence with national-level capabilities',
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-center">
            <div className="inline-block">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full">
                About Corstar Communications
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Over Five Decades of Network Excellence
            </h2>

            <div className="inline-block">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                Since 1969
              </span>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              Corstar Communications has been at the forefront of IT innovation,
              helping <span className="font-semibold">500+ businesses</span> build secure, scalable, and reliable technology infrastructures.
              Our team of <span className="font-semibold text-blue-600">certified engineers</span> combines deep technical expertise with a customer-first approach to deliver
              solutions that drive real business results.
            </p>

            <div className="space-y-4 pt-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" fillOpacity="0.2" />
                  <span className="text-slate-700">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
