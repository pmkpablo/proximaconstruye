'use strict';
const contacto = { whatsapp: '5493813513216', correo: 'info@proximaconstruye.com' };
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const asunto = link.dataset.subject || 'mi proyecto';
  link.href = `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(`Hola Próxima, quisiera información sobre ${asunto}.`)}`;
});
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navegacion');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const abierto = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(abierto)); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
const heroVideo = document.querySelector('#hero-video');
const heroControl = document.querySelector('#hero-play');
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
new IntersectionObserver(([entry]) => {
  floatingContact.hidden = entry.isIntersecting;
}).observe(document.querySelector('#inicio'));
const dialog = document.querySelector('#video-dialog');
const video = document.querySelector('#brand-video');
document.querySelector('#ver-video').addEventListener('click', () => { dialog.showModal(); video.play().catch(() => {}); });
document.querySelector('#cerrar-video').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => video.pause());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
const form = document.querySelector('#contact-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const mensaje = `Hola Próxima, quisiera consultar por un proyecto.\n\nNombre: ${data.get('nombre')}\nCorreo: ${data.get('correo')}\nProyecto: ${data.get('proyecto')}\nUbicación: ${data.get('ubicacion') || 'A definir'}\n\n${data.get('mensaje')}`;
  const canal = event.submitter?.value || 'whatsapp';
  if (canal === 'correo') {
    window.location.href = `mailto:${contacto.correo}?subject=${encodeURIComponent(`Consulta web · ${data.get('proyecto')}`)}&body=${encodeURIComponent(mensaje)}`;
  } else {
    window.open(`https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
  }
  document.querySelector('#form-status').textContent = canal === 'correo' ? 'Continuá el envío en tu aplicación de correo. También podés escribir directamente a info@proximaconstruye.com.' : 'Continuá la conversación en WhatsApp para enviar tu consulta.';
});
