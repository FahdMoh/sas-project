import { USE_MOCK_API } from '@/config/env';
import { httpClient } from '@/shared/lib/http/axios';
import type { LoginRequest, LoginResponse } from './types';

const MOCK_DELAY_MS = 1000;
const MOCK_VALID_EMAIL = 'test@test.com';

/** Internal payload shape expected by the backend */
interface BackendLoginPayload {
    email_or_phone_number: string;
    password: string;
}

/**
 * Maps the client-side LoginRequest to the backend payload.
 */
const toBackendPayload = (credentials: LoginRequest): BackendLoginPayload => ({
    email_or_phone_number: credentials.email_or_phone_number,
    password: credentials.password,
});

/** Simulates a successful login response. */
const mockLoginSuccess = (credentials: LoginRequest): LoginResponse => ({
    email_or_phone_number: credentials.email_or_phone_number,
    token: {
        access:
            'mock.access.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vY2sgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refresh:
            'mock.refresh.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vY2sgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
});

/**
 * Mock login: validates against test credentials before resolving.
 * - email === 'test@test.com' AND non-empty password → success
 * - anything else → rejects with a server-like error
 */
const mockLogin = (credentials: LoginRequest): Promise<LoginResponse> => {
    const payload = toBackendPayload(credentials);
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            if (
                payload.email_or_phone_number === MOCK_VALID_EMAIL &&
                payload.password.trim().length > 0
            ) {
                resolve(mockLoginSuccess(credentials));
            } else {
                reject(new Error('Invalid email or password.'));
            }
        }, MOCK_DELAY_MS)
    );
};

/**
 * Log in with email and password.
 * Maps client `email` → backend `email` before the call.
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    if (USE_MOCK_API) {
        return mockLogin(credentials);
    }
    try {
        const payload = toBackendPayload(credentials);
        const { data } = await httpClient.post<LoginResponse>('/user/login/', payload);
        return data;
    } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'response' in err) {
            const axiosErr = err as { response?: { data?: { message?: string } } };
            const message = axiosErr.response?.data?.message ?? 'Login failed. Please try again.';
            throw new Error(message);
        }
        throw err;
    }
};

/**
 * Invalidate the server-side session.
 * Client tokens are cleared by the caller regardless of the API result.
 */
export const logout = async (): Promise<void> => {
    if (USE_MOCK_API) {
        await new Promise<void>((resolve) => setTimeout(resolve, 300));
        return;
    }
    try {
        await httpClient.post('/user/logout/');
    } catch {
        // Swallow API errors — client session always clears.
    }
};
