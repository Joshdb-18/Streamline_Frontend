import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "../../utils/withAuth";
import ButtonOutline from "../../components/misc/ButtonOutline.";
import Streamline from "../../public/assets/Logo.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

function Media(props) {
  const { loading = false, video } = props;

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video.id}`}
          title="YouTube Video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton animation="wave" height={10} width="50%" />
            <Skeleton animation="wave" height={10} width="70%" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="h3">{video.title}</Typography>
            <Typography variant="body1">
              Description: {video.description}
            </Typography>
            <Typography variant="body2">Likes: {video.like_count}</Typography>
            <Typography variant="body2">
              Comments: {video.comment_count}
            </Typography>
            <Typography variant="body2">Views: {video.view_count}</Typography>
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
}

function YoutubePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

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
          console.error(fetchedVideos.error);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching YouTube videos:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <header>
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Streamline className="h-8 w-auto" />
          </div>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            <ButtonOutline>Logout</ButtonOutline>
          </div>
        </nav>
      </header>
      <div>
        {/* <h1>YouTube Videos</h1> */}
        {loading ? (
          <>
            <Media loading />
            <Media loading />
            <Media loading />
          </>
        ) : videos.length > 0 ? (
          videos.map((video) => <Media key={video.id} video={video} />)
        ) : (
          <Typography variant="body1">No more videos found.</Typography>
        )}
      </div>
    </>
  );
}

export default withAuth(YoutubePage);
