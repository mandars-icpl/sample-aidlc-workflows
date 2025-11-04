# Logical Components - Unit 1: Core Infrastructure

**Unit**: Core Infrastructure
**Phase**: CONSTRUCTION
**Created**: 2025-01-04T01:08:00Z

---

## Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser                              │
│  ┌───────────────────────────────────────────────────┐  │
│  │              React Application                     │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │           App Component                      │  │  │
│  │  │  - ErrorBoundary                            │  │  │
│  │  │  - ThemeProvider (MUI)                      │  │  │
│  │  │  - QueryClientProvider (TanStack)           │  │  │
│  │  │  - Router (React Router)                    │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                      ↓                             │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │           Layout Component                   │  │  │
│  │  │  - Navigation                               │  │  │
│  │  │  - Header                                   │  │  │
│  │  │  - Main Content Area                        │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                      ↓                             │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │           Page Components                    │  │  │
│  │  │  (Lazy loaded via React Router)             │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│              State Management Layer                      │
│  ┌──────────────────┐    ┌──────────────────────────┐  │
│  │  Zustand Store   │    │  TanStack Query Cache    │  │
│  │  (UI State)      │    │  (Server State)          │  │
│  └──────────────────┘    └──────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│              Service Layer                               │
│  ┌──────────────────┐    ┌──────────────────────────┐  │
│  │  API Client      │    │  Animation Services      │  │
│  │  (Axios)         │    │  (anime.js)              │  │
│  └──────────────────┘    └──────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│              Backend API                                 │
│              (http://127.0.0.1:8000)                    │
└─────────────────────────────────────────────────────────┘
```

---

## Logical Component Breakdown

### 1. Application Root

**Component**: App
**Responsibilities**:
- Initialize providers (Theme, Query, Router)
- Setup error boundaries
- Configure global styles
- Handle app-level state

**Dependencies**:
- React
- MUI ThemeProvider
- TanStack QueryClientProvider
- React Router BrowserRouter

**Configuration**:
```typescript
// src/App.tsx
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { darkTheme } from './theme';
import { queryClient } from './services/queryClient';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { AppRoutes } from './routes';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
```

---

### 2. Routing Layer

**Component**: AppRoutes
**Responsibilities**:
- Define application routes
- Lazy load page components
- Handle 404 errors
- Provide loading fallbacks

**Routes**:
- `/` → DashboardPage
- `/scan` → ScanManagementPage
- `/alerts` → AlertsPage
- `/users` → HighRiskUsersPage
- `/attacks` → AttackAnalysisPage

**Implementation**:
```typescript
// src/routes/index.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const ScanManagementPage = lazy(() => import('@/pages/ScanManagementPage'));
const AlertsPage = lazy(() => import('@/pages/AlertsPage'));
const HighRiskUsersPage = lazy(() => import('@/pages/HighRiskUsersPage'));
const AttackAnalysisPage = lazy(() => import('@/pages/AttackAnalysisPage'));

export function AppRoutes() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/scan" element={<ScanManagementPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/users" element={<HighRiskUsersPage />} />
          <Route path="/attacks" element={<AttackAnalysisPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
```

---

### 3. Layout Components

**Component**: Layout
**Responsibilities**:
- Provide consistent page structure
- Render navigation and header
- Handle responsive layout
- Apply global spacing

**Structure**:
```typescript
// src/components/layout/Layout.tsx
export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

**Component**: Navigation
**Responsibilities**:
- Display navigation links
- Highlight active route
- Handle mobile menu
- Animate transitions

**Component**: Header
**Responsibilities**:
- Display app title
- Show system status
- Provide refresh button
- Display user info (future)

---

### 4. State Management Layer

**Component**: Zustand Store
**Responsibilities**:
- Manage UI state (filters, selections, sidebar)
- Provide state update functions
- Persist state (optional)

**Store Structure**:
```typescript
// src/services/store/useAppStore.ts
interface AppStore {
  // Alert state
  alertFilters: AlertFilters;
  setAlertFilters: (filters: AlertFilters) => void;
  selectedAlert: Alert | null;
  setSelectedAlert: (alert: Alert | null) => void;
  
  // User state
  selectedUser: string | null;
  setSelectedUser: (userId: string | null) => void;
  
  // Job state
  activeJobId: string | null;
  setActiveJobId: (jobId: string | null) => void;
  
  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}
```

**Component**: TanStack Query Client
**Responsibilities**:
- Cache server data
- Handle background refetching
- Manage loading/error states
- Provide polling capabilities

**Configuration**:
```typescript
// src/services/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});
```

---

### 5. API Service Layer

**Component**: API Client
**Responsibilities**:
- Configure Axios instance
- Add request/response interceptors
- Handle errors globally
- Provide base URL configuration

**Implementation**:
```typescript
// src/services/api/apiClient.ts
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);
```

**API Modules**:
- `jobsApi.ts` - Job management endpoints
- `alertsApi.ts` - Alert endpoints
- `usersApi.ts` - User risk endpoints
- `statsApi.ts` - Statistics endpoints

---

### 6. Animation Service Layer

**Component**: Animation Utilities
**Responsibilities**:
- Provide reusable animation functions
- Ensure consistent timing/easing
- Handle cleanup
- Support reduced motion

**Modules**:
- `pageTransitions.ts` - Page entry/exit animations
- `cardAnimations.ts` - Card and component animations
- `chartAnimations.ts` - Chart reveal animations
- `counterAnimations.ts` - Number counter animations
- `gaugeAnimations.ts` - Gauge and progress animations
- `mapAnimations.ts` - Map marker animations
- `timelineAnimations.ts` - Timeline animations
- `killChainAnimations.ts` - Kill chain animations
- `tableAnimations.ts` - Table row animations
- `buttonAnimations.ts` - Button interactions
- `modalAnimations.ts` - Modal open/close

---

### 7. Shared Component Library

**UI Components**:
- Card - Reusable container
- Button - Styled button with variants
- Badge - Severity/status indicators
- Chip - Filter chips
- LoadingSpinner - Loading indicator
- ErrorBoundary - Error handling

**Chart Components**:
- LineChart - Recharts wrapper
- BarChart - Recharts wrapper
- PieChart - Recharts wrapper
- GaugeChart - Custom gauge with anime.js

**Map Components**:
- MapContainer - Leaflet wrapper
- MarkerCluster - Clustered markers
- LocationPopup - Marker popup

---

### 8. Utility Layer

**Color Utilities**:
```typescript
// src/utils/colors.ts
export const colorPalette = {
  blue: '#2196F3',
  navyBlue: '#1565C0',
  neonGreen: '#00FF41',
  lightGreen: '#4CAF50',
  purple: '#9C27B0',
  violet: '#7B1FA2'
};

export function getSeverityColor(severity: string): string;
export function getRiskColor(score: number): string;
```

**Formatters**:
```typescript
// src/utils/formatters.ts
export function formatTimestamp(timestamp: string): string;
export function formatNumber(value: number): string;
export function formatGeolocation(geo: Geolocation): string;
export function formatRiskScore(score: number): string;
```

---

### 9. Theme Configuration

**Component**: MUI Theme
**Responsibilities**:
- Define color palette
- Configure typography
- Set component defaults
- Enable dark mode

**Configuration**:
```typescript
// src/theme/index.ts
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2196F3' },
    secondary: { main: '#00FF41' },
    error: { main: '#D32F2F' },
    warning: { main: '#F57C00' },
    success: { main: '#4CAF50' }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif'
  }
});
```

**Component**: Tailwind Configuration
**Responsibilities**:
- Extend default theme
- Add custom colors
- Configure dark mode
- Add custom utilities

---

### 10. Type Definitions

**Component**: TypeScript Types
**Responsibilities**:
- Define API response types
- Define component prop types
- Define store types
- Ensure type safety

**Modules**:
- `api.types.ts` - API response types
- `component.types.ts` - Component prop types
- `store.types.ts` - Store state types

---

## Component Interaction Flow

### Data Fetching Flow
```
Page Component
  ↓
useQuery Hook (TanStack Query)
  ↓
API Service Function
  ↓
API Client (Axios)
  ↓
Backend API
  ↓
Response cached in Query Client
  ↓
Component re-renders with data
```

### State Update Flow
```
User Action (e.g., filter change)
  ↓
Event Handler in Component
  ↓
Zustand Store Update Function
  ↓
Store State Updated
  ↓
Components subscribed to state re-render
```

### Animation Flow
```
Component Mount/Update
  ↓
useEffect Hook
  ↓
Animation Utility Function
  ↓
anime.js Animation
  ↓
DOM Elements Animated
  ↓
Cleanup on Unmount
```

---

## Deployment Architecture

### Development
```
Vite Dev Server (localhost:5173)
  ↓
Hot Module Replacement
  ↓
React Application
  ↓
API Proxy to Backend (localhost:8000)
```

### Production Build
```
npm run build
  ↓
Vite Build Process
  ↓
dist/ Directory
  ├── index.html
  ├── assets/
  │   ├── index-[hash].js
  │   ├── index-[hash].css
  │   └── [lazy-chunks]-[hash].js
  └── [static assets]
```

---

## Performance Considerations

### Bundle Splitting Strategy
- **Main Bundle**: App shell, Layout, Router, Providers
- **Vendor Bundle**: React, MUI, TanStack Query, Zustand
- **Page Bundles**: Each page lazy loaded separately
- **Heavy Libraries**: Recharts, Leaflet loaded on-demand

### Caching Strategy
- **TanStack Query**: 5-minute cache, 5-second stale time
- **Browser Cache**: Hashed filenames for long-term caching
- **Service Worker**: Future enhancement for offline support

---
