/**
 * Document feature types
 */
export interface Document {
    id: string;
    title: string;
    content: string;
    organizationId: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export interface DocumentState {
    documents: Document[];
    selectedDocument: Document | null;
}

export interface CreateDocumentPayload {
    title: string;
    content: string;
    organizationId: string;
}

export interface UpdateDocumentPayload {
    title?: string;
    content?: string;
}

// ---------------------------------------------------------------------------
// Submit Document — exact API contract
// ---------------------------------------------------------------------------

/**
 * Request body for POST /documents/create/
 * Field names must match the backend spec exactly.
 */
export interface ReceivedOrganizationEntry {
    organization: string;
    notes: string;
    duration: number;
    follow_up_org: string;
}

export interface SubmitDocumentRequest {
    sender_organization: string;
    is_submitted: boolean;
    document_category: number;
    document_status: number;
    document_type: number;
    process_tracker: number;
    received_organization: ReceivedOrganizationEntry[];
    title: string;
    content: string;
    signature: number;
    signature_date: string;
    notes: string;
    is_payment_required: boolean;
}

/**
 * Minimal success response from the document submission endpoint.
 * Extend when the backend returns more fields.
 */
export interface SubmitDocumentResponse {
    id: string;
    status: string;
}

