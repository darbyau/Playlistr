const clientId = "3c0bab622ed44ef9bb111b10902a4e27";
// const redirectUri = "http://127.0.0.1:5173/callback";
const redirectUri = window.location.origin + "/callback";

// ---------------- PKCE HELPERS ----------------

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => possible[x % possible.length])
    .join("");
};

const sha256 = async (plain) => {
  const data = new TextEncoder().encode(plain);
  return await crypto.subtle.digest("SHA-256", data);
};

const base64encode = (buffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

// ---------------- LOGIN FUNCTION ----------------

export const loginWithSpotify = async () => {
  // clear any stale auth state and force reauthorization
  localStorage.removeItem("access_token");
  localStorage.removeItem("code_verifier");

  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  // store verifier
  localStorage.setItem("code_verifier", codeVerifier);

  const scope = `user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private`;

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();

  window.location.href = authUrl.toString();
};

// ---------------- TOKEN EXCHANGE ----------------

export const getAccessToken = async (code) => {
  const codeVerifier = localStorage.getItem("code_verifier");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Token exchange error:", data);
    throw new Error(data.error_description || "Failed to get access token");
  }

  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
    console.log("Token saved to localStorage");
  } else {
    console.error("No access token in response:", data);
    throw new Error("No access token received");
  }

  return data;
};
