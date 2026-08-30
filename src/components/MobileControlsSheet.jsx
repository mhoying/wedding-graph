import React from 'react';
import { SlidersHorizontal, X, Camera, Sun, Moon, Layers, Palette, Compass, Wand2, Edit3, Copy } from 'lucide-react';

export default function MobileControlsSheet({
  isOpen,
  onClose,
  isOrbiting,
  setIsOrbiting,
  orbitSpeed,
  setOrbitSpeed,
  nodeScaleMultiplier,
  setNodeScaleMultiplier,
  edgeLengthMultiplier,
  setEdgeLengthMultiplier,
  showHeadshots,
  setShowHeadshots,
  isLightMode,
  setIsLightMode,
  clusterMode,
  setClusterMode,
  colorMode,
  setColorMode,
  isPathMode,
  setIsPathMode,
  setIsMatchmakerOpen,
  setIsFeedbackModalOpen,
  setSelectedNode,
  isAdmin,
  handleCopyQrLink,
  selectedClusterFocus = '',
  setSelectedClusterFocus = () => {},
  availableClusters = [],
  isListView = false,
  setIsListView = () => {}
}) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="mobile-sheet-backdrop" 
        onClick={onClose} 
      />
      <div 
        className="mobile-controls-sheet no-print"
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 14 }}>
            <SlidersHorizontal style={{ width: 16, height: 16, color: '#38bdf8' }} />
            <span>Map Controls</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button 
              type="button"
              onClick={() => setIsOrbiting(!isOrbiting)}
              className={`btn-mode ${isOrbiting ? 'active' : ''}`}
              style={{ padding: '4px 10px', borderRadius: 9999, background: isOrbiting ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)', color: '#fff', fontSize: 11, fontWeight: 700 }}
            >
              Orbit: {isOrbiting ? 'ON' : 'OFF'}
            </button>
            <button 
              type="button"
              onClick={onClose}
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>

        {/* Orbit Speed Slider */}
        {isOrbiting && (
          <div style={{ marginBottom: 8, background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.25)', padding: 8, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
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
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{ width: '100%', accentColor: '#a855f7', height: 10, touchAction: 'none' }}
            />
          </div>
        )}

        {/* Card Node Size & Map Spacing Sliders */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: 8, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
              <span style={{ color: '#94a3b8', fontWeight: 600 }}>Node Size:</span>
              <span style={{ color: '#38bdf8', fontWeight: 800 }}>{nodeScaleMultiplier.toFixed(1)}x</span>
            </div>
            <input 
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={nodeScaleMultiplier}
              onChange={(e) => setNodeScaleMultiplier(parseFloat(e.target.value))}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{ width: '100%', accentColor: '#38bdf8', height: 10, touchAction: 'none' }}
            />
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: 8, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
              <span style={{ color: '#94a3b8', fontWeight: 600 }}>Spacing:</span>
              <span style={{ color: '#10b981', fontWeight: 800 }}>{edgeLengthMultiplier.toFixed(1)}x</span>
            </div>
            <input 
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={edgeLengthMultiplier}
              onChange={(e) => setEdgeLengthMultiplier(parseFloat(e.target.value))}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{ width: '100%', accentColor: '#10b981', height: 10, touchAction: 'none' }}
            />
          </div>
        </div>

        {/* Quick Action Toggles */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <button 
            onClick={() => setShowHeadshots(!showHeadshots)}
            className={`btn-mode ${showHeadshots ? 'active' : ''}`}
            style={{ flex: 1, padding: '6px', borderRadius: 10, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            <Camera style={{ width: 12, height: 12 }} />
            <span>Photos {showHeadshots ? 'ON' : 'OFF'}</span>
          </button>
          <button 
            onClick={() => setIsLightMode(!isLightMode)}
            className="btn-mode"
            style={{ flex: 1, padding: '6px', borderRadius: 10, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, background: 'rgba(255, 255, 255, 0.08)' }}
          >
            {isLightMode ? <Moon style={{ width: 12, height: 12 }} /> : <Sun style={{ width: 12, height: 12, color: '#38bdf8' }} />}
            <span>{isLightMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* Scroll Indicator Banner */}
        <div style={{ fontSize: 10, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', textAlign: 'center', margin: '8px 0', padding: '6px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 10 }}>
          <span>Scroll down for Overlays, Color Modes & Tools ↓</span>
        </div>

        {/* Cluster Overlays */}
        <div className="mobile-control-row" style={{ marginTop: 8 }}>
          <span className="mobile-control-label" style={{ fontSize: 11, fontWeight: 700, color: '#ec4899', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
            <Layers style={{ width: 13, height: 13 }} /> Cluster Overlays:
          </span>
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
            style={{ width: '100%', padding: '8px', borderRadius: 10, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', outline: 'none', fontSize: 12 }}
          >
            <option value="cohort">Cohorts</option>
            <option value="current_location">Current Location</option>
            <option value="interests">Interests</option>
            <option value="locations">Locations (Combined)</option>
            <option value="none">Off (Hide)</option>
            <option value="original_location">Original Location</option>
          </select>
        </div>

        {/* Focus Specific Cluster Dropdown */}
        {availableClusters && (availableClusters.all?.length > 0 || Array.isArray(availableClusters)) && (
          <div className="mobile-control-row" style={{ marginTop: 8 }}>
            <span className="mobile-control-label" style={{ fontSize: 11, fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
              <Compass style={{ width: 13, height: 13 }} /> Focus Specific Cluster:
            </span>
            <select 
              value={selectedClusterFocus}
              onChange={(e) => setSelectedClusterFocus(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: 10, background: 'rgba(30, 41, 59, 0.9)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', outline: 'none', fontSize: 12, fontWeight: 700 }}
            >
              <option value="">All Clusters (Show All)</option>
              {availableClusters.interests?.length > 0 && (
                <optgroup label="🎨 Interests">
                  {[...availableClusters.interests].sort((a, b) => a.localeCompare(b)).map(item => (
                    <option key={`int_${item}`} value={item}>{item}</option>
                  ))}
                </optgroup>
              )}
              {availableClusters.locations?.length > 0 && (
                <optgroup label="📍 Locations (Current or Home)">
                  {[...availableClusters.locations].sort((a, b) => a.localeCompare(b)).map(item => (
                    <option key={`loc_${item}`} value={item}>{item}</option>
                  ))}
                </optgroup>
              )}
              {availableClusters.cohorts?.length > 0 && (
                <optgroup label="🎓 Cohorts">
                  {[...availableClusters.cohorts].sort((a, b) => a.localeCompare(b)).map(item => (
                    <option key={`coh_${item}`} value={item}>{item}</option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>
        )}

        {/* Color Mode Selector */}
        <div className="mobile-control-row" style={{ marginTop: 8 }}>
          <span className="mobile-control-label" style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
            <Palette style={{ width: 13, height: 13 }} /> Card Color Mode:
          </span>
          <div style={{ display: 'flex', gap: 4, background: 'rgba(30, 41, 59, 0.6)', padding: 3, borderRadius: 10 }}>
            <button onClick={() => setColorMode('cohort')} className={`btn-mode ${colorMode === 'cohort' ? 'active' : ''}`} style={{ flex: 1, padding: 6, fontSize: 11 }}>Cohort</button>
            <button onClick={() => setColorMode('side')} className={`btn-mode ${colorMode === 'side' ? 'active' : ''}`} style={{ flex: 1, padding: 6, fontSize: 11 }}>Side</button>
            <button onClick={() => setColorMode('locations')} className={`btn-mode ${colorMode === 'locations' || colorMode === 'state' ? 'active' : ''}`} style={{ flex: 1, padding: 6, fontSize: 11 }}>Location</button>
          </div>
        </div>

        {/* Action Tools Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
          <button 
            onClick={() => { setIsListView(!isListView); onClose(); }} 
            className={`btn-mode ${isListView ? 'active' : ''}`}
            style={{ padding: '10px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: isListView ? '#f43f5e' : 'rgba(244, 63, 94, 0.15)', color: '#fda4af', fontWeight: 800 }}
          >
            <span>{isListView ? '🌐 Switch to 3D Canvas Map' : '📋 Open Guest Directory List'}</span>
          </button>

          <button 
            onClick={() => { setIsPathMode(!isPathMode); onClose(); }} 
            className={`btn-mode ${isPathMode ? 'active' : ''}`}
            style={{ padding: '10px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: isPathMode ? '#0284c7' : 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontWeight: 700 }}
          >
            <Compass style={{ width: 14, height: 14 }} /> Path Finder Calculator
          </button>

          <button 
            onClick={() => { setIsMatchmakerOpen(true); onClose(); }}
            className="btn-mode"
            style={{ padding: '10px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 700 }}
          >
            <Wand2 style={{ width: 14, height: 14 }} /> Cocktail Hour Matchmaker
          </button>

          <button 
            onClick={() => { setIsFeedbackModalOpen(true); onClose(); }}
            className="btn-mode"
            style={{ padding: '10px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(255, 255, 255, 0.08)', color: '#fff' }}
          >
            <Edit3 style={{ width: 14, height: 14 }} /> Suggest Profile Edit
          </button>

          {isAdmin && (
            <button 
              onClick={handleCopyQrLink}
              className="btn-mode"
              style={{ padding: '10px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid #38bdf8' }}
            >
              <Copy style={{ width: 14, height: 14 }} /> Copy Invitation QR Link
            </button>
          )}
        </div>
      </div>
    </>
  );
}
