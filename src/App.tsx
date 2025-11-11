import { LoginForm } from "@/features/auth/components/LoginForm";

export const App = () => {
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card text-4xl p-64 text-green-600">
        <LoginForm />
      </div>
    </>
  );
};
