import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS class names safely.
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
