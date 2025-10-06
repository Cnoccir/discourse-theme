# AME Neo-Glass Theme Component

**Version:** 1.0.0
**Author:** AME Service Group
**Compatibility:** Discourse 3.0+
**Base Theme:** Discourse Horizon Theme

## Overview

The AME Neo-Glass Theme Component is a cutting-edge, Neo-Glassmorphism design system for the AME-TechAssist knowledge-sharing platform. This theme component is specifically designed to layer on top of the Discourse Horizon theme, transforming your technical forum into a futuristic, visually stunning platform.

### Key Features

✨ **Neo-Glassmorphism Design** - Frosted glass effects with depth and transparency
🎨 **AME Brand Colors** - Deep blue, cyber teal, and amber accent palette
🏙️ **Dynamic Backgrounds** - Futuristic architectural imagery for homepage and login
💬 **Rotating Inspiration Quotes** - Automated knowledge-sharing quotes
📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
🎯 **Custom Category Cards** - Beautiful glassmorphic cards with custom icons
🔐 **Styled Login Experience** - Branded authentication pages
⚡ **Performance Optimized** - Reduced effects on mobile for better performance

---

## Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| AME Core Blue | `#00508C` | Primary brand color, links, headers |
| AME Core Blue Dark | `#003d6b` | Hover states, depth |
| Cyber Teal | `#00BFFF` | Accent color, buttons, highlights |
| Cyber Teal Light | `#00E5FF` | Glows, effects, inspiration quotes |
| Amber | `#FFBF00` | Subtle accents, badges (minimal use) |
| Dark Gray | `#2C3E50` | Text, primary UI elements |
| Glass Base | `#F0F4F8` | Background for glass elements |

---

## Installation

### Prerequisites

1. **Discourse Horizon Theme** must be installed first
2. Admin access to your Discourse instance
3. Background images placed in `/public/` directory:
   - `Background-Lgin-Landing.png` (provided)

### Steps

1. **Upload Theme Component**
   - Go to Admin → Customize → Themes
   - Click "Install" → "From a Git Repository"
   - Paste repository URL or upload ZIP

2. **Add to Horizon Theme**
   - Select your Horizon theme
   - Click "Add component"
   - Select "AME Neo-Glass Theme Component"

3. **Configure Settings**
   - Navigate to theme settings
   - Adjust background images, text, and effects as needed

4. **Apply Changes**
   - Click "Save" and refresh your site

---

## Configuration

### Available Settings

#### Homepage Settings

- **`enable_neo_glass_homepage`** (boolean, default: `true`)
  Enable the Neo-Glassmorphism homepage design with hero section and category cards.

- **`hero_title`** (string, default: `"TRANSFERRING KNOWLEDGE TO BUILD OUR COLLECTIVE FUTURE"`)
  Main hero section title text.

- **`hero_subtitle`** (string, default: `"Together We Know More"`)
  Hero section subtitle/slogan.

- **`hero_background_image`** (string, default: `"/Background-Lgin-Landing.png"`)
  URL or path to the homepage hero background image.

#### Login Page Settings

- **`login_background_image`** (string, default: `"/Background-Lgin-Landing.png"`)
  URL or path to the login page background image.

#### Inspiration Block Settings

- **`enable_inspiration_block`** (boolean, default: `true`)
  Enable the rotating inspiration quotes block on the homepage.

#### Visual Effect Settings

- **`glass_opacity`** (float, default: `0.15`, range: `0.1 - 0.3`)
  Opacity level for glassmorphic card backgrounds.

- **`glass_blur`** (integer, default: `15`, range: `10-20`)
  Blur amount in pixels for the frosted glass effect.

---

## Customization

### Changing Category Icons

To customize the Font Awesome icons for each category card, edit the CSS in `common/common.scss`:

```scss
/* Knowledge Base Card */
.category-box:nth-child(1) .badge-category::before {
  font-family: "Font Awesome 5 Free";
  content: "\f02d"; /* book icon */
  font-weight: 900;
}
```

### Modifying Inspiration Quotes

Edit the quotes array in `javascripts/discourse/initializers/ame-neoglass.js`:

```javascript
const inspirationQuotes = [
  "Your custom quote here",
  "Another inspirational message",
  // Add more quotes...
];
```

### Adjusting Colors

Override color variables in your theme's CSS:

```scss
:root {
  --ame-core-blue: #YourColor;
  --ame-cyber-teal: #YourColor;
  // etc...
}
```

---

## File Structure

```
ame-neoglass-component/
├── about.json                          # Theme metadata
├── settings.yml                        # Theme settings
├── README.md                           # This file
├── common/
│   ├── common.scss                     # Main stylesheet
│   └── head_tag.html                   # HTML head injections
├── desktop/
│   └── desktop.scss                    # Desktop-specific styles
├── mobile/
│   └── mobile.scss                     # Mobile-specific styles
├── javascripts/
│   └── discourse/
│       └── initializers/
│           └── ame-neoglass.js         # JavaScript functionality
└── locales/
    └── en.yml                          # English translations
```

---

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile Safari (iOS 14+) ✅
- Chrome Mobile ✅

**Note:** Backdrop filter effects require modern browser support. Fallbacks are provided for older browsers.

---

## Performance Considerations

- **Mobile Optimization:** Reduced blur effects and disabled animations on mobile devices
- **Fixed Backgrounds:** Changed to scrolling backgrounds on mobile for better performance
- **Lazy Loading:** Category cards animate in with staggered delays
- **GPU Acceleration:** Transform and opacity animations use hardware acceleration

---

## Troubleshooting

### Glass Effects Not Showing

1. Ensure your browser supports `backdrop-filter`
2. Check that background images are loading correctly
3. Verify Horizon theme is the base theme

### Background Images Not Loading

1. Confirm images are in `/public/` directory
2. Check file paths in theme settings
3. Verify image file names match settings

### Quotes Not Rotating

1. Check browser console for JavaScript errors
2. Ensure `enable_inspiration_block` setting is `true`
3. Verify JavaScript initializer is loading

### Mobile Display Issues

1. Clear browser cache
2. Test in incognito/private mode
3. Check responsive design settings in browser DevTools

---

## Support & Updates

For issues, feature requests, or contributions:

- **Internal Support:** Contact AME Service Group Development Team
- **Documentation:** See Discourse Meta for theme component best practices

---

## Changelog

### Version 1.0.0 (Initial Release)
- Neo-Glassmorphism design system
- Custom homepage with hero section
- Glassmorphic category cards
- Styled login and authentication pages
- Rotating inspiration quotes
- Full responsive design
- Desktop and mobile optimizations
- AME brand color integration

---

## License

Proprietary - AME Service Group
For use on AME-TechAssist platform only.

---

## Credits

**Design:** AME Service Group Design Team
**Development:** AME Service Group Development Team
**Base Theme:** Discourse Horizon by Discourse Team
**Background Images:** Licensed architectural photography

---

**Built with ❤️ for the AME technical community**

*"Together We Know More"*
