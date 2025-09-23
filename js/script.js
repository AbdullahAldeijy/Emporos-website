// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');
const cloudImage = document.getElementById('cloud-image');
const klothImage = document.getElementById('kloth-image');
const mergeContainer = document.querySelector('.merge-animation-container');
const languageToggle = document.getElementById('language-toggle');

// Current language (default is Arabic)
let currentLanguage = 'ar';

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a saved language preference in localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        applyLanguage(currentLanguage);
    }
    
    // Initialize other components
    initStickyHeader();
    initMobileMenu();
    initKothAnimation();
    initServiceAnimations();
    initTechIcons();
    initSmoothScrolling();
});

// Language toggle
languageToggle.addEventListener('click', () => {
    // Toggle between Arabic and English
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    
    // Save preference to localStorage
    localStorage.setItem('language', currentLanguage);
    
    // Apply the selected language
    applyLanguage(currentLanguage);
});

// Apply language to the page
function applyLanguage(lang) {
    // Set HTML direction and language attributes
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// Sticky Header
function initStickyHeader() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(0, 52, 89, 0.95)'; // Darker, more opaque when scrolled
            header.style.boxShadow = '0 2px 15px rgba(0, 52, 89, 0.5)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(0, 52, 89, 0.75)'; // Original watery blue with transparency
            header.style.boxShadow = '0 2px 15px rgba(0, 52, 89, 0.3)';
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    // Always hide the hamburger menu on mobile
    function hideMenuToggleOnMobile() {
        if (window.innerWidth <= 900) {
            menuToggle.style.display = 'none';
        } else {
            menuToggle.style.display = '';
        }
    }
    hideMenuToggleOnMobile();
    window.addEventListener('resize', hideMenuToggleOnMobile);
    // No click handler needed since the menu toggle is hidden on mobile
}

// Create particles for logo background
function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 6 + 2;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.3;
    
    // Random animation duration
    const duration = Math.random() * 10 + 5;
    
    // Set styles
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration * 1000);
}

// Initialize KOTH animation - removed as images are no longer used
function initKothAnimation() {
    // Function kept for compatibility but no longer does anything
    return;
}

// Initialize service card animations
function initServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// Initialize tech icons animations
function initTechIcons() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    if (techIcons.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    techIcons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(30px)';
        icon.style.transition = 'all 0.5s ease';
        observer.observe(icon);
    });
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
}

// Initialize contact form animations
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add animation to form elements
        const formElements = contactForm.querySelectorAll('.form-group, button');
        
        formElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
        
        // Handle form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For now, just show a success message
            const formGroups = contactForm.querySelectorAll('.form-group');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                formGroups.forEach(group => {
                    const input = group.querySelector('input, textarea');
                    if (input) input.value = '';
                });
                
                submitButton.textContent = 'Message Sent!';
                submitButton.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
});

// Show loading overlay for first-time visitors
function showInitialLoadingIfFirstVisit() {
  var isFirstVisit = !localStorage.getItem('spa-visited');
  if (isFirstVisit) {
    // Hide body content
    document.body.style.visibility = 'hidden';
    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'spa-loading-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.background = '#fff';
    overlay.style.zIndex = 9999;
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.fontSize = '2em';
    overlay.style.color = '#0072C6';
    overlay.innerHTML = '<div><img src="images/logo2.png" alt="Lunixa Logo" style="width:100px;display:block;margin:0 auto 20px auto;"><div style="text-align:center;">Loading...</div></div>';
    document.body.appendChild(overlay);
    setTimeout(function() {
      document.body.style.visibility = '';
      overlay.style.opacity = '0';
      setTimeout(function() { overlay.remove(); }, 500);
      localStorage.setItem('spa-visited', 'true');
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  showInitialLoadingIfFirstVisit();
});
