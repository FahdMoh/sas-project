/**
 * Auth feature types
 */

/**
 * Client-side login payload — uses `email` as the field name.
 * api.ts maps this to `email` before sending to the backend.
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/** Response returned by the backend login endpoint */
export interface LoginResponse {
    email: string; // backend field name kept as-is
    token: {
        access: string;
        refresh: string;
    };
}
