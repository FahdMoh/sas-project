/**
 * Quill editor toolbar configuration.
 * Imported by RichTextEditor.tsx — edit here to add/remove toolbar controls.
 */

/**
 * Quill modules config — defines the toolbar button layout.
 * Empty arrays (e.g. `{ align: [] }`) tell Quill to show all options.
 */
export const QUILL_MODULES = {
    toolbar: [
        // Font family
        [{ font: [] }],
        // Font size: small | normal (false) | large | huge
        [{ size: ['small', false, 'large', 'huge'] }],
        // Formatting
        ['bold', 'italic', 'underline'],
        // Alignment
        [{ align: [] }],
        // Reset formatting
        ['clean'],
    ],
};

/**
 * Formats the editor is permitted to parse and render.
 * Must include every format referenced in QUILL_MODULES.
 */
export const QUILL_FORMATS: string[] = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
];
