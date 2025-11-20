import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { paths } from './paths';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  if (!isAuthenticated) {
    return <Navigate to={paths.home.path} replace />;
  }

  return children;
};
