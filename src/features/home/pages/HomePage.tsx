import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { useLogout } from '@/features/auth/hooks';

import { HomePageLayout } from '@/features/home/components/HomePageLayout';
import { HomeNavbar } from '@/features/home/components/HomeNavbar';
import { HomeHero } from '@/features/home/components/HomeHero';

// ─── Keyframe animations (scoped to this page) ───────────────────────────────
const PAGE_STYLES = `
  @keyframes scanline { 0% { top: -2px; } 100% { top: 100%; } }
  @keyframes cpulse   { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.3; transform:scale(0.75); } }
  @keyframes ticker   { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
  @keyframes glowpulse{ 0%,100% { opacity:0.6; } 50% { opacity:1; } }
`;

// ─────────────────────────────────────────────────────────────────────────────
//  Zone 3 placeholder — About section (will be implemented in Step 4)
// ─────────────────────────────────────────────────────────────────────────────
const AboutZone = () => (
  <div
    style={{
      width: '100%',
      minHeight: '30vh',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '80px',
      paddingRight: '80px',
    }}
  >
    {/* Original bottom decorative SVG — preserved from previous version */}
    
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  HomePage — top-level page component
//  All business logic (auth state, navigate, logout) is preserved exactly.
// ─────────────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { handleLogout } = useLogout();

  return (
    <>
      {/* Injected keyframe animations */}
      <style>{PAGE_STYLES}</style>

      <HomePageLayout
        navbar={
          <HomeNavbar
            isAuthenticated={isAuthenticated}
            onLoginClick={() => navigate('/login')}
            onLogoutClick={handleLogout}
          />
        }
        hero={
          <HomeHero
            isAuthenticated={isAuthenticated}
            onEnterSystem={() => navigate('/form')}
            onLogin={() => navigate('/login')}
          />
        }
        about={<AboutZone />}
      />
    </>
  );
};

export default HomePage;