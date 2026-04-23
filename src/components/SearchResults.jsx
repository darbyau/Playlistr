import TrackList from "./TrackList";

function SearchResults(props) {
  return (
    <div className="search-results">
      <TrackList searchResults={props.searchResults} addTrack={props.addTrack}   playlistTracks={props.playlistTracks}/>
    </div>
  );
}

export default SearchResults;
