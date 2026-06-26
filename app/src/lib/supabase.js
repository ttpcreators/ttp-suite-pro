import { createClient } from '@supabase/supabase-js'

// Clé publishable (publique par design) ; la sécurité repose sur les politiques RLS.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://tytbkyyfhlyhxpbcwnkw.supabase.co'
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_LQS5P8cn2kd8pKnN7kiilg_y9UgGLAx'

export const supabase = createClient(url, key)
