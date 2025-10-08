# Implementation Plan

- [x] 1. Update theme settings configuration





  - Add new settings to settings.yml for quote rotation, background blur, and category card URLs
  - Configure default values using AME brand colors and /public folder assets
  - _Requirements: 6.5_

- [x] 2. Update CSS variables in head_tag.html





  - Add CSS variables for AME brand colors (#003d6b, #0078d4)
  - Add variable for background image path (/public/Background-Lgin-Landing.png)
  - Add variables for glass effect opacity and blur from settings
  - _Requirements: 6.2, 6.3_

- [x] 3. Implement hero banner component





- [x] 3.1 Create hero banner DOM injection logic


  - Modify ame-neoglass.js to detect homepage and inject .ame-hero-banner element
  - Build HTML structure with hero-overlay, hero-content, hero-title, and hero-quote elements
  - Position banner before category listing using insertBefore()
  - _Requirements: 1.1, 1.2_

- [x] 3.2 Implement quote rotation functionality


  - Update existing inspirationQuotes array with 4 knowledge quotes
  - Modify startQuoteRotation() function to work with hero banner
  - Implement fade-out/fade-in transitions using opacity
  - Use configurable rotation interval from settings
  - _Requirements: 1.3_


- [x] 3.3 Style hero banner with SCSS

  - Add .ame-hero-banner styles to common.scss with background image, overlay, and centering
  - Style .hero-title with uppercase, wide letter-spacing (0.2em), white color
  - Add .hero-quote-container with decorative horizontal lines
  - Implement responsive styles for mobile (<768px)
  - _Requirements: 1.4, 1.5_

- [x] 4. Implement stackblur background component




- [x] 4.1 Create blurred background DOM injection


  - Add createBlurredBackground() function to ame-neoglass.js
  - Inject #ame-background-blur div with fixed positioning
  - Set z-index: -1 to position behind all content
  - Apply background image from settings
  - _Requirements: 2.1, 2.2_

- [x] 4.2 Style blurred background with SCSS


  - Add #ame-background-blur styles to common.scss
  - Implement backdrop-filter: blur(8px) with @supports detection
  - Add fallback using filter: blur(8px) for unsupported browsers
  - Add dark overlay using ::before pseudo-element
  - _Requirements: 2.3, 2.5_

- [x] 5. Implement Neo-Glass category cards





- [x] 5.1 Create category cards DOM structure


  - Add createCategoryCards() function to ame-neoglass.js
  - Define cards array with 4 categories (Knowledge Base, Tech Community, How-To, AI Assistant)
  - Build .ame-category-cards container with individual .neo-glass-card elements
  - Include Font Awesome icons, titles, and descriptions
  - Hide default Discourse category listing
  - _Requirements: 3.1, 3.6, 4.1, 4.2, 4.3, 4.4_

- [x] 5.2 Wire up category card navigation


  - Use category URLs from settings (category_card_1_url, etc.)
  - Add click handlers to navigate to corresponding categories
  - Apply staggered animation delays for card entrance
  - _Requirements: 4.5_

- [x] 5.3 Style category cards with Neo-Glassmorphism


  - Add .ame-category-cards grid layout to common.scss (2x2 on desktop)
  - Style .neo-glass-card with semi-transparent background and backdrop-filter
  - Add subtle border using AME brand colors
  - Implement box-shadow for depth
  - _Requirements: 3.4_

- [x] 5.4 Implement card hover effects


  - Add CSS transitions for transform: translateY(-5px)
  - Enhance border color and box-shadow on hover
  - Increase background opacity on hover
  - _Requirements: 3.5_

- [x] 5.5 Add responsive styles for category cards


  - Implement 2x2 grid for desktop (>1024px)
  - Adjust spacing for tablet (768px-1024px)
  - Stack cards vertically for mobile (<768px)
  - Scale font sizes and padding appropriately
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 6. Add accessibility features
  - Add ARIA labels to category cards (aria-label attributes)
  - Ensure keyboard navigation works with visible focus indicators
  - Add alt text or aria-hidden to decorative elements
  - Test color contrast meets WCAG 2.1 AA standards
  - _Requirements: 7.2, 7.3, 7.5_

- [ ] 7. Optimize performance
  - Implement defensive checks for DOM elements (if !element return)
  - Add duplicate element prevention (check if already exists)
  - Use setTimeout delays appropriately for DOM readiness
  - Ensure background image doesn't block page render
  - _Requirements: 7.1, 7.6_

- [x] 8. Test and refine






  - Test homepage detection on /, /categories, /latest routes
  - Verify quote rotation cycles through all 4 quotes
  - Test responsive layouts on desktop, tablet, mobile
  - Test hover effects on category cards
  - Verify navigation to category pages works
  - Test in Chrome, Firefox, Safari, Edge
  - Verify glassmorphism fallbacks work
  - _Requirements: 5.4, 5.5, 5.6_
