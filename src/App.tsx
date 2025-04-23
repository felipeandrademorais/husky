import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Dashboard } from "./components/Dashboard/Dashboard";
import "./App.css";

// Create a client for React Query
const queryClient = new QueryClient();

// Create a theme instance
const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Dashboard />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
