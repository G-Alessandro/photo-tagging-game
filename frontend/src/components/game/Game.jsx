import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CancelImg from "../../assets/svg/cancel-green.svg";
import style from "./Game.module.css";

export default function Game() {
  const location = useLocation();
  const chosenImage = location.state?.image;
  const [imageName, setImageName] = useState(null);
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
    let lastSlashIndex = chosenImage.lastIndexOf("/");
    let lastDotIndex = chosenImage.lastIndexOf(".");
    let updatedPath = chosenImage.substring(0, lastSlashIndex);
    const imageNameNoPath = chosenImage.slice(lastSlashIndex + 1, lastDotIndex);
    const images = [];

    for (let i = 1; i < 4; i++) {
      images.push({
        src: `${updatedPath}/targets/target_${i}.jpg`,
        alt: `target to find number ${i}`,
      });
    }
    setImageName(imageNameNoPath);
    setImagesToFind(images);
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

  async function handleChoice(event, index) {
    event.preventDefault();
    const targetChose = `target_${index}`;
    const formData = {
      targetChose,
      imageContainerSize,
      mouseCoordinates,
      imageName,
    };
    try {
      const response = await fetch("http://localhost:3000/game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        setTargetFound((prev) => {
          const updatedTargets = [...prev];
          updatedTargets[index] = data.result;
          return updatedTargets;
        });
      }
    } catch (error) {
      console.error("Error requesting:", error);
    }
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
                  <form
                    key={image.src}
                    onSubmit={() => handleChoice(index + 1)}
                  >
                    <button className={style.targetButton} type="submit">
                      <img src={image.src} alt={image.alt} />
                    </button>
                  </form>
                )
            )}
          </div>
        </div>
        <img src={chosenImage} className={style.gameImg} alt="" />
      </div>
    </>
  );
}
