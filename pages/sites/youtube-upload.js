import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Streamline from "../../public/assets/Logo.svg";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const options = [{ label: "Upload Video", link: "/sites/youtube-upload" }];

const ITEM_HEIGHT = 48;

const privacyOptions = ["public", "private", "unlisted"];
const categoryOptions = [
  "Film & Animation",
  "Autos & Vehicles",
  "Music",
  "Pets & Animals",
  "Sports",
  "Travel & Events",
  "Gaming",
  "People & Blogs",
  "Comedy",
  "Entertainment",
  "News & Politics",
  "Howto & Style",
  "Education",
  "Science & Technology",
  "Nonprofits & Activism",
];

const YoutubeUploadPage = () => {
  const router = useRouter();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoPrivacyStatus, setVideoPrivacyStatus] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoCategory, setVideoCategory] = useState("");
  const [videoMadeForKids, setVideoMadeForKids] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    // Check if all required fields are filled
    if (
      !videoTitle ||
      !videoDescription ||
      !videoPrivacyStatus ||
      !videoFile ||
      !videoCategory
    ) {
      return;
    }

    // Set the uploading state to true
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", videoTitle);
      formData.append("description", videoDescription);
      formData.append("privacy_status", videoPrivacyStatus);
      formData.append("video", videoFile);
      formData.append("category", videoCategory);
      formData.append("made_for_kids", videoMadeForKids);

      // Send the POST request to the backend
      const response = await axios.post("/api/youtube-upload", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        // Video upload successful
        router.push("/sites/youtube");
      } else {
        // Video upload failed, display an error message or handle the error accordingly
        console.error("Video upload failed:", response.data.error);
      }
    } catch (error) {
      // Handle any error that occurs during the video upload
      console.error("Video upload failed due to this error:", error);
    } finally {
      // Set the uploading state back to false
      setUploading(false);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            width: "100%",
            backgroundColor: "#FFFFFF",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Upload Video
          </Typography>
          <form>
            <Box
              sx={{
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <InputBase
                placeholder="Title"
                value={videoTitle}
                fullWidth
                multiline
                rows={2}
                style={{
                  padding: "0.5rem",
                }}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <InputBase
                placeholder="Video Description"
                value={videoDescription}
                fullWidth
                multiline
                rows={3}
                style={{
                  padding: "0.6rem",
                }}
                onChange={(e) => setVideoDescription(e.target.value)}
              />
            </Box>
            <Box sx={{ marginBottom: "2rem" }}>
              <select
                value={videoPrivacyStatus}
                onChange={(e) => setVideoPrivacyStatus(e.target.value)}
              >
                <option value="">Privacy Status</option>
                {privacyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Box>
            <Box sx={{ marginBottom: "2rem" }}>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            </Box>
            <Box sx={{ marginBottom: "2rem" }}>
              <select
                value={videoCategory}
                onChange={(e) => setVideoCategory(e.target.value)}
              >
                <option value="">Category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Box>
            <Box sx={{ marginBottom: "2rem" }}>
              <label>
                <input
                  type="checkbox"
                  checked={videoMadeForKids}
                  onChange={(e) => setVideoMadeForKids(e.target.checked)}
                />
                <span style={{ marginLeft: "8px" }}> Made for Kids </span>
              </label>
            </Box>
            <Button
              variant="contained"
              color="error"
              startIcon={<CloudUploadIcon />}
              disabled={
                uploading ||
                !videoTitle ||
                !videoDescription ||
                !videoPrivacyStatus ||
                !videoFile ||
                !videoCategory
              }
              onClick={handleUpload}
            >
              {uploading ? "Uploading Video..." : "Upload Video"}
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default YoutubeUploadPage;
