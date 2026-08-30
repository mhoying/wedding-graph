import React, { useState } from 'react';
import { X, Link2, Plus, Check } from 'lucide-react';

export default function AddConnectionModal({
  isOpen,
  onClose,
  nodes,
  onAddConnection
}) {
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [relationshipLabel, setRelationshipLabel] = useState('Friends');
  const [customLabel, setCustomLabel] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const guestNodes = nodes.filter(n => n.type === 'GUEST' || n.type === 'ANCHOR').sort((a, b) => a.name.localeCompare(b.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sourceId || !targetId) {
      setStatusMsg('Please select two guests to connect!');
      return;
    }
    if (sourceId === targetId) {
      setStatusMsg('Source and Target cannot be the same guest!');
      return;
    }

    const finalLabel = relationshipLabel === 'Custom' ? (customLabel.trim() || 'Connected') : relationshipLabel;
    
    const sourceNode = nodes.find(n => n.id === sourceId);
    const targetNode = nodes.find(n => n.id === targetId);

    onAddConnection({
      source: sourceId,
      target: targetId,
      label: finalLabel
    });

    setStatusMsg(`Connected ${sourceNode?.name || 'Guest 1'} ➔ ${targetNode?.name || 'Guest 2'} (${finalLabel})!`);
    setTimeout(() => {
      setStatusMsg('');
      setSourceId('');
      setTargetId('');
      setCustomLabel('');
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-panel no-print" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480, width: '92vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8' }}>
            <Link2 style={{ width: 20, height: 20 }} />
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Add Guest Relationship Connection
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Guest 1 Selector */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', marginBottom: 4, display: 'block' }}>
              First Guest (Source):
            </label>
            <select 
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 10, background: '#0f172a', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', outline: 'none', fontSize: 12, fontWeight: 700 }}
            >
              <option value="">-- Select 1st Guest --</option>
              {guestNodes.map(n => (
                <option key={n.id} value={n.id}>{n.name} ({n.cohort || 'Guest'})</option>
              ))}
            </select>
          </div>

          {/* Connection Indicator */}
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, fontWeight: 800 }}>
            ↕ CONNECT WITH ↕
          </div>

          {/* Guest 2 Selector */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', marginBottom: 4, display: 'block' }}>
              Second Guest (Target):
            </label>
            <select 
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 10, background: '#0f172a', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.4)', outline: 'none', fontSize: 12, fontWeight: 700 }}
            >
              <option value="">-- Select 2nd Guest --</option>
              {guestNodes.filter(n => n.id !== sourceId).map(n => (
                <option key={n.id} value={n.id}>{n.name} ({n.cohort || 'Guest'})</option>
              ))}
            </select>
          </div>

          {/* Relationship Label Selector */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', marginBottom: 4, display: 'block' }}>
              Relationship Label:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 6 }}>
              {['College Friends', 'Coworkers', 'Custom', 'Dog Park', 'Family', 'Friends'].map(labelOption => (
                <button
                  type="button"
                  key={labelOption}
                  onClick={() => setRelationshipLabel(labelOption)}
                  className={`btn-mode ${relationshipLabel === labelOption ? 'active' : ''}`}
                  style={{ padding: '6px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}
                >
                  {labelOption}
                </button>
              ))}
            </div>

            {relationshipLabel === 'Custom' && (
              <input 
                type="text"
                placeholder="Enter custom relationship label (e.g. High School Roommate)..."
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 8, background: '#0f172a', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: 12 }}
              />
            )}
          </div>

          {/* Status Message */}
          {statusMsg && (
            <div style={{ padding: '8px', borderRadius: 8, background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', fontSize: 12, fontWeight: 700, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Check style={{ width: 14, height: 14 }} />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Modal Footer Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.1)', color: '#cbd5e1', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{ padding: '8px 18px', borderRadius: 10, background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Plus style={{ width: 14, height: 14 }} /> Add Connection Line
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
