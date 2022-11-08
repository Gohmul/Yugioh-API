import { Route,Routes } from "react-router";
import Home from "./Home";
import CardList from "./CardList";
import CardInfo from "./CardInfo";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { DataContext } from "./DataContext";
import { random_URL } from "./globals";
export default function Main () {
    let navigate = useNavigate();
    const initialAttribute = {
        value:"",
    }
    const initialType = {
        value:"",
    }
    const initialSearch = ""
 
    const [cards, setCards] = useState();
    const [search, setSearch] = useState(initialSearch)
    const [attributes, setAttributes] = useState(initialAttribute)
    const [types, setTypes] = useState(initialType)
    const [card, setCard] = useState("")
    const [apiData, setData] = useState([]);
    const [load, setLoad] = useState(50);

    const getRandom = async () => {
        const response = await axios.get(`${random_URL}`)
        setCard(response.data)
         console.log(response.data)
    }

    const showCard = () => {
        navigate(`${card.id}`)
        console.log(card.id)
   }


    const resetSearch = () => {
        setAttributes(initialAttribute)
        setTypes(initialType)
        setSearch("")
    }
    return(
        <div className="App-main">
                <DataContext.Provider value={{showCard , getRandom , resetSearch , apiData , setData , load , setLoad , card , setCard , cards, setCards, search , setSearch , attributes , setAttributes , types , setTypes}}>
                <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/cards" element={<CardList/>} />
                <Route path="/cards/:id" element={<CardInfo/> } />
                </Routes>               
                </DataContext.Provider>

        </div>
    )
}