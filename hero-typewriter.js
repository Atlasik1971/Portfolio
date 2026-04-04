/**
 * Эффект набора текста (адаптация TextType / React Bits) без React и GSAP.
 */
(function () {
  function initTypewriter(container, options) {
    var contentEl = container.querySelector(".text-type__content");
    var cursorEl = container.querySelector(".text-type__cursor");
    if (!contentEl) return function () {};

    var textArray = Array.isArray(options.text) ? options.text : [options.text];
    var typingSpeed = options.typingSpeed != null ? options.typingSpeed : 50;
    var deletingSpeed = options.deletingSpeed != null ? options.deletingSpeed : 30;
    var pauseDuration = options.pauseDuration != null ? options.pauseDuration : 2000;
    var initialDelay = options.initialDelay != null ? options.initialDelay : 0;
    var loop = options.loop !== false;
    var showCursor = options.showCursor !== false;
    var cursorCharacter = options.cursorCharacter != null ? options.cursorCharacter : "|";
    var hideCursorWhileTyping = !!options.hideCursorWhileTyping;
    var reverseMode = !!options.reverseMode;
    var variableSpeedEnabled = !!options.variableSpeedEnabled;
    var variableSpeedMin = options.variableSpeedMin != null ? options.variableSpeedMin : 60;
    var variableSpeedMax = options.variableSpeedMax != null ? options.variableSpeedMax : 120;
    var startOnVisible = !!options.startOnVisible;
    var onSentenceComplete = options.onSentenceComplete;

    var textIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var displayed = "";
    var timeoutId = null;
    var started = false;

    function rndSpeed() {
      if (!variableSpeedEnabled) return typingSpeed;
      return variableSpeedMin + Math.random() * (variableSpeedMax - variableSpeedMin);
    }

    function updateCursorVisibility() {
      if (!cursorEl || !hideCursorWhileTyping) return;
      var line = textArray[textIndex];
      var full = reverseMode ? line.split("").reverse().join("") : line;
      var hide =
        !deleting && charIndex < full.length ? true : false;
      cursorEl.classList.toggle("text-type__cursor--hidden", hide);
    }

    if (cursorEl) {
      cursorEl.textContent = cursorCharacter;
      cursorEl.style.display = showCursor ? "inline-block" : "none";
      cursorEl.style.animationDuration =
        (options.cursorBlinkDuration != null ? options.cursorBlinkDuration : 0.5) + "s";
    }

    function clearTimer() {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }

    function step() {
      clearTimer();
      var currentRaw = textArray[textIndex];
      var line = reverseMode ? currentRaw.split("").reverse().join("") : currentRaw;

      if (deleting) {
        if (!displayed.length) {
          deleting = false;
          if (onSentenceComplete) onSentenceComplete(currentRaw, textIndex);
          if (!loop && textIndex === textArray.length - 1) return;
          textIndex = (textIndex + 1) % textArray.length;
          charIndex = 0;
          updateCursorVisibility();
          timeoutId = setTimeout(step, pauseDuration);
          return;
        }
        displayed = displayed.slice(0, -1);
        contentEl.textContent = displayed;
        updateCursorVisibility();
        timeoutId = setTimeout(step, deletingSpeed);
        return;
      }

      if (charIndex < line.length) {
        displayed += line.charAt(charIndex);
        charIndex++;
        contentEl.textContent = displayed;
        updateCursorVisibility();
        timeoutId = setTimeout(step, rndSpeed());
        return;
      }

      if (!loop && textIndex >= textArray.length - 1) return;
      timeoutId = setTimeout(function () {
        deleting = true;
        updateCursorVisibility();
        step();
      }, pauseDuration);
    }

    function run() {
      if (started) return;
      started = true;
      charIndex = 0;
      deleting = false;
      displayed = "";
      contentEl.textContent = "";
      if (initialDelay > 0) {
        timeoutId = setTimeout(step, initialDelay);
      } else {
        step();
      }
    }

    if (startOnVisible) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              run();
              io.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      io.observe(container);
    } else {
      run();
    }

    return function destroy() {
      clearTimer();
    };
  }

  window.initHeroTypewriter = function () {
    var el = document.getElementById("hero-typewriter");
    if (!el) return;
    initTypewriter(el, {
      text: [
        "Сайты, которые хочется листать и запоминать.",
        "Вайб, структура и UX — в одной цельной подаче.",
        "От первого впечатления до готовой страницы.",
      ],
      typingSpeed: 150,
      pauseDuration: 3000,
      deletingSpeed: 80,
      initialDelay: 400,
      loop: true,
      showCursor: true,
      cursorCharacter: "_",
      cursorBlinkDuration: 0.5,
      hideCursorWhileTyping: false,
      variableSpeedEnabled: false,
      startOnVisible: false,
    });
  };
})();
