import React, { useState } from 'react';
import { X, FileSpreadsheet, Upload, Download, Check, AlertCircle, RefreshCw, Link as LinkIcon } from 'lucide-react';
import Papa from 'papaparse';

export default function BulkCsvImportModal({
  isOpen,
  onClose,
  onApplyDataset,
  handleExportGitJs
}) {
  const [activeTab, setActiveTab] = useState('guests'); // 'guests' | 'relationships'
  const [guestsText, setGuestsText] = useState('');
  const [relationshipsText, setRelationshipsText] = useState('');
  const [parseStatus, setParseStatus] = useState(null); // null | { success: boolean, message: string, nodesCount: number, linksCount: number }
  const [includeAutoInferredEdges, setIncludeAutoInferredEdges] = useState(true);

  if (!isOpen) return null;

  const handleFileUpload = (e, target) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (target === 'guests') setGuestsText(event.target.result);
      else setRelationshipsText(event.target.result);
    };
    reader.readAsText(file);
  };

  const processDataset = () => {
    try {
      if (!guestsText.trim()) {
        setParseStatus({ success: false, message: 'Please paste or upload guests.csv data first!' });
        return;
      }

      // Parse Guests CSV
      const guestsParsed = Papa.parse(guestsText.trim(), { header: true, skipEmptyLines: true });
      if (guestsParsed.errors.length > 0 && !guestsParsed.data.length) {
        setParseStatus({ success: false, message: `Guests CSV Error: ${guestsParsed.errors[0].message}` });
        return;
      }

      // Format Nodes
      const nameToIdMap = new Map();
      const formattedNodes = guestsParsed.data.map((row, idx) => {
        const name = row.name || row.Name || `Guest ${idx + 1}`;
        const rawId = row.id || row.Id || name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        const hobbies = row.hobbies || row.Hobbies || '';
        const hobbiesList = typeof hobbies === 'string' ? hobbies.split(';').map(s => s.trim()).filter(Boolean) : [];

        const nodeObj = {
          id: rawId,
          name: name,
          type: (rawId === 'maureen' || rawId === 'matt') ? 'ANCHOR' : 'GUEST',
          cohort: row.cohort || row.Cohort || 'Friends',
          side: row.side || row.Side || 'Joint',
          relationship: row.relationship || row.Relationship || 'Guest',
          originallyFrom: row.originallyFrom || row.OriginallyFrom || 'USA',
          currentlyLivesIn: row.currentlyLivesIn || row.CurrentlyLivesIn || row.originallyFrom || 'USA',
          familyStatus: row.familyStatus || row.FamilyStatus || 'Single',
          hobbies: hobbiesList.length > 0 ? hobbiesList : ['Socializing']
        };

        nameToIdMap.set(name.toLowerCase(), rawId);
        nameToIdMap.set(rawId.toLowerCase(), rawId);
        return nodeObj;
      });

      // Parse Relationships CSV (Tuples)
      let explicitLinks = [];
      if (relationshipsText.trim()) {
        const relParsed = Papa.parse(relationshipsText.trim(), { header: true, skipEmptyLines: true });
        explicitLinks = relParsed.data.map(row => {
          const rawSource = row.source || row.Source || '';
          const rawTarget = row.target || row.Target || '';
          const relLabel = row.relationship || row.Relationship || row.label || row.Label || 'Connected';

          const sourceId = nameToIdMap.get(rawSource.toLowerCase()) || rawSource.toLowerCase().replace(/[^a-z0-9]+/g, '_');
          const targetId = nameToIdMap.get(rawTarget.toLowerCase()) || rawTarget.toLowerCase().replace(/[^a-z0-9]+/g, '_');

          return {
            source: sourceId,
            target: targetId,
            label: relLabel
          };
        }).filter(link => link.source && link.target);
      }

      // Auto-inferred Edges Engine (Optional)
      let finalLinks = [...explicitLinks];
      if (includeAutoInferredEdges) {
        const existingLinkKeys = new Set(explicitLinks.map(l => `${l.source}_${l.target}`));
        
        for (let i = 0; i < formattedNodes.length; i++) {
          for (let j = i + 1; j < formattedNodes.length; j++) {
            const n1 = formattedNodes[i];
            const n2 = formattedNodes[j];
            const key1 = `${n1.id}_${n2.id}`;
            const key2 = `${n2.id}_${n1.id}`;

            if (!existingLinkKeys.has(key1) && !existingLinkKeys.has(key2)) {
              let label = null;
              if (n1.cohort && n1.cohort === n2.cohort && n1.cohort !== 'The Couple') {
                label = `${n1.cohort} Cohort`;
              } else if (n1.originallyFrom && n1.originallyFrom === n2.originallyFrom) {
                label = `From ${n1.originallyFrom}`;
              } else if (n1.currentlyLivesIn && n1.currentlyLivesIn === n2.currentlyLivesIn) {
                label = `Lives in ${n1.currentlyLivesIn}`;
              }

              if (label) {
                finalLinks.push({ source: n1.id, target: n2.id, label });
                existingLinkKeys.add(key1);
              }
            }
          }
        }
      }

      // Apply live dataset
      onApplyDataset(formattedNodes, finalLinks);

      setParseStatus({
        success: true,
        message: `Successfully imported ${formattedNodes.length} guests & ${finalLinks.length} relationship edges!`,
        nodesCount: formattedNodes.length,
        linksCount: finalLinks.length
      });
    } catch (err) {
      setParseStatus({ success: false, message: `Parse Error: ${err.message}` });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-panel no-print" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680, width: '92vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileSpreadsheet style={{ width: 20, height: 20, color: '#38bdf8' }} />
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Bulk 2-Table CSV Importer (Guests & Relationships)
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Template Downloads Bar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, background: 'rgba(30, 41, 59, 0.6)', padding: 10, borderRadius: 12 }}>
          <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            Excel Templates:
          </span>
          <a 
            href="./guests_template.csv" 
            download="guests_template.csv"
            style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(56, 189, 248, 0.15)', padding: '4px 10px', borderRadius: 8 }}
          >
            <Download style={{ width: 12, height: 12 }} /> guests_template.csv
          </a>
          <a 
            href="./relationships_template.csv" 
            download="relationships_template.csv"
            style={{ fontSize: 11, color: '#34d399', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(52, 211, 153, 0.15)', padding: '4px 10px', borderRadius: 8 }}
          >
            <Download style={{ width: 12, height: 12 }} /> relationships_template.csv
          </a>
        </div>

        {/* Dual CSV Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <button 
            onClick={() => setActiveTab('guests')}
            className={`btn-mode ${activeTab === 'guests' ? 'active' : ''}`}
            style={{ flex: 1, padding: '8px', fontSize: 12, fontWeight: 700, borderRadius: 10 }}
          >
            Table 1: guests.csv ({guestsText ? 'Loaded' : 'Empty'})
          </button>
          <button 
            onClick={() => setActiveTab('relationships')}
            className={`btn-mode ${activeTab === 'relationships' ? 'active' : ''}`}
            style={{ flex: 1, padding: '8px', fontSize: 12, fontWeight: 700, borderRadius: 10 }}
          >
            Table 2: relationships.csv Tuples ({relationshipsText ? 'Loaded' : 'Empty'})
          </button>
        </div>

        {/* Tab 1: Guests CSV Textarea */}
        {activeTab === 'guests' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1' }}>
                Paste or Upload <code style={{ color: '#38bdf8' }}>guests.csv</code> Data:
              </label>
              <input 
                type="file" 
                accept=".csv" 
                onChange={(e) => handleFileUpload(e, 'guests')}
                style={{ fontSize: 11, color: '#94a3b8' }}
              />
            </div>
            <textarea 
              rows={8}
              placeholder="id,name,cohort,side,relationship,originallyFrom,currentlyLivesIn,familyStatus,hobbies..."
              value={guestsText}
              onChange={(e) => setGuestsText(e.target.value)}
              style={{ width: '100%', background: '#0f172a', color: '#f8fafc', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 12, padding: 10, fontFamily: 'monospace', fontSize: 11, outline: 'none', resize: 'vertical' }}
            />
          </div>
        )}

        {/* Tab 2: Relationships Tuples CSV Textarea */}
        {activeTab === 'relationships' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1' }}>
                Paste or Upload <code style={{ color: '#34d399' }}>relationships.csv</code> Tuples Data:
              </label>
              <input 
                type="file" 
                accept=".csv" 
                onChange={(e) => handleFileUpload(e, 'relationships')}
                style={{ fontSize: 11, color: '#94a3b8' }}
              />
            </div>
            <textarea 
              rows={8}
              placeholder="source,target,relationship&#10;Maureen,Matt,The Couple&#10;Matt,Uncle Bob,Family..."
              value={relationshipsText}
              onChange={(e) => setRelationshipsText(e.target.value)}
              style={{ width: '100%', background: '#0f172a', color: '#f8fafc', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 12, padding: 10, fontFamily: 'monospace', fontSize: 11, outline: 'none', resize: 'vertical' }}
            />
          </div>
        )}

        {/* Auto-Inferred Edges Checkbox */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0' }}>
          <input 
            type="checkbox"
            id="autoEdges"
            checked={includeAutoInferredEdges}
            onChange={(e) => setIncludeAutoInferredEdges(e.target.checked)}
            style={{ accentColor: '#38bdf8', width: 14, height: 14, cursor: 'pointer' }}
          />
          <label htmlFor="autoEdges" style={{ fontSize: 11, color: '#cbd5e1', cursor: 'pointer' }}>
            Auto-generate extra connection lines for guests who share Cohorts or Hometowns
          </label>
        </div>

        {/* Parse Status Notification Banner */}
        {parseStatus && (
          <div style={{ padding: '8px 12px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, background: parseStatus.success ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: parseStatus.success ? '1px solid #10b981' : '1px solid #ef4444', color: parseStatus.success ? '#34d399' : '#f87171' }}>
            {parseStatus.success ? <Check style={{ width: 16, height: 16 }} /> : <AlertCircle style={{ width: 16, height: 16 }} />}
            <span>{parseStatus.message}</span>
          </div>
        )}

        {/* Action Buttons Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
          <button 
            type="button" 
            onClick={onClose}
            style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.1)', color: '#cbd5e1', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={processDataset}
            style={{ padding: '8px 18px', borderRadius: 10, background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Upload style={{ width: 14, height: 14 }} /> Import 2-Table Dataset
          </button>
        </div>
      </div>
    </div>
  );
}
