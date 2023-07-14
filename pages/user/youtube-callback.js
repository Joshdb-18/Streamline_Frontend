import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function YoutubeCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Create the Authorization header
    const headers = {
      Authorization: `Token ${token}`,
    };
    const { state } = router.query;

    if (state) {
      // Make a request to the backend callback URL
      axios
        .get(
          `https://backend.devnetwork.tech/api/v1/youtube/callback?state=${state}`,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log(response.data);
          router.push("../aggregator/youtube");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [router.query]);

  return (
    <div>
      <h1>YouTube Callback</h1>
      <p>Please wait while we redirect you the the appropriate page</p>
    </div>
  );
}
