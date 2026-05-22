import { useState, useEffect } from 'react';
import type { FreeGameDetail } from '../types/game';
import { fetchGameDetail } from '../services/rawgApi';

export function useGameDetail(id: number | null) {
  const [game, setGame] = useState<FreeGameDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) { setGame(null); return; }
    setLoading(true);
    setError(null);
    fetchGameDetail(id)
      .then((data: FreeGameDetail) => { setGame(data); setLoading(false); })
      .catch((err: Error) => { setError(err.message); setLoading(false); });
  }, [id]);

  return { game, loading, error };
}
