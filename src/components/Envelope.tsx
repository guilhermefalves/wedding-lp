import { motion } from "motion/react";
import { coupleInfo, conviteInfo, weddingInfo } from "../config/constants";

interface EnvelopeProps {
  isOpen: boolean;
  showCard: boolean;
}

const formattedDate = weddingInfo.weddingDate.toLocaleDateString("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const Envelope = ({ isOpen, showCard }: EnvelopeProps) => {
  return (
    <div style={{ position: "relative", perspective: "1000px", width: "300px", height: "200px" }}>
      {/* Seal - centered on envelope, above everything */}
      <motion.div
        style={{ position: "absolute", left: "40%", transform: "translateX(-50%)", zIndex: 50, top: "72px" }}
        animate={showCard ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Wax seal - olive green with irregular edges */}
        <div style={{ position: "relative", width: "4rem", height: "4rem" }}>
          {/* Outer irregular wax shape */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "hsl(72 40% 30%)",
              borderRadius: "47% 53% 52% 48% / 48% 46% 54% 52%",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 6px rgba(0,0,0,0.2), 0 3px 8px rgba(0,0,0,0.25)",
            }}
          />
          {/* Inner ring */}
          <div
            style={{
              position: "absolute",
              inset: "5px",
              borderRadius: "47% 53% 52% 48% / 48% 46% 54% 52%",
              border: "1px solid rgba(250, 248, 241, 0.3)",
            }}
          />
          {/* Wedding logo */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src="/assets/wedding-logo.png"
              alt={`${coupleInfo.bride} & ${coupleInfo.groom}`}
              style={{ width: "3rem", height: "3rem", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Card - behind envelope, rises upward with final content */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          width: "270px",
          x: "-50%",
          top: "0px",
          zIndex: showCard ? 50 : 5,
          pointerEvents: showCard ? "auto" : "none",
          backgroundColor: "hsl(39 40% 88%)",
          border: "1px solid hsla(43, 72%, 55%, 0.2)",
          borderRadius: "0.5rem 0.5rem 0 0",
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        }}
        initial={{ y: 0, height: 200, opacity: 0 }}
        animate={showCard ? { y: -340, height: 500, opacity: 1 } : { y: 0, height: 200, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "2rem 1.5rem",
            textAlign: "center",
          }}
        >
          {/* Names first */}
          <div style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(30 10% 20%)", fontSize: "2.25rem", lineHeight: 1.25 }}>
              {coupleInfo.bride}
            </h1>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(43 72% 55%)", fontSize: "1.5rem", margin: "0.25rem 0" }}>&</p>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "hsl(30 10% 20%)", fontSize: "2.25rem", lineHeight: 1.25 }}>
              {coupleInfo.groom}
            </h1>
          </div>

          {/* Then "convidam" */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "hsl(30 10% 45%)",
              textTransform: "uppercase",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              letterSpacing: "0.25em",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            convidam para o casamento
          </p>

          {/* Date */}
          <div style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "hsl(30 10% 45%)", fontSize: "1.125rem", letterSpacing: "0.1em" }}>
              {formattedDate}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "hsl(30 10% 45%)", fontSize: "1rem", marginTop: "0.25rem" }}>
              às {conviteInfo.receptionTime}
            </p>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", margin: "0.75rem 0" }}>
            <div style={{ width: "2.5rem", height: "1px", opacity: 0.5, backgroundColor: "hsl(43 72% 55%)" }} />
            <div style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", opacity: 0.6, backgroundColor: "hsl(43 72% 55%)" }} />
            <div style={{ width: "2.5rem", height: "1px", opacity: 0.5, backgroundColor: "hsl(43 72% 55%)" }} />
          </div>

          {/* CTA Button */}
          <a
            href={conviteInfo.redirectUrl}
            style={{
              display: "inline-block",
              marginTop: "1rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              fontSize: "1rem",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              backgroundColor: "hsl(72 40% 30%)",
              color: "hsl(40 33% 96%)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              borderRadius: "0.125rem",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              textDecoration: "none",
              transition: "opacity 300ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Mais detalhes
          </a>
        </div>
      </motion.div>

      {/* Envelope body - covers the card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "0.5rem",
          zIndex: showCard ? 15 : 20,
          backgroundColor: "hsl(39 40% 88%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "0.5rem" }}>
          {/* Top flap fold shadow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.08), transparent)",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: "3px",
            borderRadius: "0.5rem",
            opacity: 0.2,
            border: "1px solid hsl(43 72% 55%)",
          }}
        />
      </div>

      {/* Envelope flap (top) */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
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
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "hsl(39 38% 85%)",
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.3,
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
