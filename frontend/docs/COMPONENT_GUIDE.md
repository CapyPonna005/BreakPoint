# BreakPoint Component Guide

## Overview

This document describes every major frontend component used in BreakPoint.

Each component should have a **single responsibility**, be reusable whenever possible, and follow React + Next.js best practices.

Whenever a new component is added, update this document.

---

# Frontend Architecture

```
frontend/
│
├── app/
│   ├── dashboard/
│   ├── forgot-password/
│   ├── login/
│   ├── register/
│   ├── error.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── CodeEditor.tsx
│   ├── ConsolePanel.tsx
│   ├── Container.tsx
│   ├── CTA.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── LanguageSelector.tsx
│   ├── Navbar.tsx
│   ├── ProblemPanel.tsx
│   ├── ProfileSummary.tsx
│   ├── RecentActivity.tsx
│   ├── ScoreCard.tsx
│   ├── SectionTitle.tsx
│   ├── Sidebar.tsx
│   ├── Spinner.tsx
│   ├── SubmissionHistory.tsx
│   ├── ThemeToggle.tsx
│   ├── Timer.tsx
│   ├── ToastContainer.tsx
│   └── Workspace.tsx
```

---

# App Pages

## Home Page

File

app/page.tsx

Purpose

Landing page introducing BreakPoint.

Contains

- Hero
- Features
- How It Works
- CTA
- Footer

---

## Dashboard

File

app/dashboard/page.tsx

Purpose

User dashboard after login.

Contains

- ScoreCard
- RecentActivity
- ProfileSummary
- SubmissionHistory

---

## Workspace

File

app/dashboard/workspace/page.tsx

Purpose

Main coding experience.

Contains

- ProblemPanel
- Workspace

---

## Login

File

app/login/page.tsx

Purpose

Authenticate existing users.

---

## Register

File

app/register/page.tsx

Purpose

Create a new account.

---

## Forgot Password

File

app/forgot-password/page.tsx

Purpose

Password recovery.

---

# Layout Components

## Root Layout

File

app/layout.tsx

Responsibilities

- HTML structure
- Metadata
- Global styles
- Providers

Should NOT contain page logic.

---

# Landing Components

## Navbar

Purpose

Top navigation of the landing page.

Responsibilities

- Navigation links
- Login button
- Register button

Future

- Sticky navbar
- Mobile navigation

---

## Hero

Purpose

Introduce BreakPoint.

Contains

- Headline
- Description
- CTA

---

## Features

Purpose

Show the platform's key features.

---

## HowItWorks

Purpose

Explain the BreakPoint workflow.

---

## CTA

Purpose

Encourage user registration.

---

## Footer

Purpose

Display footer links and project information.

---

# Dashboard Components

## Sidebar

Purpose

Main navigation inside the dashboard.

Responsibilities

- Navigation
- Active page
- Icons

Future

- Collapsible sidebar
- User menu

---

## ScoreCard

Purpose

Display important statistics.

Examples

- XP
- Solved Problems
- Accuracy

---

## RecentActivity

Purpose

Show recent coding activity.

---

## ProfileSummary

Purpose

Display user profile overview.

---

## SubmissionHistory

Purpose

Display previously submitted solutions.

---

# Workspace Components

## Workspace

Purpose

Main IDE container.

Contains

- Toolbar
- CodeEditor
- ConsolePanel

Responsibilities

- Workspace state
- Language selection
- Code execution
- Submission flow

---

## ProblemPanel

Purpose

Display coding challenge.

Contains

- Title
- Difficulty
- Description
- Constraints
- Examples

Future

- Hints
- AI Explanation

---

## CodeEditor

Purpose

Wrapper around Monaco Editor.

Responsibilities

- Display editor
- Change language
- Starter code

Future

- Theme switching
- Font size
- Tab size
- Multiple files

---

## LanguageSelector

Purpose

Choose programming language.

Supported

- JavaScript
- TypeScript
- Python

Future

- Java
- C++
- C#
- Go

---

## Timer

Purpose

Track coding time.

Future

- Pause
- Resume
- Countdown mode
- Time limit

---

## ConsolePanel

Purpose

Display execution output.

Displays

- Logs
- Errors
- Success messages

Future

- Runtime
- Test cases
- Auto-scroll

---

# Shared UI Components

## Button

Reusable application button.

Should support

- Primary
- Secondary
- Disabled
- Loading

---

## Card

Reusable container.

Used throughout the dashboard.

---

## Container

Provides consistent page width and spacing.

---

## Spinner

Loading animation.

---

## SectionTitle

Reusable page and section heading.

---

## ThemeToggle

Future dark/light theme switcher.

---

## ToastContainer

Displays temporary notifications.

Examples

- Saved
- Error
- Success

---

# Component Rules

Every component should:

- Have one responsibility.
- Avoid duplicated logic.
- Accept props instead of hardcoded values.
- Be reusable.
- Be responsive.
- Follow the Design System.

---

# Naming Convention

Components

PascalCase

Examples

Button.tsx

Workspace.tsx

ProblemPanel.tsx

---

Props

camelCase

Examples

language

problemTitle

difficulty

onSubmit

onRun

---

# State Management

Keep state as close as possible to where it is used.

Avoid unnecessary prop drilling.

When state becomes shared across multiple unrelated components, consider introducing Context or another state management solution.

---

# Future Refactor

Current project keeps every component inside one folder:

components/

This is acceptable during active development.

After the MVP is complete, reorganize into feature-based folders.

Example

components/

├── ui/
├── landing/
├── dashboard/
└── workspace/

Do not perform this refactor until the application's core functionality is stable.

---

# Development Rule

Before creating a new component, ask:

1. Does this already exist?

2. Can an existing component be reused?

3. Does it belong to Landing, Dashboard, Workspace, or Shared UI?

4. Does it follow the Design System?

Every new component should be documented here before being considered complete.