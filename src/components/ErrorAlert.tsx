import { useEffect, useState } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

interface ErrorAlertProps {
  message: string | null;
  onClose: () => void;
}

export const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
      flex items-center gap-4 px-6 py-4 
      bg-card/95 backdrop-blur-md border border-red-500/30 
      text-card-foreground shadow-2xl rounded-2xl
      transition-all duration-300 ease-out max-w-[90vw] w-auto
      ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : '-translate-y-10 opacity-0 scale-95'
      }
      `}
    >
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-error rounded-full animate-ping" />
        <div className="relative bg-red-500/10 p-2 rounded-full">
          <FiAlertTriangle className="text-error text-xl" />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-sm text-error uppercase tracking-wider">
          Error
        </span>
        <span className="text-sm font-medium opacity-90">{message}</span>
      </div>

      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 p-1 hover:bg-red-500/10 rounded-full transition-colors text-card-foreground/50 hover:text-card-foreground"
      >
        <FiX size={20} />
      </button>
    </div>
  );
};
