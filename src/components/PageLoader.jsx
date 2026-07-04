import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div className="page-loader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .55, ease: [0.4, 0, 0.2, 1] } }}>
      <div className="loader-aurora loader-aurora-one" /><div className="loader-aurora loader-aurora-two" />
      <motion.div className="loader-center" initial="hidden" animate="visible">
        <div className="loader-wordmark" aria-label="Loading portfolio">
          {[".", "/", "M", "e"].map((letter, index) => <motion.span key={`${letter}-${index}`} variants={{ hidden: { opacity: 0, y: 28, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: index * .09, duration: .55, ease: [0.22, 1, .36, 1] } } }}>{letter}</motion.span>)}
        </div>
        <div className="loader-track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .25, duration: 1.15, ease: [0.65, 0, .35, 1] }} /></div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55, duration: .4 }}>Loading portfolio</motion.p>
      </motion.div>
      <motion.span className="loader-orbit" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}><i /></motion.span>
    </motion.div>
  );
}
