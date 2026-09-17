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

   /* ==============================================================
   ARCHIVE LIGHTBOX
   ============================================================== */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMeta  = document.getElementById('lightbox-meta');
const lightboxClose = document.getElementById('lightbox-close');

// Collect photo data from the grid
const archiveItems  = document.querySelectorAll('.archive-item');

archiveItems.forEach(item => {
  const btn     = item.querySelector('.archive-overlay');
  const img     = item.querySelector('.archive-photo');
  const title   = item.querySelector('.caption-title');
  const meta    = item.querySelector('.caption-meta');

  if (btn) {
    btn.addEventListener('click', () => {
      lightboxImg.src           = img.src;
      lightboxImg.alt           = img.alt;
      lightboxTitle.textContent = title ? title.textContent : '';
      lightboxMeta.textContent  = meta  ? meta.textContent  : '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
});

// Close lightbox
function closeLightbox() {
  lightbox?.classList.remove('active');
  document.body.style.overflow = '';
  if (lightboxImg) lightboxImg.src = '';
}

lightboxClose?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

   /* ==============================================================
   PARTNER FORM — async submission with feedback
   ============================================================== */
const partnerForm = document.querySelector('.partner-form');

if (partnerForm) {
  partnerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = partnerForm.querySelector('.partner-submit');
    const original  = submitBtn.innerHTML;

    submitBtn.disabled  = true;
    submitBtn.innerHTML = 'Sending… <i class="fas fa-spinner fa-spin"></i>';

    try {
      const res = await fetch(partnerForm.action, {
        method:  'POST',
        body:    new FormData(partnerForm),
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        showFormMsg(
          partnerForm,
          'success',
          '✅ Enquiry received. We will be in touch within 48 hours.'
        );
        partnerForm.reset();
      } else {
        throw new Error('failed');
      }
    } catch {
      showFormMsg(
        partnerForm,
        'error',
        '❌ Something went wrong. Email us directly at eipageorge5@gmail.com'
      );
    } finally {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = original;
    }
  });
}

function showFormMsg(form, type, message) {
  const existing = form.querySelector('.form-feedback');
  if (existing) existing.remove();

  const msg = document.createElement('p');
  msg.className    = 'form-feedback';
  msg.textContent  = message;
  msg.style.cssText = `
    margin-top: 0.75rem;
    font-size: 0.83rem;
    padding: 10px 14px;
    border-radius: 4px;
    border: 1px solid ${type === 'success'
      ? 'rgba(34,197,94,0.3)'
      : 'rgba(239,68,68,0.3)'};
    background: ${type === 'success'
      ? 'rgba(34,197,94,0.07)'
      : 'rgba(239,68,68,0.07)'};
    color: ${type === 'success' ? '#86efac' : '#fca5a5'};
  `;

  form.appendChild(msg);
  setTimeout(() => msg.remove(), 7000);
}

}); // end DOMContentLoaded
