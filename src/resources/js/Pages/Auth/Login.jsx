import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Box,
    Container,
    TextField,
    Button,
    Checkbox,
    Typography,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            
            <Container maxWidth="sm">
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 450,
                        p: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
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
                            Welcome Back
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Sign in to manage your articles and continue your creative journey
                        </Typography>
                    </Box>

                    {status && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {status}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={submit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                          
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            
                        />

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 3 }}>
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                color="primary"
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Remember me
                            </Typography>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ 
                                mt: 2, 
                                mb: 3,
                                p: 1.5,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                            disabled={processing}
                        >
                            {processing ? (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CircularProgress size={24} sx={{ mr: 2, color: 'white' }} />
                                    Signing in...
                                </Box>
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    variant="body2"
                                    sx={{ 
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </GuestLayout>
    );
}
