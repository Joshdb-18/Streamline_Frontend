import { useState } from "react";
import withAuth from "../../utils/withAuth";
import Link from "next/link";
import axios from "axios";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonOutline from "../../components/misc/ButtonOutline.";
import Streamline from "../../public/assets/Logo.svg";

const Dashboard = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };

    try {
      const response = await axios.post(
        "https://backend.devnetwork.tech/api/v1/logout/",
        null,
        {
          headers: headers,
        }
      );
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const handleAddYouTube = async () => {
    const token = localStorage.getItem("token");

    // Create the Authorization header
    const headers = {
      Authorization: `Token ${token}`,
    };
    try {
      const response = await axios.get(
        "https://backend.devnetwork.tech/api/v1/youtube/auth/",
        {
          headers: headers,
        }
      );
      const { url } = response.data;
      setYoutubeUrl(url);
      window.location.href = url;
    } catch (error) {
      console.error("Failed to get YouTube authentication URL", error);
    }
  };

  return (
    <>
      <header>
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Streamline className="h-8 w-auto" />
          </div>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            <ButtonOutline onClick={handleLogout}>Logout</ButtonOutline>
          </div>
        </nav>
      </header>
      <Toolbar />
      <Box sx={{ "& > :not(style)": { m: 2 } }}>
        <Hidden smUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => setShowButtons(!showButtons)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Button onClick={handleAddYouTube}>
            <Fab
              variant="extended"
              size="medium"
              color="error"
              aria-label="add"
            >
              <NavigationIcon sx={{ mr: 1 }} />
              Connect YouTube
            </Fab>
          </Button>
          <Button href="/coming-soon">
            <Fab variant="extended" size="medium" color="" aria-label="add">
              <NavigationIcon sx={{ mr: 1 }} />
              Connect TikTok
            </Fab>
          </Button>
          <Button href="/coming-soon">
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
            >
              <NavigationIcon sx={{ mr: 1 }} />
              Connect Facebook
            </Fab>
          </Button>
          <Button href="/coming-soon">
            <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="add"
            >
              <NavigationIcon sx={{ mr: 1 }} />
              Connect Instagram
            </Fab>
          </Button>
        </Hidden>
        {showButtons && (
          <>
            <Button onClick={handleAddYouTube}>
              <Fab
                variant="extended"
                size="medium"
                color="error"
                aria-label="add"
              >
                <NavigationIcon sx={{ mr: 1 }} />
                Connect YouTube
              </Fab>
            </Button>
            <Button href="/coming-soon">
              <Fab variant="extended" size="medium" color="" aria-label="add">
                <NavigationIcon sx={{ mr: 1 }} />
                Connect TikTok
              </Fab>
            </Button>
            <Button href="/coming-soon">
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
              >
                <NavigationIcon sx={{ mr: 1 }} />
                Connect Facebook
              </Fab>
            </Button>
            <Button href="/coming-soon">
              <Fab
                variant="extended"
                size="medium"
                color="secondary"
                aria-label="add"
              >
                <NavigationIcon sx={{ mr: 1 }} />
                Connect Instagram
              </Fab>
            </Button>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          background: "#F4F4F4",
          padding: "2rem",
          fontSize: "1.2rem",
        }}
      >
        <Box
          sx={{
            background: "#FFFFFF",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%",
            mb: "2rem",
          }}
        >
          <Typography variant="h2" sx={{ mb: "1rem" }}>
            About Streamline
          </Typography>
          <Typography variant="body1" sx={{ mb: "1rem" }}>
            Streamline is an all-in-one social media management platform
            designed to simplify your online presence. With Streamline, you can
            easily manage your social media accounts, analyze performance, and
            connect with your audience.
          </Typography>
        </Box>

        <Box
          sx={{
            background: "#FFFFFF",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%",
            mb: "2rem",
          }}
        >
          <Typography variant="h2" sx={{ mb: "1rem" }}>
            Blog Posts
          </Typography>
          <Typography variant="h3" sx={{ mb: "1rem" }}>
            Introducing Streamline v2.0
          </Typography>
          <Typography variant="body1" sx={{ mb: "1rem" }}>
            We are excited to announce the release of Streamline v2.0! This
            major update brings new features, improved performance, and a
            redesigned user interface. With Streamline v2.0, managing your
            social media presence has never been easier.
          </Typography>

          <Typography variant="h3" sx={{ mb: "1rem" }}>
            Tips for Growing Your Instagram Audience
          </Typography>
          <Typography variant="body1" sx={{ mb: "1rem" }}>
            Looking to expand your Instagram audience? Check out our latest blog
            post for valuable tips and strategies to help you grow your
            followers and increase engagement on your Instagram profile. Don't
            miss out on these actionable insights!
          </Typography>

          <Typography variant="h3" sx={{ mb: "1rem" }}>
            How to Leverage Facebook Ads for Business Success
          </Typography>
          <Typography variant="body1" sx={{ mb: "1rem" }}>
            Facebook ads can be a powerful tool for driving business success. In
            our recent blog post, we dive into the best practices for creating
            and optimizing Facebook ads to maximize your reach, drive
            conversions, and achieve your business goals.
          </Typography>
        </Box>

        <Box
          sx={{
            background: "#FFFFFF",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%",
            mb: "2rem",
          }}
        >
          <Typography variant="h2" sx={{ mb: "1rem" }}>
            Testimonials
          </Typography>
          <Typography variant="h3" sx={{ mb: "1rem" }}>
            "Streamline has transformed the way I manage my social media
            accounts."
          </Typography>
          <Typography variant="body1" sx={{ mb: "1rem" }}>
            - John Doe, Social Media Manager
          </Typography>

          <Typography variant="h3" sx={{ mb: "1rem" }}>
            "The analytics and reporting features of Streamline have been
            instrumental in improving our social media strategy."
          </Typography>
          <Typography variant="body1" sx={{ mb: "1rem" }}>
            - Jane Smith, Marketing Director
          </Typography>
        </Box>

        <Box
          sx={{
            background: "#FFFFFF",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%",
            mb: "2rem",
          }}
        >
          <Typography variant="h2" sx={{ mb: "1rem" }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ mb: "1rem" }}>
            Have questions or need assistance? Our support team is here to help!
            Contact us at support@streamline.com or call 123-456-789 for
            immediate assistance. We're available 24/7 to address your concerns
            and ensure you have a seamless experience with Streamline.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default withAuth(Dashboard);
