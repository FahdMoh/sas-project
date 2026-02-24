import Select from 'react-select';
import { useHierarchy } from './useHierarchy';
import type { HierarchySelectorProps, SelectOption } from './types';

/**
 * A dropdown that renders an organization hierarchy as a flat, indented list.
 * Uses react-select for search and accessibility.
 */
const HierarchySelector = ({
  value,
  onChange,
  placeholder = 'Select organization…',
  isDisabled = false,
}: HierarchySelectorProps) => {
  // TODO: pass a real organizationId (e.g. the root org) to useHierarchy
  const { options, isLoading, error } = useHierarchy();

  const selectedOption = options.find((o) => o.value === value) ?? null;

  const handleChange = (option: SelectOption | null) => {
    onChange(option?.value ?? null);
  };

  return (
    <div>
      {error && <p className="mb-1 text-xs text-red-500">{error}</p>}
      <Select<SelectOption>
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isLoading={isLoading}
        isDisabled={isDisabled}
        placeholder={placeholder}
        isClearable
        classNamePrefix="hierarchy-selector"
      />
    </div>
  );
};

export default HierarchySelector;
