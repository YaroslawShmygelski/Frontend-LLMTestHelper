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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalValue = e.target.value;

    const cleanValue = originalValue.replace(/[^\x20-\x7E]/g, '');

    if (originalValue !== cleanValue) {
      e.target.value = cleanValue;
    }

    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <CustomTextField
      {...props}
      onChange={handleInputChange}
      type={showPassword ? 'text' : 'password'}
      InputLabelProps={{
        ...props.InputLabelProps,
        className: `!text-foreground/70 ${props.InputLabelProps?.className || ''}`,
      }}
      InputProps={{
        ...props.InputProps,
        className: `!text-foreground transition-colors ${props.InputProps?.className || ''}`,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-foreground/60! hover:text-primary! transition-colors"
            >
              {showPassword ? (
                <VisibilityOff className="text-foreground!" />
              ) : (
                <Visibility className="!text-foreground!" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
