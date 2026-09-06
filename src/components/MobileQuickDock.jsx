import React from 'react';
import { Trophy, ClipboardList, Wand2, SlidersHorizontal } from 'lucide-react';

export default function MobileQuickDock({
  onOpenLeaderboard,
  onOpenDirectory,
  onOpenMatchmaker,
  onOpenMapControls,
  isListView,
  honkCount = 0
}) {
  return (
    <nav 
      className="mobile-quick-dock no-print"
      aria-label="Mobile Navigation Quick Dock"
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 16px',
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        borderRadius: 9999,
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65)'
      }}
    >
      {/* 🏆 Grand Gaggle Championship Button */}
      <button
        onClick={onOpenLeaderboard}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#f8fafc'
        }}
        title="Open Championship Leaderboard"
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid rgba(245, 158, 11, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)'
        }}>
          <span style={{ fontSize: 18 }}>🪿</span>
          <Trophy style={{ width: 14, height: 14, color: '#fbbf24', position: 'absolute', bottom: -2, right: -2 }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 800, color: '#fbbf24', letterSpacing: 0.2 }}>Mingling</span>
      </button>

      {/* 📋 Guest Directory List Toggle Button */}
      <button
        onClick={onOpenDirectory}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#f8fafc'
        }}
        title="Toggle Guest Directory List"
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: isListView ? 'rgba(244, 63, 94, 0.25)' : 'rgba(56, 189, 248, 0.2)',
          border: isListView ? '1px solid #f43f5e' : '1px solid rgba(56, 189, 248, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isListView ? '0 0 12px rgba(244, 63, 94, 0.35)' : '0 0 12px rgba(56, 189, 248, 0.3)'
        }}>
          <ClipboardList style={{ width: 20, height: 20, color: isListView ? '#f43f5e' : '#38bdf8' }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 800, color: isListView ? '#f43f5e' : '#38bdf8', letterSpacing: 0.2 }}>Directory</span>
      </button>

      {/* 🍸 Cocktail Matchmaker Button */}
      <button
        onClick={onOpenMatchmaker}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#f8fafc'
        }}
        title="Open Cocktail Matchmaker"
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(45, 212, 191, 0.2)',
          border: '1px solid rgba(45, 212, 191, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 12px rgba(45, 212, 191, 0.3)'
        }}>
          <Wand2 style={{ width: 20, height: 20, color: '#2dd4bf' }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 800, color: '#2dd4bf', letterSpacing: 0.2 }}>Matchmaker</span>
      </button>

      {/* 🎛️ Map Controls Trigger Button */}
      <button
        onClick={onOpenMapControls}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#f8fafc'
        }}
        title="Open Map Controls"
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(52, 211, 153, 0.2)',
          border: '1px solid rgba(52, 211, 153, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 12px rgba(52, 211, 153, 0.3)'
        }}>
          <SlidersHorizontal style={{ width: 20, height: 20, color: '#34d399' }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 800, color: '#34d399', letterSpacing: 0.2 }}>Controls</span>
      </button>
    </nav>
  );
}
