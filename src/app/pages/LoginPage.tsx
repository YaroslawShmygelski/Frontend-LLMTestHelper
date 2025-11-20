import { LoginForm } from '@/features/auth/components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background items-center justify-center p-25 ">
      <LoginForm />
    </div>
  );
};
