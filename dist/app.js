'use strict';
const contacto = { whatsapp: '5493813513216', correo: 'info@proximaconstruye.com' };
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const asunto = link.dataset.subject || 'mi proyecto';
  link.href = `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(`Hola Próxima, quisiera información sobre ${asunto}.`)}`;
});
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navegacion');
const servicesNav = document.querySelector('.services-nav');
const servicesToggle = document.querySelector('#services-toggle');
const servicesPanel = document.querySelector('#services-submenu');
const mobileNav = window.matchMedia('(max-width: 850px)');
let closeServicesTimer;
function setServicesOpen(open) {
  clearTimeout(closeServicesTimer);
  if (!servicesToggle || !servicesPanel) return;
  servicesToggle.setAttribute('aria-expanded', String(open));
  servicesPanel.hidden = !open;
  if (open && mobileNav.matches) {
    nav.scrollTo({
      top: Math.max(0, servicesNav.offsetTop - 18),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }
}
function closeMenu() {
  setServicesOpen(false);
  nav?.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
  if (nav) nav.scrollTop = 0;
}
menu?.addEventListener('click', () => {
  const abierto = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(abierto));
  document.body.classList.toggle('nav-open', abierto);
  if (!abierto) setServicesOpen(false);
});
servicesToggle?.addEventListener('click', () => {
  setServicesOpen(servicesToggle.getAttribute('aria-expanded') !== 'true');
});
servicesNav?.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse' && !mobileNav.matches) setServicesOpen(true);
});
servicesNav?.addEventListener('pointerleave', event => {
  if (event.pointerType === 'mouse' && !mobileNav.matches) {
    closeServicesTimer = setTimeout(() => {
      if (!servicesNav.contains(document.activeElement)) setServicesOpen(false);
    }, 180);
  }
});
document.addEventListener('focusin', event => {
  if (!servicesNav?.contains(event.target)) setServicesOpen(false);
});
servicesToggle?.addEventListener('keydown', event => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  event.preventDefault();
  setServicesOpen(true);
  const links = servicesPanel.querySelectorAll('a');
  (event.key === 'ArrowDown' ? links[0] : links[links.length - 1])?.focus();
});
nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('pointerdown', event => {
  if (!document.querySelector('.header')?.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (servicesToggle?.getAttribute('aria-expanded') === 'true') {
    setServicesOpen(false);
    servicesToggle.focus();
  } else {
    const wasOpen = nav?.classList.contains('open');
    closeMenu();
    if (wasOpen) menu?.focus();
  }
});
mobileNav.addEventListener('change', closeMenu);
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
const heroVideo = document.querySelector('#hero-video');
const heroControl = document.querySelector('#hero-play');
if (heroVideo && heroControl) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function syncHeroControl() {
    const label = heroVideo.paused ? 'Reproducir video' : 'Pausar video';
    heroControl.textContent = label;
    heroControl.setAttribute('aria-label', label + ' del hero');
  }
  heroControl.addEventListener('click', () => {
    if (heroVideo.paused) heroVideo.play().catch(syncHeroControl);
    else heroVideo.pause();
  });
  heroVideo.addEventListener('play', syncHeroControl);
  heroVideo.addEventListener('pause', syncHeroControl);
  function respectMotion() {
    if (reducedMotion.matches) { heroVideo.autoplay = false; heroVideo.pause(); }
    syncHeroControl();
  }
  respectMotion();
  reducedMotion.addEventListener('change', respectMotion);
  const floatingContact = document.querySelector('.floating-contact');
  if (floatingContact) new IntersectionObserver(([entry]) => {
    floatingContact.hidden = entry.isIntersecting;
  }).observe(document.querySelector('#inicio'));
}
function closeOnBackdrop(dialog) {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
}
const videoDialog = document.querySelector('#video-dialog');
const video = document.querySelector('#brand-video');
if (videoDialog && video) {
  document.querySelector('#ver-video')?.addEventListener('click', () => { videoDialog.showModal(); video.play().catch(() => {}); });
  document.querySelector('#cerrar-video')?.addEventListener('click', () => videoDialog.close());
  videoDialog.addEventListener('close', () => video.pause());
  closeOnBackdrop(videoDialog);
}
const galleryDialog = document.querySelector('#gallery-dialog');
if (galleryDialog) {
  const galleryImage = document.querySelector('#gallery-image');
  const galleryTitle = document.querySelector('#gallery-title');
  document.querySelectorAll('.gallery-trigger').forEach(button => {
    button.addEventListener('click', () => {
      galleryImage.src = button.dataset.image;
      galleryImage.alt = button.dataset.title;
      galleryTitle.textContent = button.dataset.title;
      galleryDialog.showModal();
    });
  });
  document.querySelector('#cerrar-galeria').addEventListener('click', () => galleryDialog.close());
  closeOnBackdrop(galleryDialog);
}
const form = document.querySelector('#contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const superficie = data.get('superficie');
  const mensaje = `Hola Próxima, quisiera consultar por un proyecto.\n\nNombre: ${data.get('nombre')}\nCorreo: ${data.get('correo')}\nProyecto: ${data.get('proyecto')}\nUbicación: ${data.get('ubicacion') || 'A definir'}\nTerreno: ${data.get('terreno')}\nSuperficie aproximada: ${superficie ? superficie + ' m²' : 'A definir'}\n\n${data.get('mensaje')}`;
  const canal = event.submitter?.value || 'whatsapp';
  if (canal === 'correo') {
    window.location.href = `mailto:${contacto.correo}?subject=${encodeURIComponent(`Consulta web · ${data.get('proyecto')}`)}&body=${encodeURIComponent(mensaje)}`;
  } else {
    window.open(`https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
  }
  document.querySelector('#form-status').textContent = canal === 'correo' ? 'Continuá el envío en tu aplicación de correo. También podés escribir directamente a info@proximaconstruye.com.' : 'Continuá la conversación en WhatsApp para enviar tu consulta.';
});
