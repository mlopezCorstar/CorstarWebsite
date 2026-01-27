import { createContext, useContext, useState, ReactNode } from 'react';
import { InquiryModalConfig } from '../utils/cta';

interface ModalContextType {
  openInquiryModal: (config: InquiryModalConfig) => void;
  closeModal: () => void;
  isInquiryModalOpen: boolean;
  inquiryConfig: InquiryModalConfig | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryConfig, setInquiryConfig] = useState<InquiryModalConfig | null>(null);

  const openInquiryModal = (config: InquiryModalConfig) => {
    setInquiryConfig(config);
    setIsInquiryModalOpen(true);
  };

  const closeModal = () => {
    setIsInquiryModalOpen(false);
    setTimeout(() => {
      setInquiryConfig(null);
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ openInquiryModal, closeModal, isInquiryModalOpen, inquiryConfig }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
