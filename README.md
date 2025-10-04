# AME TechAssist - Discourse Theme Component

**Dark, modern theme component for AME TechAssist building automation community**

## 🎨 Features

- Dark purple/blue gradient design
- Professional hero section with search
- Mobile responsive
- Safe component architecture (won't break on Mint theme updates)
- Tech-focused aesthetic

## 📦 Installation

### Step 1: Install Mint Theme (if not already installed)

1. Go to: `www.ame-techassist.com/admin/customize/themes`
2. Click **Install** → **From a Git repository**
3. Enter: `https://github.com/discourse/discourse-mint-theme`
4. Click **Install**

### Step 2: Install This Component

1. In Admin > Customize > Themes
2. Click **Install** → **From a Git repository**
3. Enter: `https://github.com/YOUR-USERNAME/ame-techassist-discourse-theme`
4. ✅ **Check "This is a component"**
5. Click **Install**

### Step 3: Add to Mint Theme

1. Click on **Mint Theme**
2. Go to **Components** tab
3. Click **Add component**
4. Select **AME TechAssist Theme**
5. Click **Save**

### Step 4: Activate Color Scheme

1. Still in Mint Theme settings
2. Click **Colors** tab
3. Select **AME Dark**
4. Click **Save**

## 🎯 What's Included

- **Dark color scheme** - Purple (#7c3aed) and blue (#3b82f6) accents
- **Hero landing section** - Search bar and CTAs
- **Category styling** - Modern card design with gradients
- **Mobile optimization** - Responsive design
- **Custom scrollbars** - Branded purple/blue gradients

## 🔧 Customization

### Change Accent Color

Edit `common/common.scss`:

```scss
:root {
  --ame-purple: #YOUR_COLOR;
}
```

### Hide Hero Section

Component Settings → Toggle "Show hero on homepage" OFF

### Modify Hero Text

Edit `common/header.html` - change text in `<h1>` and `<p>` tags

## 📁 File Structure

```
ame-techassist-theme/
├── about.json              # Theme metadata
├── settings.yml            # Component settings
├── common/
│   ├── common.scss        # Shared styles
│   └── header.html        # Hero section
├── desktop/
│   └── desktop.scss       # Desktop-specific
└── mobile/
    └── mobile.scss        # Mobile-specific
```

## 🔄 Updates

**If installed from GitHub:**
- Admin > Themes > AME TechAssist > Click "Check for Updates"
- Auto-updates when you push to this repository

**If uploaded as ZIP:**
- Re-upload new version to update

## 🎨 Color Palette

```
Dark Backgrounds:
- Primary: #1a1d2e
- Secondary: #16213e
- Tertiary: #0f1419

Accent Colors:
- Purple: #7c3aed
- Blue: #3b82f6
- Cyan: #06b6d4
- Green: #10b981 (success)
- Orange: #f59e0b (warning)

Text:
- Primary: #f8fafc
- Secondary: #cbd5e1
- Muted: #94a3b8
```

## 🆘 Troubleshooting

**Hero not showing?**
- Clear browser cache (Ctrl+Shift+R)
- Check component is added to Mint theme
- Verify "Show hero on homepage" setting is ON

**Dark theme not applying?**
- Check "AME Dark" color scheme is selected
- Verify component is active
- Clear Discourse cache: Admin > Dashboard > Clear cache

**Styles broken on mobile?**
- Test on actual device, not just browser emulation
- Clear mobile browser cache

## 📄 License

MIT License - Copyright (c) 2025 AME Service Group

## 🔗 Related Documentation

- Full Setup Guide: See `AME-TechAssist-Complete-Setup-Guide.md`
- Category Setup: See `AME-Category-Setup-Script.md`
- Installation Guide: See `INSTALL-THEME-COMPONENT.md`

## 💬 Support

For issues or questions about this theme component, contact your AME Discourse administrator.
