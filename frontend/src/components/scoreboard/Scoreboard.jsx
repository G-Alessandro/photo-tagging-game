import { useEffect, useState } from "react";

export default function Scoreboard() {
  const [usersScore, setUsersScore] = useState(null);
  const [chosenScoreImage, setChosenScoreImage] = useState(
    "monster_hunter_world"
  );

  useEffect(() => {
    fetch(`http://localhost:3000/score/${chosenScoreImage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsersScore(data));
  }, [chosenScoreImage]);

  function changeScores(event) {
    setChosenScoreImage(event.target.value);
  }

  return (
    <div>
      <select onChange={changeScores}>
        <option value="monster_hunter_world">Monster Hunter World</option>
        <option value="monster_hunter_world_iceborne">
          Monster Hunter World Iceborne
        </option>
        <option value="ad_2222_character">AD 2222 Character</option>
        <option value="universe_113_infested">Universe 113 Infested</option>
      </select>

      {usersScore &&
        usersScore.map((score) => {
          const hours = Math.floor(score.time / 360000);
          const minutes = Math.floor((score.time % 360000) / 6000);
          const seconds = Math.floor((score.time % 6000) / 100);
          const milliseconds = score.time % 100;
          return (
            <div key={score.username + score.timestamp}>
              <p>{score.username}</p>
              <p>
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
                {milliseconds.toString().padStart(2, "0")}
              </p>
            </div>
          );
        })}
      {usersScore === null ||
        (usersScore.length === 0 && <p>No score aviable</p>)}
    </div>
  );
}
