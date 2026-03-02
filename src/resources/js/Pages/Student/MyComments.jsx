import { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
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
    Paper
} from '@mui/material';
import {
    ArrowBack,
    Comment as CommentIcon,
    Person,
    Visibility
} from '@mui/icons-material';

export default function MyComments() {
    const { props } = usePage();
    const comments = props.comments || [];
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Debug: Log the comments data
    console.log('My Comments Data:', comments);

    const handleViewArticle = (articleId) => {
        router.get(`/student/articles/${articleId}`);
    };

    const handleBackToDashboard = () => {
        router.get('/student/dashboard');
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
                    {comments.length > 0 ? (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Found {comments.length} comment(s)
                            </Typography>
                            {comments.map((comment) => (
                                <Card key={comment.id} sx={{ mb: 3 }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                <Person />
                                            </Avatar>
                                        }
                                        title={comment.article?.title || 'Unknown Article'}
                                        subheader={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {new Date(comment.created_at).toLocaleDateString()}
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
                                                onClick={() => handleViewArticle(comment.article?.id)}
                                                sx={{ mr: 1 }}
                                                disabled={!comment.article}
                                            >
                                                View Article
                                            </Button>
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {comment.article?.content ? 
                                                comment.article.content.substring(0, 150) + '...' : 
                                                'Article content preview...'
                                            }
                                        </Typography>
                                        
                                        <Paper 
                                            sx={{ 
                                                p: 2, 
                                                backgroundColor: 'grey.50',
                                                borderLeft: '4px solid',
                                                borderLeftColor: 'primary.main'
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                {comment.content}
                                            </Typography>
                                        </Paper>
                                    </CardContent>
                                </Card>
                            ))}
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
