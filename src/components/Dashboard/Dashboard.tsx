import { Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardStats } from "./DashboardStats";
import { DashboardChart } from "./DashboardChart";
import { DashboardTable } from "./DashboardTable";
import { useDashboardStore } from "@/store/dashboardStore";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export function Dashboard() {
    const { stats } = useDashboardStore();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Dashboard
                    </Typography>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                        }}
                    >
                        <DashboardChart />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                        }}
                    >
                        <DashboardStats stats={stats} />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <DashboardTable />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
