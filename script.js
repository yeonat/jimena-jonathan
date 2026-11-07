const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sectionDots = [...document.querySelectorAll('.section-dots a')];
const sections = [...document.querySelectorAll('main section[id]')];

const closeMenu = () => {
  siteNav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

const openMenu = () => {
  siteNav?.classList.add('open');
  menuToggle?.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav?.classList.contains('open');

  if (isOpen) {
    closeMenu();
    return;
  }

  openMenu();
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

document.addEventListener('click', (event) => {
  if (!siteNav || !menuToggle) return;

  const clickedInsideNav = siteNav.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (siteNav.classList.contains('open') && !clickedInsideNav && !clickedToggle) {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${entry.target.id}`,
    ));
    sectionDots.forEach((dot) => dot.classList.toggle(
      'active',
      dot.getAttribute('href') === `#${entry.target.id}`,
    ));
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

sectionDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    sectionDots.forEach((item) => item.classList.toggle('active', item === dot));
  });
});

document.querySelector('#rsvp-button')?.addEventListener('click', (event) => {
  event.currentTarget.textContent = '¡Gracias por confirmar! ♥';
  event.currentTarget.disabled = true;
  document.querySelector('#rsvp-message').textContent = 'Pronto nos pondremos en contacto contigo.';
});

document.querySelectorAll('.gift-detail').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('#account-details').classList.toggle('is-visible');
  });
});

const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
const viewerCaption = document.querySelector('#viewer-caption');
const galleryItems = [...document.querySelectorAll('.journey-collage .polaroid')];
let currentImageIndex = 0;

const showImage = (index) => {
  currentImageIndex = (index + galleryItems.length) % galleryItems.length;
  const image = galleryItems[currentImageIndex].querySelector('img');
  viewerImage.src = image.src;
  viewerImage.alt = image.alt;
  viewerCaption.textContent = galleryItems[currentImageIndex].querySelector('span').textContent;
};

const closeViewer = () => {
  viewer.hidden = true;
  document.body.style.overflow = '';
};

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    showImage(index);
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    viewer.querySelector('.viewer-close').focus();
  });
});

viewer?.querySelector('.viewer-close').addEventListener('click', closeViewer);
viewer?.querySelector('.viewer-prev').addEventListener('click', () => showImage(currentImageIndex - 1));
viewer?.querySelector('.viewer-next').addEventListener('click', () => showImage(currentImageIndex + 1));
viewer?.addEventListener('click', (event) => {
  if (event.target === viewer) closeViewer();
});

document.addEventListener('keydown', (event) => {
  if (viewer.hidden) return;
  if (event.key === 'Escape') closeViewer();
  if (event.key === 'ArrowLeft') showImage(currentImageIndex - 1);
  if (event.key === 'ArrowRight') showImage(currentImageIndex + 1);
});
