import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uidb64, token, password1, password2 } = req.body;

      // Make a POST request to the backend password update endpoint
      const response = await axios.post(
        "https://backend.devnetwork.tech/api/v1/reset_confirm/",
        {
          uidb64,
          token,
          password1,
          password2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handles the response from the backend API
      if (response.status === 200) {
        // Return a response indicating success
        return res.status(200).json({ success: true });
      } else {
        // Return a response indicating an error
        return res.status(response.status).json({ error: response.data.error });
      }
    } catch (error) {
      // Handle errors that occur during the password update verification process
      console.error(
        "An error occurred during password update verification",
        +error
      );

      // Return a response indicating an error
      return res.status(500).json({
        error: response.error,
      });
    }
  }

  // Return a response for unsupported HTTP methods
  return res.status(405).json({ error: "Method Not Allowed" });
}
