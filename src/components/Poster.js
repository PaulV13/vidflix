import { useSelector, useDispatch } from "react-redux";
import { showPosterAction } from "../redux/user/actions";

import Button from "../components/Button";

import iconAdd from "../assets/icon_add.png";
import iconPlay from "../assets/icon_play.png";

import "./Poster.css";

function Poster() {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.position);
  const movie = useSelector((state) => state.movie);

  const handleLeave = () => {
    dispatch(showPosterAction(false));
  };

  return (
    <div
      className={"poster mini-modal"}
      style={
        position
          ? {
              width: position.width,
              top: position.top,
              left: position.left,
              transformOrigin: position.transformOrigin,
              transform: position.transform,
              opacity: position.opacity,
            }
          : {}
      }
      onMouseLeave={handleLeave}
    >
      <img
        className="poster_img"
        src={
          movie
            ? `https://image.tmdb.org/t/p/original/${movie.movie.poster_path}`
            : "https://p4.wallpaperbetter.com/wallpaper/99/890/332/black-background-leather-wallpaper-preview.jpg"
        }
        alt=""
      />
      <div className="poster_info">
        <div className="poster_info_icons">
          <div className="poster_icons_izq">
            <Button icon={iconPlay} classStyle="button_play" />
            <Button icon={iconAdd} />
          </div>
        </div>
        <h1 className="poster_info_title">
          {movie ? movie.movie.title : "TITULO"}
        </h1>
      </div>
    </div>
  );
}

export default Poster;
