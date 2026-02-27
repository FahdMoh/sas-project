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
const AboutZone = () => (
  <div
    id="about"
    style={{
      width: "100%",
      minHeight: "30vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(40px, 6vw, 100px) clamp(80px, 8vw, 160px)",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "28px",
      }}
    >
      {/* ── Section label + top rule ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          width: "100%",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.4em",
            color: "#FF62FC",
            textTransform: "uppercase",
            textShadow: "0 0 10px rgba(255,98,252,0.7)",
            whiteSpace: "nowrap",
          }}
        >
          // ABOUT
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(255,98,252,0.8) 0%, rgba(255,98,252,0.08) 100%)",
          }}
        />
      </div>

      {/* ── Section heading ── */}
      <h2
        style={{
          margin: 0,
          fontFamily: '"Arial Black", "Impact", Arial, sans-serif',
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: "clamp(24px, 3vw, 48px)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#ffffff",
          lineHeight: 1.1,
        }}
      >
        ABOUT
       
        
      </h2>

      {/* ── Body paragraph ── */}
      <p
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
          fontSize: "clamp(14px, 1.1vw, 18px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.9,
          maxWidth: "760px",
          borderLeft: "2px solid rgba(255,98,252,0.35)",
          paddingLeft: "20px",
        }}
      >
        A one-day competitive programming event aimed at first-year students
        interested in programming from various universities, based on solving
        programming questions within a specific time and in a way that measures
        thinking and logic.
      </p>

      {/* ── Decorative bottom accent ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "1px",
            background: "#00E5FF",
            boxShadow: "0 0 6px rgba(0,229,255,0.6)",
          }}
        />
        <div
          style={{
            width: "7px",
            height: "7px",
            background: "transparent",
            border: "1.5px solid #FF62FC",
            transform: "rotate(45deg)",
            boxShadow: "0 0 6px rgba(255,98,252,0.5)",
          }}
        />
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        />
      </div>
    </div>
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
        about={<AboutZone />}
      />
    </>
  );
};

export default HomePage;
