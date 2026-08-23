import React, { useState } from 'react';
import { Search, Sun, Moon, Layers, Download, X, Heart, ShieldAlert, Compass, Wand2, Play, Pause, Eye, EyeOff, SlidersHorizontal, Palette, FileSpreadsheet } from 'lucide-react';

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
  orbitSpeed,
  setOrbitSpeed,
  nodeScaleMultiplier,
  setNodeScaleMultiplier,
  edgeLengthMultiplier,
  setEdgeLengthMultiplier,
  isPathMode,
  setIsPathMode,
  setIsMatchmakerOpen,
  isAdmin,
  handleExportCsv,
  feedbackQueueCount,
  setIsFeedbackQueueOpen,
  setIsSpreadsheetOpen,
  selectedClusterFocus = '',
  setSelectedClusterFocus = () => {},
  availableClusters = []
}) {
  const [isTunePopoverOpen, setIsTunePopoverOpen] = useState(false);

  return (
    <header className="glass-panel top-bar no-print">
      <div className="logo-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 24, lineHeight: 1 }} role="img" aria-label="Goose">🪿</span>
          <h1 className="logo-title" style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#38bdf8', margin: 0, fontSize: 18, fontWeight: 900 }}>Honk Wedding Universe</h1>
        </div>
        <span className="logo-subtitle">Sept 26, 2026 • Honk Wedding Map</span>
      </div>

      <div className="search-controls-area" style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
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
            style={{ background: '#0f172a', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: 8, fontSize: 12, fontWeight: 700, outline: 'none', cursor: 'pointer' }}
          >
            <option value="cohort">Cohorts</option>
            <option value="locations">Locations (Combined)</option>
            <option value="current_location">Current Location</option>
            <option value="original_location">Original Location</option>
            <option value="interests">Interests</option>
            <option value="none">Off (Hide)</option>
          </select>
        </div>

        {/* Desktop Focus Cluster Dropdown */}
        {availableClusters && (availableClusters.all?.length > 0 || Array.isArray(availableClusters)) && (
          <div className="glass-panel color-mode-bar desktop-only-inline" style={{ display: 'flex', alignItems: 'center', height: 36, padding: '0 10px', background: 'rgba(30, 41, 59, 0.85)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 12, flexShrink: 0 }}>
            <Compass style={{ width: 14, height: 14, color: '#34d399', marginRight: 4 }} />
            <span style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 700, marginRight: 6 }}>Focus:</span>
            <select 
              value={selectedClusterFocus}
              onChange={(e) => setSelectedClusterFocus(e.target.value)}
              style={{ background: '#0f172a', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '3px 8px', borderRadius: 8, fontSize: 12, fontWeight: 700, outline: 'none', cursor: 'pointer', maxWidth: 160 }}
            >
              <option value="">All Clusters (Show All)</option>
              {availableClusters.interests?.length > 0 && (
                <optgroup label="🎨 Interests">
                  {availableClusters.interests.map(item => (
                    <option key={`int_${item}`} value={item}>{item}</option>
                  ))}
                </optgroup>
              )}
              {availableClusters.locations?.length > 0 && (
                <optgroup label="📍 Locations (Current or Home)">
                  {availableClusters.locations.map(item => (
                    <option key={`loc_${item}`} value={item}>{item}</option>
                  ))}
                </optgroup>
              )}
              {availableClusters.cohorts?.length > 0 && (
                <optgroup label="🎓 Cohorts">
                  {availableClusters.cohorts.map(item => (
                    <option key={`coh_${item}`} value={item}>{item}</option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>
        )}

        {/* Desktop Color Mode Selector */}
        <div className="glass-panel color-mode-bar desktop-only-inline" style={{ display: 'flex', alignItems: 'center', height: 36, padding: '0 10px', background: 'rgba(30, 41, 59, 0.85)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 12, flexShrink: 0 }}>
          <Palette style={{ width: 14, height: 14, color: '#38bdf8', marginRight: 4 }} />
          <span style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 700, marginRight: 6 }}>Color:</span>
          <select 
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value)}
            style={{ background: '#0f172a', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: 8, fontSize: 12, fontWeight: 700, outline: 'none', cursor: 'pointer' }}
          >
            <option value="cohort">Cohorts</option>
            <option value="side">Side (Matt/Maureen)</option>
            <option value="locations">Combined Locations</option>
            <option value="current_location">Current Location</option>
            <option value="original_location">Hometown / Original</option>
          </select>
        </div>

        {/* Desktop Sliders Popover Button (Node Size & Map Spacing) */}
        <div className="desktop-only-inline" style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsTunePopoverOpen(!isTunePopoverOpen)}
            className={`glass-panel btn-icon ${isTunePopoverOpen ? 'active' : ''}`}
            title="Adjust Node Size, Map Density & Orbit Speed Sliders"
            style={{ height: 36, padding: '0 12px', gap: 6, fontSize: 12, fontWeight: 700, color: isTunePopoverOpen ? '#38bdf8' : '#94a3b8', flexShrink: 0 }}
          >
            <SlidersHorizontal style={{ width: 14, height: 14 }} />
            <span>Tune Sliders</span>
          </button>

          {/* Editorial Glass Sliders Popover */}
          {isTunePopoverOpen && (
            <div className="glass-panel" style={{
              position: 'absolute',
              top: 44,
              right: 0,
              width: 260,
              padding: 16,
              borderRadius: 20,
              background: 'rgba(15, 23, 42, 0.96)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#f8fafc' }}>Display Sliders</span>
                <button onClick={() => setIsTunePopoverOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X style={{ width: 14, height: 14 }} />
                </button>
              </div>

              {/* Node Size Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Node Size:</span>
                  <span style={{ color: '#38bdf8', fontWeight: 800 }}>{nodeScaleMultiplier.toFixed(1)}x</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={nodeScaleMultiplier}
                  onChange={(e) => setNodeScaleMultiplier(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#38bdf8', height: 8, cursor: 'pointer' }}
                />
              </div>

              {/* Map Spacing / Density Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Map Spacing:</span>
                  <span style={{ color: '#10b981', fontWeight: 800 }}>{edgeLengthMultiplier.toFixed(1)}x</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={edgeLengthMultiplier}
                  onChange={(e) => setEdgeLengthMultiplier(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981', height: 8, cursor: 'pointer' }}
                />
              </div>

              {/* Orbit Speed Slider */}
              {isOrbiting && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Orbit Speed:</span>
                    <span style={{ color: '#a855f7', fontWeight: 800 }}>{orbitSpeed.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.05"
                    value={orbitSpeed}
                    onChange={(e) => setOrbitSpeed(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#a855f7', height: 8, cursor: 'pointer' }}
                  />
                </div>
              )}
            </div>
          )}
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

        {/* Host Live Spreadsheet & Moderation Queue Buttons */}
        {isAdmin && (
          <>
            <button 
              onClick={() => setIsSpreadsheetOpen && setIsSpreadsheetOpen(true)}
              className="glass-panel btn-icon"
              title="Open Live Guest Spreadsheet Grid Editor"
              style={{ 
                height: 36, 
                padding: '0 12px', 
                gap: 6, 
                fontSize: 12, 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
                color: '#c084fc', 
                border: '1px solid rgba(168, 85, 247, 0.4)',
                flexShrink: 0 
              }}
            >
              <FileSpreadsheet style={{ width: 14, height: 14, color: '#c084fc' }} />
              <span>Spreadsheet</span>
            </button>

            <button 
              onClick={() => setIsFeedbackQueueOpen(true)}
              className="glass-panel btn-icon"
              title="Open Host Moderation Review Queue"
              style={{ 
                height: 36, 
                padding: '0 12px', 
                gap: 6, 
                fontSize: 12, 
                fontWeight: 700, 
                background: feedbackQueueCount > 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(30, 41, 59, 0.85)',
                color: feedbackQueueCount > 0 ? '#f87171' : '#cbd5e1', 
                border: feedbackQueueCount > 0 ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                flexShrink: 0 
              }}
            >
              <ShieldAlert style={{ width: 14, height: 14, color: feedbackQueueCount > 0 ? '#ef4444' : '#38bdf8' }} />
              <span>Queue</span>
              <span style={{ fontSize: 10, background: feedbackQueueCount > 0 ? '#ef4444' : 'rgba(255,255,255,0.2)', color: '#fff', padding: '1px 6px', borderRadius: 9999 }}>
                {feedbackQueueCount}
              </span>
            </button>
          </>
        )}

        {/* Light / Dark Mode Toggle Button */}
        <button 
          onClick={() => setIsLightMode(!isLightMode)} 
          className="glass-panel btn-icon"
          title="Toggle Light/Dark Theme"
          style={{ width: 36, height: 36, padding: 0, justifyContent: 'center', flexShrink: 0 }}
        >
          {isLightMode ? <Moon style={{ width: 15, height: 15 }} /> : <Sun style={{ width: 15, height: 15, color: '#38bdf8' }} />}
        </button>
      </div>
    </header>
  );
}
