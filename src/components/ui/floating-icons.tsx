"use client";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaJava, FaDocker } from "react-icons/fa";
import { SiTensorflow, SiKubernetes, SiFirebase } from "react-icons/si";

const icons = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: FaPython, color: "#3776AB" },
  { Icon: FaJava, color: "#007396" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: SiTensorflow, color: "#FF6F00" },
  { Icon: SiKubernetes, color: "#326CE5" },
  { Icon: SiFirebase, color: "#FFCA28" },
];

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => {
        const { Icon, color } = icon;
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        const randomDuration = Math.random() * 10 + 20;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
              color,
            }}
            animate={{
              y: ["0%", "100%"],
              x: [
                `${randomX}%`,
                `${randomX + (Math.random() - 0.5) * 20}%`,
                `${randomX}%`,
              ],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon className="w-8 h-8 sm:w-12 sm:h-12 opacity-20" />
          </motion.div>
        );
      })}
    </div>
  );
}
