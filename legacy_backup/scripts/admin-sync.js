// Sync admin changes to main website
document.addEventListener('DOMContentLoaded', function() {
    // Load artworks from localStorage or default
    function loadArtworksForSite() {
        const artworks = JSON.parse(localStorage.getItem('artworks')) || window.artworksData || [];
        return artworks;
    }
    
    // Update featured artworks on homepage
    function updateFeaturedArtworks() {
        const grid = document.getElementById('featured-grid');
        if (!grid) return;
        
        const artworks = loadArtworksForSite();
        const featured = artworks.slice(0, 4); // Show first 4 as featured
        
        grid.innerHTML = featured.map(artwork => `
            <div class="artwork-card" onclick="openArtworkLightbox(${artwork.id})">
                <div class="artwork-image" style="background-image: url('${artwork.image}')"></div>
                <div class="artwork-info">
                    <h3 class="artwork-title">${artwork.title}</h3>
                    <p class="artwork-details">${artwork.medium} • ${artwork.size}</p>
                    <p class="artwork-price">$${artwork.price.toLocaleString()}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Update artist info
    function updateArtistInfo() {
        const artistInfo = JSON.parse(localStorage.getItem('artistInfo'));
        if (!artistInfo) return;
        
        // Update artist name in logo if needed
        const logo = document.querySelector('.logo');
        if (logo && artistInfo.name) {
            logo.textContent = artistInfo.name;
        }
        
        // Update artist bio
        const artistIntro = document.querySelector('.intro-text p');
        if (artistIntro && artistInfo.bio) {
            artistIntro.textContent = artistInfo.bio;
        }
        
        // Update artist image
        const artistImage = document.querySelector('.image-frame-inner');
        if (artistImage && artistInfo.image) {
            artistImage.style.backgroundImage = `url('${artistInfo.image}')`;
        }
    }
    
    // Initialize sync
    updateFeaturedArtworks();
    updateArtistInfo();
    
    // Listen for storage changes (if admin updates in another tab)
    window.addEventListener('storage', function(e) {
        if (e.key === 'artworks' || e.key === 'artistInfo') {
            updateFeaturedArtworks();
            updateArtistInfo();
        }
    });
});