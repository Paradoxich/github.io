const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const cardWidth = 400; // Should match your CSS card width
const gap = 30;

// Generate dots
const container = document.createElement('div');
container.id = 'dot-container';
document.body.prepend(container);

const cols = 40;
const rows = 25;
const dots = [];

for(let i = 0; i < cols * rows; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.style.left = `${(i % cols) * (100 / cols)}%`;
  dot.style.top = `${Math.floor(i / cols) * (100 / rows)}%`;
  container.appendChild(dot);
  dots.push(dot);
}

// Initialize Magnet Mouse
const mm = new MagnetMouse({
  magnet: {
    element: '.dot',
    distance: 160, // Match your 80px request
    position: 'center',
    enabled: true
  },
  throttle: 16 // 60fps
});

mm.init();

// Disable on mobile
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  mm.destroy();
  document.querySelectorAll('.dot').forEach(dot => dot.remove());
}



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
