import { useNavigate } from "react-router-dom";
import PartyPopperLeftSvg from "../../assets/svg/party-popper-left.svg";
import PartyPopperRightSvg from "../../assets/svg/party-popper-right.svg";
import style from "./VictoryScreen.module.css";

export default function VictoryScreen({ time, imageName }) {
  const navigate = useNavigate();
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const today = new Date();

    const formData = {
      imageName: imageName,
      username: event.target.username.value,
      time: time,
      timestamp: today,
    };
    try {
      const response = await fetch("https://photo-tagging-game-the-odin-project.fly.dev/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error requesting:", error);
    }
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={style.victoryMessageContainer}>
          <img src={PartyPopperLeftSvg} />
          <h2>Congratulations you found all the images!</h2>
          <img src={PartyPopperRightSvg} alt="" />
        </div>
        <div className={style.victoryUsernameContainer}>
          <label htmlFor="username">USERNAME</label>
          <input type="text" id="username" name="username" placeholder="Enter a name"/>
        </div>
        <div className={style.victoryTimeContainer}>
          <h2>TIME SCORE</h2>
          <p>
            {hours}h {minutes.toString().padStart(2, "0")}m{" "}
            {seconds.toString().padStart(2, "0")}s{" "}
            {milliseconds.toString().padStart(2, "0")}ms
          </p>
        </div>
        <button type="submit">SAVE</button>
      </form>
    </div>
  );
}
