import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/features/home/pages/HomePage';
import LoginPage from '@/features/auth/pages/LoginPage';
import DocumentFormPage from '@/features/document/pages/DocumentFormPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/form',
    element: <DocumentFormPage />,
  },
]);
