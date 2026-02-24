const toolbarButtons = ['Bold', 'Italic', 'Align Left', 'Align Center', 'Align Right'];

const RichTextEditor = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-300">
      {/* Mock toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 px-3 py-2">
        {toolbarButtons.map((btn) => (
          <button
            key={btn}
            type="button"
            className="rounded px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200"
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Text area */}
      <textarea
        rows={8}
        placeholder="Start typing your document content here…"
        className="w-full resize-none p-4 text-sm text-gray-700 outline-none"
      />
    </div>
  );
};

export default RichTextEditor;
