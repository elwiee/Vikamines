const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .12, rootMargin: '0px 0px -7% 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .photo-reveal').forEach((element) => {
  if (reducedMotion) element.classList.add('is-visible');
  else revealObserver.observe(element);
});

if (!reducedMotion) {
  const rain = document.querySelector('.rose-rain');
  let previousY = window.scrollY;
  let lastRoseAt = 0;
  let direction = 'still';

  const createVapor = (rose) => {
    const rect = rose.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const particleCount = 16;

    for (let index = 0; index < particleCount; index += 1) {
      const angle = (Math.PI * 2 * index) / particleCount + Math.random() * .34;
      const radius = rect.width * (.12 + Math.random() * .3);
      const particle = document.createElement('span');
      const isMist = index % 4 === 0;
      const size = isMist ? 9 + Math.random() * 7 : 2.5 + Math.random() * 4;
      const driftX = Math.cos(angle) * (28 + Math.random() * 58);
      const riseY = -(70 + Math.random() * 95) + Math.sin(angle) * 16;
      const duration = 1.3 + Math.random() * .65;

      particle.className = `rose-particle${isMist ? ' is-mist' : ''}`;
      particle.style.setProperty('--particle-x', `${centerX + Math.cos(angle) * radius}px`);
      particle.style.setProperty('--particle-y', `${centerY + Math.sin(angle) * radius}px`);
      particle.style.setProperty('--particle-size', `${size}px`);
      particle.style.setProperty('--particle-dx', `${driftX}px`);
      particle.style.setProperty('--particle-dy', `${riseY}px`);
      particle.style.setProperty('--particle-turn', `${-80 + Math.random() * 160}deg`);
      particle.style.setProperty('--particle-delay', `${Math.random() * .16}s`);
      particle.style.setProperty('--particle-duration', `${duration}s`);
      particle.addEventListener('animationend', () => particle.remove(), { once: true });
      document.body.append(particle);
    }
  };

  const clearRoses = () => {
    rain?.querySelectorAll('.falling-rose').forEach((rose, index) => {
      setTimeout(() => {
        createVapor(rose);
        rose.classList.add('is-evaporating');
      }, index * 55);
      setTimeout(() => rose.remove(), 1200 + index * 55);
    });
  };

  const createRose = (time) => {
    if (!rain || time - lastRoseAt < 680 || rain.children.length >= 5) return;
    lastRoseAt = time;
    const rose = document.createElement('span');
    rose.className = 'falling-rose';
    rose.style.left = `${4 + Math.random() * 90}%`;
    rose.style.setProperty('--duration', `${7.2 + Math.random() * 3.8}s`);
    rose.style.setProperty('--drift', `${-36 + Math.random() * 72}px`);
    rose.style.setProperty('--spin', `${120 + Math.random() * 170}deg`);
    rose.innerHTML = `${'<i></i>'.repeat(10)}<b></b>`;
    rose.addEventListener('animationend', () => rose.remove(), { once: true });
    rain.append(rose);
  };

  const watchScrollDirection = (time) => {
    const currentY = window.scrollY;
    const delta = currentY - previousY;

    if (delta > 1) {
      direction = 'down';
      createRose(time);
    } else if (delta < -1 && direction !== 'up') {
      direction = 'up';
      clearRoses();
    } else if (Math.abs(delta) <= 1) {
      direction = 'still';
    }

    previousY = currentY;
    requestAnimationFrame(watchScrollDirection);
  };

  requestAnimationFrame(watchScrollDirection);
}
