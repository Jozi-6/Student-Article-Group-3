import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Box,
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    IconButton,
    Tooltip,
    LinearProgress,
    Fab,
    Menu,
    MenuItem,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Paper,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
    Visibility,
    MoreVert,
    Search,
    FilterList,
    Article,
    Schedule,
    Send,
    History
} from '@mui/icons-material';
import { router } from '@inertiajs/react';

export default function WriterDashboard() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        // Simulate fetching articles from API
        const mockArticles = [
            {
                id: 1,
                title: 'Getting Started with Laravel',
                content: 'A comprehensive guide to setting up your first Laravel application...',
                status: 'draft',
                created_at: '2024-01-15',
                updated_at: '2024-01-15'
            },
            {
                id: 2,
                title: 'Understanding React Hooks',
                content: 'Deep dive into useState, useEffect, and custom hooks...',
                status: 'submitted',
                created_at: '2024-01-10',
                updated_at: '2024-01-12'
            },
            {
                id: 3,
                title: 'Advanced CSS Techniques',
                content: 'Modern CSS layouts, animations, and responsive design...',
                status: 'needs_revision',
                created_at: '2024-01-08',
                updated_at: '2024-01-14'
            },
            {
                id: 4,
                title: 'JavaScript Best Practices',
                content: 'Clean code, performance optimization, and debugging tips...',
                status: 'published',
                created_at: '2024-01-05',
                updated_at: '2024-01-16'
            }
        ];
        setArticles(mockArticles);
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = (article) => {
        setSelectedArticle(article);
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const confirmDelete = () => {
        // Simulate delete API call
        console.log('Deleting article:', selectedArticle?.id);
        setDeleteDialogOpen(false);
        setSelectedArticle(null);
        // In real app, you would make an API call here
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'default';
            case 'submitted': return 'warning';
            case 'needs_revision': return 'error';
            case 'published': return 'success';
            default: return 'default';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'draft': return 'Draft';
            case 'submitted': return 'Submitted';
            case 'needs_revision': return 'Needs Revision';
            case 'published': return 'Published';
            default: return status;
        }
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               article.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || article.status === filter;
        return matchesSearch && matchesFilter;
    });

    const menuItems = [
        { label: 'Edit', icon: <Edit />, action: 'edit' },
        { label: 'Submit', icon: <Send />, action: 'submit' },
        { label: 'Delete', icon: <Delete />, action: 'delete' },
        { label: 'View Revisions', icon: <History />, action: 'revisions' },
    ];

    return (
        <>
            <Head title="Writer Dashboard" />
            
            <Container maxWidth="xl">
                <Box sx={{ py: 4 }}>
                    {/* Header */}
                    <Paper sx={{ p: 3, mb: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h4" component="h1">
                                My Articles
                            </Typography>
                            
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <TextField
                                    placeholder="Search articles..."
                                    size="small"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <Search />
                                        ),
                                    }}
                                    sx={{ width: 250 }}
                                />
                                
                                <TextField
                                    select
                                    size="small"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    sx={{ minWidth: 120 }}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="draft">Draft</MenuItem>
                                    <MenuItem value="submitted">Submitted</MenuItem>
                                    <MenuItem value="needs_revision">Needs Revision</MenuItem>
                                    <MenuItem value="published">Published</MenuItem>
                                </TextField>

                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={() => router.get('/writer/articles/create')}
                                >
                                    Create Article
                                </Button>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                            <Article />
                                        </Avatar>
                                        <Typography variant="h4">
                                            {articles.filter(a => a.status === 'draft').length}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Draft Articles
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                                            <Schedule />
                                        </Avatar>
                                        <Typography variant="h4">
                                            {articles.filter(a => a.status === 'submitted').length}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Submitted
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                                            <FilterList />
                                        </Avatar>
                                        <Typography variant="h4">
                                            {articles.filter(a => a.status === 'needs_revision').length}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Needs Revision
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                                            <Visibility />
                                        </Avatar>
                                        <Typography variant="h4">
                                            {articles.filter(a => a.status === 'published').length}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Published
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Articles List */}
                    <Grid container spacing={3}>
                        {filteredArticles.map((article) => (
                            <Grid item xs={12} md={6} lg={4} key={article.id}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Box>
                                                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                                                    {article.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    Created: {new Date(article.created_at).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                            
                                            <IconButton
                                                size="small"
                                                onClick={handleMenuOpen}
                                            >
                                                <MoreVert />
                                            </IconButton>
                                        </Box>
                                        
                                        <Chip
                                            label={getStatusLabel(article.status)}
                                            color={getStatusColor(article.status)}
                                            size="small"
                                        />
                                    
                                    <Typography variant="body2" color="text.secondary" sx={{ 
                                        mb: 2, 
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        lineHeight: 1.4
                                    }}>
                                        {article.content}
                                    </Typography>
                                    </CardContent>
                                    
                                    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider.main' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Last updated: {new Date(article.updated_at).toLocaleDateString()}
                                            </Typography>
                                            
                                            <Button
                                                size="small"
                                                startIcon={<Edit />}
                                                onClick={() => router.get(`/writer/articles/${article.id}/edit`)}
                                            >
                                                Edit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Floating Action Button */}
                    <Fab
                        color="primary"
                        aria-label="create"
                        sx={{
                            position: 'fixed',
                            bottom: 24,
                            right: 24,
                        }}
                        onClick={() => router.get('/writer/articles/create')}
                    >
                        <Add />
                    </Fab>
                </Box>
            </Container>

            {/* Article Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        overflow: 'visible',
                        mt: '45px',
                    }
                }}
                >
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.action}
                        onClick={() => {
                            if (item.action === 'delete') {
                                handleDeleteClick(articles.find(a => a.id === selectedArticle?.id));
                            } else {
                                router.get(`/writer/articles/${selectedArticle?.id}/${item.action}`);
                            }
                            handleMenuClose();
                        }}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Delete Article
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete "{selectedArticle?.title}"? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={confirmDelete} 
                        color="error" 
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
