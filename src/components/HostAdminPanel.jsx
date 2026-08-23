import React from 'react';
import { ShieldAlert, Download, Copy, Lock, FileSpreadsheet, Code, CheckCircle, Link2, UploadCloud } from 'lucide-react';

export default function HostAdminPanel({
  isAdmin,
  setIsAdmin,
  handleExportCsv,
  handleExportGitJs,
  handlePushToGithub,
  feedbackQueueCount,
  setIsFeedbackQueueOpen,
  handleCopyQrLink,
  setIsBulkImportOpen,
  setIsAddConnectionOpen
}) {
  if (!isAdmin) return null;

  return (
    <div className="glass-panel no-print" style={{
      position: 'absolute',
      top: 80,
      right: 20,
      zIndex: 600,
      padding: '16px 20px',
      borderRadius: 20,
      background: 'rgba(15, 23, 42, 0.95)',
      border: '1px solid rgba(239, 68, 68, 0.4)',
      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7)',
      width: 280,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
      {/* Panel Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f87171', fontWeight: 800, fontSize: 13 }}>
          <ShieldAlert style={{ width: 16, height: 16, color: '#ef4444' }} />
          <span>Host Admin Suite</span>
        </div>
        <button 
          onClick={() => setIsAdmin(false)}
          title="Lock Host Privileges"
          style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '4px 8px', borderRadius: 8, fontSize: 11, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <Lock style={{ width: 12, height: 12 }} />
          <span>Lock</span>
        </button>
      </div>

      {/* Admin Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Direct GitHub Repo Push Sync Button */}
        <button 
          onClick={handlePushToGithub}
          className="btn-mode"
          style={{ padding: '10px 12px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: '1px solid #10b981', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)' }}
        >
          <UploadCloud style={{ width: 16, height: 16 }} />
          <span>Push Changes Directly to Repo</span>
        </button>
        {/* 0. Connect Guests */}
        <button 
          onClick={() => setIsAddConnectionOpen(true)}
          className="btn-mode"
          style={{ padding: '10px 12px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: 800, cursor: 'pointer' }}
        >
          <Link2 style={{ width: 16, height: 16, color: '#38bdf8' }} />
          <span>+ Connect Two Guests</span>
        </button>

        {/* 1. Import 2-Table CSV */}
        <button 
          onClick={() => setIsBulkImportOpen(true)}
          className="btn-mode"
          style={{ padding: '10px 12px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.3) 0%, rgba(13, 148, 136, 0.3) 100%)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', fontWeight: 800, cursor: 'pointer' }}
        >
          <FileSpreadsheet style={{ width: 16, height: 16, color: '#38bdf8' }} />
          <span>Import 2-Table CSV Data</span>
        </button>

        {/* 1. Export CSV */}
        <button 
          onClick={handleExportCsv}
          className="btn-mode"
          style={{ padding: '10px 12px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', fontWeight: 700, cursor: 'pointer' }}
        >
          <FileSpreadsheet style={{ width: 16, height: 16 }} />
          <span>Export Guest List CSV</span>
        </button>

        {/* 2. Export Git JS */}
        <button 
          onClick={handleExportGitJs}
          className="btn-mode"
          style={{ padding: '10px 12px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: 700, cursor: 'pointer' }}
        >
          <Code style={{ width: 16, height: 16 }} />
          <span>Export Git sampleData.js</span>
        </button>

        {/* 3. Host Queue */}
        <button 
          onClick={() => setIsFeedbackQueueOpen(true)}
          className="btn-mode"
          style={{ padding: '10px 12px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: feedbackQueueCount > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)', color: feedbackQueueCount > 0 ? '#f87171' : '#cbd5e1', border: feedbackQueueCount > 0 ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)', fontWeight: 700, cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle style={{ width: 16, height: 16 }} />
            <span>Moderation Queue</span>
          </div>
          <span style={{ fontSize: 11, background: feedbackQueueCount > 0 ? '#ef4444' : 'rgba(255,255,255,0.2)', color: '#fff', padding: '2px 8px', borderRadius: 9999 }}>
            {feedbackQueueCount}
          </span>
        </button>

        {/* 4. Copy Deep Link */}
        <button 
          onClick={handleCopyQrLink}
          className="btn-mode"
          style={{ padding: '10px 12px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255, 255, 255, 0.08)', color: '#f8fafc', border: '1px solid rgba(255, 255, 255, 0.15)', fontWeight: 600, cursor: 'pointer' }}
        >
          <Copy style={{ width: 16, height: 16, color: '#38bdf8' }} />
          <span>Copy Host QR Link</span>
        </button>
      </div>
    </div>
  );
}
