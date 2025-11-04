export const queryKeys = {
  jobs: {
    all: ['jobs'] as const,
    detail: (id: string) => ['jobs', id] as const,
  },
  alerts: {
    all: ['alerts'] as const,
  },
  users: {
    all: ['users'] as const,
    highRisk: ['users', 'high-risk'] as const,
  },
  stats: {
    all: ['stats'] as const,
  },
};
