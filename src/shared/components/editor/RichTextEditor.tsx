import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { QUILL_MODULES, QUILL_FORMATS } from './toolbar-config';

interface RichTextEditorProps {
    /** Current HTML string value (controlled). */
    value: string;
    /** Called with the updated HTML string on every change. */
    onChange: (htmlString: string) => void;
    /** Placeholder text shown when the editor is empty. */
    placeholder?: string;
    /** Optional label override (default: "DOCUMENT CONTENT"). */
    label?: string;
}

/**
 * Controlled rich text editor backed by Quill (via react-quill-new).
 *
 * Styled to match the `CyberInput` cyberpunk aesthetic:
 *  • Floating neon label (identical to CyberInput)
 *  • 3px #ea8cff border, white on focus-within
 *  • Dark toolbar with neon-cyan icon hover states
 *  • Transparent / pitch-black content area
 *
 * Output contract: `onChange` always receives a valid HTML string,
 * e.g. `<p>Hello <strong>world</strong></p>`, ready for the API.
 */
const RichTextEditor = ({
    value,
    onChange,
    placeholder = 'Start typing your document content here…',
    label = 'DOCUMENT CONTENT',
}: RichTextEditorProps) => {
    return (
        /* ── Outer wrapper — mirrors CyberInput's `relative w-full` shell ── */
        <div className="relative w-full mt-4">

            {/* ── Floating label — identical to CyberInput ── */}
            <label className="absolute -top-3 left-4 bg-black px-2 text-[#ea8cff] font-black italic tracking-widest text-sm z-10 pointer-events-none">
                {label.toUpperCase()}
            </label>

            {/*
              ── Editor border shell ──
              focus-within picks up focus from both the toolbar buttons and
              the contenteditable area, giving the same ring as CyberInput.

              Tailwind arbitrary child selectors strip away all of Quill's
              default white backgrounds and grey borders.

              Toolbar icons:
                [&_.ql-stroke]            → SVG strokes
                [&_.ql-fill]              → SVG fills
                [&_.ql-picker-label]      → dropdown labels
                [&_.ql-picker-options]    → open dropdown panels
              All turn neon-cyan (#0bd3e8) on hover / active states.
            */}
            <div
                className={[
                    // ── Border / shape (matches CyberInput border shell)
                    'w-full rounded-xl border-[3px] border-[#ea8cff]',
                    'focus-within:border-white focus-within:ring-1 focus-within:ring-white',
                    'transition-colors overflow-hidden',

                    // ── Toolbar background & bottom divider
                    '[&_.ql-toolbar]:bg-black',
                    '[&_.ql-toolbar]:border-none',
                    '[&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-b-[#ea8cff]/30',

                    // ── Toolbar icon base colour (SVG strokes & fills)
                    '[&_.ql-toolbar_.ql-stroke]:stroke-gray-400',
                    '[&_.ql-toolbar_.ql-fill]:fill-gray-400',
                    '[&_.ql-toolbar_button]:text-gray-400',
                    '[&_.ql-picker-label]:text-gray-400',

                    // ── Toolbar icon hover / active → neon cyan
                    '[&_.ql-toolbar_button:hover_.ql-stroke]:stroke-[#0bd3e8]',
                    '[&_.ql-toolbar_button:hover_.ql-fill]:fill-[#0bd3e8]',
                    '[&_.ql-toolbar_button:hover]:text-[#0bd3e8]',
                    '[&_.ql-toolbar_button.ql-active_.ql-stroke]:stroke-[#ea8cff]',
                    '[&_.ql-toolbar_button.ql-active_.ql-fill]:fill-[#ea8cff]',
                    '[&_.ql-toolbar_button.ql-active]:text-[#ea8cff]',
                    '[&_.ql-picker-label:hover]:text-[#0bd3e8]',
                    '[&_.ql-picker-label.ql-active]:text-[#ea8cff]',

                    // ── Dropdown panels
                    '[&_.ql-picker-options]:bg-black',
                    '[&_.ql-picker-options]:border-[#ea8cff]/40',
                    '[&_.ql-picker-item]:text-gray-300',
                    '[&_.ql-picker-item:hover]:text-[#0bd3e8]',

                    // ── Content area container
                    '[&_.ql-container]:bg-black',
                    '[&_.ql-container]:border-none',
                    '[&_.ql-container]:text-white',

                    // ── Editable content area
                    '[&_.ql-editor]:min-h-[250px]',
                    '[&_.ql-editor]:p-4',
                    '[&_.ql-editor]:text-white',

                    // ── Placeholder text colour
                    '[&_.ql-editor.ql-blank::before]:text-white/30',
                    '[&_.ql-editor.ql-blank::before]:italic',
                    '[&_.ql-editor.ql-blank::before]:not-italic',
                ].join(' ')}
            >
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={QUILL_MODULES}
                    formats={QUILL_FORMATS}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default RichTextEditor;
