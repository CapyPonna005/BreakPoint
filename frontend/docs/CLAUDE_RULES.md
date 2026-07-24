# Claude Development Rules

## Purpose

This document defines how Claude should assist in developing BreakPoint.

Claude should treat this document as the highest-priority project guideline after explicit user instructions.

---

# About BreakPoint

BreakPoint is a modern coding practice platform where users solve intentionally broken programming challenges, debug code, and receive AI-powered feedback.

The goal is to create a professional SaaS-quality product suitable for real developers.

---

# Before Starting Any Task

Before writing any code, Claude should read the project documentation in the following order:

1. BREAKPOINT_VISION.md
2. ROADMAP.md
3. DESIGN_SYSTEM.md
4. COMPONENT_GUIDE.md
5. FEATURES.md
6. CHANGELOG.md

These documents together define the project's mission, development plan, design standards, architecture, feature set, and development history.

---

# Milestone Workflow

Claude should only work on ONE milestone at a time.

Never skip ahead.

Never combine multiple milestones into one response unless explicitly requested.

Always finish the current milestone before moving to the next.

---

# Before Writing Code

Claude must first:

- Explain what will be built.
- Explain why it belongs to the current milestone.
- List every file that will be modified.
- Wait for approval before generating code.

Do not immediately generate large amounts of code.

---

# Code Generation Rules

Claude should:

- Modify only necessary files.
- Never rewrite the entire project.
- Reuse existing components whenever possible.
- Keep components small.
- Avoid duplicate code.
- Follow React best practices.
- Follow Next.js best practices.
- Follow TypeScript best practices.

---

# Component Rules

Before creating a new component:

Ask:

1. Does this component already exist?

2. Can an existing component be reused?

3. Is this responsibility already handled elsewhere?

Only create a new component if necessary.

---

# Design Rules

Always follow DESIGN_SYSTEM.md.

Official colors:

Primary Background

#1E104E

Secondary Background

#452E5A

Primary Accent

#FF653F

Highlight Accent

#FFC85C

Never introduce a different color palette unless explicitly requested.

---

# UI Philosophy

BreakPoint should feel:

- Professional
- Premium
- Minimal
- Modern
- Developer-focused
- Spacious
- Fast
- Confident

Avoid making it look like:

- Student projects
- Bootstrap templates
- Generic admin dashboards

---

# Code Quality

Always write code that is:

- Modular
- Readable
- Maintainable
- Reusable
- Responsive

Avoid:

- Massive files
- Deep prop drilling
- Hardcoded values
- Duplicate logic

---

# UI Changes

During UI milestones:

Do NOT

- Change routing
- Change business logic
- Break functionality
- Modify APIs
- Remove existing features

Only improve appearance.

---

# Feature Development

When implementing a feature:

1. Explain the approach.
2. Modify only required files.
3. Explain every change.
4. Ensure previous functionality still works.

---

# Refactoring

Claude may suggest refactoring.

However:

Never refactor the project automatically.

Always explain:

- Why
- Benefits
- Risks

Wait for approval.

---

# Documentation

Whenever a milestone is completed:

Suggest updating:

- CHANGELOG.md

If new functionality is introduced:

Suggest updating:

- FEATURES.md

If a new reusable component is created:

Suggest updating:

- COMPONENT_GUIDE.md

---

# Roadmap

Claude must respect ROADMAP.md.

Never begin another milestone without user approval.

If the user requests work outside the roadmap, explain where it fits before implementing.

---

# If Unsure

If project requirements are unclear:

Ask questions first.

Never assume implementation details.

---

# Communication Style

Claude should:

- Explain decisions clearly.
- Teach while coding.
- Prefer maintainable solutions over quick fixes.
- Keep explanations concise unless the user asks for more detail.

When possible, relate React, Next.js, or TypeScript concepts to Java, since the user is already comfortable with Java.

---

# Long-Term Goal

The objective is not simply to finish the project.

The objective is to build BreakPoint as if it were a real commercial SaaS product with clean architecture, scalable code, excellent UI/UX, and production-quality engineering.

Every decision should support that goal.