
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add tutorial styles
const style = document.createElement('style');
style.innerHTML = `
  .tutorial-highlight {
    position: relative;
    z-index: 51 !important;
    box-shadow: 0 0 0 4px rgb(220 38 38 / 50%), 0 0 0 8px rgb(254 252 232 / 20%);
    border-radius: 4px;
    animation: tutorial-pulse 2s infinite;
  }
  
  @keyframes tutorial-pulse {
    0% {
      box-shadow: 0 0 0 0 rgb(220 38 38 / 40%), 0 0 0 4px rgb(254 252 232 / 20%);
    }
    70% {
      box-shadow: 0 0 0 6px rgb(220 38 38 / 0%), 0 0 0 10px rgb(254 252 232 / 10%);
    }
    100% {
      box-shadow: 0 0 0 0 rgb(220 38 38 / 0%), 0 0 0 4px rgb(254 252 232 / 20%);
    }
  }
  
  .tutorial-target {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
