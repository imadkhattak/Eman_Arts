// Cart-specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart on pages that need it
    if (document.querySelector('.cart-icon') || document.querySelector('.add-to-cart-button')) {
        initializeCart();
        
        // Handle add to cart buttons
        document.querySelectorAll('.add-to-cart-button').forEach(button => {
            button.addEventListener('click', function() {
                const artwork = JSON.parse(this.dataset.artwork || '{}');
                if (artwork.id) {
                    addToCart(artwork);
                }
            });
        });
    }
    
    // Cart page functionality
    const cartPage = document.querySelector('.cart-items');
    if (cartPage) {
        renderCartPage();
    }
    
    // Checkout page functionality
    const checkoutForm = document.querySelector('.checkout-form');
    if (checkoutForm) {
        setupCheckoutForm();
    }
});

function renderCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.cart-total .total-price');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="../shop.html" class="cta-button">Continue Shopping</a>
            </div>
        `;
        if (totalElement) totalElement.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-page-item">
                <div class="cart-item-main">
                    <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                    <div class="cart-item-info">
                        <h3>${item.title}</h3>
                        <p>${item.medium} • ${item.size}</p>
                        <p class="price">$${item.price.toLocaleString()}</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
                <div class="cart-item-total">
                    <p>$${itemTotal.toLocaleString()}</p>
                </div>
            </div>
        `;
    }).join('');
    
    if (totalElement) totalElement.textContent = `$${total.toLocaleString()}`;
}

function updateQuantity(artworkId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(artworkId);
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === artworkId);
    
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        renderCartPage(); // Refresh cart page if on cart page
    }
}

function setupCheckoutForm() {
    const form = document.querySelector('.checkout-form');
    const placeOrderBtn = document.querySelector('.place-order-button');
    
    placeOrderBtn?.addEventListener('click', async function(e) {
        e.preventDefault();
        
        // Validate form
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.email || !data.name || !data.address) {
            showNotification('Please fill in all required fields');
            return;
        }
        
        // Get cart data
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        
        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Prepare order data
        const orderData = {
            ...data,
            items: cart,
            total: total,
            orderId: generateOrderId(),
            date: new Date().toISOString()
        };
        
        // Show loading state
        this.textContent = 'Processing...';
        this.disabled = true;
        
        try {
            // In production, this would send to your backend
            // For now, we'll simulate API call
            await simulateOrderProcessing(orderData);
            
            // Clear cart
            localStorage.removeItem('cart');
            updateCartDisplay();
            
            // Redirect to success page
            window.location.href = 'order-success.html';
            
        } catch (error) {
            console.error('Order processing error:', error);
            showNotification('Failed to process order. Please try again.');
            
            // Reset button
            this.textContent = 'Place Order';
            this.disabled = false;
        }
    });
}

function generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

async function simulateOrderProcessing(orderData) {
    // Simulate API delay
    return new Promise(resolve => {
        setTimeout(() => {
            // In production, implement:
            // 1. Save order to database
            // 2. Process payment (Stripe, PayPal, etc.)
            // 3. Send confirmation emails
            // 4. Send WhatsApp notification to artist
            sendConfirmationEmails(orderData);
            sendWhatsAppNotification(orderData);
            resolve({ success: true });
        }, 1500);
    });
}

function sendConfirmationEmails(orderData) {
    // Email to buyer
    const buyerEmail = {
        to: orderData.email,
        subject: `Order Confirmation - ${orderData.orderId}`,
        body: `
            Thank you for your purchase!
            
            Order ID: ${orderData.orderId}
            Date: ${new Date(orderData.date).toLocaleDateString()}
            
            Items:
            ${orderData.items.map(item => `
                ${item.title} - ${item.quantity} × $${item.price} = $${item.price * item.quantity}
            `).join('')}
            
            Total: $${orderData.total}
            
            Shipping to:
            ${orderData.name}
            ${orderData.address}
            ${orderData.city}, ${orderData.zip}
            ${orderData.country}
            
            We'll notify you when your order ships.
            
            Best regards,
            Lina Art Studio
        `
    };
    
    // Email to artist
    const artistEmail = {
        to: 'studio@artfullina.com', // Artist's email
        subject: `New Order Received - ${orderData.orderId}`,
        body: `
            New order received!
            
            Order ID: ${orderData.orderId}
            Customer: ${orderData.name}
            Email: ${orderData.email}
            Phone: ${orderData.phone || 'Not provided'}
            
            Items:
            ${orderData.items.map(item => `
                ${item.title} (${item.size})
                Medium: ${item.medium}
                Quantity: ${item.quantity}
                Price: $${item.price}
            `).join('\n')}
            
            Total: $${orderData.total}
            
            Shipping address:
            ${orderData.address}
            ${orderData.city}, ${orderData.zip}
            ${orderData.country}
            
            Customer notes: ${orderData.notes || 'None'}
            
            Please prepare the artwork for shipping.
        `
    };
    
    // In production, integrate with email service like SendGrid, Mailgun, etc.
    console.log('Email to buyer:', buyerEmail);
    console.log('Email to artist:', artistEmail);
}

function sendWhatsAppNotification(orderData) {
    // Create WhatsApp message for artist
    const message = `New order received!
    
Order ID: ${orderData.orderId}
Customer: ${orderData.name}
Total: $${orderData.total}

Items: ${orderData.items.length} artwork(s)

Please check your email for details.`;

    const whatsappUrl = `https://wa.me/923199928963?text=${encodeURIComponent(message)}`;
    
    // In production, you might want to use a backend service to send this
    // For now, we'll just log it
    console.log('WhatsApp notification URL:', whatsappUrl);
    
    // Optionally open WhatsApp in a new tab
    // window.open(whatsappUrl, '_blank');
}

// Export functions
window.updateQuantity = updateQuantity;