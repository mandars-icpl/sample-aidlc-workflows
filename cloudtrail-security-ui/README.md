# CloudTrail Security Monitor UI

A React-based security monitoring dashboard for AWS CloudTrail logs with risk analysis and threat detection.

## Features

- Real-time CloudTrail log analysis
- Security risk scoring and alerts
- Impossible travel detection
- Kill chain attack analysis
- Interactive dashboards and visualizations
- Geolocation mapping of authentication events

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Material-UI (MUI)** for UI components
- **Tailwind CSS** for utility styling
- **TanStack Query** for server state management
- **Zustand** for client state management
- **Recharts** for data visualization
- **Leaflet** for geolocation mapping
- **anime.js** for animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── animations/       # anime.js animation utilities
├── components/       # React components
│   ├── layout/      # Layout components (Header, Navigation)
│   └── shared/      # Shared UI components
├── pages/           # Page components
├── routes/          # React Router configuration
├── services/        # API clients and state management
│   ├── api/        # API service layer
│   └── store/      # Zustand stores
├── theme/          # MUI theme configuration
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests

## Environment Variables

Create `.env.development` and `.env.production` files:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_POLLING_INTERVAL=5000
```

## Development Guidelines

- Follow TypeScript strict mode
- Use functional components with hooks
- Implement animations with anime.js
- Use MUI components with Tailwind utilities
- Maintain consistent code formatting with Prettier
- Write tests for critical functionality

## License

MIT
