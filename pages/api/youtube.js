import axios from "axios";

export default async function handler(req, res) {
  const { token } = req.body;

  // Create the Authorization header
  const headers = {
    Authorization: `Token ${token}`,
  };
  try {
    // Make a GET request to the backend YouTube videos endpoint
    const response = await axios.get(
      "https://backend.devnetwork.tech/api/v1/youtube/uploaded-videos/",
      {
        headers: headers,
      }
    );

    // Retrieve the videos from the response
    const { videos } = response.data;

    // Return the videos as the API response
    return res.status(200).json(videos);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("An error occurred while fetching YouTube videos:", error);

    // Return an error response
    return res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
}
