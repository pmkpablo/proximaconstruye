'use strict';
const contacto = { whatsapp: '5493813513216', correo: 'info@proximaconstruye.com' };
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const asunto = link.dataset.subject || 'mi proyecto';
  link.href = `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(`Hola Próxima, quisiera información sobre ${asunto}.`)}`;
});
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navegacion');
function closeMenu() { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); }
menu?.addEventListener('click', () => { const abierto = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(abierto)); });
nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
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
