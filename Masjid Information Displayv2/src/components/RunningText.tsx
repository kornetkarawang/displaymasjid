import { motion } from "motion/react";

export function RunningText() {
  const messages = [
    "Selamat datang di Masjid Al-Ikhlas",
    "Mari ramaikan masjid dengan sholat berjamaah",
    "Kebersihan adalah sebagian dari iman",
    "Infaq dan sedekah dapat dititipkan ke kotak amal",
    "Kajian rutin setiap Jum'at ba'da Maghrib",
  ];

  const fullText = messages.join(" • ") + " • ";
  const repeatedText = fullText.repeat(3);

  return (
    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 border-t-2 border-b-2 border-amber-400 py-3 overflow-hidden shadow-lg">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -33.33 + "%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="text-amber-100 text-xl px-4">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}