import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="flex items-center mb-6">
                <PawPrint className="h-10 w-10 text-amber-400 mr-2" />
                <h1 className="text-4xl font-bold">PAWS</h1>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Platform for Anonymous WistleBlowing Securely</h2>
              <p className="text-lg text-slate-300 mb-8">
                Expose corruption and misconduct without exposing yourself. PAWS provides a secure, anonymous platform
                for whistleblowers to share evidence and collaborate with others.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600">
                  <Link to="/auth">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-white/10 hover:text-white">
                  <a href="#learn-more">Learn More</a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg blur opacity-25"></div>
                <div className="relative bg-slate-800 p-6 rounded-lg shadow-xl">
                  <div className="space-y-4">
                    <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                    <div className="h-2 w-full bg-slate-700 rounded"></div>
                    <div className="h-2 w-5/6 bg-slate-700 rounded"></div>
                    <div className="h-2 w-2/3 bg-slate-700 rounded"></div>
                    <div className="flex items-center gap-2 mt-6">
                      <div className="h-8 w-8 bg-amber-500 rounded-full"></div>
                      <div className="h-2 w-24 bg-slate-700 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
                      <div className="h-2 w-32 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">How PAWS Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Anonymous Reporting"
              description="Submit reports with documents, images, and videos without exposing your identity. Our platform ensures your anonymity at every step."
              icon={
                <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 18h.01" />
                </svg>
              }
            />
            <FeatureCard
              title="Evidence Validation"
              description="A panel of validators checks authenticity before publishing. This ensures that all reports are credible and substantiated."
              icon={
                <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <FeatureCard
              title="Collaborative Case Building"
              description="Users can contribute additional proof or research to existing cases, strengthening the evidence and impact."
              icon={
                <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Our Mission</h2>
              <p className="text-slate-700 mb-4">
                PAWS exists to empower individuals to safely expose corruption, misconduct, and unethical behavior
                without fear of retaliation. We believe that transparency is essential for a just society, and that
                whistleblowers play a crucial role in holding power to account.
              </p>
              <p className="text-slate-700">
                By providing a secure platform for anonymous reporting, we aim to reduce the personal risk faced by
                those who speak truth to power, while ensuring that important information reaches the public.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Our Vision</h2>
              <p className="text-slate-700 mb-4">
                We envision a world where corruption and misconduct cannot thrive in secrecy, where those who witness
                wrongdoing have a safe channel to report it, and where the public has access to information that
                powerful interests might prefer to keep hidden.
              </p>
              <p className="text-slate-700">
                PAWS strives to be the most trusted, secure, and effective platform for whistleblowers worldwide,
                continuously improving our security measures and user experience to better serve those who take risks to
                expose the truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Disclaimer</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-slate-700 mb-4">
              While PAWS takes extensive measures to protect user anonymity and security, no system can guarantee
              absolute protection against all potential threats. Users should exercise caution and follow our security
              recommendations when using the platform.
            </p>
            <p className="text-slate-700 mb-4">
              PAWS does not encourage illegal activities. Users are responsible for ensuring that their actions comply
              with applicable laws and regulations in their jurisdiction. In many countries, whistleblower protection
              laws exist to shield those who report certain types of misconduct.
            </p>
            <p className="text-slate-700">
              The platform administrators do not have access to user identities and cannot respond to legal requests for
              such information. All content is encrypted and stored in a decentralized manner to resist censorship and
              takedown attempts.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <PawPrint className="h-8 w-8 text-amber-400 mr-2" />
              <span className="text-xl font-bold">PAWS</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/auth" className="text-slate-300 hover:text-white">
                Login
              </Link>
              <Link to="/auth?register=true" className="text-slate-300 hover:text-white">
                Register
              </Link>
              <Link to="/browse" className="text-slate-300 hover:text-white">
                Browse Reports
              </Link>
              <a href="#" className="text-slate-300 hover:text-white">
                Security
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                FAQ
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>© {new Date().getFullYear()} PAWS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

