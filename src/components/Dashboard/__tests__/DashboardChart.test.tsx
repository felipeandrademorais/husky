import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardChart } from "../DashboardChart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("DashboardChart", () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    beforeEach(() => {
        mockFetch.mockReset();
        queryClient.clear();
    });

    it("shows loading state initially", () => {
        // Mock fetch to never resolve
        mockFetch.mockImplementationOnce(() => new Promise(() => {}));

        render(
            <QueryClientProvider client={queryClient}>
                <DashboardChart />
            </QueryClientProvider>
        );

        // Check if loading indicator is shown
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("shows error state when fetch fails", async () => {
        // Mock fetch to reject
        mockFetch.mockImplementationOnce(() =>
            Promise.reject(new Error("Failed to fetch"))
        );

        render(
            <QueryClientProvider client={queryClient}>
                <DashboardChart />
            </QueryClientProvider>
        );

        // Check if error message is shown
        expect(
            await screen.findByText("Error loading chart data")
        ).toBeInTheDocument();
    });

    it("renders chart when data is loaded", async () => {
        // Mock fetch to return data
        const mockData = [
            { date: "2023-01-01", value: 100 },
            { date: "2023-01-02", value: 200 },
        ];
        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );

        render(
            <QueryClientProvider client={queryClient}>
                <DashboardChart />
            </QueryClientProvider>
        );

        // Check if chart title is rendered
        expect(
            await screen.findByText("Performance Overview")
        ).toBeInTheDocument();
    });
});
