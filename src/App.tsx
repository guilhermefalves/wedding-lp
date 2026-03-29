import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from "./pages/Home";
import Convite from "./pages/Convite";

export default function App() {
  return (
    <BrowserRouter>
      <SpeedInsights />
      <Routes>
        <Route path="/convite" element={<Convite />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
