import React, { useState } from 'react';

export default function LiveLeaderboardModal({ isOpen, onClose, gaggleData, allGuests, activePlayer, onSelectGuest }) {
  const [activeTab, setActiveTab] = useState('masterGaggle');
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const [showGoalRules, setShowGoalRules] = useState(false);

  if (!isOpen) return null;

  const {
    masterGaggleLeaderboard = [],
    honkSpecialistLeaderboard = [],
    migrationSprintLeaderboard = [],
    globalGooseLeaderboard = [],
    soulGanderLeaderboard = [],
  } = gaggleData || {};

  const tabs = [
    {
      id: 'masterGaggle',
      label: '🪿 Master Gaggle',
      title: 'Unite All Flocks',
      metricLabel: 'Flocks',
      goal: 'Meet guests across the widest variety of distinct social circles.',
      howToWin: 'Tap "Honk at Guest" on guests from different cohorts to unlock the Golden Goose trophy!'
    },
    {
      id: 'honkSpecialist',
      label: '🎯 Honk Specialist',
      title: 'Most Honks Logged',
      metricLabel: 'Encounters',
      goal: 'Log as many total guest encounters across the reception as possible.',
      howToWin: 'Keep mingling! Each verified encounter increments your quest tally by +1.'
    },
    {
      id: 'migrationSprint',
      label: '⚡ Migration Sprint',
      title: 'Fastest 5 Encounters',
      metricLabel: 'Sprint Time',
      goal: 'Fast-flight 5 guest encounters in record time.',
      howToWin: 'Clock starts on 1st honk, stops on 5th. Lowest total elapsed time wins!'
    },
    {
      id: 'globalGoose',
      label: '📍 Global Goose',
      title: 'Most Nesting Grounds',
      metricLabel: 'Origins',
      goal: 'Discover guests traveling from the greatest variety of geographical origins.',
      howToWin: 'Seek out guests from different hometowns. Unique cities met = score.'
    },
    {
      id: 'soulGander',
      label: '🍸 Soul-Gander',
      title: 'Compatibility Matchmaker',
      metricLabel: 'Compat Pts',
      goal: 'Log encounters with top algorithmically recommended matches.',
      howToWin: 'Honk at top shared-interest matches to accumulate compatibility points.'
    }
  ];

  const getActiveLeaderboard = () => {
    switch (activeTab) {
      case 'masterGaggle': return masterGaggleLeaderboard;
      case 'honkSpecialist': return honkSpecialistLeaderboard;
      case 'migrationSprint': return migrationSprintLeaderboard;
      case 'globalGoose': return globalGooseLeaderboard;
      case 'soulGander': return soulGanderLeaderboard;
      default: return masterGaggleLeaderboard;
    }
  };

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];
  const currentList = getActiveLeaderboard();

  const formatSprintTime = (ms) => {
    if (!ms) return '--:--';
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getRankBadge = (idx) => {
    if (idx === 0) return <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.25)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12 }}>1</span>;
    if (idx === 1) return <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(203, 213, 225, 0.25)', color: '#cbd5e1', border: '1px solid rgba(203, 213, 225, 0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12 }}>2</span>;
    if (idx === 2) return <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(217, 119, 6, 0.25)', color: '#d97706', border: '1px solid rgba(217, 119, 6, 0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12 }}>3</span>;
    return <span style={{ width: 24, textAlign: 'center', fontFamily: 'monospace', fontSize: 11, color: '#64748b', fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</span>;
  };

  return (
    <div className="modal-backdrop no-print">
      <div 
        className="glass-panel modal-card"
        style={{
          maxWidth: 620,
          width: '94vw',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          borderRadius: 20,
          background: '#0f172a',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden'
        }}
      >
        {/* Header Bar */}
        <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(15, 23, 42, 0.95)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              🪿
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: '#f8fafc' }}>Live Gaggle Leaderboard</h2>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>
                Playing as <span style={{ color: '#f59e0b', fontWeight: 700 }}>{activePlayer}</span>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94a3b8', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✕
          </button>
        </div>

        {/* Category Navigation Bar (Horizontally Scrollable Pill Carousel on Mobile) */}
        <div style={{ padding: '8px 12px', background: 'rgba(2, 6, 23, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }} className="no-scrollbar">
            {tabs.map(t => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => { setActiveTab(t.id); setExpandedPlayer(null); }}
                  style={{
                    flex: '0 0 auto',
                    minWidth: 105,
                    padding: '6px 10px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    border: isActive ? '1px solid rgba(245, 158, 11, 0.6)' : '1px solid rgba(255, 255, 255, 0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: isActive ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'rgba(30, 41, 59, 0.7)',
                    color: isActive ? '#0f172a' : '#cbd5e1',
                    textAlign: 'center',
                    boxShadow: isActive ? '0 2px 10px rgba(245, 158, 11, 0.35)' : 'none'
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* High-Density Dedicated Mode & Goal Sub-Banner */}
        <div style={{ padding: '8px 16px', background: 'rgba(15, 23, 42, 0.85)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', fontSize: 11, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              🎯 {currentTabObj.title}
            </span>
            <button
              onClick={() => setShowGoalRules(!showGoalRules)}
              style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: 11, fontWeight: 700, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <span>{showGoalRules ? 'Hide Strategy' : 'Strategy & Rules'}</span>
              <span style={{ fontSize: 9 }}>{showGoalRules ? '▲' : '▼'}</span>
            </button>
          </div>
          <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 500, lineHeight: 1.35 }}>
            {currentTabObj.goal}
          </div>
          
          {showGoalRules && (
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(255, 255, 255, 0.06)', color: '#cbd5e1', fontSize: 11, whiteSpace: 'normal', wordBreak: 'break-word' }}>
              <strong style={{ color: '#f59e0b' }}>How to Win:</strong> {currentTabObj.howToWin}
            </div>
          )}
        </div>

        {/* High-Density Single-Row Leaderboard Table List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 24px 12px', display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
          {currentList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: '#64748b', fontSize: 12 }}>
              <span style={{ fontSize: 24, display: 'block', marginBottom: 6 }}>🪿</span>
              No honks logged yet for this category! Tap "Honk at Guest" to take the lead.
            </div>
          ) : (
            currentList.slice(0, 15).map((player, idx) => {
              const isSelf = player.name === activePlayer;
              const isExpanded = expandedPlayer === player.name;

              return (
                <div
                  key={player.name}
                  style={{
                    borderRadius: 12,
                    background: isSelf ? 'rgba(245, 158, 11, 0.08)' : 'rgba(30, 41, 59, 0.4)',
                    border: isSelf ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.15s ease',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  {/* Single Compact Main Row (Height ~46px) */}
                  <div
                    onClick={() => setExpandedPlayer(isExpanded ? null : player.name)}
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      userSelect: 'none',
                      gap: 10
                    }}
                  >
                    {/* Col 1: Rank Badge */}
                    <div style={{ width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getRankBadge(idx)}
                    </div>

                    {/* Col 2: Player Name & Inline Micro Stats */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: 800, fontSize: 13, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {player.name}
                        </span>
                        {isSelf && (
                          <span style={{ fontSize: 9, fontWeight: 900, padding: '1px 5px', borderRadius: 4, background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>
                            YOU
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1, display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <span>🪿 {player.honkCount} honks</span>
                        <span style={{ color: '#475569' }}>•</span>
                        <span>{player.cohortsMet.size} cohorts</span>
                      </div>
                    </div>

                    {/* Col 3: Primary Tab Metric Badge */}
                    <div style={{ flexShrink: 0, textAlign: 'right' }}>
                      {activeTab === 'masterGaggle' && (
                        <span style={{ padding: '3px 6px', borderRadius: 6, background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#f59e0b', fontWeight: 800, fontSize: 10, whiteSpace: 'nowrap' }}>
                          {player.cohortsMet.size} Flocks
                        </span>
                      )}
                      {activeTab === 'honkSpecialist' && (
                        <span style={{ padding: '3px 6px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', fontWeight: 800, fontSize: 10, whiteSpace: 'nowrap' }}>
                          {player.questsCompleted.size} Quests
                        </span>
                      )}
                      {activeTab === 'migrationSprint' && (
                        <span style={{ padding: '3px 6px', borderRadius: 6, background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', fontWeight: 800, fontSize: 10, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                          {formatSprintTime(player.sprintTimeMs)}
                        </span>
                      )}
                      {activeTab === 'globalGoose' && (
                        <span style={{ padding: '3px 6px', borderRadius: 6, background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', fontWeight: 800, fontSize: 10, whiteSpace: 'nowrap' }}>
                          {player.citiesMet.size} Origins
                        </span>
                      )}
                      {activeTab === 'soulGander' && (
                        <span style={{ padding: '3px 6px', borderRadius: 6, background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fb7185', fontWeight: 800, fontSize: 10, whiteSpace: 'nowrap' }}>
                          {player.honkCount * 10} pts
                        </span>
                      )}
                    </div>

                    {/* Col 4: Chevron */}
                    <div style={{ width: 16, flexShrink: 0, color: '#64748b', fontSize: 10, textAlign: 'center' }}>
                      {isExpanded ? '▲' : '▼'}
                    </div>
                  </div>

                  {/* Expanded Connections Pill Section */}
                  {isExpanded && (
                    <div style={{ padding: '8px 12px 10px 12px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(15, 23, 42, 0.6)', fontSize: 11 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', color: '#94a3b8', fontSize: 10, fontWeight: 700, marginBottom: 6 }}>
                        <span>Met Ganders ({player.connections.length}):</span>
                        {player.citiesMet.size > 0 && (
                          <span style={{ color: '#c084fc' }}>
                            📍 {player.citiesMet.size} Hometowns ({[...player.citiesMet].slice(0, 3).join(', ')})
                          </span>
                        )}
                      </div>
                      {player.connections.length === 0 ? (
                        <div style={{ color: '#64748b', fontStyle: 'italic', fontSize: 11 }}>No direct encounters logged yet.</div>
                      ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {player.connections.map((c, i) => (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectGuest && onSelectGuest(c.name);
                                onClose();
                              }}
                              style={{
                                padding: '3px 8px',
                                borderRadius: 6,
                                background: 'rgba(30, 41, 59, 0.9)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#e2e8f0',
                                fontSize: 10,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                            >
                              <span>🪿</span>
                              <span style={{ fontWeight: 700 }}>{c.name}</span>
                              <span style={{ color: '#f59e0b', fontSize: 9, fontFamily: 'monospace' }}>({c.cohort})</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
