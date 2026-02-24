import axios from 'axios';
import { API_BASE_URL } from '@/config/env';
import { attachTokenInterceptor, handleUnauthorizedInterceptor } from './interceptors';

/**
 * Shared Axios instance. All feature API modules import this.
 */
export const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
});

attachTokenInterceptor(httpClient);
handleUnauthorizedInterceptor(httpClient);
