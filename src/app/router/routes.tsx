import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '@/features/home/pages/HomePage';
import LoginPage from '@/features/auth/pages/LoginPage';
import DocumentFormPage from '@/features/document/pages/DocumentFormPage';

/**
 * Wraps the login page — redirects already-authenticated users to /form.
 */
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/form" replace /> : <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    // All children require authentication
    element: <ProtectedRoute />,
    children: [
      {
        path: '/form',
        element: <DocumentFormPage />,
      },
    ],
  },
]);
