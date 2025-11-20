import { NavBar } from '@/components/NavBar';
import type { RootState } from '@/store/store';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
export const Layout = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <>
      <NavBar isLoggedIn={isAuthenticated} />
      <main>{children}</main>
    </>
  );
};
