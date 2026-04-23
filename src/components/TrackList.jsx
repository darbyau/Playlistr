import Track from "./Track";
import "../styles/trackList.css";

function TrackList(props) {

const trackElements = props.searchResults.map(track => <Track key={track.id} track={track} addTrack={props.addTrack}   playlistTracks={props.playlistTracks}/>);

  return (
    <div className="track-list">
      <div className="track-list-inner">
        {trackElements}
      </div>
    </div>
  );
}

export default TrackList;
