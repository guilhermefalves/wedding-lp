import { useState } from "react";
import { motion } from "motion/react";
import Envelope from "../components/convite/Envelope";

const Convite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => setShowCard(true), 600);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-visible relative"
      style={{ backgroundColor: "rgb(180, 189, 158)" }}
    >
      <motion.div
        className="flex flex-col items-center cursor-pointer"
        onClick={handleOpen}
        animate={showCard ? { y: 200 } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Envelope isOpen={isOpen} showCard={showCard} />

        {!isOpen && (
          <motion.p
            className="mt-8 text-lg tracking-[0.2em] uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "hsl(72 40% 30%)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Toque para abrir
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Convite;
