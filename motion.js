const motionOff = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.kinetic-title').forEach((title) => {
  title.innerHTML = [...title.textContent].map((letter, index) => `<span style="--i:${index}">${letter}</span>`).join('');
});

const flowerLayer = document.querySelector('.flowers');
if (flowerLayer) {
  const positions = [[4,14,.8,-2],[92,12,1.1,-5],[84,72,.65,-7],[8,81,.9,-4],[48,7,.5,-6],[42,86,.55,-8],[72,42,.4,-3]];
  flowerLayer.innerHTML = positions.map(([x,y,size,delay]) => `<span class="flower" style="left:${x}%;top:${y}%;--s:${size};animation-delay:${delay}s">${'<i></i>'.repeat(10)}<b></b></span>`).join('');
}

if (!motionOff) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .14 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  document.querySelectorAll('[data-parallax]').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      element.style.setProperty('--px', `${x * 10}px`);
      element.style.setProperty('--py', `${y * 10}px`);
    });
    element.addEventListener('pointerleave', () => { element.style.setProperty('--px', '0px'); element.style.setProperty('--py', '0px'); });
  });
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}
