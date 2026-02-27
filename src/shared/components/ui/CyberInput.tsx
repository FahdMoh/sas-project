import React, { useState, useRef, useEffect, useId } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    label: string;
    as?: 'input' | 'select';
    error?: string | null;
    children?: React.ReactNode; // <option> elements when as="select"
}

// ─── Helper: extract <option> data from children ─────────────────────────────

interface OptionData {
    value: string;
    label: string;
    disabled?: boolean;
}

function extractOptions(children: React.ReactNode): OptionData[] {
    const opts: OptionData[] = [];
    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        const el = child as React.ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>;
        if (el.type === 'option') {
            opts.push({
                value: String(el.props.value ?? ''),
                label: String(el.props.children ?? ''),
                disabled: el.props.disabled,
            });
        }
    });
    return opts;
}

// ─── Custom Cyber Dropdown ────────────────────────────────────────────────────

interface CyberDropdownProps {
    id?: string;
    label: string;
    value: string;
    disabled?: boolean;
    error?: string | null;
    className?: string;
    options: OptionData[];
    onChange: (value: string) => void;
}

const CyberDropdown: React.FC<CyberDropdownProps> = ({
    id,
    label,
    value,
    disabled,
    error,
    className = '',
    options,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const uid = useId();
    const dropdownId = id ?? uid;

    const selectedOption = options.find((o) => o.value === value);
    const displayLabel = selectedOption ? selectedOption.label : options[0]?.label ?? '';

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Scroll focused item into view
    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && listRef.current) {
            const item = listRef.current.children[focusedIndex] as HTMLElement;
            item?.scrollIntoView({ block: 'nearest' });
        }
    }, [focusedIndex, isOpen]);

    const handleToggle = () => {
        if (disabled) return;
        setIsOpen((prev) => {
            if (!prev) {
                // Pre-focus the currently selected option
                const idx = options.findIndex((o) => o.value === value);
                setFocusedIndex(idx >= 0 ? idx : 0);
            }
            return !prev;
        });
    };

    const handleSelect = (optValue: string, optDisabled?: boolean) => {
        if (optDisabled) return;
        onChange(optValue);
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (!isOpen) {
            if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
                e.preventDefault();
                setIsOpen(true);
                const idx = options.findIndex((o) => o.value === value);
                setFocusedIndex(idx >= 0 ? idx : 0);
            }
            return;
        }
        if (e.key === 'Escape') { setIsOpen(false); return; }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (focusedIndex >= 0) handleSelect(options[focusedIndex].value, options[focusedIndex].disabled);
        }
    };

    const borderColor = error ? '#ef4444' : '#ea8cff';

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Floating label */}
            <label
                htmlFor={dropdownId}
                className={`absolute -top-3 left-4 px-2 font-black italic tracking-widest text-sm z-10 pointer-events-none ${
                    error ? 'text-red-500 bg-black' : 'text-[#ea8cff] bg-black'
                }`}
            >
                {label.toUpperCase()}
            </label>

            {/* Trigger button */}
            <button
                id={dropdownId}
                type="button"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={`${dropdownId}-list`}
                disabled={disabled}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                className="w-60 h-23 flex items-center justify-between px-4 py-4 bg-transparent text-left transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                    border: `3px solid ${isOpen ? '#ffffff' : borderColor}`,
                    borderRadius: '0.75rem',
                    color: value ? '#ffffff' : 'rgba(255,255,255,0.4)',
                    boxShadow: isOpen ? `0 0 12px rgba(234,140,255,0.25)` : 'none',
                }}
            >
                <span className="truncate text-sm font-semibold tracking-wide">{displayLabel}</span>

                {/* Custom caret */}
                <svg
                    className="flex-shrink-0 ml-2 transition-transform duration-200"
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: borderColor,
                    }}
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                >
                    <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <ul
                    ref={listRef}
                    id={`${dropdownId}-list`}
                    role="listbox"
                    className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto py-1"
                    style={{
                        maxHeight: '220px',
                        background: '#0a0a0f',
                        border: '2px solid #ea8cff',
                        borderRadius: '0.75rem',
                        boxShadow: '0 0 24px rgba(109,46,197,0.35), 0 8px 32px rgba(0,0,0,0.8)',
                    }}
                >
                    {/* Subtle top accent line */}
                    <li
                        aria-hidden="true"
                        style={{
                            height: '2px',
                            margin: '0 12px 6px',
                            background: 'linear-gradient(90deg, transparent, #6D2EC5, #0bd3e8, transparent)',
                            borderRadius: '1px',
                        }}
                    />

                    {options.map((opt, idx) => {
                        const isSelected = opt.value === value;
                        const isFocused = idx === focusedIndex;
                        const isEmpty = opt.value === '';

                        return (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={isSelected}
                                aria-disabled={opt.disabled}
                                onMouseEnter={() => setFocusedIndex(idx)}
                                onClick={() => handleSelect(opt.value, opt.disabled)}
                                className="flex items-center gap-3 px-4 cursor-pointer select-none transition-all duration-150"
                                style={{
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    color: opt.disabled
                                        ? 'rgba(255,255,255,0.25)'
                                        : isEmpty
                                        ? 'rgba(255,255,255,0.4)'
                                        : isSelected
                                        ? '#0bd3e8'
                                        : isFocused
                                        ? '#ffffff'
                                        : 'rgba(255,255,255,0.75)',
                                    background: isSelected
                                        ? 'rgba(11,211,232,0.08)'
                                        : isFocused
                                        ? 'rgba(234,140,255,0.10)'
                                        : 'transparent',
                                    cursor: opt.disabled ? 'not-allowed' : 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: isSelected ? 700 : 500,
                                    letterSpacing: '0.04em',
                                    borderLeft: isSelected
                                        ? '3px solid #0bd3e8'
                                        : isFocused
                                        ? '3px solid rgba(234,140,255,0.6)'
                                        : '3px solid transparent',
                                }}
                            >
                                {/* Selected checkmark */}
                                {isSelected && !isEmpty ? (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                        style={{ flexShrink: 0, color: '#0bd3e8' }}>
                                        <path d="M1 6L4.5 9.5L11 2" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <span style={{ width: 12, flexShrink: 0 }} />
                                )}
                                <span className="truncate">{opt.label}</span>
                            </li>
                        );
                    })}
                </ul>
            )}

            {error && (
                <span className="absolute -bottom-6 left-2 text-red-500 text-xs font-bold">
                    {error}
                </span>
            )}
        </div>
    );
};

// ─── CyberInput (unified export) ──────────────────────────────────────────────

/**
 * Unified cyberpunk-styled field — renders an <input> or a fully custom
 * themed <select> dropdown using the `as` prop.
 *
 * Floating label:  uses `absolute` positioning offset by `-top-3`, so the *parent*
 *                  wrapper must have extra top-margin (≥ `mt-4`) to avoid overlap.
 * Error message:   positioned `absolute -bottom-6`, so the *parent wrapper* needs
 *                  bottom margin (≥ `mb-6`) when an error is shown.
 * Background note: The floating label has `bg-black` to mask the border behind it.
 *                  Place this component on a black (or matching-dark) background.
 */
export const CyberInput: React.FC<CyberInputProps> = ({
    label,
    as = 'input',
    error,
    className = '',
    children,
    ...props
}) => {
    const baseClasses =
        'w-full bg-transparent border-[3px] border-[#ea8cff] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const errorClasses = error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : '';

    if (as === 'select') {
        const options = extractOptions(children);
        const selectProps = props as React.SelectHTMLAttributes<HTMLSelectElement>;
        return (
            <CyberDropdown
                id={props.id}
                label={label}
                value={String(selectProps.value ?? '')}
                disabled={props.disabled}
                error={error}
                className={className}
                options={options}
                onChange={(val) => {
                    // Fire a synthetic change event compatible with the existing onChange handler
                    if (selectProps.onChange) {
                        selectProps.onChange({
                            target: { value: val } as React.ChangeEvent<HTMLSelectElement>['target'],
                        } as React.ChangeEvent<HTMLSelectElement>);
                    }
                }}
            />
        );
    }

    return (
        <div className={`relative w-full ${className}`}>
            {/* Floating label — bg-black masks the border line behind it */}
            <label
                htmlFor={props.id}
                className={`absolute -top-3 left-4 px-2 font-black italic tracking-widest text-sm z-10 ${
                    error ? 'text-red-500 bg-black' : 'text-[#ea8cff] bg-black'
                }`}
            >
                {label.toUpperCase()}
            </label>

            <input
                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                className={`${baseClasses} ${errorClasses}`}
                autoComplete="off"
            />

            {error && (
                <span className="absolute -bottom-6 left-2 text-red-500 text-xs font-bold">
                    {error}
                </span>
            )}
        </div>
    );
};

export default CyberInput;
