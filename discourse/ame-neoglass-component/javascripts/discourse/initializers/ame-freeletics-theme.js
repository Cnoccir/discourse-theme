import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "ame-freeletics-theme",

  initialize() {
    withPluginApi("0.8.31", (api) => {
      api.onPageChange((url) => {
        const isHome = url === "/" || url === "/categories" || url === "/latest";

        // Header label is handled by CSS in head_tag

        if (!isHome) return;

        // Insert hero banner
        if (settings.enable_hero_banner) {
          insertHeroBanner();
        }

        // Insert category cards
        if (settings.enable_category_cards) {
          insertCategoryCards();
        }
      });

      function insertHeroBanner() {
        if (document.querySelector(".ame-hero-banner")) return;

        const main = document.querySelector(".category-list, .category-boxes, .categories-and-latest, #main-outlet");
        if (!main || !main.parentNode) return;

        const banner = document.createElement("div");
        banner.className = "ame-hero-banner";
        banner.innerHTML = `
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <h1 class="hero-title">${settings.hero_title || ""}</h1>
            <p class="hero-subtitle">${settings.hero_subtitle || ""}</p>
          </div>
        `;

        main.parentNode.insertBefore(banner, main);
      }

      function insertCategoryCards() {
        if (document.querySelector(".ame-category-cards")) return;

        const afterEl = document.querySelector(".ame-hero-banner") || document.querySelector(".category-list, .category-boxes, .categories-and-latest");
        if (!afterEl || !afterEl.parentNode) return;

        const cards = [
          { title: settings.card_1_title, url: settings.card_1_url, icon: settings.card_1_icon },
          { title: settings.card_2_title, url: settings.card_2_url, icon: settings.card_2_icon },
          { title: settings.card_3_title, url: settings.card_3_url, icon: settings.card_3_icon },
          { title: settings.card_4_title, url: settings.card_4_url, icon: settings.card_4_icon },
        ];

        const container = document.createElement("div");
        container.className = "ame-category-cards";

        cards.forEach((c) => {
          if (!c || !c.title || !c.url) return;
          const a = document.createElement("a");
          a.href = c.url;
          a.className = "ame-card";
          a.innerHTML = `
            <div class="card-icon"><i class="fa ${c.icon || "fa-folder"}"></i></div>
            <div class="card-title">${c.title}</div>
          `;
          container.appendChild(a);
        });

        if (afterEl.nextSibling) {
          afterEl.parentNode.insertBefore(container, afterEl.nextSibling);
        } else {
          afterEl.parentNode.appendChild(container);
        }
      }
    });
  },
};
