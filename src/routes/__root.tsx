import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-primary-100 text-neutral-900">
      <Outlet />
    </div>
  ),
});
