import React from 'react';
import { Search, Sun, Moon, Layers, Download, X, Heart, ShieldAlert, Compass, Wand2, Play, Pause, Eye, EyeOff } from 'lucide-react';

export default function TopHeaderNav({
  searchQuery,
  setSearchQuery,
  selectedInterests,
  setSelectedInterests,
  isLightMode,
  setIsLightMode,
  clusterMode,
  setClusterMode,
  colorMode,
  setColorMode,
  showHeadshots,
  setShowHeadshots,
  isOrbiting,
  setIsOrbiting,
  isPathMode,
  setIsPathMode,
  setIsMatchmakerOpen,
  isAdmin,
  handleExportCsv,
  handleExportGitJs,
  feedbackQueueCount,
  setIsFeedbackQueueOpen
}) {
  return (
    <header className="glass-panel top-bar no-print">
      <div className="logo-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Heart style={{ width: 18, height: 18, color: '#ec4899', fill: '#ec4899' }} />
          <h1 className="logo-title">Maureen & Matt</h1>
        </div>
        <span className="logo-subtitle">Sept 12, 2026 • Wedding Guest Universe</span>
      </div>

      <div className="search-controls-area" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Search Bar Input */}
        <div className="search-box">
          <Search style={{ width: 14, height: 14, color: '#94a3b8' }} />
          <input 
            type="text"
            placeholder="Search guests, cohorts, cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 2 }}
            >
              <X style={{ width: 14, height: 14 }} />
            </button>
          )}
        </div>

        {/* Selected Interests Filter Badges */}
        {selectedInterests.length > 0 && (
          <div className="active-interests-bar">
            {selectedInterests.map(interest => (
              <span key={interest} className="interest-chip">
                <span>{interest}</span>
                <X 
                  style={{ width: 12, height: 12, cursor: 'pointer' }}
                  onClick={() => setSelectedInterests(selectedInterests.filter(i => i !== interest))}
                />
              </span>
            ))}
            <button 
              onClick={() => setSelectedInterests([])}
              style={{ fontSize: 10, color: '#ec4899', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Desktop Cluster Overlays Dropdown */}
        <div className="glass-panel color-mode-bar desktop-only-inline" style={{ display: 'flex', alignItems: 'center', height: 36, padding: '0 10px', background: 'rgba(30, 41, 59, 0.85)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 12, flexShrink: 0 }}>
          <Layers style={{ width: 14, height: 14, color: '#ec4899', marginRight: 4 }} />
          <span style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 700, marginRight: 6 }}>Clusters:</span>
          <select 
            value={clusterMode}
            onChange={(e) => setClusterMode(e.target.value)}
            style={{ background: '#0f172a', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: 8, fontSize: 12, fontWeight: 700, outline: 'none', cursor: 'pointer' }}
          >
            <option value="cohort">Cohorts</option>
            <option value="locations">Locations</option>
            <option value="current_location">Current Location</option>
            <option value="original_location">Original Location</option>
            <option value="interests">Interests</option>
            <option value="none">Off (Hide)</option>
          </select>
        </div>

        {/* Desktop Color Mode Selector */}
        <div className="glass-panel color-mode-bar desktop-only-inline" style={{ display: 'flex', alignItems: 'center', height: 36, padding: '0 10px', background: 'rgba(30, 41, 59, 0.85)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 12, flexShrink: 0 }}>
          <span style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 700, marginRight: 6 }}>Color:</span>
          <select 
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value)}
            style={{ background: '#0f172a', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: 8, fontSize: 12, fontWeight: 700, outline: 'none', cursor: 'pointer' }}
          >
            <option value="cohort">Cohorts</option>
            <option value="side">Side (Matt/Maureen)</option>
            <option value="state">States</option>
          </select>
        </div>

        {/* Desktop Headshot Photos Toggle */}
        <button 
          onClick={() => setShowHeadshots(!showHeadshots)}
          className={`glass-panel btn-icon desktop-only-inline ${showHeadshots ? 'active' : ''}`}
          title="Toggle Guest Photos on Canvas"
          style={{ height: 36, padding: '0 12px', gap: 6, fontSize: 12, fontWeight: 700, color: showHeadshots ? '#38bdf8' : '#94a3b8', flexShrink: 0 }}
        >
          {showHeadshots ? <Eye style={{ width: 14, height: 14 }} /> : <EyeOff style={{ width: 14, height: 14 }} />}
          <span>Photos</span>
        </button>

        {/* Desktop Orbit Motion Toggle */}
        <button 
          onClick={() => setIsOrbiting(!isOrbiting)}
          className={`glass-panel btn-icon desktop-only-inline ${isOrbiting ? 'active' : ''}`}
          title="Toggle Celestial Orbit Rotation"
          style={{ height: 36, padding: '0 12px', gap: 6, fontSize: 12, fontWeight: 700, color: isOrbiting ? '#a855f7' : '#94a3b8', flexShrink: 0 }}
        >
          {isOrbiting ? <Pause style={{ width: 14, height: 14 }} /> : <Play style={{ width: 14, height: 14 }} />}
          <span>Orbit</span>
        </button>

        {/* Desktop Path Finder Toggle */}
        <button 
          onClick={() => setIsPathMode(!isPathMode)}
          className={`glass-panel btn-icon desktop-only-inline ${isPathMode ? 'active' : ''}`}
          title="Calculate Social Distance Path"
          style={{ height: 36, padding: '0 12px', gap: 6, fontSize: 12, fontWeight: 700, color: isPathMode ? '#38bdf8' : '#94a3b8', flexShrink: 0 }}
        >
          <Compass style={{ width: 14, height: 14 }} />
          <span>Path Finder</span>
        </button>

        {/* Desktop Matchmaker Button */}
        <button 
          onClick={() => setIsMatchmakerOpen(true)}
          className="glass-panel btn-icon desktop-only-inline"
          title="Find Guest Match Recommendations"
          style={{ height: 36, padding: '0 12px', gap: 6, fontSize: 12, fontWeight: 700, color: '#34d399', flexShrink: 0 }}
        >
          <Wand2 style={{ width: 14, height: 14 }} />
          <span>Matchmaker</span>
        </button>

        {/* Light / Dark Mode Toggle Button */}
        <button 
          onClick={() => setIsLightMode(!isLightMode)} 
          className="glass-panel btn-icon"
          title="Toggle Light/Dark Theme"
          style={{ width: 36, height: 36, padding: 0, justifyContent: 'center', flexShrink: 0 }}
        >
          {isLightMode ? <Moon style={{ width: 15, height: 15 }} /> : <Sun style={{ width: 15, height: 15, color: '#38bdf8' }} />}
        </button>

        {/* Hidden Host Admin Tools (Only visible when unlocked via secret URL parameter) */}
        {isAdmin && (
          <>
            {/* 1-Click CSV Export Button */}
            <button 
              onClick={handleExportCsv} 
              className="glass-panel btn-icon desktop-only-inline"
              title="Export Guest List to CSV for Google Sheets"
              style={{ height: 36, padding: '0 12px', gap: 6, fontSize: 12, fontWeight: 700, color: '#34d399', flexShrink: 0 }}
            >
              <Download style={{ width: 14, height: 14, color: '#34d399' }} />
              <span>Export CSV</span>
            </button>

            {feedbackQueueCount > 0 && (
              <button 
                onClick={() => setIsFeedbackQueueOpen(true)}
                className="glass-panel btn-icon"
                style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#f87171', padding: '6px 10px', fontSize: 11, fontWeight: 700 }}
              >
                <ShieldAlert style={{ width: 14, height: 14 }} />
                <span>Host Queue ({feedbackQueueCount})</span>
              </button>
            )}
            <button 
              onClick={handleExportGitJs}
              className="glass-panel btn-icon"
              title="Download updated sampleData.js for local Git repository"
              style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', padding: '6px 10px', fontSize: 11, fontWeight: 700 }}
            >
              <Download style={{ width: 14, height: 14 }} />
              <span>Export Git JS</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
