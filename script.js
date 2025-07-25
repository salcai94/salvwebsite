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

// Smooth Scrolling for Navigation AND Score items linking to contacts
document.querySelectorAll('nav a, .logo a, .score-item a[href="#contacts"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Previene il comportamento di default del link
        const targetId = this.getAttribute('href').substring(1); // Ottiene l'ID della sezione (es. "contacts")
        const targetSection = document.getElementById(targetId); // Trova la sezione corrispondente
        
        // Scorri alla sezione con animazione fluida
        if (targetSection) { // Assicurati che la sezione esista
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
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
