const carousel = document.querySelector('.carousel');
let isDragging = false;
let startPos = 0;
let currentScroll = 0;

carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startPos = e.pageX;
  currentScroll = carousel.scrollLeft;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  carousel.scrollLeft = currentScroll + (startPos - e.pageX);
});

carousel.addEventListener('touchstart', (e) => {
  isDragging = true;
  startPos = e.touches[0].clientX;
  currentScroll = carousel.scrollLeft;
});

