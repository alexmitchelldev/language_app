import Header from "./components/Header";
import Cards from "./pages/Cards";
// import Study from "./pages/Study";
import FlipCard from "./components/FlipCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function LanguageApp() {
  return (
    <>
      <Header>
        <BrowserRouter>
          <Routes>
            <Route path="/study" element={<FlipCard />} />
            <Route path="/mycards" element={<Cards />} />
          </Routes>
        </BrowserRouter>
      </Header>
    </>
  );
}
