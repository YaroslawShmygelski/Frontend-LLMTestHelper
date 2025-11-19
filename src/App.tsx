// App.tsx
import { LoginForm } from '@/features/auth/components/LoginForm';
import { ThemeToggler } from '@/components/ThemeToggler';
import { useTheme } from '@/hooks/useTheme';

export const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen flex flex-col bg-background items-center justify-center p-6 transition-colors duration-500">
      <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
      <LoginForm />
    </div>
  );
};
