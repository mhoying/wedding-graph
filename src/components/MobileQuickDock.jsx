import React from 'react';
import { Trophy, ClipboardList, Wand2, SlidersHorizontal, Sun, Moon, Search, ZoomOut } from 'lucide-react';

export default function MobileQuickDock({
  onOpenLeaderboard,
  onOpenDirectory,
  onOpenMatchmaker,
  onOpenMapControls,
  onOpenSearch,
  onZoomOut,
  isListView,
  honkCount = 0,
  isLightMode,
  setIsLightMode
}) {
  return (
    <nav 
      className="mobile-quick-dock no-print"
      aria-label="Mobile Navigation Quick Dock"
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        background: 'rgba(15, 23, 42, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        borderRadius: 9999,
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.65)',
        maxWidth: 'calc(100vw - 16px)'
      }}
    >
      {/* 🔍 Search Button */}
      <button
        onClick={onOpenSearch}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#f8fafc'
        }}
        title="Search Guests & Cohorts"
      >
        <div style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'rgba(56, 189, 248, 0.2)',
          border: '1px solid rgba(56, 189, 248, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(56, 189, 248, 0.3)'
        }}>
          <Search style={{ width: 18, height: 18, color: '#38bdf8' }} />
        </div>
        <span style={{ fontSize: 9, fontWeight: 800, color: '#38bdf8', letterSpacing: 0.1 }}>Search</span>
      </button>

      {/* 🏆 Grand Gaggle Championship Button */}
      <button
        onClick={onOpenLeaderboard}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#f8fafc'
        }}
        title="Open Championship Leaderboard"
      >
        <div style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid rgba(245, 158, 11, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)'
        }}>
          <span style={{ fontSize: 16 }}>🪿</span>
          <Trophy style={{ width: 12, height: 12, color: '#fbbf24', position: 'absolute', bottom: -2, right: -2 }} />
        </div>
        <span style={{ fontSize: 9, fontWeight: 800, color: '#fbbf24', letterSpacing: 0.1 }}>Mingling</span>
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

      {/* 🔍 Zoom Out to Full Graph Button */}
      {onZoomOut && (
        <button
          onClick={onZoomOut}
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
          title="Zoom Out to Frame Full Graph"
        >
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(236, 72, 153, 0.2)',
            border: '1px solid rgba(236, 72, 153, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(236, 72, 153, 0.3)'
          }}>
            <ZoomOut style={{ width: 20, height: 20, color: '#ec4899' }} />
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#ec4899', letterSpacing: 0.2 }}>Zoom Out</span>
        </button>
      )}

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

      {/* 🌓 Light / Dark Theme Toggle Button */}
      {setIsLightMode && (
        <button
          onClick={() => setIsLightMode(!isLightMode)}
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
          title="Toggle Light/Dark Theme"
        >
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: isLightMode ? 'rgba(241, 245, 249, 0.9)' : 'rgba(30, 41, 59, 0.9)',
            border: isLightMode ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.3)'
          }}>
            {isLightMode ? <Moon style={{ width: 20, height: 20, color: '#0f172a' }} /> : <Sun style={{ width: 20, height: 20, color: '#38bdf8' }} />}
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, color: isLightMode ? '#0f172a' : '#cbd5e1', letterSpacing: 0.2 }}>
            {isLightMode ? 'Light' : 'Dark'}
          </span>
        </button>
      )}
    </nav>
  );
}
