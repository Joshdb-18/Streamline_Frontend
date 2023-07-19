import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import withAuth from "../../utils/withAuth";
import Streamline from "../../public/assets/Logo.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = [{ label: "Upload Video", link: "/upload-vid" }];

const ITEM_HEIGHT = 48;

function Media(props) {
  const { loading = false, video } = props;
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription((prevShowDescription) => !prevShowDescription);
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <div
          style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src={`https://www.youtube.com/embed/${video.id}`}
            title="YouTube Video"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
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
            <Typography variant="h6">{video.title}</Typography>
            <Typography variant="body2" color="text.secondary" component="p">
              {showDescription
                ? video.description
                : `${video.description.slice(0, 100)}...`}
            </Typography>
            <button onClick={toggleDescription}>
              {showDescription ? "Hide Description" : "See more"}
            </button>
            <Typography variant="body2">Likes: {video.likes}</Typography>
            <Typography variant="body2">Comments: {video.comments}</Typography>
            <Typography variant="body2">Views: {video.views}</Typography>
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
}

function YoutubePage() {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch the YouTube videos from the API
    const fetchVideos = async () => {
      try {
        const response = await fetch("../api/youtube-liked", {
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
            <button
              className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
      <div
        role="presentation"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/user/main"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/sites/youtube"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            My Videos
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/sites/youtube-liked"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Liked Videos
          </Link>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <Link
                key={option.label}
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "2rem",
                }}
                color="inherit"
                href={option.link}
              >
                {option.label}
              </Link>
            ))}
          </Menu>
        </Breadcrumbs>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
          <Typography variant="body1" style={{ margin: "2rem 0" }}>
            No Videos found.
          </Typography>
        )}
      </div>
    </>
  );
}

export default withAuth(YoutubePage);
