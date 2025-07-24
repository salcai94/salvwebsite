// Parallax and Slideshow Effect
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const bgImages = document.querySelectorAll('.bg-image');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Check if section is in view
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.id;
            bgImages.forEach(bg => {
                if (bg.dataset.section === sectionId) {
                    bg.classList.add('active');
                    // Remove animation after initial load to prevent re-triggering
                    if (bg.dataset.section !== 'home') {
                        bg.style.animation = 'none';
                    }
                } else {
                    bg.classList.remove('active');
                }
            });
        }
    });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('nav a, .logo a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Ensure home background animation plays only once
document.addEventListener('DOMContentLoaded', function() {
    const homeBg = document.querySelector('.bg-image[data-section="home"]');
    // Animation is already triggered by .active class; remove after it plays
    setTimeout(() => {
        homeBg.style.animation = 'none';
    }, 1000); // Match animation duration (1s)
});