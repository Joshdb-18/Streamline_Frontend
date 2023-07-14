import axios from "axios";

export default async function handler(req, res) {
  const { token, state } = req.body;

  if (state) {
    try {
      // Make a request to the backend callback URL
      const response = await axios.get(
        `https://backend.devnetwork.tech/api/v1/youtube/callback?state=${state}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      // Check the response status
      if (response.status === 200) {
        res.status(200).json({ success: true });
      } else {
        res
          .status(response.status)
          .json({ error: "Failed to process YouTube callback" });
      }
    } catch (error) {
      console.error("Error:", error.response);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
