import { useState } from "react";
import { Link } from "react-router-dom";
import monsterHunterWorldImg from "../../assets/images/monster-hunter-world/monster_hunter_world.jpg";
import monsterHunterWorldIceborneImg from "../../assets/images/monster-hunter-world-iceborne/monster_hunter_world_iceborne.jpg";
import ad2222CharacterImg from "../../assets/images/ad-2222-character/ad_2222_character.jpg";
import universe113InfestedImg from "../../assets/images/universe-113-infested/universe_113_infested.jpeg";
import style from "./HomePage.module.css";
import { useEffect } from "react";

export default function HomePage() {
  const [usersScore, setUsersScore] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsersScore(data));
  }, []);
  return (
    <>
      <h1>Find the picture game</h1>
      <div>
        <div>
          <h2>Choose the image</h2>
          <Link to="/game-page" state={{ image: monsterHunterWorldImg }}>
            <img
              src={monsterHunterWorldImg}
              alt="representation of the monster hunter world video game with its diversity of fauna and flora"
            />
          </Link>
          <Link
            to="/game-page"
            state={{ image: monsterHunterWorldIceborneImg }}
          >
            <img
              src={monsterHunterWorldIceborneImg}
              alt="representation of the monster hunter world iceborne video game with its diversity of fauna and flora"
            />
          </Link>
          <Link to="/game-page" state={{ image: ad2222CharacterImg }}>
            <img
              src={ad2222CharacterImg}
              alt="representation of multiple animation characters or memes"
            />
          </Link>
          <Link to="/game-page" state={{ image: universe113InfestedImg }}>
            <img
              src={universe113InfestedImg}
              alt="representation of multiple characters from animation, meme or film"
            />
          </Link>
        </div>
      </div>
      <div>
        {usersScore &&
          usersScore.map((score) => (
            <div key={score.username}>
              <p>{score.username}</p>
              <p>{score.time}</p>
            </div>
          ))}
        {usersScore === null ||
          (usersScore.length === 0 && <p>No score aviable</p>)}
      </div>
    </>
  );
}
