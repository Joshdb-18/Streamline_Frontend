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

      console.log(response.data);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
