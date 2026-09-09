import React from 'react';
import { Search, Sun, Moon, Layers, X, ShieldAlert, Compass, Wand2, SlidersHorizontal, FileSpreadsheet } from 'lucide-react';

export default function TopHeaderNav({
  searchQuery = '',
  setSearchQuery = () => {},
  selectedInterests = [],
  setSelectedInterests = () => {},
  selectedClusterFocus = '',
  setSelectedClusterFocus = () => {},
  isLightMode,
  setIsLightMode,
  clusterMode,
  setClusterMode,
  colorMode,
  setColorMode,
  isAdmin,
  feedbackQueueCount,
  setIsFeedbackQueueOpen,
  setIsSpreadsheetOpen,
  onOpenLeaderboard = () => {},
  onOpenMapControls = () => {},
  isListView = false,
  setIsListView = () => {},
  setIsMatchmakerOpen = () => {},
  isPathMode = false,
  setIsPathMode = () => {}
}) {
  const hasActiveFilters = Boolean((searchQuery && searchQuery.trim()) || selectedClusterFocus || (selectedInterests && selectedInterests.length > 0));

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedClusterFocus('');
    setSelectedInterests([]);
  };

  return (
    <header className="glass-panel top-bar no-print">
      {/* Tall Left Brand Block */}
      <div className="logo-area-tall">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 24, lineHeight: 1 }} role="img" aria-label="Goose">🪿</span>
          <h1 className="logo-title" style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#38bdf8', margin: 0, fontSize: 17, fontWeight: 900 }}>Honk Wedding Universe</h1>
        </div>
        <span className="logo-subtitle hide-on-constrained">Sept 26, 2026 • Honk Wedding Map</span>
      </div>

      {/* Right Controls Area (Divided into 2 Clean Rows) */}
      <div className="header-controls-grid" style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>
        {/* ROW 1: Search Bar & Primary Actions */}
        <div className="header-controls-row top-row" style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
          {/* Always-Visible Prominent Search Input */}
          <div 
            className="search-box glass-panel" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              padding: '6px 14px', 
              background: 'rgba(15, 23, 42, 0.95)', 
              border: searchQuery ? '1.5px solid #38bdf8' : '1px solid rgba(56, 189, 248, 0.4)', 
              borderRadius: 12,
              minWidth: 180,
              maxWidth: 320,
              flex: '1 1 240px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
          >
            <Search style={{ width: 16, height: 16, color: searchQuery ? '#38bdf8' : '#38bdf8', flexShrink: 0 }} />
            <input 
              type="text"
              placeholder="Search guests, cohorts, cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#ffffff', fontSize: 13, fontWeight: 700, outline: 'none' }}
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}
                title="Clear Search"
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            )}
          </div>

          {/* ACTIVE FILTER CHIPS SECTION (Closeable Chips with ✕) */}
          {hasActiveFilters && (
            <div 
              className="active-filter-chips-container"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 6, 
                flexWrap: 'wrap', 
                maxHeight: 64, 
                overflowY: 'auto',
                paddingRight: 4,
                flex: '1 1 auto',
                minWidth: 0
              }}
            >
              {/* Active Search Query Chip */}
              {searchQuery && searchQuery.trim() && (
                <span 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: 9999,
                    background: 'rgba(56, 189, 248, 0.2)',
                    border: '1px solid #38bdf8',
                    color: '#7dd3fc',
                    whiteSpace: 'nowrap',
                    maxWidth: 160,
                    overflow: 'hidden'
                  }}
                >
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>🔍 "{searchQuery.trim()}"</span>
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', color: '#7dd3fc', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
                    title="Remove search filter"
                  >
                    <X style={{ width: 12, height: 12, opacity: 0.9 }} />
                  </button>
                </span>
              )}

              {/* Active Cluster Focus Chip */}
              {selectedClusterFocus && (
                <span 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: 9999,
                    background: 'rgba(236, 72, 153, 0.2)',
                    border: '1px solid #ec4899',
                    color: '#f472b6',
                    whiteSpace: 'nowrap',
                    maxWidth: 160,
                    overflow: 'hidden'
                  }}
                >
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>🎯 "{selectedClusterFocus}"</span>
                  <button 
                    type="button"
                    onClick={() => setSelectedClusterFocus('')}
                    style={{ background: 'none', border: 'none', color: '#f472b6', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
                    title="Remove cluster filter"
                  >
                    <X style={{ width: 12, height: 12, opacity: 0.9 }} />
                  </button>
                </span>
              )}

              {/* Active Selected Interest Chips */}
              {selectedInterests && selectedInterests.map(interest => (
                <span 
                  key={interest} 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: 9999,
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid #10b981',
                    color: '#34d399',
                    whiteSpace: 'nowrap',
                    maxWidth: 140,
                    overflow: 'hidden'
                  }}
                >
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>✨ {interest}</span>
                  <button 
                    type="button"
                    onClick={() => setSelectedInterests(selectedInterests.filter(i => i !== interest))}
                    style={{ background: 'none', border: 'none', color: '#34d399', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
                    title="Remove interest filter"
                  >
                    <X style={{ width: 12, height: 12, opacity: 0.9 }} />
                  </button>
                </span>
              ))}

              {/* Clear All Filters Action Button */}
              <button 
                type="button"
                onClick={handleClearAllFilters}
                style={{ 
                  fontSize: 10, 
                  fontWeight: 800,
                  color: '#f43f5e', 
                  background: 'rgba(244, 63, 94, 0.15)', 
                  border: '1px solid rgba(244, 63, 94, 0.4)', 
                  borderRadius: 9999, 
                  padding: '3px 8px',
                  cursor: 'pointer', 
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                Clear All
              </button>
            </div>
          )}

          {/* Directory List / 3D Map View Toggle Button */}
          <button 
            onClick={() => setIsListView(!isListView)} 
            className={`glass-panel btn-icon ${isListView ? 'active' : ''} hide-on-constrained`}
            title="Toggle Alphabetical Directory List vs 3D Map View"
            style={{ height: 34, padding: '0 10px', gap: 6, fontSize: 12, fontWeight: 800, color: isListView ? '#f43f5e' : '#38bdf8', background: isListView ? 'rgba(244, 63, 94, 0.2)' : 'rgba(56, 189, 248, 0.15)', border: isListView ? '1px solid #f43f5e' : '1px solid rgba(56, 189, 248, 0.4)', flexShrink: 0, marginLeft: 'auto' }}
          >
            <span>{isListView ? '🌐 3D Map View' : '📋 Directory List'}</span>
          </button>

          {/* Light / Dark Mode Toggle Button */}
          <button 
            onClick={() => setIsLightMode(!isLightMode)} 
            className="glass-panel btn-icon hide-on-constrained"
            title="Toggle Light/Dark Theme"
            style={{ width: 34, height: 34, padding: 0, justifyContent: 'center', flexShrink: 0 }}
          >
            {isLightMode ? <Moon style={{ width: 14, height: 14 }} /> : <Sun style={{ width: 14, height: 14, color: '#38bdf8' }} />}
          </button>

          {/* Host Admin Buttons */}
          {isAdmin && (
            <>
              <button 
                onClick={() => setIsSpreadsheetOpen && setIsSpreadsheetOpen(true)}
                className="glass-panel btn-icon hide-on-constrained"
                title="Open Live Guest Spreadsheet Grid Editor"
                style={{ 
                  height: 34, 
                  padding: '0 10px', 
                  gap: 6, 
                  fontSize: 11, 
                  fontWeight: 800, 
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
                  color: '#c084fc', 
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  flexShrink: 0 
                }}
              >
                <FileSpreadsheet style={{ width: 13, height: 13, color: '#c084fc' }} />
                <span>Spreadsheet</span>
              </button>

              <button 
                onClick={() => setIsFeedbackQueueOpen(true)}
                className="glass-panel btn-icon"
                title="Open Host Moderation Review Queue"
                style={{ 
                  height: 34, 
                  padding: '0 10px', 
                  gap: 6, 
                  fontSize: 11, 
                  fontWeight: 700, 
                  background: feedbackQueueCount > 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(30, 41, 59, 0.85)',
                  color: feedbackQueueCount > 0 ? '#f87171' : '#cbd5e1', 
                  border: feedbackQueueCount > 0 ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                  flexShrink: 0 
                }}
              >
                <ShieldAlert style={{ width: 13, height: 13, color: feedbackQueueCount > 0 ? '#ef4444' : '#38bdf8' }} />
                <span>Queue</span>
                <span style={{ fontSize: 10, background: feedbackQueueCount > 0 ? '#ef4444' : 'rgba(255,255,255,0.2)', color: '#fff', padding: '1px 5px', borderRadius: 9999 }}>
                  {feedbackQueueCount}
                </span>
              </button>
            </>
          )}
        </div>

        {/* ROW 2: Essential Map & Discovery Tools */}
        <div className="header-controls-row bottom-row" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Map Controls Sheet Trigger Button */}
          <button 
            onClick={onOpenMapControls}
            className="glass-panel btn-icon"
            title="Open Full Map Controls Sheet"
            style={{ height: 32, padding: '0 10px', gap: 6, fontSize: 11, fontWeight: 800, color: '#f8fafc', background: 'rgba(2, 132, 199, 0.25)', border: '1px solid rgba(56, 189, 248, 0.5)', flexShrink: 0 }}
          >
            <SlidersHorizontal style={{ width: 13, height: 13, color: '#38bdf8' }} />
            <span>Map Controls</span>
          </button>

          {/* Path Finder Toggle */}
          <button 
            onClick={() => setIsPathMode(!isPathMode)}
            className={`glass-panel btn-icon ${isPathMode ? 'active' : ''}`}
            title="Calculate Social Distance Path"
            style={{ height: 32, padding: '0 10px', gap: 6, fontSize: 11, fontWeight: 700, color: isPathMode ? '#38bdf8' : '#cbd5e1', flexShrink: 0 }}
          >
            <Compass style={{ width: 13, height: 13 }} />
            <span>Path Finder</span>
          </button>

          {/* Grand Gaggle Championship Quick Action Button */}
          <button 
            onClick={() => onOpenLeaderboard && onOpenLeaderboard()}
            className="glass-panel btn-icon gaggle-header-btn"
            title="Open The Grand Gaggle Mingling Championship"
            style={{ 
              height: 32, 
              padding: '0 10px', 
              gap: 6, 
              fontSize: 11, 
              fontWeight: 800, 
              color: '#fbbf24', 
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              flexShrink: 0 
            }}
          >
            <span style={{ fontSize: 14 }}>🪿</span>
            <span>Championship</span>
          </button>

          {/* Matchmaker Button */}
          <button 
            onClick={() => setIsMatchmakerOpen(true)}
            className="glass-panel btn-icon matchmaker-header-btn"
            title="Find Guest Match Recommendations"
            style={{ 
              height: 32, 
              padding: '0 10px', 
              gap: 6, 
              fontSize: 11, 
              fontWeight: 800, 
              color: '#34d399', 
              background: 'rgba(52, 211, 153, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              flexShrink: 0 
            }}
          >
            <Wand2 style={{ width: 13, height: 13, color: '#34d399' }} />
            <span>Matchmaker</span>
          </button>

          {/* Cluster Overlays Dropdown */}
          <div className="glass-panel color-mode-bar hide-on-constrained" style={{ display: 'flex', alignItems: 'center', height: 32, padding: '0 6px', background: 'rgba(30, 41, 59, 0.85)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 8, flexShrink: 0 }}>
            <Layers style={{ width: 13, height: 13, color: '#ec4899', marginRight: 4 }} />
            <span style={{ color: '#cbd5e1', fontSize: 11, fontWeight: 700, marginRight: 4 }}>Clusters:</span>
            <select 
              value={clusterMode}
              onChange={(e) => {
                const val = e.target.value;
                setClusterMode(val);
                if (val === 'locations' || val === 'current_location' || val === 'original_location') {
                  setColorMode(val);
                } else if (val === 'cohort') {
                  setColorMode('cohort');
                } else if (val === 'interests') {
                  setColorMode('interests');
                }
              }}
              style={{ background: '#0f172a', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', padding: '2px 4px', borderRadius: 6, fontSize: 11, fontWeight: 700, outline: 'none', cursor: 'pointer' }}
            >
              <option value="cohort">Cohorts</option>
              <option value="current_location">Current Location</option>
              <option value="interests">Interests</option>
              <option value="locations">Locations (Combined)</option>
              <option value="none">Off (Hide)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
