import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background items-center justify-center p-25 ">
      <RegisterForm />
    </div>
  );
};
