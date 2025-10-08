const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://forum.freeletics.com';
const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'freeletics');

// Ensure output directories exist
const ASSETS_DIR = path.join(OUTPUT_DIR, 'assets');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots');
[ASSETS_DIR, SCREENSHOTS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function scrapeTheme() {
  console.log('🚀 Starting Freeletics theme scraper...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  const themeData = {
    baseUrl: BASE_URL,
    scrapedAt: new Date().toISOString(),
    assets: [],
    colors: {},
    typography: {},
    layout: {},
    customizations: []
  };

  // Intercept network requests to capture theme assets
  page.on('response', async (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';
    
    // Capture CSS files
    if (contentType.includes('text/css') || url.endsWith('.css')) {
      try {
        const content = await response.text();
        const filename = path.basename(new URL(url).pathname) || 'style.css';
        const filepath = path.join(ASSETS_DIR, filename);
        fs.writeFileSync(filepath, content);
        console.log(`✅ Saved CSS: ${filename}`);
        themeData.assets.push({ type: 'css', url, filename });
      } catch (e) {
        console.log(`⚠️  Failed to save CSS: ${url}`);
      }
    }
    
    // Capture fonts
    if (contentType.includes('font') || /\.(woff2?|ttf|otf|eot)$/i.test(url)) {
      try {
        const buffer = await response.body();
        const filename = path.basename(new URL(url).pathname);
        const filepath = path.join(ASSETS_DIR, filename);
        fs.writeFileSync(filepath, buffer);
        console.log(`✅ Saved Font: ${filename}`);
        themeData.assets.push({ type: 'font', url, filename });
      } catch (e) {
        console.log(`⚠️  Failed to save font: ${url}`);
      }
    }
  });

  try {
    console.log('📄 Navigating to forum homepage...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000); // Wait for dynamic content

    // Take screenshots
    console.log('\n📸 Capturing screenshots...');
    await page.screenshot({ 
      path: path.join(SCREENSHOTS_DIR, '01-homepage-full.png'),
      fullPage: true 
    });
    console.log('✅ Saved: 01-homepage-full.png');

    await page.screenshot({ 
      path: path.join(SCREENSHOTS_DIR, '02-homepage-viewport.png')
    });
    console.log('✅ Saved: 02-homepage-viewport.png');

    // Extract Discourse version and theme info
    console.log('\n🔍 Extracting Discourse metadata...');
    const discourseInfo = await page.evaluate(() => {
      const meta = {};
      document.querySelectorAll('meta').forEach(m => {
        const name = m.getAttribute('name') || m.getAttribute('property');
        const content = m.getAttribute('content');
        if (name && content) meta[name] = content;
      });
      return {
        generator: meta['generator'] || 'Unknown',
        themeColor: meta['theme-color'] || null,
        bodyClasses: document.body.className,
        htmlDataAttrs: Array.from(document.documentElement.attributes).map(a => ({
          name: a.name,
          value: a.value
        }))
      };
    });
    themeData.discourse = discourseInfo;
    console.log('✅ Generator:', discourseInfo.generator);

    // Extract CSS custom properties (CSS variables)
    console.log('\n🎨 Extracting CSS custom properties...');
    const cssVariables = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      const vars = {};
      for (let i = 0; i < styles.length; i++) {
        const prop = styles[i];
        if (prop.startsWith('--')) {
          vars[prop] = styles.getPropertyValue(prop).trim();
        }
      }
      return vars;
    });
    themeData.cssVariables = cssVariables;
    console.log(`✅ Found ${Object.keys(cssVariables).length} CSS variables`);

    // Extract color scheme
    console.log('\n🌈 Extracting color scheme...');
    const colors = await page.evaluate(() => {
      const elements = {
        'body-background': document.body,
        'primary-header': document.querySelector('.d-header') || document.querySelector('header'),
        'navigation': document.querySelector('.navigation-container') || document.querySelector('nav'),
        'content-area': document.querySelector('#main-outlet') || document.querySelector('main'),
        'category-box': document.querySelector('.category-boxes .category-box') || document.querySelector('.category'),
        'button-primary': document.querySelector('.btn-primary'),
        'link': document.querySelector('a')
      };

      const colorData = {};
      Object.entries(elements).forEach(([name, el]) => {
        if (!el) return;
        const styles = getComputedStyle(el);
        colorData[name] = {
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          borderColor: styles.borderColor,
          boxShadow: styles.boxShadow
        };
      });
      return colorData;
    });
    themeData.colors = colors;
    console.log('✅ Extracted color scheme for key elements');

    // Extract typography
    console.log('\n📝 Extracting typography...');
    const typography = await page.evaluate(() => {
      const elements = {
        'body': document.body,
        'h1': document.querySelector('h1'),
        'h2': document.querySelector('h2'),
        'h3': document.querySelector('h3'),
        'p': document.querySelector('p'),
        'button': document.querySelector('.btn') || document.querySelector('button'),
        'link': document.querySelector('a')
      };

      const typographyData = {};
      Object.entries(elements).forEach(([name, el]) => {
        if (!el) return;
        const styles = getComputedStyle(el);
        typographyData[name] = {
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
          letterSpacing: styles.letterSpacing,
          textTransform: styles.textTransform
        };
      });
      return typographyData;
    });
    themeData.typography = typography;
    console.log('✅ Extracted typography settings');

    // Extract layout measurements
    console.log('\n📐 Extracting layout measurements...');
    const layout = await page.evaluate(() => {
      const header = document.querySelector('.d-header') || document.querySelector('header');
      const container = document.querySelector('.container') || document.querySelector('#main-outlet');
      
      return {
        header: header ? {
          height: getComputedStyle(header).height,
          padding: getComputedStyle(header).padding,
          position: getComputedStyle(header).position,
          zIndex: getComputedStyle(header).zIndex
        } : null,
        container: container ? {
          maxWidth: getComputedStyle(container).maxWidth,
          padding: getComputedStyle(container).padding,
          margin: getComputedStyle(container).margin
        } : null,
        bodyPadding: getComputedStyle(document.body).padding,
        bodyMargin: getComputedStyle(document.body).margin
      };
    });
    themeData.layout = layout;
    console.log('✅ Extracted layout measurements');

    // Get all loaded stylesheets
    console.log('\n📋 Extracting stylesheet URLs...');
    const stylesheets = await page.evaluate(() => {
      return Array.from(document.styleSheets).map(sheet => {
        try {
          return {
            href: sheet.href,
            disabled: sheet.disabled,
            media: sheet.media.mediaText || 'all'
          };
        } catch (e) {
          return { href: sheet.href, error: 'CORS blocked' };
        }
      }).filter(s => s.href);
    });
    themeData.stylesheets = stylesheets;
    console.log(`✅ Found ${stylesheets.length} stylesheets`);

    // Identify theme components
    console.log('\n🧩 Identifying theme components...');
    const themeComponents = stylesheets
      .filter(s => s.href && (s.href.includes('/theme/') || s.href.includes('/stylesheets/')))
      .map(s => {
        const match = s.href.match(/\/theme\/(\d+)\/|\/stylesheets\/(.+?)\.css/);
        return {
          url: s.href,
          themeId: match ? match[1] : null,
          name: match ? match[2] : null
        };
      });
    themeData.themeComponents = themeComponents;
    console.log(`✅ Identified ${themeComponents.length} theme components`);

    // Try to navigate to a category page
    console.log('\n🗂️  Navigating to category page...');
    const categoryLink = await page.locator('.category-box a, .category-list a, .category a').first();
    if (await categoryLink.count() > 0) {
      await categoryLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ 
        path: path.join(SCREENSHOTS_DIR, '03-category-page.png'),
        fullPage: true 
      });
      console.log('✅ Saved: 03-category-page.png');
    }

    // Try to find and capture header variations
    console.log('\n🔝 Analyzing header...');
    const headerAnalysis = await page.evaluate(() => {
      const header = document.querySelector('.d-header') || document.querySelector('header');
      if (!header) return null;

      const logo = header.querySelector('.logo-big, .logo, img');
      const nav = header.querySelector('.d-header-icons, nav');

      return {
        hasLogo: !!logo,
        logoSrc: logo ? logo.src : null,
        headerButtons: nav ? Array.from(nav.querySelectorAll('button, a')).length : 0,
        customClasses: header.className
      };
    });
    themeData.headerAnalysis = headerAnalysis;
    console.log('✅ Header analysis complete');

    // Save all collected data
    console.log('\n💾 Saving theme data...');
    const outputFile = path.join(OUTPUT_DIR, 'theme-data.json');
    fs.writeFileSync(outputFile, JSON.stringify(themeData, null, 2));
    console.log(`✅ Saved: theme-data.json`);

    // Generate human-readable report
    generateReport(themeData);

  } catch (error) {
    console.error('❌ Error during scraping:', error.message);
  } finally {
    await browser.close();
    console.log('\n✨ Scraping complete!');
  }
}

function generateReport(data) {
  let report = `# Freeletics Discourse Theme Analysis\n\n`;
  report += `**Scraped:** ${new Date(data.scrapedAt).toLocaleString()}\n\n`;
  report += `**Base URL:** ${data.baseUrl}\n\n`;
  
  report += `## Discourse Info\n\n`;
  report += `- **Generator:** ${data.discourse?.generator || 'Unknown'}\n`;
  report += `- **Theme Color:** ${data.discourse?.themeColor || 'Not set'}\n\n`;

  report += `## Assets Collected\n\n`;
  const cssList = data.assets.filter(a => a.type === 'css');
  const fontList = data.assets.filter(a => a.type === 'font');
  report += `- **CSS Files:** ${cssList.length}\n`;
  report += `- **Fonts:** ${fontList.length}\n\n`;

  if (cssList.length > 0) {
    report += `### CSS Files\n\n`;
    cssList.forEach(css => {
      report += `- \`${css.filename}\` - ${css.url}\n`;
    });
    report += `\n`;
  }

  if (Object.keys(data.cssVariables).length > 0) {
    report += `## CSS Custom Properties\n\n`;
    report += `Found ${Object.keys(data.cssVariables).length} CSS variables. Key color variables:\n\n`;
    const colorVars = Object.entries(data.cssVariables)
      .filter(([key]) => key.includes('color') || key.includes('background'))
      .slice(0, 20);
    colorVars.forEach(([key, value]) => {
      report += `- \`${key}\`: ${value}\n`;
    });
    report += `\n`;
  }

  report += `## Color Scheme\n\n`;
  Object.entries(data.colors).forEach(([element, colors]) => {
    report += `### ${element}\n`;
    Object.entries(colors).forEach(([prop, value]) => {
      if (value && value !== 'none' && value !== 'transparent') {
        report += `- **${prop}:** ${value}\n`;
      }
    });
    report += `\n`;
  });

  report += `## Typography\n\n`;
  Object.entries(data.typography).forEach(([element, styles]) => {
    report += `### ${element}\n`;
    Object.entries(styles).forEach(([prop, value]) => {
      if (value) {
        report += `- **${prop}:** ${value}\n`;
      }
    });
    report += `\n`;
  });

  report += `## Layout\n\n`;
  if (data.layout.header) {
    report += `### Header\n`;
    Object.entries(data.layout.header).forEach(([prop, value]) => {
      report += `- **${prop}:** ${value}\n`;
    });
    report += `\n`;
  }
  if (data.layout.container) {
    report += `### Container\n`;
    Object.entries(data.layout.container).forEach(([prop, value]) => {
      report += `- **${prop}:** ${value}\n`;
    });
    report += `\n`;
  }

  report += `## Theme Components\n\n`;
  if (data.themeComponents && data.themeComponents.length > 0) {
    data.themeComponents.forEach(comp => {
      report += `- Theme ID: ${comp.themeId || 'N/A'} - ${comp.url}\n`;
    });
  } else {
    report += `No custom theme components detected.\n`;
  }
  report += `\n`;

  report += `## Next Steps for Recreation\n\n`;
  report += `1. Review the CSS files in \`data/freeletics/assets/\`\n`;
  report += `2. Compare color schemes and typography with your current theme\n`;
  report += `3. Identify custom CSS rules and component modifications\n`;
  report += `4. Check if they're using a base theme (e.g., "Graceful", "Sam's Simple Theme")\n`;
  report += `5. Review screenshots in \`data/freeletics/screenshots/\`\n`;
  report += `6. Create a Discourse theme component or modify your existing theme\n\n`;

  const reportFile = path.join(OUTPUT_DIR, 'THEME-REPORT.md');
  fs.writeFileSync(reportFile, report);
  console.log(`✅ Saved: THEME-REPORT.md`);
}

// Run the scraper
scrapeTheme().catch(console.error);
