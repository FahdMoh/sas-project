import { Outlet } from 'react-router-dom';

/**
 * RootLayout wraps all protected pages.
 * Add shared navigation, sidebars, and footers here.
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* TODO: Add <Navbar />, <Sidebar />, etc. */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
