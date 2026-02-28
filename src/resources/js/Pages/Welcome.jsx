import { Head, Link } from '@inertiajs/react';
import {
    Box,
    Container,
    Button,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Grid,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Paper,
    Fade,
    Slide
} from '@mui/material';
import {
    Edit as EditIcon,
    RateReview as ReviewIcon,
    Publish as PublishIcon,
    Comment as CommentIcon,
    CreateNewFolder as CreateIcon,
    Dashboard as DashboardIcon,
    CheckCircle as CheckIcon,
    Article as ArticleIcon,
    Group as GroupIcon,
    TrendingUp,
    School,
    AutoStories,
    Psychology,
    Lightbulb,
    Star,
    ThumbUp
} from '@mui/icons-material';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome - Article Publication Platform" />

            {/* Enhanced Navigation Bar */}
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
                        {auth.user ? (
                            <Button
                                component={Link}
                                href={route('dashboard')}
                                variant="contained"
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'grey.100',
                                    }
                                }}
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button
                                    component={Link}
                                    href={route('login')}
                                    variant="outlined"
                                    sx={{ color: 'white', borderColor: 'white' }}
                                >
                                    Login
                                </Button>
                                <Button
                                    component={Link}
                                    href={route('register')}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'grey.100',
                                        }
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Hero Section with Enhanced Background */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    minHeight: '100vh',
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
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                    {/* Hero Content */}
                    <Box sx={{ py: 8, textAlign: 'center' }}>
                        <Fade in timeout={1000}>
                            <Box>
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    sx={{
                                        fontWeight: 'bold',
                                        mb: 3,
                                        color: 'white',
                                        fontSize: { xs: '2.5rem', md: '3.5rem' }
                                    }}
                                >
                                    Share Your Knowledge with the World
                                </Typography>
                                
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 6,
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        maxWidth: '800px',
                                        mx: 'auto',
                                        lineHeight: 1.6
                                    }}
                                >
                                    Join our collaborative platform where writers create, editors refine, and readers engage with quality content.
                                </Typography>

                                {!auth.user && (
                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <Button
                                            component={Link}
                                            href={route('register')}
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                backgroundColor: 'white',
                                                color: 'primary.main',
                                                px: 4,
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                '&:hover': {
                                                    backgroundColor: 'grey.100',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                        <Button
                                            component={Link}
                                            href={route('login')}
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                color: 'white',
                                                borderColor: 'white',
                                                px: 4,
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    borderColor: 'white',
                                                    transform: 'translateY(-2px)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Fade>
                    </Box>

                    {/* Role Selection Section */}
                    <Box sx={{ py: 8 }}>
                        <Slide in timeout={1200} direction="up">
                            <Typography
                                variant="h4"
                                sx={{ 
                                    fontWeight: 'bold', 
                                    mb: 6, 
                                    textAlign: 'center', 
                                    color: 'white',
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                Choose Your Role
                            </Typography>
                        </Slide>

                        <Grid container spacing={4}>
                            {/* Writer Dashboard */}
                            <Grid item xs={12} md={6} lg={4}>
                                <Slide in timeout={1400} direction="up">
                                    <Card sx={{ 
                                        height: '100%', 
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)', 
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        '&:hover': { 
                                            transform: 'translateY(-12px) scale(1.02)',
                                            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                                        }
                                    }}>
                                        <CardHeader
                                            avatar={
                                                <Box sx={{
                                                    backgroundColor: 'primary.main',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    p: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <EditIcon />
                                                </Box>
                                            }
                                            title="✍️ Writer"
                                            subheader="Create & Manage Articles"
                                            sx={{ 
                                                backgroundColor: 'primary.light', 
                                                color: 'white',
                                                '& .MuiCardHeader-subheader': {
                                                    color: 'rgba(255, 255, 255, 0.9)'
                                                }
                                            }}
                                        />
                                        <CardContent sx={{ p: 3 }}>
                                            {/* Enhanced Wireframe */}
                                            <Paper sx={{ 
                                                p: 2, 
                                                mb: 3, 
                                                backgroundColor: 'background.default', 
                                                border: '1px solid', 
                                                borderColor: 'divider',
                                                borderRadius: 2
                                            }}>
                                                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 2, color: 'text.primary' }}>
                                                    Writer Dashboard:
                                                </Typography>
                                                
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ 
                                                            border: '1px solid #ddd', 
                                                            p: 1.5, 
                                                            borderRadius: 1, 
                                                            backgroundColor: '#f8f9fa',
                                                            mb: 1
                                                        }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1, color: 'primary.main' }}>
                                                                📝 Article Creation
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                                                <Box sx={{ width: 60, height: 4, backgroundColor: 'primary.main', borderRadius: 1 }} />
                                                                <Box sx={{ width: 40, height: 4, backgroundColor: 'grey.300', borderRadius: 1 }} />
                                                            </Box>
                                                            <Box sx={{ width: '100%', height: 3, backgroundColor: 'grey.200', borderRadius: 1, mb: 1 }} />
                                                            <Box sx={{ width: '80%', height: 3, backgroundColor: 'grey.200', borderRadius: 1 }} />
                                                        </Box>
                                                    </Grid>
                                                    
                                                    <Grid item xs={12}>
                                                        <Box sx={{ 
                                                            border: '1px solid #ddd', 
                                                            p: 1.5, 
                                                            borderRadius: 1, 
                                                            backgroundColor: '#e8f5e8'
                                                        }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1, color: 'success.main' }}>
                                                                ✅ Submission Status
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                                <CheckIcon sx={{ fontSize: 14, color: 'success.main' }} />
                                                                <Typography variant="caption">Ready to submit</Typography>
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                                                Create compelling articles, manage drafts, track submission status, and collaborate with editors to publish quality content.
                                            </Typography>

                                            <Button
                                                component={Link}
                                                href={auth.user ? route('writer.dashboard') : route('register')}
                                                variant="contained"
                                                fullWidth
                                                size="large"
                                                startIcon={<CreateIcon />}
                                                sx={{ 
                                                    mt: 2,
                                                    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                                                    }
                                                }}
                                            >
                                                {auth.user ? 'Go to Writer Dashboard' : 'Start Writing'}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Slide>
                            </Grid>

                            {/* Editor Dashboard */}
                            <Grid item xs={12} md={6} lg={4}>
                                <Slide in timeout={1600} direction="up">
                                    <Card sx={{ 
                                        height: '100%', 
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)', 
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        '&:hover': { 
                                            transform: 'translateY(-12px) scale(1.02)',
                                            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                                        }
                                    }}>
                                        <CardHeader
                                            avatar={
                                                <Box sx={{
                                                    backgroundColor: 'secondary.main',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    p: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center' 
                                                }}>
                                                    <ReviewIcon />
                                                </Box>
                                            }
                                            title="👁️ Editor"
                                            subheader="Review & Publish Content"
                                            sx={{ 
                                                backgroundColor: 'secondary.light', 
                                                color: 'white',
                                                '& .MuiCardHeader-subheader': {
                                                    color: 'rgba(255, 255, 255, 0.9)'
                                                }
                                            }}
                                        />
                                        <CardContent sx={{ p: 3 }}>
                                            {/* Enhanced Wireframe */}
                                            <Paper sx={{ 
                                                p: 2, 
                                                mb: 3, 
                                                backgroundColor: 'background.default', 
                                                border: '1px solid', 
                                                borderColor: 'divider',
                                                borderRadius: 2
                                            }}>
                                                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 2, color: 'text.primary' }}>
                                                    Editor Dashboard:
                                                </Typography>
                                                
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ 
                                                            border: '1px solid #ddd', 
                                                            p: 1.5, 
                                                            borderRadius: 1, 
                                                            backgroundColor: '#fff3cd',
                                                            mb: 1
                                                        }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1, color: 'warning.main' }}>
                                                                🔍 Review Queue
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                                                <Box sx={{ width: 30, height: 30, backgroundColor: 'warning.main', borderRadius: 1 }} />
                                                                <Box sx={{ width: 30, height: 30, backgroundColor: 'warning.main', borderRadius: 1 }} />
                                                                <Box sx={{ width: 30, height: 30, backgroundColor: 'warning.main', borderRadius: 1 }} />
                                                            </Box>
                                                            <Typography variant="caption">3 articles pending review</Typography>
                                                        </Box>
                                                    </Grid>
                                                    
                                                    <Grid item xs={12}>
                                                        <Box sx={{ 
                                                            border: '1px solid #ddd', 
                                                            p: 1.5, 
                                                            borderRadius: 1, 
                                                            backgroundColor: '#d4edda'
                                                        }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1, color: 'success.main' }}>
                                                                📈 Publishing Stats
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Typography variant="caption">Published: 12</Typography>
                                                                <TrendingUp sx={{ fontSize: 14, color: 'success.main' }} />
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                                                Review submitted articles, provide constructive feedback, manage revisions, and publish high-quality content for readers.
                                            </Typography>

                                            <Button
                                                component={Link}
                                                href={auth.user ? route('editor.dashboard') : route('register')}
                                                variant="contained"
                                                fullWidth
                                                size="large"
                                                startIcon={<PublishIcon />}
                                                sx={{ 
                                                    mt: 2,
                                                    background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #e083ea 0%, #e5475c 100%)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 25px rgba(240, 147, 251, 0.3)'
                                                    }
                                                }}
                                            >
                                                {auth.user ? 'Go to Editor Dashboard' : 'Start Reviewing'}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Slide>
                            </Grid>

                            {/* Student Dashboard */}
                            <Grid item xs={12} md={6} lg={4}>
                                <Slide in timeout={1800} direction="up">
                                    <Card sx={{ 
                                        height: '100%', 
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)', 
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        '&:hover': { 
                                            transform: 'translateY(-12px) scale(1.02)',
                                            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                                        }
                                    }}>
                                        <CardHeader
                                            avatar={
                                                <Box sx={{
                                                    backgroundColor: 'success.main',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    p: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <School />
                                                </Box>
                                            }
                                            title="📚 Student Reader"
                                            subheader="Read & Engage"
                                            sx={{ 
                                                backgroundColor: 'success.light', 
                                                color: 'white',
                                                '& .MuiCardHeader-subheader': {
                                                    color: 'rgba(255, 255, 255, 0.9)'
                                                }
                                            }}
                                        />
                                        <CardContent sx={{ p: 3 }}>
                                            {/* Enhanced Wireframe */}
                                            <Paper sx={{ 
                                                p: 2, 
                                                mb: 3, 
                                                backgroundColor: 'background.default', 
                                                border: '1px solid', 
                                                borderColor: 'divider',
                                                borderRadius: 2
                                            }}>
                                                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 2, color: 'text.primary' }}>
                                                    Reader Dashboard:
                                                </Typography>
                                                
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ 
                                                            border: '1px solid #ddd', 
                                                            p: 1.5, 
                                                            borderRadius: 1, 
                                                            backgroundColor: '#e3f2fd',
                                                            mb: 1
                                                        }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1, color: 'info.main' }}>
                                                                📖 Article Library
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                                <Box sx={{ width: '100%', height: 8, backgroundColor: 'info.main', borderRadius: 1 }} />
                                                                <Box sx={{ width: '85%', height: 8, backgroundColor: 'info.light', borderRadius: 1 }} />
                                                                <Box sx={{ width: '90%', height: 8, backgroundColor: 'info.light', borderRadius: 1 }} />
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                    
                                                    <Grid item xs={12}>
                                                        <Box sx={{ 
                                                            border: '1px solid #ddd', 
                                                            p: 1.5, 
                                                            borderRadius: 1, 
                                                            backgroundColor: '#fce4ec'
                                                        }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1, color: 'error.main' }}>
                                                                💬 Engagement
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                    <ThumbUp sx={{ fontSize: 14, color: 'error.main' }} />
                                                                    <Typography variant="caption">Like</Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                    <CommentIcon sx={{ fontSize: 14, color: 'error.main' }} />
                                                                    <Typography variant="caption">Comment</Typography>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                                                Discover and read published articles, share your thoughts through comments, like content, and engage with the learning community.
                                            </Typography>

                                            <Button
                                                component={Link}
                                                href={auth.user ? route('student.dashboard') : route('register')}
                                                variant="contained"
                                                fullWidth
                                                size="large"
                                                startIcon={<ArticleIcon />}
                                                sx={{ 
                                                    mt: 2,
                                                    background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #3f9cfe 0%, #00e2fe 100%)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)'
                                                    }
                                                }}
                                            >
                                                {auth.user ? 'Go to Reader Dashboard' : 'Start Reading'}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Slide>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Features Section */}
                    <Box sx={{ py: 8, textAlign: 'center' }}>
                        <Slide in timeout={2000} direction="up">
                            <Box>
                                <Typography
                                    variant="h4"
                                    sx={{ 
                                        fontWeight: 'bold', 
                                        mb: 6, 
                                        color: 'white',
                                        fontSize: { xs: '2rem', md: '2.5rem' }
                                    }}
                                >
                                    Why Choose Our Platform?
                                </Typography>

                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4}>
                                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                                            <Box sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '50%',
                                                width: 80,
                                                height: 80,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mx: 'auto',
                                                mb: 2
                                            }}>
                                                <Lightbulb sx={{ fontSize: 40 }} />
                                            </Box>
                                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                                Knowledge Sharing
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Share your expertise and learn from others in a collaborative environment
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                                            <Box sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '50%',
                                                width: 80,
                                                height: 80,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mx: 'auto',
                                                mb: 2
                                            }}>
                                                <Psychology sx={{ fontSize: 40 }} />
                                            </Box>
                                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                                Quality Content
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Professional editorial process ensures high-quality, accurate content
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                                            <Box sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '50%',
                                                width: 80,
                                                height: 80,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mx: 'auto',
                                                mb: 2
                                            }}>
                                                <GroupIcon sx={{ fontSize: 40 }} />
                                            </Box>
                                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                                Community Driven
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Engage with a community of passionate writers, editors, and readers
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Slide>
                    </Box>

                    {/* Call to Action */}
                    <Box sx={{ py: 8, textAlign: 'center' }}>
                        <Slide in timeout={2200} direction="up">
                            <Paper sx={{ 
                                p: 6, 
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: 4
                            }}>
                                <Typography variant="h4" sx={{ mb: 3, color: 'white', fontWeight: 'bold' }}>
                                    Ready to Get Started?
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', mx: 'auto' }}>
                                    Join our community of writers, editors, and readers today. Start creating, reviewing, or exploring quality content.
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Button
                                        component={Link}
                                        href={route('register')}
                                        variant="contained"
                                        size="large"
                                        startIcon={<Star />}
                                        sx={{
                                            backgroundColor: 'white',
                                            color: 'primary.main',
                                            px: 4,
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: 'grey.100',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)'
                                            }
                                        }}
                                    >
                                        Create Account
                                    </Button>
                                    <Button
                                        component={Link}
                                        href={route('login')}
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            color: 'white',
                                            borderColor: 'white',
                                            px: 4,
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                borderColor: 'white',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            </Paper>
                        </Slide>
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    py: 4,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary">
                        © 2024 Article Publication Platform. All rights reserved. | Laravel v{laravelVersion} | PHP v{phpVersion}
                    </Typography>
                </Container>
            </Box>
        </>
    );
}
