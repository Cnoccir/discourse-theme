# AME Neo-Glass Theme Component - Complete Installation Guide

This guide will walk you through the complete process of installing and configuring the AME Neo-Glass Theme Component on your Discourse instance.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Install Horizon Base Theme](#step-1-install-horizon-base-theme)
3. [Step 2: Prepare Background Images](#step-2-prepare-background-images)
4. [Step 3: Install AME Neo-Glass Component](#step-3-install-ame-neo-glass-component)
5. [Step 4: Configure Theme Settings](#step-4-configure-theme-settings)
6. [Step 5: Customize Categories](#step-5-customize-categories)
7. [Step 6: Test and Verify](#step-6-test-and-verify)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ Admin access to your Discourse instance
- ✅ Discourse version 3.0 or higher
- ✅ Background images ready (provided: `Background-Lgin-Landing.png`)
- ✅ Basic understanding of Discourse theme administration

---

## Step 1: Install Horizon Base Theme

The AME Neo-Glass component is designed to layer on top of the Discourse Horizon theme.

### Option A: Install from Git Repository

1. Navigate to **Admin Panel** → **Customize** → **Themes**
2. Click **"Install"**
3. Select **"From a Git Repository"**
4. Enter the Horizon theme repository URL:
   ```
   https://github.com/discourse/discourse-theme-horizon
   ```
5. Click **"Install"**
6. Wait for installation to complete
7. Click **"Set as default"** (or add to your existing theme)

### Option B: Install from Theme Directory

1. Navigate to **Admin Panel** → **Customize** → **Themes**
2. Click **"Install"**
3. Select **"Popular"** tab
4. Find **"Horizon"** and click **"Install"**
5. Click **"Set as default"**

---

## Step 2: Prepare Background Images

### Upload Background Image

1. Navigate to **Admin Panel** → **Customize** → **Themes**
2. Select your **Horizon** theme
3. Go to **"Uploads"** tab
4. Upload `Background-Lgin-Landing.png`
5. Copy the generated URL (it will look like `/uploads/default/original/1X/abc123.png`)

**Alternative:** Place the image directly in your Discourse `/public/` directory:
```bash
# On your server
cp Background-Lgin-Landing.png /path/to/discourse/public/
```

The image will then be accessible at `/Background-Lgin-Landing.png`

---

## Step 3: Install AME Neo-Glass Component

### Method 1: From Local Files

1. Navigate to **Admin Panel** → **Customize** → **Themes**
2. Click **"Install"**
3. Select **"Create New"**
4. Check **"Component"** (not "Theme")
5. Name it: `AME Neo-Glass Theme Component`
6. Click **"Create"**

Now, manually add each file:

#### Upload CSS Files

1. Go to **"Common"** tab
2. Click **"CSS"**
3. Copy and paste contents from `common/common.scss`
4. Click **"Save"**

5. Go to **"Desktop"** tab
6. Click **"CSS"**
7. Copy and paste contents from `desktop/desktop.scss`
8. Click **"Save"**

9. Go to **"Mobile"** tab
10. Click **"CSS"**
11. Copy and paste contents from `mobile/mobile.scss`
12. Click **"Save"**

#### Upload JavaScript

1. Go to **"Common"** tab
2. Click **"</> (JavaScript)"**
3. Copy and paste contents from `javascripts/discourse/initializers/ame-neoglass.js`
4. Click **"Save"**

#### Upload HTML Header

1. Go to **"Common"** tab
2. Click **"</head>"**
3. Copy and paste contents from `common/head_tag.html`
4. Click **"Save"**

#### Add Settings

1. Click **"Edit CSS/HTML"** → **"Settings"**
2. Copy and paste contents from `settings.yml`
3. Click **"Save"**

### Method 2: From Git Repository (Recommended)

1. Create a Git repository for your theme component
2. Push all files to the repository
3. Navigate to **Admin Panel** → **Customize** → **Themes**
4. Click **"Install"** → **"From a Git Repository"**
5. Enter your repository URL
6. Check **"This is a component"**
7. Click **"Install"**

---

## Step 4: Configure Theme Settings

### Add Component to Horizon Theme

1. Navigate to **Admin Panel** → **Customize** → **Themes**
2. Select your **Horizon** theme
3. Click **"Components"**
4. Click **"Add component"**
5. Select **"AME Neo-Glass Theme Component"**
6. Click **"Save"**

### Configure Component Settings

1. While viewing the Horizon theme, find the **"AME Neo-Glass Theme Component"** in the components list
2. Click the ⚙️ (settings) icon next to it
3. Configure the following settings:

#### Required Settings

| Setting | Value | Description |
|---------|-------|-------------|
| `enable_neo_glass_homepage` | ✅ true | Enable the Neo-Glass homepage |
| `hero_background_image` | `/Background-Lgin-Landing.png` | Path to your background image |
| `login_background_image` | `/Background-Lgin-Landing.png` | Path to login background |
| `enable_inspiration_block` | ✅ true | Enable rotating quotes |

#### Optional Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `hero_title` | "TRANSFERRING KNOWLEDGE..." | Main hero text |
| `hero_subtitle` | "Together We Know More" | Subtitle text |
| `glass_opacity` | 0.15 | Glass transparency (0.1-0.3) |
| `glass_blur` | 15 | Blur intensity in pixels (10-20) |

4. Click **"Save"**

---

## Step 5: Customize Categories

### Set Up Category Names and Descriptions

To match the theme's design concepts, create or rename your categories:

1. Navigate to **Admin Panel** → **Categories**

2. **Category 1: Knowledge Base**
   - Name: `Knowledge Base`
   - Description: `Access Vendor Manuals, Equipment Specs & Technical Docs`
   - Color: `#00508C` (AME Core Blue)

3. **Category 2: Tech Community**
   - Name: `Tech Community`
   - Description: `Connect, Ask Questions & Share Expertise`
   - Color: `#00508C` (AME Core Blue)

4. **Category 3: How-To & Troubleshooting**
   - Name: `How-To & Troubleshooting`
   - Description: `Find Guides, Tutorials & Fixes`
   - Color: `#00508C` (AME Core Blue)

5. **Category 4: AI Assistant (AME-Bot)**
   - Name: `AI Assistant (AME-Bot)`
   - Description: `Get Instant Answers from AI`
   - Color: `#00BFFF` (Cyber Teal)

### Optional: Add Category Icons

In each category's settings:
1. Click **"Settings"** tab
2. Enable **"Show category logo"**
3. Upload an icon or use Font Awesome icon code

---

## Step 6: Test and Verify

### Verification Checklist

✅ **Homepage:**
- [ ] Background image loads correctly
- [ ] Dark overlay is visible
- [ ] Hero title displays: "TRANSFERRING KNOWLEDGE TO BUILD OUR COLLECTIVE FUTURE"
- [ ] Hero subtitle displays: "Together We Know More"
- [ ] Category cards have glassmorphic effect
- [ ] Category cards have gradient borders
- [ ] Hover effects work (cards lift and glow)
- [ ] Inspiration quote block appears below categories
- [ ] Quotes rotate every 8 seconds

✅ **Login Page:**
- [ ] Background image loads
- [ ] Login form has glassmorphic card effect
- [ ] Input fields are styled correctly
- [ ] Buttons use AME branding colors
- [ ] Login form is readable on background

✅ **Site-Wide:**
- [ ] Header has semi-transparent background
- [ ] Primary buttons are Cyber Teal (#00BFFF)
- [ ] Links are AME Core Blue (#00508C)
- [ ] Hover effects use Cyber Teal
- [ ] Topic lists show hover effects

✅ **Mobile:**
- [ ] Categories stack vertically
- [ ] Text is readable
- [ ] Touch interactions work
- [ ] Performance is acceptable
- [ ] Login form is usable

### Test Browsers

Test in the following browsers:
- ✅ Chrome (desktop)
- ✅ Firefox (desktop)
- ✅ Safari (desktop)
- ✅ Safari (iOS)
- ✅ Chrome (Android)

---

## Troubleshooting

### Issue: Background Images Not Showing

**Symptoms:** White/gray background instead of architectural image

**Solutions:**
1. Check image path in theme settings
2. Verify image exists in `/public/` directory or uploads
3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
4. Check browser console for 404 errors
5. Try using the full URL path instead of relative path

### Issue: Glass Effect Not Visible

**Symptoms:** Cards appear solid, no transparency or blur

**Solutions:**
1. Verify browser supports `backdrop-filter` (use caniuse.com)
2. Check if hardware acceleration is enabled in browser
3. Test in a different browser
4. Check CSS is properly loaded (view page source)

### Issue: Hero Text Not Appearing

**Symptoms:** No title or subtitle on homepage

**Solutions:**
1. Check JavaScript console for errors
2. Verify JavaScript file is loaded (Network tab in DevTools)
3. Ensure `enable_neo_glass_homepage` setting is true
4. Clear site cache (Admin → Customize → Clear Cache)

### Issue: Quotes Not Rotating

**Symptoms:** Inspiration block stuck on one quote

**Solutions:**
1. Check JavaScript console for errors
2. Verify `enable_inspiration_block` setting is true
3. Clear browser cache
4. Check if JavaScript is properly initialized

### Issue: Mobile Performance Problems

**Symptoms:** Slow scrolling, lag on mobile devices

**Solutions:**
1. Reduce `glass_blur` setting (try 10 instead of 15)
2. Reduce `glass_opacity` setting
3. Test on different mobile device
4. Check mobile network connection
5. Mobile styles should automatically reduce effects

### Issue: Colors Don't Match Design

**Symptoms:** Wrong colors throughout site

**Solutions:**
1. Check color scheme is set to "AME Neo-Glass" (in about.json)
2. Verify CSS variables in common.scss
3. Check for conflicting theme components
4. Clear site CSS cache

### Getting Help

If issues persist:

1. **Check Browser Console**
   - Press F12
   - Go to "Console" tab
   - Look for red error messages
   - Screenshot and report errors

2. **Check Network Tab**
   - Press F12
   - Go to "Network" tab
   - Reload page
   - Look for failed requests (red text)

3. **Discourse Meta**
   - Search for similar issues
   - Post in "support" category with details

4. **Contact AME Support**
   - Provide screenshots
   - Include browser/device info
   - Describe steps to reproduce

---

## Post-Installation

### Recommended Next Steps

1. **Create Welcome Topic**
   - Introduce the new design to users
   - Highlight key features

2. **Monitor Performance**
   - Check load times
   - Monitor mobile experience
   - Gather user feedback

3. **Customize Further**
   - Adjust colors if needed
   - Modify inspiration quotes
   - Update category descriptions

4. **Set Up Backups**
   - Export theme regularly
   - Keep backup of customizations

5. **Document Changes**
   - Keep notes of customizations
   - Track settings changes

---

## Maintenance

### Regular Updates

- Check for Horizon theme updates monthly
- Test theme after Discourse updates
- Update background images seasonally (optional)
- Refresh inspiration quotes periodically

### Performance Monitoring

- Monitor page load times
- Check mobile performance metrics
- Review user feedback
- Adjust blur/opacity if needed

---

## Support Resources

- **Discourse Meta:** https://meta.discourse.org
- **Horizon Theme:** https://github.com/discourse/discourse-theme-horizon
- **Discourse Theming Guide:** https://meta.discourse.org/t/developer-s-guide-to-discourse-themes/93648

---

**Installation Complete! 🎉**

Your AME-TechAssist site should now feature the stunning Neo-Glassmorphism design.

*"Together We Know More"*
