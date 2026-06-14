import { useEffect } from "react";
import { useMotionValue, animate, useTransform, motion} from "framer-motion";


export default function RedoAnimateText() {
  const textIndex = useMotionValue(0);
  const texts = [
    "Front-end Developer,",
    "React Developer,",
    "Problem Solver,",
    "Blogger,",
  ];

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest),
  );

  const updatedThisRound = useMotionValue(true);

  useEffect(() =>{
    animate(count, 60, {
        type: "tween",
        duration: 1.8,
        ease:"easeIn",
        repeat:Infinity,
        repeatType:"reverse",
        repeatDelay: 1,
        onUpdate(latest) {
            if(updatedThisRound.get()=== true && latest > 0) {
                updatedThisRound.set(false);
            } else if (updatedThisRound.get() === false && latest === 0){
                if(textIndex.get() === texts.length - 1) {
                    textIndex.set(0);
                } else {
                    textIndex.set(textIndex.get() + 1);
                }
                updatedThisRound.set(true);
            }
        }
    })
  }, []);
  return <motion.span className="text-emerald-400 inline">{displayText}</motion.span>
}
