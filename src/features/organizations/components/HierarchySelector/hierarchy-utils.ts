import type { Organization, HierarchyKey } from '../../types';
import { HIERARCHY_LEVELS } from '../../types';

/**
 * Returns unique, non-empty values for `currentLevel` from `data`,
 * filtered so that every row matches all `previousSelections`.
 *
 * @param data              - Flat organization array from the API
 * @param currentLevel      - The hierarchy level to compute options for
 * @param previousSelections - Map of already-selected levels → values
 */
export const getAvailableOptions = (
    data: Organization[],
    currentLevel: HierarchyKey,
    previousSelections: Partial<Record<HierarchyKey, string>>
): string[] => {
    // Filter rows that satisfy every previous selection
    const filtered = data.filter((org) =>
        Object.entries(previousSelections).every(
            ([level, value]) => value && org[level as HierarchyKey] === value
        )
    );

    // Collect unique, non-empty values for the current level
    const seen = new Set<string>();
    for (const org of filtered) {
        const val = org[currentLevel];
        if (val) seen.add(val);
    }
    return [...seen];
};

/**
 * Finds the `id` of the Organization that exactly matches all current
 * selections AND has no values in any level deeper than the deepest selection.
 * Returns `null` if no exact match exists.
 */
export const getDeepestSelectedId = (
    data: Organization[],
    selections: Partial<Record<HierarchyKey, string>>
): string | null => {
    // Find the index of the deepest selected level
    let deepestIndex = -1;
    for (let i = HIERARCHY_LEVELS.length - 1; i >= 0; i--) {
        if (selections[HIERARCHY_LEVELS[i]]) {
            deepestIndex = i;
            break;
        }
    }
    if (deepestIndex < 0) return null;

    const match = data.find((org) => {
        // All selected levels must match
        for (let i = 0; i <= deepestIndex; i++) {
            const level = HIERARCHY_LEVELS[i];
            if (selections[level] && org[level] !== selections[level]) return false;
        }
        // All levels deeper than the selection must be empty
        for (let i = deepestIndex + 1; i < HIERARCHY_LEVELS.length; i++) {
            if (org[HIERARCHY_LEVELS[i]]) return false;
        }
        return true;
    });

    return match?.id ?? null;
};
