# BreakPoint Changelog

All notable changes to BreakPoint are documented here, grouped by development milestone. This file should be updated whenever a milestone is completed, per `CLAUDE_RULES.md`.

---

## Module 1 — Foundation & Design System

### Milestone 43 — Design System Foundation
- Registered official brand colors, neutral text/border colors, and border-radius values as Tailwind v4 design tokens in `app/globals.css` (`@theme inline` block).
- Tokens added: `--color-primary-bg`, `--color-secondary-bg`, `--color-accent`, `--color-highlight`, `--color-text-primary/secondary/muted`, `--color-border-subtle`, `--radius-card/button/input/badge`.
- No component styling changed yet — tokens only, ready for use in subsequent milestones.

### Milestone 44 — Apply Design System to Shared UI
- `Button.tsx`: restyled with `bg-accent`, `rounded-button`, `hover:brightness-110`, `active:brightness-90`, `cursor-pointer`.
- `Card.tsx`: restyled with `bg-secondary-bg/90`, subtle border (`border-border-subtle`), `shadow-md`, roomier padding (`p-8`), `rounded-card`.

---

## Module 3 — Dashboard (UI Redesign)

### Milestones 3.1–3.2 — Dashboard Premium Redesign
Full visual redesign of the dashboard for a premium SaaS feel, inspired by (not copying) Cursor/Linear/Vercel. No routing, business logic, or functionality changes.

**New components:**
- `DashboardHeader.tsx` — time-aware greeting (Good Morning/Afternoon/Evening), welcome message, "Continue Practice" CTA linking to `/dashboard/workspace`.
- `ProgressBar.tsx` — generic reusable 0–100% progress bar with gradient fill (accent → highlight), clamped value, animated width.
- `StatCard.tsx` — gradient-bordered stat card with glow accent, `group-hover` lift/border-brighten/color-shift interaction, accepts an icon component + accent color variant as props.

**Modified components:**
- `app/dashboard/layout.tsx` — applies `bg-primary-bg` + `text-text-primary` as the dashboard's base canvas.
- `ProfileSummary.tsx` — added level indicator, streak badge (Flame icon), XP progress bar (via `ProgressBar`), gradient avatar.
- `RecentActivity.tsx` — added per-item mode icons (Bug/PenLine), category badges, colored Pass/Fail status with icons (CheckCircle2/XCircle), timestamp field, `divide-y` list separators.
- `app/dashboard/page.tsx` — recomposed to render `DashboardHeader` → `ProfileSummary` → 3× `StatCard` (Snippets Solved, Current Streak, Accuracy) → `RecentActivity`.

**Dependencies added:**
- `lucide-react` — icon library.

**Known follow-up:** `Sidebar.tsx` remains unstyled (light background) and visually clashes with the new dark dashboard canvas. Scheduled for its own redesign in Module 2 (Navigation & Layout).

---

## Earlier Development (Pre-Documentation, Milestones 1–42)

The following was built before official project documentation (`BREAKPOINT_VISION.md`, `DESIGN_SYSTEM.md`, etc.) was introduced, using default Tailwind styling. Functionality is stable; visual restyling to the official design system is ongoing (see Modules 1 and 3 above).

**Landing Page**
- Hero, Features, HowItWorks, CTA, Footer sections; Navbar (global, in root layout); Footer.
- Shared UI: `Button`, `Card`, `SectionTitle`, `Container`.

**Dashboard Shell**
- Nested route/layout at `/dashboard`; `Sidebar` navigation (Overview, Practice, Snippets).

**Workspace (Core Coding Experience)**
- `/dashboard/workspace` — split layout: `ProblemPanel` (difficulty badge, description) + `Workspace` (stateful client component).
- Monaco Editor integration (`CodeEditor.tsx`) with language switching (`LanguageSelector.tsx`, lifted state pattern).
- `ConsolePanel.tsx` — simulated run/submit output.
- Run and Submit buttons with simulated async grading (`setTimeout`), toast notification on submit (`ToastContext`/`ToastContainer`).
- `Timer.tsx` — elapsed time tracker (`useEffect` + `setInterval`).
- Mobile optimization pass: responsive stacking, editor height, toolbar wrapping (Problem Panel, CodeEditor, Workspace).

**Practice / Challenge List**
- `/dashboard/practice` — challenge list with difficulty filter buttons, search bar, and topic tags (nested `.map()`).

**Results**
- `/dashboard/results` — `ScoreCard` (last submission summary), `AIFeedbackCard` (placeholder AI feedback), `SubmissionHistory` (past attempts list).

**Authentication (UI only, no backend)**
- `/login`, `/register` (with password-match validation), `/forgot-password` (form-to-confirmation swap pattern).

**Global Features**
- Dark mode (`ThemeContext`, `ThemeToggle`, `localStorage` persistence).
- Toast notifications (`ToastContext`, `ToastContainer`).
- Custom error pages: `app/not-found.tsx` (404), `app/error.tsx` (error boundary).
- `Spinner.tsx` and `app/dashboard/loading.tsx` (Next.js loading convention, not yet visually tested with real async data).

**Known gaps (carried forward):**
- No authentication/backend — all data is hardcoded/placeholder.
- `Sidebar.tsx` still uses plain `<a>` tags instead of `next/link`.
- No real code execution or AI grading (Run/Submit are simulated).
- Design system not yet applied to: Sidebar, Navbar, landing page sections, workspace components, auth pages.