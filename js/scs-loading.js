// Hide content initially to prevent flashing
// document.documentElement.style.visibility = 'hidden'; // REMOVE this line to avoid hiding on refresh

// Check if this is a language switch before anything else
const isLanguageSwitch = sessionStorage.getItem('language-switch') === 'true';

// If it's a language switch, make content visible immediately
if (isLanguageSwitch) {
    document.documentElement.style.visibility = 'visible';
    // Clear the flag
    sessionStorage.removeItem('language-switch');
}

document.addEventListener('DOMContentLoaded', function() {
    // Only show loading overlay if this is the user's first visit to this page (per localStorage)
    const pageKey = 'scs-visited-' + window.location.pathname;
    if (!localStorage.getItem(pageKey)) {
        // If it's a language switch, don't show loading overlay at all
        if (isLanguageSwitch) {
            document.documentElement.style.visibility = 'visible';
            return;
        }
        
        // Check if we're currently in a navigation process
        const isNavigating = localStorage.getItem('scs-navigating');
        
        // Remove any existing loading overlays first
        const existingOverlay = document.getElementById('scs-loading-overlay');
        if (existingOverlay) {
            existingOverlay.parentNode.removeChild(existingOverlay);
        }
        
        // Determine the correct path prefix based on current location
        let pathPrefix = '';
        if (window.location.pathname.includes('/ar/') || window.location.pathname.includes('/en/')) {
            pathPrefix = '../';
        }
        
        // Create loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'scs-loading-overlay';
        loadingOverlay.id = 'scs-loading-overlay';
        
        // Create logo container
        const logoContainer = document.createElement('div');
        logoContainer.className = 'scs-logo-container';
        
        // Create loading circle
        const loadingCircle = document.createElement('div');
        loadingCircle.className = 'scs-loading-circle';
        
        // Create cloud image with correct path
        const cloudImg = document.createElement('img');
        cloudImg.src = pathPrefix + 'images/cloud.png';
        cloudImg.alt = 'Cloud';
        cloudImg.className = 'scs-cloud-img';
        
        // Create mountain image with correct path
        const mountainImg = document.createElement('img');
        mountainImg.src = pathPrefix + 'images/koth.png';
        mountainImg.alt = 'Mountains';
        mountainImg.className = 'scs-mountain-img';
        
        // Append elements
        logoContainer.appendChild(loadingCircle);
        logoContainer.appendChild(cloudImg);
        logoContainer.appendChild(mountainImg);
        loadingOverlay.appendChild(logoContainer);
        document.body.appendChild(loadingOverlay);
        
        // Create additional loading circles
        createAdditionalCircles(logoContainer);
        
        // Show loading overlay immediately
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.opacity = '1';
        
        // If we were navigating, clear the flag now that we've shown the loading screen
        if (isNavigating) {
            localStorage.removeItem('scs-navigating');
        }
        
        // Replace all link click handlers
        document.querySelectorAll('a').forEach(link => {
            // Skip links that are just anchors
            if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
                return;
            }
            // Skip external links (like LinkedIn)
            if (link.classList.contains('external-link')) {
                // Let the browser handle it normally (no loading overlay)
                return;
            }
            // Check if this is a language switcher link
            const isLanguageSwitcher = link.classList.contains('language-switcher') || 
                                      link.classList.contains('language-link') ||
                                      (link.getAttribute('href') && 
                                       (link.getAttribute('href').includes('/ar/') || 
                                        link.getAttribute('href').includes('/en/')));
            // Store the original href
            const originalHref = link.getAttribute('href');
            // Replace the link's onclick handler
            link.onclick = function(e) {
                e.preventDefault();
                // For language switchers, set a flag to prevent double loading
                if (isLanguageSwitcher) {
                    sessionStorage.setItem('language-switch', 'true');
                }
                // Set the navigating flag in localStorage
                localStorage.setItem('scs-navigating', 'true');
                // Show the loading overlay
                loadingOverlay.style.display = 'flex';
                loadingOverlay.style.opacity = '1';
                // Navigate after a short delay
                setTimeout(function() {
                    window.location.href = originalHref;
                }, 500);
                return false;
            };
        });
        
        // Main page auto-redirect logic
        const isMainPage = window.location.pathname.endsWith('index.html') || 
                          window.location.pathname === '/' || 
                          window.location.pathname.endsWith('/html/') ||
                          window.location.pathname === '/home/whitehat/html/';
        
        // Check if we should auto-redirect
        const shouldAutoRedirect = isMainPage && !sessionStorage.getItem('scs-visited-main');
        
        if (shouldAutoRedirect) {
            // Mark that we've visited the main page
            sessionStorage.setItem('scs-visited-main', 'true');
            
            // Wait a short time before redirecting
            setTimeout(function() {
                // Get the user language
                const userLang = navigator.language || navigator.userLanguage;
                // Redirect based on language
                if (userLang.startsWith('ar')) {
                    window.location.href = 'ar/index.html';
                } else {
                    window.location.href = 'en/index.html';
                }
            }, 1500);
        } else {
            // If we're not auto-redirecting, hide the loading after a short time
            setTimeout(function() {
                document.documentElement.style.visibility = 'visible';
                loadingOverlay.style.opacity = '0';
                setTimeout(function() {
                    loadingOverlay.style.display = 'none';
                }, 300);
                localStorage.setItem(pageKey, 'true');
            }, 1000); // Show loader for 1s on first visit
        }
    } else {
        // If already visited, just show content
        document.documentElement.style.visibility = 'visible';
    }
});

// Also handle the window load event to ensure everything is fully loaded
window.addEventListener('load', function() {
    // Make sure the page is visible after everything is loaded
    document.documentElement.style.visibility = 'visible';
});

function createAdditionalCircles(logoContainer) {
    // Create a second loading circle that rotates in the opposite direction
    const secondCircle = document.createElement('div');
    secondCircle.classList.add('scs-loading-circle');
    secondCircle.style.width = '100%';
    secondCircle.style.height = '100%';
    secondCircle.style.borderTop = 'none';
    secondCircle.style.borderRight = '4px solid rgba(255, 255, 255, 0.7)';
    secondCircle.style.animation = 'scs-spin 3s linear infinite reverse';
    
    logoContainer.appendChild(secondCircle);
    
    // Create a third loading circle with dashed border
    const thirdCircle = document.createElement('div');
    thirdCircle.classList.add('scs-loading-circle');
    thirdCircle.style.width = '95%';
    thirdCircle.style.height = '95%';
    thirdCircle.style.border = '2px dashed rgba(255, 255, 255, 0.5)';
    thirdCircle.style.animation = 'scs-spin 5s linear infinite';
    
    logoContainer.appendChild(thirdCircle);
    
    // Add some interactivity - make the cloud move slightly with mouse movement
    document.addEventListener('mousemove', (e) => {
        const cloudImg = document.querySelector('.scs-cloud-img');
        const mountainImg = document.querySelector('.scs-mountain-img');
        
        if (!cloudImg || !mountainImg) return;
        
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        cloudImg.style.transform = `translateX(calc(-50% + ${xAxis}px)) translateY(calc(${yAxis}px + ${getFloatOffset(0)}px))`;
        mountainImg.style.transform = `translateX(calc(-50% + ${xAxis * 0.5}px)) translateY(calc(${yAxis * 0.5}px + ${getFloatOffset(1)}px))`;
    });
}

// Helper function to get the current float offset based on the animation
function getFloatOffset(offset) {
    const time = Date.now() / 1000;
    const period = 6; // Same period for both cloud and mountain (6 seconds)
    
    if (offset === 0) {
        // Cloud moves down toward mountain
        return Math.sin(time * (2 * Math.PI / period)) * 5;
    } else {
        // Mountain moves up toward cloud
        return -Math.sin(time * (2 * Math.PI / period)) * 5;
    }
}
