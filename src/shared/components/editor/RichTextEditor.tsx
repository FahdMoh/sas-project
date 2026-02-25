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
}

/**
 * Controlled rich text editor backed by Quill (via react-quill-new).
 *
 * Output contract: the `onChange` callback always receives a valid HTML string
 * (e.g. `<p>Hello <strong>world</strong></p>`), ready to be sent to the API.
 *
 * Capabilities:
 * - Font family (all system fonts registered by Quill)
 * - Font size: small | normal | large | huge
 * - Formatting: Bold, Italic, Underline
 * - Alignment: Left, Center, Right, Justify
 */
const RichTextEditor = ({
    value,
    onChange,
    placeholder = 'Start typing your document content here…',
}: RichTextEditorProps) => {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={QUILL_MODULES}
                formats={QUILL_FORMATS}
                placeholder={placeholder}
                style={{ minHeight: '220px' }}
            />
        </div>
    );
};

export default RichTextEditor;
