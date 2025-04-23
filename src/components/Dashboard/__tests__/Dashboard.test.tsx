import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dashboard } from "../Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the dashboard store
vi.mock("@/store/dashboardStore", () => ({
    useDashboardStore: () => ({
        stats: {
            totalUsers: 1000,
            activeUsers: 750,
            revenue: 50000,
            growth: 15,
        },
    }),
}));

// Mock the child components
vi.mock("../DashboardStats", () => ({
    DashboardStats: () => (
        <div data-testid="dashboard-stats">Dashboard Stats</div>
    ),
}));

vi.mock("../DashboardChart", () => ({
    DashboardChart: () => (
        <div data-testid="dashboard-chart">Dashboard Chart</div>
    ),
}));

vi.mock("../DashboardTable", () => ({
    DashboardTable: () => (
        <div data-testid="dashboard-table">Dashboard Table</div>
    ),
}));

describe("Dashboard", () => {
    const queryClient = new QueryClient();

    it("renders the dashboard with all components", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        );

        // Check if the dashboard title is rendered
        expect(screen.getByText("Dashboard")).toBeInTheDocument();

        // Check if all child components are rendered
        expect(screen.getByTestId("dashboard-stats")).toBeInTheDocument();
        expect(screen.getByTestId("dashboard-chart")).toBeInTheDocument();
        expect(screen.getByTestId("dashboard-table")).toBeInTheDocument();
    });
});
