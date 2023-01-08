import { useEffect, useRef, useState } from 'react';
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
import { Abc, Mail, Person, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRegisterMutation } from '../../features/auth/authApiSlice';
import { LoadingButton } from '@mui/lab';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';



import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';



const theme = createTheme();

const RegisterPage = () => {
    useDocumentTitle('Register')

    const [showPassword, setShowPassword] = useState(false)

    const [register, { isSuccess, isError, data, error, isLoading }] = useRegisterMutation()

    const { control, watch, handleSubmit, setError, clearErrors, setFocus, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            name: '',
            username: '',
            institute: '',
            phone: '',
            password: '',
            confirmPassword: '',

        },
        mode: 'onChange'
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            setFocus('identifier')
            const errorData = error?.data?.errors
            if (errorData) {
                Object.keys(errorData).forEach((key, index) => {
                    setError(key, {
                        type: 'invalid data',
                        message: errorData[key].msg
                    })
                })
            }
        }

        if (isSuccess) {
            dispatch(setCredentials({ ...data }))
            navigate('/dashboard')
        }
    }, [isSuccess, isError, setFocus])

    const handleLogin = async (data) => {
        await register(data)
    };

    const handleClickShowPassword = (e) => {
        e.preventDefault()
        setShowPassword((show) => !show);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const password = useRef({})
    password.current = watch('password', '')

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" >
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
                            Register
                        </Typography>


                        {errors.main &&
                            <Alert severity="error">
                                {errors.main.message}
                            </Alert>
                        }


                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Please enter your name!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    margin="normal"
                                    label="Full Name"
                                    autoComplete="name"
                                    autoFocus
                                    error={!!errors.name}
                                    helperText={errors?.name?.message}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <Person />
                                            </InputAdornment>
                                    }}
                                />
                            )}
                        />


                        <Controller
                            name="username"
                            control={control}
                            rules={{
                                required: 'Please enter an username!',
                                pattern: {
                                    value: /^[a-zA-Z0-9|_]*$/g,
                                    message: 'Space or special character are not allowed!'
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Username must be atleast 8 character long!'
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Username too long!'
                                }
                            }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    margin="normal"
                                    label="Username"
                                    autoComplete="username"
                                    error={!!errors.username}
                                    helperText={errors?.username?.message}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <BadgeIcon />
                                            </InputAdornment>
                                    }}
                                />
                            )}
                        />



                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Please enter an email!',
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: 'Please enter a valid email!'
                                }

                            }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    margin="normal"
                                    label="Email"
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors?.email?.message}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <Mail />
                                            </InputAdornment>
                                    }}
                                />
                            )}
                        />

                        <Grid container columns={12} columnSpacing={2}>




                            <Grid item md={6} xs={12} sm={12}>

                                <Controller
                                    name="institute"
                                    control={control}
                                    rules={{ required: 'Please enter where you come from!' }}
                                    render={({ field: { ref, ...field } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            margin="normal"
                                            label="School/University"
                                            autoComplete="institute"
                                            autoFocus
                                            error={!!errors.name}
                                            helperText={errors?.name?.message}
                                            InputProps={{
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <SchoolIcon />
                                                    </InputAdornment>
                                            }}
                                        />
                                    )}
                                />


                            </Grid>

                            <Grid item md={6} xs={12} sm={12}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{
                                        required: 'Please enter a phone number!',
                                        pattern: {
                                            value: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g,
                                            message: 'Please enter valid Indonesian Phone Number!'
                                        }

                                    }}
                                    render={({ field: { ref, ...field } }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            margin="normal"
                                            label="Mobile Number"
                                            autoComplete="phone"
                                            error={!!errors.phone}
                                            helperText={errors?.phone?.message}
                                            InputProps={{
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <Phone />
                                                    </InputAdornment>,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                        </Grid>

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Please enter your password!',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be atleast 6 character long!'
                                }
                            }}
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
                                />
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                validate: {
                                    isMatch: value => value === password.current || 'Password does not match!'
                                }
                            }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    margin="normal"
                                    label="Confirm Password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!errors.confirmPassword}
                                    helperText={errors?.confirmPassword?.message}
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





                        <LoadingButton
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            loading={isLoading}
                        >
                            Register
                        </LoadingButton>

                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to={'/login'} variant="body2">
                                    {"Already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RegisterPage