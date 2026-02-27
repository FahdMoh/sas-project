import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Layout SVGs sourced from: svg/homePage-svg/layout-svg.txt
//  Colors used:
//    Accent pink/magenta : #FF62FC  /  #ED79F6
//    Neutral lines       : #B3B3B3
//    Arrow tips          : #FFFFFF
//    Frame stroke        : #ED79F6
//    Frame fill gradient : #010104 → #4C227C  (via linearGradient)
//    Page bg             : #010104
// ─────────────────────────────────────────────────────────────────────────────

// SVG 1 — Top navbar frame bar (966×73) ─────────────────────────────────────
const NavbarBarSVG: React.FC = () => (
  <svg
    width="966"
    height="73"
    viewBox="0 0 966 73"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
    preserveAspectRatio="none"
  >
    <path d="M173.908 0.367377C172.182 0.367377 170.729 0.816312 170.194 1.43865H105.407V0H66.2212C63.5365 0 61.3603 0.877297 61.3603 1.95959C61.3603 3.04188 63.5365 3.91918 66.2212 3.91918H105.407V2.4798H170.192C170.728 3.10213 172.18 3.55107 173.906 3.55107C176.088 3.55107 177.856 2.83836 177.856 1.95885C177.856 1.08009 176.088 0.367377 173.908 0.367377Z" fill="#FF62FC"/>
    <path d="M958.69 39.1232H375.528L329.514 20.5736H0V19.8388H330.269L376.282 38.3884H958.69V39.1232Z" fill="#B3B3B3"/>
    <path d="M560.941 47.4376H311.288L271.82 31.5258H177.855V30.791H272.574L312.043 46.7029H560.185L603.816 29.1136H965.069V29.8484H604.571L560.941 47.4376Z" fill="#B3B3B3"/>
    <path d="M53.7673 36.0875V39.2712H115.129V36.0875H53.7673ZM114.218 38.9045H54.6786V36.4549H114.218V38.9045Z" fill="#FF62FC"/>
    <path d="M188.64 36.0875H127.278V39.2712H188.64V36.0875Z" fill="#FF62FC"/>
    <path d="M200.792 36.0875V39.2712H262.153V36.0875H200.792ZM261.242 38.9045H201.703V36.4549H261.242V38.9045Z" fill="#FF62FC"/>
    <path d="M858.814 70.3213H848.615V69.1067L841.979 70.6519L848.615 72.1964V70.9825H858.814V70.3213Z" fill="white"/>
    <path d="M765.989 32.7163H755.791V31.5024L749.153 33.0469L755.791 34.5921V33.3783H765.989V32.7163Z" fill="white"/>
    <path d="M345.385 5.66794H335.187V4.45413L328.549 5.99932L335.187 7.54377V6.32996H345.385V5.66794Z" fill="white"/>
  </svg>
);

// SVG 2 — Main polygon frame / page boundary (1907×1927) ────────────────────
const PolygonFrameSVG: React.FC = () => (
  <svg
    width="1907"
    height="1927"
    viewBox="0 0 1907 1927"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M121.085 1892.49H377.556L433.89 1926.5H682.949L776.346 1878.39H1023.92L1077.29 1851.02L1188.48 1908.25H1536.86H1781.47L1808.16 1914.89L1837.81 1892.49L1897.11 1856L1857.08 1831.11V1528.36L1906 1500.99V1357.49L1815.57 1310.21V1154.28L1775.54 1136.86L1874.87 1079.62V119.112V108.842H1899.5L1874.87 46.9496V26.2132H1292.25L1249.26 0.5H985.377L891.98 51.9264H635.509L610.307 67.6861H571.762L487.26 18.7481H135.91L121.085 33.6783L97.365 18.7481L36.5829 51.9264L81.0576 76.8101V377.903L23.2405 409.422V549.601L121.085 598.539V752.818L165.56 773.554L57.3378 833.275V1795.45L1.00316 1831.94L121.085 1892.49Z"
      fill="url(#paint0_linear_1_29)"
      stroke="#ED79F6"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_29"
        x1="950.908"
        y1="726.531"
        x2="1254.97"
        y2="3447.94"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#010104"/>
        <stop offset="1" stopColor="#4C227C"/>
      </linearGradient>
    </defs>
  </svg>
);

// SVG 3 — Left vertical tech strip (97×1120) ────────────────────────────────
const LeftSideSVG: React.FC = () => (
  <svg
    width="97"
    height="1120"
    viewBox="0 0 97 1120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.488893 917.856C0.488893 919.859 1.08614 921.544 1.91408 922.166L1.91408 997.327H0.000145912L0.000145912 1042.79C0.000145912 1045.9 1.16727 1048.43 2.60712 1048.43C4.04697 1048.43 5.2141 1045.9 5.2141 1042.79L5.2141 997.327H3.29919L3.29919 922.168C4.12712 921.546 4.72437 919.861 4.72437 917.858C4.72437 915.327 3.7762 913.276 2.60614 913.276C1.43706 913.276 0.488893 915.327 0.488893 917.856Z" fill="#FF62FC"/>
    <path d="M52.0461 7.40021L52.0461 683.949L27.3683 737.331L27.3683 1119.61H26.3908L26.3908 736.456L51.0686 683.074L51.0686 7.40021H52.0461Z" fill="#B3B3B3"/>
    <path d="M63.1119 468.844L63.1119 758.476L41.9433 804.265L41.9433 913.277H40.9658L40.9658 803.39L62.1344 757.601L62.1344 469.722L38.7342 419.103L38.7342 0H39.7117L39.7117 418.228L63.1119 468.844Z" fill="#B3B3B3"/>
    <path d="M48.0101 1057.24H52.2456L52.2456 986.048H48.0101L48.0101 1057.24ZM51.7578 987.105L51.7578 1056.18H48.4989L48.4989 987.105H51.7578Z" fill="#FF62FC"/>
    <path d="M48.0101 900.765L48.0101 971.953H52.2456L52.2456 900.765H48.0101Z" fill="#FF62FC"/>
    <path d="M48.0101 886.667H52.2456L52.2456 815.479H48.0101L48.0101 886.667ZM51.7578 816.537L51.7578 885.61H48.4989L48.4989 816.537H51.7578Z" fill="#FF62FC"/>
    <path d="M93.5534 123.27V135.103H91.9376L93.9933 142.802L96.048 135.103H94.4332V123.27H93.5534Z" fill="white"/>
    <path d="M43.5246 230.961V242.792H41.9098L43.9645 250.492L46.0201 242.792H44.4053V230.961H43.5246Z" fill="white"/>
    <path d="M7.54145 718.919L7.54145 730.75H5.92663L7.9823 738.451L10.037 730.75H8.42217L8.42217 718.919H7.54145Z" fill="white"/>
  </svg>
);

// SVG 4 — Right vertical tech strip (97×1120, mirror of SVG 3) ──────────────
const RightSideSVG: React.FC = () => (
  <svg
    width="97"
    height="1120"
    viewBox="0 0 97 1120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'scaleX(-1)' }}
  >
    <path d="M0.488869 917.856C0.488869 919.859 1.08612 921.544 1.91405 922.166L1.91405 997.327H0.00012207L0.00012207 1042.79C0.00012207 1045.9 1.16725 1048.43 2.6071 1048.43C4.04695 1048.43 5.21407 1045.9 5.21407 1042.79L5.21407 997.327H3.29916L3.29916 922.168C4.1271 921.546 4.72435 919.861 4.72435 917.858C4.72435 915.327 3.77618 913.276 2.60612 913.276C1.43704 913.276 0.488869 915.327 0.488869 917.856Z" fill="#FF62FC"/>
    <path d="M52.0462 7.40027L52.0462 683.949L27.3684 737.331L27.3684 1119.61H26.3909L26.3909 736.456L51.0687 683.074L51.0687 7.40027H52.0462Z" fill="#B3B3B3"/>
    <path d="M63.1118 468.844L63.1118 758.476L41.9432 804.265L41.9432 913.277H40.9657L40.9657 803.39L62.1343 757.601L62.1343 469.722L38.7341 419.103L38.7341 0H39.7116L39.7116 418.228L63.1118 468.844Z" fill="#B3B3B3"/>
    <path d="M48.01 1057.24H52.2455L52.2455 986.048H48.01L48.01 1057.24ZM51.7577 987.105L51.7577 1056.18H48.4988L48.4988 987.105H51.7577Z" fill="#FF62FC"/>
    <path d="M48.01 900.765L48.01 971.953H52.2455L52.2455 900.765H48.01Z" fill="#FF62FC"/>
    <path d="M48.01 886.667H52.2455L52.2455 815.479H48.01L48.01 886.667ZM51.7577 816.537L51.7577 885.61H48.4988L48.4988 816.537H51.7577Z" fill="#FF62FC"/>
    <path d="M93.5534 123.27V135.103H91.9376L93.9933 142.802L96.048 135.103H94.4332V123.27H93.5534Z" fill="white"/>
    <path d="M43.5246 230.961V242.792H41.9098L43.9645 250.492L46.0202 242.792H44.4053V230.961H43.5246Z" fill="white"/>
    <path d="M7.54146 718.919L7.54146 730.75H5.92664L7.9823 738.451L10.037 730.75H8.42218L8.42218 718.919H7.54146Z" fill="white"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
//  HomePageLayout
//
//  Layer order (z-index bottom → top):
//    0  Solid page background (#010104)
//    1  Polygon frame SVG — fills the center, clips the inner gradient
//    2  Left + Right side tech strips — inside the polygon edges
//    3  Top navbar bar SVG
//    4  Stars / subtle particle noise (CSS only, no JS)
//    10 Content slots via children (flex column: navbar | hero | about)
// ─────────────────────────────────────────────────────────────────────────────

interface HomePageLayoutProps {
  /** Navbar zone content */
  navbar?: React.ReactNode;
  /** Hero section content */
  hero?: React.ReactNode;
  /** About section content */
  about?: React.ReactNode;
}

export const HomePageLayout: React.FC<HomePageLayoutProps> = ({
  navbar,
  hero,
  about,
}) => {
  return (
    <div
      id="home-page-root"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        background: '#010104',
        overflow: 'hidden',
        // clamp the max-width so the polygon never gets too wide to render
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* ══════════════════════════════════════════════════════════════
          LAYER 1 — Starfield noise (pure CSS, zero JS)
          A radial gradient + tiny white dots via box-shadow trick
      ══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
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

      {/* ══════════════════════════════════════════════════════════════
          LAYER 2 — Polygon frame (SVG 2) — acts as the page border
          Positioned absolutely to fill the viewport height and be
          centered horizontally. The gradient fill (#010104 → #4C227C)
          gives the "inside of polygon is content area" feel.
      ══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          // scale polygon to viewport: its native ratio is 1907w × 1927h
          // We use 100vw as width and let height scale proportionally
          width: '100vw',
          height: 'calc(100vw * 1927 / 1907)',
          minHeight: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <PolygonFrameSVG />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3 — Left side tech strip (SVG 3)
      ══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
          height: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <LeftSideSVG />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3 — Right side tech strip (SVG 4), flipped
      ══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 2,
          pointerEvents: 'none',
          height: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <RightSideSVG />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3 — Top navbar bar (SVG 1) — full width at the top
      ══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <NavbarBarSVG />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          CONTENT — z-index 10+
          Three structural zones stacked vertically:
            1. Navbar zone  (height: ~72px — aligns with top SVG bar)
            2. Hero zone    (flexible — main landing content)
            3. About zone   (anchored below hero)
      ══════════════════════════════════════════════════════════════ */}
      <div
        id="home-content-wrapper"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1800px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Zone 1: Navbar ── */}
        <div
          id="home-zone-navbar"
          style={{
            width: '100%',
            height: 72,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {navbar}
        </div>

        {/* ── Zone 2: Hero ── */}
        <div
          id="home-zone-hero"
          style={{
            width: '100%',
            flex: '1 0 auto',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {hero}
        </div>

        {/* ── Zone 3: About ── */}
        <div
          id="home-zone-about"
          style={{
            width: '100%',
            minHeight: '30vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {about}
        </div>
      </div>
    </div>
  );
};

export default HomePageLayout;
