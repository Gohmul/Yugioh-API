import { Link } from "react-router-dom"
import { Navigate, useNavigate } from "react-router"

export default function Nav () {
    let navigate = useNavigate()
    return(
        <div className="nav">
          <button  className="nav-home nav-item" onClick={() => navigate("/")}>
            <Link to="/"></Link>
          </button>
          <button  className="nav-cards nav-item" onClick={() => navigate("/cards")}>
              <Link to ="/cards"></Link>
          </button>
          <button  className="nav-back nav-item" onClick={() => navigate(-1)}>
              <Link onClick={() => navigate(-1)}>
                  
              </Link>
          </button>
        </div>
    )
}