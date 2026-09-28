const reveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

const videos = [...document.querySelectorAll('.js-autoplay')];
function tryPlay(video){
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;
  const p = video.play();
  if (p && p.catch) p.catch(() => {});
}
videos.forEach(video => {
  video.addEventListener('playing', () => video.classList.add('is-playing'));
  video.addEventListener('pause', () => { if (video.currentTime === 0) video.classList.remove('is-playing'); });
  video.addEventListener('canplay', () => tryPlay(video), { once:true });
  tryPlay(video);
});
window.addEventListener('pageshow', () => videos.forEach(tryPlay));
document.addEventListener('pointerdown', () => videos.forEach(tryPlay), { once:true });
document.addEventListener('touchstart', () => videos.forEach(tryPlay), { once:true, passive:true });
