import axios from 'axios';
import Cookies from 'js-cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      // Make a POST request to the backend reset password endpoint
      const response = await axios.post('https://backend.devnetwork.tech/api/v1/reset_password/', {
        email,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-From': 'joshdb-18-obscure-space-chainsaw-pqjqrjg9vwpf76q7-3001.preview.app.github.dev',
        },
      });

      // Handles the response from the backend API
      const responseData = response.data;

      if (responseData.success) {
        const { uidb64, token: passwordToken } = responseData;
        // Set cookies with a 15-minute expiration
        const expirationMinutes = 15;
        const expirationInDays = expirationMinutes / (24 * 60); // Convert minutes to days
        const expirationFraction = 1 / expirationInDays;

        Cookies.set('uidb64', uidb64, { expires: expirationFraction });
        Cookies.set('passwordToken', passwordToken, { expires: expirationFraction });
        
        // Return a response indicating success
        const header = Cookies.get('uidb64');
        const token = Cookies.get('passwordToken');
        console.log(header, token)
        return res.status(200).json({ success: true });
      } else {
        // Return a response indicating an error
        return res.status(500).json({ error: responseData.message });
      }
    } catch (error) {
      // Handle errors that occur during the password reset process
      console.error(error);

      // Return a response indicating an error
      return res.status(500).json({ error: 'An error occurred during password reset.' });
    }
  }

  // Return a response for unsupported HTTP methods
  return res.status(405).json({ error: 'Method Not Allowed' });
}
