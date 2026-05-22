import { useEffect } from 'react';
import type { FreeGame } from '../../types/game';
import { useGameDetail } from '../../hooks/useGameDetail';
import { useCart } from '../../context/CartContext';

interface Props {
  game: FreeGame;
  onClose: () => void;
}

export default function GameDetail({ game, onClose }: Props) {
  const { game: detail, loading } = useGameDetail(game.id);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(game.id);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '860px', maxHeight: '90vh', overflowY: 'auto',
          borderRadius: '20px', background: '#181818',
          border: '1px solid rgba(255,255,255,0.08)', scrollbarWidth: 'none',
        }}
      >
        <div style={{ position: 'relative', height: '300px', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
          <img
            src={detail?.screenshots?.[0]?.image ?? game.thumbnail}
            alt={game.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(24,24,24,1) 100%)',
          }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', fontSize: '20px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
          <div style={{ position: 'absolute', bottom: '24px', left: '28px', right: '28px' }}>
            <h2 style={{
              fontFamily: "'Inter', sans-serif", fontSize: '30px', fontWeight: 900,
              color: '#fff', margin: '0 0 10px', letterSpacing: '-0.04em', lineHeight: 1.1,
            }}>
              {game.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700,
                padding: '3px 10px', borderRadius: '20px',
                background: 'rgba(255,255,255,0.15)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>{game.genre}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                {game.platform}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                {game.release_date}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                onClick={() => inCart ? removeFromCart(game.id) : addToCart(game)}
                style={{
                  padding: '10px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: inCart ? 'rgba(255,255,255,0.12)' : '#ffffff',
                  color: inCart ? 'rgba(255,255,255,0.7)' : '#111111',
                  fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 800,
                  transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '8px',
                }}
                onMouseEnter={e => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.transform = 'scale(1)';
                }}
              >
                {inCart ? (
                  <><span>✓</span> In Cart — Remove</>
                ) : (
                  <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '15px', height: '15px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg> Add to Cart</>
                )}
              </button>
              {detail?.game_url && (
                <a
                  href={detail.game_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 20px', borderRadius: '10px', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700,
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.14)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'; }}
                >
                  Play Free
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '13px', height: '13px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 28px 32px' }}>
          {loading && (
            <p style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.3)', fontSize: '14px', margin: '0 0 20px' }}>
              Loading details…
            </p>
          )}

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.75,
            color: 'rgba(255,255,255,0.55)', margin: '0 0 24px',
          }}>
            {detail?.description ?? game.short_description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            {[
              { label: 'Developer', value: game.developer },
              { label: 'Publisher', value: game.publisher },
              { label: 'Release Date', value: game.release_date },
              { label: 'Platform', value: game.platform },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>{label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>

          {detail?.minimum_system_requirements && (
            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                Min. System Requirements
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {Object.entries(detail.minimum_system_requirements).map(([key, val]) => val && (
                  <div key={key} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px 12px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'capitalize', margin: '0 0 3px' }}>{key}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detail?.screenshots && detail.screenshots.length > 0 && (
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                Screenshots
              </p>
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
                {detail.screenshots.map(s => (
                  <img key={s.id} src={s.image} alt="screenshot" style={{
                    height: '110px', width: '185px', objectFit: 'cover', borderRadius: '8px',
                    flexShrink: 0, border: '1px solid rgba(255,255,255,0.08)',
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
