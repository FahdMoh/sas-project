import { httpClient } from '@/shared/lib/http/axios';
import { API_ENDPOINTS } from '@/config/api-config';
import type {
    Document,
    CreateDocumentPayload,
    UpdateDocumentPayload,
} from './types';

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
