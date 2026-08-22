import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3-force';
import { Search, Sun, Moon, Printer, X, Sparkles, MapPin, Users, Heart, Palette, Layers } from 'lucide-react';
import { SAMPLE_NODES, SAMPLE_LINKS, COHORT_COLORS, SIDE_COLORS, STATE_COLORS } from './data/sampleData';

export default function App() {
  const fgRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLightMode, setIsLightMode] = useState(false);
  const [colorMode, setColorMode] = useState('cohort'); // 'cohort' | 'side' | 'state'

  // Track mouse coordinates for hover tooltip positioning
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Configure D3 forces: Strict collision prevention & strong link distance
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      fg.d3Force('link').distance(l => l.source.type === 'ANCHOR' || l.target.type === 'ANCHOR' ? 180 : 130);
      fg.d3Force('charge').strength(-900).distanceMax(500);
      fg.d3Force('collide', d3.forceCollide().radius(node => node.type === 'ANCHOR' ? 52 : 40).iterations(4));
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
    // Default: Cohort
    return COHORT_COLORS[node.cohort] || COHORT_COLORS.Default;
  }, [colorMode]);

  // Filter nodes based on search
  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_NODES;
    return SAMPLE_NODES.filter(node => 
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.cohort.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (node.side && node.side.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (node.icebreakers && node.icebreakers.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const graphData = useMemo(() => {
    return {
      nodes: filteredNodes,
      links: SAMPLE_LINKS.filter(link => 
        filteredNodes.some(n => n.id === link.source || n.id === (link.source.id || link.source)) &&
        filteredNodes.some(n => n.id === link.target || n.id === (link.target.id || link.target))
      )
    };
  }, [filteredNodes]);

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

  // Active color map for legend
  const activeColorMap = useMemo(() => {
    if (colorMode === 'side') return SIDE_COLORS;
    if (colorMode === 'state') return STATE_COLORS;
    return COHORT_COLORS;
  }, [colorMode]);

  return (
    <div 
      className={`w-full h-screen relative flex bg-grid-pattern ${isLightMode ? 'light-mode' : ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Top Controls Bar */}
      <div className="absolute top-5 left-6 right-6 z-10 flex flex-wrap gap-3 justify-between items-center no-print">
        <div className="flex items-center space-x-3">
          <div className="glass-panel px-4 py-2.5 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-bold tracking-tight text-sm">Wedding Graph</span>
          </div>

          {/* Search Box */}
          <div className="glass-panel flex items-center px-4 py-2 w-64 md:w-80">
            <Search className="w-4 h-4 text-slate-400 mr-2.5" />
            <input 
              type="text"
              placeholder="Search guests, cohorts, or hobbies..."
              className="bg-transparent border-none outline-none text-xs md:text-sm w-full text-current placeholder-slate-400 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X className="w-4 h-4 cursor-pointer text-slate-400 hover:text-white" onClick={() => setSearchQuery('')} />
            )}
          </div>
        </div>

        {/* Dynamic Color Mode Selector Controls */}
        <div className="flex items-center space-x-3">
          <div className="glass-panel px-3 py-1.5 flex items-center space-x-2 text-xs font-semibold">
            <Palette className="w-4 h-4 text-sky-400" />
            <span className="text-slate-400 mr-1 hidden md:inline">Color By:</span>
            <button 
              onClick={() => setColorMode('cohort')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${colorMode === 'cohort' ? 'bg-sky-500 text-white' : 'hover:bg-slate-700/50 text-slate-300'}`}
            >
              Cohort
            </button>
            <button 
              onClick={() => setColorMode('side')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${colorMode === 'side' ? 'bg-sky-500 text-white' : 'hover:bg-slate-700/50 text-slate-300'}`}
            >
              Side (Matt/Maureen)
            </button>
            <button 
              onClick={() => setColorMode('state')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${colorMode === 'state' ? 'bg-sky-500 text-white' : 'hover:bg-slate-700/50 text-slate-300'}`}
            >
              State
            </button>
          </div>

          <button 
            onClick={() => setIsLightMode(!isLightMode)} 
            className="glass-panel p-2.5 rounded-xl hover:bg-slate-700/40 transition cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>
          <button 
            onClick={() => window.print()} 
            className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-2 text-xs md:text-sm font-semibold hover:bg-slate-700/40 transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-sky-400" />
            <span>Export Poster</span>
          </button>
        </div>
      </div>

      {/* Dynamic Color Legend Footer */}
      <div className="absolute bottom-5 left-6 z-10 glass-panel px-4 py-2 flex items-center space-x-4 text-xs no-print">
        <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Legend ({colorMode}):</span>
        <div className="flex items-center space-x-3 flex-wrap">
          {Object.entries(activeColorMap).map(([key, hex]) => (
            <div key={key} className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hex }} />
              <span className="font-medium text-slate-300">{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Force Graph Canvas */}
      <div className="flex-1 w-full h-full">
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeCanvasObject={drawNode}
          nodePointerAreaPaint={drawPointerArea}
          onNodeClick={(node) => setSelectedNode(node)}
          onNodeHover={(node) => setHoverNode(node)}
          linkColor={(link) => {
            const isHoveredLink = (hoverNode || selectedNode) && (
              (link.source.id || link.source) === (hoverNode?.id || selectedNode?.id) ||
              (link.target.id || link.target) === (hoverNode?.id || selectedNode?.id)
            );
            if (isHoveredLink) return '#38bdf8';
            return isLightMode ? 'rgba(148, 163, 184, 0.4)' : 'rgba(51, 65, 85, 0.5)';
          }}
          linkWidth={(link) => {
            const isHoveredLink = (hoverNode || selectedNode) && (
              (link.source.id || link.source) === (hoverNode?.id || selectedNode?.id) ||
              (link.target.id || link.target) === (hoverNode?.id || selectedNode?.id)
            );
            return isHoveredLink ? 3 : 1.5;
          }}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.004}
          linkDirectionalParticleWidth={2.5}
          linkDirectionalParticleColor={() => '#38bdf8'}
          backgroundColor="transparent"
        />
      </div>

      {/* Instant Hover Tooltip Popup Overlay (Follows Mouse) */}
      {hoverNode && !selectedNode && (
        <div 
          className="fixed pointer-events-none z-30 glass-panel p-3.5 w-64 shadow-2xl transition-opacity animate-in fade-in duration-150"
          style={{ 
            left: Math.min(mousePos.x + 15, window.innerWidth - 270), 
            top: Math.min(mousePos.y + 15, window.innerHeight - 180) 
          }}
        >
          <div className="flex justify-between items-center mb-1.5">
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: getNodeColor(hoverNode) }}
            >
              {hoverNode.cohort}
            </span>
            <span className="text-[10px] font-semibold text-slate-400">{hoverNode.side} Side</span>
          </div>
          <h4 className="font-bold text-sm text-current leading-tight">{hoverNode.name}</h4>
          <p className="text-xs text-slate-400 mb-2">{hoverNode.relationship}</p>
          {hoverNode.hometown && (
            <div className="flex items-center space-x-1.5 text-xs text-slate-300 mb-1">
              <MapPin className="w-3 h-3 text-sky-400" />
              <span>{hoverNode.hometown}</span>
            </div>
          )}
          {hoverNode.icebreakers && (
            <div className="text-[11px] text-amber-300/90 font-medium truncate mt-1">
              ✨ {hoverNode.icebreakers}
            </div>
          )}
        </div>
      )}

      {/* Glassmorphism Metadata Side Drawer Popup (On Click) */}
      {selectedNode && (
        <div className="absolute right-6 top-20 bottom-6 w-80 md:w-96 glass-panel p-6 z-20 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right no-print">
          <div>
            <div className="flex justify-between items-start mb-5">
              <span 
                className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm"
                style={{ backgroundColor: getNodeColor(selectedNode) }}
              >
                {selectedNode.cohort} • {selectedNode.side} Side
              </span>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white transition cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl font-extrabold mb-1 tracking-tight text-current">{selectedNode.name}</h2>
            <p className="text-sm font-medium text-slate-400 mb-5">{selectedNode.relationship}</p>

            <div className="space-y-4 text-sm border-t border-slate-700/50 pt-5">
              {selectedNode.hometown && (
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  </div>
                  <span className="font-medium text-current">{selectedNode.hometown}</span>
                </div>
              )}
              {selectedNode.familyStatus && (
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <span className="font-medium text-current">{selectedNode.familyStatus}</span>
                </div>
              )}
              {selectedNode.icebreakers && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2 font-semibold text-slate-200">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-current">Conversation Starters / Hobbies</span>
                  </div>
                  <p className="text-current leading-relaxed bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/40 text-xs md:text-sm font-normal">
                    {selectedNode.icebreakers}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center text-xs font-medium text-slate-400">
            <span>Guest Network Profile</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
          </div>
        </div>
      )}
    </div>
  );
}
