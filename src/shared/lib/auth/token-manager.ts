const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/** Retrieve the access token from localStorage. */
export const getAccessToken = (): string | null =>
    localStorage.getItem(ACCESS_TOKEN_KEY);

/** Retrieve the refresh token from localStorage. */
export const getRefreshToken = (): string | null =>
    localStorage.getItem(REFRESH_TOKEN_KEY);

/** Persist both tokens to localStorage. */
export const setTokens = (access: string, refresh: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
};

/** Remove both tokens (used on logout / 401). */
export const clearTokens = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};
