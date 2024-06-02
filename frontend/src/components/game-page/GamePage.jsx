import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GamePageTop from "../game-page-top/GamePageTop";
import MouseImageChoice from "../mouse-image-choice/MouseImageChoice";

export default function Game() {
  const location = useLocation();
  const chosenImage = location.state?.image;
  const [imageName, setImageName] = useState(null);
  const [imagesToFind, setImagesToFind] = useState([]);
  const imageRef = useRef(null);
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
      if (imageRef.current) {
        const width = imageRef.current.offsetWidth;
        const height = imageRef.current.offsetHeight;
        console.log("Width:", width, "Height:", height);
        setImageContainerSize({ width, height });
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <GamePageTop
        imagesToFind={imagesToFind}
        targetsFound={targetsFound}
        mouseCoordinates={mouseCoordinates}
        imageContainerSize={imageContainerSize}
      />

      <MouseImageChoice
        chosenImage={chosenImage}
        imageRef={imageRef}
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
