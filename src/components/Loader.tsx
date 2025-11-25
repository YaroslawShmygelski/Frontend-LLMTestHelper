import { BiLoaderAlt } from 'react-icons/bi';

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export const Loader = ({
  text = 'Loading...',
  fullScreen = false,
  className = '',
}: LoaderProps) => {
  const baseContainerStyles =
    'flex flex-col items-center justify-center gap-4 transition-all duration-300';

  const modeStyles = fullScreen
    ? 'fixed inset-0 z-50 bg-background backdrop-blur-sm h-screen w-screen'
    : 'w-full py-20';

  return (
    <div className={`${baseContainerStyles} ${modeStyles} ${className}`}>
      <BiLoaderAlt className="text-5xl text-primary animate-spin" />

      {text && (
        <p className="text-muted-foreground font-medium text-lg animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};
