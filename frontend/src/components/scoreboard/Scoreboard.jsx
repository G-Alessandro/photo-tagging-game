import { useRef, useEffect, useState } from "react";
import SearchSVG from "/assets/svg/search.svg";
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
    fetch(
      `https://photo-tagging-game-the-odin-project.fly.dev/score/${chosenScoreImage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
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
    }
  };

  return (
    <div className={style.scoreboardContainer}>
      <h2>SCOREBOARD</h2>
      <div className={style.scoreboard}>
        <div className={style.selectSearchContainer}>
          <select onChange={changeScores}>
            <option value="monster_hunter_world">Monster Hunter World</option>
            <option value="monster_hunter_world_iceborne">
              Monster Hunter World Iceborne
            </option>
            <option value="ad_2222_character">AD 2222 Character</option>
            <option value="universe_113_infested">Universe 113 Infested</option>
          </select>
          <div className={style.searchContainer}>
            <input
              type="text"
              placeholder="Search Player Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={style.inputSearch}
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
        <dir ref={scoresContainerRef} className={style.scoresContainer}>
          {usersScore &&
            usersScore.map((score, index) => {
              const hours = Math.floor(score.time / 360000);
              const minutes = Math.floor((score.time % 360000) / 6000);
              const seconds = Math.floor((score.time % 6000) / 100);
              const milliseconds = score.time % 100;

              let scoreRankClass = style.scoreRank;
              if (index === 0) scoreRankClass += ` ${style.firstRank}`;
              if (index === 1) scoreRankClass += ` ${style.secondRank}`;
              if (index === 2) scoreRankClass += ` ${style.thirdRank}`;

              return (
                <div
                  key={score.username + index}
                  ref={(el) => (scoreRefs.current[index] = el)}
                  className={style.scoreContainer}
                >
                  <div className={scoreRankClass}>
                    <p>{index + 1}</p>
                  </div>
                  <div className={style.scoreNameTimeContainer}>
                    <p className={style.scoreName}>{score.username}</p>
                    <p className={style.scoreTime}>
                      {hours}h {minutes.toString().padStart(2, "0")}m{" "}
                      {seconds.toString().padStart(2, "0")}s{" "}
                      {milliseconds.toString().padStart(2, "0")}ms
                    </p>
                    <p>{score.timestamp}</p>
                  </div>
                </div>
              );
            })}
          {usersScore === null ||
            (usersScore.length === 0 && (
              <p className={style.noScores}>No scores available</p>
            ))}
        </dir>
      </div>
    </div>
  );
}
