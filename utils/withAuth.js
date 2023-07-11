import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if the user is authenticated
      const cookies = parseCookies();
      const isAuthenticated = cookies.token ? true : false;

      if (!isAuthenticated) {
        // User is not authenticated, redirect to the login page
        router.push('/signin');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
