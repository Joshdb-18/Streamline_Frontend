import axios from "axios";
import formidable from "formidable";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = req.headers.authorization.replace("Token ", "");

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("An error occurred while parsing form data:", err);
        res.status(400).json({ success: false, error: "Bad Request" });
        return;
      }

      const videoTitle = fields.title;
      const videoDescription = fields.description;
      const videoPrivacyStatus = fields.privacy_status;
      const videoFile = files.video;
      const videoCategory = fields.category;
      const videoMadeForKids = fields.made_for_kids === "true";

      const apiUrl = "https://backend.devnetwork.tech/api/v1/youtube-upload/";

      const formData = new FormData();
      formData.append("title", videoTitle);
      formData.append("description", videoDescription);
      formData.append("privacy_status", videoPrivacyStatus);
      formData.append("video", videoFile, videoFile.name);
      formData.append("category", videoCategory);
      formData.append("made_for_kids", videoMadeForKids);

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        });

        // Handle the response from the backend
        res.status(200).json({ success: true });
      } catch (error) {
        // Handle any error that occurs during the video upload
        console.error("An error occurred during video upload:", error);
        res.status(500).json({ success: false, error: "Video upload failed" });
      }
    });
  } else {
    res.status(405).end();
  }
}
