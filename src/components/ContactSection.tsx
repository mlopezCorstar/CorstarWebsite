import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';

export default function ContactSection() {
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
          service,
          message: messageText,
          source: 'home-contact-section',
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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-600">
            Ready to transform your IT infrastructure? Get in touch with our team
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
              <h3 className="text-3xl font-bold text-white mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Phone</div>
                    <a href="tel:914-347-2700" className="text-white font-semibold hover:text-blue-400 transition-colors">
                      (914) 347-2700
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Email</div>
                    <a href="mailto:info@corstar.com" className="text-white font-semibold hover:text-blue-400 transition-colors">
                      info@corstar.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Address</div>
                    <div className="text-white font-semibold">
                      22 Saw Mill River Road<br />
                      Suite 303<br />
                      Hawthorne, NY 10532
                    </div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-2 inline-block transition-colors"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4 font-semibold">
                  <Clock className="w-4 h-4" />
                  Business Hours
                </div>
                <div className="text-white">
                  <div className="flex justify-between mb-2">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Saturday</span>
                    <span className="font-semibold">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24/7 Emergency</span>
                    <span className="font-semibold text-blue-400">Always Available</span>
                  </div>
                </div>
                <Link
                  to="/remote-support"
                  className="mt-6 block w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 text-center"
                >
                  Remote Support
                </Link>
              </div>
            </div>

            <div className="p-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-900 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all hover:border-slate-400"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-900 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all hover:border-slate-400"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all hover:border-slate-400"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all hover:border-slate-400"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-slate-900 mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all hover:border-slate-400"
                  >
                    <option value="">Select a service</option>
                    <option value="Managed IT Services">Managed IT Services</option>
                    <option value="Network Security">Network Security</option>
                    <option value="Structured Cabling">Structured Cabling</option>
                    <option value="Cloud & Data Solutions">Cloud & Data Solutions</option>
                    <option value="Network Analysis">Network Analysis</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none hover:border-slate-400"
                    placeholder="Tell us about your IT needs..."
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
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
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
    </section>
  );
}
