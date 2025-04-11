// Canvas Setup
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Dot Configuration
const dots = [];
const spacing = 24;
const mouseRadius = 60;
const dotRadius = 2;

// Create Dot Grid
for(let y = spacing/2; y < height; y += spacing) {
    for(let x = spacing/2; x < width; x += spacing) {
        dots.push({
            x: x,
            y: y,
            origX: x,
            origY: y,
            vx: 0,
            vy: 0
        });
    }
}

// Mouse Tracking
let mouseX = -1000;
let mouseY = -1000;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
});

// Physics Parameters
const physics = {
    repulsion: 0.12,
    returnStrength: 0.04,
    friction: 0.88
};

// Animation Loop
function update() {
    ctx.clearRect(0, 0, width, height);
    
    dots.forEach(dot => {
        // Mouse interaction
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if(dist < mouseRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseRadius - dist) * physics.repulsion;
            
            dot.vx += Math.cos(angle) * force;
            dot.vy += Math.sin(angle) * force;
        }
        
        // Return to original position
        dot.vx += (dot.origX - dot.x) * physics.returnStrength;
        dot.vy += (dot.origY - dot.y) * physics.returnStrength;
        
        // Apply friction
        dot.vx *= physics.friction;
        dot.vy *= physics.friction;
        
        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,107,107,0.4)'; // Use your color
        ctx.fill();
    });
    
    requestAnimationFrame(update);
}

// Handle Resize
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Start Animation
update();


// Carusel scroll
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const cards = document.querySelectorAll('.card');
  let scrollLeft = 0;
  let targetScroll = 0;
  let animating = false;

  // Set initial positions
  gsap.set(cards, {
    x: (i) => i * (400 + 30), // card width + gap
    scale: 0.9,
    opacity: 0.6,
    transformOrigin: 'center center'
  });

  // Horizontal scroll handler
  function handleScroll(e) {
    targetScroll += e.deltaY * 0.5; // Adjust sensitivity
    targetScroll = Math.max(targetScroll, 0);
    targetScroll = Math.min(targetScroll, carousel.scrollWidth - carousel.clientWidth);
    
    if (!animating) {
      animating = true;
      requestAnimationFrame(animate);
    }
  }

  // Animation loop
  function animate() {
    const diff = targetScroll - scrollLeft;
    scrollLeft += diff * 0.1; // Smoothing factor
    
    cards.forEach((card, i) => {
      const cardRect = card.getBoundingClientRect();
      const containerCenter = window.innerWidth / 2;
      const cardCenter = cardRect.left + cardRect.width/2;
      const distance = Math.abs(containerCenter - cardCenter);
      
      // Scale based on distance from center
      const scale = Math.max(0.9, 1 - distance * 0.001);
      // Opacity based on distance
      const opacity = Math.max(0.6, 1 - distance * 0.002);
      // Parallax effect
      const parallax = (containerCenter - cardCenter) * 0.2;

      gsap.to(card, {
        x: `+=${parallax}`,
        scale: scale,
        opacity: opacity,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    if (Math.abs(diff) > 0.5) {
      requestAnimationFrame(animate);
    } else {
      animating = false;
    }
  }

  // Event listeners
  window.addEventListener('wheel', handleScroll, { passive: false });
  
  // Optional: Add touch handling
  let touchStartX = 0;
  window.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  });
  
  window.addEventListener('touchmove', e => {
    handleScroll({ deltaY: (touchStartX - e.touches[0].clientX) * 2 });
    touchStartX = e.touches[0].clientX;
  });
});
