import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;
      
      // Make a POST request to the backend signup endpoint
      const response = await axios.post('http://127.0.0.1:8080/api/v1/register/', {
        username,
        email,
        password,
      });

      // Handles the response from the backend API
      console.log(response.data);

      // Return a response indicating success
      return res.status(200).json({ success: true });
    } catch (error) {
      // Handle errors that occur during the signup process
      console.error(error);

      // Return a response indicating an error
      return res.status(500).json({ error: 'An error occurred during signup' });
    }
  }

  // Return a response for unsupported HTTP methods
  return res.status(405).json({ error: 'Method Not Allowed' });
}
