// 1. Scroll Progress Bar logic
const createProgressBar = () => {
    const bar = document.createElement('div');
    bar.style.height = '4px';
    bar.style.width = '0';
    bar.style.backgroundColor = '#ffa500';
    bar.style.position = 'fixed';
    bar.style.top = '0';
    bar.style.left = '0';
    bar.style.zIndex = '2000';
    bar.style.transition = 'width 0.1s ease-out';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + "%";
    });
};

// 2. Navbar Transformation
const handleNavbar = () => {
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(15, 23, 42, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.boxShadow = 'none';
        }
    });
};

// 3. Image Focus Interaction (Using Intersection Observer)
const observeChapters = () => {
    const chapters = document.querySelectorAll('.chapter-img img');
    const options = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1.05)';
                entry.target.style.transition = 'transform 1s ease';
            } else {
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, options);

    chapters.forEach(img => observer.observe(img));
};

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createProgressBar();
    handleNavbar();
    observeChapters();
});

/**
 * THE SPIRIT OF TURKANA - DOCUMENTARY LOGIC
 * High-performance interactions using Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DYNAMIC SCROLL PROGRESS BAR
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        // Styles are handled in CSS for performance, logic here
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    };

    // 2. SMART NAVBAR TRANSFORMATION
    const initNavbar = () => {
        const nav = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        });
    };

    // 3. IMAGE PARALLAX & FOCUS
    // This makes the Chapter images "pop" as they enter the screen
    const observeImages = () => {
        const images = document.querySelectorAll('.chapter-img img');
        
        const observerOptions = {
            threshold: 0.2, // Trigger when 20% of image is visible
            rootMargin: "0px 0px -50px 0px"
        };

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('img-focused');
                    // Once animated, we can stop observing to save memory
                    imageObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        images.forEach(img => imageObserver.observe(img));
    };

    // 4. SMOOTH SCROLL FOR "EXPLORE" BUTTON
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    };

    // RUN ALL INITIALIZATIONS
    createProgressBar();
    initNavbar();
    observeImages();
    initSmoothScroll();
});
