import Card from "./components/Card";
import { useState, useEffect } from "react";

export default function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8002/api/cards/`)
      .then((response) => response.json())
      .then((data) => setCards(data));
  });

  return (
    <>
      <h1 className="text-3xl font-bold underline">Cards</h1>
      {cards.map((card, index) => {
        return (
          <Card {...card} key={index}/>
        );
      })}
    </>
  );
}
