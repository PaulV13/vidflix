import { useEffect, useState, useRef } from "react";
import axios from "../axios";
import {
  showAction,
  positionAction,
  movieAction,
  showPosterAction,
} from "../redux/user/actions";
import { useDispatch } from "react-redux";
import SliderControl from "../components/SliderControl";

import "./Row.css";

import arrowNext from "../assets/right_arrow_icon.svg";
import arrowPrev from "../assets/left_arrow_icon.svg";

function Row({ title, classNameOriginals, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original";
  const sliderContent = useRef(null);
  const sliderItem = useRef(null);
  const slider = useRef(null);
  const paginator = useRef(null);
  const [delayHandler, setDelayHandler] = useState(null);
  const dispatch = useDispatch();
  const widthDocument = window.innerWidth;
  const [oneSlide, setOneSlide] = useState(true);
  const [widthMovie, setWidthMovie] = useState(0);
  const [fadeNext, setFadeNext] = useState(true);
  const [fadePrev, setFadePrev] = useState(false);
  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [cantidadImagenesView, setCantidadImagenesView] = useState(0);
  const totalImagenes = 20;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    let indicadores = 0;

    if (widthDocument <= 499) {
      indicadores = Math.ceil(20 / 2);
      setWidthMovie(50);
      setCantidadImagenesView(2);
    } else if (widthDocument >= 500 && widthDocument < 799) {
      indicadores = Math.ceil(20 / 3);
      setWidthMovie(33.333333);
      setCantidadImagenesView(3);
    } else if (widthDocument >= 800 && widthDocument < 1099) {
      indicadores = Math.ceil(20 / 4);
      setWidthMovie(25);
      setCantidadImagenesView(4);
    } else if (widthDocument >= 1100 && widthDocument < 1399) {
      indicadores = Math.ceil(20 / 5);
      setWidthMovie(20);
      setCantidadImagenesView(5);
    } else if (widthDocument >= 1400) {
      indicadores = Math.ceil(20 / 6);
      setWidthMovie(16.66666667);
      setCantidadImagenesView(6);
    }

    paginator.current.textContent = "";

    for (var i = 1; i <= indicadores; i++) {
      const indicadorItem = document.createElement("li");
      paginator.current.appendChild(indicadorItem);
    }
    paginator.current.children[0].classList.add("active");
  }, [widthDocument]);

  const mouseEnter = ({ movie, isLargeRow, e }) => {
    setDelayHandler(
      setTimeout(() => {
        const elemento = e.target;
        const coords = elemento.getBoundingClientRect();

        const widthContent = sliderContent.current.clientWidth;

        const top = coords.top + window.scrollY - 100;
        const left = coords.left;
        const right = coords.right;

        const widthCard = elemento.width * 1.4;

        if (right > widthContent) {
          dispatch(
            positionAction({
              width: widthCard,
              top: top,
              left: left,
              transformOrigin: `center center`,
              transform: `translateX(-28%)`,
              opacity: 1,
            })
          );
        } else {
          if (left > 100) {
            dispatch(
              positionAction({
                width: widthCard,
                top: top,
                left: left,
                transformOrigin: `center center`,
                transform: `translateX(-15%)`,
                opacity: 1,
              })
            );
          } else {
            dispatch(
              positionAction({
                width: widthCard,
                top: top,
                left: left,
                transformOrigin: `center center`,
                transform: `none`,
                opacity: 1,
              })
            );
          }
        }

        dispatch(
          movieAction({
            movie: {
              id: movie.id,
              title: movie.name || movie.title,
              overview: movie.overview,
              backdrop_path: movie.backdrop_path,
              poster_path: movie.poster_path,
            },
          })
        );

        if (isLargeRow) {
          dispatch(showPosterAction(true));
        } else {
          dispatch(showAction(true));
        }
      }, 800)
    );
  };

  const mouseLeave = () => {
    clearTimeout(delayHandler);
  };

  const handleNext = () => {
    if (slider.current.children.length === 3) {
      setShowPrevArrow(true);
    }

    const indicadores = Array.from(paginator.current.children);
    const primerIndicador = indicadores[0];

    let indicadorActivo;

    indicadores.forEach((indicador) => {
      if (indicador.className === "active") {
        indicadorActivo = indicador;
      }
    });

    sliderContent.current.style.transition = "700ms all ease-out";

    if (oneSlide) {
      sliderContent.current.style.transform = `translate3d(-${
        widthMovie * cantidadImagenesView
      }%,0,0)`;
    } else {
      sliderContent.current.style.transform = `translate3d(-${
        widthMovie * (cantidadImagenesView + 1) + 100
      }%,0,0)`;
    }

    if (indicadorActivo.nextSibling) {
      indicadorActivo.nextSibling.classList.add("active");
      indicadorActivo.classList.remove("active");

      if (
        indicadorActivo.nextSibling.nextSibling === null &&
        fadeNext &&
        (cantidadImagenesView === 3 || cantidadImagenesView === 6)
      ) {
        sliderContent.current.style.transform = `translate3d(-${
          widthMovie * 3 + 100
        }%,0,0)`;
        setFadeNext(false);
        setFadePrev(true);
      }
    } else {
      primerIndicador.classList.add("active");
      indicadorActivo.classList.remove("active");
      setFadeNext(true);
      setFadePrev(false);
    }

    const transitionNext = () => {
      sliderContent.current.style.transition = "none";

      const peliculas = Array.from(sliderContent.current.children);
      const fragmentPeliculas = document.createDocumentFragment();
      const primerPelicula = peliculas[0];

      if (oneSlide) {
        const ultimaPelicula = peliculas[peliculas.length - 1];
        sliderContent.current.insertBefore(ultimaPelicula, primerPelicula);
        setOneSlide(false);
      } else {
        if (indicadorActivo.nextSibling) {
          if (
            indicadorActivo.nextSibling.nextSibling === null &&
            fadeNext &&
            (cantidadImagenesView === 3 || cantidadImagenesView === 6)
          ) {
            if (cantidadImagenesView === 3) {
              for (let i = 0; i <= cantidadImagenesView / 2; i++) {
                const pelicula = peliculas[i];
                fragmentPeliculas.appendChild(pelicula);
              }
            } else if (cantidadImagenesView === 6) {
              for (let i = 0; i <= 1; i++) {
                const pelicula = peliculas[i];
                fragmentPeliculas.appendChild(pelicula);
              }
            }
          } else {
            for (let i = 0; i <= cantidadImagenesView - 1; i++) {
              const pelicula = peliculas[i];
              fragmentPeliculas.appendChild(pelicula);
            }
          }
        } else {
          for (let i = 0; i <= cantidadImagenesView - 1; i++) {
            const pelicula = peliculas[i];
            fragmentPeliculas.appendChild(pelicula);
          }
        }

        sliderContent.current.appendChild(fragmentPeliculas);
      }

      sliderContent.current.style.transform = `translate3d(-${
        widthMovie * (cantidadImagenesView + 1)
      }%,0,0)`;

      sliderContent.current.removeEventListener(
        "transitionend",
        transitionNext
      );
    };

    sliderContent.current.addEventListener("transitionend", transitionNext);
  };

  const handlePrev = () => {
    sliderContent.current.style.transition = "700ms all ease-out";
    const indicadores = Array.from(paginator.current.children);
    const ultimoIndicador = indicadores[indicadores.length - 1];

    let indicadorActivo;

    indicadores.forEach((indicador) => {
      if (indicador.className === "active") {
        indicadorActivo = indicador;
      }
    });

    if (indicadorActivo.previousSibling) {
      indicadorActivo.previousSibling.classList.add("active");
      indicadorActivo.classList.remove("active");
      if (
        indicadorActivo.previousSibling.previousSibling === null &&
        fadePrev
      ) {
        if (cantidadImagenesView === 3) {
          sliderContent.current.style.transform = `translate3d(-${
            widthMovie * (cantidadImagenesView - 1)
          }%,0,0)`;
        } else {
          sliderContent.current.style.transform = `translate3d(-${
            widthMovie * (cantidadImagenesView - 1)
          }%,0,0)`;
        }
        setFadeNext(true);
        setFadePrev(false);
      } else {
        sliderContent.current.style.transform = `translate3d(-${widthMovie}%,0,0)`;
      }
    } else {
      ultimoIndicador.classList.add("active");
      indicadorActivo.classList.remove("active");
      sliderContent.current.style.transform = `translate3d(-${widthMovie}%,0,0)`;
      setFadePrev(true);
      setFadeNext(false);
    }

    const transitionPrev = () => {
      sliderContent.current.style.transition = "none";

      sliderContent.current.style.transform = `translate3d(-${
        widthMovie * (cantidadImagenesView + 1)
      }%,0,0)`;

      const peliculas = Array.from(sliderContent.current.children);
      const primerPelicula = peliculas[0];
      const fragmentPeliculas = document.createDocumentFragment();

      if (indicadorActivo.previousSibling) {
        if (
          indicadorActivo.previousSibling.previousSibling === null &&
          fadePrev
        ) {
          if (cantidadImagenesView === 3) {
            for (
              let i = totalImagenes - (cantidadImagenesView - 1);
              i <= totalImagenes - 1;
              i++
            ) {
              const pelicula = peliculas[i];
              fragmentPeliculas.appendChild(pelicula);
            }
          } else {
            for (let i = totalImagenes - 2; i <= totalImagenes - 1; i++) {
              const pelicula = peliculas[i];
              fragmentPeliculas.appendChild(pelicula);
            }
          }
        } else {
          for (
            let i = totalImagenes - cantidadImagenesView;
            i <= totalImagenes - 1;
            i++
          ) {
            const pelicula = peliculas[i];
            fragmentPeliculas.appendChild(pelicula);
          }
        }
      } else {
        for (
          let i = totalImagenes - cantidadImagenesView;
          i <= totalImagenes - 1;
          i++
        ) {
          const pelicula = peliculas[i];
          fragmentPeliculas.appendChild(pelicula);
        }
      }

      sliderContent.current.insertBefore(fragmentPeliculas, primerPelicula);

      sliderContent.current.removeEventListener(
        "transitionend",
        transitionPrev
      );
    };

    sliderContent.current.addEventListener("transitionend", transitionPrev);
  };

  return (
    <div
      className={`row row_title_card ${isLargeRow ? classNameOriginals : ""}`}
    >
      <h2 className="rowHeader">
        <a className="rowTitle" href="/">
          <div className="row-header-title">{title}</div>
        </a>
      </h2>
      <div className="rowContainer rowContainer_title_card">
        <div className="ptrack-container">
          <div className="rowContent">
            <div className="slider" ref={slider}>
              {showPrevArrow && (
                <SliderControl
                  handleFunction={handlePrev}
                  className="handle handlePrev activo"
                  arrowIcon={arrowPrev}
                  alt="arrow prev"
                />
              )}
              <ul className="pagination-indicator" ref={paginator}></ul>
              <div className="sliderMask showPeek">
                <div className="sliderContent" ref={sliderContent}>
                  {movies.map((movie) => {
                    return (
                      <div className="slider-item" key={movie.id}>
                        <div className="title-card">
                          <div className="img-container">
                            <img
                              loading="lazy"
                              onMouseEnter={(e) =>
                                mouseEnter({ e, movie, isLargeRow })
                              }
                              onMouseLeave={mouseLeave}
                              className="slider_img"
                              ref={sliderItem}
                              id={movie.id}
                              src={`${base_url}${
                                isLargeRow
                                  ? movie.poster_path
                                  : movie.backdrop_path
                              }`}
                              alt={movie.name || movie.title}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <SliderControl
                handleFunction={handleNext}
                className="handle handleNext activo"
                arrowIcon={arrowNext}
                alt="arrow next"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Row;
