import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Brand cyber-style button with a custom polygon clip-path.
 *
 * Hover effect — 1-second cyberpunk glitch burst:
 *   The glitch plays ONCE for exactly 1 second, then the button
 *   returns to its normal cyan state (even while still hovering).
 *   Re-hovering after mouse-leave will re-trigger the burst.
 *
 * Layers (bottom → top):
 *   1. cyber-btn-ghost-top    — magenta top-30% slice, shifts left/right
 *   2. cyber-btn-ghost-bottom — purple/cyan bottom-35% slice (opposite phase)
 *   3. cyber-btn-scanline     — diagonal scanline sweep
 *   4. cyber-btn-label        — visible text with RGB channel-split shadow
 */
export const CyberButton: React.FC<CyberButtonProps> = ({
    children,
    className = '',
    ...props
}) => {
    const clipPath =
        'polygon(0% 0%, 68% 0%, 74% 20%, 100% 20%, 100% 75%, 74% 75%, 65% 100%, 45% 100%, 38% 75%, 0% 75%)';

    /** Shared base for absolute ghost layers */
    const ghostBase: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontStyle: 'italic',
        fontSize: 'inherit',
        letterSpacing: '0.1em',
        pointerEvents: 'none',
        opacity: 0,          // invisible at rest; keyframe handles opacity
    };

    return (
        <button
            {...props}
            className={`cyber-btn relative bg-[#0bd3e8] text-black font-black italic text-xl md:text-3xl flex items-center justify-center active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none ${className}`}
            style={{ clipPath }}
        >
            {/* ── Scanline overlay ── */}
            <span
                className="cyber-btn-scanline"
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    zIndex: 20,
                    pointerEvents: 'none',
                    background:
                        'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.22) 3px,rgba(0,0,0,0.22) 4px)',
                    backgroundSize: '100% 8px',
                }}
            />

            {/* ── Top-slice ghost ── */}
            <span
                className="cyber-btn-ghost-top"
                aria-hidden="true"
                style={{
                    ...ghostBase,
                    zIndex: 10,
                    background: '#ff2df7',
                    color: '#000',
                    clipPath: 'polygon(0 0,100% 0,100% 32%,0 32%)',
                }}
            >
                {children}
            </span>

            {/* ── Bottom-slice ghost ── */}
            <span
                className="cyber-btn-ghost-bottom"
                aria-hidden="true"
                style={{
                    ...ghostBase,
                    zIndex: 10,
                    background: '#6D2EC5',
                    color: '#0bd3e8',
                    clipPath: 'polygon(0 65%,100% 65%,100% 100%,0 100%)',
                }}
            >
                {children}
            </span>

            {/* ── Visible label (always on top) ── */}
            <span
                className="cyber-btn-label"
                style={{
                    position: 'relative',
                    zIndex: 30,
                    letterSpacing: '0.1em',
                }}
            >
                {children}
            </span>
        </button>
    );
};

export default CyberButton;
