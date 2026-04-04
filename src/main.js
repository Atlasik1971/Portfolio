import "../hero-typewriter.js";

function bootHeroTypewriter() {
  if (typeof window.initHeroTypewriter === "function") window.initHeroTypewriter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootHeroTypewriter);
} else {
  bootHeroTypewriter();
}
