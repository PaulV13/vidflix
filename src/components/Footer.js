import "./Footer.css";

import instagramIcon from "../assets/instagram_icon.svg";
import facebookIcon from "../assets/facebook_icon.svg";
import twitterIcon from "../assets/twitter_icon.svg";
import youtubeIcon from "../assets/youtube_icon.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-social-icon">
        <a
          href="https://www.instagram.com/netflixlat"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagramIcon} alt="icono instagram" />
        </a>
        <a
          href="https://es-la.facebook.com/NetflixLatino"
          target="_blank"
          rel="noreferrer"
        >
          <img src={facebookIcon} alt="icono facebook" />
        </a>
        <a
          href="https://twitter.com/netflixlat?lang=es"
          target="_blank"
          rel="noreferrer"
        >
          <img src={twitterIcon} alt="icono twitter" />
        </a>
        <a
          href="https://www.youtube.com/channel/UC5ZiUaIJ2b5dYBYGf5iEUrA"
          target="_blank"
          rel="noreferrer"
        >
          <img src={youtubeIcon} alt="icono youtube" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
