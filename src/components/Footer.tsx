import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { coupleInfo, weddingInfo } from "../config/constants";

export function Footer() {
  return (
    <footer className="bg-background border-t border-accent-olive/20 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-accent-olive">
            <Heart size={20} fill="currentColor" />
            <span className="text-xl">{`${coupleInfo.bride} & ${coupleInfo.groom}`}</span>
            <Heart size={20} fill="currentColor" />
          </div>

          <p className="text-muted-foreground">
            {weddingInfo.weddingDate.toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="text-sm text-muted-foreground/70">
            Feito com muito amor para nosso dia especial ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
