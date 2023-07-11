import { useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if the user is authenticated
      const cookies = parseCookies();
      const isAuthenticated = cookies.token ? true : false;

      if (!isAuthenticated) {
        // User is not authenticated, redirect to the login page
        router.push("/signin");
      }
    }, []); // Add an empty dependency array to ensure this effect runs only on the initial server-side render

    // Return null to prevent rendering the component on the server-side
    if (typeof window === "undefined") {
      return null;
    }

    // Return the wrapped component for client-side rendering
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
