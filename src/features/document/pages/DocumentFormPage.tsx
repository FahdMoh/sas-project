import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormPageLayout from "@/features/home/components/FormPageLayout";
import HierarchySelector from "@/features/organizations/components/HierarchySelector/HierarchySelector";
import RichTextEditor from "@/shared/components/editor/RichTextEditor";
import {
  getSenderOrganizations,
  getReceivedOrganizations,
} from "@/features/organizations/api";
import { submitDocument } from "@/features/document/api";
import type { Organization } from "@/features/organizations/types";
import { CyberButton } from "@/shared/components/ui/CyberButton";

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
  const [content, setContent] = useState<string>("");

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
    return () => {
      cancelled = true;
    };
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
      prev.map((r) => (r.key === key ? { ...r, selectedId: id } : r)),
    );
  };

  // --- Client-side validation ---
  const validate = (): string | null => {
    if (!senderOrgId) return "Please select a Sender Organization.";
    const hasRecipient = recipients.some((r) => r.selectedId !== null);
    if (!hasRecipient)
      return "Please select at least one Received Organization.";
    if (!content || content === "<p><br></p>")
      return "CONTENT cannot be empty.";
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

    // Build the exact payload the backend expects.
    // Dynamic fields: sender_organization, received_organization[].organization, content.
    // All other fields are required defaults demanded by the backend schema.
    const payload = {
      sender_organization: senderOrgId as string,
      is_submitted: false,
      document_category: 11,
      document_status: 2,
      document_type: 33,
      process_tracker: 7,
      received_organization: recipients
        .filter((r) => r.selectedId !== null)
        .map((r) => ({
          organization: r.selectedId as string,
          notes: "",
          duration: 1,
          follow_up_org: "T-F-03-01",
        })),
      title: "sdsdasdsadsda",
      content,
      signature: 2,
      signature_date: "2026-02-27",
      notes: "asdsdadsa",
      is_payment_required: false,
    };

    setIsSubmitting(true);
    try {
      await submitDocument(payload);
      navigate("/"); // ← Success: redirect to home
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <FormPageLayout>
      <div className="flex flex-col p-8 flex-grow text-white">
        <div className="mx-auto  w-full rounded-xl border border-[#ea8cff]/20 bg-black p-8">
          {isLoadingOrgs ? (
            <p className="text-sm text-[#ea8cff]/60">Loading organizations…</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* ── API / Validation error alert ── */}
              {submitError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-500/50 bg-red-900/20 px-4 py-3"
                >
                  <p className="text-sm font-bold text-red-400">
                    {submitError}
                  </p>
                </div>
              )}

              {/* ── Sender Organization ── */}
              <section className="flex flex-col gap-4">
                {/* <h2 className="font-black italic tracking-widest text-sm text-[#ea8cff]">
                                SENDER ORGANIZATION
                            </h2> */}
                <HierarchySelector
                  data={senderOrgs}
                  label="Select sending organization"
                  onChange={setSenderOrgId}
                />
                {senderOrgId && (
                  <p className="text-xs text-green-400">
                    ✓ Selected ID:{" "}
                    <span className="font-mono">{senderOrgId}</span>
                  </p>
                )}
              </section>

              {/* ── Received Organizations ── */}
              <section className="flex flex-col gap-4">
                <h2 className="font-black italic tracking-widest text-sm text-[#ea8cff]">
                  RECEIVED ORGANIZATIONS
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
                        className="absolute right-3 top-3 text-xs text-red-400 hover:text-red-300"
                        title="Remove recipient"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                ))}

                <CyberButton
                  type="button"
                  onClick={addRecipient}
                  className="px-8 py-4 min-w-[200px] text-base md:text-base"
                >
                  + Add Recipient
                </CyberButton>
              </section>

              {/* ── CONTENT ── */}
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your CONTENT here…"
              />

              {/* ── Submit ── */}
              <CyberButton
                type="submit"
                disabled={isSubmitting}
                className="mt-2 self-end px-10 py-5 min-w-[220px]"
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </CyberButton>
            </form>
          )}
        </div>
        {/* /card */}
      </div>
    </FormPageLayout>
  );
};

export default DocumentFormPage;
