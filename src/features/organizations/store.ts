import { create } from 'zustand';
import type { Organization } from './components/HierarchySelector/types';

interface OrganizationsStore {
    organizations: Organization[];
    selectedOrg: Organization | null;
    setOrganizations: (orgs: Organization[]) => void;
    setSelectedOrg: (org: Organization | null) => void;
}

export const useOrganizationsStore = create<OrganizationsStore>((set) => ({
    organizations: [],
    selectedOrg: null,
    setOrganizations: (organizations) => set({ organizations }),
    setSelectedOrg: (selectedOrg) => set({ selectedOrg }),
}));
