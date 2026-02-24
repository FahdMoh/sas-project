const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

/** Retrieve the access token from localStorage. */
export const getToken = (): string | null =>
    localStorage.getItem(TOKEN_KEY);

/** Retrieve the refresh token from localStorage. */
export const getRefreshToken = (): string | null =>
    localStorage.getItem(REFRESH_TOKEN_KEY);

/** Persist both tokens to localStorage. */
export const setTokens = (token: string, refreshToken: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/** Remove both tokens from localStorage (used on logout / 401). */
export const clearTokens = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};
