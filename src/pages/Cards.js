import Card from "../components/Card.js";
import { useState, useEffect } from "react";

const Cards = () => {
  const [cards, setCards] = useState([]);

  const GetCards = () => {
    useEffect(() => {
      fetch(`http://localhost:8002/api/cards/`)
        .then((response) => response.json())
        .then((data) => setCards(data));
    });
  };

  return (
    <>
      {GetCards()}
      <div
        className="flex flex-wrap justify-center"
        id="cards-area"
      >
        {cards.map((card, index) => {
          return <Card {...card} key={index} />;
        })}
      </div>
    </>
  );
};

export default Cards;
