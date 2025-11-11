import { AREA_ICONS, AREAS } from './config.js';
import { getHistory, getLastHistory } from './persistence.js';

export function renderQuestion(state, BASE_Q) {
  const total = state.drawn.length;
  const cur = state.drawn[state.idx];
  // aplicar estilo área
  setAreaStyle(cur.areaIndex);
  document.getElementById('progress').textContent = `${state.idx+1}/${total}`;
  document.getElementById('progressFoot').textContent = `${state.idx+1}/${total}`;
  document.getElementById('areaBadge').textContent = `Área: ${cur.area}`;
  document.getElementById('levelBadge').textContent = `Nível: ${cur.level===1?'Básico':cur.level===2?'Intermediário':'Avançado'}`;
  document.getElementById('areaDot').textContent = AREA_ICONS[cur.area] || "•";
  document.getElementById('questionText').textContent = cur.question;
  document.querySelectorAll('#likert .opt').forEach(b => b.classList.remove('active'));
  hideExample();
}

export function drawDiamond({areaScores, geral, hist}, state) {
  // reutilizar lógica existente com melhorias (hover tooltips, responsive)
}

export function drawMini(periodo, state) {
  // idem
}

// Outras funções de UI: bootstrapAvatars, showExample, hideExample, buildAreaFilter, fillResults etc.
// Incluir focos, acessibilidade, feedbacks visuais/sonoros leves