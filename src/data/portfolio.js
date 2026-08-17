import { FaGithub, FaLinkedinIn, FaReact } from 'react-icons/fa'
import {
  SiAppwrite,
  SiCss,
  SiExpress,
  SiFramer,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiRedux,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube, FaReddit } from "react-icons/fa";

export const profile = {
  name: 'Priyanshu Gupta',
  role: 'Student',
  email: 'priyanshuguptawebdev@gmail.com',
  intro:
    'Hi, I am Priyanshu Gupta, a CSE undergrad and an aspiring software developer.',
  navItems: [
    { label: 'Projects', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Stack', href: '#stack' },
    { label: 'Contact', href: '#contact' },
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/techyyp', icon: FaGithub },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/techyyp/', icon: FaLinkedinIn },
    { label: 'X', href: 'https://x.com/techyyp/', icon: FaSquareXTwitter },
    { label: 'YouTube', href: 'https://youtube.com/@techyyp/', icon: FaYoutube},
    { label: 'Reddit', href: 'https://www.reddit.com/user/Priyanshuyk/', icon: FaReddit},
  ],
}

export const featuredProjects = [
  {
    title: 'WriteIt',
    eyebrow: 'Full-stack blogging platform',
    year: '2026',
    imageAlt: 'Manuscript paper and letterpress type representing WriteIt',
    description:
      'A full-stack blogging platform for securely creating, editing, publishing, and managing rich-text articles with image uploads. It combines protected routes, state management, Appwrite services, and a responsive animated interface.',
    technologies: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Motion', 'Appwrite', 'TinyMCE'],
    liveUrl: 'https://writeit-delta.vercel.app/',
    sourceUrl: 'https://github.com/priyanshugupta18-web/writeIt',
  },
]

export const aboutFacts = [
  { label: 'Designation', value: 'Student, Software Developer and YouTuber' },
  {
    label: 'Skills',
    value: 'Web Development, App Development, Public Speaking and Leadership',
  },
  {
    label: 'Goal',
    value: 'Become a Software Developer and contribute to the Tech Community by writing code and sharing experiences',
  },
]

export const technologies = [
  { icon: FaReact, name: 'React', role: 'Frontend architecture' },
  { icon: SiJavascript, name: 'JavaScript', role: 'Core language' },
  { icon: SiRedux, name: 'Redux Toolkit', role: 'State management' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', role: 'Responsive styling' },
  { icon: SiFramer, name: 'Motion', role: 'Animation' },
  { icon: SiAppwrite, name: 'Appwrite', role: 'Backend services' },
  { icon: SiNodedotjs, name: 'Node.js', role: 'Server runtime' },
  { icon: SiExpress, name: 'Express', role: 'Backend APIs' },
  { icon: SiMongodb, name: 'MongoDB', role: 'Database' },
  { icon: SiHtml5, name: 'HTML5', role: 'Semantic markup' },
  { icon: SiCss, name: 'CSS3', role: 'Interface styling' },
  { icon: SiGit, name: 'Git', role: 'Version control' },
  { icon: FaGithub, name: 'GitHub', role: 'Collaboration' },
  { icon: SiReact, name: 'React Native', role: 'App Development' },
]


