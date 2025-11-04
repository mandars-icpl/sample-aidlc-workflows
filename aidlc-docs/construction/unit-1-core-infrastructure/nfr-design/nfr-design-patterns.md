# NFR Design Patterns - Unit 1: Core Infrastructure

**Unit**: Core Infrastructure
**Phase**: CONSTRUCTION
**Created**: 2025-01-04T01:07:00Z

---

## Performance Patterns

### Pattern 1: Code Splitting & Lazy Loading
**Problem**: Large bundle size impacts initial load time
**Solution**: Split code by routes and lazy load components
**Implementation**:
```typescript
// Lazy load page components
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

### Pattern 2: Memoization
**Problem**: Expensive re-renders and computations
**Solution**: Use React.memo, useMemo, useCallback
**Implementation**:
```typescript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* render */}</div>;
});

// Memoize expensive computations
const filteredData = useMemo(() => {
  return data.filter(item => item.severity === 'CRITICAL');
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```

### Pattern 3: Virtual Scrolling
**Problem**: Large lists cause performance issues
**Solution**: Use MUI DataGrid virtualization
**Implementation**:
```typescript
<DataGrid
  rows={alerts}
  columns={columns}
  virtualization
  pageSize={50}
/>
```

---

## State Management Patterns

### Pattern 4: Server State Separation
**Problem**: Mixing UI and server state causes complexity
**Solution**: TanStack Query for server state, Zustand for UI state
**Implementation**:
```typescript
// Server state with TanStack Query
const { data: alerts } = useQuery('alerts', fetchAlerts);

// UI state with Zustand
const filters = useAppStore(state => state.alertFilters);
const setFilters = useAppStore(state => state.setAlertFilters);
```

### Pattern 5: Optimistic Updates
**Problem**: UI feels slow waiting for server responses
**Solution**: Update UI immediately, rollback on error
**Implementation**:
```typescript
const mutation = useMutation(triggerScan, {
  onMutate: async (newScan) => {
    // Optimistically update UI
    queryClient.setQueryData('jobs', (old) => [...old, newScan]);
  },
  onError: (err, newScan, context) => {
    // Rollback on error
    queryClient.setQueryData('jobs', context.previousJobs);
  }
});
```

### Pattern 6: Polling with Auto-Stop
**Problem**: Continuous polling wastes resources
**Solution**: Poll only when needed, stop when complete
**Implementation**:
```typescript
const { data } = useQuery(
  ['job', jobId],
  () => fetchJob(jobId),
  {
    enabled: !!jobId,
    refetchInterval: (data) => {
      return data?.status === 'processing' ? 2500 : false;
    }
  }
);
```

---

## Error Handling Patterns

### Pattern 7: Error Boundaries
**Problem**: Component errors crash entire app
**Solution**: Catch errors at component boundaries
**Implementation**:
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Pattern 8: Retry Logic
**Problem**: Transient network failures
**Solution**: Automatic retry with exponential backoff
**Implementation**:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});
```

### Pattern 9: Graceful Degradation
**Problem**: API failures block functionality
**Solution**: Show cached data, fallback UI
**Implementation**:
```typescript
const { data, error, isError } = useQuery('stats', fetchStats);

if (isError) {
  return <ErrorMessage error={error} cachedData={data} />;
}
```

---

## Animation Patterns

### Pattern 10: Centralized Animation Utilities
**Problem**: Inconsistent animations across app
**Solution**: Reusable animation functions
**Implementation**:
```typescript
// animations/pageTransitions.ts
export function animatePageEntry(element) {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 600,
    easing: 'easeOutQuad'
  });
}

// Usage
useEffect(() => {
  if (pageRef.current) {
    animatePageEntry(pageRef.current);
  }
}, []);
```

### Pattern 11: Animation Cleanup
**Problem**: Animations continue after component unmounts
**Solution**: Cleanup in useEffect return
**Implementation**:
```typescript
useEffect(() => {
  const animation = anime({
    targets: '.element',
    loop: true
  });
  
  return () => {
    animation.pause();
    animation.seek(0);
  };
}, []);
```

### Pattern 12: Reduced Motion Support
**Problem**: Animations cause motion sickness
**Solution**: Detect and respect user preference
**Implementation**:
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function animate(element) {
  if (prefersReducedMotion) {
    element.style.opacity = '1';
  } else {
    anime({ targets: element, opacity: [0, 1] });
  }
}
```

---

## Styling Patterns

### Pattern 13: Theme Provider
**Problem**: Inconsistent styling across components
**Solution**: Centralized theme with MUI + Tailwind
**Implementation**:
```typescript
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2196F3' },
    secondary: { main: '#00FF41' }
  }
});

<ThemeProvider theme={darkTheme}>
  <App />
</ThemeProvider>
```

### Pattern 14: Utility-First with Component Library
**Problem**: Choosing between Tailwind and MUI
**Solution**: Use both - Tailwind for layout, MUI for components
**Implementation**:
```typescript
<Card className="p-4 mb-4 flex items-center justify-between">
  <Typography variant="h6">Title</Typography>
  <Button variant="contained">Action</Button>
</Card>
```

---

## Security Patterns

### Pattern 15: Input Sanitization
**Problem**: XSS vulnerabilities
**Solution**: React's built-in escaping + validation
**Implementation**:
```typescript
// React automatically escapes
<div>{userInput}</div>

// For rich content, use DOMPurify
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(richContent) 
}} />
```

### Pattern 16: API Request Validation
**Problem**: Invalid requests to backend
**Solution**: Validate before sending
**Implementation**:
```typescript
function triggerScan(params: ScanParams) {
  if (params.hours < 1 || params.hours > 168) {
    throw new Error('Hours must be between 1 and 168');
  }
  return apiClient.post('/api/fetch-cloudtrail', params);
}
```

---

## Accessibility Patterns

### Pattern 17: Semantic HTML
**Problem**: Screen readers can't navigate
**Solution**: Use semantic elements
**Implementation**:
```typescript
<nav>
  <ul>
    <li><Link to="/">Dashboard</Link></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Page Title</h1>
  </article>
</main>
```

### Pattern 18: ARIA Labels
**Problem**: Interactive elements lack context
**Solution**: Add ARIA labels
**Implementation**:
```typescript
<button aria-label="Trigger CloudTrail scan">
  <ScanIcon />
</button>

<div role="alert" aria-live="polite">
  {alertMessage}
</div>
```

---

## Testing Patterns

### Pattern 19: Component Testing
**Problem**: Regressions in shared components
**Solution**: Unit tests for critical components
**Implementation**:
```typescript
import { render, screen } from '@testing-library/react';

test('Card renders children', () => {
  render(<Card>Test Content</Card>);
  expect(screen.getByText('Test Content')).toBeInTheDocument();
});
```

### Pattern 20: API Mocking
**Problem**: Tests depend on backend
**Solution**: Mock API responses
**Implementation**:
```typescript
import { rest } from 'msw';

const handlers = [
  rest.get('/api/stats', (req, res, ctx) => {
    return res(ctx.json({ total_authentications: 100 }));
  })
];
```

---

## Development Patterns

### Pattern 21: Environment Configuration
**Problem**: Different configs for dev/prod
**Solution**: Environment variables
**Implementation**:
```typescript
// .env.development
VITE_API_URL=http://localhost:8000

// .env.production
VITE_API_URL=https://api.production.com

// Usage
const apiUrl = import.meta.env.VITE_API_URL;
```

### Pattern 22: Path Aliases
**Problem**: Deep relative imports
**Solution**: Configure path aliases
**Implementation**:
```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': '/src',
    '@components': '/src/components',
    '@services': '/src/services'
  }
}

// Usage
import { Card } from '@components/shared';
```

---

## Pattern Application Summary

| Pattern | Category | Priority | Complexity |
|---------|----------|----------|------------|
| Code Splitting | Performance | High | Low |
| Memoization | Performance | High | Low |
| Virtual Scrolling | Performance | Medium | Low |
| Server State Separation | State | High | Low |
| Optimistic Updates | State | Medium | Medium |
| Polling with Auto-Stop | State | High | Low |
| Error Boundaries | Error Handling | High | Low |
| Retry Logic | Error Handling | High | Low |
| Graceful Degradation | Error Handling | Medium | Low |
| Centralized Animations | Animation | High | Low |
| Animation Cleanup | Animation | High | Low |
| Reduced Motion | Animation | Medium | Low |
| Theme Provider | Styling | High | Low |
| Utility-First + Components | Styling | High | Low |
| Input Sanitization | Security | High | Low |
| Request Validation | Security | High | Low |
| Semantic HTML | Accessibility | High | Low |
| ARIA Labels | Accessibility | Medium | Low |
| Component Testing | Testing | Medium | Medium |
| API Mocking | Testing | Medium | Medium |
| Environment Config | Development | High | Low |
| Path Aliases | Development | Medium | Low |

---
