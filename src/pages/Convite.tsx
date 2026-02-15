import { useState } from "react";
import { motion } from "motion/react";
import Envelope from "../components/Envelope";

const COLORS = {
  background: "rgb(180, 189, 158)",
  primary: "hsl(72 40% 30%)",
};

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
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        position: "relative",
        backgroundColor: COLORS.background,
      }}
    >
      <motion.div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        onClick={handleOpen}
        animate={showCard ? { y: 200 } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Envelope isOpen={isOpen} showCard={showCard} />

        {!isOpen && (
          <motion.p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: COLORS.primary,
              marginTop: "1rem",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
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
