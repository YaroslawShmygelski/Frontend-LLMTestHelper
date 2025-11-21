// src/components/ui/PasswordTextField.tsx
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CustomTextField } from './CustomTextField';
import { type TextFieldProps } from '@mui/material/TextField';

type PasswordTextFieldProps = Omit<TextFieldProps, 'type'>;

export const CustomPasswordField = (props: PasswordTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <CustomTextField
      type={showPassword ? 'text' : 'password'}
      InputLabelProps={{
        className: '!text-foreground !dark:text-foreground',
      }}
      InputProps={{
        className:
          'text-foreground!  transition-colors border-bottomcolor-focus',
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-foreground! !dark:text-foreground"
            >
              {showPassword ? (
                <VisibilityOff className="text-foreground! !dark:text-foreground" />
              ) : (
                <Visibility className="text-foreground! !dark:text-foreground" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
