import { Link } from "react-router-dom";
import style from "./HomePage.module.css"

export default function HomePage() {
  return (
    <>
      <h1>Find the picture game</h1>
      <div>
        <div>
          <h2>Choose the image</h2>
          <Link>
            <img src="" alt="" />
          </Link>
          <Link>
            <img src="" alt="" />
          </Link>
          <Link>
            <img src="" alt="" />
          </Link>
        </div>
      </div>
    </>
  )
}
