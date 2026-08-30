import React from 'react';
import { X, Check, Trash2, ShieldAlert, Sparkles, ArrowRight, FileText } from 'lucide-react';

function computeProposalDiff(proposal, targetNode) {
  const diffs = [];
  if (!proposal) return diffs;

  const curr = targetNode || {};

  // 1. Name diff
  if (proposal.proposedName && proposal.proposedName !== curr.name) {
    diffs.push({
      field: 'Name',
      current: curr.name || '(empty)',
      proposed: proposal.proposedName
    });
  }

  // 2. Currently Lives In (Location) diff
  if (proposal.proposedLocation && proposal.proposedLocation !== (curr.currentlyLivesIn || curr.state || '')) {
    diffs.push({
      field: 'Currently Lives In',
      current: curr.currentlyLivesIn || curr.state || '(none)',
      proposed: proposal.proposedLocation
    });
  }

  // 3. Originally From (Hometown) diff
  if (proposal.proposedOriginallyFrom && proposal.proposedOriginallyFrom !== (curr.originallyFrom || curr.hometown || '')) {
    diffs.push({
      field: 'Originally From',
      current: curr.originallyFrom || curr.hometown || '(none)',
      proposed: proposal.proposedOriginallyFrom
    });
  }

  // 4. Cohort / Group diff
  if (proposal.proposedCohort && proposal.proposedCohort !== curr.cohort) {
    diffs.push({
      field: 'Cohort / Group',
      current: curr.cohort || '(none)',
      proposed: proposal.proposedCohort
    });
  }

  // 5. Side diff
  if (proposal.proposedSide && proposal.proposedSide !== curr.side) {
    diffs.push({
      field: 'Side',
      current: curr.side || '(none)',
      proposed: proposal.proposedSide
    });
  }

  // 6. Relationship diff
  if (proposal.proposedRelationship && proposal.proposedRelationship !== curr.relationship) {
    diffs.push({
      field: 'Relationship',
      current: curr.relationship || '(none)',
      proposed: proposal.proposedRelationship
    });
  }

  // 7. Hobbies / Interests diff
  if (proposal.proposedHobbies) {
    const currentHobbiesStr = (curr.hobbies || []).join(', ');
    if (proposal.proposedHobbies !== currentHobbiesStr) {
      diffs.push({
        field: 'Interests / Tags',
        current: currentHobbiesStr || '(none)',
        proposed: proposal.proposedHobbies
      });
    }
  }

  // Fallback: parse formatted proposal note "Proposed Changes: Field: val | Field2: val2" if diffs array is empty
  if (diffs.length === 0 && proposal.note && proposal.note.includes('Proposed Changes:')) {
    const changesText = proposal.note.replace(/^Proposed Changes:\s*/i, '');
    const parts = changesText.split('|').map(p => p.trim());
    parts.forEach(part => {
      const match = part.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        const field = match[1].trim();
        const proposedVal = match[2].trim();
        let currentVal = '(none)';
        if (field.toLowerCase().includes('hobbies') || field.toLowerCase().includes('interests')) {
          currentVal = (curr.hobbies || []).join(', ') || '(none)';
        } else if (field.toLowerCase().includes('location') || field.toLowerCase().includes('lives')) {
          currentVal = curr.currentlyLivesIn || '(none)';
        } else if (field.toLowerCase().includes('originally') || field.toLowerCase().includes('from')) {
          currentVal = curr.originallyFrom || '(none)';
        } else if (field.toLowerCase().includes('group') || field.toLowerCase().includes('cohort')) {
          currentVal = curr.cohort || '(none)';
        } else if (field.toLowerCase().includes('relationship')) {
          currentVal = curr.relationship || '(none)';
        }
        diffs.push({
          field: field,
          current: currentVal,
          proposed: proposedVal
        });
      }
    });
  }

  return diffs;
}

export default function HostReviewQueueModal({
  isOpen,
  onClose,
  proposals = [],
  nodes = [],
  onApprove,
  onReject
}) {
  if (!isOpen) return null;

  const pendingProposals = (proposals || []).filter(p => p && (p.status === 'PENDING' || !p.status));

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 99998
        }}
        onClick={onClose}
      />

      <div 
        className="glass-panel no-print"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 680,
          maxHeight: '85vh',
          background: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 24,
          padding: 24,
          zIndex: 99999,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ padding: 8, borderRadius: 12, background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
              <ShieldAlert style={{ width: 22, height: 22, color: '#ef4444' }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#fff' }}>Host Moderation Queue</h2>
              <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>Review field diffs and approve guest profile edit proposals</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 6, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
          {pendingProposals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <Sparkles style={{ width: 36, height: 36, color: '#10b981', marginBottom: 10 }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Moderation Queue is Empty!</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>All guest profile suggestions have been reviewed and merged.</div>
            </div>
          ) : (
            pendingProposals.map((proposal) => {
              const targetNode = (nodes || []).find(n => n.id === proposal.targetId || n.name === proposal.targetName);
              const diffs = computeProposalDiff(proposal, targetNode);

              return (
                <div 
                  key={proposal.id || proposal.timestamp}
                  style={{
                    background: 'rgba(30, 41, 59, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 14
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 9999, background: '#38bdf8', color: '#0f172a', marginRight: 8 }}>
                        {proposal.category || 'Profile Edit'}
                      </span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>
                        {proposal.targetName}
                      </span>
                    </div>
                    <span style={{ fontSize: 10, color: '#64748b' }}>
                      {proposal.timestamp ? new Date(proposal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>

                  {/* Field Diff Breakdown */}
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.08)', padding: 12, marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FileText style={{ width: 14, height: 14 }} />
                      <span>Proposed Field Diffs:</span>
                    </div>

                    {diffs.length === 0 ? (
                      <div style={{ fontSize: 12, color: '#cbd5e1', background: 'rgba(30, 41, 59, 0.5)', padding: 8, borderRadius: 8 }}>
                        {proposal.note || 'General proposal update submitted.'}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {diffs.map((d, idx) => (
                          <div 
                            key={idx} 
                            style={{ 
                              display: 'grid', 
                              gridTemplateColumns: '110px 1fr 20px 1fr', 
                              gap: 8, 
                              alignItems: 'center', 
                              fontSize: 11, 
                              background: 'rgba(30, 41, 59, 0.5)', 
                              padding: '8px 10px', 
                              borderRadius: 10, 
                              border: '1px solid rgba(255, 255, 255, 0.05)' 
                            }}
                          >
                            <div style={{ fontWeight: 700, color: '#cbd5e1' }}>{d.field}</div>
                            
                            {/* Current / Before */}
                            <div style={{ color: '#f87171', background: 'rgba(239, 68, 68, 0.12)', padding: '4px 8px', borderRadius: 6, border: '1px solid rgba(239, 68, 68, 0.2)', wordBreak: 'break-word' }}>
                              <span style={{ fontSize: 9, textTransform: 'uppercase', opacity: 0.7, display: 'block', fontWeight: 800, marginBottom: 2 }}>Current</span>
                              {d.current}
                            </div>

                            <ArrowRight style={{ width: 14, height: 14, color: '#94a3b8', margin: '0 auto' }} />

                            {/* Proposed / After */}
                            <div style={{ color: '#34d399', background: 'rgba(16, 185, 129, 0.12)', padding: '4px 8px', borderRadius: 6, border: '1px solid rgba(16, 185, 129, 0.2)', wordBreak: 'break-word', fontWeight: 700 }}>
                              <span style={{ fontSize: 9, textTransform: 'uppercase', opacity: 0.7, display: 'block', fontWeight: 800, marginBottom: 2 }}>Proposed</span>
                              {d.proposed}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {proposal.note && diffs.length > 0 && (
                    <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12, fontStyle: 'italic' }}>
                      Note: "{proposal.note}"
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button 
                      type="button"
                      onClick={() => onApprove(proposal)}
                      style={{ flex: 1, padding: '9px 12px', borderRadius: 10, background: '#10b981', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                    >
                      <Check style={{ width: 14, height: 14 }} />
                      <span>Approve & Merge to Database</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => onReject(proposal)}
                      style={{ padding: '9px 14px', borderRadius: 10, background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', fontWeight: 700, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <Trash2 style={{ width: 14, height: 14 }} />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
