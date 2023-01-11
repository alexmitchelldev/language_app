import Header from "./components/Header";
import Cards from "./pages/Cards";
import MyCards from "./pages/MyCards.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function LanguageApp() {
  return (
    <>
      <Header>
        <BrowserRouter>
          <Routes>
            <Route path="/mycards" element={<MyCards />} />
          </Routes>
        </BrowserRouter>
      </Header>
    </>
  );
}
