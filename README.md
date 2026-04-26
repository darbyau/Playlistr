# Playlistr 

A React web app that lets you search the Spotify library, build a custom playlist, and save it directly to your Spotify account.

## 🔗 Try it

[link](playlistr-site.netlify.app)

## 🛠️ Technologies Used

- **React** — component-based UI
- **Vite** — build tool and dev server
- **Spotify Web API** — search and playlist management
- **OAuth 2.0 (PKCE)** — secure user authentication

## Features

- 🔍 Search for songs by title, artist, or album
- 🎵 View track details including song title, artist, and album
- ➕ Add songs to a custom playlist
- ➖ Remove songs from your playlist
- 💾 Save your playlist directly to your Spotify account
- 🔐 Secure login via Spotify OAuth 2.0 (PKCE flow)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A [Spotify Developer](https://developer.spotify.com/dashboard) account and registered app

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/playlistr.git
   cd playlistr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_client_id_here
   VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
   ```

4.  🔑 Spotify Developer Setup
Go to the Spotify Developer Dashboard
Create an app
Add redirect URI:
    ```
    http://127.0.0.1:5173/callback
    ```
    Copy your Client ID into:
    ```
    spotifyAuth.js
    ```


5. Start the dev server:
   ```bash
   npm run dev
   ```




## 🔮 Future Work

- [ ] Deploy to Netlify or Vercel
- [ ] Search by genre or mood
- [ ] Preview 30-second audio clips
- [ ] Edit existing Spotify playlists
- [ ] Display album artwork for each track

