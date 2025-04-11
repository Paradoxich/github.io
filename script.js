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



//3d carusel
class RisographCarousel {
  constructor() {
    this.carousel = document.querySelector('.carousel');
    this.cards = document.querySelectorAll('.card');
    this.angle = 0;
    this.currentAngle = 0;
    this.isDragging = false;
    this.startX = 0;
    this.radius = 500; // Adjust circle radius
    
    this.init();
    this.positionCards();
  }

  init() {
    // Mouse events
    document.addEventListener('wheel', this.handleWheel.bind(this));
    document.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));
    
    // Touch events
    document.addEventListener('touchstart', this.startDrag.bind(this));
    document.addEventListener('touchmove', this.drag.bind(this));
    document.addEventListener('touchend', this.endDrag.bind(this));
  }

  positionCards() {
    const total = this.cards.length;
    
    this.cards.forEach((card, i) => {
      const angle = (i * (360 / total)) + this.currentAngle;
      const rad = angle * Math.PI / 180;
      
      const x = Math.sin(rad) * this.radius;
      const z = Math.cos(rad) * this.radius;
    const scale = z > 0 ? 0.8 + (z / this.radius) * 0.2: 0.8;
      const opacity = z > 0 ? 1 : 0.5;

      card.style.transform = `
        translateX(${x}px)
        translateZ(${z}px)
        scale(${scale})
      `;
      card.style.opacity = opacity;
      card.style.zIndex = Math.floor(z);
    });
  }

  handleWheel(e) {
    e.preventDefault();
    this.currentAngle += e.deltaY * 0.3;
    this.positionCards();
  }

  startDrag(e) {
    this.isDragging = true;
    this.startX = e.clientX || e.touches[0].clientX;
  }

  drag(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    
    const x = e.clientX || e.touches[0].clientX;
    this.currentAngle += (x - this.startX) * 0.5;
    this.startX = x;
    this.positionCards();
  }

  endDrag() {
    this.isDragging = false;
  }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  new RisographCarousel();
});
