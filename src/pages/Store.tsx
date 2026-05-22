import { useState } from 'react';
import { useGames } from '../hooks/useGames';
import GameCard from '../components/games/GameCard';
import GameDetail from '../components/games/GameDetail';
import type { FreeGame } from '../types/game';

const CATEGORIES = [
  { label: 'All Games',    value: '' },
  { label: 'MMORPG',       value: 'mmorpg' },
  { label: 'Shooter',      value: 'shooter' },
  { label: 'Strategy',     value: 'strategy' },
  { label: 'Battle Royale',value: 'battle-royale' },
  { label: 'MOBA',         value: 'moba' },
  { label: 'Racing',       value: 'racing' },
  { label: 'Sports',       value: 'sports' },
  { label: 'Survival',     value: 'survival' },
  { label: 'Fighting',     value: 'fighting' },
  { label: 'Action RPG',   value: 'action-rpg' },
  { label: 'Card Games',   value: 'card' },
  { label: 'Tower Defense',value: 'tower-defense' },
  { label: 'Anime',        value: 'anime' },
  { label: 'Sci-Fi',       value: 'sci-fi' },
  { label: 'Fantasy',      value: 'fantasy' },
];

const SORT_OPTIONS = [
  { label: 'Relevance',    value: 'relevance' },
  { label: 'Newest',       value: 'release-date' },
  { label: 'Alphabetical', value: 'alphabetical' },
  { label: 'Popularity',   value: 'popularity' },
];

const sidebarItem = (active: boolean): React.CSSProperties => ({
  display: 'block', width: '100%', textAlign: 'left', padding: '9px 14px',
  borderRadius: '8px', border: 'none', cursor: 'pointer',
  fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: active ? 700 : 500,
  color: active ? '#ffffff' : 'rgba(255,255,255,0.45)',
  background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
  transition: 'all 0.15s',
});

export default function Store() {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('relevance');
  const [selected, setSelected] = useState<FreeGame | null>(null);

  const params: Record<string, string> = {};
  if (category) params['category'] = category;
  if (sort !== 'relevance') params['sort-by'] = sort;

  const { games, loading, error } = useGames(params);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 48px 80px', display: 'flex', gap: '32px' }}>

      <aside style={{ width: '220px', flexShrink: 0 }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px 4px' }}>
          Categories
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              style={sidebarItem(category === cat.value)}
              onClick={() => setCategory(cat.value)}
              onMouseEnter={e => { if (category !== cat.value) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (category !== cat.value) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 900, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.03em' }}>
              {CATEGORIES.find(c => c.value === category)?.label ?? 'All Games'}
            </h1>
            {!loading && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                {games.length} games available
              </p>
            )}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', padding: '8px 14px', color: '#fff', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, outline: 'none',
            }}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value} style={{ background: '#1c1c1c' }}>{o.label}</option>
            ))}
          </select>
        </div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} style={{
                height: '210px', borderRadius: '12px',
                background: 'linear-gradient(90deg, #1c1c1c 25%, #252525 50%, #1c1c1c 75%)',
                backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
              }} />
            ))}
          </div>
        )}

        {error && (
          <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,100,100,0.7)', fontSize: '14px' }}>
            Failed to load: {error}
          </p>
        )}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {games.map(game => (
              <GameCard key={game.id} game={game} onSelect={setSelected} />
            ))}
          </div>
        )}
      </div>

      {selected && <GameDetail game={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
