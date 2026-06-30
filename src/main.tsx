import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App'

/ ✅ Import the compressed favicon (18 KB)
import favicon from './assets/favicon.png'

// Inject favicon for browser tab
const updateFavicon = () => {
  let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    document.head.appendChild(link);
  }
  link.type = 'image/png';
  link.rel = 'icon';
  link.href = favicon;
};

updateFavicon();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
// --- NEW CODE END ---

// Your existing React render code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
