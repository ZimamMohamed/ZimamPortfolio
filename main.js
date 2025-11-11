// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Typing Effect
const textArray = [
  "Software Engineer",
  "UI/UX Designer",
  "IT Support Specialist",
  "UX Researcher"
];

let typingElement = document.getElementById("typing-text");
let arrayIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
let typingSpeed = 120;
let deleteSpeed = 60;
let delayBetweenWords = 1000;

function typeEffect() {
  currentText = textArray[arrayIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      arrayIndex = (arrayIndex + 1) % textArray.length;
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenWords);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? deleteSpeed : typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        alert('✅ Thank you! Your message has been sent successfully.');
        form.reset();
      } else {
        alert('❌ Oops! Something went wrong. Please try again.');
      }
    });
  });

  const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuIcon.classList.toggle('active');
});

// Close menu when clicking a link (optional)
document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuIcon.classList.remove('active');
  });
});


  