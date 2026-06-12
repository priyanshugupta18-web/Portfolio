import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Sections/Footer";
import ParticlesBackground from "../Components/ParticlesBackground";
import "../index.css";
import Home from "../Sections/Home";
import About from "../Sections/About";
import Projects from "../Sections/Projects";
import Contact from "../Sections/Contact";
import Lab from "../Sections/Lab";
import Stack from "../Sections/Stack";

export default function RootLayout() {
  return (
    <div className="min-h-dvh text-white overflow-x-hidden">
      <ParticlesBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
