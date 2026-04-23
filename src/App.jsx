import { useState, useEffect, use } from "react";
import "./App.css";
import Logo from "./assets/note-icon.svg?react";
import SearchBar from "./components/SearchBar";
import PlaylistPanel from "./components/PlaylistPanel";
import Magnify from "./assets/magnify-icon.svg?react";
import { mockSearchResults } from "./mockSearchResults";
import { loginWithSpotify, getAccessToken } from "./utils/spotifyAuth";
import {
  getCurrentUser,
  searchTracks,
  getPlaylists,
  createPlaylist,
  addTracksToPlaylist,
} from "./utils/spotifyAPI";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [token, setToken] = useState(null);

  function addTrack(track) {
    setPlaylistTracks((prev) => {
      if (prev.some((savedTrack) => savedTrack.id === track.id))
        return prev; // Track already in playlist, do not add
      else {
        return [...prev, track]; // Add new track to playlist
      }
    });
  }

  function removeTrack(track) {
    setPlaylistTracks((prev) => {
      return prev.filter((savedTrack) => savedTrack.id !== track.id);
    });
  }

  // Search logic --------------------------------------------
  const handleSearch = async (formData) => {
    const input = formData.get("search")?.trim();

    if (!input) return;

    try {
      const results = await searchTracks(input);
      setSearchResults(results.tracks.items);
      console.log("Results:", results.tracks.items);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  useEffect(() => {
    console.log("searchResults:", searchResults);
  }, [searchResults]);

  // --------------------------------------------------------

  // callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");
    const storedToken = localStorage.getItem("access_token");

    if (error) {
      console.error("Spotify auth error:", error);
      e;
      return;
    }

    if (code) {
      console.log("Authorization code found, exchanging for token...");
      getAccessToken(code)
        .then((data) => {
          console.log("Token received:", data.access_token);
          setToken(data.access_token);
          window.history.replaceState({}, document.title, "/");
        })
        .catch((err) => {
          console.error("Token exchange failed:", err);
        });
    } else if (storedToken) {
      setToken(storedToken);
      console.log("Found stored token");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("code_verifier");
    setToken(null);
    window.location.href = "/";
  }

  useEffect(() => {
    console.log("Updated playlist tracks:", playlistTracks);
  }, [playlistTracks]);

  useEffect(() => {
    const testAPI = async () => {
      try {
        const user = await getCurrentUser();
        console.log("User:", user);

        const data = await getPlaylists();
        const userPlaylists = data.items.filter(
          (playlist) => playlist.owner.id === user.id,
        );

        console.log("My playlists:", userPlaylists);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) {
      testAPI();
    }
  }, [token]);

  useEffect(() => {
    console.log("Playlist name updated:", playlistName);
  }, [playlistName]);

  const handleCreatePlaylist = async () => {
    if (playlistTracks.length === 0) return;

    try {
      // 1. Create playlist
      const playlist = await createPlaylist(playlistName);
      console.log("Created playlist:", playlist);

      // 2. Extract URIs from selected tracks
      const uris = playlistTracks.map((track) => track.uri);

      // 3. Add tracks to playlist
      await addTracksToPlaylist(playlist.id, uris);

      console.log("Playlist created!");
      console.log("Playlist ID:", playlist.id);
      console.log("URIs:", uris);
    } catch (err) {
      console.error("Failed to create playlist:", err);
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setPlaylistName("");
    setPlaylistTracks([]);
  }

  return (
    <main className="app">
      {!token && (
        <div className="login-overlay">
          <button className="login-button" onClick={loginWithSpotify}>
            Login with Spotify
          </button>
        </div>
      )}
      <section className="sidebar">
        <div className="brand">
          <div className="logo-container">
            <Logo className="logo" />
          </div>
          <span>Playlistr</span>
        </div>
        <button className="search-button">
          <Magnify className="search-icon" />
          <span>Search</span>
        </button>
        {token && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
        <div className="playlist-tracks-total">
          <p>Tracks in playlist</p>
          <h3>{playlistTracks.length}</h3>
        </div>
      </section>
      <SearchBar
        searchResults={searchResults}
        addTrack={addTrack}
        playlistTracks={playlistTracks}
        handleSearch={handleSearch}
      />
      <PlaylistPanel
        playlistName={playlistName}
        setPlaylistName={setPlaylistName}
        playlistTracks={playlistTracks}
        removeTrack={removeTrack}
        createPlaylist={handleCreatePlaylist}
        clearSearchResults={clearSearchResults}
      />
    </main>
  );
}

export default App;
