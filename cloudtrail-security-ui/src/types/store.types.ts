export interface AppState {
  sidebarOpen: boolean;
  selectedSeverity: string[];
  selectedTimeRange: string;
  toggleSidebar: () => void;
  setSeverity: (severity: string[]) => void;
  setTimeRange: (range: string) => void;
}
