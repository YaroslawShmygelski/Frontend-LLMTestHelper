import { FiAlertTriangle } from 'react-icons/fi';
import { CustomButton } from '@/components/CustomButton';
interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while processing your request.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="min-h-[50vh] w-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
      <div className="mb-6 rounded-full bg-red-500/10 p-6 ring-1 ring-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
        <FiAlertTriangle className="text-4xl sm:text-5xl text-red-500" />
      </div>

      <div className="max-w-md space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-error">
          {title}
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <div className="w-full max-w-xs">
          <CustomButton onClick={onRetry}>Try Again</CustomButton>
        </div>
      )}
    </div>
  );
};
