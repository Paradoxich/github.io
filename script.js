const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const cardWidth = 400; // Should match your CSS card width
const gap = 30;

// Anime.js Dot Background
const container = document.getElementById('dotContainer');
const dots = [];
const cols = 30;
const rows = 20;
const disperseRadius = 80;

// Create dots
for(let i = 0; i < cols * rows; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  container.appendChild(dot);
  dots.push({
    el: dot,
    x: (i % cols) * (100 / cols),
    y: Math.floor(i / cols) * (100 / rows)
  });
}

// Position dots
dots.forEach(dot => {
  anime.set(dot.el, {
    translateX: `${dot.x}vw`,
    translateY: `${dot.y}vh`
  });
});

// Mouse move handler
document.addEventListener('mousemove', (e) => {
  anime({
    targets: dots,
    duration: 1000,
    easing: 'easeOutExpo',
    update: function() {
      dots.forEach(dot => {
        const rect = dot.el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + 1.5);
        const dy = e.clientY - (rect.top + 1.5);
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        if(distance < disperseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (disperseRadius - distance) * 0.4;
          
          anime.set(dot.el, {
            translateX: `${dot.x}vw + ${Math.cos(angle) * force}px`,
            translateY: `${dot.y}vh + ${Math.sin(angle) * force}px`
          });
        } else {
          anime.set(dot.el, {
            translateX: `${dot.x}vw`,
            translateY: `${dot.y}vh`
          });
        }
      });
    }
  });
});


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
