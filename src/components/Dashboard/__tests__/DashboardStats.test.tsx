import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardStats } from "../DashboardStats";

describe("DashboardStats", () => {
    const mockStats = {
        totalUsers: 1000,
        activeUsers: 750,
        revenue: 50000,
        growth: 15,
    };

    it("renders all stat items with correct values", () => {
        render(<DashboardStats stats={mockStats} />);

        // Check if the title is rendered
        expect(screen.getByText("Statistics")).toBeInTheDocument();

        // Check if all stat items are rendered with correct values
        expect(screen.getByText("1000")).toBeInTheDocument();
        expect(screen.getByText("750")).toBeInTheDocument();
        expect(screen.getByText("15%")).toBeInTheDocument();

        // Check if all stat titles are rendered
        expect(screen.getByText("Total Users")).toBeInTheDocument();
        expect(screen.getByText("Active Users")).toBeInTheDocument();
        expect(screen.getByText("Revenue")).toBeInTheDocument();
        expect(screen.getByText("Growth")).toBeInTheDocument();
    });
});
