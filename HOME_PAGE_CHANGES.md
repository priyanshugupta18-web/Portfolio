# Home Page Responsive and UX Improvements

This document explains the changes made to the portfolio home page, why they
were needed, and the techniques used to implement them.

The main goals were:

- Make the home page work reliably on phones around 350px wide.
- Repair tablet and intermediate-width layouts without harming desktop.
- Preserve the existing animation-heavy visual style.
- Fix horizontal overflow and inconsistent scroll animations.
- Improve the hero portrait presentation.
- Add an experiments/blogs preview, collaboration preview, and real footer.

## Files Changed

| File | Responsibility |
| --- | --- |
| `src/Sections/Home.jsx` | Responsive layout, animations, hero, projects, experiments, and collaboration preview |
| `src/Sections/Footer.jsx` | Complete responsive footer |
| `src/Components/Cards.jsx` | Responsive project-card layout |
| `src/Components/AboutMeSnippet.jsx` | Responsive code-snippet reveal animation |
| `src/Components/TechRow.jsx` | Smaller marquee items on narrow screens |
| `src/index.css` | Global overflow protection and reduced-motion behavior |

`src/data/projects.js` already contained user changes and was not intentionally
modified as part of this responsive work.

---

## 1. Responsive Viewport Modes

### The problem

CSS breakpoints alone were not enough because several Framer Motion values and
the horizontal project-section height needed JavaScript calculations.

The original implementation treated almost every non-mobile screen like a large
desktop. This caused:

- Large animation distances on tablets.
- A hidden hero image between 768px and 1023px.
- Excessive project-section height on portrait tablets.
- Layouts that worked at desktop and mobile but failed between them.

### The solution

The home page now identifies three viewport modes:

```jsx
const getViewportMode = () => {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1200) return "tablet";
  return "desktop";
};
```

The mode is updated whenever the browser resizes:

```jsx
useEffect(() => {
  const updateViewportMode = () => setViewportMode(getViewportMode());

  window.addEventListener("resize", updateViewportMode);
  return () => window.removeEventListener("resize", updateViewportMode);
}, []);
```

### Why this matters

Different screen sizes need different animation behavior, not only different
CSS widths. For example, an element moving `-120px` horizontally can look
elegant on desktop but leave a tablet viewport looking empty or partially
clipped.

The page now uses scaled values:

```jsx
const entryDistance = shouldReduceMotion
  ? 0
  : isMobile
    ? -24
    : isTablet
      ? -64
      : -120;

const revealDuration = shouldReduceMotion
  ? 0
  : isMobile
    ? 0.6
    : isTablet
      ? 0.85
      : 1.2;
```

This preserves every animation while adapting its intensity to the available
screen space.

---

## 2. Global Overflow Protection

### The problem

Animated elements, large glow effects, horizontal card tracks, and translated
headings caused the document to become wider than the viewport. On a 350px
phone, this produced unwanted horizontal scrolling and clipped content.

### The solution

Global width constraints were added:

```css
body {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
}

#root {
    width: 100%;
    overflow-x: clip;
}
```

### `hidden` versus `clip`

- `overflow-x: hidden` prevents users from horizontally scrolling the body.
- `overflow-x: clip` on the root prevents visual animation overflow without
  creating an extra scroll container.

This acts as a final safety boundary. Individual sections were still repaired
properly rather than relying only on global clipping.

---

## 3. Hero Layout and Portrait

### Original problems

- The hero image was hidden until the `lg` breakpoint.
- Tablets displayed only text and a large empty area.
- At some intermediate widths, flexbox squeezed the portrait too aggressively.
- The lower body looked sharply cut.
- The cloud/glow behind the portrait was too narrow and difficult to see.

### Responsive grid

The hero now uses a responsive grid rather than a basic flex row:

```jsx
className="
  grid
  md:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]
  lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]
  xl:grid-cols-[minmax(0,1fr)_minmax(440px,0.75fr)]
"
```

This gives the text and portrait explicit, stable columns.

The image remains hidden on small phones, where it would compete with the main
content, but appears from the tablet breakpoint:

```jsx
className="relative hidden min-w-0 items-center justify-center md:flex"
```

### Responsive portrait sizing

```jsx
className="
  h-[430px] w-full max-w-[360px]
  lg:h-[500px] lg:max-w-[430px]
  xl:h-[560px] xl:max-w-[500px]
"
```

This prevents the image from shrinking unpredictably while still scaling across
tablets, laptops, and desktops.

### Smooth lower-body mask

The portrait uses a gradual CSS mask:

```css
mask-image: linear-gradient(
  to bottom,
  black 0%,
  black 58%,
  rgba(0, 0, 0, 0.9) 66%,
  rgba(0, 0, 0, 0.35) 76%,
  transparent 88%
);
```

The image stays fully visible around the face and upper body, then fades
progressively before the lower portion. Multiple gradient stops avoid a hard
rectangular edge.

Both `mask-image` and `-webkit-mask-image` are included because WebKit-based
browsers often require the prefixed property.

### Animated cloud/glow

Two glow layers sit behind the image:

1. A large pulsing glow around the portrait.
2. A wider horizontally moving glow near the lower fade.

```jsx
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
/>
```

The lower cloud visually completes the image fade, making the concealed lower
body feel intentional.

---

## 4. Hero Typography and Spacing

Large fixed typography was replaced with breakpoint-based sizes:

```jsx
className="text-4xl sm:text-5xl lg:text-6xl"
```

The subtitle uses tighter tablet tracking and restores the wider desktop
tracking later:

```jsx
className="
  text-lg tracking-wide
  sm:text-xl sm:tracking-wider
  lg:text-2xl lg:tracking-widest
"
```

This keeps lines readable and prevents text from forcing the layout wider than
the screen.

Buttons now wrap when needed:

```jsx
className="flex flex-wrap items-center gap-4"
```

---

## 5. Responsive Scroll Animations

### Parallax behavior

The hero text and image still move upward while scrolling, but distances now
adapt by viewport:

```jsx
const heroTextY = useTransform(
  heroScroll,
  [0, 1],
  [0, shouldReduceMotion ? 0 : isMobile ? -32 : isTablet ? -64 : -100],
);
```

The image uses a separate distance:

```jsx
const heroImgY = useTransform(
  heroScroll,
  [0, 1],
  [0, shouldReduceMotion ? 0 : isTablet ? -100 : -160],
);
```

This preserves depth without moving tablet content too far.

### Reduced-motion support

Framer Motion's `useReducedMotion()` reads the operating system preference:

```jsx
const shouldReduceMotion = useReducedMotion();
```

When reduced motion is requested, scroll distances and reveal durations become
zero while content remains visible and functional.

Global smooth scrolling is also disabled for those users:

```css
@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }
}
```

---

## 6. About Section and Code Snippet

### Responsive controls

The three About links become full-width controls on narrow screens:

```jsx
className="w-full justify-between sm:w-auto"
```

This prevents labels such as "Frontend Developer" from overflowing.

### Adaptive snippet reveal

The code snippet uses different animation directions:

- Mobile: moves vertically upward.
- Tablet/desktop: enters horizontally from the right.

```jsx
const revealX = useTransform(
  scrollYProgress,
  [0, 1],
  [isMobile ? 0 : 90, 0],
);

const revealY = useTransform(
  scrollYProgress,
  [0, 1],
  [isMobile ? 24 : 0, 0],
);
```

This avoids right-side overflow on phones while preserving the original
side-entry animation on larger screens.

The snippet also uses `min-w-0`, which is important inside flex/grid layouts:

```jsx
className="w-full min-w-0"
```

Without `min-w-0`, long code content can force a flex or grid child wider than
its container.

---

## 7. Technology Marquee

The marquee animation was preserved. Only the item dimensions were adjusted:

```jsx
className="
  mx-2 px-4 py-4
  sm:mx-4 sm:px-6 sm:py-6
"
```

Smaller phone items reduce the visible clipping and make the animation feel
less crowded.

The marquee track intentionally extends beyond the viewport because that is how
the infinite animation works. Its parent remains `overflow-hidden`.

---

## 8. Featured Projects Section

This section required the largest structural change.

### Original problem

The desktop implementation used a long sticky section with horizontally moving
cards. Its height was calculated with:

```jsx
featuredProjects.length * 55 + 100
```

and expressed in `vh`.

That produced excessively tall tablet sections because portrait tablets have a
large viewport height. The section could become roughly 5,700px tall even when
the cards did not need that much travel.

### Mobile layout

On phones, the cards now form a normal vertical list:

```jsx
className="
  flex w-full flex-col
  md:w-max md:flex-row
"
```

Each card uses the available width:

```jsx
className="
  w-full min-w-0
  md:w-auto md:min-w-[360px]
"
```

This removes the need for a long sticky horizontal-scroll sequence on a narrow
touchscreen.

### Tablet and desktop horizontal animation

From `md` upward, the horizontal animation remains fully active.

The actual horizontal travel is measured:

```jsx
const totalWidth = cardsEl.scrollWidth;
const distance = Math.max(0, totalWidth - window.innerWidth + 48);
```

The section height is then based on real travel:

```jsx
setCardSectionHeight(
  window.innerWidth < 768
    ? "auto"
    : `${Math.max(
        window.innerHeight * 2.25,
        distance + window.innerHeight + 360,
      )}px`,
);
```

### Why measured height is better

The horizontal movement consumes vertical scrolling. Therefore, the required
section height should relate to:

- The real horizontal distance.
- One viewport height for the sticky stage.
- Additional room for the heading and comfortable entry/exit.

Using the card count alone cannot accurately represent this.

### Keeping measurements current

A `ResizeObserver` watches the card track:

```jsx
const resizeObserver = new ResizeObserver(updateScrollDistance);
resizeObserver.observe(cardsEl);
```

This recalculates the track if content, fonts, or responsive styles change its
width.

### Top 10 projects highlight

The Featured Projects introduction now explicitly tells visitors that the
section contains the portfolio's top 10 projects:

```jsx
Explore my{" "}
<span className="font-medium text-sky-300">top 10 projects</span> —
a curated collection...
```

The important phrase is wrapped in an inline `span` instead of styling the
entire paragraph. This preserves the paragraph's readable muted color while
using the existing sky accent and a slightly stronger font weight to establish
visual emphasis.

---

## 9. Experiments and Blogs Preview

A new animated preview section was added with:

- A scroll-linked heading reveal.
- A scaling divider.
- Introductory text.
- Experiment/blog/curiosity statistics.
- Lab and Blogs action buttons.
- Floating particles.
- A pulsing background glow.

Particle data is generated once:

```jsx
const [expParticles] = useState(() =>
  Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1.5,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 8,
  })),
);
```

Using a lazy `useState` initializer avoids regenerating particles on every
render.

Phones render fewer particles:

```jsx
expParticles.slice(0, isMobile ? 7 : expParticles.length)
```

This reduces mobile animation load while keeping the visual effect.

---

## 10. Collaboration and Contact Preview

A new home-page section invites collaboration before the footer.

It includes:

- Personal thoughts about building useful web experiences.
- Desire to meet and collaborate with curious people.
- LinkedIn button.
- GitHub button.
- Contact button that routes to `/contact`.

Internal navigation uses React Router:

```jsx
<NavLink to="/contact">Contact me</NavLink>
```

External profiles use normal anchors:

```jsx
<a
  href="https://github.com/priyanshugupta18-web"
  target="_blank"
  rel="noreferrer"
>
```

`rel="noreferrer"` protects the original page when opening a new tab.

The social buttons include `aria-label` attributes because icon-only buttons
need an accessible text description.

---

## 11. Footer

The original footer was a full-screen placeholder:

```jsx
<div className="h-screen w-full">Footer</div>
```

It was replaced with a compact responsive footer containing:

- Logo and name linked to the home page.
- Clickable telephone link.
- LinkedIn and GitHub links.
- Smooth back-to-top button.
- Dynamic copyright year.
- "Code. Debug. Deploy. Repeat." closing phrase.

### Clickable phone number

```jsx
<a href="tel:+919341803923">+91 9341803923</a>
```

On supported devices, this opens the phone dialer.

### Back to top

```jsx
const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });
```

### Dynamic copyright year

```jsx
&copy; {new Date().getFullYear()} Priyanshu Gupta. All rights reserved.
```

This updates automatically each year.

---

## 12. Responsive Testing Performed

The page was checked at these widths:

- 350px
- 600px
- 768px
- 820px
- 912px
- 1024px
- 1199px
- 1280px
- 1440px

The checks included:

- Document width versus viewport width.
- Each section's internal width.
- Hero portrait visibility and size.
- Project-section height.
- Horizontal project animation start and end positions.
- Mobile vertical project list.
- Tablet portrait and landscape compositions.
- Contact preview and footer layout.

At the final checks, the document width matched the viewport width across the
tested sizes.

---

## 13. Verification Commands

Production build:

```powershell
npm run build
```

Lint the changed React files:

```powershell
npx eslint src/Sections/Home.jsx src/Sections/Footer.jsx src/Components/AboutMeSnippet.jsx src/Components/Cards.jsx src/Components/TechRow.jsx
```

Check for whitespace errors:

```powershell
git diff --check
```

These commands passed after the final changes.

---

## 14. Main Lessons

### Responsive design is more than CSS breakpoints

When animations depend on pixels, scroll progress, or measured element widths,
JavaScript behavior must adapt alongside CSS.

### Avoid arbitrary scroll-section heights

If vertical scrolling controls horizontal travel, measure the actual horizontal
distance. Fixed formulas based on item count or `vh` often fail on portrait
tablets.

### Preserve animations by changing their intensity

Animations did not need to be removed. Instead:

- Shorter movement distances were used on smaller screens.
- Durations were adapted.
- Mobile animation directions were changed where horizontal motion caused
  overflow.
- Expensive decorative particles were reduced on phones.

### Use `min-w-0` inside flex and grid layouts

Flex and grid children default to a minimum width based on their content.
`min-w-0` allows them to shrink and prevents unexpected overflow.

### Use progressive masks for portraits

A multi-stop mask creates a natural fade. A simple two-stop mask can look like
the image has been cut at a fixed line.

### Verify real rendered behavior

Responsive bugs often appear only at specific intermediate widths. Testing only
one phone and one desktop width misses tablet-specific problems.

---

## 15. React Favicon

The site now uses a high-contrast React logo favicon stored at:

```text
public/favicon.png
```

The favicon reference in `index.html` is:

```html
<link rel="icon" type="image/png" sizes="64x64" href="/favicon.png?v=2" />
<link rel="shortcut icon" href="/favicon.png?v=2" />
```

### Why the favicon belongs in `public`

Vite copies files from `public` directly into the production build without
changing their names. Therefore, `/favicon.png` works consistently in
development and production.

After changing a favicon, browsers may continue showing the old cached icon.
Use a hard refresh or reopen the site in a private browsing window when testing.

### Improving favicon visibility

The first transparent React SVG used thin cyan strokes and could become nearly
invisible against certain browser tab themes. The final favicon uses:

- A dark circular background for reliable contrast.
- Thicker React-logo strokes.
- A tightly framed `64x64` PNG.
- A version query (`?v=2`) that forces browsers to request the updated icon
  instead of continuing to use an older cached favicon.

---

## 16. Deploying This React and Vite App

### Step 1: Verify the project locally

Install dependencies:

```powershell
npm install
```

Run the development server:

```powershell
npm run dev
```

Create a production build:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

Vite writes the final production files to the `dist` directory.

### Step 2: Push the project to GitHub

Create a Git repository and commit the source code if this has not already been
done:

```powershell
git add .
git commit -m "Prepare portfolio for deployment"
```

Create an empty GitHub repository, connect it, and push:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git push -u origin main
```

Do not commit `node_modules` or `dist`; both are already ignored.

### Option A: Deploy with Vercel

1. Sign in to Vercel using GitHub.
2. Select **Add New Project**.
3. Import the portfolio repository.
4. Vercel should detect Vite automatically.
5. Confirm these settings:

```text
Build command: npm run build
Output directory: dist
```

6. Click **Deploy**.

Because this app uses `createBrowserRouter`, direct visits to routes such as
`/projects` or `/contact` need to return `index.html`.

The repository now includes this `vercel.json` file at its root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

The rewrite lets Vercel serve the React application first, after which React
Router decides which page component to display.

### Option B: Deploy with Netlify

1. Sign in to Netlify using GitHub.
2. Choose **Add new site** and **Import an existing project**.
3. Select the repository.
4. Use:

```text
Build command: npm run build
Publish directory: dist
```

5. Deploy the site.

For React Router route fallback, the repository includes
`public/_redirects` containing:

```text
/* /index.html 200
```

Vite copies that file into `dist` during the build.

### SPA fallback files added

The two fallback configurations were committed together:

```text
Commit: 6711778 Add SPA deployment fallbacks
```

Files:

```text
vercel.json
public/_redirects
```

During a production build, confirm that Netlify's fallback was copied:

```powershell
Get-Item dist\_redirects
```

### Production failure: case-sensitive asset paths

The first Vercel deployment failed with:

```text
[UNRESOLVED_IMPORT] Could not resolve '../assets/thumbnails'
in src/data/projects.js
```

The local Windows build had allowed the import because the Windows filesystem
is usually case-insensitive. Vercel builds on Linux, where paths are
case-sensitive.

The actual directory name was:

```text
src/assets/Thumbnails
```

but the source imported:

```jsx
from "../assets/thumbnails";
```

The production-safe fix was:

```jsx
from "../assets/Thumbnails";
```

### Lesson: match filesystem casing exactly

Always match every character of a file or directory name in imports:

```text
Thumbnails !== thumbnails
Home.jsx !== home.jsx
```

This applies even when the project works locally on Windows. Case mismatches
commonly appear only after deployment to Linux-based hosting.

Useful checks:

```powershell
git ls-files src/assets
Get-ChildItem src\assets
```

The build fix and final visible favicon were shipped together:

```text
Commit: 3b62263 Fix production asset resolution and favicon visibility
```

### Favicon troubleshooting

The first React favicon existed and was copied correctly, but it could appear
invisible because it used thin cyan strokes on a transparent background.
Favicons are also cached aggressively by browsers.

The final solution uses:

- `public/favicon.png`
- A dark circular background for contrast.
- A tightly framed React mark.
- A `64x64` PNG size.
- Two HTML favicon declarations for compatibility.
- A version query to invalidate old browser caches.

```html
<link rel="icon" type="image/png" sizes="64x64" href="/favicon.png?v=2" />
<link rel="shortcut icon" href="/favicon.png?v=2" />
```

Verify that the development server returns the correct file:

```powershell
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/favicon.png?v=2
```

Expected response:

```text
Status: 200
Content-Type: image/png
```

Verify that Vite includes it in production:

```powershell
npm run build
Get-Item dist\favicon.png
```

If an old favicon remains visible after deployment:

1. Hard refresh the page.
2. Close and reopen the browser tab.
3. Test in a private browsing window.
4. Increment the query version, for example from `?v=2` to `?v=3`.

### Understanding Vercel build logs

When Vercel reports a failure:

1. Confirm the exact Git commit Vercel cloned.
2. Find the first meaningful error, not only the final exit-code line.
3. Follow the listed import chain to the source file.
4. Reproduce with `npm install` and `npm run build`.
5. Fix, commit, and push to trigger a fresh deployment.

In this case, the useful lines were:

```text
Cloning ... Commit: 6711778
[UNRESOLVED_IMPORT] Could not resolve '../assets/thumbnails'
```

This showed that the fallback commit deployed correctly, but the Linux build
found an older case-sensitive import problem.

---

## 8. Mobile Scroll Overflow Fix

### The problem

On mobile, a white edge or flash could still appear while scrolling vertically.
The screenshot showed the browser exposing a horizontal scroll indicator at the
bottom of the page. The first pass improved the page shell, but the deployed
page still allowed tiny sideways pan gestures and older wide animated sections
could visually fight normal vertical scrolling:

- The featured projects section used a sticky horizontal card track on larger
  screens.
- The tech stack section used a continuously translating marquee.
- A decorative blurred element extended beyond the right edge of the viewport.
- The page shell did not explicitly prevent horizontal touch panning.

### The solution

The final fix keeps the animations that do not create page-level horizontal
scroll while containing the page itself:

- Featured projects still use the sticky horizontal card animation on
  non-mobile screens.
- On mobile, featured projects are a normal vertical stack with no x-axis card
  transform.
- The tech stack marquee animation is restored inside a `w-full max-w-full
  overflow-hidden` wrapper.
- The off-edge decorative element in the collaboration section was removed.
- Mobile horizontal panning is disabled with `touch-action: pan-y` and
  `overscroll-behavior-x: none`.
- The global page shell keeps a dark fallback color on `html`, `body`, and
  `#root`, so the browser never exposes a white page canvas while scrolling.

```css
body {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    overscroll-behavior-x: none;
    touch-action: pan-y;
    background-color: #020617;
}
```

### Verification

The fix was checked at `360px` and `344px` mobile viewports across several
vertical scroll positions. In both cases, `document`, `body`, and `#root`
scroll widths stayed exactly equal to the viewport width. Project cards stayed
inside the viewport on mobile, while the marquee animation remained visually
contained by its clipped wrapper.

`npm run build` completed successfully after the change.

### Step 3: Add environment variables

If the contact page later uses EmailJS or another external service, do not put
secret values directly in components.

Create a local `.env` file:

```text
VITE_EMAILJS_SERVICE_ID=your_value
VITE_EMAILJS_TEMPLATE_ID=your_value
VITE_EMAILJS_PUBLIC_KEY=your_value
```

Access Vite variables with:

```jsx
import.meta.env.VITE_EMAILJS_SERVICE_ID
```

Add the same variables in the deployment platform's project settings. Restart
the development server after modifying `.env`.

Only variables beginning with `VITE_` are exposed to browser code. They should
still be treated as public values, not private server secrets.

### Step 4: Configure a custom domain

After deployment:

1. Open the hosting project's domain settings.
2. Add the custom domain.
3. Follow the platform's DNS instructions.
4. Wait for DNS propagation and HTTPS certificate creation.

### Step 5: Verify the deployed website

Check all of the following after deployment:

- The home page loads without console errors.
- The logo favicon appears in the browser tab.
- The favicon request returns `image/png`, not `text/html`.
- `/about`, `/projects`, `/lab`, `/stack`, and `/contact` open directly.
- Refreshing a nested route does not produce a 404.
- Project thumbnails and the hero image load.
- All import paths match the exact casing of their files and directories.
- Mobile and tablet layouts still have no horizontal scrolling.
- LinkedIn, GitHub, telephone, and contact links work.
- The production contact form works with deployed environment variables.
