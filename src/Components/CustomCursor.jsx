import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0
   fixed top-0 left-0
    w-48 h-48
    rounded-full
    bg-radial-[at_center]
    from-sky-300/15
    via-cyan-400/5
    to-transparent
    blur-2xl
    pointer-events-none
    z-[9999]"
    ></div>
  );
}
