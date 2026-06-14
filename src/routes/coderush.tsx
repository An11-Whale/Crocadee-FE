/* eslint-disable @typescript-eslint/only-throw-error */
import { createRoute, redirect } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/coderush',
  beforeLoad: () => {
    throw redirect({
      to: '/practice',
      replace: true,
    });
  },
});
