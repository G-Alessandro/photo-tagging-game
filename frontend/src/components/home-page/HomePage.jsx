import { Link } from "react-router-dom";
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
          <Link to="/game" state={{ image: monsterHunterWorldImg }}>
            <img src={monsterHunterWorldImg} alt="" />
          </Link>
          <Link to="/game" state={{ image: monsterHunterWorldIceborneImg }}>
            <img src={monsterHunterWorldIceborneImg} alt="" />
          </Link>
          <Link to="/game" state={{ image: ad2222CharacterImg }}>
            <img src={ad2222CharacterImg} alt="" />
          </Link>
          <Link to="/game" state={{ image: universe113InfestedImg }}>
            <img src={universe113InfestedImg} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
}
