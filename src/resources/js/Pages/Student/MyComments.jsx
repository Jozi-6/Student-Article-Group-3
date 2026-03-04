import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    Box,
    Container,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Avatar,
    CircularProgress,
    Chip,
    IconButton,
    Paper,
    Divider,
    Grid
} from '@mui/material';
import {
    ArrowBack,
    Comment as CommentIcon,
    Person,
    Visibility,
    ThumbUp,
    Share,
    Schedule
} from '@mui/icons-material';

export default function MyComments() {
    const [userComments, setUserComments] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load comments from localStorage and articles data
    useEffect(() => {
        try {
            setLoading(true);
            
            // Load articles data (same as in Dashboard)
            const storedArticles = localStorage.getItem('articles');
            const parsedArticles = storedArticles ? JSON.parse(storedArticles) : [];
            setArticles(parsedArticles);
            
            // Load all comments from localStorage
            const allComments = [];
            const storageKeys = Object.keys(localStorage);
            
            storageKeys.forEach(key => {
                if (key.startsWith('article_comments_')) {
                    const articleId = key.replace('article_comments_', '');
                    try {
                        const storedComments = localStorage.getItem(key);
                        const comments = storedComments ? JSON.parse(storedComments) : [];
                        
                        // Ensure comments is an array before filtering
                        if (Array.isArray(comments)) {
                            // Filter comments by current user and add article info
                            const userArticleComments = comments
                                .filter(comment => comment.author === 'You')
                                .map(comment => ({
                                    ...comment,
                                    articleId: articleId,
                                    article: parsedArticles.find(article => article.id === parseInt(articleId))
                                }));
                            
                            allComments.push(...userArticleComments);
                        }
                    } catch (parseError) {
                        console.error(`Error parsing comments for article ${articleId}:`, parseError);
                        // Skip this article's comments if parsing fails
                    }
                }
            });
            
            // Sort by timestamp (most recent first)
            allComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            setUserComments(allComments);
            setLoading(false);
        } catch (err) {
            console.error('Error loading comments:', err);
            setError('Failed to load comments. Please try again.');
            setLoading(false);
        }
    }, []);

    const handleViewArticle = (articleId) => {
        router.get(`/student/articles/${articleId}`);
    };

    const handleBackToDashboard = () => {
        router.get('/student/dashboard');
    };

    // Calculate engagement details
    const getEngagementDetails = (comment) => {
        const article = comment.article;
        if (!article) return null;
        
        return {
            views: article.views || 0,
            likes: article.likes || 0,
            shares: article.shares || 0,
            totalComments: article.comments_count || 0
        };
    };

    if (loading) {
        return (
            <>
                <Head title="My Comments" />
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '100vh',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <CircularProgress size={40} />
                    <Typography variant="body2" color="text.secondary">
                        Loading your comments...
                    </Typography>
                </Box>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Head title="My Comments - Error" />
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '100vh',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <Typography variant="h6" color="error">
                        ⚠️ Error Loading Comments
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {error}
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => window.location.reload()}
                        sx={{ mt: 2 }}
                    >
                        Retry
                    </Button>
                </Box>
            </>
        );
    }

    return (
        <>
            <Head title="My Comments" />
            
            <Box sx={{ 
                minHeight: '100vh', 
                backgroundColor: 'background.default',
                py: 3 
            }}>
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 4,
                        gap: 2 
                    }}>
                        <IconButton 
                            onClick={handleBackToDashboard}
                            sx={{ mr: 2 }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            💬 My Comments
                        </Typography>
                    </Box>

                    {/* Comments List */}
                    {userComments.length > 0 ? (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Found {userComments.length} comment(s) across all articles
                            </Typography>
                            {userComments.map((comment) => {
                                const engagement = getEngagementDetails(comment);
                                return (
                                    <Card key={comment.id} sx={{ mb: 3 }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                    <Person />
                                                </Avatar>
                                            }
                                            title={
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                        {comment.article?.title || 'Unknown Article'}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        by {comment.article?.writer?.name || 'Unknown Author'}
                                                    </Typography>
                                                </Box>
                                            }
                                            subheader={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                                    <Schedule sx={{ fontSize: 16 }} />
                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ 
                                                            fontWeight: 'medium',
                                                            color: 'primary.main',
                                                            backgroundColor: 'primary.50',
                                                            px: 1,
                                                            py: 0.5,
                                                            borderRadius: 1,
                                                            display: 'inline-block'
                                                        }}
                                                    >
                                                        {new Date(comment.timestamp).toLocaleDateString('en-US', {
                                                            month: 'numeric',
                                                            day: 'numeric', 
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                            hour12: false
                                                        }).replace(',', '')}
                                                    </Typography>
                                                    <Chip 
                                                        label="Your Comment" 
                                                        size="small" 
                                                        color="primary" 
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            }
                                            action={
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<Visibility />}
                                                    onClick={() => handleViewArticle(comment.articleId)}
                                                    sx={{ mr: 1 }}
                                                    disabled={!comment.article}
                                                >
                                                    View Article
                                                </Button>
                                            }
                                        />
                                        
                                        {/* Article Engagement Details */}
                                        {engagement && (
                                            <Box sx={{ px: 3, pb: 2 }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                                                    📊 Article Engagement Details
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6} sm={3}>
                                                        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'grey.50' }}>
                                                            <Visibility sx={{ fontSize: 20, color: 'primary.main', mb: 1 }} />
                                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                                {engagement.views.toLocaleString()}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Views
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'grey.50' }}>
                                                            <ThumbUp sx={{ fontSize: 20, color: 'success.main', mb: 1 }} />
                                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                                {engagement.likes.toLocaleString()}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Likes
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'grey.50' }}>
                                                            <Share sx={{ fontSize: 20, color: 'info.main', mb: 1 }} />
                                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                                {engagement.shares.toLocaleString()}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Shares
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'grey.50' }}>
                                                            <CommentIcon sx={{ fontSize: 20, color: 'warning.main', mb: 1 }} />
                                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                                {engagement.totalComments.toLocaleString()}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Comments
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        )}
                                        
                                        <CardContent sx={{ pt: 0 }}>
                                            {/* Article Preview */}
                                            {comment.article?.content && (
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                        📄 Article Preview
                                                    </Typography>
                                                    <Paper 
                                                        sx={{ 
                                                            p: 2, 
                                                            backgroundColor: 'grey.50',
                                                            borderLeft: '4px solid',
                                                            borderLeftColor: 'grey.400'
                                                        }}
                                                    >
                                                        <Typography variant="body2" color="text.secondary">
                                                            {comment.article.content.substring(0, 150)}...
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            )}
                                            
                                            {/* User's Comment */}
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                    💬 Your Comment
                                                </Typography>
                                                <Paper 
                                                    sx={{ 
                                                        p: 2, 
                                                        backgroundColor: 'primary.50',
                                                        borderLeft: '4px solid',
                                                        borderLeftColor: 'primary.main'
                                                    }}
                                                >
                                                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                        {comment.text}
                                                    </Typography>
                                                </Paper>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Box>
                    ) : (
                        <Card>
                            <CardContent sx={{ textAlign: 'center', py: 6 }}>
                                <CommentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                    No Comments Yet
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    You haven't commented on any published articles yet. Start engaging with the content!
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    onClick={() => router.get('/student/dashboard')}
                                    sx={{ mt: 2 }}
                                >
                                    Browse Articles
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Container>
            </Box>
        </>
    );
}