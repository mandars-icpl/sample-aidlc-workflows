# Component Architecture

**Project**: CloudTrail Security Monitoring UI
**Created**: 2025-01-04T00:36:00Z

---

## Technology Stack

### Core
- **Framework**: React 18+ (SPA)
- **State Management**: Zustand (UI state) + TanStack Query (server state)
- **Routing**: React Router v6
- **Animation**: anime.js

### UI & Styling
- **Component Library**: Material-UI (MUI) + MUI X DataGrid
- **CSS Framework**: Tailwind CSS
- **Theme**: Dark mode with custom color palette (blue, navy blue, neon/light green, purple/violet)

### Data Visualization
- **Charts**: Recharts
- **Maps**: Leaflet with react-leaflet (OSM/MapLibre tiles)

---

## Component Hierarchy

```
App
├── Layout
│   ├── Navigation
│   ├── Header
│   └── Main Content Area
│
├── Pages
│   ├── DashboardPage
│   ├── ScanManagementPage
│   ├── AlertsPage
│   ├── HighRiskUsersPage
│   └── AttackAnalysisPage
│
├── Features
│   ├── Dashboard
│   │   ├── MetricsOverview
│   │   ├── RecentAlerts
│   │   ├── RiskTrendChart
│   │   └── AlertDistributionChart
│   │
│   ├── ScanManagement
│   │   ├── ScanTriggerForm
│   │   ├── JobStatusCard
│   │   ├── JobList
│   │   └── JobDetails
│   │
│   ├── Alerts
│   │   ├── AlertsTable
│   │   ├── AlertDetails
│   │   ├── AlertMap
│   │   └── AlertFilters
│   │
│   ├── HighRiskUsers
│   │   ├── UserRiskList
│   │   ├── UserProfile
│   │   ├── AuthenticationHistory
│   │   └── RiskScoreGauge
│   │
│   └── AttackAnalysis
│       ├── KillChainVisualization
│       ├── AttackTimeline
│       ├── AttackerProfile
│       └── SuspiciousIndicators
│
├── Shared Components
│   ├── UI
│   │   ├── Card
│   │   ├── Button
│   │   ├── Badge
│   │   ├── Chip
│   │   ├── LoadingSpinner
│   │   └── ErrorBoundary
│   │
│   ├── Charts
│   │   ├── LineChart
│   │   ├── BarChart
│   │   ├── PieChart
│   │   └── GaugeChart
│   │
│   └── Map
│       ├── MapContainer
│       ├── MarkerCluster
│       └── LocationPopup
│
└── Services
    ├── api
    │   ├── apiClient
    │   ├── jobsApi
    │   ├── alertsApi
    │   ├── usersApi
    │   └── statsApi
    │
    ├── polling
    │   ├── useJobPolling
    │   └── useDashboardPolling
    │
    ├── animation
    │   ├── pageTransitions
    │   ├── cardAnimations
    │   └── chartAnimations
    │
    └── store
        ├── useAppStore (Zustand)
        └── queryClient (TanStack Query)
```

---

## Core Components

### 1. Layout Components

#### Layout
- **Purpose**: Main application layout wrapper
- **Responsibilities**:
  - Provide consistent page structure
  - Manage navigation and header
  - Handle responsive layout
  - Apply theme and global styles

#### Navigation
- **Purpose**: Main navigation menu
- **Responsibilities**:
  - Route navigation between pages
  - Highlight active page
  - Animated transitions
  - Responsive mobile menu

#### Header
- **Purpose**: Application header bar
- **Responsibilities**:
  - Display app title/logo
  - Show system status
  - Manual refresh button
  - Theme toggle (if needed)

---

### 2. Page Components

#### DashboardPage
- **Purpose**: Main overview dashboard
- **Responsibilities**:
  - Display key metrics and statistics
  - Show recent alerts summary
  - Render risk trend charts
  - Auto-refresh every 30 seconds
  - Animated page entry

#### ScanManagementPage
- **Purpose**: CloudTrail scan management
- **Responsibilities**:
  - Trigger new scans with parameters
  - Display active job status with real-time polling
  - List all jobs (past and present)
  - Show job details and results
  - Animated job status updates

#### AlertsPage
- **Purpose**: Comprehensive alert management
- **Responsibilities**:
  - Display alerts in sortable table
  - Show alert details with geolocation
  - Render interactive map with IP locations
  - Basic search functionality
  - Severity-based color coding

#### HighRiskUsersPage
- **Purpose**: User risk profiling
- **Responsibilities**:
  - List high-risk users
  - Display user risk profiles
  - Show authentication history
  - Render risk score trends
  - Geographic distribution visualization

#### AttackAnalysisPage
- **Purpose**: Kill chain attack analysis
- **Responsibilities**:
  - Visualize kill chain phases
  - Display attack timeline
  - Show attacker profiles
  - List suspicious indicators
  - Animated timeline rendering

---

### 3. Feature Components

#### Dashboard Features

**MetricsOverview**
- Display summary statistics (total authentications, suspicious authentications, anomalies)
- Animated counter updates
- Color-coded severity indicators

**RecentAlerts**
- Show latest 5-10 alerts
- Severity badges
- Click to navigate to full alert details

**RiskTrendChart**
- Line chart showing risk scores over time
- Animated chart rendering
- Interactive tooltips

**AlertDistributionChart**
- Pie/bar chart showing alerts by severity
- Animated transitions
- Click to filter alerts

#### Scan Management Features

**ScanTriggerForm**
- Form to configure scan parameters (hours, max_events)
- Validation and error handling
- Submit button with loading state
- Animated form submission

**JobStatusCard**
- Real-time job status display
- Progress indicator
- Events processed counter
- Alerts generated counter
- Animated status updates

**JobList**
- Table of all jobs
- Status indicators
- Click to view details
- Sortable columns

**JobDetails**
- Complete job information
- Full report display
- Export functionality
- Animated content reveal

#### Alerts Features

**AlertsTable**
- MUI X DataGrid with alerts
- Sortable columns (timestamp, severity, user_id, risk_score)
- Pagination
- Row selection
- Severity color coding

**AlertDetails**
- Detailed alert information
- Event details and reasoning
- Geolocation information
- Related alerts
- Animated panel slide-in

**AlertMap**
- Leaflet map with IP location markers
- Marker clustering
- Click marker for alert details
- Color-coded by severity
- Animated marker placement

**AlertFilters**
- Basic search input
- Severity filter chips
- Date range selector
- Clear filters button

#### High-Risk Users Features

**UserRiskList**
- List of high-risk users
- Average risk score display
- Sort by risk score
- Click to view profile

**UserProfile**
- User ID and risk information
- Recent authentication summary
- Risk score gauge
- Animated profile reveal

**AuthenticationHistory**
- Table of authentication events
- Timestamp, IP, location, risk score
- Sortable and filterable
- Geolocation links

**RiskScoreGauge**
- Circular gauge showing risk score
- Color-coded (green/yellow/red)
- Animated needle movement
- Threshold indicators

#### Attack Analysis Features

**KillChainVisualization**
- Visual representation of kill chain phases
- Highlight observed phases
- Phase descriptions
- Animated phase highlighting

**AttackTimeline**
- Chronological attack event timeline
- Event markers with risk scores
- Expandable event details
- Animated timeline rendering

**AttackerProfile**
- Attacker information (user_id, attack_type)
- Overall risk score
- Total malicious events
- Suspicious indicators list

**SuspiciousIndicators**
- List of suspicious behaviors
- Indicator descriptions
- Severity badges
- Animated list reveal

---

### 4. Shared Components

#### UI Components

**Card**
- Reusable card container
- Consistent styling
- Optional header/footer
- Animated entrance

**Button**
- Styled button with variants (primary, secondary, danger)
- Loading state
- Disabled state
- Hover animations

**Badge**
- Severity/status badges
- Color-coded
- Size variants
- Pulse animation for critical

**Chip**
- Filter chips
- Removable chips
- Color variants
- Animated removal

**LoadingSpinner**
- Consistent loading indicator
- Size variants
- Animated rotation
- Optional message

**ErrorBoundary**
- Catch and display errors
- Fallback UI
- Error reporting
- Retry functionality

#### Chart Components

**LineChart**
- Recharts line chart wrapper
- Consistent theming
- Animated rendering
- Responsive sizing

**BarChart**
- Recharts bar chart wrapper
- Consistent theming
- Animated rendering
- Responsive sizing

**PieChart**
- Recharts pie chart wrapper
- Consistent theming
- Animated rendering
- Interactive legend

**GaugeChart**
- Custom gauge visualization
- anime.js animations
- Color thresholds
- Responsive sizing

#### Map Components

**MapContainer**
- Leaflet map wrapper
- Consistent theming
- Zoom controls
- Responsive sizing

**MarkerCluster**
- Clustered markers for performance
- Color-coded clusters
- Animated cluster expansion
- Click to zoom

**LocationPopup**
- Marker popup content
- Location details
- Alert information
- Styled consistently

---

### 5. Services

#### API Services

**apiClient**
- Axios instance with base configuration
- Request/response interceptors
- Error handling
- Base URL configuration

**jobsApi**
- POST /api/fetch-cloudtrail
- GET /api/jobs/{job_id}
- GET /api/jobs

**alertsApi**
- GET /api/alerts
- Query parameters for filtering

**usersApi**
- GET /api/users/high-risk
- GET /api/users/{user_id}/risk

**statsApi**
- GET /api/stats
- GET /api/attack-report

#### Polling Services

**useJobPolling**
- Custom hook for job status polling
- Poll every 2-3 seconds during active scan
- Auto-stop when complete
- Error handling

**useDashboardPolling**
- Custom hook for dashboard data polling
- Poll every 30 seconds
- Pause when page not visible
- Error handling

#### Animation Services

**pageTransitions**
- anime.js page transition animations
- Fade in/out
- Slide transitions
- Consistent timing

**cardAnimations**
- Card entrance animations
- Staggered animations for lists
- Hover effects
- Loading animations

**chartAnimations**
- Chart rendering animations
- Data update animations
- Smooth transitions
- Coordinated timing

#### Store Services

**useAppStore (Zustand)**
- Global UI state (filters, selected items)
- Theme preferences
- Navigation state
- Lightweight and fast

**queryClient (TanStack Query)**
- Server state management
- Automatic caching
- Background refetching
- Optimistic updates

---

## Component Communication Patterns

### Data Flow
1. **API → TanStack Query → Components**: Server data fetched and cached
2. **Components → Zustand Store → Components**: UI state shared globally
3. **Parent → Child**: Props for configuration and callbacks
4. **Child → Parent**: Event callbacks for user actions

### State Management Strategy
- **Server State**: TanStack Query (jobs, alerts, users, stats)
- **UI State**: Zustand (filters, selections, preferences)
- **Local State**: React useState (form inputs, toggles)
- **URL State**: React Router (page navigation, route params)

### Polling Strategy
- **Active Job Polling**: useJobPolling hook, 2-3 second interval
- **Dashboard Polling**: useDashboardPolling hook, 30 second interval
- **Manual Refresh**: Invalidate queries on button click
- **Auto-stop**: Stop polling when data complete or user navigates away

---

## Animation Strategy

### Page Transitions
- Fade in on mount
- Slide transitions between pages
- Staggered content reveal
- Smooth exit animations

### Data Loading
- Skeleton screens during initial load
- Smooth content replacement
- Loading spinners for actions
- Progress indicators for long operations

### Interactive Elements
- Hover effects on buttons/cards
- Click feedback animations
- Smooth state transitions
- Attention-grabbing for critical alerts

### Chart Animations
- Animated chart rendering on mount
- Smooth data updates
- Coordinated multi-chart animations
- Interactive hover effects

---
