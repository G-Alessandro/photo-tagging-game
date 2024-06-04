import { useNavigate } from "react-router-dom";
import style from "./VictoryScreen.module.css";

export default function VictoryScreen({ time, imageName}) {
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
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3000/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Navigating to home");
        navigate("/");
      }
    } catch (error) {
      console.error("Error requesting:", error);
    }
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <h2>Congratulations you found all the images!</h2>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <p>Time Score</p>
        <p>
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
        <button type="submit" >Save</button>
      </form>
    </div>
  );
}
