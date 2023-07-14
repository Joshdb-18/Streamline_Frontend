// utils/withAuth.js
const withAuth = (WrappedComponent) => {
  const getServerSideProps = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // If the token is not present, redirect to the signin page
    if (!token) {
      return {
        redirect: {
          to: "/signin",
        },
      };
    }

    // Return the token
    return {
      props: {
        token: token,
      },
    };
  };

  return WrappedComponent;
};

export default withAuth;
