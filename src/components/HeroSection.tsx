import { motion } from "motion/react";
import { CountdownTimer } from "./CountdownTimer";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { coupleInfo } from "../config/constants";

interface HeroSectionProps {
  weddingDate: Date;
}

export function HeroSection({ weddingDate }: HeroSectionProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const heroImage = isMobile ? "imgs/hero-mobile.jpg" : "imgs/hero-desk.jpg";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={`${coupleInfo.bride} & ${coupleInfo.groom}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/30 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl text-white mb-4">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {coupleInfo.bride}
            </motion.span>
            <motion.div
              className="flex items-center justify-center gap-4 my-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className="w-16 h-0.5 bg-accent-olive-light"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              <span className="text-accent-olive-light text-2xl sm:text-3xl lg:text-4xl">
                &
              </span>
              <motion.div
                className="w-16 h-0.5 bg-accent-olive-light"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.div>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {coupleInfo.groom}
            </motion.span>
          </h1>

          <motion.p
            className="text-xl sm:text-2xl text-accent-olive-light mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {weddingDate.toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <CountdownTimer targetDate={weddingDate} />
        </motion.div>
      </motion.div>
    </section>
  );
}
