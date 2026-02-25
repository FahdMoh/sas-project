import type { Organization, HierarchyKey } from '../../types';
import { HIERARCHY_LEVELS } from '../../types';
import { useHierarchy } from './useHierarchy';

/** Human-readable label for each hierarchy key */
const LEVEL_LABELS: Record<HierarchyKey, string> = {
    entity_name: 'Entity',
    department_name: 'Department',
    section_name: 'Section',
    unit_name: 'Unit',
    sub_unit_name: 'Sub-unit',
};

interface HierarchySelectorProps {
    data: Organization[];
    label: string;
    onChange: (id: string | null) => void;
}

/**
 * Renders a dynamic, cascading set of <select> dropdowns from a flat
 * Organization array, following the exact HIERARCHY_LEVELS sequence.
 *
 * RULES ENFORCED:
 * 1. Dynamic Generation  — A dropdown for level N appears only when the
 *    filtered options for that level are non-empty.
 * 2. Locking Mechanism   — The Entity (level 0) is always enabled.
 *    Subsequent levels are ALWAYS rendered (if any global data exists for
 *    them) but are disabled and empty until their immediate parent has a
 *    selection.
 * 3. Reset               — Handled upstream in useHierarchy.
 */
const HierarchySelector = ({ data, label, onChange }: HierarchySelectorProps) => {
    const { selections, handleSelectionChange, getOptionsForLevel } = useHierarchy(
        data,
        onChange
    );

    return (
        <fieldset className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <legend className="px-1 text-sm font-semibold text-gray-700">{label}</legend>

            {data.length === 0 ? (
                <p className="text-xs text-gray-400">No organizations available.</p>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {HIERARCHY_LEVELS.map((level, index) => {
                        const parentLevel = index > 0 ? HIERARCHY_LEVELS[index - 1] : null;
                        const parentSelected =
                            parentLevel === null || !!selections[parentLevel];

                        // Rule 2: Only render if this level has ANY data globally —
                        // prevents showing an empty level for orgs that don't go this deep.
                        const hasGlobalData = data.some((org) => !!org[level]);
                        if (!hasGlobalData) return null;

                        // Filtered options reflect the current parent selections.
                        const filteredOptions = getOptionsForLevel(level);

                        // Rule 1: If the parent IS selected but yields zero children,
                        // hide this level (the current branch doesn't go this deep).
                        if (parentSelected && filteredOptions.length === 0) return null;

                        const isDisabled = !parentSelected;

                        // Rule 2 (key fix): When disabled, show NO options so the
                        // dropdown doesn't misleadingly display global (unfiltered) data.
                        // Options are only populated once the parent level is selected.
                        const displayOptions = isDisabled ? [] : filteredOptions;

                        return (
                            <div key={level} className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-gray-500">
                                    {LEVEL_LABELS[level]}
                                </label>
                                <select
                                    value={selections[level] ?? ''}
                                    disabled={isDisabled}
                                    onChange={(e) =>
                                        handleSelectionChange(
                                            level as HierarchyKey,
                                            e.target.value
                                        )
                                    }
                                    className="min-w-[160px] rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60"
                                >
                                    <option value="">— {LEVEL_LABELS[level]} —</option>
                                    {displayOptions.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>
            )}
        </fieldset>
    );
};

export default HierarchySelector;
