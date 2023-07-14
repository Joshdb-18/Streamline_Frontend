import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // Make a POST request to the backend signup endpoint
      const response = await axios.post(
        "https://backend.devnetwork.tech/api/v1/login/",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handles the response from the backend API
      const responseData = response.data;

      if (responseData.success) {
        const { token } = responseData;

        // Return the token to the client environment
        return res.status(response.status).json({ token: token });
      } else {
        // Return a response indicating an error
        return res
          .status(response.status)
          .json({ error: responseData.message });
      }
    } catch (error) {
      // Handle errors that occur during the signup process
      console.error(error);

      // Return a response indicating an error
      return res.status(500).json({ error: error.message });
    }
  }

  // Return a response for unsupported HTTP methods
  return res.status(405).json({ error: "Method Not Allowed" });
}
