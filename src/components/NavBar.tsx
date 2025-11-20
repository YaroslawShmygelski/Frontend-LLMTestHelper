import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/state/authSlice';
import { NavLink } from 'react-router';
import { paths } from '@/utils/paths';
import { ThemeToggler } from './ThemeToggler';
import { useTheme } from '@/hooks/useTheme';

interface NavItem {
  label: string;
  path: string;
  alignRight?: boolean;
}

interface NavBarProps {
  isPrivate?: boolean;
  isLoggedIn?: boolean;
}

export const NavBar = ({
  isPrivate = false,
  isLoggedIn = false,
}: NavBarProps) => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  const leftLinks: NavItem[] = isPrivate
    ? [{ label: 'Upload Test', path: paths.auth.login.path }]
    : [{ label: 'Home', path: paths.home.path }];

  const rightLinks: NavItem[] = !isLoggedIn
    ? [
        { label: 'Log In', path: paths.auth.login.path },
        { label: 'Sign Up', path: paths.auth.register.path },
      ]
    : [];

  const renderLink = ({ label, path }: NavItem) => (
    <NavLink
      key={path}
      to={path}
      className={({ isActive }) =>
        `relative pb-1 text-card-foreground font-medium 
        before:content-[''] before:absolute before:w-full before:h-[2px]
        before:bottom-0 before:left-0 before:bg-current
        before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
        hover:before:scale-x-100
        ${isActive ? 'text-primary font-semibold' : ''}`
      }
    >
      <span className="text-lg tracking-wide">{label}</span>
    </NavLink>
  );

  return (
    <nav className="bg-card shadow-md px-6 py-4 font-sans sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-8">{leftLinks.map(renderLink)}</ul>

        <div className="flex items-center space-x-6">
          {rightLinks.map(renderLink)}

          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-card-foreground font-medium"
              >
                Profile ▼
              </button>

              {menuOpen && (
                <ul className="absolute right-0 mt-2 bg-card shadow-md border rounded w-40 z-50">
                  <li>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}

          <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};
