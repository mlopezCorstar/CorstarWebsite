import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const service = formData.get('service') as string;
    const messageText = formData.get('message') as string;

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: `${firstName} ${lastName}`,
          email,
          phone,
          company,
          service,
          message: messageText,
          source: 'contact-page',
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setMessage('Thank you! We\'ll be in touch soon.');
        e.currentTarget.reset();
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to transform your IT infrastructure? Contact us today for a free consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                    <a href="tel:914-347-2700" className="text-blue-600 hover:text-blue-700 text-lg">
                      (914) 347-2700
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a href="mailto:info@corstar.com" className="text-blue-600 hover:text-blue-700">
                      info@corstar.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                    <p className="text-slate-600">
                      22 Saw Mill River Road<br />
                      Suite 303<br />
                      Hawthorne, NY 10532
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Business Hours</h3>
                    <div className="text-slate-600 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="font-semibold text-blue-600 mt-2">24/7 Emergency Support Available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <a
                  href="/remote-support"
                  className="block w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                >
                  Access Remote Support
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@company.com"
                  required
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="managed-it">Managed IT Services</option>
                  <option value="security">Network Security</option>
                  <option value="cloud">Cloud Solutions</option>
                  <option value="cabling">Structured Cabling</option>
                  <option value="voip">VoIP Phone Systems</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your IT needs..."
                  required
                ></textarea>
              </div>

              {message && (
                <div className={`p-4 rounded-lg ${message.includes('Thank you') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-5 h-5" />
              </button>

              <p className="text-xs text-slate-500 text-center">
                Your information is secure and will only be used to contact you about your inquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
