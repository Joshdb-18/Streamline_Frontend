import { useEffect } from "react";
import { useRouter } from "next/router";

export default function YoutubeCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { state } = router.query;

    const fetchData = async () => {
      if (state) {
        try {
          const response = await fetch("../api/youtube-callback", {
            method: "POST",
            body: JSON.stringify({
              state,
              token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const responseData = await response.json();
          if (response.ok) {
            router.push("../aggregator/youtube");
          } else {
            console.error(responseData.error);
            console.log(state);
            console.log(token);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [router.query]);

  return (
    <div>
      <p>Please wait while we redirect you to the appropriate page</p>
    </div>
  );
}
