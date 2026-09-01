import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@ui_trends_favorites';
const ECO_STATS_KEY = '@ui_trends_eco_stats';

export async function getFavorites(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function toggleFavorite(id: string): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    const isFav = favorites.includes(id);
    const updated = isFav ? favorites.filter(f => f !== id) : [...favorites, id];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return !isFav;
  } catch {
    return false;
  }
}

export async function isFavorite(id: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(id);
}

export interface EcoStats {
  darkModeHours: number;
  trendsLearned: number;
  carbonSaved: number;
  lastUpdated: string;
}

export async function getEcoStats(): Promise<EcoStats> {
  try {
    const data = await AsyncStorage.getItem(ECO_STATS_KEY);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  return {
    darkModeHours: 0,
    trendsLearned: 0,
    carbonSaved: 0,
    lastUpdated: new Date().toISOString(),
  };
}

export async function updateEcoStats(partial: Partial<EcoStats>): Promise<void> {
  try {
    const current = await getEcoStats();
    const updated = { ...current, ...partial, lastUpdated: new Date().toISOString() };
    await AsyncStorage.setItem(ECO_STATS_KEY, JSON.stringify(updated));
  } catch { /* ignore */ }
}
