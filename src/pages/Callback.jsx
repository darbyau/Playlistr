import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/spotifyAuth";

export default function Callback({ setToken }) {
  const [message, setMessage] = useState("Processing Spotify login...");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      console.error("Spotify auth error:", error);
      setMessage("Spotify login failed. Please try again.");
      return;
    }

    if (!code) {
      navigate("/");
      return;
    }

    getAccessToken(code)
      .then((data) => {
        setToken(data.access_token);
        navigate("/");
      })
      .catch((err) => {
        console.error("Token exchange failed:", err);
        setMessage("Failed to complete login. Please try again.");
      });
  }, [navigate, setToken]);

  return (
    <main className="callback-page">
      <h1>Signing in with Spotify…</h1>
      <p>{message}</p>
    </main>
  );
}
