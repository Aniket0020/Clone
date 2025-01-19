const slides = document.querySelector(".slides");
const slideCount = document.querySelectorAll(".slides .slide").length;
let currentIndex = 0;

function showSlide(index) {
  if (index >= slideCount) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = slideCount - 1;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100;
  slides.style.transform = `translateX(${offset}%)`;
}

// Auto-slide functionality
setInterval(function () {
  showSlide(currentIndex + 1);
}, 3000); // Slide every 3 seconds

showSlide(currentIndex); // Initialize slider
