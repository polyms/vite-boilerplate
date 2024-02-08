import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    );

export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
      {Boolean(import.meta.env.VITE_DEVTOOLS) && (
        <Suspense>
          <TanStackRouterDevtools />
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </>
  ),
});
