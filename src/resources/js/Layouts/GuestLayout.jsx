import { Link } from '@inertiajs/react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button
} from '@mui/material';
import { AutoStories } from '@mui/icons-material';

export default function GuestLayout({ children }) {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
            {/* Enhanced Navigation Bar matching welcome page */}
            <AppBar position="static" sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AutoStories sx={{ fontSize: 32, color: 'white' }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                            📰 Article Publication Platform
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            component={Link}
                            href="/"
                            variant="outlined"
                            sx={{ color: 'white', borderColor: 'white' }}
                        >
                            Home
                        </Button>
                        <Button
                            component={Link}
                            href="/login"
                            variant="contained"
                            sx={{
                                backgroundColor: 'white',
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'grey.100',
                                }
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main content area */}
            <Box
                sx={{
                    minHeight: 'calc(100vh - 64px)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        opacity: 0.3
                    }
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 1, p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
