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
            
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '100vh',
                        py: 4,
                    }}>
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            maxWidth: 600,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom align="center">
                            Create Account
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
                            Join the article publication platform
                        </Typography>

                        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {errors.email && <Alert severity="error" sx={{ mb: 2 }}>{errors.email}</Alert>}

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
                                        InputProps={{
                                            startAdornment: (
                                                <Person />
                                            ),
                                        }}
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
                                        InputProps={{
                                            startAdornment: (
                                                <Email />
                                            ),
                                        }}
                                    />
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                        <Button
                                            onClick={handleNext}
                                            variant="contained"
                                            disabled={processing}
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
                                        InputProps={{
                                            startAdornment: (
                                                <Lock />
                                            ),
                                            endAdornment: (
                                                <Button
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </Button>
                                            ),
                                        }}
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
                                        InputProps={{
                                            startAdornment: (
                                                <Lock />
                                            ),
                                        }}
                                    />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
                                        <Button
                                            onClick={handleBack}
                                            variant="outlined"
                                            disabled={processing}
                                        >
                                            Back
                                        </Button>
                                        
                                        <Button
                                            onClick={handleNext}
                                            variant="contained"
                                            disabled={processing}
                                            size="large"
                                        >
                                            Next
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            {activeStep === 2 && (
                                <Box>
                                    <Typography variant="body1" sx={{ mb: 3 }}>
                                        Log in as:
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
                                                    backgroundColor: data.role === 'writer' ? 'action.selected' : 'background.paper',
                                                    transition: 'all 0.3s',
                                                    '&:hover': { boxShadow: 2 }
                                                }}
                                            >
                                                <CardContent sx={{ textAlign: 'center' }}>
                                                    <EditIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                        Writer
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
                                                    backgroundColor: data.role === 'editor' ? 'action.selected' : 'background.paper',
                                                    transition: 'all 0.3s',
                                                    '&:hover': { boxShadow: 2 }
                                                }}
                                            >
                                                <CardContent sx={{ textAlign: 'center' }}>
                                                    <ReviewIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                        Editor
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
                                                    backgroundColor: data.role === 'student' ? 'action.selected' : 'background.paper',
                                                    transition: 'all 0.3s',
                                                    '&:hover': { boxShadow: 2 }
                                                }}
                                            >
                                                <CardContent sx={{ textAlign: 'center' }}>
                                                    <CommentIcon sx={{ fontSize: 40, color: '#f57c00', mb: 1 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                        Student/Reader
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
                                        >
                                            Back
                                        </Button>
                                        
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={processing || !data.role}
                                            size="large"
                                        >
                                            {processing ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CircularProgress size={24} sx={{ mr: 2 }} />
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
