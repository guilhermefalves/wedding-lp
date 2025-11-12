import { useId } from "react";
import { motion } from "motion/react";
import { Heart, Gift, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

export function GiftsSection() {
  const sectionId = useId();
  return (
    <section id={sectionId} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-accent-olive mb-4">
            Lista de Presentes
          </h2>
          <motion.div
            className="w-24 h-1 bg-accent-olive mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-card border border-accent-olive/20 rounded-xl p-8 shadow-sm">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Heart
                className="w-12 h-12 text-accent-olive mx-auto mb-6"
                fill="currentColor"
              />
            </motion.div>
            <motion.h3
              className="text-2xl mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Sua presença é o nosso maior presente
            </motion.h3>
            <motion.p
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              O mais importante para nós é tê-los conosco neste dia tão
              especial. Sua presença e alegria são tudo o que precisamos para
              tornar nosso casamento ainda mais memorável.
            </motion.p>
            <motion.p
              className="text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              Mas se desejarem nos presentear, criamos algumas opções para
              facilitar:
            </motion.p>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            className="bg-card border border-accent-olive/20 rounded-xl p-8 text-center shadow-sm w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Gift className="w-10 h-10 text-accent-olive mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl mb-4">Lista Online</h3>
            <p className="text-muted-foreground mb-6">
              Presentes online com entrega direta para nossa casa. Prático e
              seguro.
            </p>
            <Button
              className="bg-accent-olive hover:bg-accent-olive-dark text-white"
              onClick={() => window.open("#", "_blank")}
            >
              Ver Lista Online
              {/* TODO: Adicionar link :) */}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
