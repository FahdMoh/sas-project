import type { Editor } from '@tiptap/react';

export interface ToolbarButton {
    label: string;
    icon?: string;
    action: (editor: Editor) => void;
    isActive?: (editor: Editor) => boolean;
}

/**
 * Toolbar button definitions for the RichTextEditor.
 * Add or remove entries here to customize the toolbar.
 */
export const toolbarButtons: ToolbarButton[] = [
    {
        label: 'Bold',
        icon: 'B',
        action: (editor) => editor.chain().focus().toggleBold().run(),
        isActive: (editor) => editor.isActive('bold'),
    },
    {
        label: 'Italic',
        icon: 'I',
        action: (editor) => editor.chain().focus().toggleItalic().run(),
        isActive: (editor) => editor.isActive('italic'),
    },
    {
        label: 'Strike',
        icon: 'S̶',
        action: (editor) => editor.chain().focus().toggleStrike().run(),
        isActive: (editor) => editor.isActive('strike'),
    },
    {
        label: 'Heading 1',
        icon: 'H1',
        action: (editor) =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: (editor) => editor.isActive('heading', { level: 1 }),
    },
    {
        label: 'Heading 2',
        icon: 'H2',
        action: (editor) =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: (editor) => editor.isActive('heading', { level: 2 }),
    },
    {
        label: 'Bullet List',
        icon: '• —',
        action: (editor) => editor.chain().focus().toggleBulletList().run(),
        isActive: (editor) => editor.isActive('bulletList'),
    },
    {
        label: 'Ordered List',
        icon: '1.',
        action: (editor) => editor.chain().focus().toggleOrderedList().run(),
        isActive: (editor) => editor.isActive('orderedList'),
    },
    {
        label: 'Code Block',
        icon: '</>',
        action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
        isActive: (editor) => editor.isActive('codeBlock'),
    },
    {
        label: 'Blockquote',
        icon: '❝',
        action: (editor) => editor.chain().focus().toggleBlockquote().run(),
        isActive: (editor) => editor.isActive('blockquote'),
    },
];
