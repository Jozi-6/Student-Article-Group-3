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
                            maxWidth: 400,
                            p: 4,
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom align="center">
                            Article Publication Platform
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                            Sign in to manage your articles
                        </Typography>

                        {status && (
                            <Alert severity="error" sx={{ mb: 3 }}>
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
                                InputProps={{
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

                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    color="primary"
                                />
                                <Typography variant="body2">
                                    Remember me
                                </Typography>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={processing}
                                size="large"
                            >
                                {processing ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CircularProgress size={24} sx={{ mr: 2 }} />
                                        Signing in...
                                    </Box>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        variant="body2"
                                        color="primary"
                                        sx={{ textDecoration: 'none' }}
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
