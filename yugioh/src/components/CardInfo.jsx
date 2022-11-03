import { useState } from "react"
import { useParams } from "react-router";

export default function CardInfo (cards) {
    console.log(cards)
    const [card, setCard] = useState([]);

    let { id } = useParams();


    return(
        <div>i am the card info</div>
    )
}