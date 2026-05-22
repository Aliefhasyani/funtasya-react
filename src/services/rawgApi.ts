const BASE_URL = '/freetogame-api';

export async function fetchGames(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params);
  const url = query.toString() ? `${BASE_URL}/games?${query}` : `${BASE_URL}/games`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`FreeToGame error ${res.status}`);
  return res.json();
}

export async function fetchGameDetail(id: number) {
  const res = await fetch(`${BASE_URL}/game?id=${id}`);
  if (!res.ok) throw new Error(`FreeToGame error ${res.status}`);
  return res.json();
}
