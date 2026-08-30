import React from 'react';
import { X, Edit3, Ghost, Landmark, Home, MapPin, Users, Sparkles } from 'lucide-react';

export default function GuestProfileDrawer({
  selectedNode,
  nodes,
  onClose,
  isEditingDrawer,
  setIsEditingDrawer,
  editName,
  setEditName,
  editRelationship,
  setEditRelationship,
  editOriginallyFrom,
  setEditOriginallyFrom,
  editCurrentlyLivesIn,
  setEditCurrentlyLivesIn,
  editCohort,
  setEditCohort,
  editSide,
  setEditSide,
  editFamilyStatus,
  setEditFamilyStatus,
  editHobbies,
  newInterestInput,
  setNewInterestInput,
  handleAddInterestTag,
  handleRemoveInterestTag,
  handleSaveProfileEdits,
  selectedInterests,
  setSelectedInterests,
  colorMode,
  getNodeColor
}) {
  const availableTags = React.useMemo(() => {
    const set = new Set([
      'San Diego Chargers',
      'Chargers',
      'Cycling', 'Tennis', 'Dogs', 'Kids', 'Whiskey', 'Beer', 'Wine', 'Cocktails', 'Pottery', 'Design', 'Spa days', 'Music', 'Art', 'Books', 'Sailing', 'Lehigh', 'Bay FC', 'Food', 'Gardening', 'Embroidery', 'Knitting', 'Aquaria', 'Travel', 'Hiking', 'Running', 'Golf', 'Baking', 'Gaming'
    ]);
    if (nodes && Array.isArray(nodes)) {
      nodes.forEach(n => {
        if (n.hobbies && Array.isArray(n.hobbies)) {
          n.hobbies.forEach(h => {
            if (h && typeof h === 'string' && h.trim()) set.add(h.trim());
          });
        }
      });
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [nodes]);

  const availableCohorts = React.useMemo(() => {
    const set = new Set(['Bay FC', 'Cornell', 'Dog Park', 'Google', 'Lehigh', 'OWFL Blog', 'The Couple', 'Other']);
    if (nodes && Array.isArray(nodes)) {
      nodes.forEach(n => {
        if (n.cohort && typeof n.cohort === 'string' && n.cohort.trim()) set.add(n.cohort.trim());
      });
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [nodes]);

  const availableLocations = React.useMemo(() => {
    const set = new Set(['SF Bay Area', 'NYC', 'Chicago', 'DC', 'Baltimore', 'Bermuda', 'Madison, WI', 'Houston', 'Boston, MA', 'Stockton, Ca', 'Upstate NY', 'Western PA', 'Eastern PA', 'Colorado']);
    if (nodes && Array.isArray(nodes)) {
      nodes.forEach(n => {
        if (n.originallyFrom && typeof n.originallyFrom === 'string' && n.originallyFrom.trim()) set.add(n.originallyFrom.trim());
        if (n.currentlyLivesIn && typeof n.currentlyLivesIn === 'string' && n.currentlyLivesIn.trim()) set.add(n.currentlyLivesIn.trim());
      });
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [nodes]);

  if (!selectedNode) return null;

  const nodeColor = getNodeColor ? getNodeColor(selectedNode) : '#38bdf8';

  return (
    <div className="glass-panel metadata-drawer no-print">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span 
            className="drawer-badge"
            style={{ backgroundColor: nodeColor }}
          >
            {selectedNode.type === 'CONTEXT_HUB' ? '📍 Place Hub' : (selectedNode.type === 'NON_ATTENDING' ? '👻 Not Attending' : `${selectedNode.cohort} • ${selectedNode.side} Side`)}
          </span>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 }}
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h2 className="drawer-title" style={{ margin: 0 }}>{selectedNode.name}</h2>
          {!isEditingDrawer && (
            <button 
              onClick={() => setIsEditingDrawer(true)}
              className="btn-mode"
              style={{ fontSize: 11, padding: '4px 10px', borderRadius: 9999, background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Edit3 style={{ width: 12, height: 12 }} /> Edit Profile
            </button>
          )}
        </div>

        {!isEditingDrawer ? (
          /* VIEW MODE */
          <>
            <p className="drawer-subtitle">{selectedNode.relationship ? selectedNode.relationship.replace(/\s*&\s*guest/gi, '').trim() : ''}</p>

            <div className="drawer-section">
              {selectedNode.type === 'NON_ATTENDING' && (
                <div className="drawer-info-row" style={{ color: '#f59e0b', fontWeight: 600 }}>
                  <Ghost style={{ width: 16, height: 16, color: '#f59e0b' }} />
                  <span>Not Attending Wedding (Connecting Bridge Person)</span>
                </div>
              )}
              {(selectedNode.isAttending === false || selectedNode.rsvpStatus === 'Declined' || selectedNode.attendanceStatus === 'Not Attending') && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(239, 68, 68, 0.18)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '4px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 800, marginBottom: 8 }}>
                  <span>🚫 Not Attending (Declined)</span>
                </div>
              )}
              {selectedNode.type === 'CONTEXT_HUB' && (
                <div className="drawer-info-row" style={{ color: '#38bdf8', fontWeight: 600 }}>
                  <Landmark style={{ width: 16, height: 16, color: '#38bdf8' }} />
                  <span>Shared Meeting Location / Event Hub</span>
                </div>
              )}
              {(selectedNode.originallyFrom || selectedNode.hometown) && (
                <div className="drawer-info-row">
                  <Home style={{ width: 16, height: 16, color: '#f59e0b' }} />
                  <span>Originally from: {selectedNode.originallyFrom || selectedNode.hometown}</span>
                </div>
              )}
              {(selectedNode.currentlyLivesIn || selectedNode.state) && (
                <div className="drawer-info-row">
                  <MapPin style={{ width: 16, height: 16, color: '#38bdf8' }} />
                  <span>Currently lives in: {selectedNode.currentlyLivesIn || selectedNode.state}</span>
                </div>
              )}
              {selectedNode.hobbies && selectedNode.hobbies.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                    <Sparkles style={{ width: 16, height: 16, color: '#10b981' }} />
                    <span>Interests:</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selectedNode.hobbies.map(h => (
                      <button 
                        key={h}
                        onClick={() => {
                          if (!selectedInterests.includes(h)) {
                            setSelectedInterests([...selectedInterests, h]);
                          }
                          onClose();
                        }}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: 9999,
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          cursor: 'pointer'
                        }}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* DIRECT IN-SITU EDIT MODE FOR GUESTS */
          <div className="drawer-section" style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Edit3 style={{ width: 14, height: 14 }} /> Direct Profile Editor
            </div>

            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Full Name:</label>
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 10, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Relationship Note:</label>
              <textarea 
                rows={2}
                value={editRelationship}
                onChange={(e) => setEditRelationship(e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 10, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12, resize: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Originally From:</label>
                <input 
                  type="text" 
                  list="existing-locations-list"
                  placeholder="e.g. SF Bay Area"
                  value={editOriginallyFrom}
                  onChange={(e) => setEditOriginallyFrom(e.target.value)}
                  style={{ width: '100%', padding: 8, borderRadius: 10, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Currently Lives In:</label>
                <input 
                  type="text" 
                  list="existing-locations-list"
                  placeholder="e.g. NYC"
                  value={editCurrentlyLivesIn}
                  onChange={(e) => setEditCurrentlyLivesIn(e.target.value)}
                  style={{ width: '100%', padding: 8, borderRadius: 10, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Cohort Group:</label>
                <input 
                  type="text" 
                  list="existing-cohorts-list"
                  placeholder="e.g. Dog Park, Lehigh"
                  value={editCohort}
                  onChange={(e) => setEditCohort(e.target.value)}
                  style={{ width: '100%', padding: 8, borderRadius: 10, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Side:</label>
                <select 
                  value={editSide}
                  onChange={(e) => setEditSide(e.target.value)}
                  style={{ width: '100%', padding: 8, borderRadius: 10, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                >
                  <option value="Maureen">Maureen</option>
                  <option value="Matt">Matt</option>
                  <option value="Joint">Joint</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Interests (Click ✕ to remove):</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                {editHobbies.map(h => (
                  <span key={h} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 9999, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {h}
                    <X style={{ width: 12, height: 12, cursor: 'pointer' }} onClick={() => handleRemoveInterestTag(h)} />
                  </span>
                ))}
              </div>

              {/* Free Text Entry OR Auto-complete Input */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                <input 
                  type="text" 
                  list="existing-hobbies-list"
                  placeholder="Type new interest or select below..."
                  value={newInterestInput}
                  onChange={(e) => setNewInterestInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddInterestTag(); }}
                  style={{ flex: 1, padding: 6, borderRadius: 8, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                />
                <button 
                  type="button"
                  onClick={handleAddInterestTag}
                  style={{ padding: '6px 12px', borderRadius: 8, background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}
                >
                  Add
                </button>
              </div>

              {/* Quick Select from Existing Tags */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: 8, borderRadius: 8, border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#38bdf8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Select Existing Universe Tags:
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxHeight: 90, overflowY: 'auto' }}>
                  {availableTags
                    .filter(tag => !editHobbies.includes(tag))
                    .map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (!editHobbies.includes(tag)) {
                            handleAddInterestTag(tag);
                          }
                        }}
                        style={{
                          fontSize: 10,
                          padding: '2px 7px',
                          borderRadius: 9999,
                          background: 'rgba(56, 189, 248, 0.12)',
                          color: '#7dd3fc',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          cursor: 'pointer'
                        }}
                      >
                        + {tag}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Datalists for Autocomplete */}
            <datalist id="existing-hobbies-list">
              {availableTags.map(h => (
                <option key={h} value={h} />
              ))}
            </datalist>
            <datalist id="existing-cohorts-list">
              {availableCohorts.map(c => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <datalist id="existing-locations-list">
              {availableLocations.map(l => (
                <option key={l} value={l} />
              ))}
            </datalist>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button 
                onClick={handleSaveProfileEdits}
                style={{ flex: 1, padding: '8px', borderRadius: 10, background: '#10b981', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}
              >
                Save Changes
              </button>
              <button 
                onClick={() => setIsEditingDrawer(false)}
                style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.1)', color: '#94a3b8', border: 'none', cursor: 'pointer', fontSize: 12 }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
