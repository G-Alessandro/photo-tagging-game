import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Game.module.css";

export default function Game() {
  const location = useLocation();
  const chosenImage = location.state?.image;
  const [imagesToFind, setImagesToFind] = useState([]);
  const [mouseCircle, setMouseCircle] = useState(false);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    coordinateX: null,
    coordinateY: null,
  });

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
      return images;
    }

    setImagesToFind(targetsPath(chosenImage));
  }, [chosenImage]);

  function mouseClick(e) {
    setMouseCircle(!mouseCircle);
    setMouseCoordinates({
      coordinateX: e.nativeEvent.offsetX,
      coordinateY: e.nativeEvent.offsetY,
    });
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
          <div className={style.imagesToFindContainer}>
            {imagesToFind.map((image) => (
              <div key={image.src}>
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
          <li> Screen width: {window.innerWidth}</li>
          <li> Screen height: {window.innerHeight}</li>
        </ul>
      </div>

      <div className={style.container} onClick={mouseClick}>
        <div
          className={style.mouseTarget}
          style={{
            visibility: mouseCircle ? "visible" : "hidden",
            top: `${mouseCoordinates.coordinateY + 35}px`,
            left: `${mouseCoordinates.coordinateX - 35}px`,
          }}
        >
          <div className={style.targetList}>
            <button className={style.targetButton}>
              <img src="" alt="" />
            </button>
            <button className={style.targetButton}>
              <img src="" alt="" />
            </button>
            <button className={style.targetButton}>
              <img src="" alt="" />
            </button>
          </div>
        </div>
        <img src={chosenImage} className={style.gameImg} alt="" />
      </div>
    </>
  );
}
