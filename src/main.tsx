import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { useDashboardStore } from "./store/dashboardStore";
import { setupMockApi } from "./mocks/handlers";

// Initialize mock API
setupMockApi();

// Component to initialize dashboard data
function DashboardInitializer() {
    const { fetchStats } = useDashboardStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return null;
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
        <DashboardInitializer />
    </StrictMode>
);
