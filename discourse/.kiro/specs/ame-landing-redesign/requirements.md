# Requirements Document

## Introduction

This feature enhances the existing AME-TechAssist Discourse theme component to transform the landing page into a modern, tech-focused portal with a hero banner, blurred futuristic background, and four prominent Neo-Glassmorphism category cards. Following Discourse theme component standards and the architectural pattern used by Freeletics Training Communities (versatile-banner, stackblur-backgrounds, category-banners), this implementation will extend the existing ame-neoglass-component by:

1. Using the Discourse Plugin API (`withPluginApi`) to inject custom HTML and behavior
2. Leveraging CSS variables defined in head_tag.html for theme settings
3. Using SCSS in common/common.scss and desktop/desktop.scss for styling
4. Implementing JavaScript initializers to manipulate the DOM and add interactivity
5. Providing configurable settings via settings.yml

The enhancement will replace the current inspiration block with a full hero banner section, add a stackblur background effect, and transform the default category listing into four custom Neo-Glass cards that serve as primary navigation.

## Requirements

### Requirement 1: Hero Banner with Dynamic Quote Display

**User Story:** As a visitor to the AME-TechAssist forum, I want to see an inspiring knowledge-focused quote in a prominent hero banner section, so that I understand the platform's mission and feel motivated to engage with the community.

#### Acceptance Criteria

1. WHEN the homepage loads THEN the JavaScript initializer SHALL use `api.onPageChange()` to detect the homepage and inject a `.ame-hero-banner` element before the category listing
2. WHEN creating the hero banner THEN the system SHALL:
   - Create a full-width banner container with the class `.ame-hero-banner`
   - Insert the main title "TRANSFERRING KNOWLEDGE TO BUILD OUR COLLECTIVE FUTURE" in an `<h1>` element
   - Insert one of four rotating quotes in a `.hero-quote` element below the title
   - Use CSS variables from settings.yml (--hero-bg-image, --hero-title, --hero-subtitle)
3. WHEN the JavaScript initializes THEN it SHALL:
   - Maintain the existing inspirationQuotes array with the four knowledge quotes
   - Implement quote rotation logic that cycles through quotes every 8 seconds
   - Apply fade-out/fade-in transitions when changing quotes (opacity animation)
4. WHEN styling the banner THEN the SCSS SHALL:
   - Apply background-image from CSS variable with background-size: cover and background-position: center
   - Style the title with uppercase text, wide letter-spacing (0.2em), and white color
   - Add decorative horizontal lines above and below the quote (similar to #NEVERSETTLE design)
   - Apply a dark overlay (rgba) to ensure text readability
5. WHEN the viewport is mobile (<768px) THEN the responsive SCSS SHALL:
   - Reduce font sizes appropriately (title: 1.5rem, quote: 1rem)
   - Adjust padding and spacing for mobile screens
   - Maintain readability and visual hierarchy

### Requirement 2: Stackblur Background Implementation

**User Story:** As a visitor, I want to see a visually striking, tech-themed blurred background that reflects the platform's modern and technical nature, so that I immediately understand this is a technology-focused community.

#### Acceptance Criteria

1. WHEN the homepage loads THEN the JavaScript initializer SHALL:
   - Use `api.onPageChange()` to detect homepage URLs (/, /categories, /latest)
   - Inject a fixed-position `<div id="ame-background-blur">` element into the DOM
   - Position it as the first child of the body or main container
2. WHEN creating the background element THEN the JavaScript SHALL:
   - Set inline styles: position: fixed, top: 0, left: 0, width: 100vw, height: 100vh, z-index: -1
   - Apply the background image from settings.hero_background_image
   - Ensure the element is behind all other content
3. WHEN styling the background THEN the SCSS SHALL:
   - Apply `backdrop-filter: blur(8px)` or `filter: blur(8px)` for the blur effect
   - Add a dark overlay using `::before` pseudo-element with rgba(0, 0, 0, 0.4)
   - Set background-size: cover and background-position: center
   - Use CSS variable --hero-bg-image from settings
4. WHEN the administrator configures the theme THEN settings.yml SHALL:
   - Provide hero_background_image setting (string, default: "/Background-Lgin-Landing.png")
   - Allow upload or URL input for custom background images
   - Support futuristic cityscape images with blues, grays, and Cyber Teal accents
5. IF the browser does not support backdrop-filter THEN the SCSS SHALL:
   - Include @supports query to detect backdrop-filter support
   - Provide fallback using filter: blur() directly on the background image
   - Ensure visual consistency across browsers

### Requirement 3: Category Cards Component with Neo-Glassmorphism Override

**User Story:** As a user, I want to navigate to the main forum sections through visually distinct, modern category cards that replace the default Discourse category listing, so that I can quickly access the content I need with an intuitive and aesthetically pleasing interface.

#### Acceptance Criteria

1. WHEN the homepage loads THEN the system SHALL use JavaScript to:
   - Target the default Discourse category listing container
   - Replace or hide the default category HTML
   - Inject four custom category card elements immediately below the hero banner
2. WHEN displaying cards on desktop THEN the system SHALL apply CSS grid or flexbox to arrange them horizontally or in a 2x2 grid
3. WHEN displaying cards on mobile THEN the system SHALL apply responsive CSS to stack them vertically with appropriate spacing
4. WHEN rendering each card THEN the system SHALL apply Neo-Glassmorphism styling via CSS:
   - Semi-transparent background using CSS variable --glass-base: rgba(240, 244, 248, 0.15)
   - Frosted glass effect with backdrop-filter: blur(15px)
   - Thin gradient border using CSS variables --ame-core-blue: #1E88E5 and --cyber-teal: #00D9FF
   - Diffused box-shadow for depth with optional Cyber Teal glow
5. WHEN a user hovers over a card THEN the system SHALL apply CSS transitions for:
   - Subtle lift effect (transform: translateY(-5px))
   - Activated Cyber Teal border glow (box-shadow with --cyber-teal)
6. WHEN rendering card content THEN the system SHALL inject HTML containing:
   - A Font Awesome icon element styled with AME Core Blue (or Cyber Teal for AI Assistant)
   - A category title element
   - A description element with concise text

### Requirement 4: Category Card Content and Icons

**User Story:** As a user, I want each category card to clearly communicate its purpose through icons and descriptions, so that I can immediately understand what content or functionality each section provides.

#### Acceptance Criteria

1. WHEN displaying the Knowledge Base card THEN the system SHALL show:
   - Icon: fa-book or fa-database in AME Core Blue
   - Title: "Knowledge Base"
   - Description: "Access Vendor Manuals, Equipment Specs & Technical Docs"
2. WHEN displaying the Tech Community card THEN the system SHALL show:
   - Icon: fa-users or fa-comments in AME Core Blue
   - Title: "Tech Community"
   - Description: "Connect, Ask Questions & Share Expertise"
3. WHEN displaying the How-To & Troubleshooting card THEN the system SHALL show:
   - Icon: fa-wrench or fa-cogs in AME Core Blue
   - Title: "How-To & Troubleshooting"
   - Description: "Find Guides, Tutorials & Fixes"
4. WHEN displaying the AI Assistant card THEN the system SHALL show:
   - Icon: Stylized robot head or fa-robot in Cyber Teal
   - Title: "AI Assistant (AME-Bot)"
   - Description: "Get Instant Answers from AI"
5. WHEN a user clicks a card THEN the system SHALL navigate to the corresponding category or section

### Requirement 5: Responsive Design and Cross-Browser Compatibility

**User Story:** As a user accessing the forum from various devices and browsers, I want the landing page to display correctly and maintain its visual appeal, so that I have a consistent experience regardless of my platform.

#### Acceptance Criteria

1. WHEN accessing the page from desktop (>1024px) THEN the system SHALL display cards in a horizontal or 2x2 grid layout
2. WHEN accessing the page from tablet (768px-1024px) THEN the system SHALL adjust card sizing and spacing appropriately
3. WHEN accessing the page from mobile (<768px) THEN the system SHALL stack cards vertically
4. WHEN the viewport changes THEN the system SHALL smoothly transition between layouts
5. WHEN testing in Chrome, Firefox, Safari, and Edge THEN the system SHALL render glassmorphism effects correctly
6. IF a browser does not support backdrop-filter THEN the system SHALL provide a graceful fallback with solid semi-transparent backgrounds

### Requirement 6: Theme Component Architecture Following Freeletics Pattern

**User Story:** As a forum administrator, I want the landing page redesign to use modular theme components similar to Freeletics' approach (versatile-banner, stackblur-backgrounds, category-banners), so that I can install, configure, and maintain each piece independently without breaking existing functionality.

#### Acceptance Criteria

1. WHEN creating the theme components THEN the system SHALL follow Discourse's theme component structure with:
   - about.json defining component metadata
   - settings.yml for configurable options
   - common/common.scss or desktop/desktop.scss for CSS
   - common/head_tag.html for meta tags and CSS variables
   - javascripts/ folder for dynamic behavior
2. WHEN implementing the background THEN the system SHALL create a stackblur-style component that:
   - Injects a fixed, full-viewport element for the blurred background
   - Uses CSS variables (e.g., --background-image-url) for configurability
   - Positions the element behind all content with appropriate z-index
3. WHEN implementing the hero banner THEN the system SHALL create a versatile-banner-style component that:
   - Defines CSS variables for banner background (--banner-bg-img, --banner-bg-color)
   - Creates a .banner-box element with background-size: cover and background-position: center
   - Styles title elements (h1-h3) with centered text and custom color variables
   - Includes JavaScript to rotate through the four knowledge quotes
4. WHEN implementing category cards THEN the system SHALL override Discourse's default category listing with:
   - Custom HTML templates injected via plugin outlets or JavaScript
   - CSS that targets category elements and applies Neo-Glass styling
   - CSS variables for colors, borders, and effects (--glass-base, --ame-core-blue, --cyber-teal)
5. WHEN an administrator accesses theme settings THEN the system SHALL provide configuration options for:
   - Background image URL upload
   - Quote rotation interval (seconds)
   - Enable/disable quote rotation
   - Color overrides for AME Core Blue and Cyber Teal
   - Card link destinations for each of the 4 categories
6. WHEN the component is disabled THEN the system SHALL revert to the default Discourse category listing without errors or orphaned styles

### Requirement 7: Performance and Accessibility

**User Story:** As a user with accessibility needs or limited bandwidth, I want the landing page to load quickly and be navigable with assistive technologies, so that I can access the forum regardless of my circumstances.

#### Acceptance Criteria

1. WHEN the page loads THEN the system SHALL achieve a Lighthouse performance score of 80 or higher
2. WHEN using a screen reader THEN the system SHALL provide appropriate ARIA labels for all interactive elements
3. WHEN navigating with keyboard THEN the system SHALL allow tab navigation through all cards with visible focus indicators
4. WHEN images fail to load THEN the system SHALL display appropriate fallback colors and maintain layout integrity
5. WHEN testing color contrast THEN the system SHALL meet WCAG 2.1 AA standards for all text elements
6. WHEN the background image loads THEN the system SHALL use lazy loading or progressive enhancement to prevent blocking page render
