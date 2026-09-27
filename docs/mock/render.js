// Scene mock with ordinary links and native detail dialogs. No scene animations.
const data = window.MOCK;
const page = document.body.dataset.page;
const icons = {
  arrow: '↗',
  play: '▷',
  book: '≡',
  sun: '☼',
  shuffle: '⇄',
  chat: '···',
};
const external = ' target="_blank" rel="noopener noreferrer"';
function cue(item) {
  const style = `--x:${item.x}%;--y:${item.y}%;--mx:${item.mx ?? item.x}%;--my:${item.my ?? item.y}%`;
  const content = `<span class="cue-dot" aria-hidden="true">${icons[item.icon] || '↗'}</span><span class="cue-label">${item.label}</span>`;
  if (item.panel)
    return `<button class="cue" type="button" style="${style}" data-panel="${item.panel}" aria-haspopup="dialog">${content}</button>`;
  return item.planned
    ? `<span class="cue planned" style="${style}" aria-label="${item.label}; not active in this static mock">${content}</span>`
    : `<a class="cue" style="${style}" href="${item.href}"${item.external ? external : ''}>${content}</a>`;
}
const header = `<a class="skip" href="#main">Skip to content</a><header class="site-header"><a class="signature" href="index.html">glen padua<span>.</span></a><nav aria-label="Main navigation">${data.navigation.map(n => `<a href="${n.href}"${(page === 'home' && n.label === 'Home') || (page === 'work' && n.label === 'Work') || (page === 'stories' && n.label === 'Stories') ? ' aria-current="page"' : ''}>${n.label}</a>`).join('')}</nav></header>`;
const footer = `<footer class="site-footer"><a class="signature" href="index.html">glen padua.</a><span>A work in progress. Much like the person.</span><a href="https://www.instagram.com/glen.padua/"${external}>Instagram ↗</a></footer><div class="mock-note">STATIC DESIGN STUDY · 01 <span>“later” marks a planned interaction</span></div>`;
function home() {
  const names = { lake: 'Lake', beach: 'Beach', city: 'City' };
  return `<main id="main" class="home-world" style="--scene-count:${data.scenes.length}"><div class="journey-stage">${data.scenes.map((s, i) => `<section class="scene ${s.id}" id="${s.id}-scene" aria-labelledby="${s.id}-title"><div class="scene-backdrop"><div class="scene-art"><img src="${s.image}" alt="${s.alt}" decoding="async" ${i ? '' : 'fetchpriority="high"'}></div></div><div class="scene-copy"><p class="eyebrow">${s.eyebrow}</p><${i ? 'h2' : 'h1'} id="${s.id}-title">${s.title}</${i ? 'h2' : 'h1'}>${s.body ? `<p class="scene-description">${s.body}</p>` : ''}</div>${s.hotspots.map(cue).join('')}</section>`).join('')}<div class="journey-controls"><nav aria-label="Scenes">${data.scenes.map((s, i) => `<a href="#${s.id}" data-scene-link="${i}"><span>0${i + 1}</span> ${names[s.id] || s.id}</a>`).join('')}</nav><button type="button" class="motion-choice" aria-pressed="true">Dissolve on</button><span class="scroll-hint">Scroll to wander ↓</span></div></div>${data.scenes.map((s, i) => `<span class="scene-stop" id="${s.id}" style="--stop:${i}" aria-hidden="true"></span>`).join('')}</main>`;
}
function monitor() {
  const s = data.work.screen;
  return `<div class="screen-top"><span>${s.label}</span><span>01 / 03</span></div><div class="screen-content"><p class="eyebrow">${s.status}</p><h2>${s.name}</h2><p class="screen-joke">${s.copy}</p><p class="screen-detail">${s.detail}</p><a class="screen-link" href="${s.href}">${s.link} ↗</a></div><div class="screen-bottom"><span>Work / side projects / experiments</span><span class="planned" aria-label="Project carousel planned; not active">← &nbsp; →</span></div>`;
}
function work() {
  const w = data.work;
  return `<main id="main" class="room-page"><h1 class="sr-only">Work — Glen’s desk</h1><section class="immersive-room work-room" aria-label="Glen’s workstation"><div class="room-stage"><picture><source media="(max-width:760px)" srcset="assets/work-portrait.png"><img class="work-art" src="${w.image}" alt="${w.alt}"></picture><button class="monitor-content monitor-button" data-panel="projects" aria-haspopup="dialog" aria-label="Explore work and side projects"><span class="screen-top"><span>On my desk</span><span>01 / 03</span></span><span class="screen-content"><span class="eyebrow">Current experiment</span><span class="monitor-title">${w.screen.name}</span><span class="screen-joke">${w.screen.copy}</span></span><span class="monitor-indicator" aria-hidden="true">↗</span></button><button class="laptop-profile" data-panel="remote" aria-haspopup="dialog" aria-label="About my work at Remote.com"><span class="slack-bar"># Remote.com</span><span class="slack-person">● &nbsp; Glen Padua</span><strong>Senior engineer</strong><span class="slack-status">Building things.</span></button>${cue({ x: 24, y: 63, icon: 'chat', label: 'The day job', panel: 'remote' })}${cue({ x: 68, y: 39, icon: 'arrow', label: 'Work & experiments', panel: 'projects' })}${cue({ x: 82, y: 49, icon: 'chat', label: 'AI · later', planned: true })}${cue({ x: 78, y: 73, icon: 'book', label: 'Stories', href: 'stories.html' })}</div></section></main>`;
}
function paper(a, i) {
  return `<a class="article-paper paper-${i + 1}" href="${a.href}"${external} style="--x:${a.x}%;--y:${a.y}%;--w:${a.w}%;--h:${a.h}%;--r:${a.r}deg"><div class="paper-meta">${a.type}<span>${a.year}</span></div><h2>${a.title}</h2><div class="paper-art art-${i}" style="background-image:url('${a.art}')" aria-hidden="true"></div><div class="paper-bottom"><span>Read the story</span><span class="paper-arrow" aria-hidden="true">↗</span></div></a>`;
}
function stories() {
  const s = data.writing;
  return `<main id="main" class="room-page"><h1 class="sr-only">Stories — a few loose pages</h1><section class="immersive-room writing-room" aria-label="The writing table"><div class="room-stage"><img class="writing-art" src="${s.image}" alt="${s.alt}"><div class="paper-spread">${s.articles.map(paper).join('')}</div>${cue({ x: 90, y: 56, icon: 'shuffle', label: 'Another set · later', planned: true })}${cue({ x: 90, y: 35, icon: 'book', label: 'All stories', href: 'https://glenpadua.com/blog', external: true })}</div></section></main>`;
}
const panels = {
  remote: {
    title: 'The day job.',
    eyebrow: 'Remote.com · Senior software engineer',
    content: `<p>Over ten years building software, and plenty of problems that didn’t arrive with instructions.</p><p>At work, that includes building agentic workflows and figuring out how to turn difficult problems into something useful. The interesting part is understanding what will actually make a difference.</p><a class="detail-link" href="https://remote.com"${external}>Visit Remote.com ↗</a>`,
  },
  projects: {
    title: 'A few tabs worth opening.',
    eyebrow: 'Work / side projects / experiments',
    content: `<div class="detail-projects">${data.work.projects.map(p => `<article><p class="eyebrow">${p.type}</p><h3>${p.name}</h3><p>${p.copy}</p>${p.href ? `<a class="detail-link" href="${p.href}"${p.external ? external : ''}>${p.link} ↗</a>` : `<span class="detail-state">Still taking shape</span>`}</article>`).join('')}</div>`,
  },
};
document.body.insertAdjacentHTML(
  'afterbegin',
  header +
    ({ home, work, stories }[page] || home)() +
    (page === 'home' ? footer : '') +
    `<dialog class="detail-dialog" aria-labelledby="detail-title"><button class="dialog-close" aria-label="Close details">×</button><div class="dialog-body"></div></dialog>`,
);

const detailDialog = document.querySelector('.detail-dialog');
let panelTrigger;
document.querySelectorAll('[data-panel]').forEach(button =>
  button.addEventListener('click', () => {
    const panel = panels[button.dataset.panel];
    panelTrigger = button;
    detailDialog.querySelector('.dialog-body').innerHTML =
      `<p class="eyebrow">${panel.eyebrow}</p><h2 id="detail-title">${panel.title}</h2>${panel.content}`;
    detailDialog.showModal();
    detailDialog.querySelector('.dialog-close').focus();
  }),
);
detailDialog
  .querySelector('.dialog-close')
  .addEventListener('click', () => detailDialog.close());
detailDialog.addEventListener('click', event => {
  if (event.target === detailDialog) {
    const bounds = detailDialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      detailDialog.close();
  }
});
detailDialog.addEventListener('close', () => panelTrigger?.focus());
