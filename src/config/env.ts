/**
 * Toggle to switch between mock and real API.
 * Set to `false` when the backend is available.
 */
export const USE_MOCK_API = false;

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) ?? 'https://erp.sasconsults.com/api';

export const env = {
  API_BASE_URL,
  MODE: import.meta.env.MODE as string,
  DEV: import.meta.env.DEV as boolean,
  PROD: import.meta.env.PROD as boolean,
} as const;
