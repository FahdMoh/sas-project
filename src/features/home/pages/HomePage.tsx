import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import { useLogout } from "@/features/auth/hooks";

import { HomePageLayout } from "@/features/home/components/HomePageLayout";
import { HomeNavbar } from "@/features/home/components/HomeNavbar";
import { HomeHero } from "@/features/home/components/HomeHero";

// ─── Keyframe animations (scoped to this page) ───────────────────────────────
const PAGE_STYLES = `
  @keyframes scanline { 0% { top: -2px; } 100% { top: 100%; } }
  @keyframes cpulse   { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.3; transform:scale(0.75); } }
  @keyframes ticker   { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
  @keyframes glowpulse{ 0%,100% { opacity:0.6; } 50% { opacity:1; } }
`;

// ─────────────────────────────────────────────────────────────────────────────
//  Zone 3 — About section
// ─────────────────────────────────────────────────────────────────────────────
const Footer = () => (
 <>
 <div className="w-full h-160 flex flex-col "style={{justifyContent:"center"}}>
<div className="mb-8">
  <svg width="17" height="101" viewBox="0 0 17 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="17" height="101" fill="#FF62FC"/>
</svg>
</div>

<div>
<svg width="742" height="77" viewBox="0 0 742 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.84281 75.4172H174.183L260.577 1.41431H37.1438C23.3644 12.0443 15.6222 18.0022 1.84281 28.6322V75.4386V75.4172Z" fill="#522395"/>
<path d="M174.968 76.8104H0V28.0323L36.3629 0H264.604L174.94 76.789L174.968 76.8104ZM3.63348 74.0243H173.346L256.498 2.80752H37.9003L3.66146 29.1897V74.0243H3.63348Z" fill="#522395"/>
<path d="M705.637 76.8103H212.457L302.121 0.0213623H742V48.7994L705.637 76.8318V76.8103ZM220.591 74.0242H704.127L738.366 47.6421V2.80743H303.742L220.591 74.0242Z" fill="#522395"/>
</svg>
</div>


 </div>
 </>
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
            onLoginClick={() => navigate("/login")}
            onLogoutClick={handleLogout}
          />
        }
        hero={
          <HomeHero
            isAuthenticated={isAuthenticated}
            onEnterSystem={() => navigate("/form")}
            onLogin={() => navigate("/login")}
          />
        }
        about={<Footer />}
      />
    </>
  );
};

export default HomePage;
