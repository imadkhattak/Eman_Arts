// Admin functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on login page or dashboard
    if (document.getElementById('loginForm')) {
        initializeLogin();
    } else if (document.getElementById('logoutButton')) {
        initializeDashboard();
    }
});

// Login functionality
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    // Default admin credentials (in production, use server-side authentication)
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'lina2025'
    };
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            // Store authentication token
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

// Dashboard functionality
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
    
    // Initialize artwork management
    initializeArtworkManagement();
    
    // Initialize artist info
    initializeArtistInfo();
}

// Artwork Management
function initializeArtworkManagement() {
    const addArtworkForm = document.getElementById('addArtworkForm');
    const artworksContainer = document.getElementById('artworksContainer');
    
    // Load existing artworks
    loadArtworks();
    
    // Add new artwork
    if (addArtworkForm) {
        addArtworkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newArtwork = {
                id: Date.now(), // Simple ID generation
                title: document.getElementById('artworkTitle').value,
                price: parseFloat(document.getElementById('artworkPrice').value),
                medium: document.getElementById('artworkMedium').value,
                size: document.getElementById('artworkSize').value || 'Various',
                image: document.getElementById('artworkImage').value,
                description: document.getElementById('artworkDescription').value,
                category: 'mixed' // Default category
            };
            
            // Get existing artworks
            let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
            
            // Add new artwork
            artworks.push(newArtwork);
            
            // Save to localStorage
            localStorage.setItem('artworks', JSON.stringify(artworks));
            
            // Update display
            loadArtworks();
            
            // Reset form
            addArtworkForm.reset();
            
            // Show success message
            alert('Artwork added successfully!');
        });
    }
    
    function loadArtworks() {
        // Get artworks from localStorage
        let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
        
        // If no artworks in localStorage, use default from gallery.js
        if (artworks.length === 0 && window.artworksData) {
            artworks = window.artworksData;
            localStorage.setItem('artworks', JSON.stringify(artworks));
        }
        
        // Render artworks
        artworksContainer.innerHTML = artworks.map(artwork => `
            <div class="admin-artwork-card" data-id="${artwork.id}">
                <div class="admin-artwork-image" style="background-image: url('${artwork.image}')"></div>
                <div class="admin-artwork-info">
                    <h4 class="admin-artwork-title">${artwork.title}</h4>
                    <p class="admin-artwork-price">$${artwork.price.toLocaleString()}</p>
                    <div class="admin-artwork-actions">
                        <button class="edit-button" onclick="editArtwork(${artwork.id})">Edit</button>
                        <button class="delete-button" onclick="deleteArtwork(${artwork.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Export functions to global scope
    window.deleteArtwork = function(artworkId) {
        if (confirm('Are you sure you want to delete this artwork?')) {
            let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
            artworks = artworks.filter(art => art.id !== artworkId);
            localStorage.setItem('artworks', JSON.stringify(artworks));
            loadArtworks();
        }
    };
    
    window.editArtwork = function(artworkId) {
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
            
            // Scroll to form
            document.querySelector('.add-artwork-form').scrollIntoView({
                behavior: 'smooth'
            });
        }
    };
}

// Artist Info Management
function initializeArtistInfo() {
    const artistForm = document.getElementById('artistForm');
    
    // Load existing artist info
    let artistInfo = JSON.parse(localStorage.getItem('artistInfo')) || {
        name: 'Lina',
        bio: 'Independent artist exploring the intersection of contemporary femininity, minimalist abstraction, and emotional depth.',
        image: 'images/artist/lina-portrait.jpg'
    };
    
    // Populate form
    document.getElementById('artistName').value = artistInfo.name;
    document.getElementById('artistBio').value = artistInfo.bio;
    document.getElementById('artistImage').value = artistInfo.image;
    
    // Save artist info
    artistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const updatedInfo = {
            name: document.getElementById('artistName').value,
            bio: document.getElementById('artistBio').value,
            image: document.getElementById('artistImage').value
        };
        
        localStorage.setItem('artistInfo', JSON.stringify(updatedInfo));
        
        alert('Artist information updated!');
    });
}