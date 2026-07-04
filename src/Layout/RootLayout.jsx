import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { Footer, PageLoader } from "../components";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? <PageLoader key="loader" /> : <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45, ease: "easeOut" }}><Outlet /><Footer /></motion.div>}
    </AnimatePresence>
  );
}
