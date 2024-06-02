import { Link } from "react-router-dom";
import CancelImg from "../../assets/svg/cancel-green.svg";
import style from "./GamePageTop.module.css";

export default function GamePageTop({
  imagesToFind,
  targetsFound,
  mouseCoordinates,
  imageContainerSize,
}) {
  return (
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
  );
}
