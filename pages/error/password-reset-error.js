import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PasswordResetError() {
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
          Error: Invalid or Missing Parameters
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginTop: 2 }}>
          The password reset link is invalid or the required parameters are missing.
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginTop: 2 }}>
          Please check your email and make sure you have a valid password reset link.
        </Typography>
      </Box>
    </Container>
  );
}
