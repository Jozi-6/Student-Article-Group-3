import { Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    IconButton,
    Menu as MenuIcon,
    useMediaQuery,
    useTheme,
    Collapse,
    Chip,
    Tooltip
} from '@mui/material';
import {
    ExpandMore,
    ExpandLess,
    VisibilityOff,
    Article
} from '@mui/icons-material';

export default function DashboardSidebar({ 
    menuItems = [], 
    open, 
    onClose, 
    title, 
    collapsed, 
    onToggle,
    hiddenArticles = [],
    articles = [],
    onUnhideArticle
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [hiddenArticlesExpanded, setHiddenArticlesExpanded] = useState(false);

    const drawerWidth = collapsed ? 60 : 280;

    const content = (
        <Box sx={{ pt: 2 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, mb: 2 }}>
                {!collapsed && (
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main'
                        }}
                    >
                        {title}
                    </Typography>
                )}
            </Box>
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
                                px: collapsed ? 1 : 2,
                                py: 1.5,
                                mb: 1,
                                mx: 1,
                                borderRadius: 1,
                                justifyContent: collapsed ? 'center' : 'flex-start',
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
                                        minWidth: collapsed ? 0 : 40,
                                        color: 'inherit',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                            )}
                            {!collapsed && (
                                <ListItemText
                                    primary={item.label || 'Menu Item'}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                        fontWeight: 500
                                    }}
                                />
                            )}
                        </ListItem>
                    );
                })}
            </List>

            {/* Hidden Articles Section */}
            {!collapsed && hiddenArticles.length > 0 && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ px: 2, mb: 1 }}>
                        <ListItem
                            button
                            onClick={() => setHiddenArticlesExpanded(!hiddenArticlesExpanded)}
                            sx={{
                                px: 1,
                                py: 1,
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <VisibilityOff fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Hidden Articles"
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    fontWeight: 500
                                }}
                            />
                            <Chip 
                                label={hiddenArticles.length} 
                                size="small" 
                                color="secondary"
                                sx={{ ml: 1 }}
                            />
                            {hiddenArticlesExpanded ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                    </Box>
                    <Collapse in={hiddenArticlesExpanded} timeout="auto" unmountOnExit>
                        <List sx={{ px: 2, pb: 2 }}>
                            {hiddenArticles.map(articleId => {
                                const article = articles.find(a => a.id === articleId);
                                if (!article) return null;
                                
                                return (
                                    <ListItem
                                        key={articleId}
                                        sx={{
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            mb: 0.5,
                                            backgroundColor: 'grey.50',
                                            '&:hover': {
                                                backgroundColor: 'grey.100'
                                            }
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <Article fontSize="small" color="action" />
                                        </ListItemIcon>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Tooltip title={article.title} placement="top">
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 500,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        display: 'block'
                                                    }}
                                                >
                                                    {article.title}
                                                </Typography>
                                            </Tooltip>
                                            <Typography variant="caption" color="text.secondary">
                                                by {article.writer?.name || 'Unknown'}
                                            </Typography>
                                        </Box>
                                        {onUnhideArticle && (
                                            <Tooltip title="Unhide article">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onUnhideArticle(articleId)}
                                                    sx={{
                                                        p: 0.5,
                                                        '&:hover': {
                                                            backgroundColor: 'primary.light',
                                                            color: 'primary.main'
                                                        }
                                                    }}
                                                >
                                                    <VisibilityOff fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Collapse>
                </>
            )}
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
                height: '100vh',  // Full viewport height
                position: 'fixed',  // Fixed position to prevent scrolling with main content
                top: 0,           // Start from top of viewport
                left: 0,          // Ensure it's positioned from left edge
                overflowY: 'auto',  // Allow scrolling within sidebar if content overflows
                zIndex: theme.zIndex.drawer - 1,  // Ensure it's below header but above content
                transition: 'width 0.3s ease',  // Smooth transition when collapsing
            }}
        >
            {content}
        </Box>
    );
}
