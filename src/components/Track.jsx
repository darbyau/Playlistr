import "../styles/track.css";
import Plus from "../assets/plus-icon.svg?react";
import RemoveIcon from "../assets/remove-icon.svg?react";
import { clsx } from "clsx";

function Track(props) {
  const showAddButton = props.showAddButton !== false;

  const artists = props.track.artists.map((artist) => artist.name);

  const displayArtists =
    artists.length > 1 && !showAddButton
      ? `${artists.slice(0, 1).join(", ")} +${artists.length - 1}`
      : artists.join(", ");

  return (
    <div
      className={clsx("track-card", {
        " track-card--in-playlist": !showAddButton,
      })}
    >
      {/* Left: Artwork */}
      {!showAddButton && props.trackIndex + 1}
      <div className="track-card__art">
        <img
          src={
            props.track.album.images?.[2]?.url ||
            props.track.album.images?.[0]?.url ||
            ""
          }
          alt=""
        />
      </div>
      {/* Middle: Track Info */}
      <div className="track-card__info">
        <h3 className="track-card__title">{props.track.name}</h3>
        <p className="track-card__artist">{displayArtists}</p>
        {showAddButton && (
          <p className="track-card__album">{props.track.album.name}</p>
        )}
      </div>
      {/* Right: Duration */}
      <div className="track-card__duration">
        <span>3:42</span>
      </div>
      {/* Action Button */}
      <button
        className={clsx("track-card__add-btn", {
          "track-card__remove-btn": !showAddButton,
        })}
        onClick={
          showAddButton
            ? () => props.addTrack(props.track)
            : () => props.removeTrack(props.track)
        }
      >
        {showAddButton ? (
          <Plus className="track-card__add-icon" />
        ) : (
          <RemoveIcon className="track-card__remove-icon" />
        )}
      </button>
    </div>
  );
}

export default Track;
