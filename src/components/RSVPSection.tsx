import { motion } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { weddingInfo, rsvpInfo } from "../config/constants";

export function RSVPSection() {
  return (
    <section id="confirmar-presenca" className="py-20 px-4 bg-neutral-dark/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-accent-olive mb-4">
            Confirme sua Presença
          </h2>
          <motion.div
            className="w-24 h-1 bg-accent-olive mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Sua confirmação é muito importante para nós! Por favor, confirme sua
            presença até o dia{" "}
            <span className="text-accent-olive font-medium">
              {weddingInfo.confirmDate.toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>{" "}
            para que possamos organizar tudo com carinho.
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-card border border-accent-olive/20 rounded-xl p-8 shadow-sm text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl text-accent-olive">
              Confirmar com {rsvpInfo.contactName}
            </h3>
            <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
              <Phone className="w-5 h-5 text-accent-olive" />
              <span>{rsvpInfo.phone}</span>
            </div>
            <p className="text-muted-foreground">
              Até <span className="text-accent-olive font-medium">{weddingInfo.confirmDate.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</span>
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground">
              Se você recebeu um convite digital, confirme pelo WhatsApp:
            </p>
            <Button
              asChild
              className="bg-accent-olive hover:bg-accent-olive-dark text-white px-8 py-3 text-lg"
            >
              <a
                href={rsvpInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Confirmar pelo WhatsApp
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
