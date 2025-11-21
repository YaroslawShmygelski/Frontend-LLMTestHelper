import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
}

export const CustomButton = ({
  children,
  isLoading = false,
  loadingText = 'Processing...',
  icon,
  className = '',
  disabled,
  ...props
}: GradientButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={`
        relative w-full h-12 sm:h-16 rounded-xl sm:rounded-2xl 
        font-bold text-base sm:text-xl text-white btn-gradient 
        shadow-lg hover:shadow-2xl 
        transform hover:-translate-y-1 active:scale-[0.98] 
        transition-all duration-300
        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none 
        flex items-center justify-center gap-2 sm:gap-3 
        overflow-hidden group
        ${className}
      `}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />

      {isLoading ? (
        <>
          <BiLoaderAlt className="animate-spin text-xl sm:text-2xl" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {icon && (
            <span className="text-lg sm:text-2xl group-hover:-translate-y-1 transition-transform duration-300 flex items-center">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};
