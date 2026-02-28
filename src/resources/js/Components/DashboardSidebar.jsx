import { Link } from '@inertiajs/react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    useMediaQuery,
    useTheme
} from '@mui/material';

export default function DashboardSidebar({ menuItems = [], open, onClose, title }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const drawerWidth = 280;

    const content = (
        <Box sx={{ pt: 2 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    px: 2,
                    mb: 2,
                    color: 'primary.main'
                }}
            >
                {title}
            </Typography>
            <Divider />
            <List sx={{ pt: 2 }}>
                {(menuItems || []).map((item, index) => {
                    // Validate item to prevent React error #31
                    if (!item || typeof item !== 'object') return null;
                    
                    return (
                        <ListItem
                            key={item.id || index}
                            component={Link}
                            href={item.href || '#'}
                            selected={item.active || false}
                            sx={{
                                px: 2,
                                py: 1.5,
                                mb: 1,
                                mx: 1,
                                borderRadius: 1,
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.light',
                                    color: 'primary.main',
                                    '& .MuiListItemIcon-root': {
                                        color: 'primary.main'
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'action.hover'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {item.icon && (
                                <ListItemIcon
                                    sx={{
                                        minWidth: 40,
                                        color: 'inherit'
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                            )}
                            <ListItemText
                                primary={item.label || 'Menu Item'}
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    fontWeight: 500
                                }}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    if (isMobile) {
        return (
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Box
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                backgroundColor: 'background.paper',
                borderRight: '1px solid',
                borderColor: 'divider',
                height: 'calc(100vh - 64px)',
                position: 'sticky',
                top: 64,
                overflowY: 'auto'
            }}
        >
            {content}
        </Box>
    );
}
