import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force-3d';
import { Search, Sun, Moon, Printer, X, Sparkles, MapPin, Users, Heart, Palette, Filter } from 'lucide-react';
import { SAMPLE_NODES, SAMPLE_LINKS, COHORT_COLORS, SIDE_COLORS, STATE_COLORS } from './data/sampleData';

export default function App() {
  const fgRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLightMode, setIsLightMode] = useState(false);
  const [colorMode, setColorMode] = useState('cohort'); // 'cohort' | 'side' | 'state'
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Dynamically extract all unique Interests across the dataset
  const allInterests = useMemo(() => {
    const set = new Set();
    SAMPLE_NODES.forEach(n => {
      if (n.hobbies && Array.isArray(n.hobbies)) {
        n.hobbies.forEach(h => set.add(h));
      }
    });
    return Array.from(set).sort();
  }, []);

  // Dynamically extract all unique Cohorts across the dataset
  const allCohorts = useMemo(() => {
    const set = new Set();
    SAMPLE_NODES.forEach(n => n.cohort && set.add(n.cohort));
    return Array.from(set).sort();
  }, []);

  // Dynamically extract all unique States/Locations across the dataset
  const allStates = useMemo(() => {
    const set = new Set();
    SAMPLE_NODES.forEach(n => n.state && set.add(n.state));
    return Array.from(set).sort();
  }, []);

  // Update canvas dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track mouse coordinates for hover tooltip positioning
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Configure D3 forces: Dynamic Label Collision & customized link distances
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      
      // Maureen & Matt sit closer inside their couple container (70px), while external links are further (160px)
      fg.d3Force('link').distance(l => {
        const s = l.source.id || l.source;
        const t = l.target.id || l.target;
        if ((s === 'maureen' && t === 'matt') || (s === 'matt' && t === 'maureen')) {
          return 70; // Shorter distance inside the Couple Enclosure
        }
        return l.source.type === 'ANCHOR' || l.target.type === 'ANCHOR' ? 170 : 130;
      });

      fg.d3Force('charge').strength(-1400).distanceMax(650);
      
      // Dynamic collision radius based on exact node label width
      fg.d3Force('collide', forceCollide().radius(node => {
        const charCount = node.name ? node.name.length : 10;
        const estimatedWidth = Math.max(charCount * 7.5 + 24, 70);
        return estimatedWidth / 2 + 14;
      }).iterations(6));

      fg.d3ReheatSimulation();
    }
  }, []);

  // Determine active node color based on selected Color Mode
  const getNodeColor = useCallback((node) => {
    if (colorMode === 'side') {
      return SIDE_COLORS[node.side] || SIDE_COLORS["Joint"];
    }
    if (colorMode === 'state') {
      return STATE_COLORS[node.state] || STATE_COLORS.Default;
    }
    return COHORT_COLORS[node.cohort] || COHORT_COLORS.Default;
  }, [colorMode]);

  // Filter nodes based on search and selected interest
  const filteredNodes = useMemo(() => {
    return SAMPLE_NODES.filter(node => {
      // Interest Tag Filter
      if (selectedInterest) {
        if (!node.hobbies || !node.hobbies.includes(selectedInterest)) return false;
      }
      // Text Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = node.name.toLowerCase().includes(q);
        const matchesCohort = node.cohort.toLowerCase().includes(q);
        const matchesSide = node.side && node.side.toLowerCase().includes(q);
        const matchesInterest = node.hobbies && node.hobbies.some(h => h.toLowerCase().includes(q));
        return matchesName || matchesCohort || matchesSide || matchesInterest;
      }
      return true;
    });
  }, [searchQuery, selectedInterest]);

  const graphData = useMemo(() => {
    return {
      nodes: filteredNodes,
      links: SAMPLE_LINKS.filter(link => 
        filteredNodes.some(n => n.id === link.source || n.id === (link.source.id || link.source)) &&
        filteredNodes.some(n => n.id === link.target || n.id === (link.target.id || link.target))
      )
    };
  }, [filteredNodes]);

  // Render background enclosure shape around Maureen & Matt couple nodes
  const drawBackgroundHulls = useCallback((ctx, globalScale) => {
    const maureen = filteredNodes.find(n => n.id === 'maureen');
    const matt = filteredNodes.find(n => n.id === 'matt');

    if (maureen && matt && maureen.x !== undefined && matt.x !== undefined) {
      const minX = Math.min(maureen.x, matt.x);
      const maxX = Math.max(maureen.x, matt.x);
      const minY = Math.min(maureen.y, matt.y);
      const maxY = Math.max(maureen.y, matt.y);

      const padding = 55 / globalScale;
      const width = (maxX - minX) + padding * 2;
      const height = (maxY - minY) + padding * 2;
      const x = minX - padding;
      const y = minY - padding;
      const cornerRadius = 32 / globalScale;

      ctx.save();
      // Hull Glow
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 18;

      // Hull Background Fill
      ctx.fillStyle = isLightMode ? 'rgba(224, 242, 254, 0.55)' : 'rgba(14, 165, 233, 0.08)';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, width, height, cornerRadius);
      } else {
        ctx.rect(x, y, width, height);
      }
      ctx.fill();

      // Hull Border
      ctx.lineWidth = 2 / globalScale;
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([6 / globalScale, 4 / globalScale]);
      ctx.stroke();

      // Enclosure Title Label
      ctx.shadowBlur = 0;
      ctx.setLineDash([]);
      ctx.font = `700 ${11 / globalScale}px Inter, sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText('THE COUPLE (MAUREEN & MATT)', minX + (maxX - minX) / 2, y - (8 / globalScale));

      ctx.restore();
    }
  }, [filteredNodes, isLightMode]);

  // Premium Node Canvas Renderer
  const drawNode = useCallback((node, ctx, globalScale) => {
    const isSelected = selectedNode?.id === node.id;
    const isHovered = hoverNode?.id === node.id || isSelected;

    const isConnected = hoverNode || selectedNode ? 
      SAMPLE_LINKS.some(l => 
        ((l.source.id || l.source) === node.id && ((l.target.id || l.target) === (hoverNode?.id || selectedNode?.id))) ||
        ((l.target.id || l.target) === node.id && ((l.source.id || l.source) === (hoverNode?.id || selectedNode?.id)))
      ) : false;

    const isDimmed = (hoverNode || selectedNode) && !isHovered && !isConnected;
    const color = getNodeColor(node);
    const isAnchor = node.type === 'ANCHOR';

    ctx.save();
    ctx.globalAlpha = isDimmed ? 0.15 : 1.0;

    // Font Configuration
    const fontSize = (isAnchor ? 13 : 11) / globalScale;
    ctx.font = `${isAnchor || isHovered ? '700' : '500'} ${fontSize}px Inter, sans-serif`;
    
    const textWidth = ctx.measureText(node.name).width;
    const paddingX = (isAnchor ? 14 : 10) / globalScale;
    const paddingY = (isAnchor ? 8 : 6) / globalScale;
    const badgeWidth = textWidth + paddingX * 2;
    const badgeHeight = fontSize + paddingY * 2;
    const cornerRadius = badgeHeight / 2;

    const x = node.x - badgeWidth / 2;
    const y = node.y - badgeHeight / 2;

    // Outer Glow for hovered/selected
    if (isHovered || isAnchor) {
      ctx.shadowColor = color;
      ctx.shadowBlur = isHovered ? 25 : 15;
    }

    // Pill Fill
    const gradient = ctx.createLinearGradient(x, y, x + badgeWidth, y + badgeHeight);
    if (isHovered) {
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color);
    } else if (isLightMode) {
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, '#f1f5f9');
    } else {
      gradient.addColorStop(0, 'rgba(30, 41, 59, 0.95)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
    }

    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, badgeWidth, badgeHeight, cornerRadius);
    } else {
      ctx.rect(x, y, badgeWidth, badgeHeight);
    }
    ctx.fillStyle = gradient;
    ctx.fill();

    // Border
    ctx.lineWidth = isHovered ? 2.5 : (isAnchor ? 2 : 1.2);
    ctx.strokeStyle = isHovered ? '#ffffff' : color;
    ctx.stroke();

    // Text Label
    ctx.shadowBlur = 0;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isHovered ? '#ffffff' : (isLightMode ? '#0f172a' : '#f8fafc');
    ctx.fillText(node.name, node.x, node.y);

    ctx.restore();
  }, [hoverNode, selectedNode, isLightMode, getNodeColor]);

  // Hit area detection
  const drawPointerArea = useCallback((node, color, ctx, globalScale) => {
    const isAnchor = node.type === 'ANCHOR';
    const fontSize = (isAnchor ? 13 : 11) / globalScale;
    ctx.font = `500 ${fontSize}px Inter, sans-serif`;
    const textWidth = ctx.measureText(node.name).width;
    const badgeWidth = textWidth + (24 / globalScale);
    const badgeHeight = fontSize + (14 / globalScale);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(node.x - badgeWidth / 2, node.y - badgeHeight / 2, badgeWidth, badgeHeight);
    ctx.fill();
  }, []);

  // Active color map dynamically generated for legend
  const activeColorMap = useMemo(() => {
    if (colorMode === 'side') return SIDE_COLORS;
    if (colorMode === 'state') return STATE_COLORS;
    return COHORT_COLORS;
  }, [colorMode]);

  return (
    <div 
      className={`app-container ${isLightMode ? 'light-mode' : ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Top Controls Bar */}
      <div className="top-bar no-print">
        <div className="top-bar-left flex-wrap">
          <div className="glass-panel brand-badge">
            <div className="pulse-dot" />
            <span>Wedding Graph</span>
          </div>

          {/* Search Box */}
          <div className="glass-panel search-box">
            <Search style={{ width: 16, height: 16, color: '#94a3b8', marginRight: 10 }} />
            <input 
              type="text"
              placeholder="Search guests, cohorts, or interests..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X style={{ width: 16, height: 16, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSearchQuery('')} />
            )}
          </div>

          {/* Dynamic Interest Filter Ribbon */}
          <div className="glass-panel color-mode-bar">
            <Filter style={{ width: 15, height: 15, color: '#10b981' }} />
            <span style={{ color: '#94a3b8', marginRight: 4 }}>Filter Interest:</span>
            {selectedInterest ? (
              <span className="btn-mode active" style={{ background: '#10b981', display: 'flex', items: 'center', gap: 6 }}>
                🏷️ {selectedInterest}
                <X style={{ width: 12, height: 12, cursor: 'pointer' }} onClick={() => setSelectedInterest(null)} />
              </span>
            ) : (
              <div style={{ display: 'flex', gap: 4, overflowX: 'auto', maxWidth: 360 }}>
                {allInterests.slice(0, 5).map(interest => (
                  <button 
                    key={interest}
                    onClick={() => setSelectedInterest(interest)}
                    className="btn-mode"
                    style={{ fontSize: 11, padding: '3px 8px' }}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Color Mode Selector Controls */}
        <div className="top-bar-right">
          <div className="glass-panel color-mode-bar">
            <Palette style={{ width: 16, height: 16, color: '#38bdf8' }} />
            <span style={{ color: '#94a3b8', marginRight: 4 }}>Color By:</span>
            <button 
              onClick={() => setColorMode('cohort')}
              className={`btn-mode ${colorMode === 'cohort' ? 'active' : ''}`}
            >
              Cohort ({allCohorts.length})
            </button>
            <button 
              onClick={() => setColorMode('side')}
              className={`btn-mode ${colorMode === 'side' ? 'active' : ''}`}
            >
              Side
            </button>
            <button 
              onClick={() => setColorMode('state')}
              className={`btn-mode ${colorMode === 'state' ? 'active' : ''}`}
            >
              State ({allStates.length})
            </button>
          </div>

          <button 
            onClick={() => setIsLightMode(!isLightMode)} 
            className="glass-panel btn-icon"
            title="Toggle Light/Dark Theme"
          >
            {isLightMode ? <Moon style={{ width: 18, height: 18 }} /> : <Sun style={{ width: 18, height: 18, color: '#38bdf8' }} />}
          </button>
          <button 
            onClick={() => window.print()} 
            className="glass-panel btn-action"
          >
            <Printer style={{ width: 16, height: 16, color: '#38bdf8' }} />
            <span>Export Poster</span>
          </button>
        </div>
      </div>

      {/* Dynamic Color Legend Footer */}
      <div className="glass-panel legend-bar no-print">
        <span style={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 10 }}>Legend ({colorMode}):</span>
        <div className="legend-items">
          {Object.entries(activeColorMap).map(([key, hex]) => (
            <div key={key} className="legend-item">
              <span className="legend-color" style={{ backgroundColor: hex }} />
              <span style={{ fontWeight: 500, color: '#cbd5e1' }}>{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Force Graph Canvas */}
      <div className="graph-container">
        <ForceGraph2D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeCanvasObject={drawNode}
          nodePointerAreaPaint={drawPointerArea}
          onNodeClick={(node) => setSelectedNode(node)}
          onNodeHover={(node) => setHoverNode(node)}
          onRenderFramePre={(ctx, globalScale) => drawBackgroundHulls(ctx, globalScale)}
          linkColor={(link) => {
            const isHoveredLink = (hoverNode || selectedNode) && (
              (link.source.id || link.source) === (hoverNode?.id || selectedNode?.id) ||
              (link.target.id || link.target) === (hoverNode?.id || selectedNode?.id)
            );
            if (isHoveredLink) return '#38bdf8';
            return isLightMode ? '#64748b' : '#94a3b8';
          }}
          linkWidth={(link) => {
            const isHoveredLink = (hoverNode || selectedNode) && (
              (link.source.id || link.source) === (hoverNode?.id || selectedNode?.id) ||
              (link.target.id || link.target) === (hoverNode?.id || selectedNode?.id)
            );
            return isHoveredLink ? 3.5 : 2;
          }}
          linkDirectionalParticles={0}
          backgroundColor="transparent"
        />
      </div>

      {/* Instant Hover Tooltip Popup Overlay */}
      {hoverNode && !selectedNode && (
        <div 
          className="glass-panel hover-tooltip"
          style={{ 
            left: Math.min(mousePos.x + 15, window.innerWidth - 280), 
            top: Math.min(mousePos.y + 15, window.innerHeight - 200) 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span 
              style={{ 
                fontSize: 10, 
                fontWeight: 700, 
                padding: '2px 8px', 
                borderRadius: 10, 
                color: '#fff',
                backgroundColor: getNodeColor(hoverNode) 
              }}
            >
              {hoverNode.cohort}
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8' }}>{hoverNode.side} Side</span>
          </div>
          <h4 style={{ fontWeight: 800, fontSize: 14, marginBottom: 2 }}>{hoverNode.name}</h4>
          <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>{hoverNode.relationship}</p>
          {hoverNode.hometown && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <MapPin style={{ width: 12, height: 12, color: '#38bdf8' }} />
              <span>{hoverNode.hometown}</span>
            </div>
          )}
          {hoverNode.hobbies && (
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
              {hoverNode.hobbies.map(h => (
                <span key={h} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontWeight: 600 }}>
                  🏷️ {h}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Glassmorphism Metadata Side Drawer Popup (On Click) */}
      {selectedNode && (
        <div className="glass-panel metadata-drawer no-print">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span 
                className="drawer-badge"
                style={{ backgroundColor: getNodeColor(selectedNode) }}
              >
                {selectedNode.cohort} • {selectedNode.side} Side
              </span>
              <button 
                onClick={() => setSelectedNode(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <h2 className="drawer-title">{selectedNode.name}</h2>
            <p className="drawer-subtitle">{selectedNode.relationship}</p>

            <div className="drawer-section">
              {selectedNode.hometown && (
                <div className="drawer-info-row">
                  <MapPin style={{ width: 16, height: 16, color: '#38bdf8' }} />
                  <span>{selectedNode.hometown}</span>
                </div>
              )}
              {selectedNode.familyStatus && (
                <div className="drawer-info-row">
                  <Users style={{ width: 16, height: 16, color: '#10b981' }} />
                  <span>{selectedNode.familyStatus}</span>
                </div>
              )}
              {selectedNode.hobbies && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                    <Sparkles style={{ width: 16, height: 16, color: '#10b981' }} />
                    <span>Click an Interest to Find Matches:</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selectedNode.hobbies.map(h => (
                      <button 
                        key={h}
                        onClick={() => {
                          setSelectedInterest(h);
                          setSelectedNode(null);
                        }}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: 8,
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          cursor: 'pointer'
                        }}
                      >
                        🏷️ {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8' }}>
            <span>Guest Network Profile</span>
            <Heart style={{ width: 16, height: 16, color: '#38bdf8' }} />
          </div>
        </div>
      )}
    </div>
  );
}
