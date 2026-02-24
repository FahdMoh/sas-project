import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { RootLayout } from '@/app/layouts';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { HomePage } from '@/features/home';

export const router = createBrowserRouter([
  {
    // Public routes
    path: '/login',
    element: <LoginPage />,
  },
  {
    // Protected routes
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          // TODO: Add document, organization, and other feature routes here
        ],
      },
    ],
  },
]);
