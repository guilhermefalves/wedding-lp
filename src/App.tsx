import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Convite from "./pages/Convite";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/convite" element={<Convite />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
