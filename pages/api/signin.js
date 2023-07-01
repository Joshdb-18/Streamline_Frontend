import cookie from 'cookie';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Make a POST request to the backend signup endpoint
      const response = await axios.post('https://backend.devnetwork.tech/api/v1/login/', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handles the response from the backend API
      const responseData = response.data;

      if (responseData.success) {
        const { token } = responseData;

        // Set the token as a cookie
        res.setHeader('Set-Cookie', cookie.serialize('token', token));

        // Return a response indicating success
        return res.status(200).json({ success: true });
      } else {
        // Return a response indicating an error
        return res.status(500).json({ error: responseData.message });
      }
    } catch (error) {
      // Handle errors that occur during the signup process
      console.error(error);

      // Return a response indicating an error
      return res.status(500).json({ error: 'Invalid credentials' });
    }
  }

  // Return a response for unsupported HTTP methods
  return res.status(405).json({ error: 'Method Not Allowed' });
}