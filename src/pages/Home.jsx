import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub, FaReact } from "react-icons/fa";
import { SiAppwrite, SiCss, SiExpress, SiFramer, SiGit, SiHtml5, SiJavascript, SiMongodb, SiNodedotjs, SiRedux, SiTailwindcss } from "react-icons/si";
import { ContactForm, Hero, Navbar } from "../components";
import writeItCover from "../assets/writeit-editorial.jpg";

const reveal = { initial: { opacity: 0, y: 16, filter: "blur(3px)" }, whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, viewport: { once: true, amount: .08, margin: "0px 0px -60px" }, transition: { duration: .82, ease: [0.22, 1, .36, 1] } };
const technologies = [[FaReact,"React","Frontend architecture"],[SiJavascript,"JavaScript","Core language"],[SiRedux,"Redux Toolkit","State management"],[SiTailwindcss,"Tailwind CSS","Responsive styling"],[SiFramer,"Motion","Animation"],[SiAppwrite,"Appwrite","Backend services"],[SiNodedotjs,"Node.js","Server runtime"],[SiExpress,"Express","Backend APIs"],[SiMongodb,"MongoDB","Database"],[SiHtml5,"HTML5","Semantic markup"],[SiCss,"CSS3","Interface styling"],[SiGit,"Git","Version control"],[FaGithub,"GitHub","Collaboration"]];

function SectionHeading({ title, description }) {
  return <motion.header className="simple-heading" {...reveal}><h2>{title}</h2>{description && <p>{description}</p>}</motion.header>;
}

export default function Home() {
  return (
    <><Navbar /><main><div className="shell"><Hero /></div>
      <section className="work-section" id="work"><div className="shell">
        <SectionHeading title="Projects" description="Real-world applications where I apply modern engineering practices." />
        <motion.article className="featured-project" {...reveal}><a className="project-image" href="https://writeit-delta.vercel.app/" target="_blank" rel="noreferrer"><motion.img src={writeItCover} alt="Manuscript paper and letterpress type representing WriteIt" whileHover={{ scale:1.035 }} transition={{ duration:.6 }} /><span><ExternalLink size={16} /> View live</span></a><div className="project-copy"><div className="project-top"><span>Full-stack blogging platform</span><span>2026</span></div><div><h3>WriteIt</h3><p>A full-stack blogging platform for securely creating, editing, publishing, and managing rich-text articles with image uploads. It combines protected routes, state management, Appwrite services, and a responsive animated interface.</p></div><div><ul><li>React</li><li>Redux Toolkit</li><li>Tailwind CSS</li><li>Motion</li><li>Appwrite</li><li>TinyMCE</li></ul><div className="project-links"><a href="https://writeit-delta.vercel.app/" target="_blank" rel="noreferrer">Live project <ArrowUpRight size={15} /></a><a href="https://github.com/priyanshugupta18-web/writeIt" target="_blank" rel="noreferrer"><FaGithub /> Source code</a></div></div></div></motion.article>
      </div></section>

      <section className="about-section" id="about"><div className="shell">
        <SectionHeading title="About me" />
        <motion.div className="about-grid" {...reveal}><div className="about-copy"><p>I am a Frontend Developer and Computer Science undergraduate who learns best by building real products.</p><span>I enjoy transforming ideas into scalable, user-focused applications while continuously improving my software engineering skills. Beyond writing code, I am interested in application architecture, performance optimization, and understanding how software works beneath the surface.</span></div><div className="about-facts"><div><span>Designation</span><p>Frontend Developer</p></div><div><span>Primary stack</span><p>JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, and Appwrite</p></div><div><span>Goal</span><p>Become a well-rounded software engineer by building reliable, scalable applications</p></div></div></motion.div>
      </div></section>

      <section className="stack-section" id="stack"><div className="shell">
        <SectionHeading title="Tech stack" description="The tools I use across frontend development, state management, backend services, and content editing." />
        <motion.div className="tech-grid" {...reveal}>{technologies.map(([Icon,name,role])=><motion.div className="tech-card" key={name} whileHover={{ y:-5 }}><Icon /><div><h3>{name}</h3><p>{role}</p></div></motion.div>)}</motion.div>
      </div></section>

      <section className="contact-section" id="contact"><div className="shell"><SectionHeading title="Contact" description="Looking for a Frontend Developer or have an interesting project? Send me a message." /><motion.div className="contact-layout" {...reveal}><div className="contact-copy"><h2>Let's build something meaningful.</h2><p>I am interested in frontend opportunities that challenge me to learn, contribute, and grow as a software engineer.</p><a href="mailto:priyanshuguptawebdev@gmail.com">priyanshuguptawebdev@gmail.com <ArrowUpRight size={15} /></a></div><ContactForm /></motion.div></div></section>
    </main></>
  );
}
