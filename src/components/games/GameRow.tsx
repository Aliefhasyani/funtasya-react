import { useRef } from 'react';
import type { FreeGame } from '../../types/game';
import { useGames } from '../../hooks/useGames';
import GameCard from './GameCard';

interface Props {
  title: string;
  params?: Record<string, string>;
  onSelect: (game: FreeGame) => void;
}

const arrowBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: '36px', height: '36px', borderRadius: '50%',
  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#ffffff', cursor: 'pointer', fontSize: '16px', flexShrink: 0,
  transition: 'background 0.15s',
};

export default function GameRow({ title, params = {}, onSelect }: Props) {
  const { games, loading, error } = useGames(params);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -700 : 700, behavior: 'smooth' });
  };

  return (
    <section style={{ marginBottom: '52px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{
          fontFamily: "'Inter', sans-serif", fontSize: '22px', fontWeight: 800,
          color: '#ffffff', margin: 0, letterSpacing: '-0.03em',
        }}>
          {title}
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={arrowBtn}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)'; }}
            onClick={() => scroll('left')}>←</button>
          <button style={arrowBtn}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)'; }}
            onClick={() => scroll('right')}>→</button>
        </div>
      </div>

      {loading && (
        <div style={{ display: 'flex', gap: '16px' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              width: '220px', height: '210px', borderRadius: '12px', flexShrink: 0,
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
        <div ref={scrollRef} style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
          {games.map(game => (
            <GameCard key={game.id} game={game} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}
