// lightbox.js
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox-overlay');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDetails = document.querySelector('.lightbox-details');
    const lightboxPrice = document.querySelector('.lightbox-price');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Make all artwork images clickable
    document.querySelectorAll('.artwork-image').forEach(image => {
        image.addEventListener('click', function(e) {
            e.preventDefault();
            const artworkCard = this.closest('.artwork-card');
            const title = artworkCard.querySelector('.artwork-title')?.textContent || 'Untitled';
            const details = artworkCard.querySelector('.artwork-details')?.textContent || '';
            const price = artworkCard.querySelector('.artwork-price')?.textContent || '';
            const imageUrl = this.style.backgroundImage.slice(5, -2);
            
            openLightbox(imageUrl, title, details, price);
        });
    });
    
    function openLightbox(imageUrl, title, details, price) {
        lightboxImage.src = imageUrl;
        lightboxTitle.textContent = title;
        lightboxDetails.textContent = details;
        lightboxPrice.textContent = price;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});