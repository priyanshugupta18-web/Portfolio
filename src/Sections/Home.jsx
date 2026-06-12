import { NavLink } from "react-router-dom";
import Hero from "../assets/Hero.png";
import { easeOut, motion, useScroll, useTransform } from "framer-motion";
import AboutMeSnippet from "../Components/AboutMeSnippet";
import { FiArrowRight } from "react-icons/fi";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(heroScroll, [0, 1], [0, -100]);
  const heroImgY = useTransform(heroScroll, [0, 1], [0, -160]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start 85%", "center 65%"],
  });

  const leftX = useTransform(aboutScroll, [0, 1], [-140, 0]);
  const aboutOpacity = useTransform(aboutScroll, [0, 0.4], [0, 1]);

  return (
    <>
      <section
        ref={heroRef}
        className="flex justify-center mt-20 mb-20 lg:mt-0 lg:mb-0 lg:min-h-screen items-center z-50"
      >
        <motion.div style={{ y: heroTextY, opacity: heroOpacity }}>
          <motion.div className="p-2 mx-10">
            <motion.div
              initial={{
                x: -30,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: easeOut,
                delay: 0.1,
              }}
              className="uppercase text-sm font-normal tracking-widest text-gradient"
            >
              Welcome to my World
            </motion.div>

            <motion.div
              initial={{
                x: -30,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: easeOut,
                delay: 0.25,
              }}
              className="text-5xl mt-10 font-semibold text-white tracking-wider"
            >
              Hi I'm
            </motion.div>

            <motion.div
              initial={{
                x: -30,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: easeOut,
                delay: 0.4,
              }}
              className="text-6xl mt-3 font-semibold text-gradient tracking-wide"
            >
              Priyanshu Gupta
            </motion.div>

            <motion.div
              initial={{
                x: -30,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: easeOut,
                delay: 0.55,
              }}
              className="text-2xl mt-4 font-medium tracking-widest text-white"
            >
              Front-end Developer | Building Scalable
            </motion.div>

            <motion.div
              initial={{
                x: -30,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: easeOut,
                delay: 0.55,
              }}
              className="text-2xl font-medium tracking-widest text-white"
            >
              Web Experiences
            </motion.div>

            <motion.div 
            initial={{
                x:-30,
                opacity: 0,
              }}
              animate={{
                x:0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: easeOut,
                delay: 0.6,
              }}
            className="h-0.5 w-12 mt-8 grad"></motion.div>

            <motion.div 
            initial={{
                x:-30,
                opacity: 0,
              }}
              animate={{
                x:0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: easeOut,
                delay: 0.7,
              }}
            className="mt-8 lg:max-w-150 text-sm tracking-widest text-white font-normal">
              I Craft modern web experiences while continuously exploring the
              art of software engineering.
            </motion.div>

            <motion.div 
            initial={{
                x:-30,
                opacity: 0,
              }}
              animate={{
                x:0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: easeOut,
                delay: 0.85,
              }}
            className="flex items-center gap-5 mt-8">
              <NavLink
                to="/projects"
                className="md:px-6 md:py-3 px-3 py-2 rounded-full bg-sky-400 text-slate-950 font-medium tracking-wide shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:bg-sky-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.55)] transition-all duration-300"
              >
                Projects
              </NavLink>

              <a
                href="/resume.pdf"
                className="md:px-6 md:py-3 px-3 py-2 rounded-full border border-white/15 bg-white/[0.03] text-white font-medium tracking-wide backdrop-blur-md hover:border-sky-300/50 hover:bg-sky-400/[0.08] transition-all duration-300"
              >
                Resume
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: heroImgY, opacity: heroOpacity }}
          className="hidden lg:block relative"
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-96 h-96 rounded-full bg-sky-400/15 blur-3xl"
            />
          </div>

          <motion.img
            initial={{ x: 60, opacity: 0, scale: 0.92 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
              y: [0, -16, 0],
            }}
            transition={{
              x: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.8 },
              scale: { duration: 0.8, ease: "easeOut" },
              y: { ease: "easeInOut", duration: 3, repeat: Infinity },
            }}
            className="relative h-[520px] z-10 object-contain [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
            src={Hero}
            alt="Hero"
          />
        </motion.div>
      </section>

      <section
        ref={aboutRef}
        className="about-bg flex min-h-screen flex-col items-center justify-around px-6 py-24 text-white lg:flex-row lg:px-16"
      >
        <motion.div
          style={{ x: leftX, opacity: aboutOpacity }}
          className="max-w-[700px]"
        >
          <h2 className="text-5xl font-light text-gradient md:text-6xl lg:text-7xl">
            Who am I?
          </h2>

          <div className="mt-4 h-[2px] w-24 bg-sky-300" />

          <p className="mt-10 max-w-[620px] text-base leading-8 text-slate-200 md:text-lg lg:text-xl lg:leading-9">
            <span className="mr-2 text-2xl text-sky-300">❝</span>
            I'm a Computer Science undergraduate at the Central University of
            Jammu, passionate about building modern web experiences and
            transforming ideas into real-world applications. I enjoy working
            with React, exploring software engineering concepts, and
            continuously expanding my technical skills through projects and
            hackathons.
            <span className="ml-2 text-2xl text-sky-300">❞</span>
          </p>

          <div className="mt-16 flex flex-wrap items-center gap-5">
            <NavLink
              to="/projects"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-5 text-sky-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30"
            >
              <span>10+ Projects</span>
              <FiArrowRight className="text-white" size={20} />
            </NavLink>

            <NavLink
              to="/stack"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-5 text-sky-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30"
            >
              <span>Frontend Developer</span>
              <FiArrowRight className="text-white" size={20} />
            </NavLink>

            <NavLink
              to="/lab"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-5 text-sky-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30"
            >
              <span>Problem Solver</span>
              <FiArrowRight className="text-white" size={20} />
            </NavLink>
          </div>
        </motion.div>

        <div className="mt-16 lg:mt-0">
          <AboutMeSnippet />
        </div>
      </section>
    </>
  );
}
