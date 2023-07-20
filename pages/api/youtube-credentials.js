import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token } = req.body;

    const headers = {
      Authorization: `Token ${token}`,
    };

    try {
      // Fetch the YouTube credentials from the backend using the user's token
      const response = await axios.get(
        "https://backend.devnetwork.tech/api/v1/youtube-credentials/",
        {
          headers: headers,
        }
      );

      const credentials = response.data.credentials;

      // Return the credentials as a response
      res.status(200).json({ credentials });
    } catch (error) {
      console.error("Failed to fetch YouTube credentials:", error.message);
      res.status(500).json({ error: "Failed to fetch YouTube credentials" });
    }
  } else {
    res.status(405).end();
  }
}
