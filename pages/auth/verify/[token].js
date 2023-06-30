import * as React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch('https://backend.devnetwork.tech/api/v1/verify/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `token=${token}`,
        });

        if (response.ok) {
          setResponseMessage('Email verification successful');
        } else {
          setResponseMessage('Email verification failed');
          const responseData = await response.json();
          setErrorMessage(responseData.error);
        }
      } catch (error) {
        console.error('An error occurred during email verification', error);
        setResponseMessage('An error occurred during email verification');
        setErrorMessage('Reason: Network error or server issue');
      } finally {
        // Wait for 5 seconds before setting loading to false
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F6F8FB' }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2rem',
              background: '#FFFFFF',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
            }}
          >
            <CircularProgress color="primary" size={60} />
            <Typography variant="h6" component="p" style={{ marginTop: '1rem' }}>
              Verifying your email address...
            </Typography>
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F6F8FB' }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            background: '#FFFFFF',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
          }}
        >
          <Typography variant="h4" component="h2" style={{ marginBottom: '1rem' }}>
            Email Verification
          </Typography>
          <Typography variant="body1" component="p" style={{ marginBottom: '2rem' }}>
            {responseMessage}
          </Typography>
          {responseMessage === 'Email verification failed' && (
            <Typography variant="body2" component="p" color="error" style={{ marginBottom: '2rem' }}>
              {errorMessage}
            </Typography>
          )}
          {responseMessage === 'Email verification successful' && (
            <Typography variant="body2" component="p">
              Your email has been verified. You can now proceed to{' '}
              <Link legacyBehavior href="/signin" passHref>
                <a style={{ color: '#1976D2', textDecoration: 'none' }}>Login</a>
              </Link>
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}
