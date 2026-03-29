import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Convite from "./pages/Convite";
import Photos from "./pages/Photos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/convite" element={<Convite />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/fotos" element={<Photos />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
