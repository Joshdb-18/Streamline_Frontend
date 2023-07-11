import * as React from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegOutlined  from '@mui/icons-material/HowToRegOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link legacyBehavior href="/">
      <a style={{
        color: '#1976D2',
        textDecoration: 'none',
      }}>
        Streamline
      </a>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function ErrorMessage({ error }) {
  return (
    <Typography variant="body2" color="error" align="center" gutterBottom>
      {error}
    </Typography>
  );
}

function SuccessMessage({ message }) {
  return (
    <Typography variant="body2" color="success" align="center" gutterBottom>
      {message}
    </Typography>
  );
}


function Signup() {
  const router = useRouter();
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    try {
      const response = await fetch('api/signup', {
        method: 'POST',
        body: JSON.stringify({
          username: data.get('username'),
          email: data.get('email'),
          password: data.get('password'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        // Successful signup
        console.log(responseData.message);
        setMessage(responseData.message);
        // Redirect the user to the confirm email page
        router.push('email/confirm-email');
      } else {
        // Error occurred during signup
        console.error(responseData.error);
        setError(responseData.error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      setError('An error occurred during signup: ' + error.message);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#F53833' }}>
            <HowToRegOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && <ErrorMessage error={error} />}
          {message && <SuccessMessage message={message} />}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                control={<Checkbox value="acceptTerms" color="primary" style={{ color: '#F53838' }} />}
                label="By clicking the signup button, you agree that you have read and accepted our terms of service and our privacy policy"
              />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#F53838',
                '&:hover': {
                  bgcolor: '#e53030',
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link legacyBehavior href="/signin" variant="body2">
                  <a style={{
                    color: '#1976D2',
                    textDecoration: 'none',
                  }}>
                    Already have an account? Sign in
                  </a>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Signup;