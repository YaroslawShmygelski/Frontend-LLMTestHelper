import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Navigate } from 'react-router';
import type { JSX } from 'react';

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return children;
};
