import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { createRootRouteWithContext, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { QueryClient, queryOptions } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Dashboard } from './components/Dashboard';
import { TIssueList } from './types';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { StoreProvider } from './store/StoreContext';
import { IssueViewLazy } from './components/IssueView.lazy';

import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import './index.css';

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
});

const fetchIssues = async (): Promise<TIssueList> => {
  const response = await fetch('/data/data.json');
  return await response.json();
};

export const issuesQueryOptions = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: () => fetchIssues()
  });

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(issuesQueryOptions()),
  pendingComponent: LoadingSpinner,
  component: Dashboard
});

export const issueRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '$issueId',
  component: IssueViewLazy
});

const routeTree = rootRoute.addChildren([dashboardRoute.addChildren([issueRoute])]);

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  context: {
    queryClient
  }
});

const rootElement = document.getElementById('root') as HTMLElement;

// Attach the root instance to the DOM element to persist across Fast Refreshes (relevant for dev mode only)
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Casting with as any: Since _reactRoot isn’t a standard property of HTMLElement
let root = (rootElement as any)._reactRoot as Root | undefined;

if (!root) {
  root = createRoot(rootElement);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (rootElement as any)._reactRoot = root;
}

root.render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>
);
