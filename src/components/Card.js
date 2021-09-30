import { useSelector, useDispatch } from "react-redux";
import { showAction } from "../redux/user/actions";

import Button from "../components/Button";

import iconAdd from "../assets/icon_add.png";
import iconPlay from "../assets/icon_play.png";
import iconLike from "../assets/icon_like.png";
import iconDislike from "../assets/icon_dislike.png";
import iconDown from "../assets/icon_down.png";

import "./Card.css";

function Card() {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.position);
  const movie = useSelector((state) => state.movie);

  const handleLeave = () => {
    dispatch(showAction(false));
  };

  return (
    <div className="previewModal--wrapper mini-modal">
      <div
        className={"card mini-modal"}
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
        <div className="card_img_container">
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <img
                className="card_poster-hover"
                src={
                  movie
                    ? `https://image.tmdb.org/t/p/original/${
                        movie.movie.backdrop_path || movie.movie.poster_path
                      }`
                    : "https://p4.wallpaperbetter.com/wallpaper/99/890/332/black-background-leather-wallpaper-preview.jpg"
                }
                alt=""
              />
            </div>
          </div>
          <div
            className="videoMerchPlayer--boxart-wrapper"
            style={{ position: "static" }}
          >
            <img
              className="previewModal--boxart"
              src={
                movie
                  ? `https://image.tmdb.org/t/p/original/${
                      movie.movie.backdrop_path || movie.movie.poster_path
                    }`
                  : "https://p4.wallpaperbetter.com/wallpaper/99/890/332/black-background-leather-wallpaper-preview.jpg"
              }
              alt=""
            />
          </div>
        </div>

        <div className="card_info">
          <div className="card_info_icons">
            <div className="card_icons_izq">
              <Button icon={iconPlay} classStyle="button_play" />
              <Button icon={iconAdd} />
              <Button icon={iconLike} />
              <Button icon={iconDislike} />
            </div>
            <div className="card_info_der">
              <Button icon={iconDown} />
            </div>
          </div>
          <h1 className="card_info_title">
            {movie ? movie.movie.title : "TITULO"}
          </h1>
          <p className="card_info_description">
            {movie.movie.genres.map((genre) => {
              return (
                <div className="card_info_description_genres">
                  <span className="card_info_separetor"></span>
                  <div className="card_info_genre">{genre}</div>
                </div>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
