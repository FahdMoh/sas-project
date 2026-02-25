import React from 'react';

// ─── Shared SVG pattern (left-top-border / top-right-border from notes-ai.txt) ─
// Natural dimensions: 74 px wide × 1080 px tall.
// preserveAspectRatio="none" lets CSS width/height override the intrinsic ratio.
const SvgPattern: React.FC<{
  style?: React.CSSProperties;
  className?: string;
}> = ({ style, className }) => (
  <svg
    width="74"
    height="1080"
    viewBox="0 0 74 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    style={style}
    className={className}
  >
    <path
      d="M-0.618993 190.781C-0.618993 188.828 -0.152806 187.184 0.493446 186.578L0.493446 113.271H-1.00049L-1.00049 68.9306C-1.00049 65.8928 -0.0894785 63.4304 1.03441 63.4304C2.15829 63.4304 3.0693 65.8928 3.0693 68.9306L3.0693 113.271H1.5746L1.5746 186.576C2.22086 187.182 2.68704 188.826 2.68704 190.779C2.68704 193.247 1.94694 195.248 1.03364 195.248C0.121107 195.248 -0.618993 193.247 -0.618993 190.781Z"
      fill="#FF62FC"
    />
    <path
      d="M39.6275 1078.78L39.6275 418.919L20.365 366.853L20.365 -6.00012H19.6021L19.6021 367.707L38.8645 419.773L38.8645 1078.78H39.6275Z"
      fill="#B3B3B3"
    />
    <path
      d="M48.2592 628.718L48.2592 346.23L31.7359 301.57L31.7359 195.247H30.9729L30.9729 302.424L47.4962 347.083L47.4962 627.862L29.231 677.232L29.231 1086H29.9939L29.9939 678.086L48.2592 628.718Z"
      fill="#B3B3B3"
    />
    <path
      d="M36.4741 54.8387H39.7802L39.7802 124.271H36.4741L36.4741 54.8387ZM39.3994 123.24L39.3994 55.8699H36.8556L36.8556 123.24H39.3994Z"
      fill="#FF62FC"
    />
    <path
      d="M36.4741 207.451L36.4741 138.019H39.7802L39.7802 207.451H36.4741Z"
      fill="#FF62FC"
    />
    <path
      d="M36.4741 221.201H39.7802L39.7802 290.633H36.4741L36.4741 221.201ZM39.3994 289.602L39.3994 222.232H36.8556L36.8556 289.602H39.3994Z"
      fill="#FF62FC"
    />
    <path
      d="M72.0232 965.769V954.228H70.762L72.3665 946.719L73.9703 954.228H72.7099V965.769H72.0232Z"
      fill="white"
    />
    <path
      d="M32.9731 860.735V849.196H31.7126L33.3165 841.685L34.921 849.196H33.6606V860.735H32.9731Z"
      fill="white"
    />
    <path
      d="M4.88522 384.811L4.88522 373.273H3.62476L5.22932 365.762L6.83313 373.273H5.57267L5.57267 384.811H4.88522Z"
      fill="white"
    />
  </svg>
);

// ─── Transform proof for the horizontal top strip ────────────────────────────
//
// The SVG is naturally 74 px wide × 1080 px tall (a vertical strip).
// We want to lay it HORIZONTALLY along the top (1080 px wide × 74 px tall).
//
// With  transformOrigin = '0 0'  and  transform = 'rotate(-90deg) translateX(-100%)':
//   Step 1 – translateX(-100%) = translateX(-74px):
//     element moves to  x:[-74, 0], y:[0, 1080]
//   Step 2 – rotate(-90deg) around (0,0):   (x,y) → (y, -x)
//     (-74, 0)    → (0,   74)
//     ( 0,  0)    → (0,    0)
//     (-74, 1080) → (1080, 74)
//     ( 0,  1080) → (1080,  0)
//   ➜ Element occupies  x:[0, 1080], y:[0, 74]  ✓ perfect horizontal bar.
//
// For the RIGHT half top strip – wrap in  scaleX(-1)  to mirror symmetrically.
// ─────────────────────────────────────────────────────────────────────────────

/** The style applied to every horizontally-rotated SVG in the top strip. */
const TOP_SVG_STYLE: React.CSSProperties = {
  display: 'block',
  // Keep the natural 74 × 1080 CSS box so the transform math above holds.
  width: '74px',
  height: '1080px',
  transformOrigin: '0 0',
  transform: 'rotate(-90deg) translateX(-100%)',
};

// ─── PageMask ─────────────────────────────────────────────────────────────────
/**
 * Renders the decorative SVG frame (left, right, top) as a fixed overlay.
 *
 * • `fixed inset-0 z-50`  → always covers the viewport, above page content.
 * • `pointer-events-none` → clicks pass straight through to the page below.
 * • `overflow-hidden`     → rotated SVGs that extend beyond viewport are clipped.
 *
 * Usage: drop `<PageMask />` as the first child inside any page's root element.
 */
export const PageMask: React.FC = () => (
  <div
    className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
    aria-hidden="true"
  >
    {/* ── LEFT VERTICAL STRIP ───────────────────────────────────────────── */}
    <div className="absolute top-0 left-0 h-screen">
      <SvgPattern className="h-full w-auto" />
    </div>

    {/* ── RIGHT VERTICAL STRIP (horizontally mirrored) ──────────────────── */}
    <div className="absolute top-0 right-0 h-screen">
      <SvgPattern
        className="h-full w-auto"
        style={{ transform: 'scaleX(-1)' }}
      />
    </div>

    {/* ── TOP HORIZONTAL STRIP ──────────────────────────────────────────── */}
    {/*
      Container: full-width × 74 px, clips anything outside the top band.
      Two halves share the same rotation trick so the pattern meets in the
      middle. The right half wraps in scaleX(-1) for a symmetric reflection.
    */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '74px',
        overflow: 'hidden',
      }}
    >
      {/* Left half -------------------------------------------------------- */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '74px',
          overflow: 'hidden',
        }}
      >
        <SvgPattern style={TOP_SVG_STYLE} />
      </div>

      {/* Right half (mirror of left) --------------------------------------- */}
      {/*
        scaleX(-1) on the wrapper reflects the already-rotated strip so the
        design runs symmetrically from the right edge inward, matching the
        left half at the centre of the screen.
      */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '74px',
          overflow: 'hidden',
          transform: 'scaleX(-1)',
          transformOrigin: 'right center',
        }}
      >
        <SvgPattern style={TOP_SVG_STYLE} />
      </div>
    </div>
  </div>
);

export default PageMask;
