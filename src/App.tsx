import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from "./pages/Home";
import Convite from "./pages/Convite";
import Photos from "./pages/Photos";
import GalleryFull from "./pages/GalleryFull";

export default function App() {
  return (
    <BrowserRouter>
      <SpeedInsights />
      <Routes>
        <Route path="/convite" element={<Convite />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/fotos" element={<Photos />} />
        <Route path="/galeria" element={<GalleryFull />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
