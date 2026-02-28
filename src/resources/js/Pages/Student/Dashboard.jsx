import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import {
    Box,
    Container,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Chip,
    IconButton,
    TextField,
    Grid,
    Paper,
    Divider,
    AppBar,
    Toolbar,
    useMediaQuery,
    useTheme,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    TextareaAutosize
} from '@mui/material';
import {
    Search,
    ThumbUp,
    Comment as CommentIcon,
    Share,
    Menu as MenuIcon,
    Article,
    ChatBubble,
    Favorite,
    FavoriteBorder,
    MoreVert,
    Send
} from '@mui/icons-material';
import { router } from '@inertiajs/react';
import DashboardSidebar from '@/Components/DashboardSidebar';

export default function StudentDashboard() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    const [likedArticles, setLikedArticles] = useState([]);
    const [articleComments, setArticleComments] = useState({});
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const mockArticles = [
            {
                id: 1,
                title: 'The Future of Web Development',
                content: 'Exploring the latest trends and technologies in web development, from AI-assisted coding to WebAssembly applications...',
                writer: { id: 1, name: 'John Doe' },
                status: 'published',
                created_at: '2024-01-16',
                views: 234,
                likes: 45,
                comments_count: 12
            },
            {
                id: 2,
                title: 'Understanding Microservices Architecture',
                content: 'A deep dive into microservices architecture, including design patterns, benefits, and challenges...',
                writer: { id: 2, name: 'Jane Smith' },
                status: 'published',
                created_at: '2024-01-14',
                views: 189,
                likes: 38,
                comments_count: 8
            },
            {
                id: 3,
                title: 'Database Performance Optimization',
                content: 'Techniques and strategies for optimizing database performance, including indexing, query optimization, and caching...',
                writer: { id: 3, name: 'Bob Johnson' },
                status: 'published',
                created_at: '2024-01-12',
                views: 312,
                likes: 67,
                comments_count: 23
            },
            {
                id: 4,
                title: 'Cloud Computing Best Practices',
                content: 'Best practices for cloud computing, covering security, cost optimization, and deployment strategies...',
                writer: { id: 4, name: 'Alice Brown' },
                status: 'published',
                created_at: '2024-01-10',
                views: 456,
                likes: 89,
                comments_count: 31
            }
        ];
        setArticles(mockArticles);
        
        // Initialize comments
        const comments = {};
        mockArticles.forEach(article => {
            comments[article.id] = [
                { id: 1, author: 'Reader 1', text: 'Great article!', date: '2024-01-17' },
                { id: 2, author: 'Reader 2', text: 'Very helpful, thanks for sharing', date: '2024-01-16' }
            ];
        });
        setArticleComments(comments);
    }, []);

    const toggleLike = (articleId) => {
        if (likedArticles.includes(articleId)) {
            setLikedArticles(likedArticles.filter(id => id !== articleId));
        } else {
            setLikedArticles([...likedArticles, articleId]);
        }
    };

    const handleAddComment = (articleId) => {
        if (commentText.trim()) {
            const newComment = {
                id: (articleComments[articleId]?.length || 0) + 1,
                author: 'You',
                text: commentText,
                date: new Date().toLocaleDateString()
            };
            setArticleComments({
                ...articleComments,
                [articleId]: [...(articleComments[articleId] || []), newComment]
            });
            setCommentText('');
        }
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               article.writer.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const stats = {
        published: articles.length,
        totalViews: articles.reduce((sum, a) => sum + a.views, 0),
        totalComments: articles.reduce((sum, a) => sum + a.comments_count, 0)
    };

    const sidebarMenuItems = [
        {
            label: 'Published Articles',
            icon: <Article />,
            href: '#articles',
            active: filter === 'all'
        },
        {
            label: 'My Comments',
            icon: <ChatBubble />,
            href: '#comments',
            active: filter === 'comments'
        }
    ];

    return (
        <>
            <Head title="Student/Reader Dashboard" />
            
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                {/* Top App Bar */}
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            📚 Reader Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Sidebar */}
                <DashboardSidebar
                    menuItems={sidebarMenuItems}
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    title="Discovery"
                />

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        pt: 10,
                        backgroundColor: 'background.default',
                        overflow: 'auto'
                    }}
                >
                    <Container maxWidth="md">
                        {/* Stats Cards */}
                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid item xs={12} sm={4}>
                                <Card>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Article sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                            {stats.published}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Articles Available
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Search sx={{ fontSize: 32, color: 'secondary.main', mb: 1 }} />
                                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                            {stats.totalViews}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Views
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <ChatBubble sx={{ fontSize: 32, color: '#f57c00', mb: 1 }} />
                                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                            {stats.totalComments}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Community Comments
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Search */}
                        <Paper sx={{ p: 3, mb: 4 }}>
                            <TextField
                                placeholder="Search articles..."
                                fullWidth
                                size="small"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <Search sx={{ mr: 1, color: 'text.secondary' }} />
                                    ),
                                }}
                            />
                        </Paper>

                        {/* Articles Feed */}
                        <Grid container spacing={3}>
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((article) => (
                                    <Grid item xs={12} key={article.id}>
                                        <Card>
                                            {/* Article Header */}
                                            <CardHeader
                                                avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>
                                                    {article.writer.name.charAt(0)}
                                                </Avatar>}
                                                title={article.writer.name}
                                                subheader={new Date(article.created_at).toLocaleDateString()}
                                                action={
                                                    <IconButton>
                                                        <MoreVert />
                                                    </IconButton>
                                                }
                                            />

                                            {/* Article Content */}
                                            <CardContent>
                                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                                    {article.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                                    {article.content}
                                                </Typography>

                                                {/* Article Stats */}
                                                <Box sx={{ display: 'flex', gap: 2, mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        👁️ {article.views} views
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        💬 {articleComments[article.id]?.length || 0} comments
                                                    </Typography>
                                                </Box>

                                                {/* Action Buttons */}
                                                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                                                    <Button
                                                        size="small"
                                                        startIcon={likedArticles.includes(article.id) ? <Favorite /> : <FavoriteBorder />}
                                                        onClick={() => toggleLike(article.id)}
                                                        color={likedArticles.includes(article.id) ? 'error' : 'inherit'}
                                                    >
                                                        Like
                                                    </Button>
                                                    <Button size="small" startIcon={<CommentIcon />}>
                                                        {articleComments[article.id]?.length || 0} Comments
                                                    </Button>
                                                    <Button size="small" startIcon={<Share />}>
                                                        Share
                                                    </Button>
                                                </Box>

                                                {/* Comments Section */}
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
                                                        Comments ({articleComments[article.id]?.length || 0})
                                                    </Typography>

                                                    {/* Existing Comments */}
                                                    <List dense sx={{ mb: 2 }}>
                                                        {articleComments[article.id]?.map((comment) => (
                                                            <ListItem key={comment.id} disableGutters>
                                                                <Box sx={{ width: '100%' }}>
                                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                                            {comment.author}
                                                                        </Typography>
                                                                        <Typography variant="caption" color="text.secondary">
                                                                            {comment.date}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {comment.text}
                                                                    </Typography>
                                                                </Box>
                                                            </ListItem>
                                                        ))}
                                                    </List>

                                                    {/* Add Comment */}
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            placeholder="Add a comment..."
                                                            value={commentText}
                                                            onChange={(e) => setCommentText(e.target.value)}
                                                            multiline
                                                            rows={2}
                                                        />
                                                        <Button
                                                            variant="contained"
                                                            startIcon={<Send />}
                                                            onClick={() => handleAddComment(article.id)}
                                                            sx={{ alignSelf: 'flex-end' }}
                                                        >
                                                            Post
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                            <Typography color="text.secondary">
                                                No articles found
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    );
}
