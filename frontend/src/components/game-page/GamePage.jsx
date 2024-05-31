import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MouseImageChoice from "../mouse-image-choice/MouseImageChoice";
import CancelImg from "../../assets/svg/cancel-green.svg";
import style from "./GamePage.module.css";

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
  const [mouseCoordinatesToSend, setMouseCoordinatesToSend] = useState({
    coordinateX: null,
    coordinateY: null,
  });
  const [targetListPosition, setTargetListPosition] = useState({
    bottom: null,
    left: null,
    right: null,
  });

  const [targetsFound, setTargetFound] = useState([
    { found: false, coordinateX: null, coordinateY: null },
    { found: false, coordinateX: null, coordinateY: null },
    { found: false, coordinateX: null, coordinateY: null },
  ]);

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
                {targetsFound[index].found && (
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
      <MouseImageChoice
        chosenImage={chosenImage}
        imageContainerRef={imageContainerRef}
        imageName={imageName}
        targetsFound={targetsFound}
        setTargetFound={setTargetFound}
        mouseCircle={mouseCircle}
        setMouseCircle={setMouseCircle}
        mouseCoordinates={mouseCoordinates}
        setMouseCoordinates={setMouseCoordinates}
        mouseCoordinatesToSend={mouseCoordinatesToSend}
        setMouseCoordinatesToSend={setMouseCoordinatesToSend}
        imageContainerSize={imageContainerSize}
        targetListPosition={targetListPosition}
        setTargetListPosition={setTargetListPosition}
        imagesToFind={imagesToFind}
      />
    </>
  );
}
