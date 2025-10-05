# AME TechAssist - Discourse Theme Component

**Clean, modern theme component for AME TechAssist building automation community**

## 🎨 Features

- ✨ **Clean Modern Design** - No excessive glow effects or gradients
- 💬 **Knowledge Quote Banner** - Rotating inspirational quotes about knowledge sharing
- 🎨 **3 Color Schemes** - AME Dark, AME Light, AME Professional
- 🔍 **Professional Hero Section** - Eye-catching homepage with search functionality
- 📱 **Mobile Responsive** - Optimized for all devices
- 🛡️ **Safe Component Architecture** - Won't break on Mint theme updates
- 🎯 **Tech-Focused Aesthetic** - Perfect for building automation community

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

- **3 Color Schemes** - AME Dark (default), AME Light, AME Professional
- **Knowledge Quote Banner** - Rotating quotes that inspire knowledge sharing
- **Hero Landing Section** - Search bar and CTAs on homepage
- **Clean Category Styling** - Modern card design with subtle accents
- **Mobile Optimization** - Fully responsive design
- **Custom Scrollbars** - Branded purple scrollbars (no glow)
- **Professional Typography** - Clean, readable fonts
- **Streamlined Navigation** - Easy-to-use category structure

## 🔧 Customization

### Change Accent Color

Edit `common/common.scss`:

```scss
:root {
  --ame-purple: #7c3aed;  // Your primary brand color
  --ame-blue: #3b82f6;    // Your secondary accent color
}
```

### Customize Knowledge Quotes

Edit `common/header.html` around line 5:

```javascript
const knowledgeQuotes = [
  "Put knowledge where people trip over it.",
  "Add your own custom quotes here.",
];
```

### Change Quote Rotation Speed

Edit `common/header.html` (default is 8000ms = 8 seconds):

```javascript
setInterval(() => {
  // ...
}, 8000); // Change this number
```

### Hide Hero Section

Edit `common/header.html` and comment out lines 47-102

### Modify Hero Text

Edit `common/header.html` - change text in the hero section HTML

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

## 🎨 Color Palettes

### AME Dark (Default)
```
Backgrounds:
- Primary: #0f1419 (Very dark blue-gray)
- Secondary: #1a1d2e (Dark blue-gray)
- Tertiary: #16213e (Medium dark blue)

Accents:
- Purple: #7c3aed
- Blue: #3b82f6
- Cyan: #06b6d4
- Success: #10b981
- Warning: #f59e0b
- Danger: #ef4444

Text:
- Primary: #f8fafc (Almost white)
- Secondary: #cbd5e1 (Light gray)
- Muted: #94a3b8 (Medium gray)
```

### AME Light
```
Backgrounds:
- Primary: #1a1d2e (Text color)
- Secondary: #ffffff (White background)

Accents: Same as Dark theme
```

### AME Professional
```
Backgrounds:
- Primary: #e5e7eb
- Secondary: #1e293b (Dark slate)

Accents:
- Purple: #6366f1 (Indigo)
- Cyan: #0891b2 (Teal)
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

- **Installation Guide**: See `AME-TechAssist-Theme-Installation-Guide.md`
- **Category Setup**: See `AME-Category-Structure.md`
- **Quick Start**: See `QUICK-START.md`

## 💬 Support

For issues or questions about this theme component, contact your AME Discourse administrator.
