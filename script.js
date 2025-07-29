// Parallax and Slideshow Effect for Background Images
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const bgImages = document.querySelectorAll('.bg-image');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        // Calculate scroll position relative to the viewport's center
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Check if the current section is within the viewport
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.id;
            bgImages.forEach(bg => {
                if (bg.dataset.section === sectionId) {
                    // Add 'active' class to the corresponding background image
                    bg.classList.add('active');
                    // Remove 'animation' property after initial activation to prevent re-triggering
                    // This applies to all sections except 'home', which is handled separately for initial load
                    if (bg.dataset.section !== 'home') {
                        bg.style.animation = 'none';
                    }
                } else {
                    // Remove 'active' class from other background images
                    bg.classList.remove('active');
                }
            });
        }
    });
});

// Smooth Scrolling for Navigation Links and specific Score Item Links
document.querySelectorAll('nav a, .logo a, .score-item a[href="#contacts"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor link behavior (instant jump)
        const targetId = this.getAttribute('href').substring(1); // Get the section ID (e.g., "contacts")
        const targetSection = document.getElementById(targetId); // Find the corresponding HTML section
        
        // Scroll to the target section with a smooth animation
        if (targetSection) { // Ensure the target section exists
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Logic for initial Home background animation and Copyright Year Update
document.addEventListener('DOMContentLoaded', function() {
    // Handle initial fade-in animation for the Home background
    const homeBg = document.querySelector('.bg-image[data-section="home"]');
    if (homeBg) { // Ensure the home background element exists
        // The 'fadeIn' animation is already triggered by the '.active' class in CSS.
        // We remove the 'animation' property after a delay to prevent it from repeating
        // on subsequent scrolls, ensuring it only plays on initial page load.
        setTimeout(() => {
            homeBg.style.animation = 'none';
        }, 1000); // This delay should match the 'fadeIn' animation duration (1 second) in your CSS.
    }

    // Automatically update the copyright year in the footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) { // Ensure the copyright year span exists
        yearSpan.textContent = new Date().getFullYear();
    }
});
