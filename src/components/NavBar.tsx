import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router'; // Убедитесь, что импорт правильный для вашей версии router
import { FiUser, FiChevronDown } from 'react-icons/fi';

import { logout } from '@/features/auth/state/authSlice';
import { paths } from '@/utils/paths';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggler } from './ThemeToggler';
import { NavItemLink, type NavItem } from './NavLink';

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
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const leftLinks: NavItem[] = isPrivate
    ? [{ label: 'Upload Test', path: paths.auth.login.path }]
    : [{ label: 'Home', path: paths.home.path }];

  const rightLinks: NavItem[] = !isLoggedIn
    ? [
        { label: 'Log In', path: paths.auth.login.path },
        { label: 'Sign Up', path: paths.auth.register.path },
      ]
    : [];

  return (
    <nav className="bg-card shadow-md px-6 py-4 font-sans sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-8">
          {leftLinks.map((link) => (
            <NavItemLink key={link.path} {...link} />
          ))}
        </ul>

        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            {rightLinks.map((link) => (
              <NavItemLink key={link.path} {...link} />
            ))}
          </ul>

          {isLoggedIn && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center gap-2 font-medium transition-colors duration-200 outline-none
                  ${menuOpen ? 'text-primary' : 'text-card-foreground hover:text-primary'}
                `}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <div className="p-1.5 bg-muted-foreground rounded-full">
                  <FiUser className="text-xl" />
                </div>
                <span>Profile</span>
                <FiChevronDown
                  className={`text-lg transition-transform duration-300 ${menuOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>
              <div
                className={`absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-xl border border-border overflow-hidden
                  origin-top-right transition-all duration-200 ease-out
                  ${
                    menuOpen
                      ? 'opacity-100 scale-100 translate-y-0 visible'
                      : 'opacity-0 scale-95 -translate-y-2 invisible'
                  }
                `}
              >
                <ul className="py-1">
                  <li>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2.5 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2.5 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className="pl-2 border-l border-border">
            <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </nav>
  );
};
