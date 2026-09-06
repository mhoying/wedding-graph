import React, { useState } from 'react';

export default function LiveLeaderboardModal({ isOpen, onClose, gaggleData, allGuests, activePlayer, onSelectGuest }) {
  const [activeTab, setActiveTab] = useState('masterGaggle');
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  if (!isOpen) return null;

  const {
    masterGaggleLeaderboard = [],
    honkSpecialistLeaderboard = [],
    migrationSprintLeaderboard = [],
    globalGooseLeaderboard = [],
    soulGanderLeaderboard = [],
    playerStats = {}
  } = gaggleData || {};

  const tabs = [
    {
      id: 'masterGaggle',
      label: '🪿 Master Gaggle',
      title: 'Unite All Flocks',
      goal: '🎯 Goal: Meet guests across the widest variety of distinct social circles (Cohorts like Dog Park, Google, Cornell, Lehigh, etc.).',
      howToWin: '🏆 How to Win: Tap "Honk at [Guest]" on guests from different cohorts. The player who unlocks the most cohorts wins the Golden Goose trophy!'
    },
    {
      id: 'honkSpecialist',
      label: '🎯 Honk Specialist',
      title: 'Most Honks Logged',
      goal: '🎯 Goal: Log as many total guest encounters and icebreakers across the reception as possible.',
      howToWin: '🏆 How to Win: Keep mingling and honking at guests! Each verified encounter increments your quest tally by +1.'
    },
    {
      id: 'migrationSprint',
      label: '⚡ Migration Sprint',
      title: 'Fastest 5 Encounters',
      goal: '🎯 Goal: Fast-flight 5 guest encounters in record time.',
      howToWin: '🏆 How to Win: Clock starts on your 1st honk and stops on your 5th. Lowest total elapsed time (MM:SS) wins!'
    },
    {
      id: 'globalGoose',
      label: '📍 Global Goose',
      title: 'Most Nesting Grounds',
      goal: '🎯 Goal: Discover guests traveling from the greatest variety of geographical origins (cities/states).',
      howToWin: '🏆 How to Win: Seek out guests from different hometowns (e.g. SF, NYC, Chicago, Austin). Unique cities met = your score.'
    },
    {
      id: 'soulGander',
      label: '🍸 Soul-Gander',
      title: 'Compatibility Matchmaker',
      goal: '🎯 Goal: Seek out and log encounters with your top algorithmically recommended compatibility matches.',
      howToWin: '🏆 How to Win: Check your Matchmaker recommendations and honk at your top shared-interest matches to accumulate compatibility points.'
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
    if (!ms) return 'N/A';
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="modal-backdrop no-print">
      <div 
        className="glass-panel modal-card"
        style={{
          maxWidth: 640,
          width: '94vw',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          borderRadius: 24,
          background: '#0f172a',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl">🪿</span>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-amber-400" style={{ margin: 0 }}>Grand Gaggle Leaderboard</h2>
              <p className="text-[11px] sm:text-xs text-slate-400" style={{ margin: 0 }}>Playing As: <span className="text-amber-300 font-semibold">{activePlayer}</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#94a3b8', padding: '6px 12px', borderRadius: 9999, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
          >
            ✕
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar border-b border-slate-800">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setExpandedPlayer(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Rich Competition Goal & How To Win Explainer Card */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl my-3 text-xs space-y-1 text-slate-200">
          <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
            <span>🪿</span>
            <span>{currentTabObj.title}</span>
          </div>
          <div className="text-slate-300">{currentTabObj.goal}</div>
          <div className="text-amber-200/90 font-medium">{currentTabObj.howToWin}</div>
        </div>

        {/* Leaderboard Table */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {currentList.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              🪿 No honks logged yet for this category! Tap "Honk at Guest" to score first!
            </div>
          ) : (
            currentList.slice(0, 15).map((player, idx) => {
              const isSelf = player.name === activePlayer;
              const isExpanded = expandedPlayer === player.name;
              let medal = null;
              if (idx === 0) medal = '🥇';
              if (idx === 1) medal = '🥈';
              if (idx === 2) medal = '🥉';

              return (
                <div
                  key={player.name}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isSelf
                      ? 'bg-amber-950/30 border-amber-500/50 shadow-lg'
                      : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div
                    onClick={() => setExpandedPlayer(isExpanded ? null : player.name)}
                    className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-bold text-sm text-slate-400">
                        {medal || `#${idx + 1}`}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-100 flex items-center gap-2">
                          {player.name}
                          {isSelf && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-normal">YOU</span>}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                          <span>🪿 {player.honkCount} Honks</span>
                          <span>•</span>
                          <span>{player.cohortsMet.size} Flocks</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        {activeTab === 'masterGaggle' && (
                          <span className="text-sm font-bold text-amber-400">{player.cohortsMet.size} Flocks</span>
                        )}
                        {activeTab === 'honkSpecialist' && (
                          <span className="text-sm font-bold text-emerald-400">{player.questsCompleted.size} Quests</span>
                        )}
                        {activeTab === 'migrationSprint' && (
                          <span className="text-sm font-bold text-cyan-400">{formatSprintTime(player.sprintTimeMs)}</span>
                        )}
                        {activeTab === 'globalGoose' && (
                          <span className="text-sm font-bold text-purple-400">{player.citiesMet.size} Origins</span>
                        )}
                        {activeTab === 'soulGander' && (
                          <span className="text-sm font-bold text-rose-400">{player.honkCount * 10} pts</span>
                        )}
                      </div>
                      <span className="text-slate-500 text-xs">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {/* Expanded Connection Details ("Who each guest connected with") */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-700/50 bg-slate-900/60 text-xs text-slate-300 space-y-3">
                      <div>
                        <span className="font-bold text-amber-300">🪿 Met Ganders ({player.connections.length}):</span>
                        {player.connections.length === 0 ? (
                          <p className="text-slate-500 italic mt-1">No direct encounters logged yet.</p>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {player.connections.map((c, i) => (
                              <button
                                key={i}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectGuest && onSelectGuest(c.name);
                                  onClose();
                                }}
                                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600/60 text-slate-200 flex items-center gap-1.5"
                              >
                                <span>🪿</span>
                                <span>{c.name}</span>
                                <span className="text-[10px] text-amber-400 font-mono">({c.cohort})</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {player.citiesMet.size > 0 && (
                        <div>
                          <span className="font-bold text-purple-300">📍 Discovered Nesting Grounds:</span>
                          <div className="text-slate-400 mt-0.5">
                            {[...player.citiesMet].join(' • ')}
                          </div>
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
