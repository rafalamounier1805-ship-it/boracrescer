import { AREAS, SCORE_THRESHOLD } from './config.js';
import { getLevels, setLevels, pushHistory, getHistory, getLastHistory } from './persistence.js';

// util functions
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// alias etc
export function alias(area) {
  const map = {
    "Autoconhecimento": "se ouvir",
    "Resiliência Emocional": "se regular emocionalmente",
    "Saúde Física Básica": "cuidar do corpo",
    "Performance e Vitalidade": "performar com energia",
    "Aprendizado Contínuo": "aprender",
    "Pensamento Crítico": "analisar com critério",
    "Carreira e Propósito": "direcionar a carreira",
    "Finanças Pessoais": "organizar finanças",
    "Investimento e Riqueza": "investir",
    "Relacionamentos Íntimos": "nutrir a relação",
    "Círculo Social": "cultivar amizades",
    "Lazer e Cultura": "viver cultura/lazer",
    "Espiritualidade": "praticar espiritualidade",
    "Contribuição Social": "contribuir com a sociedade",
    "Ambiente e Organização": "organizar o ambiente"
  };
  return map[area] || "agir no tema";
}

// Geração de base de perguntas (manter igual + possível externalizar JSON)
export function genBase(LEVEL_PATTERNS, EXAMPLES) {
  const BASE = {};
  AREAS.forEach((area, idx) => {
    const out = { n1: [], n2: [], n3: [] };
    LEVEL_PATTERNS.n1.forEach(p => {
      out.n1.push([p.replace("{area}", area).replace("{area_acao}", alias(area)), EXAMPLES[area].n1]);
    });
    const n2p = [...LEVEL_PATTERNS.n2];
    if (idx < 5) n2p.push("Você consolidou o aprendizado de {area} em 1 página?");
    n2p.forEach(p => {
      const q = p.replace("{area}", area).replace("{area_acao}", alias(area));
      const ex = p.includes("consolidou o aprendizado") ? "Ex.: Página-síntese com conceitos, exemplos e aplicação." : EXAMPLES[area].n2;
      out.n2.push([q, ex]);
    });
    LEVEL_PATTERNS.n3.forEach(p => {
      out.n3.push([p.replace("{area}", area).replace("{area_acao}", alias(area)), EXAMPLES[area].n3]);
    });
    BASE[area] = out;
  });
  return BASE;
}

// continuar com drawDaily20, computeScoresAndProgress, etc.
// lembrar de usar constantes SCORE_THRESHOLD ao invés de magic numbers