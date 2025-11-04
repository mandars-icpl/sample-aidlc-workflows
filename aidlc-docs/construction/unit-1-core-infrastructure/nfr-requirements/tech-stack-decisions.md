# Tech Stack Decisions - Unit 1: Core Infrastructure

**Unit**: Core Infrastructure
**Phase**: CONSTRUCTION
**Created**: 2025-01-04T01:03:00Z

---

## Core Framework & Build Tool

### React 18.x
**Decision**: Use React 18 with functional components and hooks
**Rationale**:
- Modern React features (Suspense, Concurrent rendering)
- Excellent ecosystem and community support
- Perfect for SPA architecture
- Strong TypeScript support

### Vite
**Decision**: Use Vite as build tool and dev server
**Rationale**:
- Lightning-fast HMR
- Optimized production builds
- Native ESM support
- Better DX than Create React App
- Excellent TypeScript support

---

## Language

### TypeScript 5.x
**Decision**: Full TypeScript with strict mode
**Rationale**:
- Type safety prevents runtime errors
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring
- Industry standard for React projects

---

## Routing

### React Router v6
**Decision**: Use React Router for client-side routing
**Rationale**:
- Most popular React routing library
- Nested routes support
- Code splitting integration
- Type-safe with TypeScript
- Excellent documentation

---

## State Management

### Zustand 4.x
**Decision**: Use Zustand for UI/global state
**Rationale**:
- Lightweight (< 1KB)
- Simple API, minimal boilerplate
- No Provider hell
- TypeScript-first
- Perfect for UI state (filters, selections, sidebar)

### TanStack Query v4
**Decision**: Use TanStack Query for server state
**Rationale**:
- Automatic caching and background refetching
- Built-in polling support
- Optimistic updates
- Request deduplication
- Perfect for API data management

---

## HTTP Client

### Axios 1.x
**Decision**: Use Axios for HTTP requests
**Rationale**:
- Interceptor support (request/response)
- Automatic JSON transformation
- Request/response cancellation
- Better error handling than fetch
- Wide adoption and support

---

## UI Component Library

### Material-UI (MUI) v5
**Decision**: Use MUI as primary component library
**Rationale**:
- Comprehensive component set
- Excellent dark theme support
- MUI X DataGrid for tables
- Strong TypeScript support
- Customizable theming
- Accessibility built-in

### MUI X Data Grid
**Decision**: Use MUI X DataGrid for tables
**Rationale**:
- Enterprise-grade table features
- Sorting, filtering, pagination built-in
- Virtualization for performance
- Customizable columns
- Perfect for alerts, jobs, users tables

---

## CSS Framework

### Tailwind CSS v3
**Decision**: Use Tailwind for utility-first styling
**Rationale**:
- Rapid development with utility classes
- Consistent spacing/sizing
- Responsive design utilities
- Tree-shaking removes unused styles
- Works alongside MUI
- Small production bundle

---

## Animation Library

### anime.js v3.2
**Decision**: Use anime.js for all animations
**Rationale**:
- Per project requirements
- Comprehensive animation capabilities
- Timeline support
- Stagger animations
- SVG animation support
- Lightweight and performant

---

## Data Visualization

### Recharts v2
**Decision**: Use Recharts for charts and graphs
**Rationale**:
- React-native, composable API
- Good defaults, easy to customize
- Responsive charts
- Animation support
- TypeScript support
- Perfect for dashboard charts

---

## Mapping

### Leaflet v1.9 + react-leaflet v4
**Decision**: Use Leaflet for interactive maps
**Rationale**:
- Open-source, no API key required
- Lightweight and performant
- Marker clustering support
- Easy to theme
- OSM/MapLibre tiles available
- Good React integration

---

## Development Tools

### ESLint + Prettier
**Decision**: Use ESLint for linting, Prettier for formatting
**Rationale**:
- Code quality enforcement
- Consistent code style
- Catch common errors
- Auto-formatting on save
- Industry standard

### Vitest
**Decision**: Use Vitest for unit testing
**Rationale**:
- Vite-native (fast)
- Jest-compatible API
- Built-in TypeScript support
- Component testing with React Testing Library
- Fast test execution

---

## Package Manager

### npm
**Decision**: Use npm as package manager
**Rationale**:
- Comes with Node.js
- Reliable and stable
- Good lockfile support
- Wide compatibility

---

## Complete Dependency List

### Production Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "@mui/material": "^5.15.0",
  "@mui/x-data-grid": "^6.18.0",
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0",
  "tailwindcss": "^3.4.0",
  "zustand": "^4.4.0",
  "@tanstack/react-query": "^4.36.0",
  "axios": "^1.6.0",
  "animejs": "^3.2.1",
  "recharts": "^2.10.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1"
}
```

### Development Dependencies
```json
{
  "typescript": "^5.3.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "@types/node": "^20.10.0",
  "@vitejs/plugin-react": "^4.2.0",
  "vite": "^5.0.0",
  "eslint": "^8.55.0",
  "eslint-plugin-react": "^7.33.0",
  "@typescript-eslint/eslint-plugin": "^6.15.0",
  "@typescript-eslint/parser": "^6.15.0",
  "prettier": "^3.1.0",
  "vitest": "^1.0.0",
  "@testing-library/react": "^14.1.0",
  "@testing-library/jest-dom": "^6.1.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

---

## Architecture Decisions

### Component Architecture
**Decision**: Atomic design with feature-based organization
**Structure**:
```
src/
├── components/
│   ├── shared/      # Reusable UI components
│   ├── layout/      # Layout components
│   └── charts/      # Chart components
├── pages/           # Page components
├── features/        # Feature-specific components
├── services/        # API, state, utilities
├── animations/      # anime.js utilities
├── utils/           # Helper functions
└── types/           # TypeScript types
```

### State Management Strategy
**Decision**: Separate UI state from server state
- **Zustand**: UI state (filters, selections, sidebar, activeJobId)
- **TanStack Query**: Server state (jobs, alerts, users, stats)
- **React State**: Local component state (forms, toggles)
- **URL State**: Route params and query strings

### Styling Strategy
**Decision**: Hybrid approach
- **Tailwind**: Layout, spacing, responsive utilities
- **MUI**: Component styling and theming
- **Custom Theme**: Color palette, typography, dark mode

### Animation Strategy
**Decision**: Centralized animation utilities
- **Page transitions**: Fade in/out, slide
- **Component animations**: Stagger, hover, loading
- **Data animations**: Charts, counters, gauges
- **Consistent timing**: Standardized durations and easing

---

## Performance Optimizations

### Code Splitting
- Lazy load page components
- Dynamic imports for heavy libraries (Leaflet, Recharts)
- Route-based splitting

### Bundle Optimization
- Tree shaking enabled
- Production builds minified
- Source maps for debugging
- Gzip compression

### Runtime Optimization
- React.memo for expensive components
- useMemo for expensive computations
- useCallback for stable function references
- Virtual scrolling for large lists (MUI DataGrid)

---

## Security Measures

### Input Sanitization
- React's built-in XSS protection
- DOMPurify for rich content (if needed)
- Input validation on forms

### API Security
- Axios interceptors for auth (future)
- HTTPS in production
- CORS configuration
- Request validation

### Dependency Security
- Regular npm audit
- Dependabot for updates
- Lock file committed

---

## Browser Support

**Target Browsers**:
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions

**Polyfills**: Minimal (modern browsers only)

---

## Development Workflow

### Local Development
1. `npm install` - Install dependencies
2. `npm run dev` - Start Vite dev server (http://localhost:5173)
3. `npm run lint` - Run ESLint
4. `npm run format` - Run Prettier
5. `npm run test` - Run Vitest

### Build Process
1. `npm run build` - Production build
2. `npm run preview` - Preview production build
3. Output: `dist/` directory

---

## Configuration Files

### vite.config.ts
- React plugin
- Path aliases
- Build optimization
- Dev server proxy (for API)

### tsconfig.json
- Strict mode enabled
- Path aliases
- JSX configuration
- Module resolution

### tailwind.config.js
- Custom color palette
- MUI integration
- Dark mode configuration
- Custom utilities

### .eslintrc.js
- React rules
- TypeScript rules
- Import rules
- Accessibility rules

---

## Decision Rationale Summary

All technology choices prioritize:
1. **Developer Experience**: Fast HMR, TypeScript, good tooling
2. **Performance**: Lightweight libraries, code splitting, caching
3. **Maintainability**: TypeScript, linting, testing, documentation
4. **User Experience**: Smooth animations, responsive design, accessibility
5. **Project Requirements**: anime.js, color palette, dark theme, real-time updates

---
