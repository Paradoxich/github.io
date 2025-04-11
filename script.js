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


//Carousel scroll
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const cards = gsap.utils.toArray('.card');
  let currentScroll = 0;
  let targetScroll = 0;
  const cardWidth = 400;
  const gap = 32; // Match CSS gap value
  
  // Set initial positions
gsap.set(cards, {
  x: (i) => i * (cardWidth + gap),
  scale: 0.95, // Less scaling for closer appearance
  opacity: 0.9 // Higher minimum opacity
});


  function handleScroll(e) {
    targetScroll += (e.deltaY || e.deltaX) * 0.5;
    targetScroll = gsap.utils.clamp(0, carousel.scrollWidth - carousel.clientWidth, targetScroll);
    
    if (!this.isAnimating) {
      this.isAnimating = true;
      requestAnimationFrame(animate);
    }
  }

  function animate() {
    currentScroll += (targetScroll - currentScroll) * 0.08;
    
    cards.forEach((card, i) => {
      const cardCenter = i * (cardWidth + gap) - currentScroll + cardWidth/2;
      const containerCenter = carousel.clientWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      
      // Adjusted scale and opacity ranges
      const scale = gsap.utils.mapRange(0, 500, 1, 0.9, distance); // Less scaling down
      const opacity = gsap.utils.mapRange(0, 500, 1, 0.8, distance); // Higher minimum opacity
      
      gsap.to(card, {
        scale: scale,
        opacity: opacity,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    if (Math.abs(targetScroll - currentScroll) > 1) {
      requestAnimationFrame(animate);
    } else {
      this.isAnimating = false;
    }
  }

  // Keep existing event listeners
});

     
