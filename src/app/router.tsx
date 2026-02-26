import { paths } from '@/utils/paths';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { Layout } from './layouts/Layout';
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProtectedRoute } from '@/utils/ProtectedRoute';
import { PublicRoute } from '@/utils/PublicRoute';
import { TestUpload } from './pages/TestUpload';
import { TestOverview } from './pages/TestOverview';
import { MyTestsPage } from './pages/MyTestsPage';
import { TestRunPage } from './pages/TestRunPage';

const AppRootErrorBoundary = () => <div> ERROR!</div>;

const router = createBrowserRouter([
  {
    path: paths.home.path, // Landing
    element: (
      <PublicRoute>
        <Layout>
          <LandingPage />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: paths.auth.register.path,
    element: (
      <PublicRoute>
        <Layout>
          <RegisterPage />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: paths.auth.login.path,
    element: (
      <PublicRoute>
        <Layout>
          <LoginPage />
        </Layout>
      </PublicRoute>
    ),
  },
  {
    path: paths.app.root.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <TestUpload />
        </Layout>
      </ProtectedRoute>
    ),
    ErrorBoundary: AppRootErrorBoundary,
  },
  {
    path: paths.app.getTestOverview.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <TestOverview />
        </Layout>
      </ProtectedRoute>
    ),
    ErrorBoundary: AppRootErrorBoundary,
  },
  {
    path: paths.app.myTests.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <MyTestsPage />
        </Layout>
      </ProtectedRoute>
    ),
    ErrorBoundary: AppRootErrorBoundary,
  },
  {
    path: paths.app.testRun.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <TestRunPage />
        </Layout>
      </ProtectedRoute>
    ),
    ErrorBoundary: AppRootErrorBoundary,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
