
# React + TypeScript + CreateReactApp App (Context + useReducer)
<img width="1920" height="1090" alt="screencapture-localhost-3000-2026-06-26-15_17_22" src="https://github.com/user-attachments/assets/44a9082d-5aae-46d2-862b-29ac4c77b2ae" />

## Overview

This project is a modern React application built with **CreateReactApp** and **TypeScript**, using the **Context API** and **useReducer** for global state management.

Instead of external state libraries, the application relies on React’s built‑in tools to manage and share state across components in a predictable and scalable way.

The architecture focuses on:

- Type-safe state management
- Clear separation of concerns
- Maintainable component structure
- Fast development with CreateReactApp

---

## Tech Stack

- **React** – UI library for building components
- **TypeScript** – Static typing for safer and more maintainable code
- **CreateReactApp** – Fast development server and build tool
- **Context API** – Global state sharing
- **useReducer** – Predictable state transitions

---

## Why Context + useReducer?

This project uses **Context + useReducer** as a lightweight alternative to state management libraries like Redux.

Benefits include:

- Centralized state logic
- Predictable updates through actions
- Easier debugging
- Built-in React solution with no extra dependencies
- Strong type safety with TypeScript

---

## Project Structure

Example structure used in the project:

src/
components/ → Reusable UI components  
 context/ → Context providers and reducers  
 App.tsx → Main application component  
 main.tsx → Application entry point

State logic typically lives inside the **context folder**, where reducers and provider components are defined.

## Getting Started

### 1. Clone the repository

```
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

```
npm install
```

### 3. Run the development server

npm run server
```
npm start
```

The app will run at:

```
http://localhost:3000
```

---

## Build for Production

To build the optimized production bundle:

```
npm run build
```

Preview the production build locally:

```
npm run preview
```

---

## Key Concepts Used

### Context API

Used to provide global state to the entire component tree without prop drilling.

### useReducer

Manages complex state transitions using explicit actions and a reducer function.

### TypeScript

Provides static typing for:

- State
- Actions
- Context values
- Component props

This reduces runtime errors and improves maintainability.

---

## Possible Improvements

Future improvements could include:

- Splitting reducers into multiple modules
- Adding custom hooks for cleaner context usage
- Persisting state with localStorage
- Adding tests with Jest or React Testing Library

---
