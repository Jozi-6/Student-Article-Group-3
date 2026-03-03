import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Card,
    CardContent,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import {
    Person,
    Email,
    Lock,
    Visibility,
    VisibilityOff,
    Edit as EditIcon,
    RateReview as ReviewIcon,
    Comment as CommentIcon
} from '@mui/icons-material';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'writer'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Account Info', 'Password Setup', 'Choose Role'];

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            
            <Container maxWidth="md">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: 'calc(100vh - 64px)',
                        py: 4,
                    }}>
                    <Paper
                        elevation={24}
                        sx={{
                            width: '100%',
                            maxWidth: 700,
                            p: 4,
                            borderRadius: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 25px 70px rgba(0,0,0,0.2)'
                            }
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography 
                                variant="h3" 
                                component="h1" 
                                sx={{ 
                                    fontWeight: 'bold',
                                    mb: 2,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                Create Your Account
                            </Typography>
                            
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                Join our collaborative platform and start your creative journey
                            </Typography>
                        </Box>

                        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel sx={{
                                        '& .MuiStepLabel-label': {
                                            fontWeight: activeStep === index ? 'bold' : 'normal',
                                            color: activeStep === index ? 'primary.main' : 'text.secondary'
                                        }
                                    }}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {errors.email && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{errors.email}</Alert>}

                        <Box component="form" onSubmit={submit} noValidate>
                            {activeStep === 0 && (
                                <Box>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        
                            
                                    />
                                    
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        
                                    />
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                        <Button
                                            onClick={handleNext}
                                            variant="contained"
                                            disabled={processing}
                                            sx={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                                                },
                                                transition: 'all 0.3s ease',
                                                borderRadius: 2,
                                                px: 3
                                            }}
                                        >
                                            Next
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                        
                                    />
                                    
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password_confirmation"
                                        label="Confirm Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        error={!!errors.password_confirmation}
                                        helperText={errors.password_confirmation}
                                        
                                    />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
                                        <Button
                                            onClick={handleBack}
                                            variant="outlined"
                                            disabled={processing}
                                            sx={{
                                                borderRadius: 2,
                                                px: 3,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(102, 126, 234, 0.04)'
                                                }
                                            }}
                                        >
                                            Back
                                        </Button>
                                        
                                        <Button
                                            onClick={handleNext}
                                            variant="contained"
                                            disabled={processing}
                                            size="large"
                                            sx={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                                                },
                                                transition: 'all 0.3s ease',
                                                borderRadius: 2,
                                                px: 3
                                            }}
                                        >
                                            Next
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            {activeStep === 2 && (
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                                        Choose Your Role
                                    </Typography>

                                    <Grid container spacing={2} sx={{ mb: 3 }}>
                                        {/* Writer Role */}
                                        <Grid item xs={12} sm={6}>
                                            <Card
                                                onClick={() => setData('role', 'writer')}
                                                sx={{
                                                    cursor: 'pointer',
                                                    border: data.role === 'writer' ? '2px solid' : '1px solid',
                                                    borderColor: data.role === 'writer' ? 'primary.main' : 'divider',
                                                    backgroundColor: data.role === 'writer' ? 'rgba(102, 126, 234, 0.08)' : 'background.paper',
                                                    transition: 'all 0.3s ease',
                                                    borderRadius: 2,
                                                    '&:hover': { 
                                                        boxShadow: 3,
                                                        transform: 'translateY(-2px)'
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                                    <EditIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                        ✍️ Writer
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Create and manage articles
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        {/* Editor Role */}
                                        <Grid item xs={12} sm={6}>
                                            <Card
                                                onClick={() => setData('role', 'editor')}
                                                sx={{
                                                    cursor: 'pointer',
                                                    border: data.role === 'editor' ? '2px solid' : '1px solid',
                                                    borderColor: data.role === 'editor' ? 'secondary.main' : 'divider',
                                                    backgroundColor: data.role === 'editor' ? 'rgba(240, 147, 251, 0.08)' : 'background.paper',
                                                    transition: 'all 0.3s ease',
                                                    borderRadius: 2,
                                                    '&:hover': { 
                                                        boxShadow: 3,
                                                        transform: 'translateY(-2px)'
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                                    <ReviewIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                        👁️ Editor
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Review and publish articles
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        {/* Student Role */}
                                        <Grid item xs={12} sm={6}>
                                            <Card
                                                onClick={() => setData('role', 'student')}
                                                sx={{
                                                    cursor: 'pointer',
                                                    border: data.role === 'student' ? '2px solid' : '1px solid',
                                                    borderColor: data.role === 'student' ? '#f57c00' : 'divider',
                                                    backgroundColor: data.role === 'student' ? 'rgba(245, 124, 0, 0.08)' : 'background.paper',
                                                    transition: 'all 0.3s ease',
                                                    borderRadius: 2,
                                                    '&:hover': { 
                                                        boxShadow: 3,
                                                        transform: 'translateY(-2px)'
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                                    <CommentIcon sx={{ fontSize: 48, color: '#f57c00', mb: 2 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                        📚 Student/Reader
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Read and comment on articles
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
                                        <Button
                                            onClick={handleBack}
                                            variant="outlined"
                                            disabled={processing}
                                            sx={{
                                                borderRadius: 2,
                                                px: 3,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(102, 126, 234, 0.04)'
                                                }
                                            }}
                                        >
                                            Back
                                        </Button>
                                        
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={processing || !data.role}
                                            size="large"
                                            sx={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                                                },
                                                transition: 'all 0.3s ease',
                                                borderRadius: 2,
                                                px: 3
                                            }}
                                        >
                                            {processing ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CircularProgress size={24} sx={{ mr: 2, color: 'white' }} />
                                                    Creating Account...
                                                </Box>
                                            ) : (
                                                'Create Account'
                                            )}
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                            
                        <Box>
                                <Link
                                    href={route('login')}
                                    variant="body2"
                                    color="primary"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </GuestLayout>
    );
}
