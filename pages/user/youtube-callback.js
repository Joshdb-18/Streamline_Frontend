import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function YoutubeCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { state } = router.query;

    if (state) {
      // Make a request to the API route
      axios
        .post("../api/youtube-callback", {
          token,
          state,
        })
        .then((response) => {
          if (response.data.success) {
            router.push("../aggregator/youtube");
          } else {
            console.error("Failed to process YouTube callback");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [router.query]);

  return (
    <div>
      <h1>YouTube Callback</h1>
      <p>Please wait while we redirect you to the appropriate page</p>
    </div>
  );
}
