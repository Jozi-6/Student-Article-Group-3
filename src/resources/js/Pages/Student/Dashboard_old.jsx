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
    Avatar,
    TextField,
    InputAdornment,
    Grid,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    Rating
} from '@mui/material';
import {
    Search,
    Comment,
    Visibility,
    Share,
    Bookmark,
    BookmarkBorder,
    Person,
    Schedule,
    ThumbUp
} from '@mui/icons-material';

export default function StudentDashboard() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

    // Simulate fetching published articles from API
    useEffect(() => {
        const mockArticles = [
            {
                id: 1,
                title: 'Understanding React Hooks',
                content: 'A comprehensive guide to useState, useEffect, and custom hooks. React Hooks revolutionized the way we write React components...',
                writer: { id: 1, name: 'John Doe' },
                published_at: '2024-01-15',
                views: 1250,
                likes: 89,
                comments: 12,
                category: 'React',
                read_time: '8 min'
            },
            {
                id: 2,
                title: 'Advanced CSS Techniques',
                content: 'Modern CSS layouts, animations, and responsive design. Learn about Grid, Flexbox, and the latest CSS features...',
                writer: { id: 2, name: 'Jane Smith' },
                published_at: '2024-01-12',
                views: 980,
                likes: 67,
                comments: 8,
                category: 'CSS',
                read_time: '12 min'
            },
            {
                id: 3,
                title: 'JavaScript Best Practices',
                content: 'Clean code, performance optimization, and debugging tips. Master JavaScript with industry-standard practices...',
                writer: { id: 3, name: 'Bob Johnson' },
                published_at: '2024-01-10',
                views: 2100,
                likes: 156,
                comments: 23,
                category: 'JavaScript',
                read_time: '15 min'
            },
            {
                id: 4,
                title: 'Laravel Performance Tips',
                content: 'Database optimization, caching strategies, and application tuning. Make your Laravel applications lightning fast...',
                writer: { id: 4, name: 'Alice Brown' },
                published_at: '2024-01-08',
                views: 750,
                likes: 45,
                comments: 6,
                category: 'Laravel',
                read_time: '10 min'
            }
        ];
        setArticles(mockArticles);
    }, []);

    const handleBookmark = (articleId) => {
        setBookmarkedArticles(prev => 
            prev.includes(articleId) 
                ? prev.filter(id => id !== articleId)
                : [...prev, articleId]
        );
    };

    const handleComment = (article) => {
        setSelectedArticle(article);
        setCommentDialogOpen(true);
    };

    const submitComment = () => {
        // Simulate comment submission
        console.log('Submitting comment:', comment, 'for article:', selectedArticle?.id);
        setComment('');
        setCommentDialogOpen(false);
        setSelectedArticle(null);
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               article.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const getCategoryColor = (category) => {
        const colors = {
            'React': '#61DAFB',
            'CSS': '#1572B6',
            'JavaScript': '#F7DF1E',
            'Laravel': '#FF2D20',
            'default': '#757575'
        };
        return colors[category] || colors.default;
    };

    return (
        <>
            <Head title="Student Dashboard" />
            
            <Container maxWidth="xl">
                <Box sx={{ py: 4 }}>
                    {/* Header */}
                    <Paper sx={{ p: 3, mb: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Published Articles
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Discover and engage with high-quality articles from our writers
                        </Typography>
                    </Paper>

                    {/* Search Bar */}
                    <Paper sx={{ p: 3, mb: 4 }}>
                        <TextField
                            fullWidth
                            placeholder="Search articles by title, content, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />
                        
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {['React', 'CSS', 'JavaScript', 'Laravel'].map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setSearchTerm(category)}
                                    sx={{ cursor: 'pointer' }}
                                />
                            ))}
                        </Box>
                    </Paper>

                    {/* Articles Grid */}
                    <Grid container spacing={3}>
                        {filteredArticles.map((article) => (
                            <Grid item xs={12} sm={6} lg={4} key={article.id}>
                                <Card 
                                    sx={{ 
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4,
                                        }
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" component="h2" sx={{ mb: 1, lineHeight: 1.3 }}>
                                                    {article.title}
                                                </Typography>
                                                
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                    <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                                                        <Person fontSize="small" />
                                                    </Avatar>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {article.writer.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        •
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {new Date(article.published_at).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            
                                            <IconButton
                                                size="small"
                                                onClick={() => handleBookmark(article.id)}
                                                color={bookmarkedArticles.includes(article.id) ? 'primary' : 'default'}
                                            >
                                                {bookmarkedArticles.includes(article.id) ? <Bookmark /> : <BookmarkBorder />}
                                            </IconButton>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <Chip
                                                label={article.category}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getCategoryColor(article.category),
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}
                                            />
                                            <Chip
                                                label={`${article.read_time} read`}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>
                                        
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ 
                                                mb: 2,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {article.content}
                                        </Typography>
                                    </CardContent>
                                    
                                    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider.main' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <Visibility fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {article.views}
                                                    </Typography>
                                                </Box>
                                                
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <ThumbUp fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {article.likes}
                                                    </Typography>
                                                </Box>
                                                
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <Comment fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {article.comments}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            
                                            <IconButton size="small">
                                                <Share fontSize="small" />
                                            </IconButton>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={<Visibility />}
                                                onClick={() => router.get(`/student/articles/${article.id}`)}
                                                sx={{ flexGrow: 1 }}
                                            >
                                                Read Article
                                            </Button>
                                            
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<Comment />}
                                                onClick={() => handleComment(article)}
                                            >
                                                Comment
                                            </Button>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* No Results */}
                    {filteredArticles.length === 0 && (
                        <Paper sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                No articles found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Try adjusting your search terms or browse all articles
                            </Typography>
                        </Paper>
                    )}
                </Box>
            </Container>

            {/* Comment Dialog */}
            <Dialog
                open={commentDialogOpen}
                onClose={() => setCommentDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Comment on "{selectedArticle?.title}"
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment"
                        label="Your Comment"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts on this article..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCommentDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={submitComment} 
                        variant="contained"
                        disabled={!comment.trim()}
                    >
                        Post Comment
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
