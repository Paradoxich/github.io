const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const cardWidth = 400; // Should match your CSS card width
const gap = 30;

// After anime.js script load
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('dotContainer');
  if (!container) return;

  // Dot creation code
  const dots = [];
  const cols = 30, rows = 20;
  
  for(let i = 0; i < cols * rows; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    container.appendChild(dot);
    dots.push({
      el: dot,
      x: (i % cols) * (100 / cols),
      y: Math.floor(i / cols) * (100 / rows)
    });
  }

  // Mouse move handler
  let animationFrame;
  document.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(() => {
      dots.forEach(dot => {
        const rect = dot.el.getBoundingClientRect();
        const dx = e.clientX - rect.left;
        const dy = e.clientY - rect.top;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        anime.set(dot.el, {
          translateX: `${dot.x}vw ${distance < 80 ? `+ ${(80 - distance) * 0.3}px` : ''}`,
          translateY: `${dot.y}vh ${distance < 80 ? `+ ${(80 - distance) * 0.3}px` : ''}`
        });
      });
    });
  });

  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    dots.forEach(dot => {
      anime.set(dot.el, {
        translateX: `${dot.x}vw`,
        translateY: `${dot.y}vh`
      });
    });
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
