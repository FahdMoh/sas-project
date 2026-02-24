/**
 * Barrel re-export for all Zustand stores.
 * Import individual stores from their feature directories;
 * use this file for convenient cross-feature store access.
 */
export { useAuthStore } from '@/features/auth/store';
export { useOrganizationsStore } from '@/features/organizations/store';
