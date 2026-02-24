import { env } from './env';

export const API_BASE_URL = env.API_BASE_URL ?? 'http://localhost:8000/api';

export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',

    // Documents
    DOCUMENTS: '/documents',
    DOCUMENT_BY_ID: (id: string) => `/documents/${id}`,

    // Organizations
    ORGANIZATIONS: '/organizations',
    ORGANIZATION_HIERARCHY: (id: string) => `/organizations/${id}/hierarchy`,
} as const;
