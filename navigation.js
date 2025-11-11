export const goto = (id) => {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.setAttribute('aria-hidden', 'true');
  });
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    el.setAttribute('aria-hidden', 'false');
    el.focus(); // mover foco para acessibilidade
  }
};

export const headerActive = (on = true) => {
  const hdr = document.getElementById('appHeader');
  hdr.classList.toggle('hdr-active', on);
};

export const evoBgToggle = (on = true) => {
  const e = document.getElementById('evoBg');
  e.classList.toggle('show', on);
};