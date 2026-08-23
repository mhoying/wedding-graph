import React from 'react';
import { X, Edit3 } from 'lucide-react';
import { sanitizeInput } from '../utils/security';

export default function SuggestEditModal({
  isOpen,
  onClose,
  feedbackTargetNode,
  setFeedbackTargetNode,
  nodes,
  feedbackCategory,
  setFeedbackCategory,
  feedbackNote,
  setFeedbackNote,
  handleSubmitFeedback
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop no-print">
      <div className="glass-panel modal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 16 }}>
            <Edit3 style={{ width: 16, height: 16, color: '#38bdf8' }} />
            <span>Suggest Profile Edit for Hosts</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
          Maureen & Matt will review your suggestion in the Host Queue!
        </p>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Select Guest Profile:</label>
          <select 
            value={feedbackTargetNode?.id || ''}
            onChange={(e) => {
              const selected = nodes.find(n => n.id === e.target.value);
              if (selected) setFeedbackTargetNode(selected);
            }}
            style={{ width: '100%', padding: '8px 12px', borderRadius: 10, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', outline: 'none', fontSize: 12 }}
          >
            {(nodes || []).filter(n => n && n.type === 'GUEST').map(n => (
              <option key={n.id} value={n.id}>{n.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Category:</label>
          <select 
            value={feedbackCategory}
            onChange={(e) => setFeedbackCategory(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: 10, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', outline: 'none', fontSize: 12 }}
          >
            <option value="Missing Interest">Missing Interest (e.g. "You forgot that I like Wine!")</option>
            <option value="Family Status Update">Family Status Update (e.g. "My daughter is 17 now!")</option>
            <option value="Hometown / State Edit">Hometown / State Correction</option>
            <option value="Relationship Correction">Relationship Connection Edit</option>
            <option value="Other">Other Suggestion</option>
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Note / Proposed Change:</label>
          <textarea 
            rows={3}
            placeholder='e.g. "Add Coffee tag", "Currently lives in Seattle, WA"'
            value={feedbackNote}
            onChange={(e) => setFeedbackNote(sanitizeInput(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', borderRadius: 10, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', outline: 'none', fontSize: 12, resize: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button 
            type="button"
            onClick={handleSubmitFeedback}
            style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#0284c7', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}
          >
            Submit Suggestion
          </button>
          <button 
            type="button"
            onClick={onClose}
            style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.1)', color: '#94a3b8', border: 'none', cursor: 'pointer', fontSize: 12 }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
