# Design Document

## Overview

This design document outlines the technical approach for enhancing the AME-TechAssist Discourse theme component to create a modern landing page with a hero banner, blurred background, and Neo-Glassmorphism category cards. The implementation extends the existing `ame-neoglass-component` by modifying its JavaScript initializer, SCSS stylesheets, and settings configuration.

The design follows Discourse theme component best practices and mirrors the architectural pattern used by Freeletics Training Communities, which uses separate modular components (versatile-banner, stackblur-backgrounds, category-banners) to achieve a custom homepage experience.

## Architecture

### Component Structure

```
ame-neoglass-component/
├── about.json                          # Component metadata
├── settings.yml                        # Admin-configurable settings
├── common/
│   ├── common.scss                     # Shared styles (all devices)
│   └── head_tag.html                   # CSS variables, meta tags
├── desktop/
│   └── desktop.scss                    # Desktop-specific styles
├── mobile/
│   └── mobile.scss                     # Mobile-specific styles
└── javascripts/
    └── discourse/
        └── initializers/
            └── ame-neoglass.js         # Main JavaScript logic
```

### Technology Stack

- **Discourse Plugin API**: `withPluginApi("0.8.31")` for DOM manipulation and lifecycle hooks
- **SCSS**: For styling with CSS variables and responsive design
- **Vanilla JavaScript**: For DOM injection, quote rotation, and interactivity
- **CSS Variables**: For theme configurability via settings.yml

### Key Design Patterns

1. **DOM Injection Pattern**: Use `api.onPageChange()` to detect homepage and inject custom HTML elements
2. **CSS Variable Pattern**: Define configurable values in settings.yml, inject via head_tag.html, reference in SCSS
3. **Progressive Enhancement**: Provide fallbacks for unsupported CSS features (backdrop-filter)
4. **Responsive Design**: Mobile-first approach with breakpoints at 768px and 1024px

## Components and Interfaces

### 1. Hero Banner Component

#### Purpose
Display a full-width hero section with the main title, rotating knowledge quotes, and background image.

#### DOM Structure
```html
<div class="ame-hero-banner">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">TRANSFERRING KNOWLEDGE TO BUILD OUR COLLECTIVE FUTURE</h1>
    <div class="hero-quote-container">
      <div class="hero-quote-line"></div>
      <p class="hero-quote">Alone we can do so little; together we can do so much.</p>
      <div class="hero-quote-line"></div>
    </div>
  </div>
</div>
```

#### JavaScript Logic
```javascript
function createHeroBanner() {
  const categoryList = document.querySelector(".category-list, .category-boxes");
  if (!categoryList) return;
  
  const heroBanner = document.createElement("div");
  heroBanner.className = "ame-hero-banner";
  
  const heroTitle = settings.hero_title || "TRANSFERRING KNOWLEDGE TO BUILD OUR COLLECTIVE FUTURE";
  const currentQuote = inspirationQuotes[currentQuoteIndex];
  
  heroBanner.innerHTML = `
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">${heroTitle}</h1>
      <div class="hero-quote-container">
        <div class="hero-quote-line"></div>
        <p class="hero-quote">${currentQuote}</p>
        <div class="hero-quote-line"></div>
      </div>
    </div>
  `;
  
  categoryList.parentNode.insertBefore(heroBanner, categoryList);
  startQuoteRotation(heroBanner);
}
```

#### SCSS Styling
```scss
.ame-hero-banner {
  position: relative;
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: var(--hero-bg-image);
  background-size: cover;
  background-position: center;
  overflow: hidden;
  
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
    max-width: 1200px;
  }
  
  .hero-title {
    color: #ffffff;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 2rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .hero-quote-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .hero-quote-line {
    width: 60px;
    height: 1px;
    background: rgba(255, 255, 255, 0.6);
  }
  
  .hero-quote {
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 300;
    letter-spacing: 0.05em;
    opacity: 1;
    transition: opacity 0.3s ease;
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .ame-hero-banner {
    min-height: 300px;
    
    .hero-title {
      font-size: 1.5rem;
      letter-spacing: 0.1em;
    }
    
    .hero-quote {
      font-size: 1rem;
    }
    
    .hero-quote-line {
      width: 30px;
    }
  }
}
```

### 2. Stackblur Background Component

#### Purpose
Create a fixed, full-viewport blurred background element that sits behind all content on the homepage.

#### DOM Structure
```html
<div id="ame-background-blur"></div>
```

#### JavaScript Logic
```javascript
function createBlurredBackground() {
  // Check if already exists
  if (document.getElementById("ame-background-blur")) return;
  
  const backgroundDiv = document.createElement("div");
  backgroundDiv.id = "ame-background-blur";
  backgroundDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-image: var(--hero-bg-image);
    background-size: cover;
    background-position: center;
  `;
  
  document.body.insertBefore(backgroundDiv, document.body.firstChild);
}
```

#### SCSS Styling
```scss
#ame-background-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-image: var(--hero-bg-image);
  background-size: cover;
  background-position: center;
  
  // Apply blur effect
  @supports (backdrop-filter: blur(8px)) {
    backdrop-filter: blur(8px);
  }
  
  @supports not (backdrop-filter: blur(8px)) {
    filter: blur(8px);
  }
  
  // Dark overlay for readability
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
}
```

### 3. Neo-Glass Category Cards Component

#### Purpose
Replace the default Discourse category listing with four custom Neo-Glassmorphism cards that serve as primary navigation.

#### DOM Structure
```html
<div class="ame-category-cards">
  <a href="/c/knowledge-base" class="neo-glass-card">
    <div class="card-icon">
      <i class="fa fa-book"></i>
    </div>
    <h3 class="card-title">Knowledge Base</h3>
    <p class="card-description">Access Vendor Manuals, Equipment Specs & Technical Docs</p>
  </a>
  <!-- Repeat for other 3 cards -->
</div>
```

#### JavaScript Logic
```javascript
function createCategoryCards() {
  const categoryList = document.querySelector(".category-list, .category-boxes");
  if (!categoryList) return;
  
  const cards = [
    {
      icon: "fa-book",
      title: "Knowledge Base",
      description: "Access Vendor Manuals, Equipment Specs & Technical Docs",
      url: "/c/knowledge-base",
      color: "var(--ame-core-blue)"
    },
    {
      icon: "fa-users",
      title: "Tech Community",
      description: "Connect, Ask Questions & Share Expertise",
      url: "/c/tech-community",
      color: "var(--ame-core-blue)"
    },
    {
      icon: "fa-wrench",
      title: "How-To & Troubleshooting",
      description: "Find Guides, Tutorials & Fixes",
      url: "/c/how-to",
      color: "var(--ame-core-blue)"
    },
    {
      icon: "fa-robot",
      title: "AI Assistant (AME-Bot)",
      description: "Get Instant Answers from AI",
      url: "/c/ai-assistant",
      color: "var(--cyber-teal)"
    }
  ];
  
  const cardsContainer = document.createElement("div");
  cardsContainer.className = "ame-category-cards";
  
  cards.forEach((card, index) => {
    const cardElement = document.createElement("a");
    cardElement.href = card.url;
    cardElement.className = "neo-glass-card";
    cardElement.style.animationDelay = `${index * 0.1}s`;
    
    cardElement.innerHTML = `
      <div class="card-icon" style="color: ${card.color}">
        <i class="fa ${card.icon}"></i>
      </div>
      <h3 class="card-title">${card.title}</h3>
      <p class="card-description">${card.description}</p>
    `;
    
    cardsContainer.appendChild(cardElement);
  });
  
  // Replace or hide default category listing
  categoryList.style.display = "none";
  categoryList.parentNode.insertBefore(cardsContainer, categoryList.nextSibling);
}
```

#### SCSS Styling
```scss
.ame-category-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 2rem 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.5rem 1rem;
  }
}

.neo-glass-card {
  position: relative;
  background: rgba(240, 244, 248, var(--glass-opacity, 0.15));
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  
  // Frosted glass effect
  @supports (backdrop-filter: blur(15px)) {
    backdrop-filter: blur(var(--glass-blur, 15px));
  }
  
  @supports not (backdrop-filter: blur(15px)) {
    background: rgba(240, 244, 248, 0.25);
  }
  
  // Gradient border
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 1px;
    background: linear-gradient(135deg, var(--ame-core-blue, #1E88E5), var(--cyber-teal, #00D9FF));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  // Box shadow for depth
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 217, 255, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  .card-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: var(--ame-core-blue, #1E88E5);
    
    i {
      display: block;
    }
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--ame-gray-dark, #2b2b2b);
    margin-bottom: 1rem;
  }
  
  .card-description {
    font-size: 1rem;
    color: var(--ame-gray-medium, #666666);
    line-height: 1.6;
    max-width: 300px;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    min-height: 200px;
    
    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .card-title {
      font-size: 1.25rem;
    }
    
    .card-description {
      font-size: 0.9rem;
    }
  }
}
```

## Data Models

### Settings Configuration (settings.yml)

```yaml
# Existing settings
enable_neo_glass_homepage:
  type: bool
  default: true
  description: "Enable Neo-Glassmorphism homepage with hero section and category cards"

hero_background_image:
  type: string
  default: "/Background-Lgin-Landing.png"
  description: "URL or path to the hero background image (futuristic cityscape recommended)"

hero_title:
  type: string
  default: "TRANSFERRING KNOWLEDGE TO BUILD OUR COLLECTIVE FUTURE"
  description: "Main hero section title"

hero_subtitle:
  type: string
  default: "Together We Know More"
  description: "Hero section subtitle/slogan (currently used for quote rotation)"

glass_opacity:
  type: float
  default: 0.15
  description: "Opacity for glassmorphic elements (0.1 - 0.3 recommended)"

glass_blur:
  type: integer
  default: 15
  description: "Blur amount in pixels for glassmorphic effect (10-20 recommended)"

# New settings
enable_quote_rotation:
  type: bool
  default: true
  description: "Enable automatic rotation of knowledge quotes in hero banner"

quote_rotation_interval:
  type: integer
  default: 8
  description: "Seconds between quote changes (5-15 recommended)"

enable_stackblur_background:
  type: bool
  default: true
  description: "Enable blurred background effect on homepage"

category_card_1_url:
  type: string
  default: "/c/knowledge-base"
  description: "URL for Knowledge Base category card"

category_card_2_url:
  type: string
  default: "/c/tech-community"
  description: "URL for Tech Community category card"

category_card_3_url:
  type: string
  default: "/c/how-to"
  description: "URL for How-To & Troubleshooting category card"

category_card_4_url:
  type: string
  default: "/c/ai-assistant"
  description: "URL for AI Assistant category card"

ame_core_blue:
  type: string
  default: "#1E88E5"
  description: "AME Core Blue color for icons and accents"

cyber_teal:
  type: string
  default: "#00D9FF"
  description: "Cyber Teal accent color for AI Assistant and hover effects"
```

### CSS Variables (head_tag.html)

```html
<style>
  :root {
    /* Background images */
    --hero-bg-image: url('<%= settings.hero_background_image %>');
    
    /* Glass effect variables */
    --glass-opacity: <%= settings.glass_opacity %>;
    --glass-blur: <%= settings.glass_blur %>px;
    
    /* Color variables */
    --ame-core-blue: <%= settings.ame_core_blue %>;
    --cyber-teal: <%= settings.cyber_teal %>;
    
    /* Existing AME colors */
    --ame-blue: #003d6b;
    --ame-gray-dark: #2b2b2b;
    --ame-gray-medium: #666666;
  }
</style>
```

## Error Handling

### DOM Element Not Found
```javascript
function createHeroBanner() {
  const categoryList = document.querySelector(".category-list, .category-boxes");
  if (!categoryList) {
    console.warn("AME Neo-Glass: Category list not found, skipping hero banner injection");
    return;
  }
  // ... rest of logic
}
```

### Duplicate Element Prevention
```javascript
function createBlurredBackground() {
  if (document.getElementById("ame-background-blur")) {
    console.log("AME Neo-Glass: Background already exists, skipping");
    return;
  }
  // ... rest of logic
}
```

### Settings Fallbacks
```javascript
const heroTitle = settings.hero_title || "TRANSFERRING KNOWLEDGE TO BUILD OUR COLLECTIVE FUTURE";
const rotationInterval = (settings.quote_rotation_interval || 8) * 1000;
```

### Browser Compatibility Fallbacks
```scss
// Backdrop filter fallback
@supports (backdrop-filter: blur(15px)) {
  backdrop-filter: blur(var(--glass-blur, 15px));
}

@supports not (backdrop-filter: blur(15px)) {
  background: rgba(240, 244, 248, 0.25);
}
```

## Testing Strategy

### Manual Testing Checklist

1. **Homepage Detection**
   - Navigate to `/`, `/categories`, `/latest`
   - Verify hero banner and category cards appear
   - Verify blurred background is visible

2. **Quote Rotation**
   - Wait 8 seconds (or configured interval)
   - Verify quote changes with fade animation
   - Verify all 4 quotes rotate in sequence

3. **Responsive Design**
   - Test on desktop (>1024px): 2x2 grid layout
   - Test on tablet (768-1024px): 2x2 grid with adjusted spacing
   - Test on mobile (<768px): vertical stack layout

4. **Category Card Interactions**
   - Hover over each card
   - Verify lift effect and border glow
   - Click card and verify navigation

5. **Browser Compatibility**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify glassmorphism effects render correctly
   - Verify fallbacks work in unsupported browsers

6. **Settings Configuration**
   - Change hero_background_image in admin settings
   - Change glass_opacity and glass_blur values
   - Change category card URLs
   - Verify changes apply without errors

7. **Accessibility**
   - Navigate with keyboard (Tab key)
   - Verify focus indicators on cards
   - Test with screen reader (NVDA/JAWS)
   - Verify ARIA labels are present

8. **Performance**
   - Run Lighthouse audit
   - Verify performance score >80
   - Check for layout shifts (CLS)
   - Verify image loading doesn't block render

### Automated Testing (Future Enhancement)

```javascript
// QUnit test example
test("Hero banner is injected on homepage", function(assert) {
  visit("/");
  andThen(function() {
    assert.ok(find(".ame-hero-banner").length > 0, "Hero banner exists");
    assert.ok(find(".hero-title").text().includes("TRANSFERRING KNOWLEDGE"), "Title is correct");
  });
});
```

## Implementation Notes

### Phase 1: Core Structure
1. Update settings.yml with new configuration options
2. Update head_tag.html with CSS variables
3. Modify ame-neoglass.js initializer to add hero banner and background

### Phase 2: Styling
1. Add hero banner SCSS to common.scss
2. Add stackblur background SCSS
3. Add Neo-Glass card SCSS with responsive breakpoints

### Phase 3: Category Cards
1. Implement createCategoryCards() function
2. Add card data configuration
3. Wire up navigation URLs from settings

### Phase 4: Polish & Testing
1. Add animations and transitions
2. Test across browsers and devices
3. Optimize performance
4. Add accessibility features

### Deployment Considerations
- Theme component can be updated via Git repository
- Settings changes require theme refresh (automatic in Discourse)
- No database migrations required
- Compatible with Discourse 3.0.0+
