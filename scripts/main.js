// Main JavaScript File

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
                image: "images/artworks/1.jpg"
            },
            {
                id: 2,
                title: "Silhouette Study",
                medium: "Acrylic & Gold Leaf",
                size: "60 × 80 cm",
                price: 2400,
                image: "images/artworks/2.jpg"
            },
            {
                id: 3,
                title: "Morning Light",
                medium: "Mixed Media",
                size: "90 × 120 cm",
                price: 4200,
                image: "images/artworks/3.jpg"
            },
            {
                id: 4,
                title: "Feminine Forms",
                medium: "Watercolor & Ink",
                size: "50 × 70 cm",
                price: 1800,
                image: "images/artworks/4.jpg"
            }
        ];

        grid.innerHTML = artworks.map(artwork => `
            <a href="pages/artwork-detail.html?id=${artwork.id}" class="artwork-card">
                <div class="artwork-image" style="background-image: url('${artwork.image}')"></div>
                <div class="artwork-info">
                    <h3 class="artwork-title">${artwork.title}</h3>
                    <p class="artwork-details">${artwork.medium} • ${artwork.size}</p>
                    <p class="artwork-price">$${artwork.price.toLocaleString()}</p>
                </div>
            </a>
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
`;
document.head.appendChild(style);

// Export functions for use in other files
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartDisplay = updateCartDisplay;