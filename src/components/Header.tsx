import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, BookOpen, PartyPopper, Gift, CheckSquare } from "lucide-react";
import { coupleInfo, weddingInfo } from "../config/constants";

export function Header() {
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
  };

  const navItems = [
    { id: "nossa-historia", label: "Nossa História", icon: BookOpen },
    { id: "festa", label: "Festa", icon: PartyPopper },
    { id: "presentes", label: "Presentes", icon: Gift },
    {
      id: "confirmar-presenca",
      label: "Confirmar Presença",
      icon: CheckSquare,
      highlight: true,
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-accent-olive/20 z-50 hidden md:block">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-3 text-accent-olive hover:text-accent-olive-light transition-colors duration-200"
          >
            <Heart size={24} className="fill-current" />
            <div className="text-left">
              <div className="font-medium text-lg leading-none">
                {`${coupleInfo.bride} & ${coupleInfo.groom}`}
              </div>
              <div className="text-sm text-muted-foreground leading-none mt-1">
                {weddingInfo.weddingDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
              </div>
            </div>
          </button>

          <nav className="flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              const isHighlighted = item.highlight;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-accent-olive bg-accent-olive/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent-olive/5"
                  } ${isHighlighted ? "border border-accent-olive/30" : ""}`}
                >
                  <IconComponent
                    size={18}
                    className={`${isActive ? "text-accent-olive" : ""}`}
                  />
                  <span
                    className={`font-medium ${
                      isActive ? "text-accent-olive" : ""
                    }`}
                  >
                    {item.label}
                  </span>

                  <AnimatePresence>
                    {isHighlighted && showPulse && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-accent-olive/20 pointer-events-none border border-accent-olive/40"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: [1, 1.1, 1.2], opacity: [0, 0.6, 0] }}
                        exit={{ scale: 1, opacity: 0 }}
                        transition={{
                          duration: 1.8,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
