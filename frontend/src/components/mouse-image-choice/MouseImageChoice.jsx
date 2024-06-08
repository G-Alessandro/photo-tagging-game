import CancelImg from "../../assets/svg/cancel-green.svg";
import style from "./MouseImageChoice.module.css";

export default function MouseImageChoice({
  chosenImage,
  imageRef,
  imageName,
  targetsFound,
  setTargetFound,
  mouseCircle,
  setMouseCircle,
  mouseCoordinates,
  setMouseCoordinates,
  mouseCoordinatesToSend,
  setMouseCoordinatesToSend,
  imageContainerSize,
  targetListPosition,
  setTargetListPosition,
  imagesToFind,
}) {
  function mouseClick(e) {
    const clickX = e.nativeEvent.offsetX;
    const clickY = e.nativeEvent.offsetY;
    setMouseCircle(!mouseCircle);
    setMouseCoordinates({
      coordinateX: clickX,
      coordinateY: clickY,
    });
    if (!mouseCircle) {
      setMouseCoordinatesToSend({
        coordinateX: clickX,
        coordinateY: clickY,
      });
    }
    const listPosition = {
      bottom: "0px",
      right: "0px",
      left: "0px",
    };
    let bottomPx = 250;
    targetsFound.map((target) => (target.found ? (bottomPx -= 100) : ""));

    listPosition.left = clickX <= imageContainerSize.width / 2 ? "65px" : "";
    listPosition.right = clickX > imageContainerSize.width / 2 ? "120px" : "";
    listPosition.bottom =
      clickY >= imageContainerSize.height / 2 ? `${bottomPx}px` : "";
    setTargetListPosition(listPosition);
  }

  async function handleChoice(event, index) {
    event.preventDefault();
    const targetChose = `target_${index}`;
    const formData = {
      targetChose,
      imageContainerSize,
      mouseCoordinatesToSend,
      imageName,
    };
    try {
      const response = await fetch(`http://localhost:3000/game`, {
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
          updatedTargets[data.targetNumber - 1] = {
            found: data.result,
            coordinateX: data.coordinateX || null,
            coordinateY: data.coordinateY || null,
          };
          return updatedTargets;
        });
      }
    } catch (error) {
      console.error("Error requesting:", error);
    }
  }

  return (
    <div className={style.container} onClick={mouseClick}>
      {targetsFound.map(
        (target, index) =>
          target.found && (
            <div
              key={`target_${index}`}
              style={{
                position: "absolute",
                width: "40px",
                top: `${target.coordinateY + 120}px`,
                left: `${target.coordinateX - 20}px`,
              }}
            >
              <img src={CancelImg} alt={`image ${index + 1} found`} />
            </div>
          )
      )}
      <div
        className={style.mouseCircle}
        style={{
          visibility: mouseCircle ? "visible" : "hidden",
          top: `${
            mouseCoordinates.coordinateY +
            (imageContainerSize.width <= 500 ? 157 : 105)
          }px`,
          left: `${mouseCoordinates.coordinateX - 35}px`,
        }}
      >
        <div className={style.targetList} style={targetListPosition}>
          {imagesToFind.map(
            (image, index) =>
              !targetsFound[index].found && (
                <form
                  key={image.src}
                  onSubmit={(event) => handleChoice(event, index + 1)}
                >
                  <button className={style.targetButton} type="submit">
                    <img src={image.src} alt={image.alt} />
                  </button>
                </form>
              )
          )}
        </div>
      </div>
      <img src={chosenImage} className={style.gameImg} alt="" ref={imageRef} />
    </div>
  );
}
