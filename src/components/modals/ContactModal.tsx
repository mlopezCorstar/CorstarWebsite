import { X, Send } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { showToast } from '../../utils/toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export default function ContactModal({ isOpen, onClose, prefilledService }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [service, setService] = useState(prefilledService || '');

  useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
    }
  }, [prefilledService]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const full_name = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const serviceValue = formData.get('service') as string;
    const message = formData.get('message') as string;

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name,
          email,
          phone,
          company,
          service: serviceValue,
          message,
          source: 'contact_modal',
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        showToast({ message: 'Thank you! We\'ll be in touch soon.', type: 'success' });
        e.currentTarget.reset();
        setService('');
        onClose();
      } else {
        showToast({ message: data.error || 'Something went wrong. Please try again.', type: 'error' });
      }
    } catch (error) {
      showToast({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Your Company Name"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
              Service Interest
            </label>
            <select
              id="service"
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select a service</option>
              <option value="Managed IT Services">Managed IT Services</option>
              <option value="Network Security">Network Security</option>
              <option value="Cloud Solutions">Cloud Solutions</option>
              <option value="Structured Cabling">Structured Cabling</option>
              <option value="VoIP Phone Systems">VoIP Phone Systems</option>
              <option value="IT Services">IT Services</option>
              <option value="Cabling">Cabling</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Tell us about your needs..."
            ></textarea>
          </div>

          <p className="text-xs text-slate-500">
            We only use your info to respond to your request.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
