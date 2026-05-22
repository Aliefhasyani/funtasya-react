import { useState } from 'react';
import Navbar from './components/navbar';
import GameRow from './components/games/GameRow';
import GameDetail from './components/games/GameDetail';
import type { FreeGame } from './types/game';

const ROWS = [
  { title: 'All Games',     params: {} },
  { title: 'MMORPGs',       params: { category: 'mmorpg' } },
  { title: 'Shooters',      params: { category: 'shooter' } },
  { title: 'Strategy',      params: { category: 'strategy' } },
  { title: 'Battle Royale', params: { category: 'battle-royale' } },
];

export default function App() {
  const [selected, setSelected] = useState<FreeGame | null>(null);

  return (
    <div style={{ background: '#111111', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 48px 80px' }}>
        <div style={{ marginBottom: '56px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>
            Welcome
          </p>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: '56px', fontWeight: 900, color: '#ffffff', margin: '0 0 16px', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
            Discover & Play<br />Amazing Games
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', color: 'rgba(255,255,255,0.45)', fontWeight: 400, margin: 0, maxWidth: '480px', lineHeight: 1.6 }}>
            Browse thousands of free-to-play games and find your next favorite.
          </p>
        </div>

        {ROWS.map(row => (
          <GameRow key={row.title} title={row.title} params={row.params} onSelect={setSelected} />
        ))}
      </main>

      {selected && <GameDetail game={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}