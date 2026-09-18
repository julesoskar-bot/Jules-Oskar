const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

const navLinks = [...document.querySelectorAll('.nav nav a')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const link = navLinks.find(a => a.getAttribute('href') === `#${entry.target.id}`);
      if (link) link.style.color = 'var(--blue)';
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// Keep every clip moving. Muted + playsInline is what allows autoplay on modern browsers.
const videos = [...document.querySelectorAll('video')];
function startVideos() {
  videos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
  });
}

videos.forEach((video) => {
  video.addEventListener('loadedmetadata', startVideos, { once: true });
  video.addEventListener('canplay', startVideos, { once: true });
});
window.addEventListener('load', startVideos);
window.addEventListener('pageshow', startVideos);
document.addEventListener('visibilitychange', () => { if (!document.hidden) startVideos(); });
document.addEventListener('pointerdown', startVideos, { once: true });
document.addEventListener('touchstart', startVideos, { once: true, passive: true });
