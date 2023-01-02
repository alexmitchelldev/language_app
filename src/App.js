import Header from "./components/Header";
import Card from "./components/Card";
import AddCard from "./components/AddCard";
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
      <Header></Header>
      <div className="flex flex-wrap justify-center mx-auto" style={{width: "70%"}}>
        {cards.map((card, index) => {
          return <Card {...card} key={index} />;
        })}
      </div>
      <AddCard />
    </>
  );
}
