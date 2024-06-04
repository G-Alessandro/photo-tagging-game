import { Link } from "react-router-dom";
import Scoreboard from "../scoreboard/Scoreboard";
import monsterHunterWorldImg from "../../assets/images/monster-hunter-world/monster_hunter_world.jpg";
import monsterHunterWorldIceborneImg from "../../assets/images/monster-hunter-world-iceborne/monster_hunter_world_iceborne.jpg";
import ad2222CharacterImg from "../../assets/images/ad-2222-character/ad_2222_character.jpg";
import universe113InfestedImg from "../../assets/images/universe-113-infested/universe_113_infested.jpeg";
import style from "./HomePage.module.css";

export default function HomePage() {
  
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
      <Scoreboard />
    </>
  );
}
