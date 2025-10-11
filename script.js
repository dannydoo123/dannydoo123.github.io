// ========================================
// TREASURE HUNT SYSTEM
// ========================================
const treasureHunt = {
  treasures: {
    1: {
      element: null,
      collected: false,
      name: "spotify",
      messages: {
        first: "Music fills the air... Hyemin loves music! Here's a playlist to listen to while exploring the website.",
        second: "A melody appears! Hyemin's curated playlist awaits. One more treasure to find...",
        third: "The final note plays! Enjoy Hyemin's playlist as you continue your journey."
      }
    },
    2: {
      element: null,
      collected: false,
      name: "perseverance",
      messages: {
        first: "Perseverance... A trait forged in challenging times. Two more secrets remain hidden on this page...",
        second: "During service, Hyemin faced stressful environments where perseverance was key. One treasure left to find...",
        third: "Perseverance—the final discovery! Hyemin's military service taught resilience under pressure."
      }
    },
    3: {
      element: null,
      collected: false,
      name: "basketball",
      messages: {
        first: "A basketball appears! Did you know Hyemin enjoys playing basketball? Keep exploring to discover more...",
        second: "A basketball! Hyemin's passion for the sport shines through. One more treasure awaits...",
        third: "The final piece reveals itself—a basketball! Hyemin's love for the game completes the picture."
      }
    }
  },
  collectedCount: 0,
  detectionRadius: 150, // pixels for flashlight detection

  init() {
    // Initialize treasure elements
    this.treasures[1].element = document.getElementById('treasure-1');
    this.treasures[2].element = document.getElementById('treasure-2');
    this.treasures[3].element = document.getElementById('treasure-3');

    // Add click listeners
    Object.keys(this.treasures).forEach(id => {
      const treasure = this.treasures[id];
      if (treasure.element) {
        treasure.element.addEventListener('click', (e) => {
          // Only prevent default and collect if not already collected
          if (!treasure.collected) {
            e.preventDefault();
            this.collectTreasure(id);
          }
          // If already collected, allow default link behavior (e.g., Spotify opens)
        });
      }
    });
  },

  checkProximity(mouseX, mouseY) {
    Object.keys(this.treasures).forEach(id => {
      const treasure = this.treasures[id];

      // Skip collected treasures entirely - don't touch their classes
      if (treasure.collected) return;

      if (treasure.element) {
        const rect = treasure.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouseX - centerX, 2) +
          Math.pow(mouseY - centerY, 2)
        );

        // Remove all proximity classes first (only for uncollected treasures)
        treasure.element.classList.remove('treasure-nearby', 'treasure-revealed');

        // Add appropriate class based on distance
        if (distance < this.detectionRadius * 0.5) {
          treasure.element.classList.add('treasure-revealed');
        } else if (distance < this.detectionRadius) {
          treasure.element.classList.add('treasure-nearby');
        }
      }
    });
  },

  collectTreasure(id) {
    const treasure = this.treasures[id];
    if (treasure.collected) return;

    // Mark as collected - keep all classes and add collected
    treasure.element.classList.add('treasure-collected');

    // Determine which message to show based on collection order
    let message;
    if (this.collectedCount === 0) {
      // First treasure found
      message = treasure.messages.first + " 1/3 treasures found...";
    } else if (this.collectedCount === 1) {
      // Second treasure found
      message = treasure.messages.second + " 2/3 treasures found...";
    } else {
      // Third/final treasure found
      message = treasure.messages.third + " 3/3 treasures found...";
    }

    // Update state after determining message
    treasure.collected = true;
    this.collectedCount++;

    showDialog(message);

    // Check if all treasures collected
    if (this.collectedCount === 3) {
      setTimeout(() => {
        this.completeQuest();
      }, 5000);
    }
  },

  completeQuest() {
    const finalMessage = "All three treasures hum in harmony.<br>You've seen more than most.<br>But every ending is a new beginning.";
    showDialog(finalMessage, () => {
      // Change background to background.webp after dialog finishes with parallax effect
      setTimeout(() => {
        // Add quest-complete class to enable all theme changes
        document.documentElement.classList.add('quest-complete');

        // Set initial background
        document.body.style.backgroundImage = 'url("images/background.webp")';
        document.body.style.backgroundPosition = 'center top';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'scroll';

        // Parallax scroll effect - background moves slower than content
        const parallaxSpeed = 0.25; // 50% speed - adjust between 0 (no movement) and 1 (normal speed)

        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          const parallaxOffset = scrolled * parallaxSpeed;
          document.body.style.backgroundPositionY = `${parallaxOffset}px`;
        });
      }, 1000);
    });
  }
};

// ========================================
// UNDERTALE-STYLE DIALOG SYSTEM
// ========================================
let typewriterTimeout = null;
let hideTimeout = null;

function showDialog(text, onComplete) {
  const dialogBox = document.getElementById('dialogBox');
  const dialogText = document.getElementById('dialogText');

  // Cancel any ongoing typewriter and hide animations
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  // Clear previous text
  dialogText.innerHTML = '';

  // Show dialog box
  dialogBox.classList.add('active');

  // Typewriter effect
  let index = 0;
  const speed = 50; // milliseconds per character

  function typeWriter() {
    if (index < text.length) {
      // Handle both <br> tags and regular characters
      if (text.substr(index, 4) === '<br>') {
        dialogText.innerHTML += '<br>';
        index += 4;
      } else {
        dialogText.innerHTML += text.charAt(index);
        index++;
      }
      typewriterTimeout = setTimeout(typeWriter, speed);
    } else {
      // Auto-hide after completion
      hideTimeout = setTimeout(() => {
        dialogBox.classList.remove('active');
        if (onComplete) onComplete();
      }, 3000);
    }
  }

  typeWriter();
}

// Initialize treasure hunt
window.addEventListener('DOMContentLoaded', () => {
  treasureHunt.init();
});

// ========================================
// FLASHLIGHT CURSOR EFFECT
// ========================================
// Flashlight cursor effect with throttling and distance-based activation
let mouseMoveTimeout;
const headers = document.querySelectorAll('.section-header h2, .contact-info h2');

document.addEventListener('mousemove', (e) => {
  // Throttle to 30ms for performance
  if (mouseMoveTimeout) return;

  mouseMoveTimeout = setTimeout(() => {
    mouseMoveTimeout = null;
  }, 30);

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Update global cursor position for background effect
  const x = (mouseX / window.innerWidth) * 100;
  const y = (mouseY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);

  // Check treasure proximity
  treasureHunt.checkProximity(mouseX, mouseY);

  // Update each header with actual pixel positions
  headers.forEach(header => {
    const rect = header.getBoundingClientRect();
    const headerCenterX = rect.left + rect.width / 2;
    const headerCenterY = rect.top + rect.height / 2;

    // Calculate distance from cursor to header center
    const distance = Math.sqrt(
      Math.pow(mouseX - headerCenterX, 2) +
      Math.pow(mouseY - headerCenterY, 2)
    );

    // Only activate effect if within 500px
    if (distance < 500) {
      const localX = mouseX - rect.left;
      const localY = mouseY - rect.top;
      header.style.setProperty('--header-mouse-x', `${localX}px`);
      header.style.setProperty('--header-mouse-y', `${localY}px`);
      header.style.setProperty('--header-active', '1');
    } else {
      header.style.setProperty('--header-active', '0');
    }
  });
});

// ========================================
// EMAILJS CONTACT FORM INTEGRATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.btn');
      const originalText = submitBtn.textContent;

      // Disable button and show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Send email using EmailJS
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
        .then(() => {
          // Success
          showDialog('Message sent successfully! I\'ll get back to you soon.');
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, (error) => {
          // Error
          showDialog('Oops! Something went wrong. Please try again or email me directly at dannydoo1234@gmail.com');
          console.error('EmailJS error:', error);
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});

// ========================================
// SMOOTH SCROLLING & NAVIGATION
// ========================================
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update active nav link
      document.querySelectorAll('.navbar a').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// ========================================
// EXPERIENCE ACCORDION
// ========================================
// Experience accordion functionality
document.querySelectorAll('.experience-header').forEach(header => {
  header.addEventListener('click', function() {
    const item = this.parentElement;
    const isActive = item.classList.contains('active');

    // Close all items
    document.querySelectorAll('.experience-item').forEach(exp => {
      exp.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ========================================
// BACK TO TOP BUTTON
// ========================================
// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// ACTIVE NAVIGATION ON SCROLL
// ========================================
// Update active nav on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.navbar a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========================================
// SCROLL-TRIGGERED ANIMATIONS
// ========================================
// Scroll-triggered animations with direction detection
const animatedElements = document.querySelectorAll('[data-animate]');
let lastScrollY = window.scrollY;

const observerOptions = {
  threshold: 0.2, // Trigger when 20% visible
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

  entries.forEach(entry => {
    const element = entry.target;
    const delay = element.getAttribute('data-delay') || 0;

    if (entry.isIntersecting) {
      // Element is visible
      setTimeout(() => {
        element.classList.add('animate-visible');
        element.classList.remove('animate-slide-up', 'animate-slide-down');
      }, delay);
    } else {
      // Element is not visible - reset animation
      element.classList.remove('animate-visible');
      if (scrollingDown) {
        element.classList.add('animate-slide-up');
        element.classList.remove('animate-slide-down');
      } else {
        element.classList.add('animate-slide-down');
        element.classList.remove('animate-slide-up');
      }
    }
  });

  lastScrollY = currentScrollY;
}, observerOptions);

// Observe all animated elements
animatedElements.forEach(element => {
  // Set initial state based on position
  const rect = element.getBoundingClientRect();
  if (rect.top > window.innerHeight) {
    element.classList.add('animate-slide-up');
  } else {
    element.classList.add('animate-slide-down');
  }
  observer.observe(element);
});
