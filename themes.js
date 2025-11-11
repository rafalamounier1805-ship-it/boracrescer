// Permite troca de tema
export const THEMES = {
  metal: {
    '--bg': '#0e0f13',
    '--panel': '#171923',
    '--accent': '#f7d040'
  },
  neon: {
    '--bg': '#001a33',
    '--panel': '#112233',
    '--accent': '#66ffcc'
  },
  aurora: {
    '--bg': '#0a1f2f',
    '--panel': '#142733',
    '--accent': '#ffcc66'
  }
  // adicionar mais
};

export function applyTheme(themeName) {
  const theme = THEMES[themeName];
  if (!theme) return;
  Object.entries(theme).forEach(([varName, value]) => {
    document.documentElement.style.setProperty(varName, value);
  });
  localStorage.setItem('bc_theme', themeName);
}

export function initTheme() {
  const saved = localStorage.getItem('bc_theme') || 'metal';
  applyTheme(saved);
}