import React from 'react';
import { Search, Sun, Moon, Layers, Download, X, Heart, ShieldAlert } from 'lucide-react';

export default function TopHeaderNav({
  searchQuery,
  setSearchQuery,
  selectedInterests,
  setSelectedInterests,
  isLightMode,
  setIsLightMode,
  clusterMode,
  setClusterMode,
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

      <div className="search-controls-area">
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
        <div className="glass-panel color-mode-bar desktop-only-inline">
          <Layers style={{ width: 14, height: 14, color: '#ec4899' }} />
          <span style={{ color: '#94a3b8', fontSize: 11 }}>Clusters:</span>
          <select 
            value={clusterMode}
            onChange={(e) => setClusterMode(e.target.value)}
            style={{ background: 'none', border: 'none', color: isLightMode ? '#0f172a' : '#f8fafc', fontSize: 11, fontWeight: 600, outline: 'none', cursor: 'pointer' }}
          >
            <option value="cohort" style={{ background: '#0f172a', color: '#fff' }}>Cohorts</option>
            <option value="locations" style={{ background: '#0f172a', color: '#fff' }}>Locations</option>
            <option value="current_location" style={{ background: '#0f172a', color: '#fff' }}>Current Location</option>
            <option value="original_location" style={{ background: '#0f172a', color: '#fff' }}>Original Location</option>
            <option value="interests" style={{ background: '#0f172a', color: '#fff' }}>Interests</option>
            <option value="none" style={{ background: '#0f172a', color: '#fff' }}>Off (Hide)</option>
          </select>
        </div>

        {/* Light / Dark Mode Toggle Button */}
        <button 
          onClick={() => setIsLightMode(!isLightMode)} 
          className="glass-panel btn-icon"
          title="Toggle Light/Dark Theme"
        >
          {isLightMode ? <Moon style={{ width: 15, height: 15 }} /> : <Sun style={{ width: 15, height: 15, color: '#38bdf8' }} />}
        </button>

        {/* 1-Click CSV Export Button */}
        <button 
          onClick={handleExportCsv} 
          className="glass-panel btn-icon"
          title="Export Guest List to CSV for Google Sheets"
          style={{ gap: 4, padding: '6px 10px', fontSize: 11, fontWeight: 600, color: '#34d399' }}
        >
          <Download style={{ width: 14, height: 14, color: '#34d399' }} />
          <span className="desktop-only-inline">Export CSV</span>
        </button>

        {/* Hidden Host Admin Indicators (Only visible when unlocked via secret URL parameter) */}
        {isAdmin && (
          <>
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
