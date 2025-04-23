import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardTable } from "../DashboardTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("DashboardTable", () => {
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
                <DashboardTable />
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
                <DashboardTable />
            </QueryClientProvider>
        );

        // Check if error message is shown
        expect(
            await screen.findByText("Error loading table data")
        ).toBeInTheDocument();
    });

    it("renders table with data when loaded", async () => {
        // Mock fetch to return data
        const mockData = [
            {
                id: 1,
                name: "John Doe",
                status: "Completed",
                date: "2023-01-01",
                amount: 1000,
            },
            {
                id: 2,
                name: "Jane Smith",
                status: "Pending",
                date: "2023-01-02",
                amount: 2000,
            },
        ];
        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );

        render(
            <QueryClientProvider client={queryClient}>
                <DashboardTable />
            </QueryClientProvider>
        );

        // Check if table title is rendered
        expect(
            await screen.findByText("Recent Transactions")
        ).toBeInTheDocument();

        // Check if table headers are rendered
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Date")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();

        // Check if data rows are rendered
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
        expect(screen.getByText("Completed")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
    });
});
