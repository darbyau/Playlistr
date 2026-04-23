// API calls (search, playlists)
const BASE_URL = "https://api.spotify.com/v1";

// Helper to get token
const getToken = () => {
  return localStorage.getItem("access_token");
};

// Generic fetch wrapper
const spotifyFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  // 👇 Handle expired token
  if (response.status === 401) {
    console.warn("Token expired. Logging out...");

    localStorage.removeItem("access_token");
    localStorage.removeItem("code_verifier");

    // redirect to login
    window.location.href = "/";
    return;
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Spotify API error");
  }

  return response.json();
};

// get current user info ----------------------------------------
export const getCurrentUser = async () => {
  return spotifyFetch("/me");
};

// Search for tracks ----------------------------------------
export const searchTracks = async (query) => {
  return spotifyFetch(
    `/search?type=track&q=${encodeURIComponent(query)}&limit=10`,
  );
};

// Get playlists ----------------------------------------
export const getPlaylists = async () => {
  return spotifyFetch(`/me/playlists`);
};

// Create playlist ----------------------------------------
export const createPlaylist = async (name) => {
  return spotifyFetch(`/me/playlists`, {
    method: "POST",
    body: JSON.stringify({
      name,
      public: false,
      description: "",
    }),
  });
};

// add tracks to playlist ----------------------------------------
export const addTracksToPlaylist = async (playlistId, uris) => {
  return spotifyFetch(`/playlists/${playlistId}/items`, {
    method: "POST",
    body: JSON.stringify({
      uris, // array of Spotify track URIs
    }),
  });
};



