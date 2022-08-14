/* eslint-disable no-underscore-dangle */
import '~/styles/globals.scss';
import { lazy, StrictMode, Suspense, useMemo } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom';

import { ErrorBoundary } from './components/core';
import { PageLoader } from './components/layouts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  },
});

const AppPage = lazy(() => import('~/pages/App'));

function RootApp() {
  const routes = useMemo<RouteObject[]>(
    () => [{ index: true, element: <AppPage /> }],
    []
  );

  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  const element = useRoutes(routes);

  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

if (!globalThis.__root__)
  globalThis.__root__ = createRoot(document.querySelector('#root'));

(globalThis.__root__ as Root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <RootApp />
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
