import { mockStats, mockChartData, mockTableData } from "./api";

// Intercept fetch calls and return mock data
export function setupMockApi() {
    const originalFetch = window.fetch;

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();

        // Mock API endpoints
        if (url.includes("/api/dashboard/stats")) {
            return new Response(JSON.stringify(mockStats), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (url.includes("/api/dashboard/chart-data")) {
            return new Response(JSON.stringify(mockChartData), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (url.includes("/api/dashboard/table-data")) {
            return new Response(JSON.stringify(mockTableData), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        // For any other URL, use the original fetch
        return originalFetch(input, init);
    };

    return () => {
        // Return a cleanup function to restore the original fetch
        window.fetch = originalFetch;
    };
}
