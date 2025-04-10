const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const cardWidth = 400; // Should match your CSS card width
const gap = 30;

// Arrow controls
prevButton.addEventListener('click', () => {
    carousel.scrollBy({
        left: -(cardWidth + gap),
        behavior: 'smooth'
    });
});

nextButton.addEventListener('click', () => {
    carousel.scrollBy({
        left: cardWidth + gap,
        behavior: 'smooth'
    });
});

// Hide arrows at scroll boundaries
const updateArrows = () => {
    prevButton.style.visibility = carousel.scrollLeft > 0 ? 'visible' : 'hidden';
    nextButton.style.visibility = carousel.scrollLeft < 
        (carousel.scrollWidth - carousel.clientWidth - 10) ? 'visible' : 'hidden';
};

carousel.addEventListener('scroll', updateArrows);
window.addEventListener('resize', updateArrows);
updateArrows(); // Initial check
