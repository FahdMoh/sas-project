/**
 * Auth feature types
 */

/**
 * Client-side login payload — uses `email` as the field name.
 * api.ts maps this to `email` before sending to the backend.
 */
export interface LoginRequest {
    email_or_phone_number: string;
    password: string;
}

/** Response returned by the backend login endpoint */
export interface LoginResponse {
    email_or_phone_number: string;
    token: {
        access: string;
        refresh: string;
    };
}
