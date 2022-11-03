import { useNavigate } from "react-router"
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./globals";
import { fuzzy } from "./globals";
import { attributes } from "./globals";
    export default function CardList() {
const initialAttribute = {
    value:"",
}
const initialType = {
    value:"",
}
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState("")
    const [attributes, setAttributes] = useState(initialAttribute)
    const [types, setTypes] = useState(initialType)
    const [values, setValues] = useState("")


    let navigate = useNavigate()

    useEffect(() => {
         const getAPI = async () => {
            const response = await axios.get(`${API_URL}`) 
       // console.log(response.data.data) 
         setCards(response.data.data)
    }   
    getAPI();
}, [])

const handleAttributes = (e) => {
    setAttributes({[e.target.id]: e.target.value });
  };
  const handleTypes = (e) => {
    setTypes({[e.target.id]: e.target.value });
  };

        const getFuzzy = async () => {
            if (search === ""){
                try {
                const response = await axios.get(`${API_URL}${attributes.value}${types.value}`)
                setCards(response.data.data)
                }
                catch (err) {
                    return (
                        console.log("Card Doesn't exist"),
                        alert("No cards match search criteria" + "\n" +
                        `Card Name: ${search}` + "\n" +
                        `${attributes.value}` + "\n" +
                        `${types.value}`)
                    )
                }   
        }   else {
            try {const response = await axios.get(`${API_URL}${fuzzy}${search}${attributes.value}${types.value}`)
                setCards(response.data.data)
        } catch (err) {
            return (
                console.log("Card Doesn't Exist"),
                alert("No cards match search criteria" + "\n" +
                        `Card Name: ${search}` + "\n" +
                        `Card Attribute: ${attributes.value}` + "\n" +
                        `Card Type: ${types.value}`)
            )
        }
    }
}

   const showCard = () => {
       const show = cards.map((card) => {
           navigate(`${card.id}`)
       }) 
}        
        // console.log(search)
        console.log(attributes)
        console.log(types)
        console.log(`${API_URL}${attributes.value}${types.value}`)
    if (!cards) {
        return <h2>Loading please wait.</h2>
    } else { return (
                    <div className="page-context">
                    <div className="search-bar">
                    <input className="search-input"placeholder="please enter a search" onChange={(e) => setSearch(e.target.value)}></input>
                    <button className="search-Button"type="submit" onClick={getFuzzy} >Search</button>
                    <select onChange={handleTypes} onSelect={((e)=> setTypes(e.target.value))} id={"value"} >
                    <option value="" hidden>Select a Type</option>
                    <option value="&type=Normal Monster">Monster Card</option>
                    <option value="&type=Trap Card">Trap Card</option>
                    <option value="&type=Spell Card" >Spell Card</option>
                    </select>
                    <select onChange={handleAttributes} id={"value"} onSelect={((e)=> setAttributes(e.target.value))} >
                    <option value="" hidden>Select an Attribute</option>
                    <option value="&attrbiute=water" >Water</option>
                    <option value="&attribute=light">Light</option>
                    <option value="&attribute=fire">Fire</option>
                    <option value="&attribute=earth">Earth</option>
                    <option value="&attribute=dark">Dark</option>
                    </select>
                    </div>
                    <div className="card-grid">
                    {
                        cards.map((card) => (
                    <div className="card-container">
                        <li key={card.id} className="card" onClick={showCard}>
                            <img className="card-img" src={card.card_images[0].image_url} />
                            <h1 className="card-name">{card.name}</h1>
                        </li>
                    </div>
                ))
            }
        </div>
        </div>
    )
}
}