// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinksMobile = document.getElementById('navLinksMobile');
const mobileLinks = navLinksMobile.querySelectorAll('a');

hamburger.addEventListener('click', function () {
   hamburger.classList.toggle('active');
   navLinksMobile.classList.toggle('active');
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
   link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinksMobile.classList.remove('active');
   });
});

// Close mobile menu when scrolling
window.addEventListener('scroll', function () {
   hamburger.classList.remove('active');
   navLinksMobile.classList.remove('active');
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
   const navbar = document.getElementById('navbar');
   if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
   } else {
      navbar.classList.remove('scrolled');
   }
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileNavLinks = document.querySelectorAll('.nav-links-mobile a');

function updateActiveNav() {
   const scrollY = window.pageYOffset;

   sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
         navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
               link.classList.add('active');
            }
         });

         mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
               link.classList.add('active');
            }
         });
      }
   });
}

// Page-based active navigation (for separate pages like create-account, login)
function setActiveNavByPage() {
   const currentPage = window.location.pathname.split("/").pop();

   const allNavLinks = document.querySelectorAll(
      '.nav-links a, .nav-links-mobile a'
   );

   allNavLinks.forEach(link => {
      const linkHref = link.getAttribute('href');

      // Remove existing active
      link.classList.remove('active');

      // Match exact page
      if (linkHref === currentPage) {
         link.classList.add('active');
      }
   });
}

// Run once on page load
setActiveNavByPage();


window.addEventListener('scroll', updateActiveNav);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      }
   });
});




// Add slide up animation
const style = document.createElement('style');
style.textContent = `
            @keyframes slideUp {
                from {
                    transform: scaleY(0);
                    transform-origin: bottom;
                }
                to {
                    transform: scaleY(1);
                    transform-origin: bottom;
                }
            }
        `;
document.head.appendChild(style);

// Chart options interaction
document.querySelectorAll('.chart-options').forEach(optionGroup => {
   const options = optionGroup.querySelectorAll('.chart-option');
   options.forEach(option => {
      option.addEventListener('click', function () {
         options.forEach(opt => opt.classList.remove('active'));
         this.classList.add('active');
      });
   });
});

// ── Feedback Form — sends to backend API ─────────────────────────────────────
// 🔧 UPDATE THIS URL once your backend is deployed
//    e.g. "https://aquasense-backend.onrender.com/api/feedback"
const BACKEND_URL = "https://aquasense-landing-page.onrender.com";

document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
   e.preventDefault();

   const name    = document.getElementById('name').value.trim();
   const email   = document.getElementById('email').value.trim();
   const message = document.getElementById('message').value.trim();
   const ratingEl = document.querySelector('input[name="rating"]:checked');
   const rating  = ratingEl ? ratingEl.value : null;

   const formMessage = document.getElementById('formMessage');
   const submitBtn   = document.querySelector('.btnfeedback');

   // Client-side validation
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!name || !email || !message) {
      formMessage.style.color = "#ff6b6b";
      formMessage.textContent = "Please fill out all fields.";
      return;
   }
   if (!emailRegex.test(email)) {
      formMessage.style.color = "#ff6b6b";
      formMessage.textContent = "Please enter a valid email address.";
      return;
   }

   // Loading state
   const originalText = submitBtn.value;
   submitBtn.value    = "Sending…";
   submitBtn.disabled = true;
   formMessage.textContent = "";

   try {
      const res  = await fetch(BACKEND_URL, {
         method:  "POST",
         headers: { "Content-Type": "application/json" },
         body:    JSON.stringify({ name, email, message, rating }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
         formMessage.style.color = "#00ffcc";
         formMessage.textContent = "Thank you! Your feedback has been sent.";
         submitBtn.value    = "Feedback Sent ✓";
         submitBtn.style.background = "linear-gradient(135deg, #4ade80, #22c55e)";
         this.reset();

         setTimeout(() => {
            submitBtn.value    = originalText;
            submitBtn.style.background = "";
            formMessage.textContent    = "";
         }, 4000);
      } else {
         throw new Error(data.error || "Something went wrong.");
      }
   } catch (err) {
      formMessage.style.color = "#ff6b6b";
      formMessage.textContent = err.message || "Failed to send. Please try again.";
      submitBtn.value    = originalText;
   } finally {
      submitBtn.disabled = false;
   }
});