import {Box, Container, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Copyright} from "@mui/icons-material";
import ResponsiveAppBar from "./components/ResponsiveAppBar.tsx";

const defaultTheme = createTheme();

export default function Layout() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{
                bgcolor: '#cfe8fc',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }} >
                <ResponsiveAppBar />
                <Toolbar />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Outlet/>
                    </Container>
                </Box>
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="body1">
                            My sticky footer can be found here.
                        </Typography>
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}