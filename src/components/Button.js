import "./Button.css";

function Button({ icon, classStyle = "button" }) {
  return (
    <a href="/" className={classStyle} alt="">
      <img className="icon" src={icon} alt="" />
    </a>
  );
}

export default Button;
