// Lightbox Modal Functionality

document.addEventListener('DOMContentLoaded', function() {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDetails = document.querySelector('.lightbox-details');
    const lightboxPrice = document.querySelector('.lightbox-price');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Make all artwork images clickable
    document.addEventListener('click', function(e) {
        if (e.target.closest('.artwork-image')) {
            e.preventDefault();
            const artworkCard = e.target.closest('.artwork-card');
            
            if (artworkCard) {
                const title = artworkCard.querySelector('.artwork-title')?.textContent || 'Untitled';
                const details = artworkCard.querySelector('.artwork-details')?.textContent || '';
                const price = artworkCard.querySelector('.artwork-price')?.textContent || '';
                const imageUrl = e.target.closest('.artwork-image').style.backgroundImage.slice(5, -2);
                
                openLightbox(imageUrl, title, details, price);
            }
        }
    });
    
    function openLightbox(imageUrl, title, details, price) {
        if (lightboxImage && lightboxTitle && lightboxDetails && lightboxPrice && lightboxOverlay) {
            lightboxImage.src = imageUrl;
            lightboxTitle.textContent = title;
            lightboxDetails.textContent = details;
            lightboxPrice.textContent = price;
            lightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLightbox() {
        if (lightboxOverlay) {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Click outside to close
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', function(e) {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });
    }
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});
