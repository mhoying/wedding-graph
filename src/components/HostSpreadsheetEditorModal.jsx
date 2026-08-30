import React, { useState, useEffect } from 'react';
import { X, Search, Plus, Trash2, Save, FileSpreadsheet, Sparkles, Check } from 'lucide-react';

export default function HostSpreadsheetEditorModal({
  isOpen,
  onClose,
  nodes = [],
  onSaveDataset
}) {
  const [gridData, setGridData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && Array.isArray(nodes)) {
      // Map guest nodes to editable grid rows
      const guestRows = nodes
        .filter(n => n && n.type === 'GUEST')
        .map(n => ({
          id: n.id || `guest_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          name: n.name || '',
          side: n.side || 'Maureen',
          cohort: n.cohort || '',
          relationship: n.relationship || '',
          originallyFrom: n.originallyFrom || n.hometown || '',
          currentlyLivesIn: n.currentlyLivesIn || n.state || '',
          familyStatus: n.familyStatus || 'Couple / Group',
          hobbiesStr: Array.isArray(n.hobbies) ? n.hobbies.join('; ') : (n.hobbies || '')
        }));
      setGridData(guestRows);
    }
  }, [isOpen, nodes]);

  if (!isOpen) return null;

  const handleCellChange = (id, field, value) => {
    setGridData(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleAddRow = () => {
    const newRowId = `guest_new_${Date.now()}`;
    const newRow = {
      id: newRowId,
      name: 'New Guest',
      side: 'Maureen',
      cohort: 'Friends',
      relationship: 'Friend',
      originallyFrom: '',
      currentlyLivesIn: 'SF Bay Area',
      familyStatus: 'Single',
      hobbiesStr: ''
    };
    setGridData(prev => [newRow, ...prev]);
  };

  const handleDeleteRow = (id) => {
    if (window.confirm('Are you sure you want to remove this guest row from the spreadsheet?')) {
      setGridData(prev => prev.filter(row => row.id !== id));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Convert grid rows back to node objects
    const updatedGuestNodes = gridData.map(row => {
      const hobbies = (row.hobbiesStr || '')
        .split(/[,;\n]/)
        .map(s => s.trim())
        .filter(Boolean);

      return {
        id: row.id,
        name: row.name,
        type: 'GUEST',
        side: row.side,
        cohort: row.cohort,
        relationship: row.relationship,
        originallyFrom: row.originallyFrom,
        currentlyLivesIn: row.currentlyLivesIn,
        familyStatus: row.familyStatus,
        hobbies: hobbies
      };
    });

    await onSaveDataset(updatedGuestNodes);
    setIsSaving(false);
    onClose();
  };

  const filteredGridData = gridData.filter(row => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      row.name.toLowerCase().includes(q) ||
      row.cohort.toLowerCase().includes(q) ||
      row.side.toLowerCase().includes(q) ||
      row.currentlyLivesIn.toLowerCase().includes(q) ||
      row.hobbiesStr.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 99998
        }}
        onClick={onClose}
      />

      <div 
        className="glass-panel no-print"
        style={{
          position: 'fixed',
          top: '4%',
          left: '3%',
          right: '3%',
          bottom: '4%',
          background: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 24,
          padding: 24,
          zIndex: 99999,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ padding: 10, borderRadius: 14, background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <FileSpreadsheet style={{ width: 24, height: 24, color: '#38bdf8' }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#fff' }}>Host Live Spreadsheet Grid Editor</h2>
              <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>Edit all guest profile fields in real-time and auto-commit changes to the repo database</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              onClick={() => {
                const current = localStorage.getItem('wedding_graph_gh_token') || '';
                const newToken = window.prompt('🔑 Enter GitHub Personal Access Token (PAT) with repo scope:', current);
                if (newToken !== null) {
                  if (newToken.trim()) {
                    localStorage.setItem('wedding_graph_gh_token', newToken.trim());
                    alert('✅ GitHub Access Token saved to local browser storage!');
                  } else {
                    localStorage.removeItem('wedding_graph_gh_token');
                    alert('Cleared custom GitHub Access Token.');
                  }
                }
              }}
              style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.08)', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.15)', fontWeight: 700, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
              title="Configure GitHub Personal Access Token for Direct Commits"
            >
              <span>🔑 PAT Token</span>
            </button>

            <button
              type="button"
              onClick={handleAddRow}
              style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: 700, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Plus style={{ width: 16, height: 16 }} />
              <span>Add Guest Row</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              style={{ padding: '8px 18px', borderRadius: 10, background: '#10b981', color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
            >
              <Save style={{ width: 16, height: 16 }} />
              <span>{isSaving ? 'Committing to GitHub...' : 'Save & Commit All Changes'}</span>
            </button>

            <button 
              type="button"
              onClick={onClose}
              style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>

        {/* Search Filter & Record Counter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 12, padding: '6px 14px', flex: 1, maxWidth: 400 }}>
            <Search style={{ width: 16, height: 16, color: '#94a3b8' }} />
            <input 
              type="text"
              placeholder="Search guests in spreadsheet grid..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 13, width: '100%' }}
            />
            {searchFilter && (
              <button onClick={() => setSearchFilter('')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>
                <X style={{ width: 14, height: 14 }} />
              </button>
            )}
          </div>

          <span style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '6px 14px', borderRadius: 9999, border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            Showing {filteredGridData.length} of {gridData.length} Guests
          </span>
        </div>

        {/* Spreadsheet Data Grid Table Container */}
        <div style={{ flex: 1, overflow: 'auto', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 16, background: 'rgba(15, 23, 42, 0.6)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlig: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(30, 41, 59, 0.95)', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                <th style={{ padding: '10px 12px', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#94a3b8', width: 40 }}>#</th>
                <th style={{ padding: '10px 12px', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#38bdf8', minWidth: 150 }}>Guest Name</th>
                <th style={{ padding: '10px 12px', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#ec4899', width: 110 }}>Side</th>
                <th style={{ padding: '10px 12px', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#a855f7', minWidth: 120 }}>Group / Cohort</th>
                <th style={{ padding: '10px 12px', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#cbd5e1', minWidth: 140 }}>Relationship</th>
                <th style={{ padding: '10px 12px', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#fbbf24', minWidth: 110 }}>Hometown</th>
                <th style={{ padding: '10px 12px', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#34d399', minWidth: 120 }}>Current Location</th>
                <th style={{ padding: '10px 12px', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#38bdf8', minWidth: 220 }}>Interests / Hobbies (Semicolon Separated)</th>
                <th style={{ padding: '10px 12px', borderBottom: '2px solid rgba(255,255,255,0.15)', color: '#f87171', width: 60, textAlign: 'center' }}>Del</th>
              </tr>
            </thead>
            <tbody>
              {filteredGridData.map((row, idx) => (
                <tr 
                  key={row.id}
                  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)' }}
                >
                  <td style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600 }}>{idx + 1}</td>
                  
                  {/* Name Cell */}
                  <td style={{ padding: '6px 10px' }}>
                    <input 
                      type="text"
                      value={row.name}
                      onChange={(e) => handleCellChange(row.id, 'name', e.target.value)}
                      style={{ width: '100%', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', padding: '5px 8px', borderRadius: 8, outline: 'none', fontSize: 12, fontWeight: 700 }}
                    />
                  </td>

                  {/* Side Cell */}
                  <td style={{ padding: '6px 10px' }}>
                    <select
                      value={row.side}
                      onChange={(e) => handleCellChange(row.id, 'side', e.target.value)}
                      style={{ width: '100%', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', color: row.side === 'Maureen' ? '#ec4899' : row.side === 'Matt' ? '#3b82f6' : '#10b981', padding: '5px 6px', borderRadius: 8, outline: 'none', fontSize: 12, fontWeight: 700 }}
                    >
                      <option value="Maureen">Maureen</option>
                      <option value="Matt">Matt</option>
                      <option value="Joint">Joint</option>
                    </select>
                  </td>

                  {/* Cohort Cell */}
                  <td style={{ padding: '6px 10px' }}>
                    <input 
                      type="text"
                      value={row.cohort}
                      onChange={(e) => handleCellChange(row.id, 'cohort', e.target.value)}
                      style={{ width: '100%', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#a855f7', padding: '5px 8px', borderRadius: 8, outline: 'none', fontSize: 12, fontWeight: 600 }}
                    />
                  </td>

                  {/* Relationship Cell */}
                  <td style={{ padding: '6px 10px' }}>
                    <input 
                      type="text"
                      value={row.relationship}
                      onChange={(e) => handleCellChange(row.id, 'relationship', e.target.value)}
                      style={{ width: '100%', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#cbd5e1', padding: '5px 8px', borderRadius: 8, outline: 'none', fontSize: 12 }}
                    />
                  </td>

                  {/* Originally From Cell */}
                  <td style={{ padding: '6px 10px' }}>
                    <input 
                      type="text"
                      value={row.originallyFrom}
                      onChange={(e) => handleCellChange(row.id, 'originallyFrom', e.target.value)}
                      style={{ width: '100%', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fbbf24', padding: '5px 8px', borderRadius: 8, outline: 'none', fontSize: 12 }}
                    />
                  </td>

                  {/* Currently Lives In Cell */}
                  <td style={{ padding: '6px 10px' }}>
                    <input 
                      type="text"
                      value={row.currentlyLivesIn}
                      onChange={(e) => handleCellChange(row.id, 'currentlyLivesIn', e.target.value)}
                      style={{ width: '100%', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#34d399', padding: '5px 8px', borderRadius: 8, outline: 'none', fontSize: 12 }}
                    />
                  </td>

                  {/* Hobbies / Interests Cell */}
                  <td style={{ padding: '6px 10px' }}>
                    <input 
                      type="text"
                      placeholder="e.g. Skiing; Coffee; Wine"
                      value={row.hobbiesStr}
                      onChange={(e) => handleCellChange(row.id, 'hobbiesStr', e.target.value)}
                      style={{ width: '100%', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#38bdf8', padding: '5px 8px', borderRadius: 8, outline: 'none', fontSize: 12 }}
                    />
                  </td>

                  {/* Delete Cell */}
                  <td style={{ padding: '6px 10px', textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(row.id)}
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, padding: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Delete Guest Row"
                    >
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
