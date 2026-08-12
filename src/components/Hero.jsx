import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Braces, Layers3 } from "lucide-react";
import profileImage from "../assets/profile2.jpeg";

const reveal = { hidden: { opacity: 0, y: 18, filter: "blur(3px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: .72, ease: [0.22, 1, .36, 1] } } };

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <motion.div className="hero-copy" style={{ y: copyY }} initial="hidden" animate="visible" transition={{ staggerChildren: .1, delayChildren: .1 }}>
        <motion.p className="hero-overline" variants={reveal}>Frontend Developer / Computer Science undergraduate</motion.p>
        <motion.h1 variants={reveal}>I turn ideas into reliable web applications.</motion.h1>
        <motion.p className="hero-intro" variants={reveal}>I am Priyanshu, an aspiring software engineer learning full-stack development by building practical, user-focused products with modern technologies.</motion.p>
        <motion.div className="hero-actions" variants={reveal}><a className="button-primary" href="#work">View projects <ArrowDownRight size={17} /></a><a className="button-quiet" href="mailto:priyanshuguptawebdev@gmail.com">Contact me <ArrowUpRight size={16} /></a></motion.div>
      </motion.div>

      <motion.div className="portrait-stage" style={{ y: portraitY }} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .7, ease: [0.16, 1, .3, 1] }}>
        <motion.div className="portrait-halo" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}><i /><i /><i /></motion.div>
        <motion.div className="portrait-backdrop" animate={{ rotate: [4, 7, 4], scale: [1, 1.025, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <div className="portrait-frame"><motion.img src={profileImage} alt="Priyanshu Gupta" animate={{ scale: [1.01, 1.035, 1.01] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} /></div>
        <motion.div className="portrait-tag tag-one" initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0, y: [0, -7, 0] }} transition={{ opacity: { delay: .65 }, x: { delay: .65 }, y: { delay: .9, duration: 4.2, repeat: Infinity, ease: "easeInOut" } }}><Braces size={16} /><span><b>Frontend Developer</b>React architecture</span></motion.div>
        <motion.div className="portrait-tag tag-two" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0, y: [0, 8, 0] }} transition={{ opacity: { delay: .8 }, x: { delay: .8 }, y: { delay: 1, duration: 5, repeat: Infinity, ease: "easeInOut" } }}><Layers3 size={16} /><span><b>Full-stack learner</b>Learning by building</span></motion.div>
        <motion.span className="portrait-orbit" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}><i /></motion.span>
        <motion.span className="portrait-spark spark-one" animate={{ y: [0, -12, 0], rotate: [0, 12, 0], scale: [1, 1.12, 1] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}>+</motion.span>
        <motion.span className="portrait-spark spark-two" animate={{ x: [0, 10, 0], y: [0, 7, 0], rotate: [0, -18, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}>✦</motion.span>
      </motion.div>
    </section>
  );
}
