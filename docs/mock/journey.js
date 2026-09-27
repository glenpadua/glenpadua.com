// Native scroll selects the scene. CSS completes a short dissolve; no scroll hijacking.
(() => {
  const world = document.querySelector('.home-world');
  if (!world) return;
  const scenes = [...world.querySelectorAll('.scene')];
  const links = [...world.querySelectorAll('[data-scene-link]')];
  const motion = world.querySelector('.motion-choice');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let cutOnly = false;
  let frame = 0;
  let active = -1;
  world.classList.add('journey-ready');
  const stage = world.querySelector('.journey-stage');
  function draw() {
    frame = 0;
    const progress = Math.max(
      0,
      -world.getBoundingClientRect().top / stage.clientHeight,
    );
    // A short, completed dissolve at a scroll boundary avoids leaving ghosted
    // characters on screen when the visitor stops scrolling halfway through.
    const current = Math.min(scenes.length - 1, Math.floor(progress + 0.35));
    world.classList.toggle('cut-only', reduced.matches || cutOnly);
    scenes.forEach((scene, i) => {
      scene.style.visibility = 'visible';
      scene.style.zIndex = i;
      scene.querySelector('.scene-backdrop').style.opacity =
        i <= current ? 1 : 0;
      scene.classList.toggle('is-current', i === current);
      scene.inert = i !== current;
      scene.setAttribute('aria-hidden', String(i !== current));
    });
    if (current !== active) {
      if (active >= 0 && scenes[active].contains(document.activeElement))
        links[current].focus({ preventScroll: true });
      active = current;
      links.forEach((link, i) =>
        i === active
          ? link.setAttribute('aria-current', 'step')
          : link.removeAttribute('aria-current'),
      );
    }
    motion.disabled = reduced.matches;
    motion.textContent = reduced.matches
      ? 'Reduced motion'
      : cutOnly
        ? 'Dissolve off'
        : 'Dissolve on';
    motion.setAttribute('aria-pressed', String(!reduced.matches && !cutOnly));
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(draw);
  }
  motion.addEventListener('click', () => {
    cutOnly = !cutOnly;
    schedule();
  });
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  new ResizeObserver(schedule).observe(stage);
  // Allow images to decode before they become part of the dissolve.
  world.querySelectorAll('img').forEach(image =>
    image
      .decode()
      .catch(() => {})
      .then(schedule),
  );
  draw();
  requestAnimationFrame(() => world.classList.add('journey-animated'));
})();
