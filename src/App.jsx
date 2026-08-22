import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3-force';
import { Search, Sun, Moon, Printer, X, Sparkles, MapPin, Users, Heart, Share2 } from 'lucide-react';
import { SAMPLE_NODES, SAMPLE_LINKS, COHORT_COLORS } from './data/sampleData';

export default function App() {
  const fgRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [isLightMode, setIsLightMode] = useState(false);

  // Configure D3 forces: Strict collision prevention & strong link distance
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      
      // 1. Set strong link distance
      fg.d3Force('link').distance(l => l.source.type === 'ANCHOR' || l.target.type === 'ANCHOR' ? 180 : 130);

      // 2. Strong node repulsion (charge)
      fg.d3Force('charge').strength(-900).distanceMax(500);

      // 3. Strict Collision Force based on node pill size to GUARANTEE zero overlap!
      fg.d3Force('collide', d3.forceCollide().radius(node => {
        const isAnchor = node.type === 'ANCHOR';
        return isAnchor ? 50 : 38;
      }).iterations(4));

      // Re-heat simulation
      fg.d3ReheatSimulation();
    }
  }, []);

  // Filter nodes based on search
  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_NODES;
    return SAMPLE_NODES.filter(node => 
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.cohort.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

    // Determine connection to hover/select target
    const isConnected = hoverNode || selectedNode ? 
      SAMPLE_LINKS.some(l => 
        ((l.source.id || l.source) === node.id && ((l.target.id || l.target) === (hoverNode?.id || selectedNode?.id))) ||
        ((l.target.id || l.target) === node.id && ((l.source.id || l.source) === (hoverNode?.id || selectedNode?.id)))
      ) : false;

    const isDimmed = (hoverNode || selectedNode) && !isHovered && !isConnected;
    const color = COHORT_COLORS[node.cohort] || COHORT_COLORS.Default;
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

    // Outer Glow / Aura for hovered/selected or anchor nodes
    if (isHovered || isAnchor) {
      ctx.shadowColor = color;
      ctx.shadowBlur = isHovered ? 25 : 15;
    }

    // Pill Background Fill (Linear Gradient)
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

    // Subtle Pill Border
    ctx.lineWidth = isHovered ? 2.5 : (isAnchor ? 2 : 1.2);
    ctx.strokeStyle = isHovered ? '#ffffff' : color;
    ctx.stroke();

    // Text Label inside Pill
    ctx.shadowBlur = 0; // Turn off glow for crisp text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isHovered ? '#ffffff' : (isLightMode ? '#0f172a' : '#f8fafc');
    ctx.fillText(node.name, node.x, node.y);

    ctx.restore();
  }, [hoverNode, selectedNode, isLightMode]);

  // Pointer Area Paint for accurate hit detection
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

  return (
    <div className={`w-full h-screen relative flex bg-grid-pattern ${isLightMode ? 'light-mode' : ''}`}>
      {/* Top Header / Bar */}
      <div className="absolute top-5 left-6 right-6 z-10 flex justify-between items-center no-print">
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2.5 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-bold tracking-tight text-sm">Wedding Network Graph</span>
          </div>

          <div className="glass-panel flex items-center px-4 py-2 w-72 md:w-96">
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

        <div className="flex items-center space-x-3">
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
            if (isHoveredLink) return '#38bdf8'; // Sky Blue glow on hover
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
          linkCanvasObjectMode={() => 'after'}
          linkCanvasObject={(link, ctx, globalScale) => {
            if (link.label && globalScale > 1.2) {
              const start = link.source;
              const end = link.target;
              if (!start.x || !end.x) return;
              
              const textPos = {
                x: start.x + (end.x - start.x) * 0.5,
                y: start.y + (end.y - start.y) * 0.5
              };
              const fontSize = 10 / globalScale;
              ctx.font = `600 ${fontSize}px Inter, sans-serif`;
              ctx.fillStyle = isLightMode ? '#475569' : '#94a3b8';
              ctx.textAlign = 'center';
              ctx.fillText(link.label, textPos.x, textPos.y);
            }
          }}
          backgroundColor="transparent"
        />
      </div>

      {/* Glassmorphism Metadata Sidebar Popup */}
      {selectedNode && (
        <div className="absolute right-6 top-20 bottom-6 w-80 md:w-96 glass-panel p-6 z-20 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right no-print">
          <div>
            <div className="flex justify-between items-start mb-5">
              <span 
                className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm"
                style={{ backgroundColor: COHORT_COLORS[selectedNode.cohort] || COHORT_COLORS.Default }}
              >
                {selectedNode.cohort}
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
