import { sheetsConfig } from './config.js';

const LOCAL_USERS = 'bc_users';
const LOCAL_HIST = u => `bc_hist_${u}`;
const LOCAL_LEVELS = u => `bc_levels_${u}`;
const LOCAL_SYNC_CFG = 'bc_sync_cfg';

export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS)) || [
      { name: "Rafa", icon: "👤" },
      { name: "Nina", icon: "🧑‍🚀" },
      { name: "Kai", icon: "👩‍💻" }
    ];
  } catch {
    return [];
  }
};

export const setUsers = (list) => {
  localStorage.setItem(LOCAL_USERS, JSON.stringify(list));
};

export const getLevels = (user) => {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_LEVELS(user)));
    if (raw) return raw;
  } catch {}
  const init = {};
  AREAS.forEach(a => init[a] = { level: 1, streak: 0 });
  return init;
};

export const setLevels = (user, levels) => {
  localStorage.setItem(LOCAL_LEVELS(user), JSON.stringify(levels));
};

export const pushHistory = (user, payload) => {
  const k = LOCAL_HIST(user);
  const hist = JSON.parse(localStorage.getItem(k) || '[]');
  hist.push(payload);
  localStorage.setItem(k, JSON.stringify(hist));
  return hist;
};

export const getHistory = (user) => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_HIST(user))) || [];
  } catch {
    return [];
  }
};

export const getLastHistory = (user) => {
  const hist = getHistory(user);
  return hist.length ? hist[hist.length - 1] : null;
};

// Sync config
export const loadSyncConfig = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_SYNC_CFG)) || {};
  } catch {
    return {};
  }
};

export const saveSyncConfig = (cfg) => {
  localStorage.setItem(LOCAL_SYNC_CFG, JSON.stringify(cfg));
};

// Sheets integration
export const sendSessionToSheets = async (payload) => {
  if (!sheetsConfig.enabled || !sheetsConfig.endpoint) {
    return { ok: false, error: 'Sync disabled or endpoint missing' };
  }
  const res = await fetch(sheetsConfig.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: sheetsConfig.token, action: 'ingestSession', ...payload })
  });
  let j = null;
  try {
    j = await res.json();
  } catch {}
  return j || { ok: res.ok };
};