import { useEffect, useState } from 'react';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiX,
  FiArrowRight,
} from 'react-icons/fi';

export type AlertType = 'success' | 'error';

interface StatusAlertProps {
  message: string | null;
  type?: AlertType;
  onClose: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const alertConfig = {
  success: {
    icon: FiCheckCircle,
    label: 'Success',
    iconColorClass: 'text-green-500',
    bgColorClass: 'bg-green-500/10',
    borderColorClass: 'border-green-500/30',
    pingColorClass: 'bg-green-500',
    hoverBgClass: 'hover:bg-green-500/10',
    buttonClass: 'bg-green-500 hover:bg-green-600 text-white',
  },
  error: {
    icon: FiAlertTriangle,
    label: 'Error',
    iconColorClass: 'text-red-500',
    bgColorClass: 'bg-red-500/10',
    borderColorClass: 'border-red-500/30',
    pingColorClass: 'bg-red-500',
    hoverBgClass: 'hover:bg-red-500/10',
    buttonClass: 'bg-red-500 hover:bg-red-600 text-white',
  },
};

export const StatusAlert = ({
  message,
  type = 'error',
  onClose,
  action,
}: StatusAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const config = alertConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
      flex items-center gap-4 px-5 py-3 
      bg-card/95 backdrop-blur-md border ${config.borderColorClass}
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
        <div
          className={`absolute inset-0 rounded-full animate-ping opacity-75 ${config.pingColorClass}`}
        />
        <div className={`relative p-2 rounded-full ${config.bgColorClass}`}>
          <Icon className={`text-xl ${config.iconColorClass}`} />
        </div>
      </div>

      <div className="flex flex-col mr-2">
        <span
          className={`font-bold text-xs uppercase tracking-wider ${config.iconColorClass}`}
        >
          {config.label}
        </span>
        <span className="text-sm font-medium opacity-90 whitespace-nowrap">
          {message}
        </span>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md transition-transform active:scale-95 ${config.buttonClass}`}
        >
          {action.label}
          <FiArrowRight />
        </button>
      )}

      {!action && (
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`p-1 rounded-full transition-colors text-card-foreground/50 hover:text-card-foreground ${config.hoverBgClass}`}
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};
