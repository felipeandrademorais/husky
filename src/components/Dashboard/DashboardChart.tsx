import { useQuery } from "@tanstack/react-query";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Box, Typography, CircularProgress } from "@mui/material";

interface ChartData {
    date: string;
    value: number;
}

async function fetchChartData(): Promise<ChartData[]> {
    const response = await fetch("/api/dashboard/chart-data");
    return response.json();
}

export function DashboardChart() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["chartData"],
        queryFn: fetchChartData,
    });

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <Typography color="error">Error loading chart data</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
                Performance Overview
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
