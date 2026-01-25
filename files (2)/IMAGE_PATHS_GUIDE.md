# IMAGE PATHS GUIDE FOR LINA ART STUDIO WEBSITE

## 📁 Folder Structure

```
your-website/
├── images/
│   ├── artworks/          # All artwork images
│   ├── artist/            # Artist photos
│   ├── studio/            # Studio workspace photos
│   ├── process/           # Creative process images
│   └── hero/              # Hero section images
├── styles/
│   ├── main.css
│   └── components.css
├── scripts/
│   ├── main.js
│   ├── cart.js
│   └── gallery.js
├── pages/
│   ├── shop.html
│   ├── studio.html
│   ├── artwork-detail.html
│   └── checkout.html
└── index.html
```

## 🎨 IMAGE PLACEMENT GUIDE

### 1. HOME PAGE (index.html)

#### Hero Section - Multiple Images
**Location in code:** Lines 79-94 in index.html
**Number of images needed:** 4 images
**Recommended sizes:** 
- Large image: 800×1200px
- Small images: 600×800px
- Medium image: 1200×600px

**Image paths to replace:**
```html
<!-- Large image (spans 2 rows) -->
<div class="image-tile image-tile-large" style="background-image: url('images/artworks/pencilsketchadjusted-2112444.jpeg')">
    <!-- Replace with: images/artworks/hero-main.jpg -->
</div>

<!-- Two smaller stacked images -->
<div class="image-tile image-tile-small" style="background-image: url('images/artworks/5aa0eca087456ff31d8b4569_da39a3ee5e6b4b0d3255bfef95601890afd80709.jpg')">
    <!-- Replace with: images/artworks/hero-top-right.jpg -->
</div>
<div class="image-tile image-tile-small" style="background-image: url('images/artworks/6072383-QQZTYNYR-7.jpg')">
    <!-- Replace with: images/artworks/hero-bottom-right.jpg -->
</div>

<!-- Bottom spanning image -->
<div class="image-tile image-tile-medium" style="background-image: url('images/artworks/il_600x600.7486580279_fmk2.webp')">
    <!-- Replace with: images/artworks/hero-bottom.jpg -->
</div>
```

#### Artist Photo Section
**Location in code:** Lines 101-119 in index.html
**Number of images needed:** 1 image (artist portrait)
**Recommended size:** 800×1000px (portrait orientation)

**Image path to add:**
```html
<div class="image-frame" style="background-image: url('images/artist/lina-portrait.jpg')">
```

**OR using img tag:**
```html
<div class="image-frame">
    <img src="images/artist/lina-portrait.jpg" alt="Lina - Artist Portrait" class="artist-photo">
</div>
```

**How to add your artist photo:**
1. Take or select a high-quality portrait photo
2. Resize to 800×1000px (portrait orientation)
3. Save as: `images/artist/lina-portrait.jpg`
4. The image will automatically display with frame effect

#### Current Collection Section
**Location in code:** Lines 123-146 in index.html (rendered by main.js)
**Number of images needed:** 4 featured artworks
**Recommended size:** 800×1000px per artwork

**Images are loaded from main.js (lines 98-131):**
```javascript
const artworks = [
    {
        id: 1,
        title: "Ethereal No. 1",
        image: "images/artworks/pencilsketchadjusted-2112444.jpeg"
        // Replace with: "images/artworks/featured-1.jpg"
    },
    {
        id: 2,
        title: "Silhouette Study",
        image: "images/artworks/5aa0eca087456ff31d8b4569_da39a3ee5e6b4b0d3255bfef95601890afd80709.jpg"
        // Replace with: "images/artworks/featured-2.jpg"
    },
    // ... etc
];
```

### 2. GALLERY PAGE (shop.html)

**Location in code:** gallery.js file (lines 1-98)
**Number of images needed:** 12+ artwork images
**Recommended size:** 800×1000px per artwork

**All artwork images are defined in gallery.js:**
```javascript
const artworks = [
    {
        id: 1,
        title: "Ethereal No. 1",
        image: "../images/artworks/pencilsketchadjusted-2112444.jpeg"
        // This is the path FROM the pages/ folder
        // Actual file location: images/artworks/artwork-1.jpg
    },
    // ... 12 total artworks
];
```

**To update gallery images:**
1. Open `scripts/gallery.js`
2. Update each `image:` path
3. Save 12 artwork images to `images/artworks/` folder

### 3. STUDIO PAGE (studio.html)

#### Hero Background (Optional)
**Location:** .studio-hero-enhanced CSS class
**Path:** `images/studio/hero-pattern.png`
**Recommended size:** 1920×1080px pattern/texture

#### Studio Introduction Image
**Location in code:** Line 72 in studio.html
**Image path:**
```html
<div class="studio-intro-image" style="background-image: url('../images/studio/workspace-1.jpg')">
```
**Recommended size:** 1200×1600px
**What to show:** Your actual studio workspace, painting area

#### Divider Image
**Location in code:** Line 85 in studio.html
**Image path:**
```html
<section class="studio-divider-image" style="background-image: url('../images/studio/workspace-2.jpg')">
```
**Recommended size:** 1920×1080px (wide format)
**What to show:** Atmospheric studio shot, tools, workspace overview

#### Process Images (5 images needed)
**Location in code:** Lines 128-188 in studio.html

**Process Step 1 - Concept & Inspiration:**
```html
<div class="step-visual" style="background-image: url('../images/process/sketch.jpg')">
```
**What to show:** Sketches, inspiration board, initial drawings

**Process Step 2 - Canvas Preparation:**
```html
<div class="step-visual" style="background-image: url('../images/process/canvas.jpg')">
```
**What to show:** Prepared canvas, gesso application

**Process Step 3 - Painting Layers:**
```html
<div class="step-visual" style="background-image: url('../images/process/painting.jpg')">
```
**What to show:** Active painting, brushes, palette

**Process Step 4 - Refinement:**
```html
<div class="step-visual" style="background-image: url('../images/process/details.jpg')">
```
**What to show:** Close-up of detail work, fine brushes

**Process Step 5 - Varnishing:**
```html
<div class="step-visual" style="background-image: url('../images/process/varnish.jpg')">
```
**What to show:** Varnishing process, finished artwork

## 📋 IMAGE NAMING CONVENTIONS

### For Artworks:
- Use descriptive names: `ethereal-1.jpg`, `silhouette-study.jpg`
- Or numbered: `artwork-1.jpg`, `artwork-2.jpg`
- Format: JPG or PNG
- Size: 800×1000px (portrait) or 1000×800px (landscape)

### For Studio Photos:
- `workspace-1.jpg`, `workspace-2.jpg`
- `studio-overview.jpg`, `studio-detail.jpg`
- Format: JPG
- Size: 1200×1600px or 1920×1080px

### For Artist Photo:
- `lina-portrait.jpg` or `artist-photo.jpg`
- Format: JPG
- Size: 800×1000px (portrait orientation)

### For Process Photos:
- `sketch.jpg`, `canvas.jpg`, `painting.jpg`, `details.jpg`, `varnish.jpg`
- Format: JPG
- Size: 1000×1000px (square) or 1200×900px

## 🔄 HOW TO UPDATE IMAGES

### Method 1: Replace Image Files
1. Keep the same filename
2. Replace the image file in the folder
3. Clear browser cache to see changes

### Method 2: Update Paths in Code
1. Save your new image with a new name
2. Find the image reference in the HTML/JS file
3. Update the path to your new filename
4. Save the file

## 📸 QUICK CHECKLIST

### Images You Need:
- [ ] 4 hero section images (home page)
- [ ] 1 artist portrait photo
- [ ] 4 featured artwork images (home page)
- [ ] 12+ gallery artwork images
- [ ] 2 studio workspace photos
- [ ] 5 creative process photos
- [ ] 1 hero pattern/texture (optional)

### Where to Place Them:
- [ ] `images/artworks/` - All artwork photos
- [ ] `images/artist/` - Artist portrait
- [ ] `images/studio/` - Studio workspace photos
- [ ] `images/process/` - Creative process photos

## 💡 PRO TIPS

1. **Optimize images before uploading:**
   - Use tools like TinyPNG or ImageOptim
   - Target file size: 100-300KB per image
   - This keeps your website fast!

2. **Consistent dimensions:**
   - Keep artwork images the same size ratio
   - Prevents layout shifts and looks more professional

3. **High quality:**
   - Use high-resolution source images
   - Better to resize down than upscale poor quality

4. **Alt text (for img tags):**
   - Always include descriptive alt text
   - Example: `<img src="..." alt="Abstract feminine form painting in oils">`

5. **Test on mobile:**
   - Check how images look on phone screens
   - Ensure text is still readable over images

## 🔗 QUICK REFERENCE TABLE

| Page Section | File Location | Line Number | Number of Images | Folder Path |
|--------------|---------------|-------------|------------------|-------------|
| Home Hero | index.html | 79-94 | 4 | images/artworks/ |
| Artist Photo | index.html | 109 | 1 | images/artist/ |
| Featured Collection | main.js | 98-131 | 4 | images/artworks/ |
| Gallery Artworks | gallery.js | 5-98 | 12+ | images/artworks/ |
| Studio Intro | studio.html | 72 | 1 | images/studio/ |
| Studio Divider | studio.html | 85 | 1 | images/studio/ |
| Process Steps | studio.html | 128-188 | 5 | images/process/ |

## ❓ TROUBLESHOOTING

**Image not showing?**
1. Check the file path is correct
2. Make sure image file exists in that folder
3. Check file extension matches (.jpg vs .jpeg)
4. Clear browser cache (Ctrl+Shift+R)

**Image looks stretched?**
1. Check the recommended dimensions
2. Resize image to match aspect ratio
3. Use CSS `object-fit: cover` if needed

**Need help?**
- All paths are relative to the HTML file location
- From index.html: use `images/folder/file.jpg`
- From pages/*.html: use `../images/folder/file.jpg`
- The `..` means "go up one folder level"

---

**Last Updated:** January 2025
**Website:** Lina Art Studio
