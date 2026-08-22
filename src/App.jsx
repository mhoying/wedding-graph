import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Search, Sun, Moon, Printer, X, Sparkles, MapPin, Users, Heart } from 'lucide-react';
import { SAMPLE_NODES, SAMPLE_LINKS, COHORT_COLORS } from './data/sampleData';

export default function App() {
  const fgRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [isLightMode, setIsLightMode] = useState(false);

  // Configure D3 forces on mount to increase distance & prevent collisions
  useEffect(() => {
    if (fgRef.current) {
      // Increase link distance
      fgRef.current.d3Force('link').distance(130);
      // Increase repulsion between nodes
      fgRef.current.d3Force('charge').strength(-450);
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

  // Node Canvas Object Drawing with dynamic text fitting & pill shapes
  const drawNode = useCallback((node, ctx, globalScale) => {
    const isSelected = selectedNode?.id === node.id;
    const isHovered = hoverNode?.id === node.id || isSelected;
    
    // Check if node is connected to hover/selection
    const isConnected = hoverNode || selectedNode ? 
      SAMPLE_LINKS.some(l => 
        (l.source.id === node.id || l.source === node.id) && (l.target.id === (hoverNode?.id || selectedNode?.id) || l.target === (hoverNode?.id || selectedNode?.id)) ||
        (l.target.id === node.id || l.target === node.id) && (l.source.id === (hoverNode?.id || selectedNode?.id) || l.source === (hoverNode?.id || selectedNode?.id))
      ) : false;

    const isDimmed = (hoverNode || selectedNode) && !isHovered && !isConnected;

    const color = COHORT_COLORS[node.cohort] || COHORT_COLORS.Default;
    const fontSize = 12 / globalScale;
    ctx.font = `${isHovered ? '600' : '400'} ${fontSize}px Inter, sans-serif`;
    
    const textWidth = ctx.measureText(node.name).width;
    const paddingX = 10 / globalScale;
    const paddingY = 6 / globalScale;
    const badgeWidth = textWidth + paddingX * 2;
    const badgeHeight = fontSize + paddingY * 2;
    const cornerRadius = badgeHeight / 2;

    ctx.save();
    ctx.globalAlpha = isDimmed ? 0.15 : 1.0;

    // Node Pill Background
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(node.x - badgeWidth / 2, node.y - badgeHeight / 2, badgeWidth, badgeHeight, cornerRadius);
    } else {
      ctx.rect(node.x - badgeWidth / 2, node.y - badgeHeight / 2, badgeWidth, badgeHeight);
    }
    
    ctx.fillStyle = isLightMode ? (isHovered ? color : '#ffffff') : (isHovered ? color : 'rgba(15, 23, 42, 0.85)');
    ctx.shadowColor = isHovered ? color : 'transparent';
    ctx.shadowBlur = isHovered ? 12 : 0;
    ctx.fill();

    // Node Pill Border (Color-coded by Cohort)
    ctx.lineWidth = isHovered ? 2.5 : 1.5;
    ctx.strokeStyle = color;
    ctx.stroke();

    // Node Label Text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isHovered ? '#ffffff' : (isLightMode ? '#0f172a' : '#f8fafc');
    ctx.fillText(node.name, node.x, node.y);

    ctx.restore();
  }, [hoverNode, selectedNode, isLightMode]);

  // Pointer Area Paint for accurate click/hover hit detection
  const drawPointerArea = useCallback((node, color, ctx, globalScale) => {
    const fontSize = 12 / globalScale;
    ctx.font = `400 ${fontSize}px Inter, sans-serif`;
    const textWidth = ctx.measureText(node.name).width;
    const badgeWidth = textWidth + (20 / globalScale);
    const badgeHeight = fontSize + (12 / globalScale);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(node.x - badgeWidth / 2, node.y - badgeHeight / 2, badgeWidth, badgeHeight);
    ctx.fill();
  }, []);

  return (
    <div className={`w-full h-screen relative flex ${isLightMode ? 'light-mode' : ''}`}>
      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center no-print">
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
          nodePointerAreaPaint={drawPointerArea}
          onNodeClick={(node) => setSelectedNode(node)}
          onNodeHover={(node) => setHoverNode(node)}
          linkColor={() => isLightMode ? '#94a3b8' : '#334155'}
          linkWidth={1.8}
          linkDirectionalParticles={1}
          linkDirectionalParticleWidth={2}
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
              ctx.font = `500 ${fontSize}px Inter, sans-serif`;
              ctx.fillStyle = isLightMode ? '#475569' : '#94a3b8';
              ctx.textAlign = 'center';
              ctx.fillText(link.label, textPos.x, textPos.y);
            }
          }}
          backgroundColor={isLightMode ? '#f8fafc' : '#0f172a'}
        />
      </div>

      {/* Glassmorphism Metadata Sidebar Popup */}
      {selectedNode && (
        <div className="absolute right-6 top-20 bottom-6 w-80 md:w-96 glass-panel p-6 z-20 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right no-print">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span 
                className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: COHORT_COLORS[selectedNode.cohort] || COHORT_COLORS.Default }}
              >
                {selectedNode.cohort}
              </span>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-1 tracking-tight text-current">{selectedNode.name}</h2>
            <p className="text-sm text-slate-400 mb-4">{selectedNode.relationship}</p>

            <div className="space-y-4 text-sm border-t border-slate-700/50 pt-4">
              {selectedNode.hometown && (
                <div className="flex items-center space-x-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-current">{selectedNode.hometown}</span>
                </div>
              )}
              {selectedNode.familyStatus && (
                <div className="flex items-center space-x-2 text-slate-300">
                  <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-current">{selectedNode.familyStatus}</span>
                </div>
              )}
              {selectedNode.icebreakers && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center space-x-2 font-medium text-slate-200">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-current">Conversation Starters / Hobbies</span>
                  </div>
                  <p className="text-current pl-4 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-700/30 text-xs md:text-sm">
                    {selectedNode.icebreakers}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
            <span>Guest Profile Details</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
          </div>
        </div>
      )}
    </div>
  );
}
