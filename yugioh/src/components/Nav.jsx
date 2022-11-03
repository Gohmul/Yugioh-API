import { Link } from "react-router-dom"
import { Navigate, useNavigate } from "react-router"

export default function Nav () {
    let navigate = useNavigate()
    return(
        <div className="nav">
          <h2 className="nav-item">
            <Link to="/">Home</Link>
          </h2>
          <h2 className="nav-item">
              <Link to ="/cards">Cards</Link>
          </h2>
          <h2 className="nav-item">
              <Link onClick={() => navigate(-1)}>
                  Back
              </Link>
          </h2>
        </div>
    )
}