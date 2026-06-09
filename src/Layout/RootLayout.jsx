import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Sections/Footer";
import CustomCursor from "../Components/CustomCursor";
import ParticlesBackground from "../Components/ParticlesBackground";
import "../index.css";
import Home from "../Sections/Home";
import About from "../Sections/About";
import Projects from "../Sections/Projects";
import Contact from "../Sections/Contact";
import Lab from "../Sections/Lab";
import Stack from "../Sections/Stack"

export default function RootLayout() {
  return (
    <div className="gradient">
      <ParticlesBackground />
      <CustomCursor />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
