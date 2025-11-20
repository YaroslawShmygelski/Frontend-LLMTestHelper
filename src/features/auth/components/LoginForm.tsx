// LoginForm.tsx
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLoginUserMutation } from '../api/authApi';
import type { LoginRequest } from '../types/authTypes';
import { useNavigate } from 'react-router';
import { paths } from '@/utils/paths';

export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials: LoginRequest = { username: login, password };
    try {
      await loginUser(credentials).unwrap();
      navigate(paths.app.root.path, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-24 bg-card rounded-xl shadow-xl">
      <form onSubmit={handleSubmit}>
        <h2
          className="text-3xl font-bold mb-8 text-center 
                 text-foreground dark:text-foreground"
        >
          Login
        </h2>

        <div className="flex flex-col gap-6">
          <TextField
            id="login"
            label="Login"
            variant="standard"
            fullWidth
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            InputLabelProps={{
              className: '!text-foreground !dark:text-foreground',
            }}
            InputProps={{
              className: '!text-foreground !dark:text-foreground',
            }}
          />

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
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-semibold text-lg text-white btn-gradient"
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </div>

        {isLoading && (
          <p className="text-center text-muted dark:text-muted-foreground mt-4 font-medium">
            Loading...
          </p>
        )}
        {error && (
          <p className="text-center text-error mt-4 font-medium">
            Error: {JSON.stringify(error)}
          </p>
        )}
      </form>
    </div>
  );
};
