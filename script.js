// Canvas Setup
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Dot Configuration
const dots = [];
const spacing = 20;
const mouseRadius = 60;
const dotRadius = 1;

// Create Dot Grid
function createDots() {
  dots.length = 0; // Clear existing dots
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
}

createDots();

// Mouse Tracking with debounce for performance
let mouseX = -1000;
let mouseY = -1000;
let mouseTimeout;

function handleMouseMove(e) {
  clearTimeout(mouseTimeout);
  mouseX = e.clientX;
  mouseY = e.clientY;
}

document.addEventListener('mousemove', handleMouseMove);
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
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();
  });
  
  requestAnimationFrame(update);
}

// Handle Resize with debounce
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createDots();
  }, 200);
}

window.addEventListener('resize', handleResize);

// Start Animation
update();
