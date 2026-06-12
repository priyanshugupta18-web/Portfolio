import React from "react";
import { useTransform, useScroll, motion } from "framer-motion";
import { useRef } from "react";

export default function AboutMeSnippet() {
  const scrollRef = useRef(null);
  
  const {scrollYProgress} = useScroll({
    target: scrollRef,
    offset: ["start 85%", "center 65%"]  
  });

  const rightX = useTransform(scrollYProgress, [0,1], [140, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  return (
    <motion.div
    ref={scrollRef}
    style={{x: rightX, opacity: opacity}}
    className="relative max-w-3xl mx-auto my-16 px-4"
    >
      <div className="absolute inset-0 bg-sky-500/5 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="w-full rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md shadow-2xl overflow-hidden font-mono text-sm leading-relaxed text-slate-300">
        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="text-xs text-slate-500 ml-2 select-none">
            developerConfig.js
          </span>
        </div>

        {/* Code Body */}
        <motion.div
          
          className="p-6 overflow-x-auto text-xs md:text-sm space-y-1"
        >
          <div>
            <span className="text-pink-500 font-medium">const</span>{" "}
            <span className="text-sky-400">developer</span> = {"{"}
          </div>

          <div className="pl-6">
            <span className="text-slate-400">name:</span>{" "}
            <span className="text-emerald-400">'Priyanshu Gupta'</span>,
          </div>

          <div className="pl-6">
            <span className="text-slate-400">role:</span>{" "}
            <span className="text-emerald-400">'Frontend Developer'</span>,
          </div>

          <div className="pl-6">
            <span className="text-slate-400">education:</span>{" "}
            <span className="text-emerald-400">
              'B.Tech CSE @ Central University of Jammu'
            </span>
            ,
          </div>

          <div className="pl-6">
            <span className="text-slate-400">currentFocus:</span>{" "}
            <span className="text-emerald-400">
              'React Ecosystem & Algorithms'
            </span>
            ,
          </div>

          <div className="pl-6">
            <span className="text-slate-400">milestones:</span> {"["}
          </div>

          <div className="pl-12 text-emerald-400">'10+ Projects Built',</div>
          <div className="pl-12 text-emerald-400">
            '5+ hackathon wins'
          </div>

          <div className="pl-6">{"],"}</div>

          <div className="pl-6">
            <span className="text-violet-400">isLookingForOpportunities:</span>{" "}
            <span className="text-amber-500">true</span>
          </div>

          <div>{"};"}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
