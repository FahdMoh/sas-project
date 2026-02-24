import { httpClient } from '@/shared/lib/http/axios';
import { API_ENDPOINTS } from '@/config/api-config';
import type { Organization, HierarchyNode } from './components/HierarchySelector/types';

export const getOrganizations = async (): Promise<Organization[]> => {
    const { data } = await httpClient.get<Organization[]>(
        API_ENDPOINTS.ORGANIZATIONS
    );
    return data;
};

export const getOrganizationHierarchy = async (
    id: string
): Promise<HierarchyNode[]> => {
    const { data } = await httpClient.get<HierarchyNode[]>(
        API_ENDPOINTS.ORGANIZATION_HIERARCHY(id)
    );
    return data;
};
