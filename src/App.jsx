import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force-3d';
import { Search, Sun, Moon, Printer, X, Sparkles, MapPin, Users, Heart, Palette, Filter, Compass, Layers, GitCommit, Ghost, Landmark, Wand2, Edit3, Inbox, Send, Check, CheckCircle2, ChevronDown, Plus, Save, Download, Tag, Camera, Maximize2, Sliders, MoveHorizontal, SlidersHorizontal, Settings, RotateCw, Disc, Key, Lock, Copy, FileSpreadsheet, Home } from 'lucide-react';
import { SAMPLE_NODES, SAMPLE_LINKS, COHORT_COLORS, SIDE_COLORS, STATE_COLORS } from './data/sampleData';

// Color generator for dynamic auto-discovered metadata clusters
const DYNAMIC_CLUSTER_COLORS = ['#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#3b82f6', '#f43f5e', '#a855f7'];

// Helper to convert Hex color to RGBA with custom opacity
function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(100, 116, 139, ${alpha})`;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper to extract uppercase initials for guest monogram headshots
function getInitials(name) {
  if (!name) return '??';
  const parts = name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Helper to extract clean single/multi-word tag proposals from qualitative feedback notes
function extractProposedTag(note, category) {
  if (!note) return '';
  if (category === 'Missing Interest') {
    const match = note.match(/(?:like|love|enjoy|into|about|play)\s+([a-zA-Z0-9\s]+)/i);
    if (match && match[1]) {
      const tag = match[1].trim();
      return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
    }
    const words = note.trim().split(/\s+/);
    const lastWord = words[words.length - 1].replace(/[^a-zA-Z]/g, '');
    return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
  }
  return note.trim();
}

// DYNAMIC LAYOUT MATH HELPER: Scales with Independent Node Size Slider (scaleMult)
function getNodeBounds(node, showHeadshots, scaleMult = 1.0) {
  const isAnchor = node.type === 'ANCHOR';
  const isHub = node.type === 'CONTEXT_HUB';
  const isNonAttending = node.type === 'NON_ATTENDING';
  const renderAvatar = showHeadshots && !isHub;

  let labelText = node.name || 'Guest';
  if (isHub) labelText = `📍 ${node.name}`;
  if (isNonAttending) labelText = `${node.name} (Not Attending)`;

  // Native World Unit Dimensions multiplied by Independent Node Scale Multiplier
  const baseAvatarDiameter = isAnchor ? 56 : 46;
  const baseFontSize = isAnchor ? 13 : 11;

  const avatarDiameter = baseAvatarDiameter * scaleMult;
  const fontSize = baseFontSize * scaleMult;
  const textWidth = labelText.length * (fontSize * 0.60);

  let width, height;
  if (renderAvatar) {
    width = Math.max(textWidth + 24 * scaleMult, avatarDiameter + 20 * scaleMult, (isAnchor ? 110 : 92) * scaleMult);
    height = avatarDiameter + fontSize + 22 * scaleMult;
  } else {
    width = Math.max(textWidth + 24 * scaleMult, 76 * scaleMult);
    height = fontSize + 16 * scaleMult;
  }

  // Exact Bounding Radius: Hypotenuse + 25% Safety Margin in World Coordinates to guarantee ZERO OVERLAPS
  const halfW = width / 2;
  const halfH = height / 2;
  const collisionRadius = (Math.hypot(halfW, halfH) + 22 * scaleMult) * 1.25;

  return { width, height, avatarDiameter, fontSize, textWidth, collisionRadius };
}

// HIGH-RESPONSIVENESS DYNAMIC ORBIT ENGINE: Instant 0ms response, 10x-50x speed range
function createOrbitForce(speedMultiplier = 1.0) {
  let nodes = [];
  function force() {
    if (speedMultiplier <= 0) return;
    
    // Recalibrated angular velocity: 1.0x = ~15s per revolution, 3.0x = ~5s per revolution, 0.1x = ~120s drift
    const omega = 0.007 * speedMultiplier;

    // Find center of gravity (Maureen & Matt couple anchor)
    let cx = 0, cy = 0, count = 0;
    nodes.forEach(n => {
      if (n.id === 'maureen' || n.id === 'matt') {
        cx += n.x || 0;
        cy += n.y || 0;
        count++;
      }
    });
    if (count > 0) { cx /= count; cy /= count; }

    nodes.forEach(node => {
      // Don't orbit fixed/dragged nodes or core couple anchors
      if (node.fx !== undefined && node.fx !== null) return;
      if (node.id === 'maureen' || node.id === 'matt') return;

      const dx = (node.x || 0) - cx;
      const dy = (node.y || 0) - cy;
      const r = Math.hypot(dx, dy);

      if (r > 15) {
        const theta = Math.atan2(dy, dx);
        
        // Tangential Orbital Velocity Vector: v = omega * r perp to radius
        const vx = -r * Math.sin(theta) * omega;
        const vy = r * Math.cos(theta) * omega;

        // Additive velocity blending so D3 collision & charge forces operate simultaneously with orbit!
        node.vx += (vx - node.vx) * 0.15;
        node.vy += (vy - node.vy) * 0.15;
      }
    });
  }

  force.initialize = _nodes => { nodes = _nodes; };
  return force;
}

export default function App() {
  const fgRef = useRef();
  
  // Admin Mode State (Activated via URL parameter ?admin=true or Host Login)
  const [isAdmin, setIsAdmin] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('admin') === 'true' || localStorage.getItem('wedding_graph_admin') === 'true';
  });

  // Event Passcode Gate State
  const [eventPasscode, setEventPasscode] = useState(() => {
    return localStorage.getItem('wedding_graph_passcode') || 'MaureenAndMatt2026';
  });

  const [isUnlocked, setIsUnlocked] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCode = urlParams.get('passcode');
    const savedPasscode = localStorage.getItem('wedding_graph_passcode') || 'MaureenAndMatt2026';
    
    // Auto-unlock via URL parameter ?passcode=MaureenAndMatt2026
    if (urlCode && urlCode.toLowerCase() === savedPasscode.toLowerCase()) {
      localStorage.setItem('wedding_graph_unlocked', 'true');
      return true;
    }
    
    // Auto-unlock for host admin ?admin=true
    if (urlParams.get('admin') === 'true') {
      return true;
    }

    return localStorage.getItem('wedding_graph_unlocked') === 'true';
  });

  const [inputPasscode, setInputPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const handleUnlockPasscode = (e) => {
    e.preventDefault();
    if (inputPasscode.trim().toLowerCase() === eventPasscode.toLowerCase()) {
      localStorage.setItem('wedding_graph_unlocked', 'true');
      setIsUnlocked(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Incorrect passcode. Please check your wedding invitation!');
    }
  };

  const handleCopyQrLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const qrUrl = `${baseUrl}?passcode=${encodeURIComponent(eventPasscode)}`;
    navigator.clipboard.writeText(qrUrl);
    setToastMessage('Copied Auto-Unlock Invitation Link to clipboard!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Mobile Viewport & Orientation Detection
  const [isMobileViewport, setIsMobileViewport] = useState(() => window.innerWidth < 768 || (window.innerHeight / window.innerWidth) > 1.25);
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);

  // Toggle state for headshot photos on node cards
  const [showHeadshots, setShowHeadshots] = useState(true);

  // Dynamic Orbital Galaxy Motion Engine (ON by default as requested!)
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [orbitSpeed, setOrbitSpeed] = useState(0.3);

  // Independent Sliders: Node Size Multiplier & Map Density / Edge Length Multiplier (Auto-tuned default for mobile)
  const [nodeScaleMultiplier, setNodeScaleMultiplier] = useState(() => isMobileViewport ? 0.85 : 1.0);
  const [edgeLengthMultiplier, setEdgeLengthMultiplier] = useState(() => isMobileViewport ? 0.90 : 1.0);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(1.0);

  // Initialize Nodes with localStorage fallback (strip any old D3 physics positions on init)
  const [nodes, setNodes] = useState(() => {
    const saved = localStorage.getItem('wedding_graph_nodes_v3');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved); 
        return parsed.map(({ x, y, vx, vy, index, __indexColor, ...rest }) => rest);
      } catch (e) {}
    }
    return SAMPLE_NODES.map(({ x, y, vx, vy, index, __indexColor, ...rest }) => rest);
  });

  // Clean links so source and target are strictly String IDs for D3 binding!
  const [links, setLinks] = useState(() => {
    return SAMPLE_LINKS.map(l => ({
      source: typeof l.source === 'object' ? (l.source.id || l.source) : l.source,
      target: typeof l.target === 'object' ? (l.target.id || l.target) : l.target,
      label: l.label || ''
    }));
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isInterestDropdownOpen, setIsInterestDropdownOpen] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLightMode, setIsLightMode] = useState(false);
  const [colorMode, setColorMode] = useState('cohort');
  
  // Cluster Overlays Mode: 'cohort' | 'locations' | 'current_location' | 'original_location' | 'interests' | 'none'
  const [clusterMode, setClusterMode] = useState('cohort');

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Path Finder State
  const [isPathMode, setIsPathMode] = useState(false);
  const [pathStart, setPathStart] = useState(null);
  const [pathEnd, setPathEnd] = useState(null);

  // Matchmaker Mode State
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);
  const [myGuestId, setMyGuestId] = useState('');

  // Direct Guest Profile Inline Editing State
  const [isEditingDrawer, setIsEditingDrawer] = useState(false);
  const [editRelationship, setEditRelationship] = useState('');
  const [editOriginallyFrom, setEditOriginallyFrom] = useState('');
  const [editCurrentlyLivesIn, setEditCurrentlyLivesIn] = useState('');
  const [editCohort, setEditCohort] = useState('');
  const [editSide, setEditSide] = useState('Maureen');
  const [editFamilyStatus, setEditFamilyStatus] = useState('');
  const [editHobbies, setEditHobbies] = useState([]);
  const [newInterestInput, setNewInterestInput] = useState('');

  // Host Feedback Queue State with localStorage Fallback
  const [feedbackList, setFeedbackList] = useState(() => {
    const saved = localStorage.getItem('wedding_graph_feedback_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'fb_1',
        guestId: 'eleanor_chen',
        guestName: 'Nur-e',
        category: 'Missing Interest',
        note: 'You forgot that I like Wine!',
        proposedValue: 'Wine',
        timestamp: 'Just now',
        applied: false
      },
      {
        id: 'fb_2',
        guestId: 'freedman_rahmans',
        guestName: 'Anne Freedman',
        category: 'Family Status Update',
        note: 'My daughter is 17 now!',
        proposedValue: 'Daughter is 17',
        timestamp: '5 mins ago',
        applied: false
      }
    ];
  });

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackTargetNode, setFeedbackTargetNode] = useState(null);
  const [feedbackCategory, setFeedbackCategory] = useState('Missing Interest');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [isHostQueueOpen, setIsHostQueueOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Image cache for avatar headshots
  const imageCacheRef = useRef({});

  // Preload portrait headshots
  useEffect(() => {
    nodes.forEach(node => {
      if (node.image && !imageCacheRef.current[node.image]) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = node.image;
        img.onload = () => { imageCacheRef.current[node.image] = img; };
      }
    });
  }, [nodes]);

  // Clear obsolete localStorage caches
  useEffect(() => {
    localStorage.removeItem('wedding_graph_nodes_v2');
    localStorage.removeItem('wedding_graph_feedback_v2');
    localStorage.removeItem('wedding_graph_nodes_v1');
  }, []);

  // Save Clean Nodes & Feedback to LocalStorage whenever modified
  useEffect(() => {
    const cleanNodes = nodes.map(({ x, y, vx, vy, index, __indexColor, ...rest }) => rest);
    localStorage.setItem('wedding_graph_nodes_v3', JSON.stringify(cleanNodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem('wedding_graph_feedback_v3', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Persist updated nodes to disk file src/data/sampleData.js via /api/save-dataset
  const persistNodesToDisk = useCallback(async (updatedNodes) => {
    try {
      const cleanNodes = updatedNodes.map(({ x, y, vx, vy, index, __indexColor, ...rest }) => rest);
      const cleanLinks = links.map(l => ({
        source: typeof l.source === 'object' ? (l.source.id || l.source) : l.source,
        target: typeof l.target === 'object' ? (l.target.id || l.target) : l.target,
        label: l.label || ''
      }));

      const res = await fetch('/api/save-dataset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: cleanNodes, links: cleanLinks, feedbackList })
      });
      const data = await res.json();
      if (data.success) {
        console.log('Saved to disk:', data.message);
      }
    } catch (e) {
      console.warn('Running on static host.');
    }
  }, [links, feedbackList]);

  // Download updated sampleData.js file directly for Git committing
  const downloadSampleDataJs = () => {
    const cleanNodes = nodes.map(({ x, y, vx, vy, index, __indexColor, ...rest }) => rest);
    const cleanLinks = links.map(l => ({
      source: typeof l.source === 'object' ? (l.source.id || l.source) : l.source,
      target: typeof l.target === 'object' ? (l.target.id || l.target) : l.target,
      label: l.label || ''
    }));

    const fileContent = `// Auto-generated & updated from guest profile edits
export const COHORT_COLORS = ${JSON.stringify(COHORT_COLORS, null, 2)};

export const SIDE_COLORS = ${JSON.stringify(SIDE_COLORS, null, 2)};

export const STATE_COLORS = ${JSON.stringify(STATE_COLORS, null, 2)};

export const SAMPLE_NODES = ${JSON.stringify(cleanNodes, null, 2)};

export const SAMPLE_LINKS = ${JSON.stringify(cleanLinks, null, 2)};
`;
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sampleData.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setToastMessage('Downloaded sampleData.js! Replace in src/data/ and git commit.');
    setTimeout(() => setToastMessage(''), 4000);
  };

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

  // Auto-Cluster Discovery Engine: Scans interest tags and hobbies (without 🏷️ emoji)
  const dynamicAutoClusters = useMemo(() => {
    const clusterMap = {};

    nodes.forEach(node => {
      if (node.type === 'CONTEXT_HUB') return;

      if (node.hobbies && Array.isArray(node.hobbies)) {
        node.hobbies.forEach(h => {
          const key = h;
          if (!clusterMap[key]) clusterMap[key] = [];
          clusterMap[key].push(node);
        });
      }

      if (node.familyStatus && /kid|child|daughter|son/i.test(node.familyStatus)) {
        const key = `👨‍👩‍👧 Guests with Kids`;
        if (!clusterMap[key]) clusterMap[key] = [];
        clusterMap[key].push(node);
      }
    });

    const result = {};
    Object.entries(clusterMap).forEach(([tag, arr]) => {
      if (arr.length >= 2) {
        result[tag] = arr;
      }
    });
    return result;
  }, [nodes]);

  // Current Location Cluster Engine
  const dynamicCurrentLocationClusters = useMemo(() => {
    const clusterMap = {};
    nodes.forEach(node => {
      if (node.type === 'CONTEXT_HUB') return;
      if (node.currentlyLivesIn) {
        const key = `📍 Lives in: ${node.currentlyLivesIn}`;
        if (!clusterMap[key]) clusterMap[key] = [];
        clusterMap[key].push(node);
      }
    });
    const result = {};
    Object.entries(clusterMap).forEach(([tag, arr]) => {
      if (arr.length >= 2) result[tag] = arr;
    });
    return result;
  }, [nodes]);

  // Original Location Cluster Engine
  const dynamicOriginalLocationClusters = useMemo(() => {
    const clusterMap = {};
    nodes.forEach(node => {
      if (node.type === 'CONTEXT_HUB') return;
      if (node.originallyFrom) {
        const key = `🏡 Originally: ${node.originallyFrom}`;
        if (!clusterMap[key]) clusterMap[key] = [];
        clusterMap[key].push(node);
      }
    });
    const result = {};
    Object.entries(clusterMap).forEach(([tag, arr]) => {
      if (arr.length >= 2) result[tag] = arr;
    });
    return result;
  }, [nodes]);

  // Sync edit form fields whenever a node is selected
  useEffect(() => {
    if (selectedNode) {
      setEditRelationship(selectedNode.relationship || '');
      setEditOriginallyFrom(selectedNode.originallyFrom || selectedNode.hometown || '');
      setEditCurrentlyLivesIn(selectedNode.currentlyLivesIn || selectedNode.state || '');
      setEditCohort(selectedNode.cohort || '');
      setEditSide(selectedNode.side || 'Maureen');
      setEditFamilyStatus(selectedNode.familyStatus || '');
      setEditHobbies(selectedNode.hobbies ? [...selectedNode.hobbies] : []);
      setIsEditingDrawer(false);
    }
  }, [selectedNode]);

  // Dynamic Viewport Resize & Orientation Listener
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDimensions({ width: w, height: h });
      setIsMobileViewport(w < 768 || (h / w) > 1.25);
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
      fgRef.current.zoom(isMobileViewport ? 2.1 : 2.6, 900);
    }
  }, [isMobileViewport]);

  // Toggle interest checkbox in multi-select array
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Save Direct Profile Edits IN-PLACE so D3 Node object references and Link coordinates NEVER disconnect!
  const handleSaveProfileEdits = () => {
    if (!selectedNode) return;

    const targetNode = nodes.find(n => n.id === selectedNode.id);
    if (targetNode) {
      targetNode.relationship = editRelationship;
      targetNode.originallyFrom = editOriginallyFrom;
      targetNode.currentlyLivesIn = editCurrentlyLivesIn;
      targetNode.cohort = editCohort;
      targetNode.side = editSide;
      targetNode.familyStatus = editFamilyStatus;
      targetNode.hobbies = editHobbies;
    }

    setNodes([...nodes]);
    setSelectedNode({ ...targetNode });
    setIsEditingDrawer(false);
    
    persistNodesToDisk(nodes);

    setToastMessage(`Saved profile changes for ${selectedNode.name}!`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Add a new interest tag in edit mode
  const handleAddInterestTag = () => {
    if (!newInterestInput.trim()) return;
    const tag = newInterestInput.trim();
    if (!editHobbies.includes(tag)) {
      setEditHobbies([...editHobbies, tag]);
    }
    setNewInterestInput('');
  };

  // Remove an interest tag in edit mode
  const handleRemoveInterestTag = (tag) => {
    setEditHobbies(editHobbies.filter(h => h !== tag));
  };

  // Group Cluster Dragging Handler: Moves all member nodes in the same cluster together!
  const handleNodeDrag = useCallback((node) => {
    if (node._prevX !== undefined && node._prevY !== undefined) {
      const dx = node.x - node._prevX;
      const dy = node.y - node._prevY;

      if (dx !== 0 || dy !== 0) {
        // Find member nodes in the same active cluster
        let memberNodes = [];
        if (clusterMode === 'cohort' && node.cohort) {
          memberNodes = nodes.filter(n => n.cohort === node.cohort);
        } else if (clusterMode === 'state') {
          const loc = node.currentlyLivesIn || node.originallyFrom || node.state;
          memberNodes = nodes.filter(n => (n.currentlyLivesIn || n.originallyFrom || n.state) === loc);
        } else if (clusterMode === 'interests' && node.hobbies) {
          const mainHobby = node.hobbies[0];
          memberNodes = nodes.filter(n => n.hobbies && n.hobbies.includes(mainHobby));
        }

        if (memberNodes.length > 1) {
          memberNodes.forEach(other => {
            if (other.id !== node.id) {
              other.x = (other.x || 0) + dx;
              other.y = (other.y || 0) + dy;
              other.fx = other.x;
              other.fy = other.y;
            }
          });
        }
      }
    }
    node._prevX = node.x;
    node._prevY = node.y;
  }, [nodes, clusterMode]);

  const handleNodeDragEnd = useCallback((node) => {
    node._prevX = undefined;
    node._prevY = undefined;

    // Unfix cluster group nodes so celestial orbital motion resumes smoothly
    let memberNodes = [];
    if (clusterMode === 'cohort' && node.cohort) {
      memberNodes = nodes.filter(n => n.cohort === node.cohort);
    } else if (clusterMode === 'locations' || clusterMode === 'current_location' || clusterMode === 'original_location') {
      const loc = node.currentlyLivesIn || node.originallyFrom;
      memberNodes = nodes.filter(n => n.currentlyLivesIn === loc || n.originallyFrom === loc);
    }

    if (memberNodes.length > 1) {
      memberNodes.forEach(other => {
        other.fx = undefined;
        other.fy = undefined;
      });
    }

    // Reheat D3 simulation solver so graph relaxes into its optimal non-overlapping state!
    if (fgRef.current) {
      fgRef.current.d3AlphaTarget(0.3).restart();
      setTimeout(() => {
        if (fgRef.current) fgRef.current.d3AlphaTarget(0);
      }, 500);
    }
  }, [nodes, clusterMode]);

  // Update proposed edit value inside Host Queue items before approving
  const handleUpdateProposedValue = (fbId, val) => {
    setFeedbackList(prev => prev.map(f => f.id === fbId ? { ...f, proposedValue: val } : f));
  };

  // Configure D3 forces: PROPORTIONAL COHORT MULTIPLIERS & DYNAMIC ORBITAL GALAXY FORCE!
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      
      fg.d3Force('link').distance(l => {
        const sObj = typeof l.source === 'object' ? l.source : nodes.find(n => n.id === l.source);
        const tObj = typeof l.target === 'object' ? l.target : nodes.find(n => n.id === l.target);
        
        const sRadius = sObj ? getNodeBounds(sObj, showHeadshots, nodeScaleMultiplier).collisionRadius : 65 * nodeScaleMultiplier;
        const tRadius = tObj ? getNodeBounds(tObj, showHeadshots, nodeScaleMultiplier).collisionRadius : 65 * nodeScaleMultiplier;
        
        const sId = sObj ? sObj.id : l.source;
        const tId = tObj ? tObj.id : l.target;

        const isCoupleLink = l.type === 'COUPLE' || l.label === 'Married' || l.label === 'Partner' || 
                             (sId === 'maureen' && tId === 'matt') || (sId === 'matt' && tId === 'maureen');
        
        const isSameCohort = sObj && tObj && sObj.cohort && tObj.cohort && (sObj.cohort === tObj.cohort);
        const isHubLink = (sObj && sObj.type === 'CONTEXT_HUB') || (tObj && tObj.type === 'CONTEXT_HUB');

        let cohortMultiplier;
        if (isCoupleLink) {
          cohortMultiplier = 0.65;
        } else if (isSameCohort) {
          cohortMultiplier = 0.80;
        } else if (isHubLink) {
          cohortMultiplier = 2.20;
        } else {
          cohortMultiplier = 1.85;
        }

        const baseSum = sRadius + tRadius + 15 * nodeScaleMultiplier;
        return baseSum * cohortMultiplier * edgeLengthMultiplier;
      });

      fg.d3Force('charge')
        .strength(-2400 * nodeScaleMultiplier * edgeLengthMultiplier)
        .distanceMax(2400 * edgeLengthMultiplier);
      
      fg.d3Force('collide', forceCollide().radius(node => {
        return getNodeBounds(node, showHeadshots, nodeScaleMultiplier).collisionRadius;
      }).iterations(40));

      // DYNAMIC ORBITAL GALAXY MOTION FORCE
      if (isOrbiting) {
        fg.d3Force('orbit', createOrbitForce(orbitSpeed));
      } else {
        fg.d3Force('orbit', null);
      }

      fg.d3ReheatSimulation();
    }
  }, [nodes, links, showHeadshots, nodeScaleMultiplier, edgeLengthMultiplier, isOrbiting, orbitSpeed, clusterMode]);

  // Unfix node drag locks and reheat D3 simulation whenever cluster grouping mode changes!
  useEffect(() => {
    nodes.forEach(node => {
      if (node.id !== 'maureen' && node.id !== 'matt') {
        node.fx = undefined;
        node.fy = undefined;
      }
    });

    if (fgRef.current) {
      fgRef.current.d3AlphaTarget(0.35).restart();
      setTimeout(() => {
        if (fgRef.current) fgRef.current.d3AlphaTarget(0);
      }, 600);
    }
  }, [clusterMode, nodes]);

  // PERPETUAL KINEMATIC ORBIT TICKER: Gentle continuous physics alpha target for collision stability
  useEffect(() => {
    if (isOrbiting && fgRef.current) {
      fgRef.current.d3AlphaTarget(0.08).restart();
    } else if (fgRef.current) {
      fgRef.current.d3AlphaTarget(0);
    }
  }, [isOrbiting, orbitSpeed]);

  // Handle D3 Zoom Event: Re-optimizes simulation smoothly on page zoom
  const handleZoom = useCallback(({ k }) => {
    if (Math.abs(k - currentZoomLevel) > 0.15) {
      setCurrentZoomLevel(k);
      if (fgRef.current) {
        fgRef.current.d3ReheatSimulation();
      }
    }
  }, [currentZoomLevel]);

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
        const s = typeof l.source === 'object' ? l.source.id : l.source;
        const t = typeof l.target === 'object' ? l.target.id : l.target;
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
      const myOrigin = myNode.originallyFrom || myNode.hometown || '';
      const nOrigin = n.originallyFrom || n.hometown || '';
      const myCurrent = myNode.currentlyLivesIn || myNode.state || '';
      const nCurrent = n.currentlyLivesIn || n.state || '';

      const sharedOrigin = myOrigin && nOrigin && myOrigin === nOrigin;
      const sharedCurrent = myCurrent && nCurrent && myCurrent === nCurrent;

      if (sharedInterests.length > 0 || sharedOrigin || sharedCurrent) {
        let score = sharedInterests.length * 30 + (sharedOrigin ? 20 : 0) + (sharedCurrent ? 15 : 0);
        results.push({
          node: n,
          score: Math.min(score + 25, 98),
          sharedInterests,
          sharedOrigin,
          sharedCurrent
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

  // Ensure graphData passes clean links array where source/target are guaranteed string IDs or valid node references
  const graphData = useMemo(() => {
    return {
      nodes: filteredNodes,
      links: links.filter(link => {
        const sId = typeof link.source === 'object' ? link.source.id : link.source;
        const tId = typeof link.target === 'object' ? link.target.id : link.target;
        return filteredNodes.some(n => n.id === sId) && filteredNodes.some(n => n.id === tId);
      }).map(link => ({
        ...link,
        source: typeof link.source === 'object' ? link.source.id : link.source,
        target: typeof link.target === 'object' ? link.target.id : link.target
      }))
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

  // Automated Guest Submission Handler with Clean Tag Proposal Extraction
  const handleSubmitCorrection = () => {
    if (!feedbackNote.trim()) return;

    const proposedVal = extractProposedTag(feedbackNote, feedbackCategory);
    
    const newFb = {
      id: `fb_${Date.now()}`,
      guestId: feedbackTargetNode ? feedbackTargetNode.id : 'unknown',
      guestName: feedbackTargetNode ? feedbackTargetNode.name : 'Guest',
      category: feedbackCategory,
      note: feedbackNote,
      proposedValue: proposedVal,
      timestamp: 'Just now',
      applied: false
    };

    setFeedbackList([newFb, ...feedbackList]);
    setIsFeedbackModalOpen(false);
    setFeedbackNote('');

    setToastMessage(`Thank you! Maureen & Matt received your edit suggestion.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Apply Feedback Correction with EXPLICIT Visual Diff Confirmation and Camera Focus!
  const handleApplyCorrection = (fb) => {
    const targetNode = nodes.find(n => n.id === fb.guestId || n.name.toLowerCase() === fb.guestName.toLowerCase());
    const finalVal = fb.proposedValue || extractProposedTag(fb.note, fb.category);

    if (targetNode && finalVal) {
      if (fb.category === 'Missing Interest') {
        const updatedHobbies = [...(targetNode.hobbies || [])];
        if (!updatedHobbies.includes(finalVal)) {
          updatedHobbies.push(finalVal);
        }
        targetNode.hobbies = updatedHobbies;
        setToastMessage(`Added "${finalVal}" tag to ${targetNode.name}'s profile!`);
      } else if (fb.category === 'Family Status Update') {
        targetNode.familyStatus = finalVal;
        setToastMessage(`Updated ${targetNode.name}'s family status to "${finalVal}"!`);
      } else {
        targetNode.relationship = finalVal;
        setToastMessage(`Updated ${targetNode.name}'s note to "${finalVal}"!`);
      }

      flyToNode(targetNode);
      setSelectedNode({ ...targetNode });
    }

    setNodes([...nodes]);
    setFeedbackList(prev => prev.map(item => item.id === fb.id ? { ...item, applied: true } : item));
    persistNodesToDisk(nodes);

    setTimeout(() => setToastMessage(''), 4000);
  };

  // Dynamic Layout Math: Renders Cohort Hulls in 100% Native World Space
  const drawBackgroundHulls = useCallback((ctx, globalScale) => {
    const placedLabelBoxes = [];

    // Pre-populate placedLabelBoxes with visible node card bounding boxes so cluster titles avoid covering guest cards
    filteredNodes.forEach(n => {
      if (n.x !== undefined && n.y !== undefined) {
        const b = getNodeBounds(n, showHeadshots, nodeScaleMultiplier);
        placedLabelBoxes.push({
          x: n.x - b.width / 2,
          y: n.y - b.height / 2,
          width: b.width,
          height: b.height
        });
      }
    });

    const maureen = filteredNodes.find(n => n.id === 'maureen');
    const matt = filteredNodes.find(n => n.id === 'matt');

    if (maureen && matt && maureen.x !== undefined && matt.x !== undefined) {
      const mBounds = getNodeBounds(maureen, showHeadshots, nodeScaleMultiplier);
      const tBounds = getNodeBounds(matt, showHeadshots, nodeScaleMultiplier);

      const minX = Math.min(maureen.x - mBounds.width / 2, matt.x - tBounds.width / 2);
      const maxX = Math.max(maureen.x + mBounds.width / 2, matt.x + tBounds.width / 2);
      const minY = Math.min(maureen.y - mBounds.height / 2, matt.y - tBounds.height / 2);
      const maxY = Math.max(maureen.y + mBounds.height / 2, matt.y + tBounds.height / 2);

      const padding = 28 * nodeScaleMultiplier;
      const width = (maxX - minX) + padding * 2;
      const height = (maxY - minY) + padding * 2;
      const x = minX - padding;
      const y = minY - padding;
      const cornerRadius = 20 * nodeScaleMultiplier;

      ctx.save();
      ctx.shadowColor = 'rgba(56, 189, 248, 0.15)';
      ctx.shadowBlur = 12 / globalScale;
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
      ctx.font = `800 ${22 * nodeScaleMultiplier}px Inter, sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText('THE COUPLE (MAUREEN & MATT)', minX + (maxX - minX) / 2, y - 12);
      ctx.restore();
    }

    if (clusterMode === 'none') return;

    let clusterGroups = {};

    if (clusterMode === 'interests') {
      clusterGroups = dynamicAutoClusters;
    } else if (clusterMode === 'locations') {
      clusterGroups = dynamicLocationClusters;
    } else if (clusterMode === 'current_location') {
      clusterGroups = dynamicCurrentLocationClusters;
    } else if (clusterMode === 'original_location') {
      clusterGroups = dynamicOriginalLocationClusters;
    } else {
      filteredNodes.forEach(node => {
        if (node.cohort && node.cohort !== 'The Couple' && node.x !== undefined) {
          const key = `${node.cohort} Cluster`;
          if (!clusterGroups[key]) clusterGroups[key] = [];
          clusterGroups[key].push(node);
        }
      });
    }

// 2D Andrew's Monotone Chain Convex Hull Algorithm for Organic Blob Clusters
function getConvexHull2D(points) {
  if (!points || points.length <= 2) return points;
  const sorted = [...points].sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const lower = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }

  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

    let colorIdx = 0;
    Object.entries(clusterGroups).forEach(([label, nodesArr]) => {
      if (nodesArr.length > 1) {
        // Collect padded bounding corners of member nodes for convex hull calculation
        const points = [];
        const pad = 24 * nodeScaleMultiplier;

        nodesArr.forEach(n => {
          const b = getNodeBounds(n, showHeadshots, nodeScaleMultiplier);
          const halfW = b.width / 2 + pad;
          const halfH = b.height / 2 + pad;

          points.push({ x: n.x - halfW, y: n.y - halfH });
          points.push({ x: n.x + halfW, y: n.y - halfH });
          points.push({ x: n.x + halfW, y: n.y + halfH });
          points.push({ x: n.x - halfW, y: n.y + halfH });
        });

        const hull = getConvexHull2D(points);

        let clusterColor;
        if (label.startsWith('🏡 Originally:')) {
          clusterColor = '#f59e0b'; // Warm Amber Gold for Origins
        } else if (label.startsWith('📍 Lives in:')) {
          clusterColor = '#06b6d4'; // Vibrant Cyan for Current Living Locations
        } else {
          clusterColor = COHORT_COLORS[label.replace(' Cluster', '')] || DYNAMIC_CLUSTER_COLORS[colorIdx % DYNAMIC_CLUSTER_COLORS.length];
        }
        colorIdx++;

        ctx.save();
        ctx.fillStyle = isLightMode ? hexToRgba(clusterColor, 0.08) : hexToRgba(clusterColor, 0.06);
        ctx.beginPath();

        const numPoints = hull.length;
        if (numPoints > 2) {
          const xc0 = (hull[numPoints - 1].x + hull[0].x) / 2;
          const yc0 = (hull[numPoints - 1].y + hull[0].y) / 2;
          ctx.moveTo(xc0, yc0);

          for (let i = 0; i < numPoints; i++) {
            const next = hull[(i + 1) % numPoints];
            const xc = (hull[i].x + next.x) / 2;
            const yc = (hull[i].y + next.y) / 2;
            ctx.quadraticCurveTo(hull[i].x, hull[i].y, xc, yc);
          }
        }
        ctx.closePath();
        ctx.fill();

        ctx.lineWidth = 1.5 / globalScale;
        ctx.strokeStyle = hexToRgba(clusterColor, 0.45);
        ctx.setLineDash([6 / globalScale, 6 / globalScale]);
        ctx.stroke();

        // Position cluster label title above top-left hull vertex with AABB Non-Overlap Collision Avoidance!
        let topPoint = hull[0];
        hull.forEach(p => { if (p.y < topPoint.y) topPoint = p; });

        let labelX = topPoint.x;
        let labelY = topPoint.y - 14 * nodeScaleMultiplier;
        const fontSize = 22 * nodeScaleMultiplier;
        ctx.font = `800 ${fontSize}px Inter, sans-serif`;
        const textWidth = ctx.measureText(label.toUpperCase()).width || (120 * nodeScaleMultiplier);
        const textHeight = fontSize + 8;

        // Collision avoidance against guest cards and existing cluster titles
        let hasCollision = true;
        let attempts = 0;
        while (hasCollision && attempts < 6) {
          hasCollision = placedLabelBoxes.some(box => {
            return !(
              labelX + textWidth < box.x ||
              labelX > box.x + box.width ||
              labelY < box.y ||
              labelY - textHeight > box.y + box.height
            );
          });
          if (hasCollision) {
            labelY -= (textHeight + 12 * nodeScaleMultiplier);
            attempts++;
          }
        }

        placedLabelBoxes.push({
          x: labelX,
          y: labelY - textHeight,
          width: textWidth,
          height: textHeight
        });

        ctx.setLineDash([]);
        ctx.font = `800 ${fontSize}px Inter, sans-serif`;
        ctx.fillStyle = clusterColor;
        ctx.textAlign = 'left';
        ctx.fillText(label.toUpperCase(), labelX, labelY);
        ctx.restore();
      }
    });
  }, [filteredNodes, isLightMode, clusterMode, dynamicAutoClusters, showHeadshots, nodeScaleMultiplier]);

  // Modern Square Card Badge Renderer in NATIVE WORLD UNITS with Independent Node Scale Multiplier
  const drawNode = useCallback((node, ctx, globalScale) => {
    const isSelected = selectedNode?.id === node.id;
    const isHovered = hoverNode?.id === node.id || isSelected;

    const isPathNode = shortestPath.includes(node.id);
    const isPathActive = shortestPath.length > 0;

    const isConnected = hoverNode || selectedNode ? 
      links.some(l => {
        const sId = typeof l.source === 'object' ? l.source.id : l.source;
        const tId = typeof l.target === 'object' ? l.target.id : l.target;
        const targetId = hoverNode?.id || selectedNode?.id;
        return (sId === node.id && tId === targetId) || (tId === node.id && sId === targetId);
      }) : false;

    const isDimmed = isPathActive ? !isPathNode : ((hoverNode || selectedNode) && !isHovered && !isConnected);
    const groupColor = isPathNode ? '#38bdf8' : getNodeColor(node);
    const isAnchor = node.type === 'ANCHOR';
    const isHub = node.type === 'CONTEXT_HUB';
    const isNonAttending = node.type === 'NON_ATTENDING';

    let labelText = node.name || 'Guest';
    if (isHub) labelText = `📍 ${node.name}`;
    if (isNonAttending) labelText = `${node.name} (Not Attending)`;

    ctx.save();
    ctx.globalAlpha = isDimmed ? 0.12 : (isNonAttending ? 0.75 : 1.0);

    const renderAvatar = showHeadshots && !isHub;
    const bounds = getNodeBounds(node, showHeadshots, nodeScaleMultiplier);

    // Render in World Units scaled by Independent Node Size Multiplier
    const badgeWidth = bounds.width;
    const badgeHeight = bounds.height;
    const avatarDiameter = bounds.avatarDiameter;
    const fontSize = bounds.fontSize;

    const cornerRadius = 10 * nodeScaleMultiplier;
    const x = node.x - badgeWidth / 2;
    const y = node.y - badgeHeight / 2;

    if (isHovered || isAnchor || isPathNode) {
      ctx.shadowColor = groupColor;
      ctx.shadowBlur = 14 / globalScale;
    }

    // Card Outer Background Box
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, badgeWidth, badgeHeight, cornerRadius);
    } else {
      ctx.rect(x, y, badgeWidth, badgeHeight);
    }

    if (isHovered || isPathNode) {
      ctx.fillStyle = groupColor;
    } else if (isNonAttending) {
      ctx.fillStyle = isLightMode ? hexToRgba(groupColor, 0.15) : hexToRgba(groupColor, 0.22);
    } else if (isHub) {
      ctx.fillStyle = isLightMode ? '#e2e8f0' : 'rgba(51, 65, 85, 0.85)';
    } else if (isLightMode) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    } else {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    }
    ctx.fill();

    ctx.lineWidth = (isHovered || isPathNode ? 2.2 : 1.5) / globalScale;
    if (isHovered || isPathNode) {
      ctx.strokeStyle = '#ffffff';
    } else if (isNonAttending) {
      ctx.strokeStyle = hexToRgba(groupColor, 0.4);
    } else {
      ctx.strokeStyle = hexToRgba(groupColor, 0.7);
    }
    
    if (isNonAttending) {
      ctx.setLineDash([3 / globalScale, 3 / globalScale]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.stroke();

    // RENDER CIRCULAR HEADSHOT AVATAR PHOTO / MONOGRAM IN NATIVE WORLD SPACE
    if (renderAvatar) {
      const avatarX = node.x;
      const avatarY = y + (avatarDiameter / 2) + 8 * nodeScaleMultiplier;

      ctx.save();
      
      // Outer Glowing Ring Accent
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, (avatarDiameter / 2) + 2 * nodeScaleMultiplier, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered || isPathNode ? '#ffffff' : groupColor;
      ctx.lineWidth = 2 / globalScale;
      ctx.stroke();

      // Circular Clip for Headshot Photo
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarDiameter / 2, 0, Math.PI * 2);
      ctx.clip();

      if (node.image && imageCacheRef.current[node.image]) {
        const img = imageCacheRef.current[node.image];
        ctx.drawImage(img, avatarX - avatarDiameter / 2, avatarY - avatarDiameter / 2, avatarDiameter, avatarDiameter);
      } else {
        // High-Contrast Monogram Avatar Fallback
        ctx.fillStyle = groupColor;
        ctx.fill();

        ctx.font = `800 ${isAnchor ? 16 * nodeScaleMultiplier : 13 * nodeScaleMultiplier}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(getInitials(node.name), avatarX, avatarY);
      }
      ctx.restore();

      // Guest Name Text Below Avatar
      ctx.shadowBlur = 0;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${isAnchor || isHovered || isPathNode ? '700' : '600'} ${fontSize}px Inter, sans-serif`;
      ctx.fillStyle = isHovered || isPathNode ? '#ffffff' : (isNonAttending ? '#94a3b8' : (isLightMode ? '#0f172a' : '#f8fafc'));
      
      const textY = y + badgeHeight - 9 * nodeScaleMultiplier;
      ctx.fillText(labelText, avatarX, textY);

    } else {
      // COMPACT TEXT BADGE VIEW (When Photos: OFF or Place Hub)
      ctx.shadowBlur = 0;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${isAnchor || isHovered || isPathNode ? '700' : '600'} ${fontSize}px Inter, sans-serif`;
      ctx.fillStyle = isHovered || isPathNode ? '#ffffff' : (isNonAttending ? '#94a3b8' : (isLightMode ? '#0f172a' : '#f8fafc'));
      ctx.fillText(labelText, node.x, node.y);
    }

    ctx.restore();
  }, [hoverNode, selectedNode, isLightMode, getNodeColor, shortestPath, links, showHeadshots, nodeScaleMultiplier]);

  // Hit area detection using exact getNodeBounds in Native World Units
  const drawPointerArea = useCallback((node, color, ctx) => {
    const bounds = getNodeBounds(node, showHeadshots, nodeScaleMultiplier);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(node.x - bounds.width / 2, node.y - bounds.height / 2, bounds.width, bounds.height);
    ctx.fill();
  }, [showHeadshots, nodeScaleMultiplier]);

  const activeColorMap = useMemo(() => {
    if (colorMode === 'side') return SIDE_COLORS;
    if (colorMode === 'state') return STATE_COLORS;
    return COHORT_COLORS;
  }, [colorMode]);

  if (!isUnlocked) {
    return (
      <div className="passcode-gate-container">
        <div className="glass-panel passcode-card">
          <div className="passcode-icon-ring">
            <Heart style={{ width: 30, height: 30, color: '#38bdf8' }} />
          </div>

          <h2 className="passcode-title">The Social Universe of Maureen & Matt</h2>
          <p className="passcode-subtitle">
            Enter the event passcode from your wedding invitation to unlock the interactive guest connection map.
          </p>

          <form onSubmit={handleUnlockPasscode} className="passcode-form">
            <div className="passcode-input-wrapper">
              <Key style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#38bdf8' }} />
              <input 
                type="password"
                placeholder="Enter event passcode..."
                className="passcode-input"
                value={inputPasscode}
                onChange={(e) => setInputPasscode(e.target.value)}
                autoFocus
              />
            </div>

            {passcodeError && (
              <div className="passcode-error-msg">
                {passcodeError}
              </div>
            )}

            <button type="submit" className="passcode-submit-btn">
              <Sparkles style={{ width: 18, height: 18 }} />
              <span>Unlock Social Universe</span>
            </button>
          </form>

          <div style={{ marginTop: 20, fontSize: 11, color: '#64748b' }}>
            Hint: Default passcode is <b>MaureenAndMatt2026</b>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`app-container ${isLightMode ? 'light-mode' : ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="glass-panel no-print" style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 200, padding: '10px 20px', background: '#0284c7', color: '#fff', fontSize: 13, fontWeight: 600, borderRadius: 9999, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 8, maxWidth: '90vw' }}>
          <CheckCircle2 style={{ width: 16, height: 16 }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Print Poster Header Banner */}
      <div className="print-poster-header">
        <h1>THE SOCIAL UNIVERSE OF MAUREEN & MATT</h1>
        <p>A Visual Map of Family, Friends & Connections</p>
      </div>

      {/* Streamlined Top Controls Bar (Desktop & Responsive Mobile Header) */}
      <div className="top-bar no-print">
        <div className="top-bar-left" style={{ flex: isMobileViewport ? 1 : 'initial' }}>
          <div className="glass-panel brand-badge">
            <Heart style={{ width: 14, height: 14, color: '#38bdf8' }} />
            <span>Maureen & Matt</span>
          </div>

          {/* Search Box */}
          <div className="glass-panel search-box">
            <Search style={{ width: 14, height: 14, color: '#94a3b8', marginRight: 8, flexShrink: 0 }} />
            <input 
              type="text"
              placeholder={isMobileViewport ? "Search..." : "Search guests, cohorts, or interests..."}
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X style={{ width: 14, height: 14, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSearchQuery('')} />
            )}
          </div>

          {/* Multi-Select Interest Dropdown (Desktop view) */}
          {!isMobileViewport && (
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
                          {interest}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE CONTROLS DRAWER TRIGGER BUTTON */}
        {isMobileViewport ? (
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMobileControlsOpen(true);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMobileControlsOpen(true);
            }}
            className="glass-panel btn-action"
            style={{ 
              padding: '10px 18px', 
              background: '#0284c7', 
              color: '#ffffff', 
              borderRadius: 9999, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              pointerEvents: 'auto',
              zIndex: 300,
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(2, 132, 199, 0.5)',
              fontWeight: 800
            }}
          >
            <SlidersHorizontal style={{ width: 18, height: 18 }} />
            <span>Controls 🎛️</span>
          </button>
        ) : (
          /* DESKTOP CONTROLS BAR */
          <div className="top-bar-right desktop-only-controls">
            {/* DYNAMIC ORBIT MOTION TOGGLE & SPEED SLIDER */}
            <div className="glass-panel color-mode-bar" style={{ padding: '4px 10px', gap: 6 }}>
              <button 
                onClick={() => setIsOrbiting(!isOrbiting)}
                className={`btn-mode ${isOrbiting ? 'active' : ''}`}
                style={{ padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5, background: isOrbiting ? '#8b5cf6' : 'transparent', color: isOrbiting ? '#fff' : '#94a3b8' }}
                title="Toggle Celestial Galaxy Orbit Animation"
              >
                <RotateCw style={{ width: 13, height: 13, animation: isOrbiting ? 'spin 10s linear infinite' : 'none' }} />
                <span>Orbit: {isOrbiting ? 'ON' : 'OFF'}</span>
              </button>
              {isOrbiting && (
                <>
                  <input 
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={orbitSpeed}
                    onChange={(e) => setOrbitSpeed(parseFloat(e.target.value))}
                    style={{ width: 50, accentColor: '#8b5cf6', cursor: 'pointer' }}
                    title="Orbit Speed Multiplier"
                  />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#a855f7', minWidth: 26 }}>
                    {orbitSpeed.toFixed(1)}x
                  </span>
                </>
              )}
            </div>

            {/* INDEPENDENT NODE SIZE SLIDER CONTROL */}
            <div className="glass-panel color-mode-bar" style={{ padding: '4px 10px', gap: 6 }}>
              <Sliders style={{ width: 14, height: 14, color: '#38bdf8' }} />
              <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600 }}>Size:</span>
              <input 
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={nodeScaleMultiplier}
                onChange={(e) => setNodeScaleMultiplier(parseFloat(e.target.value))}
                style={{ width: 55, accentColor: '#38bdf8', cursor: 'pointer' }}
                title="Independent Node Card Size Slider"
              />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', minWidth: 26 }}>
                {nodeScaleMultiplier.toFixed(1)}x
              </span>
            </div>

            {/* INDEPENDENT MAP DENSITY / EDGE LENGTH SLIDER CONTROL */}
            <div className="glass-panel color-mode-bar" style={{ padding: '4px 10px', gap: 6 }}>
              <MoveHorizontal style={{ width: 14, height: 14, color: '#10b981' }} />
              <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600 }}>Density:</span>
              <input 
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={edgeLengthMultiplier}
                onChange={(e) => setEdgeLengthMultiplier(parseFloat(e.target.value))}
                style={{ width: 55, accentColor: '#10b981', cursor: 'pointer' }}
                title="Independent Map Density / Edge Length Slider"
              />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', minWidth: 26 }}>
                {edgeLengthMultiplier.toFixed(1)}x
              </span>
            </div>

            {/* Headshots Photo Toggle Button */}
            <button 
              onClick={() => setShowHeadshots(!showHeadshots)}
              className={`glass-panel btn-mode ${showHeadshots ? 'active' : ''}`}
              style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
              title="Toggle Headshot Photos on Node Cards"
            >
              <Camera style={{ width: 14, height: 14, color: showHeadshots ? '#fff' : '#ec4899' }} />
              <span>Photos: {showHeadshots ? 'ON' : 'OFF'}</span>
            </button>

            {/* Cluster Overlay Mode Dropdown Selector */}
            <div className="glass-panel color-mode-bar">
              <Layers style={{ width: 14, height: 14, color: '#ec4899' }} />
              <span style={{ color: '#94a3b8', fontSize: 11 }}>Clusters:</span>
              <select 
                value={clusterMode}
                onChange={(e) => setClusterMode(e.target.value)}
                style={{ background: 'none', border: 'none', color: isLightMode ? '#0f172a' : '#f8fafc', fontSize: 11, fontWeight: 600, outline: 'none', cursor: 'pointer' }}
              >
                <option value="cohort" style={{ background: '#0f172a', color: '#fff' }}>Cohorts</option>
                <option value="locations" style={{ background: '#0f172a', color: '#fff' }}>Locations</option>
                <option value="current_location" style={{ background: '#0f172a', color: '#fff' }}>Current Location</option>
                <option value="original_location" style={{ background: '#0f172a', color: '#fff' }}>Original Location</option>
                <option value="interests" style={{ background: '#0f172a', color: '#fff' }}>Interests</option>
                <option value="none" style={{ background: '#0f172a', color: '#fff' }}>Off (Hide)</option>
              </select>
            </div>

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

            {/* Guest Edit Submission Trigger */}
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

            {/* ADMIN ONLY CONTROLS */}
            {isAdmin && (
              <>
                {/* Copy Auto-Unlock QR Invitation Link */}
                <button 
                  onClick={handleCopyQrLink}
                  className="glass-panel btn-mode"
                  style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, borderColor: '#38bdf8' }}
                  title="Copy pre-authenticated QR code invitation link with ?passcode="
                >
                  <Copy style={{ width: 14, height: 14, color: '#38bdf8' }} />
                  <span>Copy QR Link</span>
                </button>

                {/* Host Feedback Admin Queue Button */}
                {feedbackList.some(f => !f.applied) && (
                  <button 
                    onClick={() => setIsHostQueueOpen(!isHostQueueOpen)}
                    className={`glass-panel btn-mode ${isHostQueueOpen ? 'active' : ''}`}
                    style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b' }}
                    title="View Submitted Guest Metadata Corrections (Host Admin Only)"
                  >
                    <Inbox style={{ width: 14, height: 14, color: '#f59e0b' }} />
                    <span>Feedback ({feedbackList.filter(f => !f.applied).length})</span>
                  </button>
                )}

                {/* Download updated sampleData.js for Git */}
                <button 
                  onClick={downloadSampleDataJs}
                  className="glass-panel btn-mode"
                  style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, borderColor: '#10b981' }}
                  title="Download updated sampleData.js for Git repository (Host Admin Only)"
                >
                  <Download style={{ width: 14, height: 14, color: '#10b981' }} />
                  <span>Export Git JS</span>
                </button>
              </>
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
        )}
      </div>

      {/* MOBILE CONTROLS BOTTOM SHEET DRAWER MODAL */}
      {isMobileControlsOpen && (
        <>
          <div className="mobile-sheet-backdrop" onClick={() => setIsMobileControlsOpen(false)} onTouchEnd={() => setIsMobileControlsOpen(false)} />
          <div 
            className="mobile-controls-sheet no-print"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 14 }}>
                <SlidersHorizontal style={{ width: 16, height: 16, color: '#38bdf8' }} />
                <span>Map Controls</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button 
                  type="button"
                  onClick={() => setIsOrbiting(!isOrbiting)}
                  className={`btn-mode ${isOrbiting ? 'active' : ''}`}
                  style={{ padding: '4px 10px', borderRadius: 9999, background: isOrbiting ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)', color: '#fff', fontSize: 11, fontWeight: 700 }}
                >
                  Orbit: {isOrbiting ? 'ON' : 'OFF'}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsMobileControlsOpen(false)}
                  onTouchEnd={() => setIsMobileControlsOpen(false)}
                  style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>

            {/* Orbit Speed Slider */}
            {isOrbiting && (
              <div style={{ marginBottom: 8, background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.25)', padding: 8, borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Orbit Speed:</span>
                  <span style={{ color: '#a855f7', fontWeight: 800 }}>{orbitSpeed.toFixed(1)}x</span>
                </div>
                <input 
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.05"
                  value={orbitSpeed}
                  onChange={(e) => setOrbitSpeed(parseFloat(e.target.value))}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  style={{ width: '100%', accentColor: '#a855f7', height: 10, touchAction: 'none' }}
                />
              </div>
            )}

            {/* Card Node Size & Map Spacing Sliders */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: 8, borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                  <span style={{ color: '#94a3b8', fontWeight: 600 }}>Node Size:</span>
                  <span style={{ color: '#38bdf8', fontWeight: 800 }}>{nodeScaleMultiplier.toFixed(1)}x</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={nodeScaleMultiplier}
                  onChange={(e) => setNodeScaleMultiplier(parseFloat(e.target.value))}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  style={{ width: '100%', accentColor: '#38bdf8', height: 10, touchAction: 'none' }}
                />
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: 8, borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                  <span style={{ color: '#94a3b8', fontWeight: 600 }}>Spacing:</span>
                  <span style={{ color: '#10b981', fontWeight: 800 }}>{edgeLengthMultiplier.toFixed(1)}x</span>
                </div>
                <input 
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={edgeLengthMultiplier}
                  onChange={(e) => setEdgeLengthMultiplier(parseFloat(e.target.value))}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  style={{ width: '100%', accentColor: '#10b981', height: 10, touchAction: 'none' }}
                />
              </div>
            </div>

            {/* Quick Action Toggles */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <button 
                onClick={() => setShowHeadshots(!showHeadshots)}
                className={`btn-mode ${showHeadshots ? 'active' : ''}`}
                style={{ flex: 1, padding: '6px', borderRadius: 10, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              >
                <Camera style={{ width: 12, height: 12 }} />
                <span>Photos {showHeadshots ? 'ON' : 'OFF'}</span>
              </button>
              <button 
                onClick={() => setIsLightMode(!isLightMode)}
                className="btn-mode"
                style={{ flex: 1, padding: '6px', borderRadius: 10, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, background: 'rgba(255, 255, 255, 0.08)' }}
              >
                {isLightMode ? <Moon style={{ width: 12, height: 12 }} /> : <Sun style={{ width: 12, height: 12, color: '#38bdf8' }} />}
                <span>{isLightMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>

            {/* SCROLL DOWN UI HINT BANNER */}
            <div style={{ fontSize: 10, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', textAlign: 'center', margin: '8px 0', padding: '6px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <ChevronDown style={{ width: 14, height: 14, color: '#38bdf8' }} />
              <span>Scroll down for Overlays, Color Modes & Tools</span>
              <ChevronDown style={{ width: 14, height: 14, color: '#38bdf8' }} />
            </div>

            {/* Cluster Overlays */}
            <div className="mobile-control-row" style={{ marginTop: 8 }}>
              <span className="mobile-control-label" style={{ fontSize: 11, fontWeight: 700, color: '#ec4899', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                <Layers style={{ width: 13, height: 13 }} /> Cluster Overlays:
              </span>
              <select 
                value={clusterMode}
                onChange={(e) => setClusterMode(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: 10, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', outline: 'none', fontSize: 12 }}
              >
                <option value="cohort">Cohorts</option>
                <option value="locations">Locations</option>
                <option value="current_location">Current Location</option>
                <option value="original_location">Original Location</option>
                <option value="interests">Interests</option>
                <option value="none">Off (Hide)</option>
              </select>
            </div>

            {/* Color Mode Selector */}
            <div className="mobile-control-row" style={{ marginTop: 8 }}>
              <span className="mobile-control-label" style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                <Palette style={{ width: 13, height: 13 }} /> Card Color Mode:
              </span>
              <div style={{ display: 'flex', gap: 4, background: 'rgba(30, 41, 59, 0.6)', padding: 3, borderRadius: 10 }}>
                <button onClick={() => setColorMode('cohort')} className={`btn-mode ${colorMode === 'cohort' ? 'active' : ''}`} style={{ flex: 1, padding: 6, fontSize: 11 }}>Cohort</button>
                <button onClick={() => setColorMode('side')} className={`btn-mode ${colorMode === 'side' ? 'active' : ''}`} style={{ flex: 1, padding: 6, fontSize: 11 }}>Side</button>
                <button onClick={() => setColorMode('state')} className={`btn-mode ${colorMode === 'state' ? 'active' : ''}`} style={{ flex: 1, padding: 6, fontSize: 11 }}>State</button>
              </div>
            </div>

            {/* Action Tools Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
              <button 
                onClick={() => { setIsPathMode(!isPathMode); setIsMobileControlsOpen(false); }} 
                className={`btn-mode ${isPathMode ? 'active' : ''}`}
                style={{ padding: '10px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: isPathMode ? '#0284c7' : 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontWeight: 700 }}
              >
                <Compass style={{ width: 14, height: 14 }} /> Path Finder Calculator
              </button>

              <button 
                onClick={() => { setIsMatchmakerOpen(!isMatchmakerOpen); setIsMobileControlsOpen(false); }}
                className="btn-mode"
                style={{ padding: '10px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 700 }}
              >
                <Wand2 style={{ width: 14, height: 14 }} /> Cocktail Hour Matchmaker
              </button>

              <button 
                onClick={() => { setFeedbackTargetNode(selectedNode || nodes[0]); setIsFeedbackModalOpen(true); setIsMobileControlsOpen(false); }}
                className="btn-mode"
                style={{ padding: '10px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(255, 255, 255, 0.08)', color: '#fff' }}
              >
                <Edit3 style={{ width: 14, height: 14 }} /> Suggest Profile Edit
              </button>

              {isAdmin && (
                <button 
                  onClick={handleCopyQrLink}
                  className="btn-mode"
                  style={{ padding: '10px', borderRadius: 10, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid #38bdf8' }}
                >
                  <Copy style={{ width: 14, height: 14 }} /> Copy Invitation QR Link
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Path Finder Active Breadcrumb Banner */}
      {isPathMode && (
        <div className="glass-panel path-finder-banner no-print">
          <GitCommit style={{ width: 16, height: 16, color: '#38bdf8', flexShrink: 0 }} />
          {!pathStart && <span>Click <b>First Guest</b>...</span>}
          {pathStart && !pathEnd && <span>Selected <span className="path-step">{pathStart.name}</span>. Click <b>Second Guest</b>...</span>}
          {pathStart && pathEnd && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto' }}>
              <span>Path:</span>
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
                style={{ marginLeft: 6, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Host Feedback Admin Queue Drawer (Admin Only) */}
      {isAdmin && isHostQueueOpen && (
        <div className="glass-panel metadata-drawer no-print" style={{ left: isMobileViewport ? 12 : 24, right: isMobileViewport ? 12 : 'auto', zIndex: 40, width: isMobileViewport ? 'auto' : 380 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="drawer-badge" style={{ backgroundColor: '#f59e0b', display: 'flex', alignItems: 'center', gap: 6, color: '#000' }}>
                <Inbox style={{ width: 12, height: 12 }} /> Host Feedback Queue (Admin)
              </span>
              <button onClick={() => setIsHostQueueOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <h2 className="drawer-title" style={{ fontSize: 20 }}>Review Guest Edit Submissions</h2>
            <p className="drawer-subtitle">Inspect proposed tag diffs before applying to graph:</p>

            <div className="drawer-section">
              {feedbackList.map(fb => {
                const target = nodes.find(n => n.id === fb.guestId || n.name.toLowerCase() === fb.guestName.toLowerCase());
                const proposedTag = fb.proposedValue || extractProposedTag(fb.note, fb.category);

                return (
                  <div key={fb.id} className="icebreaker-box" style={{ borderColor: fb.applied ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.5)', padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 13 }}>
                      <span>{fb.guestName}</span>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{fb.timestamp}</span>
                    </div>

                    <p style={{ fontSize: 12, color: '#cbd5e1', margin: '4px 0 10px 0', fontStyle: 'italic' }}>
                      "{fb.note}"
                    </p>

                    {!fb.applied ? (
                      <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: 10, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: 10 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Tag style={{ width: 12, height: 12 }} /> Proposed Change ({fb.category}):
                        </div>

                        {fb.category === 'Missing Interest' && (
                          <div style={{ fontSize: 12 }}>
                            <span style={{ color: '#94a3b8' }}>Current Interests: </span>
                            <span style={{ color: '#fff', fontWeight: 600 }}>
                              {target && target.hobbies ? target.hobbies.join(', ') : 'None'}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                              <span style={{ color: '#10b981', fontWeight: 700 }}>+ Add Tag:</span>
                              <input 
                                type="text"
                                value={proposedTag}
                                onChange={(e) => handleUpdateProposedValue(fb.id, e.target.value)}
                                style={{ flex: 1, padding: '4px 8px', borderRadius: 6, background: 'rgba(30, 41, 59, 0.9)', color: '#34d399', border: '1px solid #10b981', fontWeight: 700, fontSize: 12, outline: 'none' }}
                              />
                            </div>
                          </div>
                        )}

                        {fb.category === 'Family Status Update' && (
                          <div style={{ fontSize: 12 }}>
                            <span style={{ color: '#94a3b8' }}>Current Family: </span>
                            <span style={{ color: '#fff' }}>{target ? target.familyStatus || 'None' : ''}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                              <span style={{ color: '#f59e0b', fontWeight: 700 }}>➔ Update to:</span>
                              <input 
                                type="text"
                                value={proposedTag}
                                onChange={(e) => handleUpdateProposedValue(fb.id, e.target.value)}
                                style={{ flex: 1, padding: '4px 8px', borderRadius: 6, background: 'rgba(30, 41, 59, 0.9)', color: '#fbbf24', border: '1px solid #f59e0b', fontWeight: 700, fontSize: 12, outline: 'none' }}
                              />
                            </div>
                          </div>
                        )}

                        {fb.category !== 'Missing Interest' && fb.category !== 'Family Status Update' && (
                          <div style={{ fontSize: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ color: '#38bdf8', fontWeight: 700 }}>➔ Note Edit:</span>
                              <input 
                                type="text"
                                value={proposedTag}
                                onChange={(e) => handleUpdateProposedValue(fb.id, e.target.value)}
                                style={{ flex: 1, padding: '4px 8px', borderRadius: 6, background: 'rgba(30, 41, 59, 0.9)', color: '#38bdf8', border: '1px solid #38bdf8', fontWeight: 700, fontSize: 12, outline: 'none' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: 11, color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                        <CheckCircle2 style={{ width: 14, height: 14 }} /> Applied Tag: "{proposedTag}" to Canvas & Focus Camera
                      </div>
                    )}

                    {!fb.applied && (
                      <button 
                        onClick={() => handleApplyCorrection(fb)}
                        className="btn-mode"
                        style={{ padding: '8px 12px', background: '#10b981', color: '#fff', borderRadius: 9999, fontSize: 11, display: 'flex', alignItems: 'center', gap: 6, width: '100%', justifyContent: 'center', fontWeight: 700 }}
                      >
                        <Check style={{ width: 14, height: 14 }} /> Approve & Add "{proposedTag}" Tag to Canvas
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <button 
                onClick={downloadSampleDataJs}
                className="btn-action"
                style={{ width: '100%', background: '#0284c7', color: '#fff', justifyContent: 'center' }}
              >
                <Download style={{ width: 14, height: 14 }} />
                <span>Export sampleData.js for Git Repository</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guest Report Correction Modal */}
      {isFeedbackModalOpen && (
        <div className="app-container no-print" style={{ position: 'fixed', zIndex: 160, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <div className="glass-panel" style={{ width: 440, maxWidth: '100%', padding: 24, borderRadius: 24 }}>
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
        <div className="glass-panel metadata-drawer no-print" style={{ left: isMobileViewport ? 12 : 24, right: isMobileViewport ? 12 : 'auto', zIndex: 40, width: isMobileViewport ? 'auto' : 380 }}>
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
                    onClick={() => { flyToNode(res.node); if (isMobileViewport) setIsMatchmakerOpen(false); }}
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
        <span style={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.08em', flexShrink: 0 }}>Legend:</span>
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
          nodeId="id"
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          warmupTicks={200}
          cooldownTicks={250}
          nodeCanvasObject={drawNode}
          nodePointerAreaPaint={drawPointerArea}
          onNodeClick={handleNodeClick}
          onNodeDrag={handleNodeDrag}
          onNodeDragEnd={handleNodeDragEnd}
          onNodeHover={(node) => !isMobileViewport && setHoverNode(node)}
          onZoom={handleZoom}
          onRenderFramePre={(ctx, globalScale) => drawBackgroundHulls(ctx, globalScale)}
          linkColor={(link) => {
            const s = typeof link.source === 'object' ? link.source.id : link.source;
            const t = typeof link.target === 'object' ? link.target.id : link.target;
            
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
            const s = typeof link.source === 'object' ? link.source.id : link.source;
            const t = typeof link.target === 'object' ? link.target.id : link.target;
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
          velocityDecay={0.65}
          linkDirectionalParticles={0}
          backgroundColor="transparent"
        />
      </div>

      {/* Instant Hover Tooltip Popup Overlay (Desktop only) */}
      {!isMobileViewport && hoverNode && !selectedNode && !isPathMode && (
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
          {hoverNode.originallyFrom && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#cbd5e1', marginBottom: 2 }}>
              <Home style={{ width: 12, height: 12, color: '#f59e0b' }} />
              <span>Originally from: {hoverNode.originallyFrom}</span>
            </div>
          )}
          {hoverNode.currentlyLivesIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}>
              <MapPin style={{ width: 12, height: 12, color: '#38bdf8' }} />
              <span>Currently lives in: {hoverNode.currentlyLivesIn}</span>
            </div>
          )}
          {hoverNode.hobbies && (
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
              {hoverNode.hobbies.map(h => (
                <span key={h} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 600 }}>
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Glassmorphism Metadata Side Drawer / Mobile Bottom Sheet */}
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
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 }}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <h2 className="drawer-title" style={{ margin: 0 }}>{selectedNode.name}</h2>
              {!isEditingDrawer && (
                <button 
                  onClick={() => setIsEditingDrawer(true)}
                  className="btn-mode"
                  style={{ fontSize: 11, padding: '4px 10px', borderRadius: 9999, background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Edit3 style={{ width: 12, height: 12 }} /> Edit Profile
                </button>
              )}
            </div>

            {!isEditingDrawer ? (
              /* VIEW MODE */
              <>
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
                  {(selectedNode.originallyFrom || selectedNode.hometown) && (
                    <div className="drawer-info-row">
                      <Home style={{ width: 16, height: 16, color: '#f59e0b' }} />
                      <span>Originally from: {selectedNode.originallyFrom || selectedNode.hometown}</span>
                    </div>
                  )}
                  {(selectedNode.currentlyLivesIn || selectedNode.state) && (
                    <div className="drawer-info-row">
                      <MapPin style={{ width: 16, height: 16, color: '#38bdf8' }} />
                      <span>Currently lives in: {selectedNode.currentlyLivesIn || selectedNode.state}</span>
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
                        <span>Interests:</span>
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
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* DIRECT IN-SITU EDIT MODE FOR GUESTS - ALL METADATA */
              <div className="drawer-section" style={{ marginTop: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Edit3 style={{ width: 14, height: 14 }} /> Direct Metadata Profile Editor
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Profile Blurb / Relationship Note:</label>
                  <textarea 
                    rows={2}
                    value={editRelationship}
                    onChange={(e) => setEditRelationship(e.target.value)}
                    style={{ width: '100%', padding: 8, borderRadius: 10, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12, resize: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Interests (Click ✕ to remove or add below):</label>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
                    {editHobbies.map(h => (
                      <span key={h} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 9999, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {h}
                        <X style={{ width: 12, height: 12, cursor: 'pointer' }} onClick={() => handleRemoveInterestTag(h)} />
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input 
                      type="text"
                      placeholder="Add interest (e.g. Wine, Cycling)"
                      value={newInterestInput}
                      onChange={(e) => setNewInterestInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddInterestTag()}
                      style={{ flex: 1, padding: '6px 10px', borderRadius: 8, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                    />
                    <button 
                      onClick={handleAddInterestTag}
                      className="btn-mode"
                      style={{ padding: '6px 12px', background: '#10b981', color: '#fff', borderRadius: 8, fontSize: 12 }}
                    >
                      <Plus style={{ width: 14, height: 14 }} /> Add
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Originally from:</label>
                    <input 
                      type="text"
                      value={editOriginallyFrom}
                      onChange={(e) => setEditOriginallyFrom(e.target.value)}
                      placeholder="e.g. Seattle, WA or London, UK"
                      style={{ width: '100%', padding: '6px 10px', borderRadius: 8, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Currently lives in:</label>
                    <input 
                      type="text"
                      value={editCurrentlyLivesIn}
                      onChange={(e) => setEditCurrentlyLivesIn(e.target.value)}
                      placeholder="e.g. Atlanta, GA or Tokyo, Japan"
                      style={{ width: '100%', padding: '6px 10px', borderRadius: 8, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Cohort / Group:</label>
                    <input 
                      type="text"
                      value={editCohort}
                      onChange={(e) => setEditCohort(e.target.value)}
                      placeholder="e.g. Cornell, Family"
                      style={{ width: '100%', padding: '6px 10px', borderRadius: 8, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Wedding Side:</label>
                    <select 
                      value={editSide}
                      onChange={(e) => setEditSide(e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', borderRadius: 8, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                    >
                      <option value="Maureen">Maureen</option>
                      <option value="Matt">Matt</option>
                      <option value="Joint">Joint</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Family Status / Notes:</label>
                  <input 
                    type="text"
                    value={editFamilyStatus}
                    onChange={(e) => setEditFamilyStatus(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: 8, background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', outline: 'none', fontSize: 12 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button 
                    onClick={() => setIsEditingDrawer(false)}
                    className="btn-mode"
                    style={{ flex: 1, padding: '8px', background: 'rgba(255, 255, 255, 0.1)', color: '#fff', borderRadius: 9999, fontSize: 12, justifyContent: 'center' }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveProfileEdits}
                    className="btn-action"
                    style={{ flex: 1, padding: '8px', background: '#10b981', color: '#fff', borderRadius: 9999, fontSize: 12, justifyContent: 'center' }}
                  >
                    <Save style={{ width: 14, height: 14 }} /> Save Edits
                  </button>
                </div>
              </div>
            )}
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
