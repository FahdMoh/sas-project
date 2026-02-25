import { USE_MOCK_API } from '@/config/env';
import { httpClient } from '@/shared/lib/http/axios';
import { API_ENDPOINTS } from '@/config/api-config';
import type {
    Document,
    CreateDocumentPayload,
    UpdateDocumentPayload,
    SubmitDocumentRequest,
    SubmitDocumentResponse,
} from './types';

// ---------------------------------------------------------------------------
// Existing CRUD operations
// ---------------------------------------------------------------------------

export const getDocuments = async (): Promise<Document[]> => {
    const { data } = await httpClient.get<Document[]>(API_ENDPOINTS.DOCUMENTS);
    return data;
};

export const getDocumentById = async (id: string): Promise<Document> => {
    const { data } = await httpClient.get<Document>(
        API_ENDPOINTS.DOCUMENT_BY_ID(id)
    );
    return data;
};

export const createDocument = async (
    payload: CreateDocumentPayload
): Promise<Document> => {
    const { data } = await httpClient.post<Document>(
        API_ENDPOINTS.DOCUMENTS,
        payload
    );
    return data;
};

export const updateDocument = async (
    id: string,
    payload: UpdateDocumentPayload
): Promise<Document> => {
    const { data } = await httpClient.patch<Document>(
        API_ENDPOINTS.DOCUMENT_BY_ID(id),
        payload
    );
    return data;
};

// ---------------------------------------------------------------------------
// Submit Document
// ---------------------------------------------------------------------------

const MOCK_SUBMIT_DELAY_MS = 1200;

/** Simulates a successful document submission. */
const mockSubmitDocument = (
    _payload: SubmitDocumentRequest
): Promise<SubmitDocumentResponse> =>
    new Promise((resolve) =>
        setTimeout(
            () => resolve({ id: `mock-doc-${Date.now()}`, status: 'created' }),
            MOCK_SUBMIT_DELAY_MS
        )
    );

/**
 * Submit a new document to the API.
 *
 * - `USE_MOCK_API = true`  → 1.2 s simulated delay, always succeeds.
 * - `USE_MOCK_API = false` → POST /documents/create/ with exact payload.
 *
 * Any API error is re-thrown as a plain `Error` with a user-readable message
 * so the calling component can display it without inspecting Axios internals.
 */
export const submitDocument = async (
    payload: SubmitDocumentRequest
): Promise<SubmitDocumentResponse> => {
    if (USE_MOCK_API) {
        return mockSubmitDocument(payload);
    }
    try {
        const { data } = await httpClient.post<SubmitDocumentResponse>(
            '/documents/create/',
            payload
        );
        return data;
    } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'response' in err) {
            const axiosErr = err as { response?: { data?: { message?: string } } };
            const message =
                axiosErr.response?.data?.message ??
                'Failed to submit document. Please try again.';
            throw new Error(message);
        }
        throw err;
    }
};
