import axios from 'axios';
import { API_BASE_URL } from '@/config/api-config';
import { attachTokenInterceptor, handleUnauthorizedInterceptor } from './interceptors';

/**
 * Shared Axios instance used by all feature API modules.
 * Interceptors are attached below.
 */
export const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// Attach request interceptor (Bearer token injection)
attachTokenInterceptor(httpClient);

// Attach response interceptor (401 handling / token refresh)
handleUnauthorizedInterceptor(httpClient);
