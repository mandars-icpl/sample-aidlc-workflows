# Unit of Work Dependencies

**Project**: CloudTrail Security Monitoring UI
**Created**: 2025-01-04T00:56:00Z

---

## Dependency Matrix

| Unit | Depends On | Provides To | Blocking |
|------|-----------|-------------|----------|
| Unit 1: Core Infrastructure | External packages only | Units 2, 3, 4, 5, 6 | Yes - Must build first |
| Unit 2: Dashboard | Unit 1 | None | No |
| Unit 3: Scan Management | Unit 1 | None | No |
| Unit 4: Alerts | Unit 1 | None | No |
| Unit 5: High-Risk Users | Unit 1 | None | No |
| Unit 6: Attack Analysis | Unit 1 | None | No |

---

## Dependency Graph

```
External Packages
    ↓
Unit 1: Core Infrastructure
    ├→ Unit 2: Dashboard
    ├→ Unit 3: Scan Management
    ├→ Unit 4: Alerts
    ├→ Unit 5: High-Risk Users
    └→ Unit 6: Attack Analysis
```

---

## External Dependencies

### Unit 1: Core Infrastructure
**NPM Packages**:
- react (^18.0.0)
- react-dom (^18.0.0)
- react-router-dom (^6.0.0)
- @mui/material (^5.0.0)
- @mui/x-data-grid (^6.0.0)
- @emotion/react (^11.0.0)
- @emotion/styled (^11.0.0)
- tailwindcss (^3.0.0)
- zustand (^4.0.0)
- @tanstack/react-query (^4.0.0)
- axios (^1.0.0)
- animejs (^3.2.0)

### Unit 2: Dashboard
**Additional Packages**:
- recharts (^2.0.0)

### Unit 3: Scan Management
**Additional Packages**: None (uses Core dependencies)

### Unit 4: Alerts
**Additional Packages**:
- leaflet (^1.9.0)
- react-leaflet (^4.0.0)

### Unit 5: High-Risk Users
**Additional Packages**: None (uses Core dependencies)

### Unit 6: Attack Analysis
**Additional Packages**: None (uses Core dependencies)

---

## Internal Dependencies

### Shared Components (from Unit 1)

**Used by All Units**:
- Layout
- Navigation
- Header
- Card
- Button
- Badge
- LoadingSpinner
- ErrorBoundary

**Used by Specific Units**:
- Chip: Units 2, 4, 5, 6
- DataGrid (MUI X): Units 3, 4, 5
- LineChart: Unit 2
- PieChart: Unit 2
- GaugeChart: Unit 5

### Shared Services (from Unit 1)

**Used by All Units**:
- apiClient
- queryClient
- useAppStore

**Used by Specific Units**:
- Animation utilities: All units
- Color utilities: Units 2, 4, 5, 6
- Formatters: Units 2, 3, 4, 5, 6

---

## Development Order & Parallelization

### Sequential Development (Recommended)

**Phase 1: Foundation**
1. Unit 1: Core Infrastructure (MUST complete first)

**Phase 2: Core Features**
2. Unit 2: Dashboard (can start after Unit 1)
3. Unit 3: Scan Management (can start after Unit 1)

**Phase 3: Extended Features** (Can be parallel)
4. Unit 4: Alerts (can start after Unit 1)
5. Unit 5: High-Risk Users (can start after Unit 1)
6. Unit 6: Attack Analysis (can start after Unit 1)

### Parallel Development (If Multiple Developers)

**Sprint 1**:
- Developer 1: Unit 1 (Core Infrastructure)

**Sprint 2**:
- Developer 1: Unit 2 (Dashboard)
- Developer 2: Unit 3 (Scan Management)

**Sprint 3**:
- Developer 1: Unit 4 (Alerts)
- Developer 2: Unit 5 (High-Risk Users)
- Developer 3: Unit 6 (Attack Analysis)

---

## Dependency Details

### Unit 1 → Unit 2 (Dashboard)

**Provides**:
- Layout and Navigation
- Card, Badge, Chip components
- LineChart, PieChart components
- API client (fetchStats, fetchAlerts)
- useDashboardPolling hook
- Animation utilities (pageTransitions, cardAnimations, chartAnimations, counterAnimations)
- Color utilities (getSeverityColor)
- Formatters (formatTimestamp, formatNumber)

**Interface**:
```typescript
// Components
import { Layout, Card, Badge, Chip } from '@/components/shared';
import { LineChart, PieChart } from '@/components/charts';

// Services
import { fetchStats, fetchAlerts } from '@/services/api';
import { useDashboardPolling } from '@/services/polling';

// Utilities
import { animatePageEntry, animateCardGrid, animateChartReveal, animateCounter } from '@/animations';
import { getSeverityColor } from '@/utils/colors';
import { formatTimestamp, formatNumber } from '@/utils/formatters';
```

### Unit 1 → Unit 3 (Scan Management)

**Provides**:
- Layout and Navigation
- Card, Button, Badge, LoadingSpinner components
- DataGrid component (MUI X)
- API client (triggerScan, fetchJobs, fetchJobDetails)
- useJobPolling hook
- useTriggerScan mutation
- Animation utilities (pageTransitions, cardAnimations, buttonAnimations)
- Formatters (formatTimestamp)

**Interface**:
```typescript
// Components
import { Layout, Card, Button, Badge, LoadingSpinner } from '@/components/shared';
import { DataGrid } from '@mui/x-data-grid';

// Services
import { triggerScan, fetchJobs, fetchJobDetails } from '@/services/api';
import { useJobPolling } from '@/services/polling';
import { useTriggerScan } from '@/services/mutations';

// Utilities
import { animatePageEntry, animateButtonClick, animateButtonLoading } from '@/animations';
import { formatTimestamp } from '@/utils/formatters';
```

### Unit 1 → Unit 4 (Alerts)

**Provides**:
- Layout and Navigation
- Card, Badge, Chip components
- DataGrid component (MUI X)
- API client (fetchAlerts)
- useAppStore (alertFilters, selectedAlert)
- Animation utilities (pageTransitions, tableAnimations, modalAnimations, mapAnimations)
- Color utilities (getSeverityColor)
- Formatters (formatTimestamp, formatGeolocation)

**Interface**:
```typescript
// Components
import { Layout, Card, Badge, Chip } from '@/components/shared';
import { DataGrid } from '@mui/x-data-grid';

// Services
import { fetchAlerts } from '@/services/api';
import { useAppStore } from '@/services/store';

// Utilities
import { animatePageEntry, animateTableRows, animateModalOpen, animateMarkerDrop } from '@/animations';
import { getSeverityColor } from '@/utils/colors';
import { formatTimestamp, formatGeolocation } from '@/utils/formatters';
```

### Unit 1 → Unit 5 (High-Risk Users)

**Provides**:
- Layout and Navigation
- Card, Badge components
- DataGrid component (MUI X)
- GaugeChart component
- API client (fetchHighRiskUsers, fetchUserRisk)
- useAppStore (selectedUser)
- Animation utilities (pageTransitions, cardAnimations, gaugeAnimations, counterAnimations)
- Color utilities (getRiskColor)
- Formatters (formatTimestamp, formatGeolocation, formatRiskScore)

**Interface**:
```typescript
// Components
import { Layout, Card, Badge } from '@/components/shared';
import { DataGrid } from '@mui/x-data-grid';
import { GaugeChart } from '@/components/charts';

// Services
import { fetchHighRiskUsers, fetchUserRisk } from '@/services/api';
import { useAppStore } from '@/services/store';

// Utilities
import { animatePageEntry, animateCardGrid, animateGaugeNeedle, animateCounter } from '@/animations';
import { getRiskColor } from '@/utils/colors';
import { formatTimestamp, formatGeolocation, formatRiskScore } from '@/utils/formatters';
```

### Unit 1 → Unit 6 (Attack Analysis)

**Provides**:
- Layout and Navigation
- Card, Badge, Chip components
- API client (fetchAttackReport)
- Animation utilities (pageTransitions, killChainAnimations, timelineAnimations)
- Color utilities (getRiskColor, getSeverityColor)
- Formatters (formatTimestamp)

**Interface**:
```typescript
// Components
import { Layout, Card, Badge, Chip } from '@/components/shared';

// Services
import { fetchAttackReport } from '@/services/api';

// Utilities
import { animatePageEntry, animateKillChainPhases, animateTimelineReveal } from '@/animations';
import { getRiskColor, getSeverityColor } from '@/utils/colors';
import { formatTimestamp } from '@/utils/formatters';
```

---

## Shared State Dependencies

### Zustand Store (useAppStore)

**Used by**:
- Unit 4: Alerts (alertFilters, selectedAlert)
- Unit 5: High-Risk Users (selectedUser)
- Unit 3: Scan Management (activeJobId)

**Store Structure**:
```typescript
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

### TanStack Query Cache

**Shared Queries**:
- `stats`: Used by Unit 2 (Dashboard)
- `alerts`: Used by Units 2 (Dashboard), 4 (Alerts)
- `jobs`: Used by Unit 3 (Scan Management)
- `highRiskUsers`: Used by Unit 5 (High-Risk Users)
- `attackReport`: Used by Unit 6 (Attack Analysis)

---

## Integration Points

### Navigation Integration
All units integrate with Unit 1's Navigation component:
- Dashboard: `/`
- Scan Management: `/scan`
- Alerts: `/alerts`
- High-Risk Users: `/users`
- Attack Analysis: `/attacks`

### API Integration
All units use Unit 1's apiClient for backend communication:
- Base URL: `http://127.0.0.1:8000`
- Shared interceptors
- Consistent error handling

### Theme Integration
All units use Unit 1's theme configuration:
- MUI dark theme
- Custom color palette (blue, navy blue, neon green, purple/violet)
- Tailwind utility classes
- Consistent spacing and typography

---

## Risk Assessment

### Critical Path
**Unit 1 (Core Infrastructure)** is the critical path - all other units blocked until complete.

### Dependency Risks
- **Low Risk**: Units 2-6 have no inter-dependencies
- **Medium Risk**: Unit 1 changes could impact all units
- **Mitigation**: Stabilize Unit 1 interfaces before starting other units

### Integration Risks
- **Low Risk**: Clear interfaces between units
- **Medium Risk**: Shared state management (Zustand store)
- **Mitigation**: Define store structure upfront in Unit 1

---
