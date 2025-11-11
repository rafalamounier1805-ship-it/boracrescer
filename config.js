// Configurações gerais
export const APP_VERSION = 'v2.3';
export const AREAS = [
  "Autoconhecimento","Resiliência Emocional","Saúde Física Básica","Performance e Vitalidade",
  "Aprendizado Contínuo","Pensamento Crítico","Carreira e Propósito","Finanças Pessoais",
  "Investimento e Riqueza","Relacionamentos Íntimos","Círculo Social","Lazer e Cultura",
  "Espiritualidade","Contribuição Social","Ambiente e Organização"
];
export const AREA_ICONS = {
  "Autoconhecimento":"🧭", "Resiliência Emocional":"🧠", "Saúde Física Básica":"💪",
  "Performance e Vitalidade":"⚡", "Aprendizado Contínuo":"📚","Pensamento Crítico":"🧩",
  "Carreira e Propósito":"🎯","Finanças Pessoais":"💼","Investimento e Riqueza":"📈",
  "Relacionamentos Íntimos":"💞","Círculo Social":"🤝","Lazer e Cultura":"🎨",
  "Espiritualidade":"✨","Contribuição Social":"🌍","Ambiente e Organização":"🧹"
};

// Google Sheets WebApp endpoint config
export let sheetsConfig = {
  endpoint: '',
  token: '',
  enabled: false
};

// Meta thresholds (evita “magic numbers” espalhados)
export const SCORE_THRESHOLD = {
  level1_to_2: 8.0,
  level2_to_3: 9.0,
  fail: 4.0
};