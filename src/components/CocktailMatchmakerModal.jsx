import React from 'react';
import { X, Wand2, Sparkles } from 'lucide-react';

export function getEmojiForInterest(interest) {
  if (!interest) return '✨';
  const r = String(interest).toLowerCase();
  if (r.includes('dog') || r.includes('pet')) return '🐕';
  if (r.includes('whiskey') || r.includes('bourbon')) return '🥃';
  if (r.includes('cocktail')) return '🍸';
  if (r.includes('beer')) return '🍺';
  if (r.includes('wine')) return '🍷';
  if (r.includes('soccer') || r.includes('bay fc')) return '⚽';
  if (r.includes('tennis')) return '🎾';
  if (r.includes('golf')) return '⛳';
  if (r.includes('cycling') || r.includes('bike')) return '🚴';
  if (r.includes('running') || r.includes('hike') || r.includes('hiking')) return '🏃';
  if (r.includes('lehigh') || r.includes('stanford') || r.includes('cornell')) return '🎓';
  if (r.includes('food') || r.includes('cook') || r.includes('bake') || r.includes('baking')) return '🍕';
  if (r.includes('music') || r.includes('art') || r.includes('design')) return '🎨';
  if (r.includes('book') || r.includes('reading')) return '📚';
  if (r.includes('travel')) return '✈️';
  if (r.includes('kid')) return '👶';
  return '✨';
}

export function getShortActionPrompt(reason) {
  if (!reason) return null;
  const r = String(reason).toLowerCase();
  if (r.includes('dog') || r.includes('pet')) return 'Ask about favorite dogs & pets';
  if (r.includes('whiskey') || r.includes('bourbon')) return 'Compare favorite whiskeys & cocktails';
  if (r.includes('lehigh') || r.includes('stanford') || r.includes('cornell')) return 'Exchange campus memories & stories';
  if (r.includes('bay fc') || r.includes('soccer')) return 'Talk Bay FC & match highlights';
  if (r.includes('beer') || r.includes('wine') || r.includes('cocktail')) return `Cheers over a glass of ${reason}`;
  if (r.includes('kid')) return 'Ask about kids & family';
  if (r.includes('food') || r.includes('cook') || r.includes('bake') || r.includes('baking')) return 'Swap favorite food & recipe spots';
  if (r.includes('travel')) return 'Compare favorite trip destinations';
  if (r.includes('music')) return 'Talk concert & playlist recommendations';
  if (r.includes('running') || r.includes('hike') || r.includes('hiking')) return 'Swap favorite running & hiking trails';
  if (r.includes('golf')) return 'Talk favorite golf courses';
  if (r.includes('tennis')) return 'Chat about tennis matches';
  if (r.includes('cycling') || r.includes('bike')) return 'Swap favorite cycling routes';
  if (r.includes('book') || r.includes('reading')) return 'Compare book & reading recommendations';
  if (r.includes('art') || r.includes('design') || r.includes('pottery')) return 'Swap creative & design projects';
  return null;
}

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
                  <div style={{ marginTop: 8 }}>
                    {/* Shared Interest Emoji Pill Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                      {res.reasons.map(reason => (
                        <span 
                          key={reason} 
                          style={{ 
                            fontSize: 11, 
                            fontWeight: 700, 
                            background: 'rgba(56, 189, 248, 0.15)', 
                            color: '#7dd3fc', 
                            padding: '3px 9px', 
                            borderRadius: 9999, 
                            border: '1px solid rgba(56, 189, 248, 0.3)', 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: 4 
                          }}
                        >
                          <span>{getEmojiForInterest(reason)}</span>
                          <span>{reason}</span>
                        </span>
                      ))}
                    </div>

                    {/* Top 1-2 Concise Action Prompts */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {res.reasons.slice(0, 2).map(reason => {
                        const promptText = getShortActionPrompt(reason);
                        if (!promptText) return null;
                        return (
                          <div 
                            key={reason} 
                            style={{ 
                              fontSize: 11, 
                              color: '#94a3b8', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 6,
                              background: 'rgba(15, 23, 42, 0.4)',
                              padding: '4px 8px',
                              borderRadius: 6,
                              border: '1px solid rgba(255, 255, 255, 0.06)'
                            }}
                          >
                            <Sparkles style={{ width: 11, height: 11, color: '#34d399', flexShrink: 0 }} />
                            <span>💬 <em>"{promptText}"</em></span>
                          </div>
                        );
                      })}
                    </div>
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
