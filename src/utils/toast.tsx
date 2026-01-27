import { createRoot } from 'react-dom/client';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export function showToast({ message, type = 'success', duration = 3000 }: ToastProps) {
  const toastContainer = document.createElement('div');
  toastContainer.className = 'fixed top-4 right-4 z-[9999] animate-slideIn';
  document.body.appendChild(toastContainer);

  const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';

  const Toast = () => (
    <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl max-w-md flex items-center gap-3`}>
      <div className="flex-1">{message}</div>
    </div>
  );

  const root = createRoot(toastContainer);
  root.render(<Toast />);

  setTimeout(() => {
    toastContainer.style.animation = 'slideOut 0.3s ease-in-out';
    setTimeout(() => {
      root.unmount();
      document.body.removeChild(toastContainer);
    }, 300);
  }, duration);
}
