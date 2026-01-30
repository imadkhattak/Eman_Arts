// Email service integration using EmailJS or similar service

const EMAIL_SERVICE_CONFIG = {
    serviceId: 'your_emailjs_service_id', // Replace with your EmailJS service ID
    templateId: 'your_template_id', // Replace with your template ID
    userId: 'your_user_id' // Replace with your EmailJS user ID
};

// Initialize EmailJS (if using)
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAIL_SERVICE_CONFIG.userId);
}

async function sendOrderEmail(orderData, recipientType = 'buyer') {
    // You can use EmailJS, SendGrid, or your own backend
    
    const templateParams = {
        order_id: orderData.orderId,
        customer_name: orderData.name,
        customer_email: orderData.email,
        order_date: new Date(orderData.date).toLocaleDateString(),
        order_items: orderData.items.map(item => 
            `${item.title} - ${item.quantity} × $${item.price}`
        ).join(', '),
        order_total: `$${orderData.total}`,
        shipping_address: `${orderData.address}, ${orderData.city}, ${orderData.zip}, ${orderData.country}`,
        artist_email: 'studio@artfullina.com',
        artist_phone: '+92 319 9928963'
    };

    try {
        if (typeof emailjs !== 'undefined') {
            await emailjs.send(
                EMAIL_SERVICE_CONFIG.serviceId,
                recipientType === 'buyer' ? 'buyer_template' : 'artist_template',
                templateParams
            );
            return true;
        } else {
            // Fallback to fetch API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...templateParams,
                    recipient_type: recipientType
                })
            });
            
            return response.ok;
        }
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
}

// Export for use in cart.js
window.sendOrderEmail = sendOrderEmail;