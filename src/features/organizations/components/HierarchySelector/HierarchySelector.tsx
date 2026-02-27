import type { Organization, HierarchyKey } from "../../types";
import { HIERARCHY_LEVELS } from "../../types";
import { useHierarchy } from "./useHierarchy";
import { CyberInput } from "@/shared/components/ui/CyberInput";

/** Human-readable label for each hierarchy key */
const LEVEL_LABELS: Record<HierarchyKey, string> = {
  entity_name: "Entity",
  department_name: "Department",
  section_name: "Section",
  unit_name: "Unit",
  sub_unit_name: "Sub-unit",
};

interface HierarchySelectorProps {
  data: Organization[];
  label: string;
  onChange: (id: string | null) => void;
}

/**
 * Renders a dynamic, cascading set of CyberInput (as="select") dropdowns
 * from a flat Organization array, following the exact HIERARCHY_LEVELS sequence.
 *
 * RULES ENFORCED:
 * 1. Dynamic Generation  — A dropdown for level N appears only when filtered
 *    options are non-empty.
 * 2. Locking Mechanism   — Entity (level 0) is always enabled. Subsequent
 *    levels are rendered disabled and empty until their parent has a selection.
 * 3. Reset               — Handled upstream in useHierarchy.
 *
 * Dark background on the fieldset is required so CyberInput's floating
 * labels (bg-black) mask the border correctly.
 */
const HierarchySelector = ({
  data,
  label,
  onChange,
}: HierarchySelectorProps) => {
  const { selections, handleSelectionChange, getOptionsForLevel } =
    useHierarchy(data, onChange);

  return (
    <fieldset className="flex flex-col gap-3 bg-black p-4 pt-6">
      <legend className="px-1 text-xl font-black italic tracking-widest text-[#f861f4]">
        {label.toUpperCase()}
      </legend>

      {data.length === 0 ? (
        <p className="text-xs text-gray-500">No organizations available.</p>
      ) : (
        <div className="flex flex-wrap items-start mt-4 gap-y-4">
          {HIERARCHY_LEVELS.map((level, index) => {
            const parentLevel = index > 0 ? HIERARCHY_LEVELS[index - 1] : null;
            const parentSelected =
              parentLevel === null || !!selections[parentLevel];

            // Rule 2: Only render if this level has ANY global data
            const hasGlobalData = data.some((org) => !!org[level]);
            if (!hasGlobalData) return null;

            // Filtered options based on current parent selections
            const filteredOptions = getOptionsForLevel(level);

            // Rule 1: Hide if parent is selected but yields no children
            if (parentSelected && filteredOptions.length === 0) return null;

            const isDisabled = !parentSelected;

            // Rule 2 (fix): Empty when disabled — no unfiltered global options
            const displayOptions = isDisabled ? [] : filteredOptions;

            return (
              <CyberInput
                key={level}
                as="select"
                id={level}
                label={LEVEL_LABELS[level]}
                value={selections[level] ?? ""}
                disabled={isDisabled}
                onChange={(e) =>
                  handleSelectionChange(level as HierarchyKey, e.target.value)
                }
                className="w-full sm:w-[230px] lg:w-[286px]"
              >
                <option value="">— {LEVEL_LABELS[level]} —</option>
                {displayOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </CyberInput>
            );
          })}
        </div>
      )}
    </fieldset>
  );
};

export default HierarchySelector;
