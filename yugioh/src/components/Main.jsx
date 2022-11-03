import { Route,Routes } from "react-router";
import Home from "./Home";
import CardList from "./CardList";
import CardInfo from "./CardInfo";
export default function Main () {
    return(
        <div className="App-main">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/cards" element={<CardList/>} />
                <Route path="/cards/:id" element={<CardInfo/> } />
            </Routes>
        </div>
    )
}