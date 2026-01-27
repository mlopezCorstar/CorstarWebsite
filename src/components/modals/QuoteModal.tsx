import { X, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { showToast } from '../../utils/toast';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const full_name = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const location = formData.get('location') as string;
    const service = formData.get('service') as string;
    const timeline = formData.get('timeline') as string;
    const budget_range = formData.get('budget_range') as string;
    const details = formData.get('details') as string;

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name,
          email,
          phone,
          company,
          location,
          service,
          timeline,
          budget_range,
          details,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        showToast({ message: 'Thank you! We\'ll prepare your quote and be in touch soon.', type: 'success' });
        e.currentTarget.reset();
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
          <h2 className="text-2xl font-bold text-slate-900">Request a Quote</h2>
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

          <div className="grid sm:grid-cols-2 gap-4">
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
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="(555) 123-4567"
              />
            </div>
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
            <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-2">
              Project Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="City, State"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
              Service Needed
            </label>
            <select
              id="service"
              name="service"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select a service</option>
              <option value="Structured Cabling">Structured Cabling</option>
              <option value="Network Infrastructure">Network Infrastructure</option>
              <option value="Fiber Optic Installation">Fiber Optic Installation</option>
              <option value="Wireless Solutions">Wireless Solutions</option>
              <option value="Security Systems">Security Systems</option>
              <option value="IT Services">IT Services</option>
              <option value="Multiple Services">Multiple Services</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="timeline" className="block text-sm font-semibold text-slate-700 mb-2">
                Project Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select timeline</option>
                <option value="Urgent (ASAP)">Urgent (ASAP)</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2-3 months">2-3 months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget_range" className="block text-sm font-semibold text-slate-700 mb-2">
                Budget Range
              </label>
              <select
                id="budget_range"
                name="budget_range"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select budget</option>
                <option value="Under $5,000">Under $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000+">$50,000+</option>
                <option value="Not sure">Not sure</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-semibold text-slate-700 mb-2">
              Project Details
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Tell us about your project requirements..."
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
            {isSubmitting ? 'Sending...' : 'Request Quote'}
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
