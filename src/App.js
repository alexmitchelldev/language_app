import Header from "./components/Header";
import Cards from "./pages/Cards";
import Card from "./components/Card";
import AddCard from "./components/AddCard";
import { useState, useEffect } from "react";

export default function App() {
  

  return (
    <>
      <Header>
        <Cards />
      </Header>
      <AddCard />
    </>
  );
}
