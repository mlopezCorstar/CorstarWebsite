import { X, Phone } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { showToast } from '../../utils/toast';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const full_name = formData.get('full_name') as string;
    const phone = formData.get('phone') as string;
    const best_time = formData.get('best_time') as string;
    const notes = formData.get('notes') as string;

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name,
          phone,
          best_time,
          notes,
          source: 'callback_modal',
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        showToast({ message: 'Thank you! We\'ll call you back soon.', type: 'success' });
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Request a Callback</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-blue-100 mt-2">We'll call you back at your convenience</p>
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
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
              Phone Number *
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

          <div>
            <label htmlFor="best_time" className="block text-sm font-semibold text-slate-700 mb-2">
              Best Time to Call
            </label>
            <select
              id="best_time"
              name="best_time"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select a time</option>
              <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
              <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
              <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
              <option value="Anytime">Anytime</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Any specific questions or topics to discuss?"
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
            {isSubmitting ? 'Sending...' : 'Request Callback'}
            <Phone className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
