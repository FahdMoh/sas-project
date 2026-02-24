import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    sub: string;
    exp: number;
    iat: number;
    [key: string]: unknown;
}

/**
 * Decode a JWT and return its payload.
 * Returns null if the token is invalid or malformed.
 */
export const decodeToken = (token: string): JwtPayload | null => {
    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
};

/**
 * Returns true if the token has expired (or is invalid).
 * Adds a 10-second buffer to account for clock skew.
 */
export const isTokenExpired = (token: string): boolean => {
    const payload = decodeToken(token);
    if (!payload) return true;
    const nowWithBuffer = Math.floor(Date.now() / 1000) + 10;
    return payload.exp < nowWithBuffer;
};
