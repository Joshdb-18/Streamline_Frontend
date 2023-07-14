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
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
        <a
          style={{
            color: "#1976D2",
            textDecoration: "none",
          }}
        >
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

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    try {
      const response = await fetch("api/signin", {
        method: "POST",
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        // Successful signup
        console.log(responseData.message);
        const token = responseData.token;
        localStorage.setItem("token", token);
        // Redirect the user to the main page
        router.push("user/main");
        // cookies.set("token", responseData.token);
      } else {
        // Error occurred during signup
        console.error(responseData.error);
        console.log(responseData.error);
        setError(responseData.error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      setError("An error occurred during signin: " + error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormValues = {
      ...formValues,
      [name]: value,
    };
    setFormValues(updatedFormValues);
  };

  const isFormValid = formValues.email !== "" && formValues.password !== "";

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
            <LoginOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <ErrorMessage error={error} />}
          {message && <SuccessMessage message={message} />}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formValues.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  style={{ color: "#F53838" }}
                />
              }
              label="Remember me"
            />
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link legacyBehavior href="/password-reset" variant="body2">
                  <a
                    style={{
                      color: "#1976D2",
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </a>
                </Link>
              </Grid>
              <Grid item>
                <Link legacyBehavior href="/signup" variant="body2">
                  <a
                    style={{
                      color: "#1976D2",
                      textDecoration: "none",
                    }}
                  >
                    Don't have an account?
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
