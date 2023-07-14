import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from '../../utils/withAuth';

function YoutubePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch the YouTube videos from the API
    const fetchVideos = async () => {
      try {
        const response = await axios.get("../api/youtube");
        const fetchedVideos = response.data;
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
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
}

export default withAuth(YoutubePage);