import { useNavigate } from "react-router"
import { useState, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "./DataContext";
import axios from "axios";
import { API_URL } from "./globals";
import { fuzzy } from "./globals";
import { attributes } from "./globals";
import { random_URL } from "./globals";
import ReactCardFlip from "react-card-flip"
import cardBack from "../photos/yugiohcardback.png"

    export default function CardList() {
        let data = useContext(DataContext)  
              console.log(data)

        let navigate = useNavigate()

    useEffect(() => { 
        getApi();

}, []) 

const Card = ({project}) => {
    const [isFlipped, setIsFlipped] = useState(true);

    return data, {project} ? ( 
        
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal"> 
    <div  className="CardFront"  onMouseUp={showCard} onMouseLeave={((e) => setIsFlipped((prev) => !prev))} > 
    <li className="card">
    <img className="card-img" src={project.card_images[0].image_url}></img>
    <h1 className="card-name">{project.name}</h1>
    </li>
    </div>
<div  className="CardBack" onClick={((e) => setIsFlipped((prev) => !prev))} onMouseEnter={((e)=>data.setCard(project))}>
    <li className="card">
<img className="card-img" src={cardBack} />
    <h1 className="card-name">{project.name}</h1>
    </li>    

    </div>  
            </ReactCardFlip>


    ) : <h1> Loading please wait...</h1> 
}

const loadData = () => {
    data.setLoad((prev) => prev + 50)
  }
const handleAttributes = (e) => {
    data.setAttributes({[e.target.id]: e.target.value });
  };
  const handleTypes = (e) => {
    data.setTypes({[e.target.id]: e.target.value });
  };
  const handleSearch = (e) => {
    data.setSearch({...data.search,[e.target.id]: e.target.value });
  };

  const backToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

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

    function showScroll () {
        return(
     <div className="scrolldown-container">
         <button className="scrolldown" style={{display:'block'}}>Scroll Down</button>
     </div> 
        )
    }
   const showCard = () => {
        navigate(`${data.card.id}`)
        console.log(data.card.id)
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
                    <button className="search-Button"type="submit" onMouseDown={getApi} onMouseUp={((e) => data.setSearch(""))}>Search</button>
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
                    <option value="" hidden>Select a Attribute</option>
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
                    <div className="random">
                    <button className="nav-random nav-item" onMouseDown={((e)=> data.getRandom()) }onMouseUp={showCard}>
                    </button>
                    </div>
                    <div className="card-grid">
                    {
                        data.cards.slice(0,data.load).map((card,index) => (
                            <Card project={card} key={`card-${index}`}/>

                )
                )    
            }
        </div>
        <div className="load-more-container">
        {   
             data.load < data.cards.length && <button className="load-more"onClick={loadData}>Load more</button>
            }
            <button className="backtotop"onClick={((e)=> document.documentElement.scrollTop = 0)} onScroll={showScroll}>Back to Top</button>

            </div>
            
        </div>
        
    )
}
}
