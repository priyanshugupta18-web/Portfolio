import { NavLink } from "react-router-dom";
import Hero from "../assets/Hero.png";
import {
  easeOut,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import AboutMeSnippet from "../Components/AboutMeSnippet";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import InfiniteMarquee from "../Components/InfiniteMarquee";
import Cards from "../Components/Cards";

export default function Home() {
  const getViewportMode = () => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < 768) return "mobile";
    if (window.innerWidth < 1200) return "tablet";
    return "desktop";
  };

  const [viewportMode, setViewportMode] = useState(getViewportMode);
  const isMobile = viewportMode === "mobile";
  const isTablet = viewportMode === "tablet";
  const shouldReduceMotion = useReducedMotion();
  const entryDistance = shouldReduceMotion ? 0 : isMobile ? -24 : isTablet ? -64 : -120;
  const revealDuration = shouldReduceMotion ? 0 : isMobile ? 0.6 : isTablet ? 0.85 : 1.2;
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const cardRef = useRef(null);
  const cardsInnerRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [cardSectionHeight, setCardSectionHeight] = useState("auto");

  const expRef = useRef(null);
  const [expParticles] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1.5,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 8,
      color: Math.random() > 0.6 ? "#a5b4fc" : "#7dd3fc",
    })),
  );

  const { scrollYProgress: expScroll } = useScroll({
    target: expRef,
    offset: ["start 85%", "center 65%"],
  });
  const expHeadingX = useTransform(
    expScroll,
    [0, 1],
    [entryDistance, 0],
  );
  const expOpacity = useTransform(expScroll, [0, 0.4], [0, 1]);

  useEffect(() => {
    const updateViewportMode = () => setViewportMode(getViewportMode());

    window.addEventListener("resize", updateViewportMode);
    return () => window.removeEventListener("resize", updateViewportMode);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start -40%", "end end"],
  });

  const cardX = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useEffect(() => {
    const cardsEl = cardsInnerRef.current;
    if (!cardsEl) return;

    const updateScrollDistance = () => {
      if (window.innerWidth < 768) {
        setScrollDistance(0);
        setCardSectionHeight("auto");
        return;
      }

      const totalWidth = cardsEl.scrollWidth;
      const distance = Math.max(0, totalWidth - window.innerWidth + 48);

      setScrollDistance(distance);
      setCardSectionHeight(
        `${Math.max(window.innerHeight * 2.25, distance + window.innerHeight + 360)}px`,
      );
    };

    updateScrollDistance();

    const resizeObserver = new ResizeObserver(updateScrollDistance);
    resizeObserver.observe(cardsEl);
    window.addEventListener("resize", updateScrollDistance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollDistance);
    };
  }, [viewportMode]);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(
    heroScroll,
    [0, 1],
    [0, shouldReduceMotion ? 0 : isMobile ? -32 : isTablet ? -64 : -100],
  );
  const heroImgY = useTransform(
    heroScroll,
    [0, 1],
    [0, shouldReduceMotion ? 0 : isTablet ? -100 : -160],
  );
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start 85%", "center 65%"],
  });

  const leftX = useTransform(
    aboutScroll,
    [0, 1],
    [shouldReduceMotion ? 0 : isMobile ? -20 : isTablet ? -70 : -140, 0],
  );
  const aboutOpacity = useTransform(aboutScroll, [0, 0.4], [0, 1]);

  return (
    <>
      <section
        ref={heroRef}
        className="relative z-20 grid min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden px-5 py-14 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] md:gap-4 md:px-8 md:py-8 lg:min-h-screen lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:gap-6 lg:px-10 lg:py-0 xl:grid-cols-[minmax(0,1fr)_minmax(440px,0.75fr)]"
      >
        <motion.div
          className="w-full max-w-3xl md:max-w-none"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.div className="w-full">
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
              className="text-xs font-normal uppercase tracking-widest text-gradient sm:text-sm"
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
              className="mt-8 text-4xl font-semibold tracking-wider text-white sm:mt-10 sm:text-5xl"
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
              className="mt-3 max-w-full break-words text-4xl font-semibold tracking-normal text-gradient sm:text-5xl lg:text-6xl"
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
              className="mt-4 text-lg font-medium leading-8 tracking-wide text-white sm:text-xl sm:tracking-wider lg:text-2xl lg:tracking-widest"
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
              className="text-lg font-medium leading-8 tracking-wide text-white sm:text-xl sm:tracking-wider lg:text-2xl lg:tracking-widest"
            >
              Web Experiences
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
                delay: 0.6,
              }}
              className="h-0.5 w-12 mt-8 grad"
            ></motion.div>

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
                delay: 0.7,
              }}
              className="mt-8 max-w-xl text-sm font-normal leading-7 tracking-wide text-white sm:tracking-widest"
            >
              I Craft modern web experiences while continuously exploring the
              art of software engineering.
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
                delay: 0.85,
              }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
            >
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
          className="relative hidden min-w-0 items-center justify-center md:flex"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.14, 1],
                opacity: [0.22, 0.42, 0.22],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-72 w-[115%] rounded-full bg-sky-400/20 blur-3xl lg:h-96"
            />
            <motion.div
              animate={{
                x: [-18, 18, -18],
                scaleX: [1, 1.08, 1],
                opacity: [0.28, 0.48, 0.28],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[12%] h-20 w-[135%] rounded-full bg-sky-300/20 blur-3xl lg:bottom-[8%] lg:h-28"
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
            className="relative z-10 h-[430px] w-full max-w-[360px] object-contain drop-shadow-[0_26px_35px_rgba(56,189,248,0.16)] [mask-image:linear-gradient(to_bottom,black_0%,black_58%,rgba(0,0,0,0.9)_66%,rgba(0,0,0,0.35)_76%,transparent_88%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_58%,rgba(0,0,0,0.9)_66%,rgba(0,0,0,0.35)_76%,transparent_88%)] lg:h-[500px] lg:max-w-[430px] xl:h-[560px] xl:max-w-[500px]"
            src={Hero}
            alt="Hero"
          />
        </motion.div>
      </section>

      <section
        ref={aboutRef}
        className="about-bg flex min-h-screen flex-col items-center justify-around overflow-hidden px-5 py-20 text-white sm:px-6 sm:py-24 lg:flex-row lg:px-16"
      >
        <motion.div
          style={{ x: leftX, opacity: aboutOpacity }}
          className="w-full max-w-[700px]"
        >
          <h2 className="text-4xl font-light text-gradient sm:text-5xl md:text-6xl lg:text-7xl">
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

          <div className="mt-12 flex flex-wrap items-center gap-4 sm:mt-16 sm:gap-5">
            <NavLink
              to="/projects"
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sky-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 sm:w-auto sm:py-5"
            >
              <span>10+ Projects</span>
              <FiArrowRight className="text-white" size={20} />
            </NavLink>

            <NavLink
              to="/stack"
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sky-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 sm:w-auto sm:py-5"
            >
              <span>Frontend Developer</span>
              <FiArrowRight className="text-white" size={20} />
            </NavLink>

            <NavLink
              to="/lab"
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sky-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 sm:w-auto sm:py-5"
            >
              <span>Problem Solver</span>
              <FiArrowRight className="text-white" size={20} />
            </NavLink>
          </div>
        </motion.div>

        <div className="mt-10 w-full min-w-0 lg:mt-0 lg:w-auto">
          <AboutMeSnippet isMobile={isMobile} />
        </div>
      </section>
      <section className="my-20 border-y border-white/10 bg-white/[0.03] shadow-xl backdrop-blur-md py-24 overflow-hidden">
        <motion.div
          initial={{ x: entryDistance, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{
            duration: revealDuration,
            ease: easeOut,
            delay: shouldReduceMotion ? 0 : 0.15,
          }}
          className="px-5 text-center text-4xl font-light tracking-normal text-gradient sm:text-5xl md:text-6xl lg:text-7xl"
        >
          What Stack do I use?
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          style={{ originX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: revealDuration,
            ease: easeOut,
            delay: shouldReduceMotion ? 0 : 0.2,
          }}
          className="mt-6 h-[1.5px] w-32 bg-sky-300 mx-auto"
        />

        <div className="mt-20">
          <InfiniteMarquee />
        </div>
      </section>
      <section
        ref={cardRef}
        className="relative overflow-hidden about-bg"
        style={{ height: cardSectionHeight }}
      >
        <div className="px-6 pt-24 pb-10 lg:px-16">
          <motion.div
            initial={{ x: entryDistance, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{
              duration: revealDuration,
              ease: easeOut,
              delay: shouldReduceMotion ? 0 : 0.15,
            }}
            className="text-center text-4xl font-light text-gradient sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Featured Projects
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            style={{ originX: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: revealDuration,
              ease: easeOut,
              delay: shouldReduceMotion ? 0 : 0.2,
            }}
            className="mx-auto mt-6 h-[1.5px] w-32 bg-sky-300"
          />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: shouldReduceMotion ? 0 : isMobile ? 0.6 : isTablet ? 0.75 : 0.9,
              ease: easeOut,
              delay: shouldReduceMotion ? 0 : 0.3,
            }}
            className="mx-auto mt-8 max-w-2xl text-center text-base leading-8 text-slate-300 md:text-lg"
          >
            Explore my{" "}
            <span className="font-medium text-sky-300">top 10 projects</span> —
            a curated collection of apps, games, and experiments spanning
            full-stack platforms, UI clones, and machine learning tools.
          </motion.p>
        </div>

        <div className="flex items-center overflow-hidden px-4 pb-20 md:sticky md:top-0 md:h-screen md:px-0 md:pb-0">
          <Cards x={isMobile ? 0 : cardX} innerRef={cardsInnerRef} />
        </div>
      </section>
      <section
        ref={expRef}
        className="w-full bg-white/[0.03] my-20 border-y border-white/10 py-16 backdrop-blur-md shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          {expParticles
            .slice(0, isMobile ? 7 : expParticles.length)
            .map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: p.left,
                  bottom: -6,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                }}
                animate={{ y: [0, -130], opacity: [0, 0.55, 0.3, 0] }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
        </div>

        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl sm:w-[600px]"
        />

        <motion.div
          style={{ x: expHeadingX, opacity: expOpacity }}
          className="px-5 py-3 text-center text-4xl font-light tracking-normal text-gradient md:text-6xl lg:text-7xl"
        >
          Experiments &amp; Blogs
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          style={{ originX: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: revealDuration,
            ease: easeOut,
            delay: shouldReduceMotion ? 0 : 0.2,
          }}
          className="bg-sky-300 h-[1.5px] w-20 md:w-32 mx-auto"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: shouldReduceMotion ? 0 : isMobile ? 0.6 : isTablet ? 0.75 : 0.9,
            ease: easeOut,
            delay: shouldReduceMotion ? 0 : 0.3,
          }}
          className="mx-5 py-12 text-center text-lg font-light leading-8 tracking-wide text-white sm:mx-10 sm:text-xl md:mx-30 md:py-16 md:text-2xl lg:mx-50"
        >
          <span className="mr-2 text-2xl text-sky-300">❝</span>I love doing
          experiments, I always try to build new things and see the results and
          I also love documenting those results and my experiences through
          blogs. Checkout my works and write-ups.
          <span className="ml-2 text-2xl text-sky-300">❞</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: shouldReduceMotion ? 0 : isMobile ? 0.6 : 0.8,
            ease: easeOut,
            delay: shouldReduceMotion ? 0 : 0.35,
          }}
          className="mb-14 flex flex-wrap justify-center gap-x-10 gap-y-8 px-5 md:mb-16 md:gap-24"
        >
          {[
            { value: "10+", label: "Experiments" },
            { value: "5+", label: "Blog Posts" },
            { value: "∞", label: "Curiosity" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: easeOut,
                delay: shouldReduceMotion ? 0 : 0.4 + i * 0.1,
              }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-3xl md:text-4xl font-light text-gradient">
                {stat.value}
              </span>
              <span className="text-sm tracking-widest text-slate-400 uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: shouldReduceMotion ? 0 : isMobile ? 0.6 : 0.8,
            ease: easeOut,
            delay: shouldReduceMotion ? 0 : 0.5,
          }}
          className="flex flex-wrap items-center justify-center gap-4 px-5 md:gap-8"
        >
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <NavLink
              to="/Lab"
              className="rounded-full text-slate-950 text-lg md:text-xl items-center flex bg-sky-400 px-5 py-3 gap-3 font-medium tracking-wide shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:bg-sky-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.55)] transition-all duration-300"
            >
              <span>Lab</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FiArrowRight size={22} />
              </motion.span>
            </NavLink>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <div className="rounded-full flex text-white text-lg md:text-xl border border-white/15 bg-white/[0.03] px-5 py-3 gap-3 items-center font-medium tracking-wide backdrop-blur-md cursor-pointer hover:border-sky-300/50 hover:bg-sky-400/[0.08] transition-all duration-300">
              <span>Blogs</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <FiArrowRight size={22} />
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-slate-950/45 px-5 py-20 sm:px-10 md:py-24 lg:px-16">
        <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <motion.div
            initial={{ opacity: 0, x: entryDistance }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: revealDuration, ease: easeOut }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-sky-300 sm:text-sm">
              Open to collaboration
            </span>
            <h2 className="mt-5 max-w-3xl text-4xl font-light leading-tight text-gradient sm:text-5xl lg:text-6xl">
              Let&apos;s build something thoughtful together.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I enjoy turning ambitious ideas into useful, polished web
              experiences. I&apos;m always interested in meeting curious people,
              exchanging perspectives, and collaborating on work that creates
              real value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              ease: easeOut,
              delay: shouldReduceMotion ? 0 : 0.2,
            }}
            className="flex flex-wrap gap-3 md:max-w-56 md:justify-end"
          >
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="https://www.linkedin.com/in/priyanshugupta18/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit LinkedIn profile"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors hover:border-sky-300/50 hover:text-sky-300"
            >
              <FiLinkedin size={21} />
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="https://github.com/priyanshugupta18-web"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit GitHub profile"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors hover:border-sky-300/50 hover:text-sky-300"
            >
              <FiGithub size={21} />
            </motion.a>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <NavLink
                to="/contact"
                className="inline-flex h-12 items-center gap-3 rounded-full bg-sky-400 px-6 font-medium text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-colors hover:bg-sky-300"
              >
                Contact me
                <FiMail size={18} />
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
