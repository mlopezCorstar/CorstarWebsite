import Hero from '../components/Hero';
import ValuePropositionCards from '../components/ValuePropositionCards';
import ComplianceSection from '../components/ComplianceSection';
import About from '../components/About';
import CablingHighlight from '../components/CablingHighlight';
import CTABanner from '../components/CTABanner';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <div className="pt-20">
      <Hero />
      <ValuePropositionCards />
      <ComplianceSection />
      <About />
      <CablingHighlight />
      <CTABanner />
      <ContactSection />
    </div>
  );
}
