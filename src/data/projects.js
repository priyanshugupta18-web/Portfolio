import {
  lostAndFound,
  studentGradePredictor,
  currencyConverter,
  passwordGenerator,
  rockPaperScissors,
  ticTacToe,
  flipkartUIClone,
} from "../assets/thumbnails";

export const featuredProjects = [
  {
    slug: "lost-and-found",
    name: "Lost and Found",
    category: "Full Stack",
    techStack: ["JavaScript", "Firebase", "Cloudinary"],
    description:
      "A campus platform for reporting, discovering, and recovering lost items.",
    overview:
      "A full-stack campus platform that helps students report, discover, and recover lost items through real-time listings, image uploads, and secure authentication. Built to solve a common university problem with a clean, accessible interface.",
    highlights: [
      "Real-time item listings with Firebase",
      "Image uploads via Cloudinary",
      "Secure user authentication",
      "Search and filter lost items",
    ],
    thumbnail: lostAndFound,
    githubUrl: "https://github.com/priyanshugupta18-web/Lost-and-found",
    liveUrl: "https://lost-and-found-hazel-psi.vercel.app",
  },
  {
    slug: "student-grade-predictor",
    name: "Student Grade Predictor",
    category: "Machine Learning",
    techStack: ["Python", "Scikit-learn", "Pandas"],
    description:
      "ML app that predicts student performance from educational datasets.",
    overview:
      "A machine learning application that predicts student academic performance using classification and regression models trained on educational datasets. Explores data preprocessing, model training, and interactive result visualization.",
    highlights: [
      "Dataset preprocessing with Pandas",
      "Classification & regression models",
      "Interactive Streamlit interface",
      "Performance metrics evaluation",
    ],
    thumbnail: studentGradePredictor,
    githubUrl:
      "https://github.com/priyanshugupta18-web/student-performance-predictor",
    liveUrl: "https://student-performance-predictor18.streamlit.app/",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    category: "React App",
    techStack: ["React", "API Integration", "Hooks"],
    description:
      "Live exchange-rate converter built with React and REST APIs.",
    overview:
      "A React-based currency conversion tool that fetches live exchange rates and delivers accurate real-time conversions across multiple currencies. Focused on clean state management and responsive UI.",
    highlights: [
      "Live exchange rate API integration",
      "Multi-currency support",
      "React hooks for state management",
      "Responsive layout",
    ],
    thumbnail: currencyConverter,
    githubUrl: "https://github.com/priyanshugupta18-web/currency-converter",
    liveUrl: null,
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "React App",
    techStack: ["React", "Clipboard API", "Tailwind"],
    description:
      "Customizable secure password generator with one-click copy.",
    overview:
      "A customizable password generator featuring adjustable length, character type controls, and one-click clipboard support for secure password creation. Built with a focus on usability and modern styling.",
    highlights: [
      "Adjustable password length",
      "Toggle uppercase, numbers & symbols",
      "One-click copy to clipboard",
      "Tailwind-powered responsive UI",
    ],
    thumbnail: passwordGenerator,
    githubUrl: "https://github.com/priyanshugupta18-web/password-generator",
    liveUrl: "https://password-generator-alpha-tan.vercel.app",
  },
  {
    slug: "rock-paper-scissors",
    name: "Rock Paper Scissors",
    category: "Browser Game",
    techStack: ["JavaScript", "DOM", "Event Handling"],
    description:
      "Interactive browser game with score tracking and random AI moves.",
    overview:
      "A browser-based game featuring random computer moves, score tracking, and dynamic game outcomes through interactive user actions. A fun project to practice vanilla JavaScript and DOM manipulation.",
    highlights: [
      "Random computer opponent logic",
      "Live score tracking",
      "Animated game outcomes",
      "Pure JavaScript — no frameworks",
    ],
    thumbnail: rockPaperScissors,
    githubUrl: "https://github.com/priyanshugupta18-web/rock-paper-scissors",
    liveUrl: null,
  },
  {
    slug: "tic-tac-toe",
    name: "Tic Tac Toe",
    category: "Browser Game",
    techStack: ["JavaScript", "DOM", "Event Handling"],
    description:
      "Classic two-player game with turn logic and winner detection.",
    overview:
      "A classic strategy game built to practice state management, turn-based logic, winner detection, and interactive UI development. Includes win/draw detection and a reset flow.",
    highlights: [
      "Turn-based game state",
      "Win & draw detection",
      "Interactive grid UI",
      "Reset and replay flow",
    ],
    thumbnail: ticTacToe,
    githubUrl: "https://github.com/priyanshugupta18-web/Tic-Tac-Toe-Game",
    liveUrl: "https://tic-tac-toe-game-cyan-pi.vercel.app",
  },
  {
    slug: "flipkart-ui-clone",
    name: "Flipkart UI Clone",
    category: "UI Clone",
    techStack: ["HTML", "Tailwind", "Responsive Design"],
    description:
      "Responsive e-commerce UI inspired by Flipkart's layout and components.",
    overview:
      "A responsive e-commerce interface inspired by Flipkart, focused on layout design, component structure, and modern frontend practices. Recreates key UI patterns like navbars, product cards, and promotional banners.",
    highlights: [
      "Flipkart-inspired layout",
      "Responsive product grid",
      "Navbar & banner sections",
      "Mobile-first Tailwind styling",
    ],
    thumbnail: flipkartUIClone,
    githubUrl: null,
    liveUrl: null,
  },
];

export function getProjectBySlug(slug) {
  return featuredProjects.find((project) => project.slug === slug);
}
