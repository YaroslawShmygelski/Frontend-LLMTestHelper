import { useState } from 'react';
import { useNavigate } from 'react-router';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useRegisterUserMutation } from '../api/authApi';
import type { RegisterRequest } from '../types/authTypes';
import { paths } from '@/utils/paths';
import { CustomButton } from '@/components/CustomButton';
import { ErrorAlert } from '@/components/ErrorAlert';
import { CustomTextField } from './CustomTextField';
import { CustomPasswordField } from './CustomPasswordField';
import type { ApiErrorResponse } from '@/types/types';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  password?: string;
  repeatPassword?: string;
}

export const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const getErrorMessage = (error: unknown): string => {
    if (!error) return 'An unexpected error occurred';
    const err = error as ApiErrorResponse;

    if (err.data && typeof err.data === 'object') {
      return err.data.message || err.data.error || 'Registration failed';
    }
    if (err.message) return err.message;

    return 'Network error or server unavailable';
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!firstName.trim()) {
      errors.firstName = 'First Name is required';
      isValid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last Name is required';
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!countryCode.trim()) {
      errors.countryCode = 'Code required';
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone required';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Min 6 characters';
      isValid = false;
    }

    if (password !== repeatPassword) {
      errors.repeatPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validate()) return;

    const credentials: RegisterRequest = {
      first_name: firstName,
      last_name: lastName,
      email,
      country_code: Number(countryCode),
      phone_number: Number(phoneNumber),
      password,
    };

    try {
      await registerUser(credentials).unwrap();
      navigate(paths.auth.login.path);
    } catch (err) {
      setGlobalError(getErrorMessage(err));
    }
  };

  const clearError = (field: keyof FormErrors) => {
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <ErrorAlert message={globalError} onClose={() => setGlobalError(null)} />

      <div className="flex justify-center items-center min-h-[80vh] px-4 py-12">
        {/* Card Container - Wider for grid layout (max-w-2xl) */}
        <div className="w-full max-w-xl sm:max-w-2xl bg-card rounded-3xl shadow-2xl border border-card-foreground/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-80" />

          <div className="p-8 sm:p-12 flex flex-col gap-8 relative z-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                Create Account
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Join us today and start managing your tests
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6 mt-2"
            >
              {/* Row 1: Name */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <CustomTextField
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    clearError('firstName');
                  }}
                />
                <CustomTextField
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    clearError('lastName');
                  }}
                />
              </div>

              {/* Row 2: Email */}
              <CustomTextField
                id="email"
                label="Email Address"
                type="email"
                value={email}
                error={!!formErrors.email}
                helperText={formErrors.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError('email');
                }}
              />

              {/* Row 3: Phone */}
              <div className="flex gap-4">
                <div className="w-1/3 sm:w-1/4">
                  <CustomTextField
                    id="countryCode"
                    label="Code"
                    type="number"
                    placeholder="1"
                    value={countryCode}
                    error={!!formErrors.countryCode}
                    helperText={formErrors.countryCode}
                    onChange={(e) => {
                      setCountryCode(e.target.value);
                      clearError('countryCode');
                    }}
                  />
                </div>
                <div className="w-2/3 sm:w-3/4">
                  <CustomTextField
                    id="phoneNumber"
                    label="Phone Number"
                    type="number"
                    value={phoneNumber}
                    error={!!formErrors.phoneNumber}
                    helperText={formErrors.phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      clearError('phoneNumber');
                    }}
                  />
                </div>
              </div>

              <CustomPasswordField
                id="password"
                label="Password"
                value={password}
                error={!!formErrors.password}
                helperText={formErrors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError('password');
                }}
              />
              <CustomPasswordField
                id="repeatPassword"
                label="Repeat Password"
                value={repeatPassword}
                error={!!formErrors.repeatPassword}
                helperText={formErrors.repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                  clearError('repeatPassword');
                }}
              />

              {/* Submit Button */}
              <div className="pt-6">
                <CustomButton
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Creating Account..."
                  icon={<PersonAddIcon />}
                >
                  Register
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
