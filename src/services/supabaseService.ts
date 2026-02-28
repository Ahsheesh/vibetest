import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const getUserId = () => {
  let userId = localStorage.getItem('weather_app_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('weather_app_user_id', userId);
  }
  return userId;
};

export async function addFavorite(cityName: string): Promise<void> {
  const userId = getUserId();
  const { error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, city_name: cityName }]);

  if (error) throw error;
}

export async function removeFavorite(cityName: string): Promise<void> {
  const userId = getUserId();
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('city_name', cityName);

  if (error) throw error;
}

export async function getFavorites(): Promise<string[]> {
  const userId = getUserId();
  const { data, error } = await supabase
    .from('favorites')
    .select('city_name')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(item => item.city_name);
}

export async function addSearchHistory(cityName: string): Promise<void> {
  const userId = getUserId();
  const { error } = await supabase
    .from('search_history')
    .insert([{ user_id: userId, city_name: cityName }]);

  if (error) throw error;
}

export async function getSearchHistory(): Promise<string[]> {
  const userId = getUserId();
  const { data, error } = await supabase
    .from('search_history')
    .select('city_name')
    .eq('user_id', userId)
    .order('searched_at', { ascending: false })
    .limit(10);

  if (error) throw error;
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const item of data || []) {
    if (!seen.has(item.city_name)) {
      seen.add(item.city_name);
      unique.push(item.city_name);
    }
  }

  return unique;
}
