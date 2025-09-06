import { motion } from "motion/react";
import { useCountdown } from "../hooks/useCountdown";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const timeLeft = useCountdown(targetDate);

  const timeUnits = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <motion.div
            key={unit.value}
            className="bg-accent-olive/10 border border-accent-olive/20 rounded-lg p-3 sm:p-4 mb-2 transition-transform duration-300"
            animate={{
              scale: unit.label === "Segundos" ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: unit.label === "Segundos" ? 1 : 0,
              repeat: unit.label === "Segundos" ? Infinity : 0,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="text-2xl sm:text-4xl font-medium text-accent-olive"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{
                duration: 0.5,
                repeat: unit.label === "Segundos" ? Infinity : 0,
                repeatType: "reverse",
              }}
            >
              {unit.value.toString().padStart(2, "0")}
            </motion.span>
          </motion.div>
          <motion.p
            className="text-sm sm:text-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
          >
            {unit.label}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}
