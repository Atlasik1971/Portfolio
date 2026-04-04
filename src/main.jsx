import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProfileCard from "./ProfileCard.jsx";
import portraitUrl from "../assets/hero-portrait.jpg?url";
import "../hero-typewriter.js";

function bootHeroTypewriter() {
  if (typeof window.initHeroTypewriter === "function") window.initHeroTypewriter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootHeroTypewriter);
} else {
  bootHeroTypewriter();
}

const rootEl = document.getElementById("profile-card-root");

function onContactClick() {
  window.location.hash = "contacts";
  document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ProfileCard
        name="Татьяна"
        title="Vibe Coder · Web & AI"
        handle="tatiana_vibe"
        status="На связи"
        contactText="Написать"
        avatarUrl={portraitUrl}
        showUserInfo
        enableTilt
        enableMobileTilt
        onContactClick={onContactClick}
        behindGlowColor="hsla(244, 100%, 70%, 0.6)"
        behindGlowEnabled
        innerGradient="linear-gradient(145deg,hsla(244, 40%, 45%, 0.55) 0%,hsla(273, 60%, 70%, 0.27) 100%)"
      />
    </StrictMode>
  );
}
