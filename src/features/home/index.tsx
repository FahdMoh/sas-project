/**
 * Home feature — landing page shown after login.
 * TODO: replace with the real home page implementation.
 */
export const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold text-gray-900">Welcome 👋</h1>
      <p className="text-gray-500">
        You are authenticated. Start navigating using the sidebar.
      </p>
      {/* TODO: Add dashboard widgets, stats, recent documents, etc. */}
    </div>
  );
};
