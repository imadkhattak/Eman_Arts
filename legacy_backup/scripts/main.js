// main.js - Main JavaScript File with Admin Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    hamburger?.addEventListener('click', () => {
        mobileMenu.style.display = 'block';
        setTimeout(() => {
            mobileMenu.style.opacity = '1';
        }, 10);
    });

    closeMenu?.addEventListener('click', () => {
        mobileMenu.style.opacity = '0';
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.opacity = '0';
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        });
    });

    // Cart Toggle
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');

    cartIcon?.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    closeCart?.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Load Featured Artworks
    loadFeaturedArtworks();

    // Initialize cart
    initializeCart();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Check admin status
    checkAdminStatus();
    
    // Also check admin status on storage changes (if logged in another tab)
    window.addEventListener('storage', function(e) {
        if (e.key === 'adminAuthenticated') {
            checkAdminStatus();
        }
    });

    // Admin link click handler with password protection
    setupAdminLinkProtection();
});

// Load Featured Artworks
async function loadFeaturedArtworks() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;

    try {
        // In production, this would fetch from an API
        const artworks = [
            {
                id: 1,
                title: "Ethereal No. 1",
                medium: "Oil on Canvas",
                size: "80 × 100 cm",
                price: 3200,
                image: "images/artworks/12242031-LCRXFHYH-7.jpg"
            },
            {
                id: 2,
                title: "Silhouette Study",
                medium: "Acrylic & Gold Leaf",
                size: "60 × 80 cm",
                price: 2400,
                image: "images/artworks/5aa0eca087456ff31d8b4569_da39a3ee5e6b4b0d3255bfef95601890afd80709.jpg"
            },
            {
                id: 3,
                title: "Morning Light",
                medium: "Mixed Media",
                size: "90 × 120 cm",
                price: 4200,
                image: "images/artworks/6072383-QQZTYNYR-7.jpg"
            },
            {
                id: 4,
                title: "Feminine Forms",
                medium: "Watercolor & Ink",
                size: "50 × 70 cm",
                price: 1800,
                image: "images/artworks/il_600x600.7486580279_fmk2.webp"
            }
        ];

        grid.innerHTML = artworks.map(artwork => `
            <div class="artwork-card">
                <div class="artwork-image" style="background-image: url('${artwork.image}')" onclick="openLightbox('${artwork.image}')"></div>
                <div class="artwork-info">
                    <h3 class="artwork-title">${artwork.title}</h3>
                    <p class="artwork-details">${artwork.medium} • ${artwork.size}</p>
                    <p class="artwork-price">$${artwork.price.toLocaleString()}</p>
                    <button class="cta-button" onclick='addToCart(${JSON.stringify(artwork)})' style="margin-top: 1rem; padding: 0.75rem 1.5rem; font-size: 0.8rem;">Add to Cart</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading artworks:', error);
        grid.innerHTML = '<p class="text-center">Unable to load artworks at this time.</p>';
    }
}

// Cart functionality
function initializeCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();
}

function addToCart(artwork) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists
    const existingItem = cart.find(item => item.id === artwork.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...artwork,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Added to cart');
}

function removeFromCart(artworkId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== artworkId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
        cartIcon.setAttribute('data-cart-count', cartCount);
    }
    
    // Update cart sidebar if open
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    
    if (cartItemsContainer && totalPriceElement) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty</p>';
            totalPriceElement.textContent = '$0.00';
            return;
        }
        
        let total = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            return `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">$${item.price.toLocaleString()} × ${item.quantity}</p>
                        <p class="cart-item-total">$${itemTotal.toLocaleString()}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
        }).join('');
        
        totalPriceElement.textContent = `$${total.toLocaleString()}`;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--black);
        color: var(--white);
        padding: 1rem 2rem;
        border-radius: 2px;
        z-index: 5000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Admin link visibility based on authentication
function checkAdminStatus() {
    const adminAccessDiv = document.getElementById('admin-access');
    
    if (!adminAccessDiv) return;
    
    // Check if admin is logged in
    const isAdminLoggedIn = sessionStorage.getItem('adminAuthenticated') === 'true';
    
    if (isAdminLoggedIn) {
        adminAccessDiv.style.display = 'block';
        adminAccessDiv.classList.add('admin-link-visible');
    } else {
        adminAccessDiv.style.display = 'none';
        adminAccessDiv.classList.remove('admin-link-visible');
    }
}

// Admin link click handler
function setupAdminLinkProtection() {
    const adminLinks = document.querySelectorAll('a.admin-link');
    
    adminLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Redirect directly to admin login page
            e.preventDefault();
            window.location.href = 'admin/index.html';
        });
    });
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    /* Admin link visibility animation */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .admin-link-visible {
        animation: fadeIn 0.5s ease forwards;
    }
`;
document.head.appendChild(style);

// Export functions for use in other files
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartDisplay = updateCartDisplay;
window.checkAdminStatus = checkAdminStatus;
// Lightbox functionality
function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: zoom-out;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        box-shadow: 0 0 30px rgba(0,0,0,0.5);
    `;
    
    lightbox.appendChild(img);
    lightbox.onclick = () => document.body.removeChild(lightbox);
    document.body.appendChild(lightbox);
}
window.openLightbox = openLightbox;
