import { useState } from 'react';
import { useNavigate } from 'react-router';
import LoginIcon from '@mui/icons-material/Login';

import { useLoginUserMutation } from '../api/authApi';
import type { LoginRequest } from '../types/authTypes';
import { paths } from '@/utils/paths';
import { CustomButton } from '@/components/CustomButton';
import { StatusAlert } from '@/components/StatusAlert';
import { CustomTextField } from './CustomTextField';
import { CustomPasswordField } from './CustomPasswordField';
import { getErrorMessage } from '../utils/tokenService';

interface FormErrors {
  login?: string;
  password?: string;
}

export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!login.trim()) {
      errors.login = 'Login is required';
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validate()) return;

    const credentials: LoginRequest = { username: login, password };

    try {
      await loginUser(credentials).unwrap();
      navigate(paths.app.root.path, { replace: true });
    } catch (err) {
      const message = getErrorMessage(err);
      setGlobalError(message);
    }
  };

  return (
    <>
      <StatusAlert message={globalError} onClose={() => setGlobalError(null)} />

      <div className="flex justify-center items-center min-h-[70vh] px-4 py-12">
        <div className="w-full max-w-lg sm:max-w-xl bg-card rounded-3xl shadow-2xl border border-card-foreground/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-80" />

          <div className="p-8 sm:p-14 flex flex-col gap-8 relative z-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                Welcome Back
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Enter your details to access your workspace
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-8 mt-4"
            >
              <CustomTextField
                id="login"
                label="Login"
                value={login}
                error={!!formErrors.login}
                helperText={formErrors.login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  if (formErrors.login)
                    setFormErrors({ ...formErrors, login: undefined });
                }}
              ></CustomTextField>
              <CustomPasswordField
                id="password"
                label="Password"
                value={password}
                error={!!formErrors.password}
                helperText={formErrors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (formErrors.password)
                    setFormErrors({ ...formErrors, password: undefined });
                }}
              />

              <div className="pt-4">
                <CustomButton
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Logging In..."
                  icon={<LoginIcon />}
                >
                  Log In
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
