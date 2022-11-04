import { useState } from "react"
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "./DataContext";
import CardList from "./CardList";

export default function CardInfo () {
const data = useContext(DataContext)
    return (
        <div className="card-detail-container">
            <div className="card-detail-main">
                <h2>{data.card.name}</h2>
                <img src={data.card.card_images[0].image_url} onClick={console.log(data.card)}/>
                <h4>Type: {data.card.type}</h4>
                <h4>Attribute: {data.card.attribute}</h4>
                <h4>Race: {data.card.race}</h4>
            </div>
            <div className="card-desc">
                                <p>{data.card.desc}</p>
                            </div>
                            <div className="card-worth">
                            <h4>Card Market Price: {data.card.card_prices[0].cardmarket_price}</h4>
                            <h4>TCG Player Market Price: {data.card.card_prices[0].tcgplayer_price}</h4>
                            <h4>Amazon Price: {data.card.card_prices[0].amazon_price}</h4>
                            <h4>Cool Stuff inc. Price: {data.card.card_prices[0].coolstuffinc_price}</h4>
                            </div>
        </div>
    )
}