import { Route,Routes } from "react-router";
import Home from "./Home";
export default function Main () {
    return(
        <div className="App-main">
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    )
}