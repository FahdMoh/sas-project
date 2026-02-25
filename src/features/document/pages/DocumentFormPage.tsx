import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HierarchySelector from '@/features/organizations/components/HierarchySelector/HierarchySelector';
import RichTextEditor from '@/shared/components/editor/RichTextEditor';
import { getSenderOrganizations, getReceivedOrganizations } from '@/features/organizations/api';
import { submitDocument } from '@/features/document/api';
import type { Organization } from '@/features/organizations/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface RecipientEntry {
    /** Stable key for React list rendering */
    key: number;
    /** Resolved org id — null until the user drills down to a leaf node */
    selectedId: string | null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const DocumentFormPage = () => {
    const navigate = useNavigate();

    // --- Org data ---
    const [senderOrgs, setSenderOrgs] = useState<Organization[]>([]);
    const [receivedOrgs, setReceivedOrgs] = useState<Organization[]>([]);
    const [isLoadingOrgs, setIsLoadingOrgs] = useState(true);

    // --- Form state ---
    const [senderOrgId, setSenderOrgId] = useState<string | null>(null);
    const [recipients, setRecipients] = useState<RecipientEntry[]>([
        { key: 0, selectedId: null },
    ]);
    const [nextKey, setNextKey] = useState(1);
    /** Document body as an HTML string — passed directly to the API */
    const [content, setContent] = useState<string>('');

    // --- Submit state ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // --- Fetch org data on mount ---
    useEffect(() => {
        let cancelled = false;
        const fetch = async () => {
            setIsLoadingOrgs(true);
            const [sender, received] = await Promise.all([
                getSenderOrganizations(),
                getReceivedOrganizations(),
            ]);
            if (!cancelled) {
                setSenderOrgs(sender);
                setReceivedOrgs(received);
                setIsLoadingOrgs(false);
            }
        };
        void fetch();
        return () => { cancelled = true; };
    }, []);

    // --- Recipient helpers ---
    const addRecipient = () => {
        setRecipients((prev) => [...prev, { key: nextKey, selectedId: null }]);
        setNextKey((k) => k + 1);
    };

    const removeRecipient = (key: number) => {
        setRecipients((prev) => prev.filter((r) => r.key !== key));
    };

    const updateRecipient = (key: number, id: string | null) => {
        setRecipients((prev) =>
            prev.map((r) => (r.key === key ? { ...r, selectedId: id } : r))
        );
    };

    // --- Client-side validation ---
    const validate = (): string | null => {
        if (!senderOrgId) return 'Please select a Sender Organization.';
        const hasRecipient = recipients.some((r) => r.selectedId !== null);
        if (!hasRecipient) return 'Please select at least one Received Organization.';
        if (!content || content === '<p><br></p>') return 'Document content cannot be empty.';
        return null;
    };

    // --- Submit ---
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);

        // Validate before hitting the API
        const validationError = validate();
        if (validationError) {
            setSubmitError(validationError);
            return;
        }

        // Build the exact payload the backend expects
        const payload = {
            sender_organization: senderOrgId as string,
            received_organization: recipients
                .filter((r) => r.selectedId !== null)
                .map((r) => ({ organization: r.selectedId as string })),
            content,
        };

        setIsSubmitting(true);
        try {
            await submitDocument(payload);
            navigate('/'); // ← Success: redirect to home
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'An unexpected error occurred. Please try again.';
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Render ---
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">New Document</h1>

                {isLoadingOrgs ? (
                    <p className="text-sm text-gray-400">Loading organizations…</p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* ── API / Validation error alert ── */}
                        {submitError && (
                            <div
                                role="alert"
                                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"
                            >
                                <p className="text-sm font-medium text-red-700">{submitError}</p>
                            </div>
                        )}

                        {/* ── Sender Organization ── */}
                        <section className="flex flex-col gap-2">
                            <h2 className="text-sm font-semibold text-gray-700">
                                Sender Organization
                            </h2>
                            <HierarchySelector
                                data={senderOrgs}
                                label="Select sending organization"
                                onChange={setSenderOrgId}
                            />
                            {senderOrgId && (
                                <p className="text-xs text-green-600">
                                    ✓ Selected ID:{' '}
                                    <span className="font-mono">{senderOrgId}</span>
                                </p>
                            )}
                        </section>

                        {/* ── Received Organizations ── */}
                        <section className="flex flex-col gap-3">
                            <h2 className="text-sm font-semibold text-gray-700">
                                Received Organizations
                            </h2>

                            {recipients.map((recipient, index) => (
                                <div key={recipient.key} className="relative">
                                    <HierarchySelector
                                        data={receivedOrgs}
                                        label={`Recipient ${index + 1}`}
                                        onChange={(id) => updateRecipient(recipient.key, id)}
                                    />
                                    {recipients.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeRecipient(recipient.key)}
                                            className="absolute right-3 top-3 text-xs text-red-400 hover:text-red-600"
                                            title="Remove recipient"
                                        >
                                            ✕ Remove
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addRecipient}
                                className="w-fit rounded-md border border-blue-400 px-4 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
                            >
                                + Add More Recipients
                            </button>
                        </section>

                        {/* ── Document Content ── */}
                        <section className="flex flex-col gap-1">
                            <h2 className="text-sm font-semibold text-gray-700">
                                Document Content
                            </h2>
                            <RichTextEditor
                                value={content}
                                onChange={setContent}
                                placeholder="Write your document content here…"
                            />
                        </section>

                        {/* ── Submit ── */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 self-end rounded-lg bg-blue-600 px-8 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? 'Submitting…' : 'Submit Document'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default DocumentFormPage;
