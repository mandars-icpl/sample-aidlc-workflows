# Component Dependencies & Data Flow

**Project**: CloudTrail Security Monitoring UI
**Created**: 2025-01-04T00:39:00Z

---

## Component Dependency Matrix

### Page-Level Dependencies

| Component | Depends On | Provides To | State Management |
|-----------|------------|-------------|------------------|
| DashboardPage | MetricsOverview, RecentAlerts, RiskTrendChart, AlertDistributionChart | - | TanStack Query (stats, alerts) |
| ScanManagementPage | ScanTriggerForm, JobStatusCard, JobList, JobDetails | - | TanStack Query (jobs), Zustand (activeJobId) |
| AlertsPage | AlertsTable, AlertDetails, AlertMap, AlertFilters | - | TanStack Query (alerts), Zustand (filters, selectedAlert) |
| HighRiskUsersPage | UserRiskList, UserProfile, AuthenticationHistory, RiskScoreGauge | - | TanStack Query (users), Zustand (selectedUser) |
| AttackAnalysisPage | KillChainVisualization, AttackTimeline, AttackerProfile, SuspiciousIndicators | - | TanStack Query (attackReport) |

### Feature Component Dependencies

| Component | Depends On | Provides To | Data Source |
|-----------|------------|-------------|-------------|
| MetricsOverview | Card, Badge | DashboardPage | Props (stats) |
| RecentAlerts | Card, Badge, Chip | DashboardPage | Props (alerts) |
| RiskTrendChart | LineChart | DashboardPage | Props (data) |
| AlertDistributionChart | PieChart | DashboardPage | Props (data) |
| ScanTriggerForm | Button, TextField | ScanManagementPage | Local state |
| JobStatusCard | Card, Badge, LoadingSpinner | ScanManagementPage | Props (job) |
| JobList | DataGrid | ScanManagementPage | Props (jobs) |
| JobDetails | Card | ScanManagementPage | Props (job, report) |
| AlertsTable | DataGrid, Badge | AlertsPage | Props (alerts) |
| AlertDetails | Card, Badge, Chip | AlertsPage | Props (alert) |
| AlertMap | MapContainer, MarkerCluster, LocationPopup | AlertsPage | Props (alerts) |
| AlertFilters | TextField, Chip | AlertsPage | Zustand (filters) |
| UserRiskList | Card, Badge | HighRiskUsersPage | Props (users) |
| UserProfile | Card, RiskScoreGauge | HighRiskUsersPage | Props (user) |
| AuthenticationHistory | DataGrid | HighRiskUsersPage | Props (authentications) |
| RiskScoreGauge | - | UserProfile | Props (score) |
| KillChainVisualization | Card | AttackAnalysisPage | Props (phases) |
| AttackTimeline | Card, Badge | AttackAnalysisPage | Props (events) |
| AttackerProfile | Card, Badge | AttackAnalysisPage | Props (attacker) |
| SuspiciousIndicators | Card, Chip | AttackAnalysisPage | Props (indicators) |

### Shared Component Dependencies

| Component | Depends On | Used By | Purpose |
|-----------|------------|---------|---------|
| Card | - | All feature components | Container wrapper |
| Button | - | Forms, actions | User actions |
| Badge | - | Severity indicators | Status display |
| Chip | - | Filters, tags | Removable items |
| LoadingSpinner | - | Loading states | Loading indicator |
| ErrorBoundary | - | App root | Error handling |
| LineChart | Recharts | RiskTrendChart | Time-series data |
| BarChart | Recharts | Various charts | Categorical data |
| PieChart | Recharts | AlertDistributionChart | Proportional data |
| GaugeChart | anime.js | RiskScoreGauge | Score visualization |
| MapContainer | Leaflet | AlertMap | Map wrapper |
| MarkerCluster | Leaflet | AlertMap | Marker clustering |
| LocationPopup | - | AlertMap | Marker popup |

---

## Data Flow Diagrams

### Dashboard Page Data Flow
```
Backend API
    ↓
GET /api/stats
    ↓
TanStack Query (stats)
    ↓
DashboardPage
    ├→ MetricsOverview (stats.summary)
    ├→ RiskTrendChart (stats.trends)
    └→ AlertDistributionChart (stats.distribution)

GET /api/alerts?limit=10
    ↓
TanStack Query (recentAlerts)
    ↓
DashboardPage
    └→ RecentAlerts (alerts)
```

### Scan Management Page Data Flow
```
User Action (Trigger Scan)
    ↓
ScanTriggerForm
    ↓
useTriggerScan mutation
    ↓
POST /api/fetch-cloudtrail
    ↓
Backend API
    ↓
Response (job_id)
    ↓
Zustand Store (setActiveJobId)
    ↓
useJobPolling (job_id)
    ↓
GET /api/jobs/{job_id} (every 2.5s)
    ↓
TanStack Query (job)
    ↓
JobStatusCard (real-time updates)

GET /api/jobs
    ↓
TanStack Query (jobs)
    ↓
JobList
```

### Alerts Page Data Flow
```
GET /api/alerts
    ↓
TanStack Query (alerts)
    ↓
AlertsPage
    ├→ AlertsTable (alerts)
    └→ AlertMap (alerts with geolocation)

User Action (Select Alert)
    ↓
AlertsTable.onRowClick
    ↓
Zustand Store (setSelectedAlert)
    ↓
AlertDetails (selectedAlert)
    └→ AlertMap (highlight marker)

User Action (Filter)
    ↓
AlertFilters
    ↓
Zustand Store (setAlertFilters)
    ↓
TanStack Query (refetch with filters)
    ↓
AlertsTable (filtered alerts)
```

### High-Risk Users Page Data Flow
```
GET /api/users/high-risk
    ↓
TanStack Query (highRiskUsers)
    ↓
HighRiskUsersPage
    └→ UserRiskList (users)

User Action (Select User)
    ↓
UserRiskList.onUserClick
    ↓
Zustand Store (setSelectedUser)
    ↓
GET /api/users/{user_id}/risk
    ↓
TanStack Query (userRisk)
    ↓
UserProfile
    ├→ RiskScoreGauge (risk_score)
    └→ AuthenticationHistory (authentications)
```

### Attack Analysis Page Data Flow
```
GET /api/attack-report
    ↓
TanStack Query (attackReport)
    ↓
AttackAnalysisPage
    ├→ KillChainVisualization (kill_chain_coverage)
    ├→ AttackTimeline (attack_timeline)
    ├→ AttackerProfile (attackers)
    └→ SuspiciousIndicators (suspicious_indicators)
```

---

## State Management Architecture

### TanStack Query (Server State)

**Query Keys Structure**:
```typescript
queryKeys = {
  jobs: ['jobs'],
  job: (id) => ['job', id],
  alerts: (filters) => ['alerts', filters],
  highRiskUsers: (threshold) => ['highRiskUsers', threshold],
  userRisk: (userId) => ['userRisk', userId],
  stats: ['stats'],
  attackReport: ['attackReport']
}
```

**Cache Strategy**:
- **Stale Time**: 5 seconds (data considered fresh)
- **Cache Time**: 5 minutes (data kept in cache)
- **Refetch on Focus**: Disabled (manual refresh only)
- **Retry**: 1 attempt on failure

**Polling Queries**:
- **Job Status**: Refetch every 2.5s when status === 'processing'
- **Dashboard Stats**: Refetch every 30s
- **Recent Alerts**: Refetch every 30s

### Zustand (UI State)

**Store Structure**:
```typescript
AppStore = {
  // Filters
  alertFilters: { search, severity, dateRange },
  setAlertFilters,
  resetAlertFilters,
  
  // Selections
  selectedAlert,
  setSelectedAlert,
  selectedUser,
  setSelectedUser,
  
  // UI State
  sidebarOpen,
  toggleSidebar,
  
  // Active Job
  activeJobId,
  setActiveJobId
}
```

**Usage Pattern**:
```typescript
// Read state
const filters = useAppStore(state => state.alertFilters);

// Update state
const setFilters = useAppStore(state => state.setAlertFilters);
setFilters({ search: 'test', severity: ['HIGH'], dateRange: null });
```

### React Router (URL State)

**Routes**:
```typescript
routes = [
  { path: '/', element: <DashboardPage /> },
  { path: '/scan', element: <ScanManagementPage /> },
  { path: '/jobs/:jobId', element: <JobDetailsPage /> },
  { path: '/alerts', element: <AlertsPage /> },
  { path: '/users', element: <HighRiskUsersPage /> },
  { path: '/users/:userId', element: <UserDetailsPage /> },
  { path: '/attacks', element: <AttackAnalysisPage /> }
]
```

**Navigation Pattern**:
```typescript
// Programmatic navigation
const navigate = useNavigate();
navigate('/jobs/123');

// Link navigation
<Link to="/alerts">View Alerts</Link>

// Route params
const { jobId } = useParams();
```

---

## Communication Patterns

### Parent-Child Communication

**Props Down**:
```typescript
// Parent passes data and callbacks to child
<AlertsTable
  alerts={alerts}
  onAlertSelect={handleAlertSelect}
  loading={isLoading}
/>
```

**Events Up**:
```typescript
// Child calls parent callback
function AlertsTable({ alerts, onAlertSelect }) {
  const handleRowClick = (alert) => {
    onAlertSelect(alert); // Notify parent
  };
  
  return <DataGrid onRowClick={handleRowClick} />;
}
```

### Sibling Communication

**Via Zustand Store**:
```typescript
// Component A sets state
function AlertsTable() {
  const setSelectedAlert = useAppStore(state => state.setSelectedAlert);
  
  const handleRowClick = (alert) => {
    setSelectedAlert(alert);
  };
}

// Component B reads state
function AlertDetails() {
  const selectedAlert = useAppStore(state => state.selectedAlert);
  
  if (!selectedAlert) return null;
  return <div>{selectedAlert.details}</div>;
}
```

### Global Communication

**Via TanStack Query**:
```typescript
// Component A triggers mutation
function ScanTriggerForm() {
  const { mutate } = useTriggerScan();
  
  const handleSubmit = (params) => {
    mutate(params); // Triggers scan
  };
}

// Component B automatically updates
function JobList() {
  const { data: jobs } = useQuery('jobs', fetchJobs);
  // Automatically refetches after mutation
  return <DataGrid rows={jobs} />;
}
```

---

## Dependency Injection

### API Client Injection
```typescript
// All API services use the same apiClient instance
import apiClient from './apiClient';

export function fetchJobs() {
  return apiClient.get('/api/jobs');
}
```

### Query Client Injection
```typescript
// App root provides QueryClient to all components
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes />
      </Router>
    </QueryClientProvider>
  );
}
```

### Theme Injection
```typescript
// MUI ThemeProvider provides theme to all components
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}
```

---

## Error Handling Strategy

### API Error Handling
```typescript
// Global error interceptor in apiClient
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);
    // Could trigger toast notification here
    return Promise.reject(error);
  }
);
```

### Query Error Handling
```typescript
// Per-query error handling
const { data, error, isError } = useQuery('jobs', fetchJobs, {
  onError: (error) => {
    console.error('Failed to fetch jobs:', error);
    // Show error notification
  }
});

if (isError) {
  return <ErrorMessage error={error} />;
}
```

### Component Error Boundary
```typescript
// Catch rendering errors
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

---

## Performance Optimization

### Code Splitting
```typescript
// Lazy load pages
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AlertsPage = lazy(() => import('./pages/AlertsPage'));

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/alerts" element={<AlertsPage />} />
  </Routes>
</Suspense>
```

### Memoization
```typescript
// Memoize expensive computations
const filteredAlerts = useMemo(() => {
  return alerts.filter(alert => 
    alert.severity === 'CRITICAL'
  );
}, [alerts]);

// Memoize callbacks
const handleAlertClick = useCallback((alert) => {
  setSelectedAlert(alert);
}, [setSelectedAlert]);
```

### Virtual Scrolling
```typescript
// Use MUI X DataGrid virtualization for large datasets
<DataGrid
  rows={alerts}
  columns={columns}
  virtualization
  pageSize={50}
/>
```

---
