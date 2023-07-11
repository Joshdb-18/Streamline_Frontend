import * as React from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegOutlined from "@mui/icons-material/HowToRegOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validator from "validator";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link legacyBehavior href="/">
      <a style={{
        color: '#1976D2',
        textDecoration: 'none',
      }}>
        Streamline
      </a>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
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
  const [formValues, setFormValues] = React.useState({
    username: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValues.acceptTerms) {
      setError("Please accept the terms of service and privacy policy.");
      return;
    }
    if (!validator.isEmail(formValues.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const passwordRegex = /^(?=.*[0-9].*[0-9].*[0-9])(?=.*[!@#$%^&*]).{7,}$/;
    if (
      formValues.password.length < 7 ||
      !passwordRegex.test(formValues.password)
    ) {
      setError(
        "Password must be at least 7 characters long and must include at least 3 numbers and a special character."
      );
      return;
    }

    try {
      const response = await fetch("api/signup", {
        method: "POST",
        body: JSON.stringify({
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        // Successful signup
        console.log(responseData.message);
        setMessage(responseData.message);
        // Redirect the user to the confirm email page
        router.push("email/confirm-email");
      } else {
        // Error occurred during signup
        console.error(responseData.error);
        setError(responseData.error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      setError("An error occurred during signup: " + error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    const updatedFormValues = {
      ...formValues,
      [name]: name === "acceptTerms" ? checked : value,
    };
    setFormValues(updatedFormValues);
  };

  const isFormValid =
    formValues.username !== "" &&
    formValues.email !== "" &&
    formValues.password !== "" &&
    formValues.acceptTerms;

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F53833" }}>
            <HowToRegOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && <ErrorMessage error={error} />}
          {message && <SuccessMessage message={message} />}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                  value={formValues.username}
                  onChange={handleChange}
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
                  value={formValues.email}
                  onChange={handleChange}
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
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="acceptTerms"
                      value="acceptTerms"
                      color="primary"
                      style={{ color: "#F53838" }}
                      checked={formValues.acceptTerms}
                      onChange={handleChange}
                    />
                  }
                />
                By clicking the signup button, you agree that you have read and
                accepted our{" "}
                <Link legacyBehavior href="/terms-of-service">
                  <a
                    style={{
                      color: "#1976D2",
                      textDecoration: "none",
                    }}
                  >
                    terms of service
                  </a>
                </Link>{" "}
                and our{" "}
                <Link legacyBehavior href="/policy">
                  <a
                    style={{
                      color: "#1976D2",
                      textDecoration: "none",
                    }}
                  >
                    privacy policy
                  </a>
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#F53838",
                "&:hover": {
                  bgcolor: "#e53030",
                },
              }}
              disabled={!isFormValid}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link legacyBehavior href="/signin" variant="body2">
                  <a
                    style={{
                      color: "#1976D2",
                      textDecoration: "none",
                    }}
                  >
                    Already have an account? Sign in
                  </a>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
