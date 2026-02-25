import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { useLogout } from '@/features/auth/hooks';
import { CyberButton } from '@/shared/components/ui/CyberButton';

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { handleLogout } = useLogout();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-gradient-to-b from-brand-dark to-brand-purple p-8 text-white">
      <h1 className="text-4xl font-bold text-white">Welcome to SAS Project</h1>

      <p className="text-white/60">Select an action to get started.</p>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {!isAuthenticated ? (
          // Unauthenticated: show Login button only
          <CyberButton
            onClick={() => navigate('/login')}
            className="min-w-[160px] px-10 py-5"
          >
            Login
          </CyberButton>
        ) : (
          // Authenticated: hide Login, show status + form + logout buttons
          <>
            <p className="text-sm font-medium text-green-400">
              ✓ You are already logged in.
            </p>
            <CyberButton
              onClick={() => navigate('/form')}
              className="min-w-[200px] px-10 py-5"
            >
              Go to Form
            </CyberButton>
            <CyberButton
              onClick={handleLogout}
              className="min-w-[140px] px-8 py-5"
            >
              Logout
            </CyberButton>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
