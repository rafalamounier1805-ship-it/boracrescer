import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    const { user, date, geral, emo, areas } = req.body || {};
    if (!user || !date || geral == null || !emo || !Array.isArray(areas)) {
      return res.status(400).json({ error: 'payload inválido' });
    }

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE, {
      auth: { persistSession: false }
    });

    const { data: s, error: e1 } = await supabase
      .from('sessions')
      .insert([{ user_name: user, date, geral, emo }])
      .select('id')
      .single();
    if (e1) throw e1;

    const payload = areas.map(a => ({ session_id: s.id, area: a.area, score: a.score }));
    const { error: e2 } = await supabase.from('session_areas').insert(payload);
    if (e2) throw e2;

    res.status(200).json({ ok: true, session_id: s.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
