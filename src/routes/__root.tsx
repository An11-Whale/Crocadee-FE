import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <Outlet />
    </div>
  ),
});
