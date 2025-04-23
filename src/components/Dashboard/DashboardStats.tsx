import { Box, Typography, Grid } from "@mui/material";
import { People, TrendingUp, AttachMoney, Group } from "@mui/icons-material";

interface DashboardStatsProps {
    stats: {
        totalUsers: number;
        activeUsers: number;
        revenue: number;
        growth: number;
    };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    const statItems = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <People sx={{ fontSize: 40, color: "primary.main" }} />,
        },
        {
            title: "Active Users",
            value: stats.activeUsers,
            icon: <Group sx={{ fontSize: 40, color: "success.main" }} />,
        },
        {
            title: "Revenue",
            value: `$${stats.revenue.toLocaleString()}`,
            icon: <AttachMoney sx={{ fontSize: 40, color: "warning.main" }} />,
        },
        {
            title: "Growth",
            value: `${stats.growth}%`,
            icon: <TrendingUp sx={{ fontSize: 40, color: "info.main" }} />,
        },
    ];

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Statistics
            </Typography>
            <Grid container spacing={2}>
                {statItems.map((item) => (
                    <Grid item xs={6} key={item.title}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                p: 1,
                            }}
                        >
                            {item.icon}
                            <Typography variant="h6" component="div">
                                {item.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.title}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
