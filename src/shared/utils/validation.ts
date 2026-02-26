/**
 * Validation utilities shared across the application.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[0-9]{7,15}$/;

/**
 * Returns true if `email` is a valid email address.
 */
export const isValidEmail = (email: string): boolean =>
    EMAIL_REGEX.test(email.trim());

/**
 * Returns true if the value is a valid email address or phone number.
 */
export const isValidEmailOrPhone = (value: string): boolean => {
    const trimmed = value.trim();
    return EMAIL_REGEX.test(trimmed) || PHONE_REGEX.test(trimmed);
};
