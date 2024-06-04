import { useEffect } from "react";
import { Link } from "react-router-dom";
import CancelImg from "../../assets/svg/cancel-green.svg";
import style from "./GamePageTop.module.css";

export default function GamePageTop({
  time,
  setTime,
  isRunning,
  setIsRunning,
  imagesToFind,
  targetsFound,
  mouseCoordinates,
  imageContainerSize,
}) {

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  return (
    <div className={style.topBarGame} >
      <Link to="/">Main Menu</Link>
      <div>
        <h2>Time: </h2>
        <p>
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
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
  );
}
