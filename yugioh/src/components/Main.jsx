import { Route,Routes } from "react-router";
import Home from "./Home";
import CardList from "./CardList";
import CardInfo from "./CardInfo";
import { useState } from "react";
import { DataContext } from "./DataContext";
export default function Main () {
    const initialAttribute = {
        value:"",
    }
    const initialType = {
        value:"",
    }
    const [cards, setCards] = useState();
    const [search, setSearch] = useState("")
    const [attributes, setAttributes] = useState(initialAttribute)
    const [types, setTypes] = useState(initialType)
    const [card, setCard] = useState("")
    const [apiData, setData] = useState([]);
    const [load, setLoad] = useState(50);
    const [indivudalFlip, setIndividualFlip] = useState({
        value:false
    })


    const resetSearch = () => {
        setAttributes(initialAttribute)
        setTypes(initialType)
        setSearch("")
    }
    return(
        <div className="App-main">
                <DataContext.Provider value={{ resetSearch , apiData , setData , load , setLoad , card , setCard , cards, setCards, search , setSearch , attributes , setAttributes , types , setTypes}}>
                <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/cards" element={<CardList/>} />
                <Route path="/cards/:id" element={<CardInfo/> } />
                </Routes>               
                </DataContext.Provider>

        </div>
    )
}