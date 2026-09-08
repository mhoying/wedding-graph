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
  handleSubmitFeedback,
  allInterests = [],
  onPhotoUpload
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop no-print">
      <div className="glass-panel modal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 16 }}>
            <Edit3 style={{ width: 16, height: 16, color: '#38bdf8' }} />
            <span>Edit Guest Profile</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <p style={{ fontSize: 12, color: '#38bdf8', marginBottom: 16 }}>
          ✨ Updates submitted here are automatically saved to the database and committed live to GitHub repository subfolders!
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
            {[...(nodes || [])]
              .filter(n => n && n.type === 'GUEST' && n.name)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(n => (
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
            <option value="Profile Picture / Photo Upload">Profile Picture / Photo Upload</option>
            <option value="Family Status Update">Family Status Update (e.g. "My daughter is 17 now!")</option>
            <option value="Hometown / State Edit">Hometown / State Correction</option>
            <option value="Missing Interest">Missing Interest (e.g. "You forgot that I like Wine!")</option>
            <option value="Other">Other Suggestion</option>
            <option value="Relationship Correction">Relationship Connection Edit</option>
          </select>
        </div>

        {/* Direct Image File Uploader when Profile Picture / Photo Upload is selected */}
        {feedbackCategory === "Profile Picture / Photo Upload" && (
          <div style={{ marginBottom: 14, background: 'rgba(56, 189, 248, 0.1)', padding: 12, borderRadius: 10, border: '1px dashed #38bdf8' }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', display: 'block', marginBottom: 6 }}>
              📷 Upload Image File directly to GitHub Repository Subfolder:
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file && feedbackTargetNode && typeof onPhotoUpload === 'function') {
                  const reader = new FileReader();
                  reader.onload = (evt) => {
                    const img = new Image();
                    img.onload = () => {
                      const canvas = document.createElement('canvas');
                      canvas.width = 400;
                      canvas.height = 400;
                      const ctx = canvas.getContext('2d');
                      const minDim = Math.min(img.width, img.height);
                      const sx = (img.width - minDim) / 2;
                      const sy = (img.height - minDim) / 2;
                      ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 400, 400);
                      const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
                      onPhotoUpload(feedbackTargetNode.id, dataUrl);
                      onClose();
                    };
                    img.src = evt.target.result;
                  };
                  reader.readAsDataURL(file);
                }
              }}
              style={{ fontSize: 11, color: '#cbd5e1' }}
            />
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: 4 }}>Note / Proposed Change (Free Text OR Select Below):</label>
          <textarea 
            rows={2}
            placeholder='Type custom note OR click existing tags below...'
            value={feedbackNote}
            onChange={(e) => setFeedbackNote(sanitizeInput(e.target.value))}
            style={{ width: '100%', padding: '8px 12px', borderRadius: 10, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', outline: 'none', fontSize: 12, resize: 'none' }}
          />

          {/* Quick Select from Existing Tags */}
          <div style={{ marginTop: 8, background: 'rgba(15, 23, 42, 0.6)', padding: 8, borderRadius: 8, border: '1px dashed rgba(255, 255, 255, 0.15)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#38bdf8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Click Existing Tag to Append:
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxHeight: 70, overflowY: 'auto' }}>
              {(allInterests && allInterests.length > 0 ? allInterests : ['Cycling', 'Tennis', 'Dogs', 'Kids', 'Whiskey', 'Beer', 'Wine', 'Cocktails', 'Pottery', 'Design', 'Spa days', 'Music', 'Art', 'Books', 'Sailing', 'Lehigh', 'Bay FC', 'Food', 'Gardening', 'Embroidery', 'Knitting', 'Aquaria', 'Travel', 'Hiking', 'Running', 'Golf', 'Baking', 'Gaming'])
                .map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const prefix = feedbackNote ? `${feedbackNote}, ` : 'Add interest: ';
                      if (!feedbackNote.includes(tag)) {
                        setFeedbackNote(prefix + tag);
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
