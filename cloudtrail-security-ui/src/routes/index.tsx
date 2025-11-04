import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@components/layout';
import { LoadingSpinner } from '@components/shared';

const Dashboard = lazy(() => import('../pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const ScanManagement = lazy(() => import('../pages/ScanManagement').then((m) => ({ default: m.ScanManagement })));
const Alerts = lazy(() => import('../pages/Alerts').then((m) => ({ default: m.Alerts })));
const HighRiskUsers = lazy(() => import('../pages/HighRiskUsers').then((m) => ({ default: m.HighRiskUsers })));
const AttackAnalysis = lazy(() => import('../pages/AttackAnalysis').then((m) => ({ default: m.AttackAnalysis })));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'scan',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ScanManagement />
          </Suspense>
        ),
      },
      {
        path: 'alerts',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Alerts />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HighRiskUsers />
          </Suspense>
        ),
      },
      {
        path: 'attacks',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AttackAnalysis />
          </Suspense>
        ),
      },
    ],
  },
]);
