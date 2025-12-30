# Portfolio Ezio - Design System Reference

## Live URL
https://portfolio-ezio.pages.dev

## Tech Stack
- React 19 + TypeScript + Vite
- CSS Variables per theming
- Dark/Light mode support

---

## COLOR SYSTEM

```css
/* Light Mode */
--bg-primary: #FFFFFF;
--bg-secondary: #F7F7F7;
--bg-tertiary: #F0F0F0;
--text-primary: #0D0D0D;
--text-secondary: #7A7A7A;
--text-tertiary: rgba(0, 0, 0, 0.4);
--border-color: #E0E0E0;
--border-light: rgba(0, 0, 0, 0.08);
--accent-yellow: #C9FE6E;

/* Dark Mode */
--bg-primary: #0D0D0D;
--bg-secondary: #1A1A1A;
--bg-tertiary: #2D2D2D;
--text-primary: #FFFFFF;
--text-secondary: #808080;
--text-tertiary: rgba(255, 255, 255, 0.4);
--border-color: #3D3D3D;
```

---

## TYPOGRAPHY

```css
/* Font Family */
font-family: Arial, Helvetica, sans-serif;

/* Headings */
.hero-title: 72px, weight 600, letter-spacing -0.04em
.section-title: 48px, weight 600, letter-spacing -0.03em
.card-title: 24px, weight 600, letter-spacing -0.02em

/* Body */
.body-text: 16px, weight 400, line-height 1.6
.small-text: 14px, weight 500
.caption: 12-13px, weight 500

/* Monospace (per code/tokens) */
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

---

## SPACING & SIZING

```css
/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 100px;

/* Spacing Scale (4pt grid) */
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 100px

/* Container */
max-width: 1200px (main content)
max-width: 1000px (narrower sections)
padding: 40px (desktop), 20px (tablet), 16px (mobile)
```

---

## COMPONENTS STYLE

### Cards (Bento Style)
```css
.card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  padding: 24px;
  transition: border-color 0.2s ease;
}
.card:hover {
  border-color: rgba(0, 0, 0, 0.15);
}
```

### Badges/Tags
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.06); /* or var(--bg-tertiary) */
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
}
```

### Buttons
```css
.button-primary {
  padding: 14px 24px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
}
.button-secondary {
  padding: 14px 24px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
}
```

### Icon Circles
```css
.icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
/* Variants */
.icon-purple { background: rgba(99, 102, 241, 0.1); color: #6366f1; }
.icon-green { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.icon-blue { background: rgba(6, 177, 241, 0.12); color: #008ece; }
```

---

## PAGE SECTIONS

### 1. Hero
- Full viewport height intro
- Large animated title (72px)
- 3 link cards in a row
- Character-by-character text animation

### 2. Services Ticker
- Horizontal scrolling marquee
- Contained in rounded box with border
- Fade edges with mask-image

### 3. Introduction (Philosophy)
- Centered text with blur-reveal animation on scroll
- Badge + large text + copyright
- Scroll hijack on desktop (text reveals as you scroll)

### 4. Works Ticker
- 3D perspective transform carousel
- Large cards (427x640px) with hover overlay
- Infinite loop animation

### 5. Works Grid
- 3 column grid (2 on tablet, 1 on mobile)
- Project cards with image + hover overlay
- Template cards with 3:4 aspect ratio videos

### 6. Components Section (Bento Style)
- Main card with marquee of component previews
- 2x2 grid of feature cards:
  - 4pt Grid System (icon)
  - Design Tokens (code variables)
  - Dark Mode (3 theme icons)
  - Simplified Maintenance (icon)
- CTA button

### 7. Themes Section
- Dark background (#0a0a0a)
- Tag + title with highlighted text
- Marquee of theme screenshots/videos
- Animated toggle switch

### 8. Showcase (Albicchiere)
- 2 column layout: image carousel + content
- Newsletter form
- Blog links as pills

### 9. About
- Text content with inline links
- Profile info

### 10. Experience
- Timeline/accordion style
- Company cards with expand/collapse

### 11. Testimonials
- Quote cards
- Avatar + name + role

### 12. Stack
- Grid of technology icons/cards

### 13. CTA
- Centered text
- 3D card gallery (perspective transform)
- Social links

### 14. Footer
- 2 column: newsletter + links
- Meta info row

---

## ANIMATIONS

### Marquee/Ticker
```javascript
// Continuous scroll with requestAnimationFrame
let position = 0;
const speed = 0.5; // pixels per frame
const animate = () => {
  position -= speed;
  if (Math.abs(position) >= totalWidth / 2) position = 0;
  element.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
};
```

### Scroll Reveal
```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Hover Effects
```css
/* Card lift */
transform: translateY(-2px);
/* Scale */
transform: scale(1.05);
/* Border highlight */
border-color: rgba(0, 0, 0, 0.15);
```

---

## RESPONSIVE BREAKPOINTS

```css
/* Desktop: default */
/* Tablet: max-width 768px */
/* Mobile: max-width 480px */

@media (max-width: 768px) {
  /* Reduce font sizes ~20-30% */
  /* Stack grids to 1-2 columns */
  /* Reduce padding to 20px */
  /* Disable scroll hijack */
}

@media (max-width: 480px) {
  /* Further reduce sizes */
  /* Single column layouts */
  /* Padding 16px */
}
```

---

## CURRENT PAGE STRUCTURE

```
HomePage
├── Header (fixed, blur background)
├── main.main-content
│   ├── Hero
│   ├── ServicesTicker
│   ├── Introduction
│   ├── WorksTicker
│   ├── Works (Projects + Templates)
│   ├── ComponentsSection
│   ├── Showcase
│   ├── About
│   ├── Experience
│   ├── Testimonials
│   ├── ThemesSection
│   ├── Stack
│   └── CTA
├── Footer
└── BlurController (bottom blur effect)
```

---

## DESIGN PRINCIPLES

1. **Clean & Minimal** - White space, subtle borders
2. **Bento Grid** - Cards with rounded corners, mixed sizes
3. **Subtle Animations** - Smooth transitions, marquees
4. **Dark/Light Support** - CSS variables for theming
5. **Typography First** - Large headings, clear hierarchy
6. **Framer-inspired** - Similar to modern Framer templates
