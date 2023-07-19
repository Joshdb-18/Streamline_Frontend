import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = req.headers.authorization.replace("Token ", "");

    const videoTitle = req.body.title;
    const videoDescription = req.body.description;
    const videoPrivacyStatus = req.body.privacy_status;
    const videoFile = req.files.video;
    const videoCategory = req.body.category;
    const videoMadeForKids = req.body.made_for_kids === "true"; // Convert to boolean

    // You may need to adjust the URL based on your backend API endpoint
    const apiUrl = "https://backend.devnetwork.tech/api/v1/youtube/upload/";

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("privacy_status", videoPrivacyStatus);
    formData.append("video", videoFile);
    formData.append("category", videoCategory);
    formData.append("made_for_kids", videoMadeForKids);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response from the backend
      res.status(200).json({ success: true });
    } catch (error) {
      // Handle any error that occurs during the video upload
      console.error("An error occurred during video upload:", error);
      res.status(500).json({ success: false, error: "Video upload failed" });
    }
  } else {
    res.status(405).end();
  }
}
