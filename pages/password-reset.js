import React from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import HowToRegOutlined  from '@mui/icons-material/HowToRegOutlined';


export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
      });
  
      // Validate the email address
      if (!email) {
        setError('Please enter your email address');
        return;
      }
  
      // Send the password reset request to the backend
      const resetPassword = async () => {
        try {
          const response = await fetch('api/password-reset', {
            method: 'POST',
            body: JSON.stringify({
              email: email,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            
          });

  
          if (response.ok) {
            // Password reset request sent successfully
            router.push('email/reset-email'); 
          } else {
            // Password reset request failed
            setError('Password reset request failed. Please try again later.');
          }
        } catch (error) {
          console.error('An error occurred during password reset request', error);
          setError('An error occurred. Please try again later.');
        }
      };
  
      resetPassword();
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
        <HowToRegOutlined />
        </Avatar>
          <Typography variant="h5" component="h1" mb={2}>
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              type="email"
              label="Email Address"
              value={email}
              onChange={handleEmailChange}
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