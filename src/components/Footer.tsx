import { Mail, Phone, MapPin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';
import { handleCTAClick } from '../utils/cta';

const LOGO_PATH = '/image.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openInquiryModal } = useModal();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img
                src={LOGO_PATH}
                alt="Corstar Communications"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              Serving New York, New Jersey, and Connecticut Businesses Since 1969
            </p>
            <p className="text-slate-500 text-sm mb-6">
              Your trusted partner in technology excellence.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/people/Corstar-Communications/100063725736274/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/services" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">About</Link></li>
              <li>
                <button
                  id="cta-footer-contact"
                  onClick={() => handleCTAClick('cta-footer-contact', openInquiryModal)}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li><Link to="/remote-support" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Remote Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <button
                  id="cta-call"
                  onClick={() => handleCTAClick('cta-call', openInquiryModal)}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  (914) 347-2700
                </button>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@corstar.com"
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  info@corstar.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>22 Saw Mill River Road<br />Suite 303<br />Hawthorne, NY 10532</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} Corstar Communications. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
