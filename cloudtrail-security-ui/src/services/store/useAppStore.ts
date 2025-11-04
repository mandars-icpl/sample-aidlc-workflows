import { create } from 'zustand';
import { AppState } from '../../types/store.types';

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  selectedSeverity: [],
  selectedTimeRange: '24h',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSeverity: (severity) => set({ selectedSeverity: severity }),
  setTimeRange: (range) => set({ selectedTimeRange: range }),
}));
