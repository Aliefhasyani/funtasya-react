import { useState, useEffect } from 'react';
import type { FreeGame } from '../types/game';
import { fetchGames } from '../services/rawgApi';

export function useGames(params: Record<string, string> = {}) {
  const [games, setGames] = useState<FreeGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchGames(params)
      .then((data: FreeGame[]) => { setGames(data); setLoading(false); })
      .catch((err: Error) => { setError(err.message); setLoading(false); });
  }, [JSON.stringify(params)]);

  return { games, loading, error };
}
