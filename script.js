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
