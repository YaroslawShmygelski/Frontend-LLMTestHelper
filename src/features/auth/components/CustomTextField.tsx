import TextField, { type TextFieldProps } from '@mui/material/TextField';

export const CustomTextField = (props: TextFieldProps) => {
  return (
    <TextField
      variant="standard"
      fullWidth
      InputProps={{
        className: '!text-foreground',
        ...props.InputProps,
      }}
      InputLabelProps={{
        className: '!text-foreground',
        ...props.InputLabelProps,
      }}
      FormHelperTextProps={{
        className: '!text-red-500 !text-xs',
      }}
      {...props}
    />
  );
};
