import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "ame-neoglass",

  initialize() {
    withPluginApi("0.8.31", (api) => {
      // Inspiration quotes for rotation
      const inspirationQuotes = [
        "Alone we can do so little; together we can do so much.",
        "Put knowledge where people trip over it.",
        "Everybody is smarter than anybody.",
        "Knowledge is like money: to be of value it must circulate.",
        "Together we know more."
      ];

      let currentQuoteIndex = 0;

      api.onPageChange((url, title) => {
        const isHomepage = url === "/" || url === "/categories" || url === "/latest";

        if (isHomepage) {
          // Add hero title and subtitle data attributes
          setTimeout(() => {
            const navigationContainer = document.querySelector(".navigation-container");
            if (navigationContainer) {
              const heroTitle = settings.hero_title || "TRANSFERRING KNOWLEDGE TO BUILD OUR COLLECTIVE FUTURE";
              const heroSubtitle = settings.hero_subtitle || "Together We Know More";

              navigationContainer.setAttribute("data-hero-title", heroTitle);
              navigationContainer.setAttribute("data-hero-subtitle", heroSubtitle);
            }

            // Create inspiration block if enabled
            if (settings.enable_inspiration_block) {
              createInspirationBlock();
            }

            // Set background images from settings
            if (settings.hero_background_image) {
              document.documentElement.style.setProperty(
                '--hero-bg-image',
                `url('${settings.hero_background_image}')`
              );
            }

            // Set glass effect variables from settings
            if (settings.glass_opacity) {
              document.documentElement.style.setProperty(
                '--glass-opacity',
                settings.glass_opacity
              );
            }

            if (settings.glass_blur) {
              document.documentElement.style.setProperty(
                '--glass-blur',
                `${settings.glass_blur}px`
              );
            }
          }, 100);
        }

        // Login page background
        const isLoginPage = document.body.classList.contains('static-login') ||
                           document.body.classList.contains('static-signup');

        if (isLoginPage && settings.login_background_image) {
          document.documentElement.style.setProperty(
            '--login-bg-image',
            `url('${settings.login_background_image}')`
          );
        }
      });

      // Function to create inspiration block
      function createInspirationBlock() {
        const existingBlock = document.querySelector(".ame-inspiration-block");
        if (existingBlock) {
          return; // Already exists
        }

        const categoryList = document.querySelector(".category-list, .category-boxes");
        if (!categoryList) {
          return;
        }

        // Create inspiration block
        const inspirationBlock = document.createElement("div");
        inspirationBlock.className = "ame-inspiration-block";
        inspirationBlock.innerHTML = `
          <div class="inspiration-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="inspiration-quote">${inspirationQuotes[currentQuoteIndex]}</div>
        `;

        // Insert after category list
        categoryList.parentNode.insertBefore(inspirationBlock, categoryList.nextSibling);

        // Start quote rotation
        startQuoteRotation(inspirationBlock);
      }

      // Function to rotate quotes
      function startQuoteRotation(block) {
        setInterval(() => {
          currentQuoteIndex = (currentQuoteIndex + 1) % inspirationQuotes.length;
          const quoteElement = block.querySelector(".inspiration-quote");

          if (quoteElement) {
            // Fade out
            quoteElement.style.opacity = "0";

            setTimeout(() => {
              quoteElement.textContent = inspirationQuotes[currentQuoteIndex];
              // Fade in
              quoteElement.style.opacity = "1";
            }, 300);
          }
        }, 8000); // Change every 8 seconds
      }

      // Add body class for theme identification
      api.onPageChange(() => {
        document.body.classList.add('ame-neoglass-theme');
      });

      // Enhanced category card interactions
      api.onPageChange(() => {
        setTimeout(() => {
          const categoryCards = document.querySelectorAll('.category-box, .category-box-inner');

          categoryCards.forEach((card, index) => {
            // Add staggered animation delay
            card.style.animationDelay = `${index * 0.1}s`;

            // Add data attribute for category identification
            card.setAttribute('data-category-index', index + 1);
          });
        }, 200);
      });
    });
  }
};
