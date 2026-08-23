import React, { useState, useMemo } from 'react';
import { Palette, ChevronUp, ChevronDown } from 'lucide-react';
import { SIDE_COLORS } from '../data/sampleData';

export default function DynamicColorLegend({
  colorMode = 'cohort',
  filteredNodes = [],
  getNodeColor,
  isMobileViewport = false,
  isLightMode = false,
  selectedNode = null,
  isMobileControlsOpen = false
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Compute dynamic color items based on active nodes and current colorMode
  const legendItems = useMemo(() => {
    if (!filteredNodes || filteredNodes.length === 0) return [];

    const itemMap = new Map();

    if (colorMode === 'side') {
      itemMap.set('Maureen Side', SIDE_COLORS['Maureen'] || '#ec4899');
      itemMap.set('Matt Side', SIDE_COLORS['Matt'] || '#3b82f6');
      itemMap.set('Joint Friends', SIDE_COLORS['Joint'] || '#10b981');
    } else if (colorMode === 'locations' || colorMode === 'current_location' || colorMode === 'original_location') {
      filteredNodes.forEach(node => {
        if (!node || node.type === 'CONTEXT_HUB') return;
        let loc = 'Default';
        if (colorMode === 'current_location') {
          loc = node.currentlyLivesIn || node.state || 'Unknown';
        } else if (colorMode === 'original_location') {
          loc = node.originallyFrom || node.hometown || 'Unknown';
        } else {
          loc = node.currentlyLivesIn || node.originallyFrom || node.state || node.hometown || 'Unknown';
        }

        if (loc && !itemMap.has(loc) && !loc.toLowerCase().includes('family')) {
          const color = getNodeColor ? getNodeColor(node) : '#38bdf8';
          itemMap.set(loc, color);
        }
      });
    } else {
      // Default: Cohorts (Only render true social cohorts, strictly exclude all family groups)
      const validCohorts = new Set(['Cornell', 'Google', 'Stanford', 'Lehigh', 'Dog Park', 'OWFL Blog', 'Bay FC', 'The Couple']);
      filteredNodes.forEach(node => {
        if (!node || node.type === 'CONTEXT_HUB') return;
        const cohort = node.cohort;
        if (
          cohort && 
          validCohorts.has(cohort) && 
          !itemMap.has(cohort)
        ) {
          const color = getNodeColor ? getNodeColor(node) : '#38bdf8';
          itemMap.set(cohort, color);
        }
      });
    }

    return Array.from(itemMap.entries()).map(([label, color]) => ({ label, color }));
  }, [colorMode, filteredNodes, getNodeColor]);

  // Hide completely when Map Controls Sheet is open OR on mobile when profile drawer is open!
  if (isMobileControlsOpen) return null;
  if (isMobileViewport && selectedNode) return null;
  if (legendItems.length === 0) return null;

  const modeTitle = colorMode === 'side' ? 'Side Colors' :
                    colorMode === 'current_location' ? 'Current Locations' :
                    colorMode === 'original_location' ? 'Hometowns' :
                    colorMode === 'locations' ? 'Locations' : 'Cohorts';

  return (
    <div 
      className="no-print"
      style={{
        position: 'fixed',
        left: isMobileViewport ? '12px' : '20px',
        bottom: isMobileViewport ? '72px' : '20px', // Raised on mobile to avoid Map Controls FAB button at bottom: 16px!
        zIndex: 8500, // Below drawer (9000) & modal (9500), but well above canvas (10)
        maxWidth: isMobileViewport ? 'calc(100vw - 150px)' : '420px',
        background: isLightMode ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.90)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: isLightMode ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '14px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Legend Header */}
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '8px 12px',
          cursor: 'pointer',
          userSelect: 'none',
          background: isLightMode ? 'rgba(241, 245, 249, 0.8)' : 'rgba(30, 41, 59, 0.6)',
          borderBottom: !isCollapsed ? (isLightMode ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)') : 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Palette style={{ width: 14, height: 14, color: '#38bdf8' }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: isLightMode ? '#0f172a' : '#f8fafc', letterSpacing: '0.02em' }}>
            Legend ({modeTitle})
          </span>
        </div>
        <button 
          style={{
            background: 'none',
            border: 'none',
            color: isLightMode ? '#64748b' : '#94a3b8',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isCollapsed ? <ChevronUp style={{ width: 14, height: 14 }} /> : <ChevronDown style={{ width: 14, height: 14 }} />}
        </button>
      </div>

      {/* Legend Items Grid */}
      {!isCollapsed && (
        <div 
          style={{
            padding: '8px 12px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 12px',
            maxHeight: '130px',
            overflowY: 'auto',
            scrollbarWidth: 'thin'
          }}
        >
          {legendItems.map(({ label, color }) => (
            <div 
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                fontWeight: 600,
                color: isLightMode ? '#334155' : '#cbd5e1'
              }}
            >
              <span 
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: color,
                  boxShadow: `0 0 6px ${color}80`,
                  flexShrink: 0
                }}
              />
              <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
