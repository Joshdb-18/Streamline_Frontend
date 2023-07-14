import React, { useState } from "react";
import withAuth from "../../utils/withAuth";
import Link from "next/link";
import axios from "axios";

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
      <header style={{ marginBottom: "2rem" }}>
        <h1>Streamline Dashboard</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            disabled={youtubeConnected}
            onClick={handleAddYouTube}
            style={{
              backgroundColor: "#FF0000",
              color: "#FFFFFF",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
          >
            Connect YouTube
          </button>
          <Link legacyBehavior href="/tiktok/tiktok.js">
            <a
              style={{
                backgroundColor: "#FF2D55",
                color: "#FFFFFF",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              }}
            >
              Connect TikTok
            </a>
          </Link>
          <Link legacyBehavior href="/facebook/facebook.js">
            <a
              style={{
                backgroundColor: "#4267B2",
                color: "#FFFFFF",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              }}
            >
              Connect Facebook
            </a>
          </Link>
          <Link legacyBehavior href="/instagram/instagram.js">
            <a
              style={{
                backgroundColor: "#E4405F",
                color: "#FFFFFF",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              }}
            >
              Connect Instagram
            </a>
          </Link>
        </div>
      </header>

      <main
        style={{ background: "#FFFFFF", padding: "2rem", borderRadius: "8px" }}
      >
        <h2>About Streamline</h2>
        <p>
          Streamline is an all-in-one social media management platform designed
          to simplify your online presence. With Streamline, you can easily
          manage your social media accounts, analyze performance, and connect
          with your audience.
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
          schedule content, and engage with your followers. Streamline provides
          powerful tools to streamline your Facebook marketing strategy and
          enhance your online presence.
        </p>

        <h3>Connect Instagram</h3>
        <p>
          With Streamline, you can connect your Instagram account to manage your
          posts, schedule content, monitor engagement, and gain insights into
          your audience. Streamline's intuitive interface simplifies your
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
  );
};

export default withAuth(Dashboard);
