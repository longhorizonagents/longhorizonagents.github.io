/* WLHA — Workshop on Long-Horizon Agents
   People data + light interaction layer. No build step; runs as-is on GitHub Pages. */

document.documentElement.classList.add('js');

const PEOPLE = {
  speakers: [
    { name: 'Yilun Du',       aff: 'Assistant Professor, Harvard University',       photo: 'yilun-du',       home: 'https://yilundu.github.io/' },
    { name: 'Zifan Wang',     aff: 'Meta MSL, London',                                  photo: 'zifan-wang',     home: 'https://zifanw.notion.site/' },
    { name: 'Baishakhi Ray',  aff: 'Associate Professor, Columbia University',      photo: 'baishakhi-ray',  home: 'https://www.rayb.info/' },
    { name: 'James Zou',      aff: 'Associate Professor, Stanford University',      photo: 'james-zou',      home: 'https://www.james-zou.com/' },
    { name: 'Luyu Gao',       aff: 'OpenAI',                                        photo: 'luyu-gao',       home: 'https://luyug.github.io/' },
    { name: 'Yixuan He',      aff: 'Assistant Professor, Arizona State University',  photo: 'yixuan-he',      home: 'https://sherylhyx.github.io/' },
    { name: 'Bing Liu',       aff: 'Scale AI',                                      photo: 'bing-liu',       home: 'https://bingliu.me/' },
    { name: 'Yi Tay',         aff: 'Google DeepMind (tentative)',                   photo: 'yi-tay',         home: 'https://www.yitay.net/' },
  ],
  organizers: [
    { name: 'Yizhi Li',       aff: 'Univ. of Manchester · IQuest',    area: 'Code-LLM agents · RL for LLMs · open evaluation',        photo: 'yizhi-li',       home: 'https://yizhilll.github.io/' },
    { name: 'Dingmin Wang',   aff: 'AWS AI Lab',                      area: 'Long-horizon code agents',                               photo: 'dingmin-wang',   home: 'https://www.dingmin.wang/' },
    { name: 'Yuxuan Zhang',   aff: 'Univ. of British Columbia',       area: 'AI agents · ClawBench · deep-research agents',           photo: 'yuxuan-zhang',   home: 'https://yuxuan.world/' },
    { name: 'Mingchen Zhuge', aff: 'Recursive',                       area: 'Code generation: MetaGPT, GPTSwarm, agent-as-a-judge, Neural Computers', photo: 'mingchen-zhuge', home: 'https://metauto.ai/' },
    { name: 'Jian Yang',      aff: 'Beihang University',              area: 'LLMs & code: Qwen, Qwen2.5-Coder · evaluation: KOR-Bench, McEval', photo: 'jian-yang',      home: 'https://csjianyang.github.io/' },
    { name: 'Hanqi Yan',      aff: "King's College London",          area: 'CoT compression · agentic evaluation & safety',          photo: 'hanqi-yan',      home: 'https://hanqi-qi.github.io/' },
    { name: 'Zhuofeng Li',    aff: 'Texas A&amp;M · Stanford (visiting)', area: 'Post-training · RL infrastructure · agent evaluation',    photo: 'zhuofeng-li',    home: 'https://zhuofeng-li.github.io/' },
  ],
  advisors: [
    { name: 'Wenhu Chen',     aff: 'Meta MSL · Univ. of Waterloo',    area: 'Multimodal pre-training & evaluation',                   photo: 'wenhu-chen',     home: 'https://wenhuchen.github.io/' },
    { name: 'Qian Liu',       aff: 'xAI',                             area: 'LLMs · code intelligence (StarCoder, OpenCoder)',        photo: 'qian-liu',       home: 'https://siviltaram.github.io/' },
    { name: 'Ping Nie',       aff: 'Univ. of Waterloo',               area: 'Scaling agents · web-search agents',                     photo: 'ping-nie',       home: 'https://github.com/erenup' },
    { name: 'Peter West',     aff: 'Univ. of British Columbia',       area: 'NLP · capabilities & limits of LLMs',                    photo: 'peter-west',     home: 'https://www.cs.ubc.ca/people/peter-west' },
    { name: 'Ge Zhang',       aff: 'ByteDance Seed · M-A-P',          area: 'Synthetic data & evaluation · pretraining',              photo: 'ge-zhang',       home: 'https://scholar.google.com/citations?user=qyTrq4kAAAAJ' },
    { name: 'Pan Lu',         aff: 'Stanford University',             area: 'Multimodal & mathematical reasoning · tool-augmented agents', photo: 'pan-lu',     home: 'https://lupantech.github.io/' },
    { name: 'Hanrong Ye',     aff: 'NVIDIA',                          area: 'Omni-modal LLMs · agentic intelligence',                 photo: 'hanrong-ye',     home: 'https://sites.google.com/site/yhrspace/' },
    { name: 'Xin Liu',        aff: 'Amazon',                          area: 'Pre-training & post-training generalization',            photo: 'xin-liu',        home: 'https://seanliu96.github.io/' },
    { name: 'Greg Durrett',   aff: 'New York University',             area: 'NLP · reasoning, verification & evaluation',             photo: 'greg-durrett',   home: 'https://gregdurrett.github.io/' },
    { name: 'Jianwen Xie',    aff: 'Lambda',                          area: 'Generative modeling · VLMs · AI for science',            photo: 'jianwen-xie',    home: 'http://www.stat.ucla.edu/~jxie/' },
  ],
};

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function personCard(p) {
  const avatar = p.photo
    ? `<img class="card__photo" src="assets/people/${p.photo}.jpg" alt="${p.name}" loading="lazy" width="200" height="200" />`
    : `<span class="card__photo card__photo--mono" aria-hidden="true">${initials(p.name)}</span>`;
  const nameEl = p.home
    ? `<a class="card__name" href="${p.home}" target="_blank" rel="noopener">${p.name}<span class="card__arrow">↗</span></a>`
    : `<span class="card__name">${p.name}</span>`;
  const aff = p.aff ? `<p class="card__aff">${p.aff}</p>` : '';
  const area = p.area ? `<p class="card__area">${p.area}</p>` : '';
  return `<article class="card">
    <div class="card__media">${avatar}</div>
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
