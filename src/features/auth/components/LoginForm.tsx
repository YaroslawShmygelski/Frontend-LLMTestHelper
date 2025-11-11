import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";

export const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alert(password + login);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <div className="flex flex-col gap-4">
          <TextField
            id="login"
            label="Login"
            variant="standard"
            fullWidth
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <FormControl variant="standard">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <Input
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
