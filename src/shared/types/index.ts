/**
 * Global shared TypeScript types.
 * Feature-specific types live in their own types.ts files.
 */

/** Standard API error shape returned by the backend. */
export interface ApiError {
    message: string;
    code?: string;
    details?: Record<string, string[]>;
}

/** Generic paginated list response. */
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

/** Generic async operation state. */
export interface AsyncState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}
