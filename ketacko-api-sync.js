// api/sync.js — Vercel Serverless Function
// Déploie ceci sur Vercel pour activerla sync cloud KETACKO

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { state, token } = req.body;
    
    if (!state || !state.activeProfileId) {
      return res.status(400).json({ error: 'Invalid state' });
    }

    // Authentifier avec token (tu peux utiliser Firebase, Auth0, ou JWT)
    const userId = extractUserIdFromToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Sauvegarder dans Supabase
    const { data, error } = await supabase
      .from('ketacko_profiles')
      .upsert({
        user_id: userId,
        data: state,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    // Retourner le timestamp de sync
    return res.status(200).json({
      success: true,
      syncedAt: new Date().toISOString(),
      profileCount: Object.keys(state.profiles).length
    });

  } catch (e) {
    console.error('Sync error:', e);
    return res.status(500).json({ error: e.message });
  }
}

function extractUserIdFromToken(token) {
  // À implémenter selon ton système d'auth
  // Pour développement: utilise un userId simple
  return token || 'dev_user';
}
