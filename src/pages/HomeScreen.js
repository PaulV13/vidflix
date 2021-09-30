import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../Requests";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

import "./HomeScreen.css";

function HomeScreen() {
  const show = useSelector((state) => state.show);

  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX_ORIGINALS"
        classNameOriginals="originals-panels-row"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      {show ? <Card /> : ""}
      <Footer />
    </div>
  );
}

export default HomeScreen;
