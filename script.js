const card = document.getElementById('hero-container');
const hero = document.getElementById('hero');
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    hero.style.transform = `perspective(600px) rotateY(${dx * 10}deg) rotateX(${ -dy * 10}deg)`;
  });
//   card.addEventListener('mouseleave', () => {
//     hero.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
//   });