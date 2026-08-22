import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force-3d';
import Papa from 'papaparse';
import { z } from 'zod';
import { Search, Sun, Moon, Printer, X, Sparkles, MapPin, Users, Heart, Palette, Filter, Compass, Layers, GitCommit, Ghost, Landmark, Download, Upload, CheckCircle2, AlertCircle, RefreshCw, Wand2, Star } from 'lucide-react';
import { SAMPLE_NODES, SAMPLE_LINKS, COHORT_COLORS, SIDE_COLORS, STATE_COLORS } from './data/sampleData';

// Zod Schema for CSV / Dataset Validation
const NodeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(['ANCHOR', 'GUEST', 'CONTEXT_HUB', 'NON_ATTENDING']).default('GUEST'),
  cohort: z.string().default('General'),
  side: z.enum(['Maureen', 'Matt', 'Joint']).default('Joint'),
  state: z.string().optional().default(''),
  hometown: z.string().optional().default(''),
  hobbies: z.array(z.string()).default([]),
  familyStatus: z.string().optional().default('Solo'),
  relationship: z.string().optional().default('')
});

export default function App() {
  const fgRef = useRef();
  const [nodes, setNodes] = useState(SAMPLE_NODES);
  const [links, setLinks] = useState(SAMPLE_LINKS);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLightMode, setIsLightMode] = useState(false);
  const [colorMode, setColorMode] = useState('cohort'); // 'cohort' | 'side' | 'state'
  const [showCohortHulls, setShowCohortHulls] = useState(true);
  const [isConstellationMode, setIsConstellationMode] = useState(false);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Path Finder State
  const [isPathMode, setIsPathMode] = useState(false);
  const [pathStart, setPathStart] = useState(null);
  const [pathEnd, setPathEnd] = useState(null);

  // Matchmaker Mode State
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);
  const [myGuestId, setMyGuestId] = useState('');

  // CSV Import Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [sheetUrl, setSheetUrl] = useState('');
  const [importStatus, setImportStatus] = useState(null);

  // Dynamically extract all unique Interests across the dataset
  const allInterests = useMemo(() => {
    const set = new Set();
    nodes.forEach(n => {
      if (n.hobbies && Array.isArray(n.hobbies)) {
        n.hobbies.forEach(h => set.add(h));
      }
    });
    return Array.from(set).sort();
  }, [nodes]);

  // Dynamically extract all unique Cohorts across the dataset
  const allCohorts = useMemo(() => {
    const set = new Set();
    nodes.forEach(n => n.cohort && set.add(n.cohort));
    return Array.from(set).sort();
  }, [nodes]);

  // Dynamically extract all unique States/Locations across the dataset
  const allStates = useMemo(() => {
    const set = new Set();
    nodes.forEach(n => n.state && set.add(n.state));
    return Array.from(set).sort();
  }, [nodes]);

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

  // Smooth Camera Fly-To Animation Helper
  const flyToNode = useCallback((node) => {
    if (fgRef.current && node && node.x !== undefined && node.y !== undefined) {
      fgRef.current.centerAt(node.x, node.y, 900);
      fgRef.current.zoom(2.6, 900);
    }
  }, []);

  // Configure D3 forces: Generalized Couple Distance & Dynamic Collision
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      
      fg.d3Force('link').distance(l => {
        const s = l.source.id || l.source;
        const t = l.target.id || l.target;
        const isCoupleLink = l.type === 'COUPLE' || l.label === 'Married' || l.label === 'Partner' || 
                             (s === 'maureen' && t === 'matt') || (s === 'matt' && t === 'maureen');
        if (isCoupleLink) {
          return 45;
        }
        return l.source.type === 'ANCHOR' || l.target.type === 'ANCHOR' ? 170 : 130;
      });

      fg.d3Force('charge').strength(-1400).distanceMax(650);
      
      fg.d3Force('collide', forceCollide().radius(node => {
        const nameStr = node.type === 'NON_ATTENDING' ? `${node.name} (Not Attending)` : (node.type === 'CONTEXT_HUB' ? `📍 ${node.name}` : node.name);
        const charCount = nameStr ? nameStr.length : 10;
        const estimatedWidth = Math.max(charCount * 7.5 + 24, 70);
        return estimatedWidth / 2 + 10;
      }).iterations(6));

      fg.d3ReheatSimulation();
    }
  }, [nodes, links]);

  // Calculate shortest social path between pathStart and pathEnd using BFS
  const shortestPath = useMemo(() => {
    if (!pathStart || !pathEnd || pathStart.id === pathEnd.id) return [];
    
    const queue = [[pathStart.id]];
    const visited = new Set([pathStart.id]);

    while (queue.length > 0) {
      const path = queue.shift();
      const curr = path[path.length - 1];

      if (curr === pathEnd.id) {
        return path;
      }

      const neighbors = [];
      links.forEach(l => {
        const s = l.source.id || l.source;
        const t = l.target.id || l.target;
        if (s === curr && !visited.has(t)) neighbors.push(t);
        if (t === curr && !visited.has(s)) neighbors.push(s);
      });

      for (const neighbor of neighbors) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
    return [];
  }, [pathStart, pathEnd, links]);

  // Matchmaker Algorithm: Find Top 3 Matches for selected myGuestId
  const matchmakerResults = useMemo(() => {
    if (!myGuestId) return [];
    const myNode = nodes.find(n => n.id === myGuestId);
    if (!myNode || !myNode.hobbies) return [];

    const myHobbies = new Set(myNode.hobbies);
    const results = [];

    nodes.forEach(n => {
      if (n.id === myGuestId || n.type === 'ANCHOR' || n.type === 'CONTEXT_HUB') return;
      if (!n.hobbies) return;

      // Intersection of interests
      const sharedInterests = n.hobbies.filter(h => myHobbies.has(h));
      const sharedHometown = myNode.hometown && n.hometown && (myNode.hometown === n.hometown || myNode.state === n.state);

      if (sharedInterests.length > 0 || sharedHometown) {
        let score = sharedInterests.length * 30 + (sharedHometown ? 20 : 0);
        results.push({
          node: n,
          score: Math.min(score + 25, 98),
          sharedInterests,
          sharedHometown
        });
      }
    });

    return results.sort((a, b) => b.score - a.score).slice(0, 3);
  }, [myGuestId, nodes]);

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
    return nodes.filter(node => {
      if (selectedInterest) {
        if (!node.hobbies || !node.hobbies.includes(selectedInterest)) return false;
      }
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
  }, [nodes, searchQuery, selectedInterest]);

  const graphData = useMemo(() => {
    return {
      nodes: filteredNodes,
      links: links.filter(link => 
        filteredNodes.some(n => n.id === link.source || n.id === (link.source.id || link.source)) &&
        filteredNodes.some(n => n.id === link.target || n.id === (link.target.id || link.target))
      )
    };
  }, [filteredNodes, links]);

  // Handle Node Clicks
  const handleNodeClick = (node) => {
    flyToNode(node);
    if (isPathMode) {
      if (!pathStart) {
        setPathStart(node);
      } else if (!pathEnd && node.id !== pathStart.id) {
        setPathEnd(node);
      } else {
        setPathStart(node);
        setPathEnd(null);
      }
    } else {
      setSelectedNode(node);
    }
  };

  // Google Sheets CSV Import Parser (PapaParse + Zod)
  const handleImportCsv = () => {
    if (!sheetUrl.trim()) return;
    setImportStatus({ type: 'loading', message: 'Fetching and parsing CSV data...' });

    Papa.parse(sheetUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsedNodes = [];
          const parsedLinks = [];
          const nameToIdMap = {};

          results.data.forEach((row, index) => {
            const rawId = row.ID || row.id || `node_${index}`;
            const rawName = row.Name || row.name || `Guest ${index}`;
            const rawCohort = row.Cohort || row.cohort || 'General';
            const rawSide = row.Side || row.side || 'Joint';
            const rawHobbies = row.Interests || row.Hobbies || row.hobbies || '';

            const hobbiesArr = typeof rawHobbies === 'string' ? rawHobbies.split(',').map(x => x.trim()).filter(Boolean) : [];

            const nodeObj = {
              id: rawId.trim(),
              name: rawName.trim(),
              type: row.Type || 'GUEST',
              cohort: rawCohort.trim(),
              side: rawSide.trim(),
              state: row.State || '',
              hometown: row.Hometown || '',
              hobbies: hobbiesArr,
              familyStatus: row.FamilyStatus || 'Solo',
              relationship: row.Relationship || ''
            };

            const validated = NodeSchema.parse(nodeObj);
            parsedNodes.push(validated);
            nameToIdMap[validated.name.toLowerCase()] = validated.id;
          });

          setNodes(parsedNodes);
          setImportStatus({ type: 'success', message: `Successfully loaded ${parsedNodes.length} nodes!` });
          setTimeout(() => setIsImportModalOpen(false), 1200);
        } catch (err) {
          setImportStatus({ type: 'error', message: `Schema Validation Error: ${err.message}` });
        }
      },
      error: (err) => {
        setImportStatus({ type: 'error', message: `Failed to fetch CSV: ${err.message}` });
      }
    });
  };

  // Render background enclosure shapes & twinkling constellation stars
  const drawBackgroundHulls = useCallback((ctx, globalScale) => {
    // Starry Night Background (Constellation Mode)
    if (isConstellationMode) {
      ctx.save();
      ctx.fillStyle = isLightMode ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 45; i++) {
        const starX = (Math.sin(i * 99) * 0.5 + 0.5) * dimensions.width - dimensions.width / 2;
        const starY = (Math.cos(i * 33) * 0.5 + 0.5) * dimensions.height - dimensions.height / 2;
        ctx.beginPath();
        ctx.arc(starX, starY, (i % 3 + 1) / globalScale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 1. Couple Enclosure Hull around Maureen & Matt
    const maureen = filteredNodes.find(n => n.id === 'maureen');
    const matt = filteredNodes.find(n => n.id === 'matt');

    if (maureen && matt && maureen.x !== undefined && matt.x !== undefined) {
      const minX = Math.min(maureen.x, matt.x);
      const maxX = Math.max(maureen.x, matt.x);
      const minY = Math.min(maureen.y, matt.y);
      const maxY = Math.max(maureen.y, matt.y);

      const padding = 45 / globalScale;
      const width = (maxX - minX) + padding * 2;
      const height = (maxY - minY) + padding * 2;
      const x = minX - padding;
      const y = minY - padding;
      const cornerRadius = 28 / globalScale;

      ctx.save();
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.fillStyle = isLightMode ? 'rgba(224, 242, 254, 0.55)' : 'rgba(14, 165, 233, 0.08)';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, width, height, cornerRadius);
      } else {
        ctx.rect(x, y, width, height);
      }
      ctx.fill();
      ctx.lineWidth = 2 / globalScale;
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([6 / globalScale, 4 / globalScale]);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.setLineDash([]);
      ctx.font = `700 ${11 / globalScale}px Inter, sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText('THE COUPLE (MAUREEN & MATT)', minX + (maxX - minX) / 2, y - (8 / globalScale));
      ctx.restore();
    }

    // 2. Cohort Cluster Hulls (if enabled)
    if (showCohortHulls) {
      const cohortGroups = {};
      filteredNodes.forEach(node => {
        if (node.cohort && node.cohort !== 'The Couple' && node.x !== undefined) {
          if (!cohortGroups[node.cohort]) cohortGroups[node.cohort] = [];
          cohortGroups[node.cohort].push(node);
        }
      });

      Object.entries(cohortGroups).forEach(([cohort, nodesArr]) => {
        if (nodesArr.length > 1) {
          let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
          nodesArr.forEach(n => {
            if (n.x < minX) minX = n.x;
            if (n.x > maxX) maxX = n.x;
            if (n.y < minY) minY = n.y;
            if (n.y > maxY) maxY = n.y;
          });

          const pad = 35 / globalScale;
          const w = (maxX - minX) + pad * 2;
          const h = (maxY - minY) + pad * 2;
          const x = minX - pad;
          const y = minY - pad;
          const cohortColor = COHORT_COLORS[cohort] || '#64748b';

          ctx.save();
          ctx.fillStyle = isLightMode ? 'rgba(241, 245, 249, 0.4)' : 'rgba(30, 41, 59, 0.25)';
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, y, w, h, 20 / globalScale);
          } else {
            ctx.rect(x, y, w, h);
          }
          ctx.fill();

          ctx.lineWidth = 1 / globalScale;
          ctx.strokeStyle = cohortColor;
          ctx.setLineDash([4 / globalScale, 4 / globalScale]);
          ctx.stroke();

          ctx.setLineDash([]);
          ctx.font = `600 ${10 / globalScale}px Inter, sans-serif`;
          ctx.fillStyle = cohortColor;
          ctx.textAlign = 'left';
          ctx.fillText(cohort.toUpperCase() + ' CLUSTER', x + 10 / globalScale, y + 14 / globalScale);
          ctx.restore();
        }
      });
    }
  }, [filteredNodes, isLightMode, showCohortHulls, isConstellationMode, dimensions]);

  // Premium Node Canvas Renderer
  const drawNode = useCallback((node, ctx, globalScale) => {
    const isSelected = selectedNode?.id === node.id;
    const isHovered = hoverNode?.id === node.id || isSelected;

    const isPathNode = shortestPath.includes(node.id);
    const isPathActive = shortestPath.length > 0;

    const isConnected = hoverNode || selectedNode ? 
      links.some(l => 
        ((l.source.id || l.source) === node.id && ((l.target.id || l.target) === (hoverNode?.id || selectedNode?.id))) ||
        ((l.target.id || l.target) === node.id && ((l.source.id || l.source) === (hoverNode?.id || selectedNode?.id)))
      ) : false;

    const isDimmed = isPathActive ? !isPathNode : ((hoverNode || selectedNode) && !isHovered && !isConnected);
    const color = isPathNode ? '#38bdf8' : getNodeColor(node);
    const isAnchor = node.type === 'ANCHOR';
    const isHub = node.type === 'CONTEXT_HUB';
    const isNonAttending = node.type === 'NON_ATTENDING';

    let labelText = node.name;
    if (isHub) labelText = `📍 ${node.name}`;
    if (isNonAttending) labelText = `${node.name} (Not Attending)`;

    ctx.save();
    ctx.globalAlpha = isDimmed ? (isConstellationMode ? 0.05 : 0.12) : (isNonAttending ? 0.75 : 1.0);

    const fontSize = (isAnchor ? 13 : 11) / globalScale;
    ctx.font = `${isAnchor || isHovered || isPathNode ? '700' : '500'} ${fontSize}px Inter, sans-serif`;
    
    const textWidth = ctx.measureText(labelText).width;
    const paddingX = (isAnchor ? 14 : 10) / globalScale;
    const paddingY = (isAnchor ? 8 : 6) / globalScale;
    const badgeWidth = textWidth + paddingX * 2;
    const badgeHeight = fontSize + paddingY * 2;
    const cornerRadius = isHub ? 4 / globalScale : badgeHeight / 2;

    const x = node.x - badgeWidth / 2;
    const y = node.y - badgeHeight / 2;

    if (isHovered || isAnchor || isPathNode) {
      ctx.shadowColor = color;
      ctx.shadowBlur = isHovered ? 25 : (isPathNode ? 20 : 15);
    }

    const gradient = ctx.createLinearGradient(x, y, x + badgeWidth, y + badgeHeight);
    if (isHovered || isPathNode) {
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color);
    } else if (isNonAttending) {
      gradient.addColorStop(0, 'rgba(30, 41, 59, 0.45)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.45)');
    } else if (isHub) {
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      gradient.addColorStop(1, 'rgba(14, 116, 144, 0.95)');
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

    ctx.lineWidth = isHovered || isPathNode ? 2.5 : (isAnchor ? 2 : 1.5);
    ctx.strokeStyle = isHovered || isPathNode ? '#ffffff' : color;
    
    if (isNonAttending) {
      ctx.setLineDash([4 / globalScale, 3 / globalScale]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isHovered || isPathNode ? '#ffffff' : (isNonAttending ? '#94a3b8' : (isLightMode ? '#0f172a' : '#f8fafc'));
    ctx.fillText(labelText, node.x, node.y);

    ctx.restore();
  }, [hoverNode, selectedNode, isLightMode, getNodeColor, shortestPath, isConstellationMode, links]);

  // Hit area detection
  const drawPointerArea = useCallback((node, color, ctx, globalScale) => {
    const isAnchor = node.type === 'ANCHOR';
    const fontSize = (isAnchor ? 13 : 11) / globalScale;
    ctx.font = `500 ${fontSize}px Inter, sans-serif`;
    const labelStr = node.type === 'NON_ATTENDING' ? `${node.name} (Not Attending)` : (node.type === 'CONTEXT_HUB' ? `📍 ${node.name}` : node.name);
    const textWidth = ctx.measureText(labelStr).width;
    const badgeWidth = textWidth + (24 / globalScale);
    const badgeHeight = fontSize + (14 / globalScale);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(node.x - badgeWidth / 2, node.y - badgeHeight / 2, badgeWidth, badgeHeight);
    ctx.fill();
  }, []);

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
      {/* Print Poster Header Banner */}
      <div className="print-poster-header">
        <h1>THE SOCIAL UNIVERSE OF MAUREEN & MATT</h1>
        <p>A Visual Map of Family, Friends & Connections</p>
      </div>

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
              <span className="btn-mode active" style={{ background: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                🏷️ {selectedInterest}
                <X style={{ width: 12, height: 12, cursor: 'pointer' }} onClick={() => setSelectedInterest(null)} />
              </span>
            ) : (
              <div style={{ display: 'flex', gap: 4, overflowX: 'auto', maxWidth: 280 }}>
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

        {/* Dynamic Controls Bar */}
        <div className="top-bar-right">
          {/* Import Data Modal Trigger */}
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="glass-panel btn-mode"
            style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
            title="Import Live Google Sheets CSV Data"
          >
            <Upload style={{ width: 16, height: 16, color: '#10b981' }} />
            <span>Import CSV</span>
          </button>

          {/* Cocktail Matchmaker Trigger */}
          <button 
            onClick={() => setIsMatchmakerOpen(!isMatchmakerOpen)}
            className={`glass-panel btn-mode ${isMatchmakerOpen ? 'active' : ''}`}
            style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, background: isMatchmakerOpen ? '#10b981' : '' }}
            title="Cocktail Hour Matchmaker & Icebreakers"
          >
            <Wand2 style={{ width: 16, height: 16, color: isMatchmakerOpen ? '#fff' : '#10b981' }} />
            <span>Matchmaker</span>
          </button>

          {/* Path Finder Toggle */}
          <button 
            onClick={() => {
              setIsPathMode(!isPathMode);
              setPathStart(null);
              setPathEnd(null);
            }} 
            className={`glass-panel btn-mode ${isPathMode ? 'active' : ''}`}
            style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
            title="Calculate shortest social connection path between 2 guests"
          >
            <Compass style={{ width: 16, height: 16, color: isPathMode ? '#fff' : '#38bdf8' }} />
            <span>Path Finder</span>
          </button>

          {/* Constellation Mode Toggle */}
          <button 
            onClick={() => setIsConstellationMode(!isConstellationMode)}
            className={`glass-panel btn-mode ${isConstellationMode ? 'active' : ''}`}
            style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
            title="Toggle Starry Constellation Mode"
          >
            <Star style={{ width: 16, height: 16, color: isConstellationMode ? '#fff' : '#38bdf8' }} />
            <span>Constellation</span>
          </button>

          {/* Color Mode Selector */}
          <div className="glass-panel color-mode-bar">
            <Palette style={{ width: 16, height: 16, color: '#38bdf8' }} />
            <span style={{ color: '#94a3b8', marginRight: 4 }}>Color By:</span>
            <button 
              onClick={() => setColorMode('cohort')}
              className={`btn-mode ${colorMode === 'cohort' ? 'active' : ''}`}
            >
              Cohort
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
              State
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

      {/* Path Finder Active Breadcrumb Banner */}
      {isPathMode && (
        <div className="glass-panel path-finder-banner no-print">
          <GitCommit style={{ width: 18, height: 18, color: '#38bdf8' }} />
          {!pathStart && <span>Click the <b>First Guest</b> to start calculating connection path...</span>}
          {pathStart && !pathEnd && <span>Selected <span className="path-step">{pathStart.name}</span>. Now click the <b>Second Guest</b>...</span>}
          {pathStart && pathEnd && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>Connection Path:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {shortestPath.map((id, index) => {
                  const n = nodes.find(x => x.id === id);
                  return (
                    <React.Fragment key={id}>
                      <span className="path-step">{n ? n.name : id}</span>
                      {index < shortestPath.length - 1 && <span style={{ color: '#94a3b8' }}>➔</span>}
                    </React.Fragment>
                  );
                })}
              </div>
              <button 
                onClick={() => { setPathStart(null); setPathEnd(null); }}
                style={{ marginLeft: 10, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Cocktail Hour Matchmaker Drawer (Sprint 3) */}
      {isMatchmakerOpen && (
        <div className="glass-panel metadata-drawer no-print" style={{ left: 24, right: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="drawer-badge" style={{ backgroundColor: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Wand2 style={{ width: 12, height: 12 }} /> Cocktail Matchmaker
              </span>
              <button onClick={() => setIsMatchmakerOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <h2 className="drawer-title" style={{ fontSize: 20 }}>Find Guest Matches</h2>
            <p className="drawer-subtitle">Pick your name to discover top shared icebreakers!</p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Select Your Name:</label>
              <select 
                value={myGuestId}
                onChange={(e) => setMyGuestId(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 10, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none' }}
              >
                <option value="">-- Choose Guest --</option>
                {nodes.filter(n => n.type === 'GUEST').map(n => (
                  <option key={n.id} value={n.id}>{n.name}</option>
                ))}
              </select>
            </div>

            {matchmakerResults.length > 0 && (
              <div className="drawer-section">
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981', marginBottom: 8 }}>Top Recommended Matches:</div>
                {matchmakerResults.map(res => (
                  <div 
                    key={res.node.id} 
                    className="icebreaker-box" 
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onClick={() => flyToNode(res.node)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 14 }}>
                      <span>{res.node.name}</span>
                      <span style={{ color: '#10b981' }}>{res.score}% Vibe Match</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 8px 0' }}>{res.node.relationship}</p>
                    {res.sharedInterests.length > 0 && (
                      <div style={{ fontSize: 11, color: '#38bdf8' }}>
                        🤝 Shared Interests: {res.sharedInterests.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Google Sheets CSV Import Modal (Sprint 2) */}
      {isImportModalOpen && (
        <div className="app-container no-print" style={{ position: 'fixed', zIndex: 50, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: 480, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 18 }}>
                <Upload style={{ width: 20, height: 20, color: '#10b981' }} />
                <span>Import Google Sheets CSV</span>
              </div>
              <button onClick={() => setIsImportModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16, lineHeight: 1.5 }}>
              Paste your <b>Published to Web</b> Google Sheets CSV link below to dynamically load guest nodes and connections into the canvas!
            </p>

            <input 
              type="text" 
              placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: 10, background: 'rgba(15, 23, 42, 0.9)', color: '#fff', border: '1px solid rgba(56, 189, 248, 0.3)', outline: 'none', fontSize: 12, marginBottom: 16 }}
            />

            {importStatus && (
              <div style={{ fontSize: 12, padding: 10, borderRadius: 8, marginBottom: 16, background: importStatus.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: importStatus.type === 'error' ? '#ef4444' : '#10b981' }}>
                {importStatus.message}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <button 
                onClick={() => {
                  setNodes(SAMPLE_NODES);
                  setLinks(SAMPLE_LINKS);
                  setImportStatus({ type: 'success', message: 'Loaded Demo Dataset!' });
                }}
                className="btn-mode"
                style={{ padding: '10px 16px', background: 'rgba(255, 255, 255, 0.08)', color: '#fff', borderRadius: 10 }}
              >
                ⚡ Load Sample Demo
              </button>
              <button 
                onClick={handleImportCsv}
                className="btn-action"
                style={{ background: '#0284c7', color: '#fff' }}
              >
                <span>Import & Validate</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
          onNodeClick={handleNodeClick}
          onNodeHover={(node) => setHoverNode(node)}
          onRenderFramePre={(ctx, globalScale) => drawBackgroundHulls(ctx, globalScale)}
          linkColor={(link) => {
            const s = link.source.id || link.source;
            const t = link.target.id || link.target;
            
            let isPathLink = false;
            if (shortestPath.length > 1) {
              for (let i = 0; i < shortestPath.length - 1; i++) {
                if ((shortestPath[i] === s && shortestPath[i+1] === t) || (shortestPath[i] === t && shortestPath[i+1] === s)) {
                  isPathLink = true;
                  break;
                }
              }
            }

            if (isPathLink) return '#38bdf8';

            const isHoveredLink = (hoverNode || selectedNode) && (
              s === (hoverNode?.id || selectedNode?.id) ||
              t === (hoverNode?.id || selectedNode?.id)
            );
            if (isHoveredLink) return '#38bdf8';
            return isLightMode ? '#64748b' : '#94a3b8';
          }}
          linkWidth={(link) => {
            const s = link.source.id || link.source;
            const t = link.target.id || link.target;
            let isPathLink = false;
            if (shortestPath.length > 1) {
              for (let i = 0; i < shortestPath.length - 1; i++) {
                if ((shortestPath[i] === s && shortestPath[i+1] === t) || (shortestPath[i] === t && shortestPath[i+1] === s)) {
                  isPathLink = true;
                  break;
                }
              }
            }
            if (isPathLink) return 4;

            const isHoveredLink = (hoverNode || selectedNode) && (
              s === (hoverNode?.id || selectedNode?.id) ||
              t === (hoverNode?.id || selectedNode?.id)
            );
            return isHoveredLink ? 3.5 : 2;
          }}
          linkDirectionalParticles={0}
          backgroundColor="transparent"
        />
      </div>

      {/* Instant Hover Tooltip Popup Overlay */}
      {hoverNode && !selectedNode && !isPathMode && (
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
              {hoverNode.type === 'CONTEXT_HUB' ? '📍 Place Hub' : (hoverNode.type === 'NON_ATTENDING' ? '👻 Not Attending' : hoverNode.cohort)}
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8' }}>{hoverNode.side} Side</span>
          </div>
          <h4 style={{ fontWeight: 800, fontSize: 14, marginBottom: 2 }}>
            {hoverNode.type === 'CONTEXT_HUB' ? `📍 ${hoverNode.name}` : hoverNode.name}
          </h4>
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
      {selectedNode && !isPathMode && (
        <div className="glass-panel metadata-drawer no-print">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span 
                className="drawer-badge"
                style={{ backgroundColor: getNodeColor(selectedNode) }}
              >
                {selectedNode.type === 'CONTEXT_HUB' ? '📍 Place Hub' : (selectedNode.type === 'NON_ATTENDING' ? '👻 Not Attending' : `${selectedNode.cohort} • ${selectedNode.side} Side`)}
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
              {selectedNode.type === 'NON_ATTENDING' && (
                <div className="drawer-info-row" style={{ color: '#f59e0b', fontWeight: 600 }}>
                  <Ghost style={{ width: 16, height: 16, color: '#f59e0b' }} />
                  <span>Not Attending Wedding (Connecting Bridge Person)</span>
                </div>
              )}
              {selectedNode.type === 'CONTEXT_HUB' && (
                <div className="drawer-info-row" style={{ color: '#38bdf8', fontWeight: 600 }}>
                  <Landmark style={{ width: 16, height: 16, color: '#38bdf8' }} />
                  <span>Shared Meeting Location / Event Hub</span>
                </div>
              )}
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
            <span>{selectedNode.type === 'CONTEXT_HUB' ? 'Location Hub Profile' : 'Guest Profile'}</span>
            <Heart style={{ width: 16, height: 16, color: '#38bdf8' }} />
          </div>
        </div>
      )}
    </div>
  );
}
