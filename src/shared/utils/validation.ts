/**
 * Validation utilities shared across the application.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Returns true if `email` is a valid email address.
 */
export const isValidEmail = (email: string): boolean =>
    EMAIL_REGEX.test(email.trim());
