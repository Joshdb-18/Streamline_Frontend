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
        if (response.ok) {
          setVideos(fetchedVideos);
        } else {
          console.log(fetchedVideos.error);
        }
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
            <p>Description: {video.description}</p>
            <p>Likes: {video.likes}</p>
            <p>Comments: {video.comments}</p>
            <p>Views: {video.views}</p>
            <p>Privacy Status: {video.privacyStatus}</p>
            <iframe
              width="560"
              height="315"
              src={video.link}
              title="YouTube Video"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))
      ) : (
        <p>Retrieving videos...</p>
      )}
    </div>
  );
}

export default withAuth(YoutubePage);
