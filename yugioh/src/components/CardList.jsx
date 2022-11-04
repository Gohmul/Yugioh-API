import { useNavigate } from "react-router"
import { useState, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "./DataContext";
import axios from "axios";
import { API_URL } from "./globals";
import { fuzzy } from "./globals";
import { attributes } from "./globals";
    export default function CardList() {
        let data = useContext(DataContext)
        let navigate = useNavigate()

    useEffect(() => { 
        getApi();

}, []) 

const loadData = () => {
    data.setLoad((prev) => prev + 50)
  }
const handleAttributes = (e) => {
    data.setAttributes({[e.target.id]: e.target.value });
  };
  const handleTypes = (e) => {
    data.setTypes({[e.target.id]: e.target.value });
  };

        const getApi = async () => {
            if (data.search === ""){
                try {
                const response = await axios.get(`${API_URL}${data.attributes.value}${data.types.value}`)
                data.setCards(response.data.data)
                }
                catch (err) {
                    return (
                        console.log("Card Doesn't exist"),
                        alert("No cards match search criteria" + "\n" +
                        `Card Name: ${data.search}` + "\n" +
                        `${data.attributes.value}` + "\n" +
                        `Card Type: ${data.types.value}`)
                    )
                }   
        }   else {
            try {const response = await axios.get(`${API_URL}${fuzzy}${data.search}${data.attributes.value}${data.types.value}`)
                data.setCards(response.data.data)
        } catch (err) {
            return (
                console.log("Card Doesn't Exist"),
                alert("No cards match search criteria" + "\n" +
                        `Card Name: ${data.search}` + "\n" +
                        `Card Attribute: ${data.attributes.value}` + "\n" +
                        `Card Type: ${data.types.value}`)
            )
        }
    }
}

   const showCard = () => {
       navigate(`${data.card.id}`)
   }
        console.log("Attribute: "+ data.attributes.value)
        console.log("Type: "+data.types.value)
        console.log("Completed URL: "+`${API_URL}${fuzzy}${data.search}${data.attributes.value}${data.types.value}`)
    if (!data.cards) {
        return <h2>Loading please wait.</h2>
    } else {         
        return (
                    <div className="page-context">
                    <div className="search-bar">  {/*                                                                            onKeyUp={getApi} */}
                    <input className="search-input"placeholder="please enter a search" onChange={(e) => data.setSearch(e.target.value)} ></input>
                    <button className="search-Button"type="submit" onMouseDown={getApi} onMouseUp={((e) => data.resetSearch())}>Search</button>
                    <select onChange={handleTypes} onSelect={((e)=> data.setTypes(e.target.value))} id={"value"} >
                    <option value="" hidden>Select a Type</option>
                    <option value="">None</option>
                    <option value="&type=Normal%20Monster">Normal Monster</option>
                    <option value="&type=Effect%20Monster" >Effect Monster</option>
                    <option value="&type=Gemini%20Monster">Gemini Monster</option>
                    <option value="&type=Ritual%20Monster">Ritual Monster</option>
                    <option value="&type=Spirit%20Monster">Spirit Monster</option>
                    <option value="&type=Toon%20Monster">Toon Monster</option>
                    <option value="&type=Tuner%20Monster">Tuner Monster</option>
                    <option value="&type=Trap%20Card">Trap Card</option>
                    <option value="&type=Skill%20Card">Skill Card</option>
                    <option value="&type=Spell%20Card" >Spell Card</option>
                    </select>
                    <select onChange={handleAttributes} id={"value"} onSelect={((e)=> data.setAttributes(e.target.value))} >
                    <option value="" hidden>Select an Attribute</option>
                    <option value="">None</option>
                    <option value="&attrbiute=water">Water</option>
                    <option value="&attribute=light">Light</option>
                    <option value="&attribute=divine">Divine</option>
                    <option value="&attribute=wind">Wind</option>
                    <option value="&attribute=fire">Fire</option>
                    <option value="&attribute=earth">Earth</option>
                    <option value="&attribute=dark">Dark</option>
                    </select>
                    </div>
                    <div className="card-grid">
                    {
                        data.cards.slice(0,data.load).map((card) => (
                    <div className="card-container">
                        <li key={data.card.id} className="card" onMouseUp={showCard} onMouseDown={((e)=>data.setCard(card))}>
                            <img className="card-img" src={card.card_images[0].image_url} />
                            <h1 className="card-name">{card.name}</h1>
                        </li>
                    </div>
                )
                )    
            }
        </div>
        <div className="load-more-container">
        {   
             data.load < data.cards.length && <button className="load-more"onClick={loadData}>Load more</button>
            }
            </div>
        </div>
        
    )
}
}
