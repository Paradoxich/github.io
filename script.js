// Canvas Setup
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Dot Configuration
const dots = [];
const spacing = 25;
const mouseRadius = 80;
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
    repulsion: 0.15,
    returnStrength: 0.05,
    friction: 0.85
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

// Your existing carousel JavaScript below
// ...



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
