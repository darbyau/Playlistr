import "../styles/playlistPanel.css";
import Track from "./Track";
import TrackList from "./TrackList";

function PlaylistPanel(props) {
  const playlistTracksElements = props.playlistTracks.map((track, index) => (
    <Track
      key={track.id}
      track={track}
      showAddButton={false} // Hide add button for playlist tracks
      removeTrack={props.removeTrack}
      trackIndex={index}
    />
  ));

  return (
    <section className="playlist-panel">
      <div>
        <form action="">
          <input
            className="playlist-input"
            type="text"
            placeholder="Enter playlist name..."
            value={props.playlistName}
            onChange={(e) => props.setPlaylistName(e.target.value)}
          />
        </form>
        <hr />
        <div className="top">
          <p>{props.playlistTracks.length} songs</p>
          <button onClick={props.clearSearchResults}>Clear</button>
        </div>
      </div>
      <div className="playlist-tracks">
        <div className="playlist-tracks_container">
          {playlistTracksElements}
        </div>
      </div>
      <button onClick={props.createPlaylist}>Save to Spotify</button>
    </section>
  );
}

export default PlaylistPanel;
