import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CancelImg from "../../assets/images/svg/cancel-green.svg";
import style from "./Game.module.css";

export default function Game() {
  const location = useLocation();
  const chosenImage = location.state?.image;
  const [imagesToFind, setImagesToFind] = useState([]);
  const imageContainerRef = useRef(null);
  const [imageContainerSize, setImageContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const [mouseCircle, setMouseCircle] = useState(false);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    coordinateX: null,
    coordinateY: null,
  });
  const [targetListPosition, setTargetListPosition] = useState({
    bottom: null,
    left: null,
    right: null,
  });

  const [targetsFound, setTargetFound] = useState([false, false, false]);

  useEffect(() => {
    function targetsPath(path) {
      let lastSlashIndex = path.lastIndexOf("/");
      let updatedPath = path.substring(0, lastSlashIndex);

      const images = [];

      for (let i = 1; i < 4; i++) {
        images.push({
          src: `${updatedPath}/targets/target_${i}.jpg`,
          alt: `target to find number ${i}`,
        });
      }
      console.log(images)
      return images;
    }
    setImagesToFind(targetsPath(chosenImage));
  }, [chosenImage]);

  useEffect(() => {
    const updateSize = () => {
      if (imageContainerRef.current) {
        const width = imageContainerRef.current.offsetWidth;
        const height = imageContainerRef.current.offsetHeight;
        setImageContainerSize({ width, height });
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function mouseClick(e) {
    const clickX = e.nativeEvent.offsetX;
    const clickY = e.nativeEvent.offsetY;
    setMouseCircle(!mouseCircle);
    setMouseCoordinates({
      coordinateX: clickX,
      coordinateY: clickY,
    });
    const listPosition = {
      bottom: "0px",
      right: "0px",
      left: "0px",
    };

    listPosition.left = clickX <= imageContainerSize.width / 2 ? "65px" : "";
    listPosition.right = clickX > imageContainerSize.width / 2 ? "120px" : "";
    listPosition.bottom =
      clickY >= imageContainerSize.height / 2 ? "250px" : "";
    setTargetListPosition(listPosition);
  }

  return (
    <>
      <div className={style.topBarGame}>
        <Link to="/">Main Menu</Link>
        <div>
          <h2>Time: </h2>
        </div>
        <div>
          <h2>Find:</h2>
          <div className={style.targetsToFindContainer}>
            {imagesToFind.map((image, index) => (
              <div key={image.src} className={style.targetContainer}>
                {targetsFound[index] && (
                  <img
                    className={style.cancelImg}
                    src={CancelImg}
                    alt={`image ${index + 1} found`}
                  />
                )}
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
        <ul>
          <li>
            coordinateX: {mouseCoordinates.coordinateX} coordinateY:{" "}
            {mouseCoordinates.coordinateY}
          </li>
          <li> Container width: {imageContainerSize.width}</li>
          <li> Container height: {imageContainerSize.height}</li>
        </ul>
      </div>

      <div
        className={style.container}
        ref={imageContainerRef}
        onClick={mouseClick}
      >
        <div
          className={style.mouseTarget}
          style={{
            visibility: mouseCircle ? "visible" : "hidden",
            top: `${mouseCoordinates.coordinateY + 35}px`,
            left: `${mouseCoordinates.coordinateX - 35}px`,
          }}
        >
          <div className={style.targetList} style={targetListPosition}>
            {imagesToFind.map(
              (image, index) =>
                !targetsFound[index] && (
                  <button className={style.targetButton} key={image.src}>
                    <img src={image.src} alt={image.alt} />
                  </button>
                )
            )}
          </div>
        </div>
        <img src={chosenImage} className={style.gameImg} alt="" />
      </div>
    </>
  );
}
