import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { toolbarButtons, type ToolbarButton } from './toolbar-config';

interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
}

/**
 * Shared rich text editor built on Tiptap + StarterKit.
 * Wrap with react-hook-form Controller for form integration.
 */
const RichTextEditor = ({
  content = '',
  onChange,
  editable = true,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">
        {toolbarButtons.map((btn: ToolbarButton) => (
          <button
            key={btn.label}
            type="button"
            title={btn.label}
            onClick={() => btn.action(editor)}
            className={`rounded px-2 py-1 text-sm font-medium transition-colors hover:bg-gray-200 ${
              btn.isActive?.(editor) ? 'bg-gray-300 text-gray-900' : 'text-gray-600'
            }`}
          >
            {btn.icon ?? btn.label}
          </button>
        ))}
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="prose prose-sm min-h-[160px] max-w-none p-3 focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;
