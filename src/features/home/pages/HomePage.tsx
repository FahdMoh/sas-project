import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { useLogout } from '@/features/auth/hooks';
import { CyberButton } from '@/shared/components/ui/CyberButton';
import { PageMask } from '@/shared/components/ui/PageMask';

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { handleLogout } = useLogout();

  return (
    <div className="flex flex-col relative min-h-screen w-full overflow-hidden" style={{ background: '#010103' }}>
      <PageMask />

      {/* ── CYBERPUNK BACKGROUND LAYERS ── */}
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,183,214,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,183,214,0.04) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute pointer-events-none z-0" style={{ width: 600, height: 600, top: -160, right: -160, borderRadius: '50%', background: 'rgba(238,121,242,0.09)', filter: 'blur(90px)' }} />
      <div className="absolute pointer-events-none z-0" style={{ width: 700, height: 700, bottom: -200, left: -200, borderRadius: '50%', background: 'rgba(94,39,167,0.14)', filter: 'blur(100px)' }} />
      <div className="absolute pointer-events-none z-0" style={{ width: 350, height: 350, top: '35%', left: '40%', borderRadius: '50%', background: 'rgba(0,183,214,0.07)', filter: 'blur(80px)' }} />

      {/* Scan line */}
      <div className="absolute inset-x-0 pointer-events-none z-0" style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(0,183,214,0.5), transparent)', animation: 'scanline 7s linear infinite' }} />

      <style>{`
        @keyframes scanline { 0% { top: -2px; } 100% { top: 100%; } }
        @keyframes cpulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.3; transform:scale(0.75); } }
        @keyframes ticker { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        @keyframes glowpulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
      `}</style>

      {/* ── TOP-RIGHT LOGOUT ── */}
      {isAuthenticated && (
        <div className="absolute top-6 right-20 z-20">
          <button
            onClick={handleLogout}
            className="text-xs font-semibold tracking-widest uppercase transition-all duration-300"
            style={{
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid #3a3a3a',
              padding: '8px 20px',
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 92% 100%, 0 100%)',
              background: 'transparent',
              fontFamily: 'monospace',
              letterSpacing: '0.25em',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ee79f2'; e.currentTarget.style.borderColor = 'rgba(238,121,242,0.5)'; e.currentTarget.style.background = 'rgba(238,121,242,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = '#3a3a3a'; e.currentTarget.style.background = 'transparent'; }}
          >
            Logout
          </button>
        </div>
      )}

      {/* ── HERO CONTENT ── */}
      <div className="flex flex-row items-center justify-center flex-grow w-full gap-0 relative z-10" style={{ padding: '60px' }}>

        {/* ══ LEFT: Text + CTA ══ */}
        <div className="flex flex-col items-start justify-center flex-1 z-10" style={{ gap: 36, maxWidth: 560 }}>

        

          {/* Status badge */}
          {isAuthenticated && (
            <div
              className="flex items-center gap-2"
              style={{
                padding: '6px 16px',
                border: '1px solid rgba(0,183,214,0.35)',
                background: 'rgba(0,183,214,0.05)',
                clipPath: 'polygon(0 0, 100% 0, 100% 60%, 96% 100%, 0 100%)',
              }}
            >
              <span
                className="rounded-full"
                style={{ width: 7, height: 7, background: '#00b7d6', boxShadow: '0 0 8px #00b7d6', animation: 'cpulse 2s ease-in-out infinite', display: 'inline-block' }}
              />
              <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#00b7d6' }}>
                Session Active
              </span>
            </div>
          )}

          {/* Hero heading */}
          <div className="flex flex-col" style={{ gap: 6 }}>
         
            <h1
              style={{
                fontFamily: 'monospace',
                fontWeight: 900,
                fontSize: 'clamp(56px, 7vw, 96px)',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #ffffff 0%, #00b7d6 45%, #5e27a7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 28px rgba(0,183,214,0.4))',
                margin: 0,
              }}
            >
              SAS<br />Project
            </h1>
          </div>

          {/* Descriptor line */}
          <div className="flex items-stretch" style={{ gap: 0 }}>
            <div style={{ width: 3, background: 'linear-gradient(180deg, #5e27a7, #ee79f2)', flexShrink: 0, marginRight: 16 }} />
            <p style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase', lineHeight: 1.7, margin: 0 }}>
              Document Management System<br />
              <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 9 }}>Secure · Encrypted · Classified</span>
            </p>
          </div>

       

          {/* CTA Button — keeping your exact CyberButton + navigate logic */}
          <div className="relative group" style={{ marginTop: 4 }}>
            {/* Glow halo */}
            <div
              className="absolute inset-0 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(ellipse, rgba(0,183,214,0.45) 0%, rgba(94,39,167,0.3) 60%, transparent 80%)',
                filter: 'blur(20px)',
              }}
            />
            {isAuthenticated ? (
              <CyberButton
                onClick={() => navigate('/form')}
                className="min-w-[220px] px-12 py-6 text-2xl"
              >
                Enter System
              </CyberButton>
            ) : (
              <CyberButton
                onClick={() => navigate('/login')}
                className="min-w-[200px] px-12 py-6 text-2xl"
              >
                Login
              </CyberButton>
            )}
          </div>

     

        </div>

        {/* ══ RIGHT: Decorative SVG diagram — your original SVG, just restyled wrapper ══ */}
        <div
          className="hidden lg:flex items-center justify-center flex-shrink-0 relative"
          style={{
            opacity: 0.85,
            filter: 'drop-shadow(0 0 22px rgba(94,39,167,0.5)) drop-shadow(0 0 8px rgba(238,121,242,0.2))',
          }}
        >
          {/* Corner brackets around SVG */}
          <div style={{ position: 'absolute', top: -8, left: -8, width: 22, height: 22, borderTop: '2px solid #ee79f2', borderLeft: '2px solid #ee79f2' }} />
          <div style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderTop: '2px solid #ee79f2', borderRight: '2px solid #ee79f2' }} />
          <div style={{ position: 'absolute', bottom: -8, left: -8, width: 22, height: 22, borderBottom: '2px solid #ee79f2', borderLeft: '2px solid #ee79f2' }} />
          <div style={{ position: 'absolute', bottom: -8, right: -8, width: 22, height: 22, borderBottom: '2px solid #ee79f2', borderRight: '2px solid #ee79f2' }} />

          {/* Your original SVG — untouched */}
          <svg width="400" height="645" viewBox="0 0 626 784" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M564.857 426.939H546.029V411.87H533.476V426.939H514.648V436.984H533.476V452.053H546.029V436.984H564.857V426.939Z" fill="#6D2EC5"/>
            <ellipse cx="451.886" cy="180.821" rx="1.56905" ry="1.2557" fill="#6D2EC5"/>
            <path d="M456.078 184.174L474.907 199.242" stroke="#6D2EC5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="476.991" cy="200.912" rx="1.56905" ry="1.2557" fill="#6D2EC5"/>
            <ellipse cx="502.097" cy="683.102" rx="1.56905" ry="1.2557" fill="#6D2EC5"/>
            <path d="M497.736 686.593L403.86 761.722" stroke="#6D2EC5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="401.678" cy="763.467" rx="1.56905" ry="1.2557" fill="#6D2EC5"/>
            <path d="M338.914 281.277V301.369" stroke="#6D2EC5" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M326.362 291.323H351.467" stroke="#6D2EC5" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M301.257 40.1826L338.914 70.3194" stroke="#6D2EC5" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square"/>
            <path d="M313.81 30.137L351.467 60.2738" stroke="#6D2EC5" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square"/>
            <ellipse cx="464.437" cy="431.962" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M462.255 433.707L415.324 471.265" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="414.227" cy="472.144" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="238.495" cy="331.506" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M240.677 329.76L287.607 292.202" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="288.705" cy="291.323" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="37.6588" cy="492.235" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M39.8898 490.452L136.967 412.762" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="138.078" cy="411.87" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="439.331" cy="572.6" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M441.513 574.346L488.444 611.904" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="489.541" cy="612.783" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="263.599" cy="592.692" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M265.812 590.921L337.8 533.309" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="338.913" cy="532.418" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M338.915 529.906V473.4" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="338.915" cy="472.144" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M341.128 534.188L413.116 591.8" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="414.229" cy="592.692" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="238.495" cy="411.87" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M238.495 414.382V490.98" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="238.495" cy="492.235" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="439.331" cy="492.235" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M441.513 493.981L488.444 531.539" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="489.541" cy="532.418" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="163.183" cy="351.597" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M165.396 349.826L237.383 292.215" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="238.497" cy="291.323" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="263.599" cy="271.232" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M265.781 269.486L312.711 231.928" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="313.809" cy="231.049" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M313.811 228.538V111.758" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="313.811" cy="110.502" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="288.703" cy="90.4107" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M288.703 92.9221V209.702" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="288.703" cy="210.958" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="112.971" cy="351.597" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M115.202 349.814L287.593 211.85" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="288.704" cy="210.958" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="62.7628" cy="351.597" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M62.7628 354.108V470.889" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="62.7628" cy="472.144" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="338.915" cy="351.597" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M341.146 349.814L438.223 272.123" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="439.334" cy="271.232" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="514.648" cy="271.232" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M516.921 273.052L538.606 290.406" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="539.752" cy="291.323" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="439.331" cy="411.87" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M439.331 409.359V372.944" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="439.331" cy="371.688" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="539.752" cy="532.418" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M541.933 530.672L588.864 493.114" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="589.961" cy="492.235" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <ellipse cx="188.287" cy="371.688" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M188.287 374.199V450.797" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <ellipse cx="188.287" cy="452.053" rx="0.784524" ry="0.627851" fill="#6D2EC5"/>
            <path d="M338.916 387.384C322.017 387.384 308.319 398.347 308.319 411.871C308.319 425.394 322.017 436.357 338.916 436.357C355.814 436.357 369.512 425.394 369.512 411.871C369.512 398.347 355.814 387.384 338.916 387.384Z" fill="#6D2EC5"/>
            <path d="M439.333 253.652C441.066 253.652 442.471 252.528 442.471 251.14C442.471 249.753 441.066 248.629 439.333 248.629C437.6 248.629 436.195 249.753 436.195 251.14C436.195 252.528 437.6 253.652 439.333 253.652Z" fill="#6D2EC5"/>
            <path d="M238.497 334.017C240.23 334.017 241.635 332.893 241.635 331.506C241.635 330.119 240.23 328.994 238.497 328.994C236.764 328.994 235.359 330.119 235.359 331.506C235.359 332.893 236.764 334.017 238.497 334.017Z" fill="#6D2EC5"/>
            <path d="M338.913 334.017C340.646 334.017 342.051 332.893 342.051 331.506C342.051 330.119 340.646 328.994 338.913 328.994C337.18 328.994 335.775 330.119 335.775 331.506C335.775 332.893 337.18 334.017 338.913 334.017Z" fill="#6D2EC5"/>
            <path d="M338.913 253.652C340.646 253.652 342.051 252.528 342.051 251.14C342.051 249.753 340.646 248.629 338.913 248.629C337.18 248.629 335.775 249.753 335.775 251.14C335.775 252.528 337.18 253.652 338.913 253.652Z" fill="#6D2EC5"/>
            <path d="M238.497 414.382C240.23 414.382 241.635 413.258 241.635 411.871C241.635 410.484 240.23 409.359 238.497 409.359C236.764 409.359 235.359 410.484 235.359 411.871C235.359 413.258 236.764 414.382 238.497 414.382Z" fill="#6D2EC5"/>
            <path d="M338.913 534.929C340.646 534.929 342.051 533.805 342.051 532.418C342.051 531.031 340.646 529.907 338.913 529.907C337.18 529.907 335.775 531.031 335.775 532.418C335.775 533.805 337.18 534.929 338.913 534.929Z" fill="#6D2EC5"/>
            <path d="M313.809 233.561C315.542 233.561 316.947 232.436 316.947 231.049C316.947 229.662 315.542 228.538 313.809 228.538C312.076 228.538 310.671 229.662 310.671 231.049C310.671 232.436 312.076 233.561 313.809 233.561Z" fill="#6D2EC5"/>
            <path d="M288.705 213.47C290.438 213.47 291.843 212.345 291.843 210.958C291.843 209.571 290.438 208.447 288.705 208.447C286.972 208.447 285.567 209.571 285.567 210.958C285.567 212.345 286.972 213.47 288.705 213.47Z" fill="#6D2EC5"/>
            <path d="M338.913 374.2C340.646 374.2 342.051 373.075 342.051 371.688C342.051 370.301 340.646 369.177 338.913 369.177C337.18 369.177 335.775 370.301 335.775 371.688C335.775 373.075 337.18 374.2 338.913 374.2Z" fill="#6D2EC5"/>
            <path d="M338.913 454.564C340.646 454.564 342.051 453.44 342.051 452.053C342.051 450.666 340.646 449.542 338.913 449.542C337.18 449.542 335.775 450.666 335.775 452.053C335.775 453.44 337.18 454.564 338.913 454.564Z" fill="#6D2EC5"/>
            <path d="M389.125 414.382C390.858 414.382 392.263 413.258 392.263 411.871C392.263 410.484 390.858 409.359 389.125 409.359C387.392 409.359 385.987 410.484 385.987 411.871C385.987 413.258 387.392 414.382 389.125 414.382Z" fill="#6D2EC5"/>
            <path d="M439.333 414.382C441.066 414.382 442.471 413.258 442.471 411.871C442.471 410.484 441.066 409.359 439.333 409.359C437.6 409.359 436.195 410.484 436.195 411.871C436.195 413.258 437.6 414.382 439.333 414.382Z" fill="#6D2EC5"/>
            <path d="M489.541 454.564C491.274 454.564 492.679 453.44 492.679 452.053C492.679 450.666 491.274 449.542 489.541 449.542C487.808 449.542 486.403 450.666 486.403 452.053C486.403 453.44 487.808 454.564 489.541 454.564Z" fill="#6D2EC5"/>
            <path d="M439.333 494.747C441.066 494.747 442.471 493.622 442.471 492.235C442.471 490.848 441.066 489.724 439.333 489.724C437.6 489.724 436.195 490.848 436.195 492.235C436.195 493.622 437.6 494.747 439.333 494.747Z" fill="#6D2EC5"/>
            <path d="M539.753 494.747C541.486 494.747 542.891 493.622 542.891 492.235C542.891 490.848 541.486 489.724 539.753 489.724C538.02 489.724 536.615 490.848 536.615 492.235C536.615 493.622 538.02 494.747 539.753 494.747Z" fill="#6D2EC5"/>
            <path d="M589.961 534.929C591.694 534.929 593.099 533.805 593.099 532.418C593.099 531.031 591.694 529.907 589.961 529.907C588.228 529.907 586.823 531.031 586.823 532.418C586.823 533.805 588.228 534.929 589.961 534.929Z" fill="#6D2EC5"/>
            <path d="M539.753 334.017C541.486 334.017 542.891 332.893 542.891 331.506C542.891 330.119 541.486 328.994 539.753 328.994C538.02 328.994 536.615 330.119 536.615 331.506C536.615 332.893 538.02 334.017 539.753 334.017Z" fill="#6D2EC5"/>
            <path d="M539.753 293.834C541.486 293.834 542.891 292.71 542.891 291.323C542.891 289.936 541.486 288.812 539.753 288.812C538.02 288.812 536.615 289.936 536.615 291.323C536.615 292.71 538.02 293.834 539.753 293.834Z" fill="#6D2EC5"/>
            <path d="M12.5524 334.017C14.2855 334.017 15.6905 332.893 15.6905 331.506C15.6905 330.119 14.2855 328.994 12.5524 328.994C10.8193 328.994 9.41431 330.119 9.41431 331.506C9.41431 332.893 10.8193 334.017 12.5524 334.017Z" fill="#6D2EC5"/>
            <path d="M12.5524 494.747C14.2855 494.747 15.6905 493.622 15.6905 492.235C15.6905 490.848 14.2855 489.724 12.5524 489.724C10.8193 489.724 9.41431 490.848 9.41431 492.235C9.41431 493.622 10.8193 494.747 12.5524 494.747Z" fill="#6D2EC5"/>
            <path d="M12.5524 221.004V210.958H25.1047L12.5524 221.004Z" fill="#6D2EC5"/>
            <path d="M12.5521 509.3V532.418L162.067 652.074" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M166.356 652.965H218.73" stroke="#6D2EC5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.64795 507.706L12.5549 502.281L16.4618 507.706H8.64795Z" fill="#6D2EC5"/>
            <path d="M219.17 656.092L225.948 652.965L219.17 649.839V656.092Z" fill="#6D2EC5"/>
            <path d="M276.151 524.884C277.884 524.884 279.289 523.759 279.289 522.372C279.289 520.985 277.884 519.861 276.151 519.861C274.418 519.861 273.013 520.985 273.013 522.372C273.013 523.759 274.418 524.884 276.151 524.884Z" fill="#6D2EC5"/>
            <path d="M338.913 595.203C340.646 595.203 342.051 594.079 342.051 592.692C342.051 591.305 340.646 590.18 338.913 590.18C337.18 590.18 335.775 591.305 335.775 592.692C335.775 594.079 337.18 595.203 338.913 595.203Z" fill="#6D2EC5"/>
            <path d="M414.229 595.203C415.962 595.203 417.367 594.079 417.367 592.692C417.367 591.305 415.962 590.18 414.229 590.18C412.496 590.18 411.091 591.305 411.091 592.692C411.091 594.079 412.496 595.203 414.229 595.203Z" fill="#6D2EC5"/>
            <path d="M263.601 595.203C265.334 595.203 266.739 594.079 266.739 592.692C266.739 591.305 265.334 590.18 263.601 590.18C261.868 590.18 260.463 591.305 260.463 592.692C260.463 594.079 261.868 595.203 263.601 595.203Z" fill="#6D2EC5"/>
            <path d="M338.913 655.477C340.646 655.477 342.051 654.352 342.051 652.965C342.051 651.578 340.646 650.454 338.913 650.454C337.18 650.454 335.775 651.578 335.775 652.965C335.775 654.352 337.18 655.477 338.913 655.477Z" fill="#6D2EC5"/>
            <path d="M338.913 735.842C340.646 735.842 342.051 734.717 342.051 733.33C342.051 731.943 340.646 730.819 338.913 730.819C337.18 730.819 335.775 731.943 335.775 733.33C335.775 734.717 337.18 735.842 338.913 735.842Z" fill="#6D2EC5"/>
            <path d="M238.497 655.477C240.23 655.477 241.635 654.352 241.635 652.965C241.635 651.578 240.23 650.454 238.497 650.454C236.764 650.454 235.359 651.578 235.359 652.965C235.359 654.352 236.764 655.477 238.497 655.477Z" fill="#6D2EC5"/>
          </svg>
        </div>
      </div>

      {/* ── BOTTOM: Your original bottom SVG — untouched ── */}
      <div className="relative z-10" >
        {/* Live ticker above bottom SVG */}
        {/* <div className="flex items-center overflow-hidden" style={{ height: 28, borderBottom: '1px solid #3a3a3a', background: 'rgba(1,1,3,0.9)' }}>
          <div
            style={{
              padding: '0 18px',
              fontFamily: 'monospace',
              fontSize: 8,
              letterSpacing: '0.3em',
              color: '#ee79f2',
              textTransform: 'uppercase',
              borderRight: '1px solid #3a3a3a',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(94,39,167,0.12)',
              flexShrink: 0,
            }}
          >
            // Live Feed
          </div>
          <div style={{ flex: 1, overflow: 'hidden', padding: '0 16px' }}>
            <div style={{ display: 'flex', gap: 50, whiteSpace: 'nowrap', animation: 'ticker 22s linear infinite' }}>
              {['SAS-PROJECT', 'DOC-MGMT-SYS', 'ENCRYPTION: AES-256', 'CLEARANCE: LEVEL 4', 'UPTIME: 99.9%', 'NODES: 14 ACTIVE', 'THREAT: NOMINAL',
                'SAS-PROJECT', 'DOC-MGMT-SYS', 'ENCRYPTION: AES-256', 'CLEARANCE: LEVEL 4', 'UPTIME: 99.9%', 'NODES: 14 ACTIVE', 'THREAT: NOMINAL'].map((item, i) => (
                <span key={i} style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
                  <span style={{ color: '#00b7d6', marginRight: 6 }}>▸</span>{item}
                </span>
              ))}
            </div>
          </div>
        </div> */}

        <svg
          width="1900"
          height="300"
          viewBox="0 0 1502 241"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
        >
          <path d="M1501.78 36.5488V30.815V0H1465.8V31.3525H1473V78.3822H1465.8V87.5194H1501.78V36.5488Z" fill="#ED79F6"/>
          <path d="M492.596 177.875L438.954 212.6H410.107V217.588H383.123V212.6H347.624L376.501 231.294H594.644L554.159 205.089V177.875H492.596ZM516.983 210.99V212.603H490.647V195.554H516.983V210.99Z" fill="#ED79F6"/>
          <path d="M1121.87 187.76L1170.85 156.049H1205.93V127.472H1099.56L1032.17 171.098H846.466L819.621 153.72H771.618L799.094 171.507V187.762H879.63V182.925H1070.18V187.762H1121.87V187.76ZM1107.68 140.597C1115.7 140.597 1122.2 144.809 1122.21 150.003C1122.2 155.197 1115.7 159.407 1107.68 159.409C1099.65 159.407 1093.15 155.197 1093.15 150.003C1093.15 144.809 1099.65 140.597 1107.68 140.597Z" fill="#ED79F6"/>
          <path d="M340.578 212.603H277.291L0 33.0962V45.4174L287.135 231.296H369.455L340.578 212.603Z" fill="#ED79F6"/>
          <path d="M1307.21 166.932H1181.84V171.427H1307.21V166.932Z" fill="#ED79F6"/>
          <path d="M649.643 209.378V187.76H794.11V172.842L764.572 153.72H473.674L412.234 193.494H274.963L23.666 30.8151H3.52356L279.357 209.378H383.125V204.078H410.109V209.378H436.893L490.536 174.652H616.432V209.378H649.643ZM768.787 165.319V180.762L748.126 173.04L768.787 165.319ZM738.346 165.319V180.762L717.685 173.04L738.346 165.319ZM707.901 165.319V180.762L687.244 173.04L707.901 165.319ZM677.457 165.319V180.762L656.796 173.04L677.457 165.319ZM621.277 195.285H630.825V189.104H636.637V195.285H646.185V199.047H636.637V205.228H630.825V199.047H621.277V195.285Z" fill="#ED79F6"/>
          <path d="M1457.94 143.76L1501.78 115.378V90.7444H1427.4L1362.22 132.937L1426.78 174.729V185.879H1430.51V210.99H1426.78V219.472H1243.29V240.074H1502V219.149L1457.94 190.626V143.76ZM1397.79 230.447H1271.45C1268.12 230.447 1265.43 228.703 1265.43 226.549C1265.43 224.397 1268.12 222.651 1271.45 222.651H1397.79C1401.11 222.651 1403.81 224.397 1403.81 226.549C1403.81 228.701 1401.11 230.447 1397.79 230.447ZM1473 213.248C1481.02 213.25 1487.52 217.457 1487.53 222.654C1487.52 227.848 1481.02 232.057 1473 232.059C1464.97 232.057 1458.47 227.848 1458.47 222.654C1458.47 217.457 1464.97 213.25 1473 213.248Z" fill="#ED79F6"/>
          <path d="M1107.68 156.184C1112.95 156.178 1117.22 153.417 1117.23 150.003C1117.22 146.589 1112.95 143.828 1107.68 143.822C1102.41 143.828 1098.14 146.589 1098.13 150.003C1098.14 153.415 1102.41 156.178 1107.68 156.184ZM1107.68 145.209C1111.77 145.209 1115.08 147.354 1115.08 150.001C1115.08 152.647 1111.77 154.795 1107.68 154.795C1103.59 154.795 1100.27 152.65 1100.27 150.001C1100.27 147.354 1103.59 145.209 1107.68 145.209Z" fill="#ED79F6"/>
          <path d="M1460.82 31.3525V0H1451.18L1422.4 18.6335V30.8171H1343.25V83.8044H1295.58L1228.11 127.476H1210.91V156.053H1319.47L1425.33 87.5237H1460.82V78.3865H1453.76V31.3568H1460.82V31.3525ZM1309.71 113.856H1300.16V120.037H1294.35V113.856H1284.8V110.094H1294.35V103.913H1300.16V110.094H1309.71V113.856ZM1417.65 43.3555H1352.88V36.3231H1417.65V43.3555Z" fill="#ED79F6"/>
          <path d="M1473 228.835C1478.27 228.828 1482.53 226.065 1482.54 222.653C1482.53 219.239 1478.27 216.479 1473 216.472C1467.73 216.479 1463.46 219.239 1463.45 222.653C1463.46 226.063 1467.73 228.828 1473 228.835ZM1473 217.859C1477.08 217.859 1480.4 220.005 1480.4 222.651C1480.4 225.296 1477.08 227.444 1473 227.444C1468.91 227.444 1465.59 225.298 1465.59 222.651C1465.59 220.005 1468.91 217.859 1473 217.859Z" fill="#ED79F6"/>
          <path d="M1238.3 216.247H1421.79V210.99H1417.64V185.879H1421.79V176.067L1358.69 135.218L1321.53 159.274H1172.91L1123.93 190.985H1070.17V195.285H879.624V190.985H654.62V212.603H611.446V177.877H559.138V203.756L601.685 231.299H696.459L735.482 206.037H1121.28L1173.87 240.077H1238.3V216.247ZM1176.86 163.707H1312.2V173.04V174.652H1176.86V163.707Z" fill="#ED79F6"/>
          <path d="M511.998 198.779H495.625V209.378H511.998V198.779Z" fill="#ED79F6"/>
          <path d="M30.5361 21.8564L134.041 88.8633L150.926 77.9352L205.445 113.228V124.337L297.539 183.953H398.819L442.863 155.44V141.178H414.123V157.616L386.159 175.718H319.471V139.387L270.528 107.705H243.086V90.2973L166.977 41.0273L144.284 55.7178L95.2975 24.0063L30.5361 21.8564Z" fill="#3A3A3A"/>
          <path d="M3.4749 180.113V186.219L85.7418 239.477L95.2235 239.507L3.4749 180.113Z" fill="#3A3A3A"/>
          <path d="M69.6178 239.425L79.0962 239.455L3.4749 190.501V196.607L69.6178 239.425Z" fill="#3A3A3A"/>
          <path d="M27.0924 150.003L11.3837 160.172L134.125 239.629L274.355 240.074L162.799 167.858H133.208L80.5986 133.801V114.125L3.35326 64.1196V94.238L27.0924 109.606V150.003Z" fill="#3A3A3A"/>
          <path d="M3.4749 200.89V205.228L56.2338 239.382L62.9723 239.403L3.4749 200.89Z" fill="#3A3A3A"/>
          <path d="M8.07462 162.313L3.4749 165.289V165.442L117.996 239.578L127.475 239.608L8.07462 162.313Z" fill="#3A3A3A"/>
          <path d="M3.4749 169.724V175.83L101.869 239.526L111.351 239.556L3.4749 169.724Z" fill="#3A3A3A"/>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;