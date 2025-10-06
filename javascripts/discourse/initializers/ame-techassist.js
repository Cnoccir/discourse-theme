import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "ame-techassist",

  initialize() {
    withPluginApi("0.8.31", (api) => {
      api.onPageChange(() => {
        const currentRoute = api.container.lookup("router:main").currentRouteName;

        // Knowledge quotes - rotating banner
        const knowledgeQuotes = [
          "Put knowledge where people trip over it.",
          "Everybody is smarter than anybody.",
          "The only thing to do with good advice is to pass it on.",
          "Knowledge is like money: to be of value it must circulate.",
          "To know what you know and what you do not know, that is true knowledge.",
          "Knowledge is a weapon. I intend to be formidably armed. 🧭"
        ];

        let currentQuoteIndex = 0;

        // Knowledge Quote Banner (shown on all pages)
        function createQuoteBanner() {
          const quoteBannerHTML = `
            <div class="ame-knowledge-quote-banner">
              <div class="quote-content" id="ame-rotating-quote">
                ${knowledgeQuotes[0]}
              </div>
            </div>
          `;

          const headerElement = document.querySelector('.d-header-wrap');
          if (headerElement && !document.querySelector('.ame-knowledge-quote-banner')) {
            headerElement.insertAdjacentHTML('afterend', quoteBannerHTML);

            // Rotate quotes every 8 seconds
            setInterval(() => {
              currentQuoteIndex = (currentQuoteIndex + 1) % knowledgeQuotes.length;
              const quoteElement = document.getElementById('ame-rotating-quote');
              if (quoteElement) {
                quoteElement.style.opacity = '0';
                setTimeout(() => {
                  quoteElement.textContent = knowledgeQuotes[currentQuoteIndex];
                  quoteElement.style.opacity = '1';
                }, 300);
              }
            }, 8000);
          }
        }

        createQuoteBanner();

        // Hero section (only on homepage)
        if (currentRoute === "discovery.categories" || currentRoute === "discovery.latest") {
          const heroHTML = `
            <div class="ame-hero-section">
              <div class="ame-hero-content">
                <h1 class="ame-hero-title">
                  AME <span class="highlight">TechAssist</span>
                </h1>
                <p class="ame-hero-subtitle">Building Automation Systems · Technical Knowledge · Expert Support</p>

                <div class="ame-hero-search">
                  <input
                    type="text"
                    placeholder="Search Niagara, BACnet, controls, integration, troubleshooting..."
                    id="ame-hero-search-input"
                    class="ame-search-input"
                  />
                  <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                  </svg>
                </div>

                <div class="ame-hero-cta">
                  <a href="/search" class="ame-btn ame-btn-primary">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    Search Technical Docs
                  </a>
                  <a href="/new-topic" class="ame-btn ame-btn-secondary">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Ask Technical Question
                  </a>
                </div>
              </div>
            </div>
          `;

          // Insert hero after quote banner
          const quoteBanner = document.querySelector('.ame-knowledge-quote-banner');
          if (quoteBanner && !document.querySelector('.ame-hero-section')) {
            quoteBanner.insertAdjacentHTML('afterend', heroHTML);

            // Add search functionality
            const searchInput = document.getElementById('ame-hero-search-input');
            if (searchInput) {
              searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim()) {
                  window.location.href = '/search?q=' + encodeURIComponent(this.value);
                }
              });
            }
          }
        }
      });
    });
  }
};
