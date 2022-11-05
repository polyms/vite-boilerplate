/* eslint-disable no-underscore-dangle */
import '~/styles/bs/bootstrap.scss';
import '~/styles/globals.scss';
import { lazy, StrictMode, Suspense, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
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
const CoveragePage = lazy(() => import('~/pages/code-coverage'));

function RootApp() {
  const routes = useMemo<RouteObject[]>(
    () => [
      { index: true, element: <AppPage /> },
      { path: 'coverage', element: <CoveragePage /> },
    ],
    []
  );

  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  const element = useRoutes(routes);

  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

if (!globalThis.__root__)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  globalThis.__root__ = createRoot(document.querySelector('#root')!);

globalThis.__root__.render(
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
