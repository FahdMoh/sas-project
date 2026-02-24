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
