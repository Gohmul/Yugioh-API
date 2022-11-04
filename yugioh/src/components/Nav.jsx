import { Link } from "react-router-dom"
import { Navigate, useNavigate } from "react-router"

export default function Nav () {
    let navigate = useNavigate()
    return(
        <div className="nav">
          <button className="nav-item">
            <Link to="/">Home</Link>
          </button>
          <button className="nav-item">
              <Link to ="/cards">Cards</Link>
          </button>
          <button className="nav-item">
              <Link onClick={() => navigate(-1)}>
                  Back
              </Link>
          </button>
        </div>
    )
}