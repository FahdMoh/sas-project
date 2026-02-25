import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Brand cyber-style button with a custom polygon clip-path.
 * Accepts all standard HTML button attributes; merge extra classes via `className`.
 *
 * Sizing tip: add explicit width/height or padding via `className` to control
 * how the clip-path shape scales (e.g. `px-10 py-5 min-w-[160px]`).
 */
export const CyberButton: React.FC<CyberButtonProps> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            {...props}
            className={`relative bg-[#0bd3e8] text-black font-black italic text-xl md:text-3xl flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed ${className}`}
            style={{
                clipPath:
                    'polygon(0% 0%, 68% 0%, 74% 20%, 100% 20%, 100% 75%, 74% 75%, 65% 100%, 45% 100%, 38% 75%, 0% 75%)',
            }}
        >
            <span className="tracking-widest">{children}</span>
        </button>
    );
};

export default CyberButton;
