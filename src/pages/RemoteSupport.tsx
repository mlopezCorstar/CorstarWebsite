import { Phone, Mail, Shield, Clock, CheckCircle2, ExternalLink } from 'lucide-react';

export default function RemoteSupport() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Remote <span className="text-blue-600">Support</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Fast, secure remote assistance for your IT issues. Our certified technicians are ready to help.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-8 rounded-xl shadow-lg text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Access Remote Support Portal</h3>
              <p className="text-blue-50 mb-6">
                Connect with our technicians instantly through our secure remote support portal
              </p>
              <a
                href="https://corstar.beyondtrustcloud.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Launch Remote Support
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Need Immediate Assistance?</h3>

              <div className="space-y-4">
                <a
                  href="tel:914-347-2700"
                  className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Call Us Now</p>
                    <p className="text-xl font-bold text-blue-600 group-hover:text-blue-700">(914) 347-2700</p>
                  </div>
                </a>

                <a
                  href="mailto:info@corstar.com"
                  className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group"
                >
                  <div className="p-3 bg-slate-600 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Email Support</p>
                    <p className="text-lg font-bold text-slate-900 group-hover:text-slate-700">info@corstar.com</p>
                  </div>
                </a>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <Clock className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-800">
                  <span className="font-semibold">24/7/365 Monitoring Available</span> for emergency issues
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-8 rounded-xl shadow-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Secure & Private</h3>
              </div>
              <p className="mb-6 text-blue-50">
                Our remote support sessions use industry-leading encryption and security protocols.
                You maintain complete control and can end the session at any time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-blue-50">End-to-end encrypted connections</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-blue-50">No permanent access to your system</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-blue-50">Session recordings for quality assurance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-blue-50">Certified technicians only</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-xl shadow-lg border border-slate-200 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Is remote support safe?</h3>
              <p className="text-slate-600">
                Yes, our remote support uses bank-level encryption and requires your explicit permission to access your system.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">What can you fix remotely?</h3>
              <p className="text-slate-600">
                Most software issues, configuration problems, updates, security concerns, and performance optimization can be handled remotely.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">How long does a session take?</h3>
              <p className="text-slate-600">
                Most issues are resolved within 30-60 minutes. Complex problems may require additional time or follow-up sessions.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Do I need to stay at my computer?</h3>
              <p className="text-slate-600">
                We recommend staying available during the session, but for routine maintenance, you can step away if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
