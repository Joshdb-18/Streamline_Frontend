import axios from "axios";
import formidable from "formidable";
import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = req.headers.authorization.replace("Token ", "");

    // Step 1: Request credentials from the backend
    try {
      const response = await axios.get("https://backend.devnetwork.tech/api/v1/youtube/upload/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const credentials = response.data.credentials;
      const oauthClient = new google.auth.OAuth2();
      oauthClient.setCredentials(credentials);

      // Step 2: Upload the video directly to YouTube
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
        const videoMadeForKids = fields.made_for_kids === "true"; // Convert to boolean

        const youtube = google.youtube({ version: "v3", auth: oauthClient });

        const videoInsertResponse = await youtube.videos.insert({
          part: "snippet,status",
          requestBody: {
            snippet: {
              title: videoTitle,
              description: videoDescription,
              categoryId: videoCategory,
            },
            status: {
              privacyStatus: videoPrivacyStatus,
              embeddable: true,
              publicStatsViewable: true,
              madeForKids: videoMadeForKids,
            },
          },
          media: {
            body: videoFile,
          },
        });

        console.log("Video uploaded:", videoInsertResponse.data);

        // Handle the response from the backend
        // (In this example, we assume the backend returns the processed video response)
        res.status(200).json({ success: true });
      });
    } catch (error) {
      console.error("An error occurred while getting YouTube credentials:", error);
      res.status(500).json({ success: false, error: "Failed to get YouTube credentials" });
    }
  } else {
    res.status(405).end();
  }
}
