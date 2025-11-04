# Services & API Integration

**Project**: CloudTrail Security Monitoring UI
**Created**: 2025-01-04T00:38:00Z

---

## API Client Configuration

### Base Configuration
```typescript
// src/services/api/apiClient.ts

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors globally
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## API Service Modules

### Jobs API
```typescript
// src/services/api/jobsApi.ts

import apiClient from './apiClient';

export interface ScanParams {
  hours: number;
  max_events: number;
}

export interface JobResponse {
  job_id: string;
  status: string;
  message: string;
}

export interface JobDetails {
  job_id: string;
  status: 'processing' | 'completed' | 'failed';
  events_processed: number;
  alerts_generated: number;
  error: string | null;
  report: JobReport | null;
}

export interface JobReport {
  summary: ReportSummary;
  high_risk_users: HighRiskUser[];
  recent_alerts: Alert[];
  kill_chain_analysis: KillChainAnalysis;
}

// Trigger CloudTrail scan
export async function triggerScan(params: ScanParams): Promise<JobResponse> {
  return apiClient.post('/api/fetch-cloudtrail', params);
}

// Get job status and results
export async function fetchJobDetails(jobId: string): Promise<JobDetails> {
  return apiClient.get(`/api/jobs/${jobId}`);
}

// List all jobs
export async function fetchJobs(): Promise<JobDetails[]> {
  return apiClient.get('/api/jobs');
}
```

### Alerts API
```typescript
// src/services/api/alertsApi.ts

import apiClient from './apiClient';

export interface Alert {
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  user_id: string;
  type: string;
  risk_score: number;
  details: {
    event: string;
    reasoning: string;
  };
  source_ip_geo: Geolocation;
}

export interface Geolocation {
  city: string;
  region: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  timezone: string;
  org: string;
}

// Get recent alerts
export async function fetchAlerts(limit: number = 50): Promise<Alert[]> {
  return apiClient.get('/api/alerts', { params: { limit } });
}
```

### Users API
```typescript
// src/services/api/usersApi.ts

import apiClient from './apiClient';

export interface HighRiskUser {
  user_id: string;
  avg_risk: number;
  recent_authentications: Authentication[];
}

export interface Authentication {
  timestamp: string;
  source_ip: string;
  source_ip_geo: Geolocation;
  risk_score: number;
}

export interface UserRiskData {
  user_id: string;
  risk_score: number;
  authentications: Authentication[];
  risk_trend: RiskTrendPoint[];
}

// Get high-risk users
export async function fetchHighRiskUsers(threshold: number = 60): Promise<HighRiskUser[]> {
  return apiClient.get('/api/users/high-risk', { params: { threshold } });
}

// Get user risk assessment
export async function fetchUserRisk(userId: string): Promise<UserRiskData> {
  return apiClient.get(`/api/users/${userId}/risk`);
}
```

### Stats API
```typescript
// src/services/api/statsApi.ts

import apiClient from './apiClient';

export interface SystemStats {
  total_behaviors: number;
  total_authentications: number;
  total_privilege_requests: number;
  anomalies_detected: number;
  suspicious_authentications: number;
  denied_privileges: number;
}

export interface AttackReport {
  attackers: Attacker[];
  total_attacks: number;
  kill_chain_coverage: KillChainCoverage;
}

export interface Attacker {
  user_id: string;
  attack_detected: boolean;
  attack_type: string;
  overall_risk_score: number;
  total_malicious_events: number;
  kill_chain_phases: Record<string, number>;
  attack_timeline: AttackEvent[];
  suspicious_indicators: string[];
}

export interface AttackEvent {
  phase: string;
  event: string;
  timestamp: string;
  risk_score: number;
}

export interface KillChainCoverage {
  phases_observed: string[];
  total_phases: number;
  severity: string;
}

// Get system statistics
export async function fetchStats(): Promise<SystemStats> {
  return apiClient.get('/api/stats');
}

// Get kill chain attack report
export async function fetchAttackReport(): Promise<AttackReport> {
  return apiClient.get('/api/attack-report');
}

// Clear all data
export async function clearData(): Promise<void> {
  return apiClient.delete('/api/data');
}
```

---

## TanStack Query Configuration

### Query Client Setup
```typescript
// src/services/queryClient.ts

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000, // 5 seconds
      cacheTime: 300000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
        console.error('Query error:', error);
      }
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    }
  }
});
```

### Query Keys
```typescript
// src/services/queryKeys.ts

export const queryKeys = {
  jobs: ['jobs'] as const,
  job: (id: string) => ['job', id] as const,
  alerts: (filters?: any) => ['alerts', filters] as const,
  highRiskUsers: (threshold?: number) => ['highRiskUsers', threshold] as const,
  userRisk: (userId: string) => ['userRisk', userId] as const,
  stats: ['stats'] as const,
  attackReport: ['attackReport'] as const
};
```

---

## Polling Services

### Job Polling Hook
```typescript
// src/services/polling/useJobPolling.ts

import { useQuery } from '@tanstack/react-query';
import { fetchJobDetails } from '../api/jobsApi';
import { queryKeys } from '../queryKeys';

export function useJobPolling(jobId: string | null) {
  return useQuery(
    queryKeys.job(jobId!),
    () => fetchJobDetails(jobId!),
    {
      enabled: !!jobId,
      refetchInterval: (data) => {
        // Poll every 2-3 seconds if processing
        if (data?.status === 'processing') {
          return 2500; // 2.5 seconds
        }
        return false; // Stop polling
      },
      refetchIntervalInBackground: false,
      onSuccess: (data) => {
        if (data.status === 'completed' || data.status === 'failed') {
          console.log('Job completed:', data.job_id);
        }
      }
    }
  );
}
```

### Dashboard Polling Hook
```typescript
// src/services/polling/useDashboardPolling.ts

import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../api/statsApi';
import { fetchAlerts } from '../api/alertsApi';
import { queryKeys } from '../queryKeys';

export function useDashboardPolling() {
  // Poll stats every 30 seconds
  const statsQuery = useQuery(
    queryKeys.stats,
    fetchStats,
    {
      refetchInterval: 30000,
      refetchIntervalInBackground: false
    }
  );

  // Poll recent alerts every 30 seconds
  const alertsQuery = useQuery(
    queryKeys.alerts({ limit: 10 }),
    () => fetchAlerts(10),
    {
      refetchInterval: 30000,
      refetchIntervalInBackground: false
    }
  );

  return {
    stats: statsQuery.data,
    alerts: alertsQuery.data,
    loading: statsQuery.isLoading || alertsQuery.isLoading,
    error: statsQuery.error || alertsQuery.error
  };
}
```

---

## Zustand Store

### App Store
```typescript
// src/services/store/useAppStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AlertFilters {
  search: string;
  severity: string[];
  dateRange: { start: Date; end: Date } | null;
}

interface AppStore {
  // Alert filters
  alertFilters: AlertFilters;
  setAlertFilters: (filters: AlertFilters) => void;
  resetAlertFilters: () => void;
  
  // Selected items
  selectedAlert: Alert | null;
  setSelectedAlert: (alert: Alert | null) => void;
  
  selectedUser: string | null;
  setSelectedUser: (userId: string | null) => void;
  
  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Active job tracking
  activeJobId: string | null;
  setActiveJobId: (jobId: string | null) => void;
}

const initialFilters: AlertFilters = {
  search: '',
  severity: [],
  dateRange: null
};

export const useAppStore = create<AppStore>()(
  devtools(
    (set) => ({
      // Alert filters
      alertFilters: initialFilters,
      setAlertFilters: (filters) => set({ alertFilters: filters }),
      resetAlertFilters: () => set({ alertFilters: initialFilters }),
      
      // Selected items
      selectedAlert: null,
      setSelectedAlert: (alert) => set({ selectedAlert: alert }),
      
      selectedUser: null,
      setSelectedUser: (userId) => set({ selectedUser: userId }),
      
      // UI state
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      // Active job tracking
      activeJobId: null,
      setActiveJobId: (jobId) => set({ activeJobId: jobId })
    }),
    { name: 'AppStore' }
  )
);
```

---

## Animation Services

### Page Transitions
```typescript
// src/services/animation/pageTransitions.ts

import anime from 'animejs/lib/anime.es.js';

export function fadeIn(element: HTMLElement, duration: number = 600): void {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [20, 0],
    duration,
    easing: 'easeOutQuad'
  });
}

export function fadeOut(element: HTMLElement, duration: number = 600): void {
  anime({
    targets: element,
    opacity: [1, 0],
    translateY: [0, -20],
    duration,
    easing: 'easeInQuad'
  });
}

export function slideIn(
  element: HTMLElement,
  direction: 'left' | 'right' | 'up' | 'down' = 'right',
  duration: number = 600
): void {
  const translations: Record<string, any> = {
    left: { translateX: [-100, 0] },
    right: { translateX: [100, 0] },
    up: { translateY: [-100, 0] },
    down: { translateY: [100, 0] }
  };

  anime({
    targets: element,
    opacity: [0, 1],
    ...translations[direction],
    duration,
    easing: 'easeOutCubic'
  });
}
```

### Card Animations
```typescript
// src/services/animation/cardAnimations.ts

import anime from 'animejs/lib/anime.es.js';

export function animateCardEntrance(
  elements: HTMLElement[],
  stagger: number = 100
): void {
  anime({
    targets: elements,
    opacity: [0, 1],
    translateY: [30, 0],
    scale: [0.95, 1],
    duration: 600,
    delay: anime.stagger(stagger),
    easing: 'easeOutQuad'
  });
}

export function animateCardHover(element: HTMLElement): void {
  anime({
    targets: element,
    scale: 1.02,
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    duration: 200,
    easing: 'easeOutQuad'
  });
}

export function animateCardLoading(element: HTMLElement): void {
  anime({
    targets: element,
    opacity: [0.5, 1],
    duration: 1000,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutQuad'
  });
}
```

### Chart Animations
```typescript
// src/services/animation/chartAnimations.ts

import anime from 'animejs/lib/anime.es.js';

export function animateChartReveal(
  chartContainer: HTMLElement,
  duration: number = 1000
): void {
  anime({
    targets: chartContainer.querySelectorAll('.recharts-layer'),
    opacity: [0, 1],
    translateY: [20, 0],
    duration,
    delay: anime.stagger(100),
    easing: 'easeOutQuad'
  });
}

export function animateDataUpdate(chartContainer: HTMLElement): void {
  anime({
    targets: chartContainer.querySelectorAll('.recharts-bar, .recharts-line'),
    scale: [0.95, 1],
    duration: 400,
    easing: 'easeOutQuad'
  });
}

export function animateCounterUp(
  element: HTMLElement,
  from: number,
  to: number,
  duration: number = 1000
): void {
  const obj = { value: from };
  
  anime({
    targets: obj,
    value: to,
    duration,
    round: 1,
    easing: 'easeOutQuad',
    update: () => {
      element.textContent = obj.value.toLocaleString();
    }
  });
}
```

---

## Utility Services

### Data Formatting
```typescript
// src/services/utils/formatters.ts

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function formatRiskScore(score: number): string {
  return `${score}/100`;
}

export function formatGeolocation(geo: Geolocation): string {
  return `${geo.city}, ${geo.region}, ${geo.country}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString();
}
```

### Color Utilities
```typescript
// src/services/utils/colors.ts

export const colorPalette = {
  blue: '#2196F3',
  navyBlue: '#1565C0',
  neonGreen: '#00FF41',
  lightGreen: '#4CAF50',
  purple: '#9C27B0',
  violet: '#7B1FA2',
  
  // Severity colors
  critical: '#D32F2F',
  high: '#F57C00',
  medium: '#FBC02D',
  low: '#388E3C',
  info: '#1976D2'
};

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    CRITICAL: colorPalette.critical,
    HIGH: colorPalette.high,
    MEDIUM: colorPalette.medium,
    LOW: colorPalette.low,
    INFO: colorPalette.info
  };
  return colors[severity] || colorPalette.info;
}

export function getRiskColor(score: number): string {
  if (score >= 80) return colorPalette.critical;
  if (score >= 60) return colorPalette.high;
  if (score >= 40) return colorPalette.medium;
  return colorPalette.low;
}
```

---

## Service Integration Summary

### Data Flow
1. **Component** → **TanStack Query Hook** → **API Service** → **Backend**
2. **Backend** → **API Service** → **TanStack Query Cache** → **Component**
3. **Component** → **Zustand Store** → **Other Components**

### Polling Strategy
- **Active Jobs**: Poll every 2.5 seconds via useJobPolling
- **Dashboard**: Poll every 30 seconds via useDashboardPolling
- **Manual Refresh**: Invalidate queries via queryClient
- **Auto-stop**: Polling stops when job completes or component unmounts

### State Management
- **Server State**: TanStack Query (jobs, alerts, users, stats)
- **UI State**: Zustand (filters, selections, sidebar)
- **Local State**: React useState (forms, toggles)
- **URL State**: React Router (navigation, params)

### Animation Integration
- **Page Transitions**: fadeIn/fadeOut on route changes
- **Card Animations**: Staggered entrance animations
- **Chart Animations**: Reveal animations on mount
- **Counter Animations**: Animated number updates

---
