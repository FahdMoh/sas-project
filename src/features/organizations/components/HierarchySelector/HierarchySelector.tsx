const HierarchySelector = () => {
  const levels = ['Entity', 'Department', 'Section', 'Unit', 'Sub-unit'];

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm font-semibold text-gray-700">Received Organizations</p>

      {/* Cascading dropdowns */}
      <div className="flex flex-wrap gap-3">
        {levels.map((level) => (
          <div key={level} className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">{level}</label>
            <select className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">-- Select {level} --</option>
              <option value="1">Option A</option>
              <option value="2">Option B</option>
              <option value="3">Option C</option>
            </select>
          </div>
        ))}
      </div>

      {/* Add more recipients */}
      <button
        type="button"
        className="mt-1 w-fit rounded-md border border-blue-500 px-4 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
      >
        + Add More Recipients
      </button>
    </div>
  );
};

export default HierarchySelector;
