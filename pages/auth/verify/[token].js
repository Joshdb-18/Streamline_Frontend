import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loader } from 'react-loader-spinner';

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Make a POST request to your backend to verify the email
        const response = await fetch('https://backend.devnetwork.tech/api/v1/verify/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          // Verification is successful
          // Display a success message
          console.log('Email verification successful');
          // Redirect the user to the login page or a dashboard
          router.push('/login');
        } else {
          // Verification failed
          // Display an error message
          console.error('Email verification failed');
          // You can choose to redirect the user to an error page or display an error message on the verification page
        }
      } catch (error) {
        // Handle any network or other errors that occur during verification
        console.error('An error occurred during email verification', error);
        // You can choose to redirect the user to an error page or display an error message on the verification page
      } finally {
        // Set loading to false after verification is complete
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        {loading ? (
          <div className="flex items-center justify-center mb-6">
            <Loader type="Oval" color="#4f46e5" height={40} width={40} />
            <p className="text-lg ml-3">Verifying your email address...</p>
          </div>
        ) : (
          <p className="text-lg mb-6">
            Your email has been verified. You can now proceed to login.
          </p>
        )}
      </div>
    </div>
  );
}
