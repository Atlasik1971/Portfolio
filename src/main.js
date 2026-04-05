import "../hero-typewriter.js";
import { initProjectModals } from "./projects-modal.js";

function boot() {
  if (typeof window.initHeroTypewriter === "function") window.initHeroTypewriter();
  initProjectModals();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
