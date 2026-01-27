import { useState, useEffect, FormEvent } from 'react';
import { X } from 'lucide-react';
import { showToast } from '../../utils/toast';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  intent: 'quote' | 'contact' | 'callback';
  source: string;
  title?: string;
  buttonText?: string;
  prefilledService?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  intent,
  source,
  title,
  buttonText,
  prefilledService
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    service: prefilledService || '',
    timeline: '',
    budget_range: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && prefilledService) {
      setFormData(prev => ({ ...prev, service: prefilledService }));
    }
  }, [isOpen, prefilledService]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company: '',
        location: '',
        service: prefilledService || '',
        timeline: '',
        budget_range: '',
        details: ''
      });
      setErrors({});
    }
  }, [isOpen, prefilledService]);

  const getDefaultTitle = () => {
    switch (intent) {
      case 'quote':
        return 'Request a Quote';
      case 'callback':
        return 'Request a Callback';
      default:
        return 'Share Your Project — We\'ll Be in Touch';
    }
  };

  const getDefaultButtonText = () => {
    switch (intent) {
      case 'quote':
        return 'Request Quote';
      case 'callback':
        return 'Request Callback';
      default:
        return 'Send';
    }
  };

  const displayTitle = title || getDefaultTitle();
  const displayButtonText = buttonText || getDefaultButtonText();

  const shouldShowField = (field: string): boolean => {
    switch (intent) {
      case 'callback':
        return ['full_name', 'phone', 'details'].includes(field);
      case 'quote':
        return true;
      case 'contact':
        return !['location', 'timeline', 'budget_range'].includes(field);
      default:
        return true;
    }
  };

  const isFieldRequired = (field: string): boolean => {
    switch (intent) {
      case 'callback':
        return ['full_name', 'phone'].includes(field);
      case 'quote':
        return ['full_name', 'email', 'location', 'timeline', 'budget_range'].includes(field);
      case 'contact':
        return ['full_name', 'email'].includes(field);
      default:
        return false;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (isFieldRequired('full_name') && !formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (isFieldRequired('email') && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (isFieldRequired('phone') && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (isFieldRequired('location') && !formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (isFieldRequired('timeline') && !formData.timeline.trim()) {
      newErrors.timeline = 'Timeline is required';
    }

    if (isFieldRequired('budget_range') && !formData.budget_range.trim()) {
      newErrors.budget_range = 'Budget range is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          intent
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      showToast('Thanks! We\'ll be in touch shortly.', 'success');
      onClose();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'An error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-slate-200">
          <h2 id="inquiryTitle" className="text-2xl font-bold text-slate-900">{displayTitle}</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form id="inquiryForm" onSubmit={handleSubmit} className="p-6 space-y-4">
          {shouldShowField('full_name') && (
            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name {isFieldRequired('full_name') && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.full_name ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                aria-invalid={!!errors.full_name}
                aria-describedby={errors.full_name ? 'full_name-error' : undefined}
              />
              {errors.full_name && (
                <p id="full_name-error" className="mt-1 text-sm text-red-500">{errors.full_name}</p>
              )}
            </div>
          )}

          {shouldShowField('email') && (
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email {isFieldRequired('email') && <span className="text-red-500">*</span>}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          )}

          {shouldShowField('phone') && (
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                Phone {isFieldRequired('phone') && <span className="text-red-500">*</span>}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          )}

          {shouldShowField('company') && (
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {shouldShowField('location') && (
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-2">
                Location (City/State or Zip) {isFieldRequired('location') && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.location ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="e.g., New York, NY or 10001"
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? 'location-error' : undefined}
              />
              {errors.location && (
                <p id="location-error" className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>
          )}

          {shouldShowField('service') && (
            <div>
              <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
                Service Interest
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a service</option>
                <option value="Managed IT Services">Managed IT Services</option>
                <option value="Network Security">Network Security</option>
                <option value="Cloud Solutions">Cloud Solutions</option>
                <option value="Structured Cabling">Structured Cabling</option>
                <option value="VoIP Phone Systems">VoIP Phone Systems</option>
                <option value="Virtualization">Virtualization</option>
                <option value="Video Conferencing">Video Conferencing</option>
                <option value="Hosted Email">Hosted Email</option>
                <option value="IT Consulting">IT Consulting</option>
                <option value="Staff Augmentation">Staff Augmentation</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {shouldShowField('timeline') && (
            <div>
              <label htmlFor="timeline" className="block text-sm font-semibold text-slate-700 mb-2">
                Project Timeline {isFieldRequired('timeline') && <span className="text-red-500">*</span>}
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.timeline ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                aria-invalid={!!errors.timeline}
                aria-describedby={errors.timeline ? 'timeline-error' : undefined}
              >
                <option value="">Select timeline</option>
                <option value="ASAP">ASAP</option>
                <option value="2-4 weeks">2-4 weeks</option>
                <option value="1-3 months">1-3 months</option>
                <option value="Planning">Just Planning</option>
              </select>
              {errors.timeline && (
                <p id="timeline-error" className="mt-1 text-sm text-red-500">{errors.timeline}</p>
              )}
            </div>
          )}

          {shouldShowField('budget_range') && (
            <div>
              <label htmlFor="budget_range" className="block text-sm font-semibold text-slate-700 mb-2">
                Budget Range {isFieldRequired('budget_range') && <span className="text-red-500">*</span>}
              </label>
              <select
                id="budget_range"
                name="budget_range"
                value={formData.budget_range}
                onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.budget_range ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                aria-invalid={!!errors.budget_range}
                aria-describedby={errors.budget_range ? 'budget_range-error' : undefined}
              >
                <option value="">Select budget range</option>
                <option value="Under $5,000">Under $5,000</option>
                <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                <option value="Over $100,000">Over $100,000</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
              {errors.budget_range && (
                <p id="budget_range-error" className="mt-1 text-sm text-red-500">{errors.budget_range}</p>
              )}
            </div>
          )}

          {shouldShowField('details') && (
            <div>
              <label htmlFor="details" className="block text-sm font-semibold text-slate-700 mb-2">
                Additional Details
              </label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell us more about your project or requirements..."
              />
            </div>
          )}

          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">
              Your information is safe with us — we'll only use it to follow up about your request.
            </p>
            <button
              id="inquirySubmit"
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : displayButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
