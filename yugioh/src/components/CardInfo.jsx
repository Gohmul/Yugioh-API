import { useState } from "react"
import { useParams } from "react-router";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "./DataContext";
import CardList from "./CardList";

export default function CardInfo () {
const data = useContext(DataContext)
console.log(data)

    const [card, setCard] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        let selectedCard = data.cards.find(
            (card) => card.id === parseInt(id)
        )
        setCard(selectedCard)
    },[card,id])

    return card ? (
        <div className="card-detail-container">
            <div className="card-detail-main">
                <h2>{card.name}</h2>
                <img src={card.card_images[0].image_url} />
            </div>
        </div>
    ) : null;
}