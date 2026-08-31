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
    <div className="modal-backdrop no-print" onClick={onClose}>
      <div className="glass-panel modal-card" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
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
              .filter(n => n && n.name && n.type !== 'CONTEXT_HUB')
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                    {res.reasons.map(reason => {
                      let icebreaker = `Connect with ${res.node.name} over your shared love for ${reason}!`;
                      const r = reason.toLowerCase();
                      if (r.includes('dog')) icebreaker = `Ask ${res.node.name} about their favorite dogs & pets!`;
                      else if (r.includes('whiskey')) icebreaker = `Compare favorite whiskey & cocktail recommendations with ${res.node.name}!`;
                      else if (r.includes('lehigh')) icebreaker = `Exchange Lehigh campus memories & stories with ${res.node.name}!`;
                      else if (r.includes('bay fc')) icebreaker = `Talk Bay FC matches & team highlights with ${res.node.name}!`;
                      else if (r.includes('beer') || r.includes('wine') || r.includes('cocktail')) icebreaker = `Cheers with ${res.node.name} over a glass of ${reason}!`;
                      else if (r.includes('kid')) icebreaker = `Ask ${res.node.name} about their kids & family!`;
                      else if (r.includes('food') || r.includes('cook') || r.includes('bake')) icebreaker = `Swap favorite food & recipe spots with ${res.node.name}!`;

                      return (
                        <div key={reason} style={{ fontSize: 11, background: 'rgba(56, 189, 248, 0.12)', color: '#7dd3fc', padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                          <Sparkles style={{ width: 12, height: 12, marginTop: 2, flexShrink: 0, color: '#38bdf8' }} />
                          <span><strong>💬 Icebreaker ({reason}):</strong> {icebreaker}</span>
                        </div>
                      );
                    })}
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
