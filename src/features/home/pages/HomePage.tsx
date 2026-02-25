import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { useLogout } from '@/features/auth/hooks';

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { handleLogout } = useLogout();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to SAS Project</h1>


      <p className="text-gray-500">Select an action to get started.</p>

      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          // Unauthenticated: show Login button only
          <button
            onClick={() => navigate('/login')}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>
        ) : (
          // Authenticated: hide Login, show status + form + logout buttons
          <>
            <p className="text-sm font-medium text-green-600">
              ✓ You are already logged in.
            </p>
            <button
              onClick={() => navigate('/form')}
              className="rounded-lg bg-gray-700 px-6 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Go to Document Form
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-red-300 px-6 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
