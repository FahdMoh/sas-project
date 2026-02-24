/**
 * Toolbar button labels for the mock RichTextEditor.
 * Replace with full Tiptap command configuration when implementing the real editor.
 */
export const toolbarButtons = [
    'Bold',
    'Italic',
    'Align Left',
    'Align Center',
    'Align Right',
] as const;

export type ToolbarButton = (typeof toolbarButtons)[number];
