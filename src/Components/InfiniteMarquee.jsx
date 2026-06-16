import { motion } from "framer-motion";
import TechRow from "./TechRow";

export default function InfiniteMarquee() {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <TechRow />
        <TechRow />
      </motion.div>
    </div>
  );
}
