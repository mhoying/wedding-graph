import React from 'react';
import { X, Check, Trash2, ShieldAlert, Sparkles, MapPin, Tag } from 'lucide-react';

export default function HostReviewQueueModal({
  isOpen,
  onClose,
  proposals = [],
  onApprove,
  onReject
}) {
  if (!isOpen) return null;

  const pendingProposals = proposals.filter(p => p.status === 'PENDING' || !p.status);

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
          maxWidth: 620,
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
              <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>Review and approve guest edit suggestions submitted from mobile phones</p>
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
            pendingProposals.map((proposal) => (
              <div 
                key={proposal.id || proposal.timestamp}
                style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 9999, background: '#38bdf8', color: '#0f172a', marginRight: 8 }}>
                      {proposal.category || 'Profile Edit'}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>
                      {proposal.targetName}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, color: '#64748b' }}>
                    {proposal.timestamp ? new Date(proposal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>

                {proposal.note && (
                  <div style={{ fontSize: 12, color: '#cbd5e1', marginBottom: 10, background: 'rgba(15, 23, 42, 0.5)', padding: 8, borderRadius: 10 }}>
                    "{proposal.note}"
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, marginBottom: 12 }}>
                  {proposal.proposedHobbies && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#34d399' }}>
                      <Tag style={{ width: 14, height: 14 }} />
                      <span><strong>Proposed Hobbies:</strong> {proposal.proposedHobbies}</span>
                    </div>
                  )}
                  {proposal.proposedLocation && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fbbf24' }}>
                      <MapPin style={{ width: 14, height: 14 }} />
                      <span><strong>Proposed Location:</strong> {proposal.proposedLocation}</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button 
                    type="button"
                    onClick={() => onApprove(proposal)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: 10, background: '#10b981', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <Check style={{ width: 14, height: 14 }} />
                    <span>Approve & Merge to Database</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => onReject(proposal)}
                    style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', fontWeight: 700, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <Trash2 style={{ width: 14, height: 14 }} />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
