import React from 'react';
import { X, Wand2, Sparkles, MapPin } from 'lucide-react';

export default function CocktailMatchmakerModal({
  isOpen,
  onClose,
  myGuestId,
  setMyGuestId,
  nodes,
  matchmakerResults,
  flyToNode,
  setSelectedNode
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop no-print">
      <div className="glass-panel modal-card" style={{ maxWidth: 440 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span className="drawer-badge" style={{ backgroundColor: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Wand2 style={{ width: 12, height: 12 }} /> Cocktail Matchmaker
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <h2 className="drawer-title" style={{ fontSize: 20 }}>Find Guest Matches</h2>
        <p className="drawer-subtitle">Pick your name to discover top shared icebreakers!</p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Select Your Name:</label>
          <select 
            value={myGuestId}
            onChange={(e) => setMyGuestId(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none' }}
          >
            <option value="">-- Choose Guest --</option>
            {[...nodes]
              .filter(n => n && n.type === 'GUEST' && n.name)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(n => (
                <option key={n.id} value={n.id}>{n.name}</option>
              ))}
          </select>
        </div>

        {matchmakerResults.length > 0 && (
          <div className="drawer-section">
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981', marginBottom: 8 }}>Top Recommended Matches:</div>
            {matchmakerResults.map(res => (
              <div 
                key={res.node.id} 
                className="match-card"
                onClick={() => {
                  flyToNode(res.node);
                  setSelectedNode(res.node);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: 14 }}>{res.node.name}</span>
                  <span style={{ fontSize: 11, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '2px 8px', borderRadius: 9999, fontWeight: 700 }}>
                    {res.sharedScore} pts
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>
                  {res.node.cohort} • {res.node.side} Side
                </div>
                {res.reasons.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {res.reasons.map(reason => (
                      <span key={reason} style={{ fontSize: 10, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 6px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Sparkles style={{ width: 10, height: 10 }} />
                        <span>{reason}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
