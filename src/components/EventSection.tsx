import { useId } from "react";
import { motion } from "motion/react";
import { MapPin, Calendar, Clock, Shirt } from "lucide-react";
import { EventTimeline } from "./EventTimeline";
import { colorPalette, weddingInfo } from "../config/constants";

export function EventSection() {
  const sectionId = useId();

  return (
    <section id={sectionId} className="py-20 px-4 bg-neutral-dark/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-accent-olive mb-4">
            Celebração
          </h2>
          <motion.div
            className="w-24 h-1 bg-accent-olive mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="bg-card border border-accent-olive/20 rounded-xl p-6 text-center shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Calendar className="w-6 h-6 text-accent-olive" />
              <Clock className="w-6 h-6 text-accent-olive" />
            </motion.div>
            <h3 className="text-xl mb-2">Data e Horário</h3>
            <p className="text-muted-foreground">
              {weddingInfo.weddingDate.toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-muted-foreground">
              {weddingInfo.weddingDate.toLocaleDateString("pt-BR", {
                weekday: "long",
              })}
            </p>
            <div className="mt-3 pt-3 border-t border-accent-olive/20">
              <p className="text-muted-foreground">
                Cerimônia às{" "}
                {weddingInfo.ceremonyDate.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-muted-foreground">
                Festa às{" "}
                {weddingInfo.partyDate.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-card border border-accent-olive/20 rounded-xl p-6 text-center shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <MapPin className="w-8 h-8 text-accent-olive mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl mb-2">Local</h3>
            <p className="text-muted-foreground">{weddingInfo.venue.name}</p>
            <p className="text-muted-foreground">{weddingInfo.venue.address}</p>
            <a
              href={weddingInfo.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-accent-olive hover:bg-accent-olive-dark text-white rounded-lg transition-colors text-sm"
            >
              Ver no Maps
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-card border border-accent-olive/20 rounded-xl p-8 shadow-sm">
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Shirt className="w-6 h-6 text-accent-olive" />
              <h3 className="text-2xl text-accent-olive">Dress Code</h3>
            </motion.div>

            <motion.p
              className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Para nosso dia especial, gostaríamos de uma atmosfera elegante e
              harmoniosa. Sugerimos trajes esporte fino nas cores da nossa
              paleta de inspiração.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4">
              {colorPalette.map((color, index) => (
                <motion.div
                  key={color.name}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="w-16 h-16 rounded-full border-2 border-accent-olive/30 shadow-sm mb-2 mx-auto"
                    style={{ backgroundColor: color.color }}
                  />
                  <p className="text-sm text-muted-foreground">{color.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h3
            className="text-2xl sm:text-3xl text-accent-olive text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Programação do Dia
          </motion.h3>
          <EventTimeline />
        </motion.div>
      </div>
    </section>
  );
}
