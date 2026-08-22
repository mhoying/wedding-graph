import React, { useState, useRef, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Search, Sun, Moon, Printer, X, Sparkles, MapPin, Users, Heart } from 'lucide-react';
import { SAMPLE_NODES, SAMPLE_LINKS, COHORT_COLORS } from './data/sampleData';

export default function App() {
  const fgRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [isLightMode, setIsLightMode] = useState(false);

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

  // Handle Search Zooming
  const handleSearchSelect = (node) => {
    setSelectedNode(node);
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(3, 1000);
    }
  };

  // Node canvas drawing customizer for crisp sans-serif text and monogram fallbacks
  const drawNode = useCallback((node, ctx, globalScale) => {
    const isHovered = hoverNode === node || selectedNode === node;
    const isDimmed = (hoverNode || selectedNode) && !isHovered && 
                     !SAMPLE_LINKS.some(l => 
                       (l.source.id === node.id && (l.target.id === (hoverNode?.id || selectedNode?.id))) ||
                       (l.target.id === node.id && (l.source.id === (hoverNode?.id || selectedNode?.id)))
                     );

    const radius = node.type === 'ANCHOR' ? 14 : node.type === 'CONTEXT_HUB' ? 11 : 8;
    const color = COHORT_COLORS[node.cohort] || COHORT_COLORS.Default;

    ctx.save();
    ctx.globalAlpha = isDimmed ? 0.2 : 1.0;

    // Node Circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.shadowColor = isHovered ? color : 'transparent';
    ctx.shadowBlur = isHovered ? 15 : 0;
    ctx.fill();

    // Subtle White Border
    ctx.lineWidth = isHovered ? 2.5 : 1;
    ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
    ctx.stroke();

    // Monogram Initials Fallback if no image
    const initials = node.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const fontSize = radius * 0.9;
    ctx.font = `600 ${fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(initials, node.x, node.y);

    // Label Text under Node
    const labelFontSize = 11 / globalScale;
    if (globalScale > 1.2 || isHovered) {
      ctx.font = `${isHovered ? '600' : '400'} ${Math.max(labelFontSize, 3)}px Inter, sans-serif`;
      ctx.fillStyle = isLightMode ? '#0f172a' : '#f8fafc';
      ctx.fillText(node.name, node.x, node.y + radius + labelFontSize + 2);
    }

    ctx.restore();
  }, [hoverNode, selectedNode, isLightMode]);

  return (
    <div className={`w-full h-screen relative flex ${isLightMode ? 'light-mode' : ''}`}>
      {/* Search & Top Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center no-print">
        <div className="flex items-center space-x-3">
          <div className="glass-panel flex items-center px-4 py-2 w-72 md:w-96">
            <Search className="w-5 h-5 text-slate-400 mr-2" />
            <input 
              type="text"
              placeholder="Search guests, cohorts, or hobbies..."
              className="bg-transparent border-none outline-none text-sm w-full text-current placeholder-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X className="w-4 h-4 cursor-pointer text-slate-400" onClick={() => setSearchQuery('')} />
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsLightMode(!isLightMode)} 
            className="glass-panel p-2.5 rounded-full hover:bg-slate-700/50 transition cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => window.print()} 
            className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-2 text-sm font-medium hover:bg-slate-700/50 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
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
          onNodeClick={(node) => setSelectedNode(node)}
          onNodeHover={(node) => setHoverNode(node)}
          linkColor={() => isLightMode ? '#94a3b8' : '#334155'}
          linkWidth={1.5}
          linkDirectionalParticles={1}
          linkDirectionalParticleWidth={2}
          linkCanvasObjectMode={() => 'after'}
          linkCanvasObject={(link, ctx, globalScale) => {
            if (link.label && globalScale > 1.8) {
              const start = link.source;
              const end = link.target;
              const textPos = {
                x: start.x + (end.x - start.x) * 0.5,
                y: start.y + (end.y - start.y) * 0.5
              };
              ctx.font = `500 ${10 / globalScale}px Inter, sans-serif`;
              ctx.fillStyle = isLightMode ? '#475569' : '#94a3b8';
              ctx.textAlign = 'center';
              ctx.fillText(link.label, textPos.x, textPos.y);
            }
          }}
          backgroundColor={isLightMode ? '#f8fafc' : '#0f172a'}
        />
      </div>

      {/* Glassmorphism Metadata Drawer */}
      {selectedNode && (
        <div className="absolute right-6 top-20 bottom-6 w-80 md:w-96 glass-panel p-6 z-20 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right no-print">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span 
                className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: COHORT_COLORS[selectedNode.cohort] || COHORT_COLORS.Default }}
              >
                {selectedNode.cohort}
              </span>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-1 tracking-tight">{selectedNode.name}</h2>
            <p className="text-sm text-slate-400 mb-4">{selectedNode.relationship}</p>

            <div className="space-y-4 text-sm border-t border-slate-700/50 pt-4">
              {selectedNode.hometown && (
                <div className="flex items-center space-x-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{selectedNode.hometown}</span>
                </div>
              )}
              {selectedNode.familyStatus && (
                <div className="flex items-center space-x-2 text-slate-300">
                  <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{selectedNode.familyStatus}</span>
                </div>
              )}
              {selectedNode.icebreakers && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center space-x-2 font-medium text-slate-200">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Conversation Starters / Hobbies</span>
                  </div>
                  <p className="text-slate-300 pl-6 leading-relaxed bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/30">
                    {selectedNode.icebreakers}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
            <span>Click any node to inspect guest details</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
          </div>
        </div>
      )}
    </div>
  );
}
