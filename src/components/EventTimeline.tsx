import { motion } from "motion/react";
import { timelineEvents } from "../config/constants";
import { Clock } from "lucide-react";

export function EventTimeline() {
  return (
    <div className="relative">
      <motion.div
        className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent-olive/30"
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        transition={{ duration: 1.5, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.time}
            className="relative flex items-start gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="relative">
              <motion.div
                className="w-16 h-16 bg-accent-olive rounded-full flex items-center justify-center text-white shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.6 }}
                  viewport={{ once: true }}
                >
                  <event.icon size={24} />
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute inset-0 w-16 h-16 bg-accent-olive rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            </div>

            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-card border border-accent-olive/20 rounded-xl p-6 shadow-sm">
                <motion.div
                  className="flex items-center gap-3 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                >
                  <span className="text-2xl text-accent-olive font-medium">
                    {event.time}
                  </span>
                  <Clock size={18} className="text-accent-olive/70" />
                </motion.div>
                <motion.h3
                  className="text-xl mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.6 }}
                  viewport={{ once: true }}
                >
                  {event.title}
                </motion.h3>
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.8 }}
                  viewport={{ once: true }}
                >
                  {event.description}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
