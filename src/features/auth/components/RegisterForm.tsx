import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useRegisterUserMutation } from '../api/authApi';
import type { RegisterRequest } from '../types/authTypes';
import { paths } from '@/utils/paths';
import { CustomButton } from '@/components/CustomButton';
import { StatusAlert } from '@/components/StatusAlert';
import { CustomTextField } from './CustomTextField';
import { CustomPasswordField } from './CustomPasswordField';
import { getErrorMessage } from '../utils/tokenService';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  password?: string;
  repeatPassword?: string;
}

type FormFieldKey = keyof FormErrors;

export const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<FormFieldKey, boolean>>
  >({});

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const getValidationErrors = useCallback((): FormErrors => {
    const errors: FormErrors = {};

    if (!firstName.trim()) errors.firstName = 'First Name is required';
    if (!lastName.trim()) errors.lastName = 'Last Name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!countryCode) {
      errors.countryCode = 'Required';
    } else if (countryCode.length < 1) {
      errors.countryCode = 'Invalid';
    }

    if (!phoneNumber) {
      errors.phoneNumber = 'Required';
    } else if (phoneNumber.length < 7) {
      errors.phoneNumber = 'Min 7 digits';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Min 6 characters';
    }

    if (password !== repeatPassword) {
      errors.repeatPassword = 'Passwords do not match';
    }

    return errors;
  }, [
    firstName,
    lastName,
    email,
    countryCode,
    phoneNumber,
    password,
    repeatPassword,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const errors = getValidationErrors();
      setFormErrors(errors);
    }, 500);

    return () => clearTimeout(timer);
  }, [getValidationErrors]);

  const handleBlur = (field: FormFieldKey) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleNumberChange = (
    value: string,
    setter: (val: string) => void,
    maxLength: number
  ) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= maxLength) {
      setter(numericValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    const errors = getValidationErrors();

    const allTouched: Partial<Record<FormFieldKey, boolean>> = {};
    (Object.keys(errors) as FormFieldKey[]).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched((prev) => ({
      ...prev,
      ...allTouched,
      firstName: true,
      lastName: true,
      email: true,
      countryCode: true,
      phoneNumber: true,
      password: true,
      repeatPassword: true,
    }));

    if (Object.keys(errors).length > 0) {
      return;
    }

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

  const showFieldError = (field: FormFieldKey) => {
    return touched[field] && !!formErrors[field];
  };

  return (
    <>
      <StatusAlert message={globalError} onClose={() => setGlobalError(null)} />

      <div className="flex justify-center items-center min-h-[80vh] px-4 py-12">
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
                  error={showFieldError('firstName')}
                  helperText={
                    showFieldError('firstName')
                      ? formErrors.firstName
                      : undefined
                  }
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                />
                <CustomTextField
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  error={showFieldError('lastName')}
                  helperText={
                    showFieldError('lastName') ? formErrors.lastName : undefined
                  }
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                />
              </div>

              {/* Row 2: Email */}
              <CustomTextField
                id="email"
                label="Email Address"
                type="email"
                value={email}
                error={showFieldError('email')}
                helperText={
                  showFieldError('email') ? formErrors.email : undefined
                }
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
              />

              {/* Row 3: Phone */}
              <div className="flex gap-4">
                <div className="w-1/3 sm:w-1/4">
                  <CustomTextField
                    id="countryCode"
                    label="Code"
                    type="text"
                    placeholder="1"
                    value={countryCode}
                    error={showFieldError('countryCode')}
                    helperText={
                      showFieldError('countryCode')
                        ? formErrors.countryCode
                        : undefined
                    }
                    onChange={(e) =>
                      handleNumberChange(e.target.value, setCountryCode, 4)
                    }
                    onBlur={() => handleBlur('countryCode')}
                  />
                </div>
                <div className="w-2/3 sm:w-3/4">
                  <CustomTextField
                    id="phoneNumber"
                    label="Phone Number"
                    type="text"
                    value={phoneNumber}
                    error={showFieldError('phoneNumber')}
                    helperText={
                      showFieldError('phoneNumber')
                        ? formErrors.phoneNumber
                        : undefined
                    }
                    onChange={(e) =>
                      handleNumberChange(e.target.value, setPhoneNumber, 15)
                    }
                    onBlur={() => handleBlur('phoneNumber')}
                  />
                </div>
              </div>

              <CustomPasswordField
                id="password"
                label="Password"
                value={password}
                error={showFieldError('password')}
                helperText={
                  showFieldError('password') ? formErrors.password : undefined
                }
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
              />
              <CustomPasswordField
                id="repeatPassword"
                label="Repeat Password"
                value={repeatPassword}
                error={showFieldError('repeatPassword')}
                helperText={
                  showFieldError('repeatPassword')
                    ? formErrors.repeatPassword
                    : undefined
                }
                onChange={(e) => setRepeatPassword(e.target.value)}
                onBlur={() => handleBlur('repeatPassword')}
              />

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
