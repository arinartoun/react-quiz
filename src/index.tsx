import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QuizProvider } from "./contexts/QuizContext";
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found !");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>,
);
