import type { FreeGame } from '../../types/game';

interface Props {
  game: FreeGame;
  onSelect: (game: FreeGame) => void;
}

export default function GameCard({ game, onSelect }: Props) {
  return (
    <div
      onClick={() => onSelect(game)}
      style={{
        width: '220px',
        flexShrink: 0,
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#1c1c1c',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-6px)';
        el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)';
        el.style.borderColor = 'rgba(255,255,255,0.15)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
        el.style.borderColor = 'rgba(255,255,255,0.06)';
      }}
    >
      <div style={{ width: '100%', height: '140px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={game.thumbnail}
          alt={game.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
        />
        <span style={{
          position: 'absolute', top: '8px', left: '8px',
          background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '10px',
          fontWeight: 700, padding: '2px 8px', borderRadius: '20px',
          fontFamily: "'Inter', sans-serif", backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          FREE
        </span>
      </div>

      <div style={{ padding: '12px 14px' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700,
          color: '#ffffff', margin: '0 0 8px', lineHeight: 1.35,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {game.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600,
            color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.07)',
            borderRadius: '4px', padding: '2px 7px',
          }}>
            {game.genre}
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 500,
            color: 'rgba(255,255,255,0.3)',
          }}>
            {game.platform === 'PC (Windows)' ? '🖥 PC' : game.platform === 'Web Browser' ? '🌐 Browser' : game.platform}
          </span>
        </div>
      </div>
    </div>
  );
}
