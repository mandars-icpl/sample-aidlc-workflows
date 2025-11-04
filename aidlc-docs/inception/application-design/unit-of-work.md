# Units of Work

**Project**: CloudTrail Security Monitoring UI
**Created**: 2025-01-04T00:55:00Z

---

## Unit Decomposition Strategy

**Approach**: 6-unit decomposition with priority-based development
**Development Order**: Core → Dashboard → Scan Management → (Alerts, Users, Attacks in parallel)

---

## Unit 1: Core Infrastructure & Shared Components

**Priority**: 1 (Build First)
**Type**: Foundation Layer
**Development Approach**: Minimal viable foundation, expand as needed

### Responsibilities
- Application layout and navigation
- Shared UI components
- API client and service layer
- State management setup (Zustand + TanStack Query)
- Animation utilities
- Theme and styling configuration

### Components
**Layout**:
- App (root component with providers)
- Layout (main layout wrapper)
- Navigation (sidebar/header navigation)
- Header (app header bar)

**Shared UI Components**:
- Card (reusable card container)
- Button (styled button with variants)
- Badge (severity/status badges)
- Chip (filter chips)
- LoadingSpinner (loading indicator)
- ErrorBoundary (error handling)

**Services**:
- apiClient (Axios instance with interceptors)
- queryClient (TanStack Query configuration)
- useAppStore (Zustand store)

**Utilities**:
- Animation utilities (pageTransitions, cardAnimations)
- Color utilities (getSeverityColor, getRiskColor)
- Formatters (formatTimestamp, formatNumber, formatGeolocation)

**Configuration**:
- Theme configuration (MUI dark theme with custom palette)
- Tailwind CSS configuration
- Router configuration

### Dependencies
- **External**: React, React Router, MUI, Tailwind, Zustand, TanStack Query, anime.js, Axios
- **Internal**: None (foundation layer)

### Outputs
- Functional app shell with navigation
- Reusable component library
- Working API client
- State management ready
- Theme applied

---

## Unit 2: Dashboard Page

**Priority**: 2 (Build Second)
**Type**: Feature Page
**Development Approach**: Complete dashboard with all visualizations

### Responsibilities
- Display system overview and key metrics
- Show recent alerts summary
- Render risk trend charts
- Display alert distribution
- Auto-refresh data every 30 seconds

### Components
**Page**:
- DashboardPage (main page component)

**Features**:
- MetricsOverview (summary statistics with animated counters)
- RecentAlerts (latest alerts list)
- RiskTrendChart (line chart with Recharts)
- AlertDistributionChart (pie chart with Recharts)

**Charts** (if not in Core):
- LineChart (Recharts wrapper)
- PieChart (Recharts wrapper)

**Services**:
- useDashboardPolling (30-second polling hook)
- useStats (fetch system stats)
- useAlerts (fetch recent alerts)

**Animations**:
- Page entry animation
- Card stagger animation
- Counter animations
- Chart reveal animations

### Dependencies
- **External**: Recharts
- **Internal**: Core Infrastructure (Layout, Card, Badge, API client, store)

### Outputs
- Functional dashboard page
- Real-time data updates
- Animated visualizations
- Working navigation to dashboard

---

## Unit 3: Scan Management Page

**Priority**: 3 (Build Third)
**Type**: Feature Page
**Development Approach**: Complete scan workflow with real-time polling

### Responsibilities
- Trigger new CloudTrail scans
- Display active job status with real-time updates
- List all jobs (past and present)
- Show detailed job results

### Components
**Page**:
- ScanManagementPage (main page component)

**Features**:
- ScanTriggerForm (form to configure and trigger scans)
- JobStatusCard (real-time job status display)
- JobList (table of all jobs)
- JobDetails (detailed job information and report)

**Services**:
- useJobPolling (2.5-second polling hook for active jobs)
- useTriggerScan (mutation to trigger scan)
- useJobs (fetch all jobs)
- useJobDetails (fetch specific job)

**Animations**:
- Page entry animation
- Form submission animation
- Job status update animations
- Progress indicator animations

### Dependencies
- **External**: None (uses Core dependencies)
- **Internal**: Core Infrastructure (Layout, Card, Button, DataGrid, API client, store)

### Outputs
- Functional scan management page
- Working scan trigger
- Real-time job monitoring
- Job history and details

---

## Unit 4: Alerts Page

**Priority**: 4 (Build After Core Features)
**Type**: Feature Page
**Development Approach**: Complete alert management with map visualization

### Responsibilities
- Display comprehensive alert list
- Show alert details with geolocation
- Render interactive map with IP locations
- Provide basic search and filtering

### Components
**Page**:
- AlertsPage (main page component)

**Features**:
- AlertsTable (MUI X DataGrid with alerts)
- AlertDetails (detailed alert panel)
- AlertMap (Leaflet map with markers)
- AlertFilters (search and filter controls)

**Map Components**:
- MapContainer (Leaflet wrapper)
- MarkerCluster (clustered markers)
- LocationPopup (marker popup content)

**Services**:
- useAlerts (fetch alerts with filters)

**Animations**:
- Page entry animation
- Table row animations
- Alert detail slide-in
- Map marker drop animations
- Marker pulse for critical alerts

### Dependencies
- **External**: Leaflet, react-leaflet
- **Internal**: Core Infrastructure (Layout, Card, Badge, DataGrid, API client, store)

### Outputs
- Functional alerts page
- Interactive map with geolocation
- Alert filtering and search
- Detailed alert information

---

## Unit 5: High-Risk Users Page

**Priority**: 5 (Build After Core Features)
**Type**: Feature Page
**Development Approach**: Complete user risk profiling

### Responsibilities
- List high-risk users
- Display user risk profiles
- Show authentication history
- Visualize risk score trends

### Components
**Page**:
- HighRiskUsersPage (main page component)

**Features**:
- UserRiskList (list of high-risk users)
- UserProfile (user risk information)
- AuthenticationHistory (authentication events table)
- RiskScoreGauge (animated gauge chart)

**Charts** (if not in Core):
- GaugeChart (custom gauge with anime.js)

**Services**:
- useHighRiskUsers (fetch high-risk users)
- useUserRisk (fetch specific user risk data)

**Animations**:
- Page entry animation
- User list animations
- Profile reveal animation
- Gauge needle animation
- Risk score counter animation

### Dependencies
- **External**: None (uses Core dependencies)
- **Internal**: Core Infrastructure (Layout, Card, Badge, DataGrid, API client, store)

### Outputs
- Functional high-risk users page
- User risk profiles
- Authentication history
- Animated risk gauge

---

## Unit 6: Attack Analysis Page

**Priority**: 6 (Build After Core Features)
**Type**: Feature Page
**Development Approach**: Complete kill chain visualization

### Responsibilities
- Visualize kill chain phases
- Display attack timeline
- Show attacker profiles
- List suspicious indicators

### Components
**Page**:
- AttackAnalysisPage (main page component)

**Features**:
- KillChainVisualization (kill chain phase diagram)
- AttackTimeline (chronological attack events)
- AttackerProfile (attacker information)
- SuspiciousIndicators (indicator list)

**Services**:
- useAttackReport (fetch kill chain analysis)

**Animations**:
- Page entry animation
- Kill chain phase animations
- Timeline reveal animation
- Event highlight animations
- Indicator list animations

### Dependencies
- **External**: None (uses Core dependencies)
- **Internal**: Core Infrastructure (Layout, Card, Badge, API client, store)

### Outputs
- Functional attack analysis page
- Kill chain visualization
- Attack timeline
- Attacker profiles

---

## Development Sequence

### Phase 1: Foundation (Unit 1)
**Duration**: ~1 session
**Goal**: Working app shell with navigation and shared components

**Deliverables**:
- App structure with routing
- Layout and navigation
- Basic shared components
- API client configured
- State management setup
- Theme applied

### Phase 2: Core Features (Units 2-3)
**Duration**: ~2 sessions
**Goal**: Dashboard and scan management working end-to-end

**Deliverables**:
- Dashboard with metrics and charts
- Scan triggering and monitoring
- Real-time polling working
- Data flow proven

### Phase 3: Extended Features (Units 4-6)
**Duration**: ~2-3 sessions
**Goal**: Complete all remaining pages

**Deliverables**:
- Alerts page with map
- High-risk users page
- Attack analysis page
- All features integrated

---

## Unit Sizing

| Unit | Components | Complexity | Estimated Effort |
|------|-----------|------------|------------------|
| Unit 1: Core Infrastructure | 15+ | Medium | 1 session |
| Unit 2: Dashboard | 5 | Low-Medium | 0.5 session |
| Unit 3: Scan Management | 5 | Medium | 0.5-1 session |
| Unit 4: Alerts | 7 | Medium-High | 1 session |
| Unit 5: High-Risk Users | 5 | Low-Medium | 0.5 session |
| Unit 6: Attack Analysis | 5 | Medium | 0.5-1 session |

**Total Estimated Effort**: 4-6 development sessions

---

## Success Criteria

### Unit 1 Complete When:
- ✅ App renders with navigation
- ✅ Routing works between pages
- ✅ API client can make requests
- ✅ Theme is applied
- ✅ Basic components render

### Unit 2 Complete When:
- ✅ Dashboard displays metrics
- ✅ Charts render with data
- ✅ Auto-refresh works
- ✅ Animations smooth

### Unit 3 Complete When:
- ✅ Can trigger scans
- ✅ Job status updates in real-time
- ✅ Job list displays
- ✅ Job details show report

### Unit 4 Complete When:
- ✅ Alerts table displays
- ✅ Map shows IP locations
- ✅ Filtering works
- ✅ Alert details show

### Unit 5 Complete When:
- ✅ User list displays
- ✅ User profiles show
- ✅ Risk gauge animates
- ✅ Auth history displays

### Unit 6 Complete When:
- ✅ Kill chain visualizes
- ✅ Timeline displays
- ✅ Attacker profiles show
- ✅ Indicators list

---
