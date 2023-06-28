document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide-show .slide");
    let currentSlide = 0;
  
    function showSlide(n) {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].style.display = "block";
    }
  
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
  
    setInterval(nextSlide, 3000); // Automatyczne przewijanie co 3 sekundy
  
    showSlide(currentSlide);
  });