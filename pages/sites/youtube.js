import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "../../utils/withAuth";

function YoutubePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch the YouTube videos from the API
    const fetchVideos = async () => {
      try {
        const response = await fetch("../api/youtube", {
          method: "POST",
          body: JSON.stringify({
            token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const fetchedVideos = await response.json();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error(
          "An error occurred while fetching YouTube videos:",
          error
        );
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>YouTube Videos</h1>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        ))
      ) : (
        <p>Retrieving videos...</p>
      )}
    </div>
  );
}

export default withAuth(YoutubePage);
