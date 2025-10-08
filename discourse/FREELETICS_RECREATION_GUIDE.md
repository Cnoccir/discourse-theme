# Freeletics Forum - Complete Theme Recreation Guide

## Base Theme Discovery

**BASE THEME:** Default Discourse Dark Theme (they're NOT using a pre-made theme component like Horizon or Graceful)

**KEY FINDING:** Freeletics built their own custom theme component (Theme ID 11) on top of the default dark Discourse theme.

---

## 🎨 Background Image

**Primary Background:**
```
URL: https://europe1.discourse-cdn.com/flex013/uploads/freeletics/original/1X/6a04f79423545d981d07bfa3a285ab1a9a6cf794.jpeg
Type: JPEG image
Usage: Full-screen fixed background
```

**CSS Implementation:**
```css
html {
  background-color: #222;
  background-image: url("YOUR_BACKGROUND_URL");
  background-size: cover;
  background-attachment: fixed;
  background-position: center top;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing:grayscale;
}
```

**For Your Site:** Replace with `/Background-Lgin-Landing.png` from your public folder

---

## 🔤 Typography System

### Fonts Used
1. **AktivGrotesk** (Primary font)
   - Regular (400): `aktivgrotesk-rg.woff2`
   - Medium (500): `aktivgrotesk-md.woff2`
   - Bold (700): `aktivgrotesk-bd.woff2`

2. **Aktiv Grotesk Ex** (Extended - for headings)
   - Regular: `AktivGroteskEx_Rg.woff2`

### Font Loading
```css
@font-face {
  font-family: "AktivGrotesk";
  src: url("https://assets.freeletics.net/packages/web-package-styles/fonts/aktivgrotesk-rg.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: "AktivGrotesk";
  src: url("https://assets.freeletics.net/packages/web-package-styles/fonts/aktivgrotesk-md.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: "AktivGrotesk";
  src: url("https://assets.freeletics.net/packages/web-package-styles/fonts/aktivgrotesk-bd.woff2") format("woff2");
  font-weight: bold;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: "Aktiv Grotesk Ex";
  src: url("https://assets.freeletics.net/packages/web-package-styles/fonts/AktivGroteskEx_Rg.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-family: "AktivGrotesk", Arial, sans-serif;
  --heading-font-family: var(--font-family);
}

h1, h2, h3 {
  font-family: "Aktiv Grotesk Ex";
}
```

---

## 🎨 Color Scheme (from color_definitions file)

### Primary Colors
```css
:root {
  /* Dark theme base */
  --primary: #ECEFF1;              /* Light text */
  --secondary: #263238;            /* Dark background */
  --tertiary: #0277BD;             /* Blue links/accents */
  --quaternary: #0277BD;           /* Same as tertiary */
  
  /* Header */
  --header_background: #263238;    /* Dark header */
  --header_primary: #ECEFF1;       /* Light header text */
  
  /* Accents */
  --highlight: #FFB36B;            /* Orange */
  --danger: #FF3333;               /* Red */
  --success: #00A1A1;              /* Teal */
  --love: #FF3333;                 /* Red hearts */
  
  /* States */
  --d-selected: #293137;
  --d-hover: #2d363d;
}
```

---

## 🏗️ Main Layout Modifications

### 1. Glassmorphism Effect

**Main Content Area:**
```css
#main-outlet {
  flex: 1;
  box-sizing: border-box;
  background: rgba(22, 30, 33, 0.6);  /* Semi-transparent dark */
  backdrop-filter: blur(10px);         /* Glass blur effect */
  -webkit-backdrop-filter: blur(10px);
  padding-left: 16px;
  padding-right: 16px;
  margin: 32px auto;
  border-radius: 4px;
}
```

**Sidebar:**
```css
.sidebar-wrapper {
  background-color: rgba(22, 30, 33, 0.6);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
```

### 2. Header Customizations

```css
.d-header {
  height: 48px;
  box-shadow: none;
}

.d-header #site-logo {
  height: 31px;
  margin-left: 8px;
}

.d-header .title a {
  position: relative;
  margin-top: -1px;
}

/* "Forum" label after logo */
.d-header .title a::after {
  content: "Forum";
  position: absolute;
  left: calc(100% + 9px);
  top: 8px;
  font-size: 18px;
  line-height: 1;
  font-weight: 500;
  white-space: nowrap;
  border-left: 1px solid hsla(0, 0%, 100%, 0.8);
  padding-left: 8px;
}

.d-header .extra-info-wrapper {
  position: relative;
  z-index: 10;
  background-color: var(--header_background);
}

.d-header-icons .icon {
  font-size: 12px;
}
```

### 3. Button Styling

```css
.btn {
  border-radius: 3px;
}

.btn.btn-primary,
.btn.btn-danger {
  color: #fff;
  font-weight: 500;
}

.btn.btn-primary .d-icon,
.btn.btn-danger .d-icon {
  color: inherit;
}

.btn.btn-primary:hover {
  color: #fff;
  background-color: #1d6df3;  /* Lighter blue on hover */
}

.btn.btn-primary:hover .d-icon {
  color: inherit;
}
```

### 4. Navigation Pills

```css
.nav-pills > li a {
  border-radius: 3px;
}

.nav-pills > li a:hover {
  color: #fff;
  background-color: rgba(29, 109, 243, 0.4);
}

.nav-pills > li a.active {
  color: #fff;
}
```

### 5. Footer Custom Styling

```css
#footer {
  background-color: #161616;
}

#footer * {
  box-sizing: border-box;
}

#footer ul {
  display: flex;
  align-items: center;
  width: max-content;
  list-style: none;
  margin: 0 auto;
  padding: 0;
}

#footer .footer-inner {
  max-width: 1110px;
  margin: 0 auto;
  padding: 19px 8px;
}

@media (min-width: 600px) {
  #footer .footer-inner {
    display: flex;
    justify-content: space-between;
  }
  #footer .footer-inner ul {
    margin: 0;
  }
}

#footer .footer-legal > li {
  padding: 0 8px;
}

#footer .footer-legal > li:not(:first-child) {
  border-left: 1px solid #8d8d8d;
}

#footer .footer-legal a {
  display: block;
  font-size: 14px;
  color: silver;
}

#footer .footer-social > li {
  margin: 0 4px;
}

#footer .footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

#footer .footer-social svg {
  height: 18px;
  width: 18px;
  fill: #fff;
}
```

### 6. Banner/Featured Topics

```css
#main .banner-box {
  background-size: contain;
  height: 120px;
}

#main .featured-topic-wrapper h2 {
  display: inline-block;
  border: 0;
  background-color: #fff;
  color: #161616;
  padding: 7px 32px;
  line-height: 1;
  border-radius: 6px;
  margin-bottom: 24px;
}
```

### 7. System Avatar Fix

```css
img.avatar[title=system] {
  border-radius: 0;  /* Square avatar for system user */
}
```

---

## 📦 Theme Components Used

Based on the CSS files collected:

1. **Theme 3** - Featured Topics component
2. **Theme 6, 8, 9, 10, 11, 12** - Various customizations
3. **Theme 10** - GIF picker component
4. **Theme 11** - **MAIN CUSTOM THEME** (all the styles above)
5. **Theme 12** - Right sidebar component

### Plugins Detected:
- discourse-policy
- discourse-gamification
- discourse-solved
- discourse-reactions
- discourse-topic-voting
- discourse-ai
- discourse-chat-integration
- discourse-local-dates
- discourse-lazy-videos
- Poll (native)
- Chat (native)

---

## 🛠️ Recreation Steps for AME

### Step 1: Set Up Base Theme
1. Go to **Admin** → **Customize** → **Themes**
2. Select **Dark** or create new theme
3. Apply the color scheme from above

### Step 2: Upload Your Background
1. Upload `Background-Lgin-Landing.png` to Discourse
2. Get the upload URL (e.g., `/uploads/default/original/1X/your-image.png`)

### Step 3: Create Custom Theme Component

Create file: `common/common.scss`

```scss
/* ========================================
   AME TechAssist - Freeletics-Inspired Theme
   Based on Freeletics Forum Analysis
   ======================================== */

/* Background with your image */
html {
  background-color: #222;
  background-image: url("/uploads/default/original/1X/Background-Lgin-Landing.png");
  background-size: cover;
  background-attachment: fixed;
  background-position: center top;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typography - Using Inter as Aktiv Grotesk alternative */
:root {
  --font-family: "Inter", Arial, sans-serif;
  --heading-font-family: var(--font-family);
}

/* Glassmorphism - Main Content */
#main-outlet {
  flex: 1;
  box-sizing: border-box;
  background: rgba(22, 30, 33, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding-left: 16px;
  padding-right: 16px;
  margin: 32px auto;
  border-radius: 4px;
}

/* Glassmorphism - Sidebar */
.sidebar-wrapper {
  background-color: rgba(22, 30, 33, 0.6);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

/* Header */
.d-header {
  height: 48px;
  box-shadow: none;
}

.d-header #site-logo {
  height: 31px;
  margin-left: 8px;
}

/* Add "Forum" or "TechAssist" label after logo */
.d-header .title a::after {
  content: "TechAssist";  /* Change to your label */
  position: absolute;
  left: calc(100% + 9px);
  top: 8px;
  font-size: 18px;
  line-height: 1;
  font-weight: 500;
  white-space: nowrap;
  border-left: 1px solid hsla(0, 0%, 100%, 0.8);
  padding-left: 8px;
}

/* Buttons */
.btn {
  border-radius: 3px;
}

.btn.btn-primary {
  color: #fff;
  font-weight: 500;
  background-color: #003d6b;  /* AME Blue */
}

.btn.btn-primary:hover {
  background-color: #0078d4;  /* AME Accent Blue */
}

/* Navigation */
.nav-pills > li a {
  border-radius: 3px;
}

.nav-pills > li a:hover {
  color: #fff;
  background-color: rgba(0, 61, 107, 0.4);  /* AME Blue with opacity */
}

/* Footer */
#footer {
  background-color: #161616;
}

#footer .footer-inner {
  max-width: 1110px;
  margin: 0 auto;
  padding: 19px 8px;
}
```

### Step 4: Add Freeletics Shadows

Add to your `common/common.scss`:

```scss
/* Freeletics-inspired shadows */
:root {
  --shadow-card: 0 4px 14px rgba(0, 0, 0, 0.5);
  --shadow-card-hover: 0 12px 40px rgba(0, 61, 107, 0.15);
  --shadow-modal: 0 8px 60px rgba(0, 0, 0, 1);
  --shadow-dropdown: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
}
```

### Step 5: Configure Color Scheme

In **Theme Settings** → **Colors**:
- Primary: `ECEFF1`
- Secondary: `263238`
- Tertiary: `003d6b` (AME Blue - replacing Freeletics blue)
- Quaternary: `0078d4` (AME Accent)
- Header Background: `263238`
- Header Primary: `ECEFF1`
- Highlight: `FFB36B`
- Danger: `FF3333`
- Success: `00A1A1`

---

## 📝 Key Differences for Your Implementation

1. **Replace Freeletics Blue** (`#0277BD`) with **AME Blue** (`#003d6b`)
2. **Use your background image** instead of theirs
3. **Change "Forum" label** to "TechAssist" or remove it
4. **Use AME logo** instead of Freeletics logo
5. **Keep the glassmorphism effect** - it's their signature look
6. **Use Inter font** (free) instead of Aktiv Grotesk (paid)

---

## 🎯 Summary: What Makes Freeletics Theme Unique

1. **Full-screen background image** with fixed attachment
2. **Glassmorphism** (frosted glass effect) on main content and sidebar
3. **Dark theme** with light text (#ECEFF1 on #263238)
4. **Aktiv Grotesk font** (custom, professional)
5. **Custom header** with "Forum" label
6. **Subtle rounded corners** (3-4px) everywhere
7. **Featured topics component** with image cards
8. **Custom footer** with flex layout
9. **Backdrop blur** for modern depth
10. **Minimal shadows** but strategic placement

---

## ✅ Quick Checklist for AME Recreation

- [ ] Upload Background-Lgin-Landing.png to Discourse
- [ ] Create new theme component "AME Freeletics Style"
- [ ] Apply dark color scheme with AME blues
- [ ] Add glassmorphism CSS to common.scss
- [ ] Configure Inter font in head_tag.html
- [ ] Add custom header label
- [ ] Style buttons with AME colors
- [ ] Add backdrop blur to main-outlet and sidebar
- [ ] Test on mobile, tablet, desktop
- [ ] Commit to git repo

---

**Generated from Freeletics Forum Analysis**
**Date:** October 7, 2025
**Data Source:** `data/freeletics/` CSS collection
