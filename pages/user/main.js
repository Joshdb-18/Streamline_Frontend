import React from "react";
import withAuth from "../../utils/withAuth";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
        fontSize: "1.2rem",
      }}
    >
      <h1>Welcome to Your Dashboard!</h1>
      <p>
        Congratulations! You have successfully logged in to your account. This
        is your personalized dashboard.
        <br />
        Here, you can access all the cool features and information tailored just
        for you.
      </p>
      <p>
        <strong>Some Cool Information:</strong>
        <br />
        - Your account information and settings
        <br />
        - Recent activities and notifications
        <br />
        - Personalized recommendations and suggestions
        <br />
        - Important updates and news
        <br />- Fun facts and trivia
      </p>
      <p>
        Get ready to explore and enjoy all the benefits of being part of our
        awesome community!
        <br />
        If you need any assistance, feel free to contact our support team.
      </p>
    </div>
  );
};

export default withAuth(Dashboard);
// export default Dashboard;