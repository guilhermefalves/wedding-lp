import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, PartyPopper, Gift, CheckSquare } from "lucide-react";

export function Navbar() {
  const [_isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "nossa-historia",
        "festa",
        "presentes",
        "confirmar-presenca",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 2000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    {
      id: "nossa-historia",
      label: "Nossa História",
      shortLabel: "História",
      icon: BookOpen,
    },
    { id: "festa", label: "Festa", shortLabel: "Festa", icon: PartyPopper },
    {
      id: "presentes",
      label: "Presentes",
      shortLabel: "Presentes",
      icon: Gift,
    },
    {
      id: "confirmar-presenca",
      label: "Confirmar Presença",
      shortLabel: "Confirmar",
      icon: CheckSquare,
      highlight: true,
    },
  ];

  return (
    <>
      <motion.nav
        className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-accent-olive/20 z-50 md:hidden pb-safe"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <div className="flex justify-around items-center py-2">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            const isHighlighted = item.highlight;

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-accent-olive bg-accent-olive/10"
                    : "text-muted-foreground hover:text-foreground"
                } ${isHighlighted ? "scale-110" : ""}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  ...(isHighlighted && showPulse
                    ? {
                        scale: [1.1, 1.25, 1.15, 1.1],
                        rotate: [0, -3, 3, -1, 0],
                      }
                    : {}),
                }}
                transition={{
                  duration: 0.4,
                  delay: 2.2 + index * 0.1,
                  ...(isHighlighted && showPulse
                    ? {
                        duration: 1.5,
                        ease: "easeInOut",
                      }
                    : {}),
                }}
                whileHover={{ scale: isHighlighted ? 1.15 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? "var(--color-accent-olive)" : undefined,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <IconComponent
                    size={isHighlighted ? 24 : 20}
                    className={`mb-1 ${isActive ? "text-accent-olive" : ""}`}
                  />
                </motion.div>
                <span
                  className={`text-xs leading-tight text-center ${
                    isHighlighted ? "font-medium" : ""
                  } ${isActive ? "text-accent-olive" : ""}`}
                >
                  {item.shortLabel}
                </span>

                <AnimatePresence>
                  {isHighlighted && showPulse && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-accent-olive/30 pointer-events-none"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: [1, 1.4, 1.6], opacity: [0, 0.6, 0] }}
                      exit={{ scale: 1, opacity: 0 }}
                      transition={{
                        duration: 1.8,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
