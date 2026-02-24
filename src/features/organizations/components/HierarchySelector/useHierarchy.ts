import { useState, useEffect } from 'react';
import { getOrganizationHierarchy } from '@/features/organizations/api';
import { flattenHierarchy } from './hierarchy-utils';
import type { HierarchyNode, SelectOption } from './types';

/**
 * Fetches and transforms the organization hierarchy for use in a select dropdown.
 */
export const useHierarchy = (organizationId?: string) => {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [rawTree, setRawTree] = useState<HierarchyNode[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!organizationId) return;

        const fetch = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const tree = await getOrganizationHierarchy(organizationId);
                setRawTree(tree);
                setOptions(flattenHierarchy(tree));
            } catch {
                setError('Failed to load hierarchy. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, [organizationId]);

    return { options, rawTree, isLoading, error };
};
