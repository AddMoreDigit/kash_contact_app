
  import { createRoot } from "react-dom/client";
  import { Amplify } from 'aws-amplify';
  import App from "./App.tsx";
  import "./index.css";

  // Initialize Amplify with outputs
  const initializeApp = async () => {
    try {
      // Fetch amplify outputs from the public directory or root
      const response = await fetch('/amplify_outputs.json');
      if (response.ok) {
        const outputs = await response.json();
        Amplify.configure(outputs);
      }
    } catch (error) {
      console.warn('Could not load amplify_outputs.json:', error);
    }

    createRoot(document.getElementById("root")!).render(<App />);
  };

  initializeApp();
  