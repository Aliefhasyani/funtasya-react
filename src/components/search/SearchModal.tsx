import { useState, useEffect, useRef } from 'react';
import type { FreeGame } from '../../types/game';
import { fetchGames } from '../../services/rawgApi';
import GameDetail from '../games/GameDetail';

interface Props {
  onClose: () => void;
}

export default function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState('');
  const [allGames, setAllGames] = useState<FreeGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<FreeGame | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    fetchGames()
      .then((data: FreeGame[]) => { setAllGames(data); setLoading(false); })
      .catch(() => setLoading(false));
    return () => { document.body.style.overflow = ''; };
  }, []);

  const results = query.trim().length < 2
    ? []
    : allGames.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).slice(0, 20);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '80px 24px 40px',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '680px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '14px', padding: '14px 20px', marginBottom: '24px',
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
            style={{ width: '20px', height: '20px', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for games…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: 500,
              color: '#ffffff', caretColor: '#ffffff',
            }}
          />
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: "'Inter', sans-serif",
            fontWeight: 600, padding: '4px 10px', borderRadius: '6px',
            background2: 'rgba(255,255,255,0.06)',
          } as React.CSSProperties}>ESC</button>
        </div>

        {loading && (
          <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.3)', fontSize: '14px', textAlign: 'center' }}>
            Loading game library…
          </p>
        )}

        {!loading && query.trim().length < 2 && (
          <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.25)', fontSize: '14px', textAlign: 'center' }}>
            Type at least 2 characters to search
          </p>
        )}

        {results.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px', overflow: 'hidden', maxHeight: '60vh', overflowY: 'auto',
            scrollbarWidth: 'none',
          }}>
            {results.map((game, i) => (
              <div
                key={game.id}
                onClick={() => setSelected(game)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px',
                  cursor: 'pointer', transition: 'background 0.15s',
                  borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              >
                <img src={game.thumbnail} alt={game.title} style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {game.title}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0, fontWeight: 500 }}>
                    {game.genre} · {game.platform}
                  </p>
                </div>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 700,
                  padding: '2px 8px', borderRadius: '20px',
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)',
                }}>FREE</span>
              </div>
            ))}
          </div>
        )}

        {!loading && query.trim().length >= 2 && results.length === 0 && (
          <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.3)', fontSize: '14px', textAlign: 'center' }}>
            No games found for "{query}"
          </p>
        )}
      </div>

      {selected && <GameDetail game={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
