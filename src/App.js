import Header from "./components/Header";
import Cards from "./pages/Cards";
import AddCard from "./components/AddCard";

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
