import HierarchySelector from '@/features/organizations/components/HierarchySelector/HierarchySelector';
import RichTextEditor from '@/shared/components/editor/RichTextEditor';

const DocumentFormPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">New Document</h1>

        <form className="flex flex-col gap-6">
          {/* Sender Organization */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Sender Organization
            </label>
            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">-- Select Sender Organization --</option>
              <option value="org1">Organization A</option>
              <option value="org2">Organization B</option>
              <option value="org3">Organization C</option>
            </select>
          </div>

          {/* Received Organizations — HierarchySelector */}
          <HierarchySelector />

          {/* Content Editor — RichTextEditor */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Document Content
            </label>
            <RichTextEditor />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 self-end rounded-lg bg-blue-600 px-8 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Submit Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentFormPage;
