import Card from "../components/Card.js";
import { useState, useEffect } from "react";

const Cards = () => {
    const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8002/api/cards/`)
      .then((response) => response.json())
      .then((data) => setCards(data));
  });
    return (
        <>
        <div className="flex flex-wrap justify-center mx-auto" style={{width: "70%"}}>
        {cards.map((card, index) => {
          return <Card {...card} key={index} />;
        })}
      </div>
      </>
    )
};

export default Cards;