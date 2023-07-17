import { useState } from "react";
import withAuth from "../../utils/withAuth";
import Link from "next/link";
import axios from "axios";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

const Dashboard = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeConnected, setYoutubeConnected] = useState(false);

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

  const handleYoutubeConnected = () => {
    setYoutubeConnected(true);
  };
  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Button onClick={handleAddYouTube}>
          <Fab variant="extended" size="medium" color="error" aria-label="add">
            <NavigationIcon sx={{ mr: 1 }} />
            Connect YouTube
          </Fab>
        </Button>
        <Button href="/coming-soon">
          <Fab variant="extended" size="medium" color="black" aria-label="add">
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
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          background: "#F4F4F4",
          padding: "2rem",
          fontSize: "1.2rem",
        }}
      >
        <main
          style={{
            background: "#FFFFFF",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <h2>About Streamline</h2>
          <p>
            Streamline is an all-in-one social media management platform
            designed to simplify your online presence. With Streamline, you can
            easily manage your social media accounts, analyze performance, and
            connect with your audience.
          </p>

          <h3>Connect YouTube</h3>
          <p>
            By connecting your YouTube account, you can manage your channel,
            upload videos, view analytics, and engage with your subscribers.
            Streamline provides a seamless interface to streamline your YouTube
            content creation and management process.
          </p>

          <h3>Connect Facebook</h3>
          <p>
            Connect your Facebook account to manage your profile, post updates,
            schedule content, and engage with your followers. Streamline
            provides powerful tools to streamline your Facebook marketing
            strategy and enhance your online presence.
          </p>

          <h3>Connect Instagram</h3>
          <p>
            With Streamline, you can connect your Instagram account to manage
            your posts, schedule content, monitor engagement, and gain insights
            into your audience. Streamline's intuitive interface simplifies your
            Instagram marketing efforts.
          </p>

          <h3>Connect TikTok</h3>
          <p>
            Connect your TikTok account with Streamline to manage your videos,
            engage with your followers, and monitor performance. Streamline
            provides comprehensive TikTok management features to help you grow
            your TikTok presence.
          </p>
        </main>
      </div>
    </>
  );
};

export default withAuth(Dashboard);
