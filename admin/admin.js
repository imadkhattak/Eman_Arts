// Admin Dashboard JavaScript - Full CRUD Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on login page or dashboard
    if (document.getElementById('loginForm')) {
        initializeLogin();
    } else if (document.getElementById('logoutButton')) {
        initializeDashboard();
    }
});

// ============================================
// LOGIN FUNCTIONALITY
// ============================================

function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    // Admin credentials (in production, use server-side authentication)
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'lina2025'
    };
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            // Store authentication
            sessionStorage.setItem('adminAuthenticated', 'true');
            sessionStorage.setItem('adminUser', username);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
            errorMessage.style.display = 'block';
            
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
}

// ============================================
// DASHBOARD FUNCTIONALITY
// ============================================

function initializeDashboard() {
    // Check authentication
    if (!sessionStorage.getItem('adminAuthenticated')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Logout functionality
    document.getElementById('logoutButton').addEventListener('click', function() {
        sessionStorage.removeItem('adminAuthenticated');
        sessionStorage.removeItem('adminUser');
        window.location.href = 'index.html';
    });
    
    // Initialize sections
    initializeArtworkManagement();
    initializeArtistInfo();
    initializeSectionNavigation();
    
    // Load initial data
    loadArtworksForDisplay();
    loadArtistInfoForDisplay();
    updateDashboardStats();
}

// ============================================
// SECTION NAVIGATION
// ============================================

function initializeSectionNavigation() {
    const sidebarLinks = document.querySelectorAll('.admin-sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to section
            const sectionId = this.getAttribute('href');
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// ARTWORK MANAGEMENT
// ============================================

function initializeArtworkManagement() {
    const addArtworkForm = document.getElementById('addArtworkForm');
    
    if (addArtworkForm) {
        addArtworkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewArtwork();
        });
    }
    
    loadArtworksForDisplay();
}

function addNewArtwork() {
    const title = document.getElementById('artworkTitle').value;
    const price = parseFloat(document.getElementById('artworkPrice').value);
    const medium = document.getElementById('artworkMedium').value;
    const size = document.getElementById('artworkSize').value;
    const image = document.getElementById('artworkImage').value;
    const description = document.getElementById('artworkDescription').value;
    
    if (!title || !price || !medium || !size || !image) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const newArtwork = {
        id: Date.now(),
        title,
        price,
        medium,
        size,
        image,
        description,
        category: 'mixed',
        available: true,
        dateAdded: new Date().toISOString()
    };
    
    // Get existing artworks
    let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
    artworks.push(newArtwork);
    
    // Save to localStorage
    localStorage.setItem('artworks', JSON.stringify(artworks));
    
    // Reset form
    document.getElementById('addArtworkForm').reset();
    
    // Update display
    loadArtworksForDisplay();
    updateDashboardStats();
    
    showNotification('Artwork added successfully!', 'success');
}

function loadArtworksForDisplay() {
    const container = document.getElementById('artworksContainer');
    if (!container) return;
    
    let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
    
    // If no artworks in localStorage, use default from gallery.js
    if (artworks.length === 0 && window.artworksData) {
        artworks = window.artworksData;
        localStorage.setItem('artworks', JSON.stringify(artworks));
    }
    
    if (artworks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No artworks yet. Add your first artwork above.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = artworks.map(artwork => `
        <div class="artwork-item" data-id="${artwork.id}">
            <div class="artwork-image" style="background-image: url('${artwork.image}')"></div>
            <div class="artwork-info">
                <div class="artwork-title">${artwork.title}</div>
                <div class="artwork-price">$${artwork.price.toLocaleString()}</div>
                <div class="artwork-actions">
                    <button class="btn btn-secondary btn-small" onclick="editArtwork(${artwork.id})">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="deleteArtwork(${artwork.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update gallery preview
    updateGalleryPreview(artworks);
}

function editArtwork(artworkId) {
    let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
    const artwork = artworks.find(art => art.id === artworkId);
    
    if (artwork) {
        // Populate form with artwork data
        document.getElementById('artworkTitle').value = artwork.title;
        document.getElementById('artworkPrice').value = artwork.price;
        document.getElementById('artworkMedium').value = artwork.medium;
        document.getElementById('artworkSize').value = artwork.size;
        document.getElementById('artworkImage').value = artwork.image;
        document.getElementById('artworkDescription').value = artwork.description || '';
        
        // Change button text
        const submitBtn = document.querySelector('#addArtworkForm button[type="submit"]');
        submitBtn.textContent = 'Update Artwork';
        submitBtn.dataset.editId = artworkId;
        
        // Scroll to form
        document.querySelector('.add-artwork-card').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function deleteArtwork(artworkId) {
    if (confirm('Are you sure you want to delete this artwork? This action cannot be undone.')) {
        let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
        artworks = artworks.filter(art => art.id !== artworkId);
        localStorage.setItem('artworks', JSON.stringify(artworks));
        
        loadArtworksForDisplay();
        updateDashboardStats();
        
        showNotification('Artwork deleted successfully', 'success');
    }
}

// ============================================
// ARTIST INFO MANAGEMENT
// ============================================

function initializeArtistInfo() {
    const artistForm = document.getElementById('artistForm');
    
    if (artistForm) {
        // Load existing artist info
        loadArtistInfoForDisplay();
        
        // Save artist info
        artistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveArtistInfo();
        });
    }
}

function loadArtistInfoForDisplay() {
    let artistInfo = JSON.parse(localStorage.getItem('artistInfo')) || {
        name: 'Lina',
        email: 'studio@artfullina.com',
        bio: 'Independent artist exploring the intersection of contemporary femininity, minimalist abstraction, and emotional depth.',
        image: 'images/artist/lina-portrait.jpg'
    };
    
    // Populate form
    if (document.getElementById('artistName')) {
        document.getElementById('artistName').value = artistInfo.name || '';
        document.getElementById('artistEmail').value = artistInfo.email || '';
        document.getElementById('artistBio').value = artistInfo.bio || '';
        document.getElementById('artistImage').value = artistInfo.image || '';
    }
}

function saveArtistInfo() {
    const updatedInfo = {
        name: document.getElementById('artistName').value,
        email: document.getElementById('artistEmail').value,
        bio: document.getElementById('artistBio').value,
        image: document.getElementById('artistImage').value,
        lastUpdated: new Date().toISOString()
    };
    
    if (!updatedInfo.name || !updatedInfo.email || !updatedInfo.bio) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    localStorage.setItem('artistInfo', JSON.stringify(updatedInfo));
    
    showNotification('Artist information updated successfully!', 'success');
    updateDashboardStats();
}

// ============================================
// GALLERY PREVIEW
// ============================================

function updateGalleryPreview(artworks) {
    const previewContainer = document.getElementById('galleryPreview');
    if (!previewContainer) return;
    
    if (artworks.length === 0) {
        previewContainer.innerHTML = `
            <div class="empty-state">
                <p>Add artworks to see preview</p>
            </div>
        `;
        return;
    }
    
    previewContainer.innerHTML = artworks.map(artwork => `
        <div class="gallery-preview-item">
            <div class="gallery-preview-image" style="background-image: url('${artwork.image}')"></div>
            <div class="gallery-preview-info">
                <div class="gallery-preview-title">${artwork.title}</div>
                <div class="gallery-preview-price">$${artwork.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

// ============================================
// DASHBOARD STATS
// ============================================

function updateDashboardStats() {
    const artworks = JSON.parse(localStorage.getItem('artworks')) || [];
    const artistInfo = JSON.parse(localStorage.getItem('artistInfo'));
    
    // Update artwork count
    const artworkCountEl = document.getElementById('stat-artworks');
    if (artworkCountEl) {
        artworkCountEl.textContent = artworks.length;
    }
    
    // Update last update time
    const lastUpdateEl = document.getElementById('stat-last-update');
    if (lastUpdateEl) {
        const lastUpdate = artistInfo?.lastUpdated || new Date().toISOString();
        const date = new Date(lastUpdate);
        lastUpdateEl.textContent = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    }
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 2rem;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        z-index: 5000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ============================================
// ANIMATIONS
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// EXPORT FUNCTIONS
// ============================================

window.editArtwork = editArtwork;
window.deleteArtwork = deleteArtwork;
window.showNotification = showNotification;
