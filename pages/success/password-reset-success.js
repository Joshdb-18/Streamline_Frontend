import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PasswordResetError() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/signin');
    }, 1000); // 1000 milliseconds = 1 second

    // Clean up the timer on component unmount
    return () => clearTimeout(redirectTimer);
  }, [router]);

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
        <Typography variant="h5" component="h1">
          Password successfully changed. You will be redirected to the login page in a second.
        </Typography>
      </Box>
    </Container>
  );
}