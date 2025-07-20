// Carousel Functionality
const carouselImages = [
  'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1511880200150-a6c01fc810b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1544464077-376d969d5b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
];

const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

let currentIndex = 0;
let intervalId;

// Create Slides
carouselImages.forEach((img, index) => {
  const slide = document.createElement('div');
  slide.className = 'w-full flex-shrink-0';
  slide.innerHTML = `
    <img src="${img}" alt="Gallery Image ${index + 1}" class="w-full h-96 object-cover">
  `;
  carousel.appendChild(slide);
  
  // Create Indicators
  const indicator = document.createElement('button');
  indicator.className = `w-3 h-3 rounded-full ${index === 0 ? 'bg-[#F4C115]' : 'bg-white/50'}`;
  indicator.dataset.index = index;
  indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('#indicators button');

// Update Carousel Position
function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Update Active Indicator
  indicators.forEach((indicator, i) => {
    indicator.className = i === currentIndex ? 'w-3 h-3 rounded-full bg-[#F4C115]' : 'w-3 h-3 rounded-full bg-white/50';
  });
}

// Auto Slide
function startAutoSlide() {
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
  }, 5000); // Ganti slide setiap 5 detik
}

// Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % carouselImages.length;
  updateCarousel();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
  updateCarousel();
  resetAutoSlide();
});

// Indicator Click
indicators.forEach(indicator => {
  indicator.addEventListener('click', () => {
    currentIndex = parseInt(indicator.dataset.index);
    updateCarousel();
    resetAutoSlide();
  });
});

// Reset Timer on Interaction
function resetAutoSlide() {
  clearInterval(intervalId);
  startAutoSlide();
}

// Initialize
startAutoSlide();