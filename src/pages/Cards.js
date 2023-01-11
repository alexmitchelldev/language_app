import Card from "../components/Card.js";
import AddCard from "../components/AddCard.js";
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

  const addCard = (body) => {
    const addCardBody = new URLSearchParams({
      titleFront: body.titleFront,
      titleBack: body.titleBack,
      textFront: body.textFront,
      tags: body.tags,
      languageFront: body.languageFront,
      languageBack: body.languageBack
    });
    console.log(addCardBody);
    // https://stackoverflow.com/questions/71678250/how-to-post-body-data-using-fetch-api
    fetch("http://localhost:8002/api/cards", {
      method: "POST",
      body: addCardBody
    });
    GetCards();
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
