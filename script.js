/* ================================================================
   THE SPIRIT OF TURKANA — SCRIPTS
   Built section by section.
   ================================================================

   Contents so far:
   1.  Navbar scroll state
   2.  Hamburger / mobile nav
   3.  Scroll progress bar

   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {


  /* ==============================================================
     1. NAVBAR — transparent on hero, solid when scrolled
     ============================================================== */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    const handleNavScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run once on load
  }


  /* ==============================================================
     2. HAMBURGER / MOBILE NAV
     ============================================================== */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {

    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        mobileNav.classList.contains('active') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ==============================================================
     3. SCROLL PROGRESS BAR
     Thin amber line at the very top of the page
     ============================================================== */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: var(--amber);
    z-index: 9999;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop    = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress     = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });


}); // end DOMContentLoaded
