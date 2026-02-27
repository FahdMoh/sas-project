import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  FormPageLayout
//
//  Same visual structure as LoginPageLayout:
//  ┌──────────────────────────────────────────────────────────┐
//  │  [LEFT SVG strip]  [  CONTENT AREA  ]  [RIGHT SVG strip] │
//  │  • position: fixed far-left of page                      │
//  │  • height = 100vh (scales to fill full viewport height)  │
//  │  • width = 97px  (native SVG width)                      │
//  │                                                           │
//  │  NavbarBar SVG is split into two halves:                 │
//  │    - Left half  → anchored to left edge                  │
//  │    - Right half → anchored to right edge                 │
//  └──────────────────────────────────────────────────────────┘
//
//  Colors:
//    Accent pink/magenta : #FF62FC  /  #ED79F6
//    Neutral lines       : #B3B3B3
//    Arrow tips          : #FFFFFF
//    Frame stroke        : #ED79F6
//    Page bg             : #010104
// ─────────────────────────────────────────────────────────────────────────────

// ── Navbar Left SVG ─────────────────────────────────────────────────────────
const NavbarLeftSVG: React.FC = () => (
  <svg
    width="483"
    height="73"
    viewBox="0 0 483 73"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", display: "block" }}
    preserveAspectRatio="xMinYMid meet"
  >
    <path
      d="M173.908 0.367377C172.182 0.367377 170.729 0.816312 170.194 1.43865H105.407V0H66.2212C63.5365 0 61.3603 0.877297 61.3603 1.95959C61.3603 3.04188 63.5365 3.91918 66.2212 3.91918H105.407V2.4798H170.192C170.728 3.10213 172.18 3.55107 173.906 3.55107C176.088 3.55107 177.856 2.83836 177.856 1.95885C177.856 1.08009 176.088 0.367377 173.908 0.367377Z"
      fill="#FF62FC"
    />
    <path
      d="M483 39.1232H375.528L329.514 20.5736H0V19.8388H330.269L376.282 38.3884H483V39.1232Z"
      fill="#B3B3B3"
    />
    <path
      d="M311.288 47.4376H0V46.7029H311.288L271.82 31.5258H177.855V30.791H272.574L312.043 46.7029H311.288Z"
      fill="#B3B3B3"
    />
    <path
      d="M53.7673 36.0875V39.2712H115.129V36.0875H53.7673ZM114.218 38.9045H54.6786V36.4549H114.218V38.9045Z"
      fill="#FF62FC"
    />
    <path d="M188.64 36.0875H127.278V39.2712H188.64V36.0875Z" fill="#FF62FC" />
    <path
      d="M200.792 36.0875V39.2712H262.153V36.0875H200.792ZM261.242 38.9045H201.703V36.4549H261.242V38.9045Z"
      fill="#FF62FC"
    />
    <path
      d="M345.385 5.66794H335.187V4.45413L328.549 5.99932L335.187 7.54377V6.32996H345.385V5.66794Z"
      fill="white"
    />
  </svg>
);

// ── Navbar Right SVG ─────────────────────────────────────────────────────────
const NavbarRightSVG: React.FC = () => (
  <svg
    width="483"
    height="73"
    viewBox="483 0 483 73"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", display: "block" }}
    preserveAspectRatio="xMaxYMid meet"
  >
    <path
      d="M560.941 47.4376H966V46.7029H604.571L560.941 47.4376ZM560.185 46.7029L603.816 29.1136H965.069V29.8484H604.571L560.941 47.4376H560.185V46.7029Z"
      fill="#B3B3B3"
    />
    <path d="M483 39.1232H958.69V38.3884H483V39.1232Z" fill="#B3B3B3" />
    <path
      d="M858.814 70.3213H848.615V69.1067L841.979 70.6519L848.615 72.1964V70.9825H858.814V70.3213Z"
      fill="white"
    />
    <path
      d="M765.989 32.7163H755.791V31.5024L749.153 33.0469L755.791 34.5921V33.3783H765.989V32.7163Z"
      fill="white"
    />
  </svg>
);

// ── Left Side SVG (97×1120) ──────────────────────────────────────────────────
const LeftSideSVG: React.FC = () => (
  <svg
    width="97"
    height="1120"
    viewBox="0 0 97 1120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "97px",
      height: "100%",
      display: "block",
    }}
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M0.488893 917.856C0.488893 919.859 1.08614 921.544 1.91408 922.166L1.91408 997.327H0.000145912L0.000145912 1042.79C0.000145912 1045.9 1.16727 1048.43 2.60712 1048.43C4.04697 1048.43 5.2141 1045.9 5.2141 1042.79L5.2141 997.327H3.29919L3.29919 922.168C4.12712 921.546 4.72437 919.861 4.72437 917.858C4.72437 915.327 3.7762 913.276 2.60614 913.276C1.43706 913.276 0.488893 915.327 0.488893 917.856Z"
      fill="#FF62FC"
    />
    <path
      d="M52.0461 7.40021L52.0461 683.949L27.3683 737.331L27.3683 1119.61H26.3908L26.3908 736.456L51.0686 683.074L51.0686 7.40021H52.0461Z"
      fill="#B3B3B3"
    />
    <path
      d="M63.1119 468.844L63.1119 758.476L41.9433 804.265L41.9433 913.277H40.9658L40.9658 803.39L62.1344 757.601L62.1344 469.722L38.7342 419.103L38.7342 0H39.7117L39.7117 418.228L63.1119 468.844Z"
      fill="#B3B3B3"
    />
    <path
      d="M48.0101 1057.24H52.2456L52.2456 986.048H48.0101L48.0101 1057.24ZM51.7578 987.105L51.7578 1056.18H48.4989L48.4989 987.105H51.7578Z"
      fill="#FF62FC"
    />
    <path
      d="M48.0101 900.765L48.0101 971.953H52.2456L52.2456 900.765H48.0101Z"
      fill="#FF62FC"
    />
    <path
      d="M48.0101 886.667H52.2456L52.2456 815.479H48.0101L48.0101 886.667ZM51.7578 816.537L51.7578 885.61H48.4989L48.4989 816.537H51.7578Z"
      fill="#FF62FC"
    />
    <path
      d="M93.5534 123.27V135.103H91.9376L93.9933 142.802L96.048 135.103H94.4332V123.27H93.5534Z"
      fill="white"
    />
    <path
      d="M43.5246 230.961V242.792H41.9098L43.9645 250.492L46.0201 242.792H44.4053V230.961H43.5246Z"
      fill="white"
    />
    <path
      d="M7.54145 718.919L7.54145 730.75H5.92663L7.9823 738.451L10.037 730.75H8.42217L8.42217 718.919H7.54145Z"
      fill="white"
    />
  </svg>
);

// ── Right Side SVG (97×1120, mirror of Left) ─────────────────────────────────
const RightSideSVG: React.FC = () => (
  <svg
    width="97"
    height="1120"
    viewBox="0 0 97 1120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "97px",
      height: "100%",
      display: "block",
      transform: "scaleX(-1)",
    }}
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M0.488869 917.856C0.488869 919.859 1.08612 921.544 1.91405 922.166L1.91405 997.327H0.00012207L0.00012207 1042.79C0.00012207 1045.9 1.16725 1048.43 2.6071 1048.43C4.04695 1048.43 5.21407 1045.9 5.21407 1042.79L5.21407 997.327H3.29916L3.29916 922.168C4.1271 921.546 4.72435 919.861 4.72435 917.858C4.72435 915.327 3.77618 913.276 2.60612 913.276C1.43704 913.276 0.488869 915.327 0.488869 917.856Z"
      fill="#FF62FC"
    />
    <path
      d="M52.0462 7.40027L52.0462 683.949L27.3684 737.331L27.3684 1119.61H26.3909L26.3909 736.456L51.0687 683.074L51.0687 7.40027H52.0462Z"
      fill="#B3B3B3"
    />
    <path
      d="M63.1118 468.844L63.1118 758.476L41.9432 804.265L41.9432 913.277H40.9657L40.9657 803.39L62.1343 757.601L62.1343 469.722L38.7341 419.103L38.7341 0H39.7116L39.7116 418.228L63.1118 468.844Z"
      fill="#B3B3B3"
    />
    <path
      d="M48.01 1057.24H52.2455L52.2455 986.048H48.01L48.01 1057.24ZM51.7577 987.105L51.7577 1056.18H48.4988L48.4988 987.105H51.7577Z"
      fill="#FF62FC"
    />
    <path
      d="M48.01 900.765L48.01 971.953H52.2455L52.2455 900.765H48.01Z"
      fill="#FF62FC"
    />
    <path
      d="M48.01 886.667H52.2455L52.2455 815.479H48.01L48.01 886.667ZM51.7577 816.537L51.7577 885.61H48.4988L48.4988 816.537H51.7577Z"
      fill="#FF62FC"
    />
    <path
      d="M93.5534 123.27V135.103H91.9376L93.9933 142.802L96.048 135.103H94.4332V123.27H93.5534Z"
      fill="white"
    />
    <path
      d="M43.5246 230.961V242.792H41.9098L43.9645 250.492L46.0202 242.792H44.4053V230.961H43.5246Z"
      fill="white"
    />
    <path
      d="M7.54146 718.919L7.54146 730.75H5.92664L7.9823 738.451L10.037 730.75H8.42218L8.42218 718.919H7.54146Z"
      fill="white"
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
//  FormPageLayout
// ─────────────────────────────────────────────────────────────────────────────

interface FormPageLayoutProps {
  /** Content rendered inside the main area (between the two side strips) */
  children?: React.ReactNode;
}

export const FormPageLayout: React.FC<FormPageLayoutProps> = ({ children }) => {
  return (
    <div
      id="form-page-root"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#010104",
        overflow: "hidden",
      }}
    >
      {/* ════════════════════════════════════════════════════════════════════
          STARFIELD — subtle CSS-only particle noise (z-index 0)
      ════════════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 28% 42%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 8%,  rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 55%, rgba(255,255,255,0.30) 0%, transparent 100%),
            radial-gradient(1px 1px at 72% 25%, rgba(255,255,255,0.50) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 70%, rgba(255,255,255,0.40) 0%, transparent 100%),
            radial-gradient(1px 1px at 5%  80%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 38% 90%, rgba(255,255,255,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 35%, rgba(255,255,255,0.30) 0%, transparent 100%),
            radial-gradient(1px 1px at 20% 65%, rgba(255,255,255,0.40) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 48%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(2px 2px at 15% 50%, rgba(178,100,246,0.25) 0%, transparent 100%),
            radial-gradient(2px 2px at 68% 82%, rgba(178,100,246,0.20) 0%, transparent 100%)
          `,
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          NAVBAR ROW — two SVG halves at the top (z-index 3)
      ════════════════════════════════════════════════════════════════════ */}
      <div
        id="form-navbar-bar"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          pointerEvents: "none",
          height: 73,
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
        }}
      >
        <div style={{ flex: "0 0 50%", height: "100%" }}>
          <NavbarLeftSVG />
        </div>
        <div style={{ flex: "0 0 50%", height: "100%" }}>
          <NavbarRightSVG />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          LEFT SIDE STRIP — pinned to far left (z-index 2)
      ════════════════════════════════════════════════════════════════════ */}
      <div
        id="form-left-strip"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          width: 97,
          height: "100vh",
        }}
      >
        <LeftSideSVG />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          RIGHT SIDE STRIP — pinned to far right (z-index 2)
      ════════════════════════════════════════════════════════════════════ */}
      <div
        id="form-right-strip"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          pointerEvents: "none",
          width: 97,
          height: "100vh",
        }}
      >
        <RightSideSVG />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          CONTENT AREA — sits above all decorative layers (z-index 10)
          Left and right paddings reserve the 97px strips.
      ════════════════════════════════════════════════════════════════════ */}
      <div
        id="form-content-wrapper"
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          paddingLeft: 97,
          paddingRight: 97,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FormPageLayout;
