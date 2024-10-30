// PAGE SWITCH TRANSITION

// document.addEventListener("DOMContentLoaded", () => {
//   // Check if there's a hash in the URL on page load
//   const hash = window.location.hash;
//   if (hash) {
//     const targetElement = document.querySelector(hash);
//     if (targetElement) {
//       targetElement.scrollIntoView({
//         behavior: 'smooth'
//       });
//     }
//   }
// });


// GALAXY ANIMATION 

const landingPage = document.querySelector('.landing-page');
const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      let star = document.createElement("div");
      star.classList.add("star");

      // Random size, position, and animation duration
      let size = Math.random() * 0.5 + '%';
      star.style.width = size;
      star.style.height = size;
      star.style.top = Math.random() * 100 + 'vh';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.animationDuration = `${Math.random() * 10 + 5}s, ${Math.random() * 13 + 1}s`;
      
      landingPage.appendChild(star);
}

// NAVIGATION ANIMATION

const navLink = document.querySelectorAll('.breakpoint');
navLink.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetSection = document.getElementById(this.getAttribute('href').slice(1)); // Get target section element by ID
    const scrollY = targetSection.offsetTop; 
      window.scrollTo({
      top: scrollY,
      behavior: 'smooth' 
    });
  });
});

// SCROLL ANIMATION

function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // Calculate the position where the element should start appearing (half of the element's height)
  var appearancePosition = windowHeight - (element.clientHeight / 0.55);

  // Check if the element's top position is less than or equal to the appearancePosition
  return rect.top <= appearancePosition;
}

function animateScrollElements() {
  var scrollAnimations = document.querySelectorAll('.scroll-animation');
  for (var i = 0; i < scrollAnimations.length; i++) {
    var element = scrollAnimations[i];
    if (isElementInViewport(element)) {
      element.classList.add('show');
    } else {
      element.classList.remove('show'); // Reset the animation state when element is not in viewport
    }
  }
}

window.addEventListener('scroll', animateScrollElements);

animateScrollElements();

// SCROLL ANUMATION FOR BIGGER ELEMENTS

function isElementInViewportTwo(element) {
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // Calculate the position where the element should start appearing (half of the element's height)
  var appearancePosition = windowHeight - (element.clientHeight / 1.4);

  // Check if the element's top position is less than or equal to the appearancePosition
  return rect.top <= appearancePosition;
}

function animateScrollElementsTwo() {
  var scrollAnimations = document.querySelectorAll('.scroll-animation-two');
  for (var i = 0; i < scrollAnimations.length; i++) {
    var element = scrollAnimations[i];
    if (isElementInViewportTwo(element)) {
      element.classList.add('show');
    } else {
      element.classList.remove('show'); // Reset the animation state when element is not in viewport
    }
  }
}

window.addEventListener('scroll', animateScrollElementsTwo);

animateScrollElementsTwo();

// SCROLL ANUMATION FOR SLOWEST ELEMENTS


function isElementInViewportThree(element) {
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // Calculate the position where the element should start appearing (half of the element's height)
  var appearancePosition = windowHeight - (element.clientHeight / 0.55);

  // Check if the element's top position is less than or equal to the appearancePosition
  return rect.top <= appearancePosition;
}

function animateScrollElementsThree() {
  var scrollAnimations = document.querySelectorAll('.scroll-animation-three');
  for (var i = 0; i < scrollAnimations.length; i++) {
    var element = scrollAnimations[i];
    if (isElementInViewportThree(element)) {
      element.classList.add('show');
    } else {
      element.classList.remove('show'); // Reset the animation state when element is not in viewport
    }
  }
}

window.addEventListener('scroll', animateScrollElementsThree);

animateScrollElementsThree();

// DEX FORM SUBMISSION

const prices = {
  "6 hours": { "1-3": 600, "4-6": 450, "7-10": 300},
  "12 hours": { "1-3": 1500, "4-6": 1000, "7-10": 800},
  "24 hours": { "1-3": 3000, "4-6": 2000, "7-10": 1500 },
  "48 hours": { "1-3": 6000, "4-6": 5000, "7-10": 4000 },
};

const trendDurationSelect = document.getElementById("duration-dropdown");
const trendPlacementSelect = document.getElementById("placement-dropdown");
const priceInput = document.getElementById("price");
let button = document.getElementById('submitButton');
let overlay = document.getElementById('overlay');

function updatePrice() {
  const duration = trendDurationSelect.value;
  const placement = trendPlacementSelect.value;
  
  if (duration && placement) {
      priceInput.value = `$${prices[duration][placement]}`;
  } else {
      priceInput.value = "";
  }
}

trendDurationSelect.addEventListener("change", updatePrice);
trendPlacementSelect.addEventListener("change", updatePrice);

function sendMail() { 
  const form = document.getElementById('form');

  if (!form.checkValidity()) {
      form.reportValidity(); // Triggers the native HTML5 validation messages
      return; // Stop if any required fields are missing
  }
  
  overlay.style.display = 'flex';
  button.disabled = true;

  let params = {
      name: document.getElementById('name').value,
      contact: document.getElementById('contact').value,
      chain: document.getElementById('chain').value,
      link: document.getElementById('dx-link').value,
      trendDuration: trendDurationSelect.value,
      trendPlacement: trendPlacementSelect.value,
      price: priceInput.value,
  };

  emailjs.send("service_hvqf4yt", "template_x1jr3qa", params)
      .then(() => {
          button.textContent = 'form has been submitted successfully!'  
          button.style.backgroundColor = '#106d7f';
          button.style.color = '#ffffff';

          // alert('Your form has been submitted successfully!');
          clearForm();
          // window.location.href = "https://chatgpt.com";
      })
      .catch((error) => {
          alert('There was an error sending your form. Please try again later.');
          console.error("EmailJS Error:", error);
      })
      .finally(() => {
          // Hide loading message and re-enable the submit button after the request completes
          overlay.style.display = 'none';
          button.disabled = false;
  });
}

function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('contact').value = '';
  document.getElementById('chain').value = '';
  trendDurationSelect.value = '';
  trendPlacementSelect.value = '';
  priceInput.value = '';
  document.getElementById('dx-link').value = '';
}