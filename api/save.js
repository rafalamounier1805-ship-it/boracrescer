// api/save.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok:false, error: 'Use POST' });
  }
  try {
    const { user, payload } = req.body || {};
    if (!user || !payload) return res.status(400).json({ ok:false, error:'missing body' });

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE; // no Vercel: variável de ambiente
    const table = 'bc_history';

    const r = await fetch(`${url}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        username: user.name,
        session_date: payload.date,
        geral: payload.geral,
        emo: payload.emo,
        area_scores: payload.areaScores
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(500).json({ ok:false, error:data });
    return res.status(200).json({ ok:true, data });
  } catch (e) {
    return res.status(500).json({ ok:false, error: String(e) });
  }
}
