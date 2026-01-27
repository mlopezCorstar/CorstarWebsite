import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import AboutPage from './pages/About';
import Contact from './pages/Contact';
import RemoteSupport from './pages/RemoteSupport';
import Admin from './pages/Admin';
import { ModalProvider, useModal } from './contexts/ModalContext';
import InquiryModal from './components/modals/InquiryModal';

function AppContent() {
  const { isInquiryModalOpen, closeModal, inquiryConfig } = useModal();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/remote-support" element={<RemoteSupport />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />

      {inquiryConfig && (
        <InquiryModal
          isOpen={isInquiryModalOpen}
          onClose={closeModal}
          intent={inquiryConfig.intent}
          source={inquiryConfig.source}
          title={inquiryConfig.title}
          buttonText={inquiryConfig.buttonText}
          prefilledService={inquiryConfig.prefilledService}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
}

export default App;
