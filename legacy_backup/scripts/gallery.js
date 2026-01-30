// Gallery page functionality

// Sample artwork data - In production, this would come from an API/database
const artworks = [
    {
        id: 1,
        title: "Ethereal No. 1",
        medium: "Oil on Canvas",
        category: "oil",
        size: "80 × 100 cm",
        price: 3200,
        image: "../images/artworks/12242031-LCRXFHYH-7.jpg",
        description: "A contemplative study in feminine form and light, exploring the delicate balance between strength and vulnerability.",
        available: true
    },
    {
        id: 2,
        title: "Silhouette Study",
        medium: "Acrylic & Gold Leaf",
        category: "acrylic",
        size: "60 × 80 cm",
        price: 2400,
        image: "../images/artworks/5aa0eca087456ff31d8b4569_da39a3ee5e6b4b0d3255bfef95601890afd80709.jpg",
        description: "Minimalist exploration of form through bold silhouettes enhanced with delicate gold leaf accents.",
        available: true
    },
    {
        id: 3,
        title: "Morning Light",
        medium: "Mixed Media",
        category: "mixed",
        size: "90 × 120 cm",
        price: 4200,
        image: "../images/artworks/6072383-QQZTYNYR-7.jpg",
        description: "Layered composition capturing the soft, transformative quality of morning light on skin.",
        available: true
    },
    {
        id: 4,
        title: "Feminine Forms",
        medium: "Watercolor & Ink",
        category: "watercolor",
        size: "50 × 70 cm",
        price: 1800,
        image: "../images/artworks/il_600x600.7486580279_fmk2.webp",
        description: "Fluid watercolor study celebrating organic curves and natural beauty.",
        available: true
    },
    {
        id: 5,
        title: "Reverie",
        medium: "Oil on Canvas",
        category: "oil",
        size: "70 × 90 cm",
        price: 2800,
        image: "../images/artworks/pencilsketchadjusted-2509142.jpeg",
        description: "Dreamy portrayal of contemplation, rendered in soft, muted tones.",
        available: true
    },
    {
        id: 6,
        title: "Golden Hour",
        medium: "Acrylic",
        category: "acrylic",
        size: "80 × 100 cm",
        price: 3000,
        image: "../images/artworks/pencilsketchadjusted-6479845.jpeg",
        description: "Warm, golden tones capture the magical quality of late afternoon light.",
        available: true
    },
    {
        id: 7,
        title: "Strength in Softness",
        medium: "Mixed Media",
        category: "mixed",
        size: "100 × 120 cm",
        price: 4500,
        image: "../images/artworks/pencilsketchadjusted-8586598.jpeg",
        description: "A powerful piece juxtaposing delicate rendering with bold compositional choices.",
        available: true
    },
    {
        id: 8,
        title: "Serenity",
        medium: "Watercolor",
        category: "watercolor",
        size: "40 × 60 cm",
        price: 1500,
        image: "../images/artworks/pencilsketchadjusted-6055181.jpeg",
        description: "Peaceful study in flowing watercolor techniques and subtle color gradients.",
        available: true
    },
    {
        id: 9,
        title: "Luminous",
        medium: "Oil on Canvas",
        category: "oil",
        size: "90 × 120 cm",
        price: 3800,
        image: "../images/artworks/pencilsketchadjusted-7628663.jpeg",
        description: "Radiant composition exploring the interplay of light and shadow on the human form.",
        available: true
    },
    {
        id: 10,
        title: "Whispers",
        medium: "Acrylic",
        category: "acrylic",
        size: "60 × 80 cm",
        price: 2200,
        image: "../images/artworks/il_600x600.7351420711_ju10.avif",
        description: "Subtle, intimate portrayal rendered in gentle acrylic layers.",
        available: true
    },
    {
        id: 11,
        title: "Essence",
        medium: "Mixed Media",
        category: "mixed",
        size: "70 × 90 cm",
        price: 3200,
        image: "../images/artworks/pencilsketchadjusted-1958628.jpeg",
        description: "Multi-layered work capturing the essential nature of feminine beauty.",
        available: true
    },
    {
        id: 12,
        title: "Flow",
        medium: "Watercolor & Ink",
        category: "watercolor",
        size: "50 × 70 cm",
        price: 1900,
        image: "../images/artworks/pencilsketchadjusted-2611649.jpeg",
        description: "Dynamic watercolor piece celebrating movement and organic form.",
        available: true
    },
        {
        id: 12,
        title: "Flow",
        medium: "Watercolor & Ink",
        category: "watercolor",
        size: "50 × 70 cm",
        price: 1900,
        image: "../images/artworks/pencilsketchadjusted-7497741.jpeg",
        description: "Dynamic watercolor piece celebrating movement and organic form.",
        available: true
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-button');
    
    // Load all artworks initially
    if (galleryGrid) {
        renderGallery('all');
    }
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter artworks
            const filter = this.dataset.filter;
            renderGallery(filter);
        });
    });
});

function renderGallery(filter) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // Filter artworks
    const filteredArtworks = filter === 'all' 
        ? artworks 
        : artworks.filter(artwork => artwork.category === filter);
    
    // Render artworks with staggered animation
    galleryGrid.innerHTML = filteredArtworks.map((artwork, index) => `
        <div class="artwork-card" style="animation: fadeIn 0.5s ease ${index * 0.1}s both;" data-id="${artwork.id}">
            <a href="artwork-detail.html?id=${artwork.id}">
                <div class="artwork-image" style="background-image: url('${artwork.image}')"></div>
                <div class="artwork-info">
                    <h3 class="artwork-title">${artwork.title}</h3>
                    <p class="artwork-details">${artwork.medium} • ${artwork.size}</p>
                    <p class="artwork-price">$${artwork.price.toLocaleString()}</p>
                </div>
            </a>
            <button class="add-to-cart-button" onclick="addToCartFromGallery(${artwork.id})" style="margin-top: 1rem; width: 100%;">
                Add to Cart
            </button>
        </div>
    `).join('');
}

function addToCartFromGallery(artworkId) {
    const artwork = artworks.find(art => art.id === artworkId);
    if (artwork) {
        addToCart(artwork);
    }
}

// Export artworks data for use in other pages
window.artworksData = artworks;
window.addToCartFromGallery = addToCartFromGallery;
