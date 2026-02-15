import { motion } from "motion/react";

const weddingLogo = "/assets/wedding-logo.png";
const REDIRECT_URL = "/";

interface EnvelopeProps {
  isOpen: boolean;
  showCard: boolean;
}

const Flourish = () => (
  <svg viewBox="0 0 200 20" className="w-32 mx-auto opacity-60" fill="hsl(43 72% 55%)" style={{ color: "hsl(43 72% 55%)" }}>
    <path d="M0 10 Q50 0 100 10 Q150 20 200 10" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <circle cx="100" cy="10" r="2" />
    <circle cx="80" cy="8" r="1" />
    <circle cx="120" cy="12" r="1" />
  </svg>
);

const Envelope = ({ isOpen, showCard }: EnvelopeProps) => {
  return (
    <div className="relative" style={{ perspective: "1000px", width: "300px", height: "200px" }}>
      {/* Seal - centered on envelope, above everything */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-50"
        style={{ top: "72px" }}
        animate={showCard ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Wax seal - olive green with irregular edges */}
        <div className="relative w-16 h-16">
          {/* Outer irregular wax shape */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: "hsl(72 40% 30%)",
              borderRadius: "47% 53% 52% 48% / 48% 46% 54% 52%",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 6px rgba(0,0,0,0.2), 0 3px 8px rgba(0,0,0,0.25)",
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute inset-[5px] rounded-full"
            style={{
              borderRadius: "47% 53% 52% 48% / 48% 46% 54% 52%",
              border: "1px solid rgba(250, 248, 241, 0.3)",
            }}
          />
          {/* Wedding logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={weddingLogo} alt="N & G" className="w-10 h-10 object-contain brightness-0 invert opacity-80" />
          </div>
        </div>
      </motion.div>

      {/* Card - behind envelope, rises upward with final content */}
      <motion.div
        className="absolute left-1/2 rounded-t-lg shadow-xl"
        style={{
          width: "270px",
          x: "-50%",
          top: "0px",
          zIndex: showCard ? 50 : 5,
          pointerEvents: showCard ? "auto" : "none",
          backgroundColor: "hsl(39 40% 88%)",
          border: "1px solid hsla(43, 72%, 55%, 0.2)",
        }}
        initial={{ y: 0, height: 200, opacity: 0 }}
        animate={showCard ? { y: -340, height: 500, opacity: 1 } : { y: 0, height: 200, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="flex flex-col items-center justify-center h-full px-6 py-8 text-center"
        >
          {/* Flourish top */}
          <Flourish />

          {/* Names first */}
          <div className="my-5">
            <h1 className="text-4xl leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(30 10% 20%)" }}>
              Noemy
            </h1>
            <p className="text-2xl my-1" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(43 72% 55%)" }}>&</p>
            <h1 className="text-4xl leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(30 10% 20%)" }}>
              Guilherme
            </h1>
          </div>

          {/* Then "convidam" */}
          <p className="text-sm tracking-[0.25em] uppercase mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "hsl(30 10% 45%)" }}>
            convidam para o casamento
          </p>

          <Flourish />

          {/* Date */}
          <div className="my-5">
            <p className="text-lg tracking-[0.1em]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "hsl(30 10% 45%)" }}>
              17 de abril de 2026
            </p>
            <p className="text-base mt-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "hsl(30 10% 45%)" }}>
              às 16h30
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-10 h-[1px] opacity-50" style={{ backgroundColor: "hsl(43 72% 55%)" }} />
            <div className="w-1.5 h-1.5 rounded-full opacity-60" style={{ backgroundColor: "hsl(43 72% 55%)" }} />
            <div className="w-10 h-[1px] opacity-50" style={{ backgroundColor: "hsl(43 72% 55%)" }} />
          </div>

          {/* CTA Button */}
          <a
            href={REDIRECT_URL}
            className="inline-block mt-4 px-8 py-2.5 text-sm tracking-[0.15em] uppercase rounded-sm hover:opacity-85 transition-opacity duration-300 shadow-md"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              backgroundColor: "hsl(72 40% 30%)",
              color: "hsl(40 33% 96%)",
            }}
          >
            Mais detalhes
          </a>

          {/* Bottom ornament */}
          <div className="mt-5 opacity-40">
            <Flourish />
          </div>
        </div>
      </motion.div>

      {/* Envelope body - covers the card */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          zIndex: showCard ? 15 : 20,
          backgroundColor: "hsl(39 40% 88%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {/* Top flap fold shadow */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "120px",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.08), transparent)",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            }}
          />
        </div>
        <div
          className="absolute inset-[3px] rounded-lg opacity-20"
          style={{ border: "1px solid hsl(43 72% 55%)" }}
        />
      </div>

      {/* Envelope flap (top) */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{
          zIndex: showCard ? 10 : 40,
          transformOrigin: "top center",
          width: "300px",
          height: "120px",
        }}
        initial={{ rotateX: 0 }}
        animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundColor: "hsl(39 38% 85%)",
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              clipPath: "polygon(2px 2px, 50% calc(100% - 2px), calc(100% - 2px) 2px)",
              border: "1px solid hsl(43 72% 55%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Envelope;
