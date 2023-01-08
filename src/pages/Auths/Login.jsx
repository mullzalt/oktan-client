import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, IconButton, InputAdornment, Paper } from '@mui/material';
import logo from '../../assets/img/logo.png'
import ListItemLink from '../../components/Navigation/ListItemLink';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import useDocumentTitle from '../../components/hooks/useDocumentTitle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';





const theme = createTheme();

export default function Login() {
    useDocumentTitle('Login')

    const [showPassword, setShowPassword] = useState(false)

    const [login, { isSuccess, isError, data, error, isLoading }] = useLoginMutation()

    const { control, handleSubmit, setError, clearErrors, setFocus, formState: { errors } } = useForm({
        defaultValues: {
            identifier: '',
            password: '',
            remember: false
        },
        mode: 'onChange'
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            setFocus('identifier')
            setError('main', {
                type: 'wrongCredentials',
                message: error.data.message
            })
        }

        if (isSuccess) {
            dispatch(setCredentials({ ...data }))
            navigate('/dashboard')
        }
    }, [isSuccess, isError, setFocus])

    const handleLogin = async (data) => {
        await login(data)
    };

    const handleClickShowPassword = (e) => {
        e.preventDefault()
        setShowPassword((show) => !show);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >

                    <ListItemLink
                        to='/'
                        sx={{ p: 2, display: 'flex', justifyContent: 'center', mb: 4 }}
                    >
                        <img src={logo} alt='mainLogo' style={{ maxWidth: 74 }} />
                        <Typography variant='h6' sx={{ ml: 2, fontWeight: 'bold', }}>
                            OKTAN ITB 2023
                        </Typography>
                    </ListItemLink>

                    <Paper component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{ mt: 1, boxShadow: 4, borderRadius: 2, p: 4 }}>

                        <Typography variant="h4" marginBottom={4} textAlign='center'>
                            Login
                        </Typography>


                        {errors.main &&
                            <Alert severity="error">
                                {errors.main.message}
                            </Alert>
                        }


                        <Controller
                            name="identifier"
                            control={control}
                            rules={{ required: 'Please enter email or username!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    margin="normal"
                                    label="Email or Username"
                                    autoComplete="identifier"
                                    autoFocus
                                    error={!!errors.identifier}
                                    helperText={errors?.identifier?.message}
                                    onChange={(e) => {
                                        clearErrors('main')
                                        field.onChange(e)
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Please enter your password!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    margin="normal"
                                    label="Password"
                                    autoComplete="password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!errors.password}
                                    helperText={errors?.password?.message}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                    onChange={(e) => {
                                        clearErrors('main')
                                        field.onChange(e)
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="remember"
                            control={control}
                            render={({ field: { ref, ...field } }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...field} color="primary"

                                        />
                                    }
                                    label="Remember me"
                                />
                            )}
                        />


                        <LoadingButton
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            loading={isLoading}
                        >
                            Log In
                        </LoadingButton>

                        <Grid container>
                            <Grid item xs>
                                <Link component={RouterLink} to={'/'} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to={'/register'} variant="body2">
                                    {"Don't have an account? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
}