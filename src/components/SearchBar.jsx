import "../styles/searchBar.css";
import SearchResults from "./SearchResults";

function SearchBar(props) {
  return (
    <>
      <section className="search-bar">
        <h1>Discover Music</h1>
        <p>Search and add songs to your playlist</p>
        <form action={props.handleSearch}>
          <input
            name="search"
            type="text"
            placeholder="Search songs, artists, or albums"
          />
        </form>
        <SearchResults
          searchResults={props.searchResults}
          addTrack={props.addTrack}
          playlistTracks={props.playlistTracks}
        />
      </section>
    </>
  );
}

export default SearchBar;
