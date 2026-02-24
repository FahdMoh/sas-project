import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router/routes';

/**
 * AppProviders wraps the entire application with all global providers.
 * Add future providers (e.g. QueryClientProvider, ThemeProvider) here.
 */
const AppProviders = () => {
  return <RouterProvider router={router} />;
};

export default AppProviders;
