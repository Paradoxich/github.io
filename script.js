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
    this.container = document.querySelector('.carousel-container');
    this.carousel = document.querySelector('.carousel');
    this.cards = document.querySelectorAll('.card');
    this.radius = 1000; // Adjust circle size
    this.angle = 0;
    this.init();
  }

  init() {
    this.positionCards();
    this.addEventListeners();
  }

  positionCards() {
    const total = this.cards.length;
    this.cards.forEach((card, i) => {
      const theta = (i * (360 / total) + this.angle) * Math.PI / 180;
      const x = Math.sin(theta) * this.radius;
      const z = (Math.cos(theta) * this.radius) - this.radius;
      
      card.style.transform = `
        translateX(${x}px)
        translateZ(${z}px)
        rotateY(${-this.angle}deg)
      `;
      card.style.opacity = z > -this.radius/2 ? 1 : 0.5;
    });
  }

  addEventListeners() {
    let isDragging = false;
    let startX;
    let startAngle;

    // Mouse/Wheel
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.angle += e.deltaY * 0.2;
      this.positionCards();
    });

    this.container.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startAngle = this.angle;
    });

    document.addEventListener('mousemove', (e) => {
      if(!isDragging) return;
      this.angle = startAngle + (e.clientX - startX);
      this.positionCards();
    });

    document.addEventListener('mouseup', () => isDragging = false);

    // Touch
    this.container.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      startAngle = this.angle;
    });

    document.addEventListener('touchmove', (e) => {
      if(!isDragging) return;
      this.angle = startAngle + (e.touches[0].clientX - startX);
      this.positionCards();
    });

    document.addEventListener('touchend', () => isDragging = false);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new RisographCarousel();
});



