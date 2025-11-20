import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRegisterUserMutation } from '../api/authApi';
import type { RegisterRequest } from '../types/authTypes';

export const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (repeatPassword.length > 0) {
        setPasswordsMatch(password === repeatPassword);
      } else {
        setPasswordsMatch(true);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [password, repeatPassword]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) return;

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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-24 bg-card rounded-xl shadow-xl">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground dark:text-foreground">
          Register
        </h2>

        <div className="flex flex-col gap-6">
          <TextField
            id="firstName"
            label="First Name"
            variant="standard"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            InputLabelProps={{
              className: '!text-foreground !dark:text-foreground',
            }}
            InputProps={{ className: '!text-foreground !dark:text-foreground' }}
          />

          <TextField
            id="lastName"
            label="Last Name"
            variant="standard"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            InputLabelProps={{
              className: '!text-foreground !dark:text-foreground',
            }}
            InputProps={{ className: '!text-foreground !dark:text-foreground' }}
          />

          <TextField
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              className: '!text-foreground !dark:text-foreground',
            }}
            InputProps={{ className: '!text-foreground !dark:text-foreground' }}
          />

          <div className="flex gap-4">
            <TextField
              id="countryCode"
              label="Country Code"
              variant="standard"
              type="number"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-1/4"
              InputLabelProps={{
                className: '!text-foreground !dark:text-foreground',
              }}
              InputProps={{
                className: '!text-foreground !dark:text-foreground',
              }}
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              variant="standard"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-3/4"
              InputLabelProps={{
                className: '!text-foreground !dark:text-foreground',
              }}
              InputProps={{
                className: '!text-foreground !dark:text-foreground',
              }}
            />
          </div>

          <TextField
            id="password"
            label="Password"
            variant="standard"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              className: '!text-foreground !dark:text-foreground',
            }}
            InputProps={{
              className: '!text-foreground !dark:text-foreground',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff className="!text-foreground !dark:text-foreground" />
                    ) : (
                      <Visibility className="!text-foreground !dark:text-foreground" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="repeatPassword"
            label="Repeat Password"
            variant="standard"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            InputLabelProps={{
              className: '!text-foreground !dark:text-foreground',
            }}
            InputProps={{
              className: '!text-foreground !dark:text-foreground',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff className="!text-foreground !dark:text-foreground" />
                    ) : (
                      <Visibility className="!text-foreground !dark:text-foreground" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!passwordsMatch && repeatPassword.length > 0 && (
            <p className="text-error text-xl mt-1">Passwords do not match</p>
          )}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isLoading || !passwordsMatch}
            className="w-full py-3 px-4 rounded-xl font-semibold text-lg text-white btn-gradient"
          >
            {isLoading ? 'REGISTERING...' : 'REGISTER'}
          </button>
        </div>

        {isLoading && (
          <p className="text-center text-muted dark:text-muted-foreground mt-4 font-medium">
            Loading...
          </p>
        )}
        {error && (
          <p className="flextext-center text-error mt-4 font-medium">
            Error: {JSON.stringify(error)}
          </p>
        )}
      </form>
    </div>
  );
};
