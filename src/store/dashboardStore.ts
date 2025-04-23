import { create } from "zustand";

interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    growth: number;
}

interface DashboardState {
    stats: DashboardStats;
    setStats: (stats: DashboardStats) => void;
    fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    stats: {
        totalUsers: 0,
        activeUsers: 0,
        revenue: 0,
        growth: 0,
    },
    setStats: (stats) => set({ stats }),
    fetchStats: async () => {
        try {
            const response = await fetch("/api/dashboard/stats");
            const data = await response.json();
            set({ stats: data });
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        }
    },
}));
