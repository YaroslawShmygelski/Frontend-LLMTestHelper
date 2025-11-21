import { NavLink } from 'react-router';

export interface NavItem {
  label: string;
  path: string;
}
export const NavItemLink = ({ label, path }: NavItem) => (
  <li>
    <NavLink
      to={path}
      className={({ isActive }) =>
        `relative pb-1 text-card-foreground font-medium transition-colors duration-200
        before:content-[''] before:absolute before:w-full before:h-0.5
        before:bottom-0 before:left-0 before:bg-primary
        before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
        hover:before:scale-x-100 hover:text-primary
        ${isActive ? 'text-primary font-semibold before:scale-x-100' : ''}`
      }
    >
      <span className="text-lg tracking-wide">{label}</span>
    </NavLink>
  </li>
);
