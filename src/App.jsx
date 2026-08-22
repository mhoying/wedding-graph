import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force-3d';
import { Search, Sun, Moon, Printer, X, Sparkles, MapPin, Users, Heart, Palette, Filter, Compass, Layers, GitCommit, Ghost, Landmark, Wand2, Edit3, Inbox, Send, Check, CheckCircle2, ChevronDown } from 'lucide-react';
import { SAMPLE_NODES, SAMPLE_LINKS, COHORT_COLORS, SIDE_COLORS, STATE_COLORS } from './data/sampleData';

// Helper to extract uppercase initials for guest monogram headshots
function getInitials(name) {
  if (!name) return '??';
  const parts = name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function App() {
  const fgRef = useRef();
  const [nodes, setNodes] = useState(SAMPLE_NODES);
  const [links, setLinks] = useState(SAMPLE_LINKS);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isInterestDropdownOpen, setIsInterestDropdownOpen] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLightMode, setIsLightMode] = useState(false);
  const [colorMode, setColorMode] = useState('cohort'); // 'cohort' | 'side' | 'state'
  const [showCohortHulls, setShowCohortHulls] = useState(true);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Path Finder State
  const [isPathMode, setIsPathMode] = useState(false);
  const [pathStart, setPathStart] = useState(null);
  const [pathEnd, setPathEnd] = useState(null);

  // Matchmaker Mode State
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);
  const [myGuestId, setMyGuestId] = useState('');

  // Feedback & Metadata Correction System State
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 'fb_1',
      guestId: 'eleanor_chen',
      guestName: 'Nur-e',
      category: 'Missing Interest',
      note: 'You forgot that I like Wine!',
      timestamp: 'Just now',
      applied: false
    },
    {
      id: 'fb_2',
      guestId: 'freedman_rahmans',
      guestName: 'Anne Freedman',
      category: 'Family Status Update',
      note: 'My daughter is 17 now!',
      timestamp: '5 mins ago',
      applied: false
    }
  ]);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackTargetNode, setFeedbackTargetNode] = useState(null);
  const [feedbackCategory, setFeedbackCategory] = useState('Missing Interest');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [isHostQueueOpen, setIsHostQueueOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Image cache for avatar headshots
  const imageCacheRef = useRef({});

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

  // Toggle interest checkbox in multi-select array
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Configure D3 forces: Generalized Couple Distance & Dynamic Collision for Square Badges
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      
      fg.d3Force('link').distance(l => {
        const s = l.source.id || l.source;
        const t = l.target.id || l.target;
        const isCoupleLink = l.type === 'COUPLE' || l.label === 'Married' || l.label === 'Partner' || 
                             (s === 'maureen' && t === 'matt') || (s === 'matt' && t === 'maureen');
        if (isCoupleLink) {
          return 50;
        }
        return l.source.type === 'ANCHOR' || l.target.type === 'ANCHOR' ? 175 : 135;
      });

      fg.d3Force('charge').strength(-1450).distanceMax(650);
      
      fg.d3Force('collide', forceCollide().radius(node => {
        const nameStr = node.type === 'NON_ATTENDING' ? `${node.name} (Not Attending)` : (node.type === 'CONTEXT_HUB' ? `📍 ${node.name}` : node.name);
        const charCount = nameStr ? nameStr.length : 10;
        const estimatedWidth = Math.max(charCount * 7.5 + 44, 90); // Extra width for headshot avatar
        return estimatedWidth / 2 + 12;
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

  // Matchmaker Algorithm
  const matchmakerResults = useMemo(() => {
    if (!myGuestId) return [];
    const myNode = nodes.find(n => n.id === myGuestId);
    if (!myNode || !myNode.hobbies) return [];

    const myHobbies = new Set(myNode.hobbies);
    const results = [];

    nodes.forEach(n => {
      if (n.id === myGuestId || n.type === 'ANCHOR' || n.type === 'CONTEXT_HUB') return;
      if (!n.hobbies) return;

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

  // Filter nodes based on search and selected interest checkboxes
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      if (selectedInterests.length > 0) {
        if (!node.hobbies || !selectedInterests.some(i => node.hobbies.includes(i))) return false;
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
  }, [nodes, searchQuery, selectedInterests]);

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

  // Submit Guest Metadata Correction Form
  const handleSubmitCorrection = () => {
    if (!feedbackNote.trim()) return;
    
    const newFb = {
      id: `fb_${Date.now()}`,
      guestId: feedbackTargetNode ? feedbackTargetNode.id : 'unknown',
      guestName: feedbackTargetNode ? feedbackTargetNode.name : 'Guest',
      category: feedbackCategory,
      note: feedbackNote,
      timestamp: 'Just now',
      applied: false
    };

    setFeedbackList([newFb, ...feedbackList]);
    setIsFeedbackModalOpen(false);
    setFeedbackNote('');
    setToastMessage(`Thank you! Maureen & Matt have received your suggestion.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Apply Feedback Correction directly to Node Data in real-time
  const handleApplyCorrection = (fb) => {
    setNodes(prev => prev.map(n => {
      if (n.id === fb.guestId || n.name.toLowerCase() === fb.guestName.toLowerCase()) {
        const updatedHobbies = [...(n.hobbies || [])];
        if (fb.category === 'Missing Interest' && !updatedHobbies.includes(fb.note)) {
          updatedHobbies.push(fb.note.replace(/^like\s+/i, '').trim());
        }
        return {
          ...n,
          hobbies: updatedHobbies,
          familyStatus: fb.category === 'Family Status Update' ? fb.note : n.familyStatus
        };
      }
      return n;
    }));

    setFeedbackList(prev => prev.map(item => item.id === fb.id ? { ...item, applied: true } : item));
    setToastMessage(`Updated ${fb.guestName}'s profile on canvas!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Render organic background enclosure shapes around Maureen & Matt couple and Cohort Clusters
  const drawBackgroundHulls = useCallback((ctx, globalScale) => {
    const maureen = filteredNodes.find(n => n.id === 'maureen');
    const matt = filteredNodes.find(n => n.id === 'matt');

    if (maureen && matt && maureen.x !== undefined && matt.x !== undefined) {
      const minX = Math.min(maureen.x, matt.x);
      const maxX = Math.max(maureen.x, matt.x);
      const minY = Math.min(maureen.y, matt.y);
      const maxY = Math.max(maureen.y, matt.y);

      const padding = 50 / globalScale;
      const width = (maxX - minX) + padding * 2;
      const height = (maxY - minY) + padding * 2;
      const x = minX - padding;
      const y = minY - padding;
      const cornerRadius = 24 / globalScale;

      ctx.save();
      ctx.shadowColor = 'rgba(56, 189, 248, 0.15)';
      ctx.shadowBlur = 12;
      ctx.fillStyle = isLightMode ? 'rgba(224, 242, 254, 0.45)' : 'rgba(14, 165, 233, 0.04)';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, width, height, cornerRadius);
      } else {
        ctx.rect(x, y, width, height);
      }
      ctx.fill();
      ctx.lineWidth = 1 / globalScale;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.setLineDash([4 / globalScale, 4 / globalScale]);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.setLineDash([]);
      ctx.font = `600 ${10 / globalScale}px Inter, sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText('THE COUPLE (MAUREEN & MATT)', minX + (maxX - minX) / 2, y - (8 / globalScale));
      ctx.restore();
    }

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

          const pad = 38 / globalScale;
          const w = (maxX - minX) + pad * 2;
          const h = (maxY - minY) + pad * 2;
          const x = minX - pad;
          const y = minY - pad;
          const cohortColor = COHORT_COLORS[cohort] || '#64748b';

          ctx.save();
          ctx.fillStyle = isLightMode ? 'rgba(241, 245, 249, 0.4)' : 'rgba(30, 41, 59, 0.15)';
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, y, w, h, 20 / globalScale);
          } else {
            ctx.rect(x, y, w, h);
          }
          ctx.fill();

          ctx.lineWidth = 1 / globalScale;
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
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
  }, [filteredNodes, isLightMode, showCohortHulls]);

  // Modern Square Card Badge Renderer with Circular Monogram / Headshot Avatar
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
    ctx.globalAlpha = isDimmed ? 0.12 : (isNonAttending ? 0.75 : 1.0);

    const fontSize = (isAnchor ? 13 : 11) / globalScale;
    ctx.font = `${isAnchor || isHovered || isPathNode ? '600' : '500'} ${fontSize}px Inter, sans-serif`;
    
    const textWidth = ctx.measureText(labelText).width;
    const avatarDiameter = (isAnchor ? 20 : 16) / globalScale;
    const paddingX = (isAnchor ? 14 : 10) / globalScale;
    const paddingY = (isAnchor ? 10 : 8) / globalScale;
    
    // Square-ish card dimensions with avatar spacing
    const badgeWidth = textWidth + paddingX * 2 + (isHub ? 0 : avatarDiameter + 8 / globalScale);
    const badgeHeight = Math.max(fontSize + paddingY * 2, avatarDiameter + paddingY * 1.5);
    const cornerRadius = 10 / globalScale; // Modern square-ish rounded corners

    const x = node.x - badgeWidth / 2;
    const y = node.y - badgeHeight / 2;

    // Organic Soft Shadow on Hover
    if (isHovered || isAnchor || isPathNode) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 12;
    }

    // Square Card Background Fill
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, badgeWidth, badgeHeight, cornerRadius);
    } else {
      ctx.rect(x, y, badgeWidth, badgeHeight);
    }

    if (isHovered || isPathNode) {
      ctx.fillStyle = color;
    } else if (isNonAttending) {
      ctx.fillStyle = isLightMode ? '#f1f5f9' : 'rgba(30, 41, 59, 0.6)';
    } else if (isHub) {
      ctx.fillStyle = isLightMode ? '#e2e8f0' : 'rgba(51, 65, 85, 0.85)';
    } else if (isLightMode) {
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = 'rgba(30, 41, 59, 0.95)';
    }
    ctx.fill();

    // Soft Card Border
    ctx.lineWidth = isHovered || isPathNode ? 1.8 : 1;
    if (isHovered || isPathNode) {
      ctx.strokeStyle = '#ffffff';
    } else if (isNonAttending) {
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    } else if (isLightMode) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    }
    
    if (isNonAttending) {
      ctx.setLineDash([3 / globalScale, 3 / globalScale]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.stroke();

    // Circular Headshot Monogram Avatar on Left Side of Card
    if (!isHub) {
      const avatarX = x + paddingX + avatarDiameter / 2;
      const avatarY = node.y;

      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarDiameter / 2, 0, Math.PI * 2);
      ctx.clip();

      if (node.image && imageCacheRef.current[node.image]) {
        // Draw Headshot Image if available
        const img = imageCacheRef.current[node.image];
        ctx.drawImage(img, avatarX - avatarDiameter / 2, avatarY - avatarDiameter / 2, avatarDiameter, avatarDiameter);
      } else if (node.image && !imageCacheRef.current[node.image]) {
        // Load image into cache
        const img = new Image();
        img.src = node.image;
        img.onload = () => { imageCacheRef.current[node.image] = img; };
      }

      if (!node.image || !imageCacheRef.current[node.image]) {
        // Draw Monogram Initials Circle Avatar
        ctx.fillStyle = color;
        ctx.fill();

        ctx.font = `700 ${(isAnchor ? 9 : 8) / globalScale}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(getInitials(node.name), avatarX, avatarY);
      }
      ctx.restore();
    }

    // Card Text Label
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = `${isAnchor || isHovered || isPathNode ? '600' : '500'} ${fontSize}px Inter, sans-serif`;
    ctx.fillStyle = isHovered || isPathNode ? '#ffffff' : (isNonAttending ? '#94a3b8' : (isLightMode ? '#0f172a' : '#f8fafc'));
    
    const textStartX = isHub ? (x + paddingX) : (x + paddingX + avatarDiameter + 6 / globalScale);
    ctx.fillText(labelText, textStartX, node.y);

    ctx.restore();
  }, [hoverNode, selectedNode, isLightMode, getNodeColor, shortestPath, links]);

  // Hit area detection
  const drawPointerArea = useCallback((node, color, ctx, globalScale) => {
    const isAnchor = node.type === 'ANCHOR';
    const fontSize = (isAnchor ? 13 : 11) / globalScale;
    ctx.font = `500 ${fontSize}px Inter, sans-serif`;
    const labelStr = node.type === 'NON_ATTENDING' ? `${node.name} (Not Attending)` : (node.type === 'CONTEXT_HUB' ? `📍 ${node.name}` : node.name);
    const textWidth = ctx.measureText(labelStr).width;
    const badgeWidth = textWidth + (36 / globalScale);
    const badgeHeight = fontSize + (16 / globalScale);

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
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="glass-panel no-print" style={{ position: 'fixed', top: 90, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '10px 20px', background: '#0284c7', color: '#fff', fontSize: 13, fontWeight: 600, borderRadius: 9999, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 style={{ width: 16, height: 16 }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Print Poster Header Banner */}
      <div className="print-poster-header">
        <h1>THE SOCIAL UNIVERSE OF MAUREEN & MATT</h1>
        <p>A Visual Map of Family, Friends & Connections</p>
      </div>

      {/* Streamlined Top Controls Bar */}
      <div className="top-bar no-print">
        <div className="top-bar-left">
          <div className="glass-panel brand-badge">
            <Heart style={{ width: 14, height: 14, color: '#38bdf8' }} />
            <span>Maureen & Matt</span>
          </div>

          {/* Search Box */}
          <div className="glass-panel search-box">
            <Search style={{ width: 14, height: 14, color: '#94a3b8', marginRight: 8 }} />
            <input 
              type="text"
              placeholder="Search guests, cohorts, or interests..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X style={{ width: 14, height: 14, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSearchQuery('')} />
            )}
          </div>

          {/* Multi-Select Interest Dropdown with Checkboxes */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsInterestDropdownOpen(!isInterestDropdownOpen)}
              className={`glass-panel btn-mode ${selectedInterests.length > 0 ? 'active' : ''}`}
              style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Filter style={{ width: 13, height: 13, color: selectedInterests.length > 0 ? '#fff' : '#10b981' }} />
              <span>
                {selectedInterests.length > 0 ? `Interests (${selectedInterests.length})` : 'Filter Interests'}
              </span>
              <ChevronDown style={{ width: 12, height: 12 }} />
            </button>

            {isInterestDropdownOpen && (
              <div 
                className="glass-panel"
                style={{ 
                  position: 'absolute', 
                  top: '120%', 
                  left: 0, 
                  width: 220, 
                  maxHeight: 280, 
                  overflowY: 'auto', 
                  padding: '12px', 
                  zIndex: 60,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter by Interests</span>
                  {selectedInterests.length > 0 && (
                    <button 
                      onClick={() => setSelectedInterests([])} 
                      style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}
                    >
                      Clear
                    </button>
                  )}
                </div>
                {allInterests.map(interest => {
                  const isChecked = selectedInterests.includes(interest);
                  return (
                    <label 
                      key={interest}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, cursor: 'pointer', userSelect: 'none' }}
                    >
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleInterest(interest)}
                        style={{ accentColor: '#10b981', cursor: 'pointer' }}
                      />
                      <span style={{ color: isChecked ? '#34d399' : 'inherit', fontWeight: isChecked ? 700 : 400 }}>
                        🏷️ {interest}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Compact & Streamlined Action Controls Bar */}
        <div className="top-bar-right">
          {/* Path Finder Toggle */}
          <button 
            onClick={() => {
              setIsPathMode(!isPathMode);
              setPathStart(null);
              setPathEnd(null);
            }} 
            className={`glass-panel btn-mode ${isPathMode ? 'active' : ''}`}
            style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
            title="Calculate shortest social connection path between 2 guests"
          >
            <Compass style={{ width: 14, height: 14, color: isPathMode ? '#fff' : '#38bdf8' }} />
            <span>Path Finder</span>
          </button>

          {/* Matchmaker Toggle */}
          <button 
            onClick={() => setIsMatchmakerOpen(!isMatchmakerOpen)}
            className={`glass-panel btn-mode ${isMatchmakerOpen ? 'active' : ''}`}
            style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, background: isMatchmakerOpen ? '#10b981' : '' }}
            title="Cocktail Hour Matchmaker & Icebreakers"
          >
            <Wand2 style={{ width: 14, height: 14, color: isMatchmakerOpen ? '#fff' : '#10b981' }} />
            <span>Matchmaker</span>
          </button>

          {/* Suggest Edit Trigger */}
          <button 
            onClick={() => {
              setFeedbackTargetNode(selectedNode || nodes[0]);
              setIsFeedbackModalOpen(true);
            }}
            className="glass-panel btn-mode"
            style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
            title="Report Missing or Incorrect Metadata"
          >
            <Edit3 style={{ width: 14, height: 14, color: '#38bdf8' }} />
            <span>Suggest Edit</span>
          </button>

          {/* Host Feedback Admin Queue Button */}
          {feedbackList.some(f => !f.applied) && (
            <button 
              onClick={() => setIsHostQueueOpen(!isHostQueueOpen)}
              className={`glass-panel btn-mode ${isHostQueueOpen ? 'active' : ''}`}
              style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b' }}
              title="View Submitted Guest Metadata Corrections"
            >
              <Inbox style={{ width: 14, height: 14, color: '#f59e0b' }} />
              <span>Feedback ({feedbackList.filter(f => !f.applied).length})</span>
            </button>
          )}

          {/* Color Mode Selector */}
          <div className="glass-panel color-mode-bar">
            <Palette style={{ width: 14, height: 14, color: '#38bdf8' }} />
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
            {isLightMode ? <Moon style={{ width: 16, height: 16 }} /> : <Sun style={{ width: 16, height: 16, color: '#38bdf8' }} />}
          </button>
          <button 
            onClick={() => window.print()} 
            className="glass-panel btn-action"
          >
            <Printer style={{ width: 14, height: 14, color: '#38bdf8' }} />
            <span>Export Poster</span>
          </button>
        </div>
      </div>

      {/* Path Finder Active Breadcrumb Banner */}
      {isPathMode && (
        <div className="glass-panel path-finder-banner no-print">
          <GitCommit style={{ width: 16, height: 16, color: '#38bdf8' }} />
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

      {/* Host Feedback Admin Queue Drawer */}
      {isHostQueueOpen && (
        <div className="glass-panel metadata-drawer no-print" style={{ left: 24, right: 'auto', zIndex: 40 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="drawer-badge" style={{ backgroundColor: '#f59e0b', display: 'flex', alignItems: 'center', gap: 6, color: '#000' }}>
                <Inbox style={{ width: 12, height: 12 }} /> Host Feedback Queue
              </span>
              <button onClick={() => setIsHostQueueOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <h2 className="drawer-title" style={{ fontSize: 20 }}>Submitted Corrections</h2>
            <p className="drawer-subtitle">Guest updates to review & apply to canvas:</p>

            <div className="drawer-section">
              {feedbackList.map(fb => (
                <div key={fb.id} className="icebreaker-box" style={{ borderColor: fb.applied ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 13 }}>
                    <span>{fb.guestName}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{fb.timestamp}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600, margin: '2px 0 6px 0' }}>
                    Category: {fb.category}
                  </div>
                  <p style={{ fontSize: 12, color: '#cbd5e1', marginBottom: 10 }}>"{fb.note}"</p>

                  {!fb.applied ? (
                    <button 
                      onClick={() => handleApplyCorrection(fb)}
                      className="btn-mode"
                      style={{ padding: '6px 12px', background: '#10b981', color: '#fff', borderRadius: 9999, fontSize: 11, display: 'flex', alignItems: 'center', gap: 6, width: '100%', justifyContent: 'center' }}
                    >
                      <Check style={{ width: 12, height: 12 }} /> Apply Update to Graph
                    </button>
                  ) : (
                    <div style={{ fontSize: 11, color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle2 style={{ width: 12, height: 12 }} /> Applied to Canvas
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Guest Report Correction Modal */}
      {isFeedbackModalOpen && (
        <div className="app-container no-print" style={{ position: 'fixed', zIndex: 50, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: 440, padding: 28, borderRadius: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 18 }}>
                <Edit3 style={{ width: 20, height: 20, color: '#38bdf8' }} />
                <span>Suggest Profile Edit</span>
              </div>
              <button onClick={() => setIsFeedbackModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16, lineHeight: 1.5 }}>
              Spotted missing interests or an outdated detail? Send a quick note directly to Maureen & Matt!
            </p>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Your Name / Guest:</label>
              <select 
                value={feedbackTargetNode ? feedbackTargetNode.id : ''}
                onChange={(e) => setFeedbackTargetNode(nodes.find(n => n.id === e.target.value))}
                style={{ width: '100%', padding: '10px', borderRadius: 12, background: 'rgba(15, 23, 42, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none', fontSize: 12 }}
              >
                {nodes.filter(n => n.type === 'GUEST').map(n => (
                  <option key={n.id} value={n.id}>{n.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Update Type:</label>
              <select 
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 12, background: 'rgba(15, 23, 42, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none', fontSize: 12 }}
              >
                <option value="Missing Interest">Missing Interest (e.g. "You forgot that I like Wine!")</option>
                <option value="Family Status Update">Family Status Update (e.g. "My daughter is 17 now!")</option>
                <option value="Hometown / State Edit">Hometown / State Correction</option>
                <option value="Relationship Correction">Relationship Connection Edit</option>
                <option value="Other">Other Suggestion</option>
              </select>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Your Suggestion / Detail:</label>
              <textarea 
                rows={3}
                placeholder="e.g. You forgot that I love Wine and Bicycling!"
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 12, background: 'rgba(15, 23, 42, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none', fontSize: 12, resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button 
                onClick={() => setIsFeedbackModalOpen(false)}
                className="btn-mode"
                style={{ padding: '10px 16px', background: 'rgba(255, 255, 255, 0.08)', color: '#fff', borderRadius: 9999 }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitCorrection}
                className="btn-action"
                style={{ background: '#0284c7', color: '#fff' }}
              >
                <Send style={{ width: 14, height: 14 }} />
                <span>Send to Maureen & Matt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cocktail Hour Matchmaker Drawer */}
      {isMatchmakerOpen && (
        <div className="glass-panel metadata-drawer no-print" style={{ left: 24, right: 'auto' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="drawer-badge" style={{ backgroundColor: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Wand2 style={{ width: 12, height: 12 }} /> Cocktail Matchmaker
              </span>
              <button onClick={() => setIsMatchmakerOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <h2 className="drawer-title" style={{ fontSize: 20 }}>Find Guest Matches</h2>
            <p className="drawer-subtitle">Pick your name to discover top shared icebreakers!</p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Select Your Name:</label>
              <select 
                value={myGuestId}
                onChange={(e) => setMyGuestId(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none' }}
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

      {/* Dynamic Color Legend Footer */}
      <div className="glass-panel legend-bar no-print">
        <span style={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.08em' }}>Legend ({colorMode}):</span>
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
            return isLightMode ? 'rgba(100, 116, 139, 0.4)' : 'rgba(148, 163, 184, 0.35)';
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
            if (isPathLink) return 3.5;

            const isHoveredLink = (hoverNode || selectedNode) && (
              s === (hoverNode?.id || selectedNode?.id) ||
              t === (hoverNode?.id || selectedNode?.id)
            );
            return isHoveredLink ? 3 : 1.5;
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
                borderRadius: 9999, 
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
                <span key={h} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 600 }}>
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
                <X style={{ width: 18, height: 18 }} />
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
                          if (!selectedInterests.includes(h)) {
                            setSelectedInterests([...selectedInterests, h]);
                          }
                          setSelectedNode(null);
                        }}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: 9999,
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

            {/* Suggest Edit Button inside Drawer */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button 
                onClick={() => {
                  setFeedbackTargetNode(selectedNode);
                  setIsFeedbackModalOpen(true);
                }}
                className="btn-mode"
                style={{ width: '100%', padding: '10px', borderRadius: 9999, background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600 }}
              >
                <Edit3 style={{ width: 14, height: 14 }} />
                <span>Suggest Profile Edit for {selectedNode.name}</span>
              </button>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8' }}>
            <span>{selectedNode.type === 'CONTEXT_HUB' ? 'Location Hub Profile' : 'Guest Profile'}</span>
            <Heart style={{ width: 16, height: 16, color: '#38bdf8' }} />
          </div>
        </div>
      )}
    </div>
  );
}
