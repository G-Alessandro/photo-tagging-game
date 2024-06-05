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
      <div className={style.homepageContainer}>
        <h1>FIND THE PICTURE GAME</h1>
        <div className={style.scoreboardLinkContainer}>
          <div>
            <h2>CHOOSE THE IMAGE TO PLAY</h2>
            <div className={style.linksContainer}>
              <Link to="/game-page" state={{ image: monsterHunterWorldImg }}>
                <h3>Monster Hunter World</h3>
                <img
                  src={monsterHunterWorldImg}
                  alt="representation of the monster hunter world video game with its diversity of fauna and flora"
                />
              </Link>
              <Link
                to="/game-page"
                state={{ image: monsterHunterWorldIceborneImg }}
              >
                <h3>Monster Hunter World Iceborne</h3>
                <img
                  src={monsterHunterWorldIceborneImg}
                  alt="representation of the monster hunter world iceborne video game with its diversity of fauna and flora"
                />
              </Link>
              <Link to="/game-page" state={{ image: ad2222CharacterImg }}>
                <h3>AD 2222 Character</h3>
                <img
                  src={ad2222CharacterImg}
                  alt="representation of multiple animation characters or memes"
                />
              </Link>
              <Link to="/game-page" state={{ image: universe113InfestedImg }}>
                <h3>Universe 113 Infested</h3>
                <img
                  src={universe113InfestedImg}
                  alt="representation of multiple characters from animation, meme or film"
                />
              </Link>
            </div>
          </div>
          <Scoreboard />
        </div>
      </div>
    </>
  );
}
