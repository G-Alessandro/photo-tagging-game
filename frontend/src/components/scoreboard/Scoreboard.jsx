import { useRef, useEffect, useState } from "react";
import SearchSVG from "../../assets/svg/search.svg";
import style from "./Scoreboard.module.css";

export default function Scoreboard() {
  const [usersScore, setUsersScore] = useState(null);
  const [chosenScoreImage, setChosenScoreImage] = useState(
    "monster_hunter_world"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const scoresContainerRef = useRef(null);
  const scoreRefs = useRef([]);

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

  const handleSearch = () => {
    const index = usersScore.findIndex(
      (score) => score.username.toLowerCase() === searchTerm.toLowerCase()
    );
    if (index !== -1) {
      const score = scoreRefs.current[index];
      const scoreContainer = scoresContainerRef.current;

      if (score && scoreContainer) {
        const itemTop = score.offsetTop;
        const itemHeight = score.offsetHeight;
        const containerHeight = scoreContainer.offsetHeight;
        const scrollPosition = itemTop - containerHeight / 2 + itemHeight / 2;

        scoreContainer.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    } else {
      alert("Name not found");
    }
  };

  return (
    <div className={style.scoreboardContainer}>
      <h2>SCOREBOARD</h2>
      <div>
        <select onChange={changeScores}>
          <option value="monster_hunter_world">Monster Hunter World</option>
          <option value="monster_hunter_world_iceborne">
            Monster Hunter World Iceborne
          </option>
          <option value="ad_2222_character">AD 2222 Character</option>
          <option value="universe_113_infested">Universe 113 Infested</option>
        </select>
        <div>
          <input
            type="text"
            placeholder="Search Player Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>
            <img
              src={SearchSVG}
              className={style.searchSVG}
              alt="search player name"
            />
          </button>
        </div>
      </div>
      <dir
        ref={scoresContainerRef}
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid black",
        }}
      >
        {usersScore &&
          usersScore.map((score, index) => {
            const hours = Math.floor(score.time / 360000);
            const minutes = Math.floor((score.time % 360000) / 6000);
            const seconds = Math.floor((score.time % 6000) / 100);
            const milliseconds = score.time % 100;
            return (
              <div
                key={score.username + index}
                ref={(el) => (scoreRefs.current[index] = el)}
              >
                <p>{index + 1}</p>
                <p>{score.username}</p>
                <p>
                  {hours}:{minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}:
                  {milliseconds.toString().padStart(2, "0")}
                </p>
                <p>{score.timestamp}</p>
              </div>
            );
          })}
        {usersScore === null ||
          (usersScore.length === 0 && <p>No score aviable</p>)}
      </dir>
    </div>
  );
}
