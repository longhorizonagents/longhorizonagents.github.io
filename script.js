/* WLHA — Workshop on Long-Horizon Agents
   People data + light interaction layer. No build step; runs as-is on GitHub Pages. */

document.documentElement.classList.add('js');

const PEOPLE = {
  speakers: [
    { name: 'Baishakhi Ray',  aff: 'Columbia University',            area: 'Code agents · SWE benchmarking',                        photo: 'baishakhi-ray',  home: 'https://www.rayb.info/',          tag: 'confirmed' },
    { name: 'Luyu Gao',       aff: 'OpenAI',                          area: 'Retrieval · tool use · agent context',                   photo: 'luyu-gao',       home: 'https://luyug.github.io/',        tag: 'confirmed' },
    { name: 'Zifan Wang',     aff: 'Meta Superintelligence Labs',     area: 'Safety & red-teaming for autonomous LM systems',         photo: 'zifan-wang',     home: 'https://zifanw.notion.site/',     tag: 'confirmed' },
    { name: 'Yixuan He',      aff: 'Arizona State University',        area: 'Structured reasoning · graph-based agents',              photo: 'yixuan-he',      home: 'https://sherylhyx.github.io/',    tag: 'confirmed' },
    { name: 'Yilun Du',       aff: 'Harvard · Kempner Institute',     area: 'World models · compositional planning · test-time search', photo: 'yilun-du',     home: 'https://yilundu.github.io/',      tag: 'confirmed' },
  ],
  organizers: [
    { name: 'Yizhi Li',       aff: 'Univ. of Manchester · IQuest',    area: 'Code-LLM agents · RL for LLMs · open evaluation',        photo: 'yizhi-li',       home: 'https://yizhilll.github.io/' },
    { name: 'Dingmin Wang',   aff: 'AWS AI Lab',                      area: 'Long-horizon code agents',                               photo: 'dingmin-wang',   home: 'https://www.dingmin.wang/' },
    { name: 'Yuxuan Zhang',   aff: 'Univ. of British Columbia',       area: 'AI agents · ClawBench · deep-research agents',           photo: 'yuxuan-zhang',   home: 'https://yuxuan.world/' },
    { name: 'Mingchen Zhuge', aff: 'KAUST',                           area: 'Agent frameworks: MetaGPT, GPTSwarm, AFlow',             photo: 'mingchen-zhuge', home: 'https://mczhuge.github.io/' },
    { name: 'Jian Yang',      aff: '',                                area: 'Qwen-Coder · multi-agent systems',                       photo: 'jian-yang',      home: 'https://csjianyang.github.io/' },
    { name: 'Hanqi Yan',      aff: "King's College London",          area: 'CoT compression · agentic evaluation & safety',          photo: 'hanqi-yan',      home: 'https://hanqi-qi.github.io/' },
  ],
  advisors: [
    { name: 'Wenhu Chen',     aff: 'Meta MSL · Univ. of Waterloo',    area: 'Multimodal pre-training & evaluation',                   photo: 'wenhu-chen',     home: 'https://wenhuchen.github.io/' },
    { name: 'Qian Liu',       aff: 'xAI',                             area: 'LLMs · code intelligence (StarCoder, OpenCoder)',        photo: 'qian-liu',       home: 'https://siviltaram.github.io/' },
    { name: 'Ping Nie',       aff: 'Univ. of Waterloo',               area: 'Scaling agents · web-search agents',                     photo: null,             home: 'https://github.com/erenup' },
    { name: 'Peter West',     aff: 'Univ. of British Columbia',       area: 'NLP · capabilities & limits of LLMs',                    photo: 'peter-west',     home: 'https://www.cs.ubc.ca/people/peter-west' },
    { name: 'Ge Zhang',       aff: 'ByteDance Seed · M-A-P',          area: 'Synthetic data & evaluation · pretraining',              photo: 'ge-zhang',       home: 'https://scholar.google.com/citations?user=qyTrq4kAAAAJ' },
    { name: 'Pan Lu',         aff: 'Stanford University',             area: 'Multimodal & mathematical reasoning · tool-augmented agents', photo: 'pan-lu',     home: 'https://lupantech.github.io/' },
  ],
};

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function personCard(p) {
  const avatar = p.photo
    ? `<img class="card__photo" src="assets/people/${p.photo}.jpg" alt="${p.name}" loading="lazy" width="200" height="200" />`
    : `<span class="card__photo card__photo--mono" aria-hidden="true">${initials(p.name)}</span>`;
  const tag = p.tag
    ? `<span class="card__tag card__tag--${p.tag}">${p.tag}</span>`
    : '';
  const nameEl = p.home
    ? `<a class="card__name" href="${p.home}" target="_blank" rel="noopener">${p.name}<span class="card__arrow">↗</span></a>`
    : `<span class="card__name">${p.name}</span>`;
  const aff = p.aff ? `<p class="card__aff">${p.aff}</p>` : '';
  const area = p.area ? `<p class="card__area">${p.area}</p>` : '';
  return `<article class="card">
    <div class="card__media">${avatar}${tag}</div>
    ${nameEl}
    ${aff}
    ${area}
  </article>`;
}

function renderPeople(id, list) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = list.map(personCard).join('');
}

renderPeople('speakers-grid', PEOPLE.speakers);
renderPeople('organizers-grid', PEOPLE.organizers);
renderPeople('advisors-grid', PEOPLE.advisors);

/* ---- nav: shrink/solidify on scroll ---- */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---- mobile menu ---- */
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('is-open');
  toggle.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

/* ---- scroll reveal ---- */
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* safety net: never leave content hidden if the observer hasn't fired */
setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach(el => {
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight) el.classList.add('in');
}), 1800);
