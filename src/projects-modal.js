/**
 * Кейсы портфолио + модальные окна (задача / что сделано / результат).
 * Новый проект: добавьте объект в PROJECT_CASES и карточку в index.html с тем же data-project-id.
 */
export const PROJECT_CASES = [
  {
    id: "ai-product-landing",
    title: "Лендинг для AI-продукта",
    category: "Концепт для ниши AI и digital-продуктов",
    teaser:
      "Лендинг, который передаёт ощущение современного AI-продукта, объясняет ценность и удерживает внимание за счёт первого экрана и структуры.",
    tags: ["Концепция", "Структура", "Первый экран"],
    task:
      "Создать лендинг, который сразу передаёт ощущение современного AI-продукта, объясняет ценность сервиса и удерживает внимание за счёт сильного первого экрана и продуманной структуры.",
    done:
      "Собрана концепция первого экрана, продумана структура блоков, визуальная подача, акценты в тексте и общее ощущение продукта — от впечатления до логики взаимодействия.",
    result:
      "Получился выразительный концепт лендинга, который можно использовать как основу для презентации продукта, упаковки идеи или дальнейшей полноценной разработки сайта.",
  },
  {
    id: "creative-portfolio",
    title: "Сайт-портфолио для креативного специалиста",
    category: "Концепт для личного бренда и экспертного портфолио",
    teaser:
      "Показать специалиста через стиль, характер и визуальное впечатление — не только список услуг.",
    tags: ["Портфолио", "Позиционирование", "Личный бренд"],
    task:
      "Показать специалиста не просто через список услуг, а через стиль, характер, подход к работе и визуальное впечатление, которое помогает выделиться среди типовых сайтов.",
    done:
      "Продумана структура портфолио, подача услуг, логика блоков, визуальный ритм страницы и тексты, которые помогают передать образ специалиста и сделать сайт более запоминающимся.",
    result:
      "Получился концепт сайта-портфолио с более цельным позиционированием, который помогает представить эксперта сильнее, современнее и профессиональнее.",
  },
  {
    id: "ai-creator-site",
    title: "Сайт для AI-креатора",
    category: "Концепт для автора на стыке контента, технологий и визуала",
    teaser:
      "Страница как часть digital-образа: проекты, стиль и направления работ AI-креатора.",
    tags: ["AI-креатор", "Визуал", "Структура"],
    task:
      "Создать сайт, который помогает AI-креатору показать свои проекты, стиль, подход и направления работы так, чтобы страница выглядела как часть его digital-образа.",
    done:
      "Собрана структура сайта, выделены ключевые блоки для презентации работ, продумана подача контента, визуальная атмосфера и логика, которая помогает удерживать внимание и формировать узнаваемый образ.",
    result:
      "Получился концепт сайта, который можно использовать как базу для личного бренда, портфолио AI-работ и дальнейшего масштабирования в полноценную авторскую площадку.",
  },
];

function byId(id) {
  return PROJECT_CASES.find((p) => p.id === id) || null;
}

function fillTagRow(container, tags) {
  container.replaceChildren();
  tags.forEach((label, i) => {
    const span = document.createElement("span");
    span.className = i === 1 ? "tag tag--muted" : "tag";
    span.textContent = label;
    container.appendChild(span);
  });
}

export function initProjectModals() {
  const root = document.getElementById("project-modal");
  if (!root) return;

  const backdrop = root.querySelector(".project-modal__backdrop");
  const panel = root.querySelector(".project-modal__panel");
  const btnClose = root.querySelector(".project-modal__close");
  const elCategory = root.querySelector("[data-modal-field='category']");
  const elTitle = root.querySelector("[data-modal-field='title']");
  const elTask = root.querySelector("[data-modal-field='task']");
  const elDone = root.querySelector("[data-modal-field='done']");
  const elResult = root.querySelector("[data-modal-field='result']");

  let lastFocus = null;

  function open(caseId) {
    const data = byId(caseId);
    if (!data) return;

    lastFocus = document.activeElement;
    elCategory.textContent = data.category;
    elTitle.textContent = data.title;
    elTask.textContent = data.task;
    elDone.textContent = data.done;
    elResult.textContent = data.result;

    root.removeAttribute("hidden");
    root.setAttribute("aria-hidden", "false");
    document.body.classList.add("project-modal-open");

    requestAnimationFrame(() => {
      root.classList.add("is-open");
    });

    btnClose.focus();
  }

  function close() {
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    document.body.classList.remove("project-modal-open");

    window.setTimeout(() => {
      if (!root.classList.contains("is-open")) root.setAttribute("hidden", "");
    }, 320);

    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  document.querySelectorAll("[data-project-id]").forEach((card) => {
    const id = card.getAttribute("data-project-id");
    const data = byId(id);
    if (!data) return;

    const tagRow = card.querySelector(".tag-row");
    if (tagRow) fillTagRow(tagRow, data.tags);

    const teaser = card.querySelector(".project-card__teaser");
    if (teaser) teaser.textContent = data.teaser;

    const titleEl = card.querySelector(".project-card__title");
    if (titleEl) titleEl.textContent = data.title;

    const catEl = card.querySelector(".project-card__category");
    if (catEl) catEl.textContent = data.category;

    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `Открыть описание кейса: ${data.title}`
    );

    card.addEventListener("click", () => open(id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(id);
      }
    });
  });

  btnClose.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("is-open")) {
      e.preventDefault();
      close();
    }
  });
}
