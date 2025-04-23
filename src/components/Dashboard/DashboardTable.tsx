import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
} from "@mui/material";

interface TableData {
    id: number;
    name: string;
    status: string;
    date: string;
    amount: number;
}

async function fetchTableData(): Promise<TableData[]> {
    const response = await fetch("/api/dashboard/table-data");
    return response.json();
}

export function DashboardTable() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["tableData"],
        queryFn: fetchTableData,
    });

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={3}
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
                p={3}
            >
                <Typography color="error">Error loading table data</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Recent Transactions
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell align="right">
                                    ${row.amount.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
