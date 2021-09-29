import "./SliderControl.css";

function SliderControl({ handleFunction, className, arrowIcon, alt }) {
  const handleControl = () => {
    handleFunction();
  };

  return (
    <span className={className} onClick={handleControl}>
      <img className="indicator-icon" src={arrowIcon} alt={alt}></img>
    </span>
  );
}

export default SliderControl;
