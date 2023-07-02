import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import Typography from '@mui/material/Typography';

export default function PasswordUpdate() {
  const router = useRouter();
  const [uidb64, setUidb64] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get the query parameters from the URL
    const queryParams = new URLSearchParams(router.asPath.split('?')[1]);
    const uidb64Value = queryParams.get('uidb64');
    const tokenValue = queryParams.get('token');
    setUidb64(uidb64Value);
    setToken(tokenValue);
  }, []);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('/api/password-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uidb64, token, password1: password, password2: confirmPassword }),
      });

      if (response.ok) {
        // Password update verification is successful
        // Display a success message or redirect to the password update page
        console.log('Password update verification successful');
        router.push('/success/password-reset-success');
      } else {
        // Password update verification failed
        router.push('/error/password-reset-error');
      }
    } catch (error) {
      // Handle any network or other errors that occur during password update verification
      console.error('An error occurred during password update verification', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 23,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#F53833' }}>
          <KeyOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            type="password"
            label="New Password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            type="password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
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
            Reset Password
          </Button>
        </form>
      </Box>
    </Container>
  );
}