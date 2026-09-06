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
    { id: 'masterGaggle', label: '🪿 Master Gaggle', title: 'Unite All Flocks (Most Cohorts Met)' },
    { id: 'honkSpecialist', label: '🎯 Honk Specialist', title: 'Most Quests & Honks Logged' },
    { id: 'migrationSprint', label: '⚡ Migration Sprint', title: 'Fastest 5 Encounters' },
    { id: 'globalGoose', label: '📍 Global Goose', title: 'Most Nesting Grounds Discovered' },
    { id: 'soulGander', label: '🍸 Soul-Gander', title: 'Top Compatibility Matches Met' }
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

  const currentList = getActiveLeaderboard();

  const formatSprintTime = (ms) => {
    if (!ms) return 'N/A';
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-[99990] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/90 backdrop-blur-lg" style={{ pointerEvents: 'auto' }}>
      <div className="modal-card bg-slate-900 border border-amber-500/30 rounded-t-2xl sm:rounded-2xl max-w-2xl w-full p-4 sm:p-6 text-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]" style={{ pointerEvents: 'auto', background: '#0f172a' }}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl">🪿</span>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-amber-400">Grand Gaggle Leaderboard</h2>
              <p className="text-[11px] sm:text-xs text-slate-400">Playing As: <span className="text-amber-300 font-semibold">{activePlayer}</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-lg touch-manipulation"
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

        {/* Tab Description */}
        <div className="py-2.5 px-3 bg-amber-500/10 border border-amber-500/20 rounded-lg my-3 text-xs text-amber-200">
          💡 {tabs.find(t => t.id === activeTab)?.title}
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
