import { useState } from 'react';
import type { Organization, HierarchyKey } from '../../types';
import { HIERARCHY_LEVELS } from '../../types';
import { getAvailableOptions, getDeepestSelectedId } from './hierarchy-utils';

/**
 * Manages cascading dropdown selection state for a flat Organization array.
 *
 * @param data     - Flat org array to derive options from
 * @param onChange - Called with the matched org `id` (or null) on every change
 */
export const useHierarchy = (
    data: Organization[],
    onChange: (id: string | null) => void
) => {
    const [selections, setSelections] = useState<Partial<Record<HierarchyKey, string>>>({});

    /**
     * Called when the user changes any dropdown level.
     * - Keeps all selections above the changed level.
     * - Sets the new value for the changed level (or clears it if empty string).
     * - Clears all levels below the changed level (cascade reset).
     * - Notifies the parent with the resolved org id.
     */
    const handleSelectionChange = (level: HierarchyKey, value: string): void => {
        const levelIndex = HIERARCHY_LEVELS.indexOf(level);

        const newSelections: Partial<Record<HierarchyKey, string>> = {};

        // Keep everything above the changed level
        for (let i = 0; i < levelIndex; i++) {
            const l = HIERARCHY_LEVELS[i];
            if (selections[l]) newSelections[l] = selections[l];
        }

        // Set the changed level (skip if empty — user cleared selection)
        if (value) newSelections[level] = value;

        // Everything below is intentionally cleared (cascade reset)
        setSelections(newSelections);

        // Resolve and emit the deepest matching org id
        const id = getDeepestSelectedId(data, newSelections);
        onChange(id);
    };

    /** Pre-computed options for each level given the current selections */
    const getOptionsForLevel = (level: HierarchyKey): string[] => {
        const levelIndex = HIERARCHY_LEVELS.indexOf(level);
        const previousSelections: Partial<Record<HierarchyKey, string>> = {};
        for (let i = 0; i < levelIndex; i++) {
            const l = HIERARCHY_LEVELS[i];
            if (selections[l]) previousSelections[l] = selections[l];
        }
        return getAvailableOptions(data, level, previousSelections);
    };

    return { selections, handleSelectionChange, getOptionsForLevel };
};
