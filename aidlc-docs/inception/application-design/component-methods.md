# Component Methods & Interfaces

**Project**: CloudTrail Security Monitoring UI
**Created**: 2025-01-04T00:37:00Z

---

## Page Components

### DashboardPage
```typescript
interface DashboardPageProps {}

// Hooks Used
- useQuery('stats', fetchStats)
- useQuery('recentAlerts', fetchRecentAlerts)
- useDashboardPolling()
- useEffect for page animations

// Methods
- handleRefresh(): void
- handleAlertClick(alertId: string): void
```

### ScanManagementPage
```typescript
interface ScanManagementPageProps {}

// Hooks Used
- useQuery('jobs', fetchJobs)
- useMutation('triggerScan', triggerScan)
- useJobPolling(activeJobId)

// Methods
- handleTriggerScan(params: ScanParams): Promise<void>
- handleJobClick(jobId: string): void
- handleRefresh(): void
```

### AlertsPage
```typescript
interface AlertsPageProps {}

// Hooks Used
- useQuery('alerts', fetchAlerts)
- useAppStore(state => state.alertFilters)

// Methods
- handleSearch(query: string): void
- handleFilterChange(filters: AlertFilters): void
- handleAlertSelect(alertId: string): void
- handleMapMarkerClick(alert: Alert): void
```

### HighRiskUsersPage
```typescript
interface HighRiskUsersPageProps {}

// Hooks Used
- useQuery('highRiskUsers', fetchHighRiskUsers)

// Methods
- handleUserClick(userId: string): void
- handleRefresh(): void
```

### AttackAnalysisPage
```typescript
interface AttackAnalysisPageProps {}

// Hooks Used
- useQuery('attackReport', fetchAttackReport)

// Methods
- handleAttackerSelect(userId: string): void
- handleTimelineEventClick(event: AttackEvent): void
- handleRefresh(): void
```

---

## Feature Components

### Dashboard Features

#### MetricsOverview
```typescript
interface MetricsOverviewProps {
  stats: SystemStats;
  loading?: boolean;
}

// Methods
- animateCounters(): void
- formatNumber(value: number): string
```

#### RecentAlerts
```typescript
interface RecentAlertsProps {
  alerts: Alert[];
  onAlertClick: (alertId: string) => void;
}

// Methods
- getSeverityColor(severity: string): string
- formatTimestamp(timestamp: string): string
```

#### RiskTrendChart
```typescript
interface RiskTrendChartProps {
  data: RiskTrendData[];
  height?: number;
}

// Methods
- formatChartData(data: RiskTrendData[]): ChartData[]
- animateChart(): void
```

#### AlertDistributionChart
```typescript
interface AlertDistributionChartProps {
  data: AlertDistribution[];
  onSegmentClick?: (severity: string) => void;
}

// Methods
- formatChartData(data: AlertDistribution[]): ChartData[]
- handleSegmentClick(severity: string): void
```

### Scan Management Features

#### ScanTriggerForm
```typescript
interface ScanTriggerFormProps {
  onSubmit: (params: ScanParams) => Promise<void>;
  loading?: boolean;
}

interface ScanParams {
  hours: number;
  max_events: number;
}

// Methods
- handleSubmit(e: FormEvent): void
- validateForm(): boolean
- resetForm(): void
```

#### JobStatusCard
```typescript
interface JobStatusCardProps {
  jobId: string;
  status: JobStatus;
  eventsProcessed: number;
  alertsGenerated: number;
}

// Methods
- getStatusColor(status: string): string
- animateProgress(): void
- formatStatus(status: string): string
```

#### JobList
```typescript
interface JobListProps {
  jobs: Job[];
  onJobClick: (jobId: string) => void;
}

// Methods
- getStatusIcon(status: string): ReactNode
- formatTimestamp(timestamp: string): string
- sortJobs(jobs: Job[]): Job[]
```

#### JobDetails
```typescript
interface JobDetailsProps {
  job: Job;
  report: JobReport | null;
}

// Methods
- animateReveal(): void
- handleExport(): void
- formatReport(report: JobReport): string
```

### Alerts Features

#### AlertsTable
```typescript
interface AlertsTableProps {
  alerts: Alert[];
  onAlertSelect: (alert: Alert) => void;
  loading?: boolean;
}

// Methods
- getSeverityColor(severity: string): string
- formatTimestamp(timestamp: string): string
- handleRowClick(alert: Alert): void
- handleSort(column: string): void
```

#### AlertDetails
```typescript
interface AlertDetailsProps {
  alert: Alert;
  onClose: () => void;
}

// Methods
- animateSlideIn(): void
- formatGeolocation(geo: Geolocation): string
- handleClose(): void
```

#### AlertMap
```typescript
interface AlertMapProps {
  alerts: Alert[];
  onMarkerClick: (alert: Alert) => void;
  selectedAlert?: Alert;
}

// Methods
- getMarkerColor(severity: string): string
- createMarkers(alerts: Alert[]): Marker[]
- animateMarkers(): void
- handleMarkerClick(alert: Alert): void
- fitBounds(): void
```

#### AlertFilters
```typescript
interface AlertFiltersProps {
  filters: AlertFilters;
  onFilterChange: (filters: AlertFilters) => void;
}

interface AlertFilters {
  search: string;
  severity: string[];
  dateRange: DateRange;
}

// Methods
- handleSearchChange(query: string): void
- handleSeverityToggle(severity: string): void
- handleDateRangeChange(range: DateRange): void
- handleClearFilters(): void
```

### High-Risk Users Features

#### UserRiskList
```typescript
interface UserRiskListProps {
  users: HighRiskUser[];
  onUserClick: (userId: string) => void;
}

// Methods
- getRiskColor(score: number): string
- sortByRisk(users: HighRiskUser[]): HighRiskUser[]
- animateList(): void
```

#### UserProfile
```typescript
interface UserProfileProps {
  userId: string;
  riskData: UserRiskData;
}

// Methods
- animateReveal(): void
- formatRiskScore(score: number): string
- getRiskLevel(score: number): string
```

#### AuthenticationHistory
```typescript
interface AuthenticationHistoryProps {
  authentications: Authentication[];
}

// Methods
- formatTimestamp(timestamp: string): string
- formatGeolocation(geo: Geolocation): string
- getRiskColor(score: number): string
- handleSort(column: string): void
```

#### RiskScoreGauge
```typescript
interface RiskScoreGaugeProps {
  score: number;
  size?: number;
}

// Methods
- animateNeedle(score: number): void
- getColor(score: number): string
- formatScore(score: number): string
```

### Attack Analysis Features

#### KillChainVisualization
```typescript
interface KillChainVisualizationProps {
  phases: KillChainPhase[];
  observedPhases: string[];
}

// Methods
- animatePhases(): void
- isPhaseObserved(phase: string): boolean
- handlePhaseClick(phase: string): void
```

#### AttackTimeline
```typescript
interface AttackTimelineProps {
  events: AttackEvent[];
}

// Methods
- animateTimeline(): void
- formatTimestamp(timestamp: string): string
- getRiskColor(score: number): string
- handleEventClick(event: AttackEvent): void
```

#### AttackerProfile
```typescript
interface AttackerProfileProps {
  attacker: Attacker;
}

// Methods
- animateReveal(): void
- formatAttackType(type: string): string
- getRiskColor(score: number): string
```

#### SuspiciousIndicators
```typescript
interface SuspiciousIndicatorsProps {
  indicators: string[];
}

// Methods
- animateList(): void
- getSeverityBadge(indicator: string): ReactNode
```

---

## Shared Components

### UI Components

#### Card
```typescript
interface CardProps {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  loading?: boolean;
  className?: string;
}

// Methods
- animateEntrance(): void
```

#### Button
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

// Methods
- handleClick(): void
- animateHover(): void
```

#### Badge
```typescript
interface BadgeProps {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  pulse?: boolean;
}

// Methods
- getColor(severity: string): string
- animatePulse(): void
```

#### Chip
```typescript
interface ChipProps {
  label: string;
  onRemove?: () => void;
  color?: string;
}

// Methods
- handleRemove(): void
- animateRemoval(): void
```

#### LoadingSpinner
```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

// Methods
- animateRotation(): void
```

#### ErrorBoundary
```typescript
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Methods
- static getDerivedStateFromError(error: Error): ErrorBoundaryState
- componentDidCatch(error: Error, errorInfo: ErrorInfo): void
- handleRetry(): void
```

### Chart Components

#### LineChart
```typescript
interface LineChartProps {
  data: ChartData[];
  xKey: string;
  yKey: string;
  height?: number;
  color?: string;
}

// Methods
- animateChart(): void
- formatTooltip(value: any): string
```

#### BarChart
```typescript
interface BarChartProps {
  data: ChartData[];
  xKey: string;
  yKey: string;
  height?: number;
  color?: string;
}

// Methods
- animateChart(): void
- formatTooltip(value: any): string
```

#### PieChart
```typescript
interface PieChartProps {
  data: ChartData[];
  nameKey: string;
  valueKey: string;
  height?: number;
  colors?: string[];
}

// Methods
- animateChart(): void
- formatTooltip(value: any): string
- handleSegmentClick(data: any): void
```

#### GaugeChart
```typescript
interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  thresholds?: number[];
  size?: number;
}

// Methods
- animateNeedle(value: number): void
- getColor(value: number): string
- drawGauge(): void
```

### Map Components

#### MapContainer
```typescript
interface MapContainerProps {
  center?: [number, number];
  zoom?: number;
  children: ReactNode;
  height?: number;
}

// Methods
- handleMapReady(): void
- fitBounds(bounds: LatLngBounds): void
```

#### MarkerCluster
```typescript
interface MarkerClusterProps {
  markers: MapMarker[];
  onMarkerClick: (marker: MapMarker) => void;
}

// Methods
- createCluster(markers: MapMarker[]): Cluster
- getClusterColor(count: number): string
- animateClusterExpansion(): void
- handleMarkerClick(marker: MapMarker): void
```

#### LocationPopup
```typescript
interface LocationPopupProps {
  location: Geolocation;
  alert: Alert;
}

// Methods
- formatLocation(geo: Geolocation): string
- getSeverityBadge(severity: string): ReactNode
```

---

## Service Hooks

### API Hooks

#### useJobs
```typescript
function useJobs() {
  return useQuery('jobs', fetchJobs);
}
```

#### useJobDetails
```typescript
function useJobDetails(jobId: string) {
  return useQuery(['job', jobId], () => fetchJobDetails(jobId), {
    enabled: !!jobId,
    refetchInterval: (data) => data?.status === 'processing' ? 2000 : false
  });
}
```

#### useAlerts
```typescript
function useAlerts(filters?: AlertFilters) {
  return useQuery(['alerts', filters], () => fetchAlerts(filters));
}
```

#### useHighRiskUsers
```typescript
function useHighRiskUsers(threshold?: number) {
  return useQuery(['highRiskUsers', threshold], () => fetchHighRiskUsers(threshold));
}
```

#### useUserRisk
```typescript
function useUserRisk(userId: string) {
  return useQuery(['userRisk', userId], () => fetchUserRisk(userId), {
    enabled: !!userId
  });
}
```

#### useStats
```typescript
function useStats() {
  return useQuery('stats', fetchStats);
}
```

#### useAttackReport
```typescript
function useAttackReport() {
  return useQuery('attackReport', fetchAttackReport);
}
```

### Mutation Hooks

#### useTriggerScan
```typescript
function useTriggerScan() {
  const queryClient = useQueryClient();
  
  return useMutation(
    (params: ScanParams) => triggerScan(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobs');
      }
    }
  );
}
```

### Polling Hooks

#### useJobPolling
```typescript
function useJobPolling(jobId: string | null) {
  const { data, isLoading } = useQuery(
    ['job', jobId],
    () => fetchJobDetails(jobId!),
    {
      enabled: !!jobId,
      refetchInterval: (data) => {
        if (!data) return false;
        return data.status === 'processing' ? 2000 : false;
      }
    }
  );
  
  return { job: data, loading: isLoading };
}
```

#### useDashboardPolling
```typescript
function useDashboardPolling() {
  useQuery('stats', fetchStats, {
    refetchInterval: 30000,
    refetchIntervalInBackground: false
  });
  
  useQuery('recentAlerts', fetchRecentAlerts, {
    refetchInterval: 30000,
    refetchIntervalInBackground: false
  });
}
```

### Store Hooks

#### useAppStore
```typescript
interface AppStore {
  // Alert filters
  alertFilters: AlertFilters;
  setAlertFilters: (filters: AlertFilters) => void;
  
  // Selected items
  selectedAlert: Alert | null;
  setSelectedAlert: (alert: Alert | null) => void;
  
  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const useAppStore = create<AppStore>((set) => ({
  alertFilters: { search: '', severity: [], dateRange: null },
  setAlertFilters: (filters) => set({ alertFilters: filters }),
  
  selectedAlert: null,
  setSelectedAlert: (alert) => set({ selectedAlert: alert }),
  
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
}));
```

---

## Animation Utilities

### pageTransitions
```typescript
function fadeIn(element: HTMLElement, duration: number = 600): void
function fadeOut(element: HTMLElement, duration: number = 600): void
function slideIn(element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down'): void
```

### cardAnimations
```typescript
function animateCardEntrance(elements: HTMLElement[], stagger: number = 100): void
function animateCardHover(element: HTMLElement): void
function animateCardLoading(element: HTMLElement): void
```

### chartAnimations
```typescript
function animateChartReveal(chartRef: RefObject<any>, duration: number = 1000): void
function animateDataUpdate(chartRef: RefObject<any>): void
```

---
