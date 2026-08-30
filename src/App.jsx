import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  SlidersHorizontal, X, Camera, Sun, Moon, Layers, Palette, 
  Compass, Wand2, Edit3, Copy, Download, Heart, ShieldAlert, Check
} from 'lucide-react';
import Papa from 'papaparse';

import { SAMPLE_NODES, SAMPLE_LINKS, SIDE_COLORS, STATE_COLORS, COHORT_COLORS, DYNAMIC_CLUSTER_COLORS } from './data/sampleData';
import { isSecretUrlAdmin, verifyPasscode, sanitizeInput } from './utils/security';
import { pushToGithubRepo, submitGuestProposalToGithub, fetchGuestProposalsFromGithub, closeGithubIssueProposal, generateSampleDataJsContent } from './utils/githubSync';
import TopHeaderNav from './components/TopHeaderNav';
import MobileControlsSheet from './components/MobileControlsSheet';
import GuestProfileDrawer from './components/GuestProfileDrawer';
import CocktailMatchmakerModal from './components/CocktailMatchmakerModal';
import SuggestEditModal from './components/SuggestEditModal';
import ForceCanvas from './components/ForceCanvas';
import HostAdminPanel from './components/HostAdminPanel';
import BulkCsvImportModal from './components/BulkCsvImportModal';
import AddConnectionModal from './components/AddConnectionModal';
import HostReviewQueueModal from './components/HostReviewQueueModal';
import HostSpreadsheetEditorModal from './components/HostSpreadsheetEditorModal';
import DynamicColorLegend from './components/DynamicColorLegend';

export default function App() {
  const fgRef = useRef();
  const imageCacheRef = useRef({});

  // Core Data State (Loads real 75-guest wedding dataset by default)
  useEffect(() => {
    // Purge legacy storage keys that contain old pre-migrated cohort names
    ['wedding_graph_nodes_master', 'wedding_graph_nodes_v7', 'wedding_graph_nodes_v3', 'wedding_graph_nodes_v4', 'wedding_graph_nodes_v8', 'wedding_graph_nodes_v9', 'wedding_graph_nodes_v10', 'wedding_graph_nodes_v11', 'wedding_graph_nodes_v12', 'wedding_graph_nodes_v13', 'wedding_graph_nodes_v14', 'wedding_graph_nodes_v15', 'wedding_graph_nodes_v16', 'wedding_graph_nodes_v17', 'wedding_graph_nodes_v18', 'wedding_graph_nodes_v19', 'wedding_graph_nodes_v20', 'wedding_graph_nodes_v21', 'wedding_graph_nodes_v22', 'wedding_graph_nodes_v23', 'wedding_graph_nodes_v24', 'wedding_graph_nodes_v25', 'wedding_graph_nodes_v26', 'wedding_graph_nodes_v27', 'wedding_graph_nodes_v28', 'wedding_graph_nodes_v29', 'wedding_graph_nodes_v30', 'wedding_graph_nodes_v31', 'wedding_graph_nodes_v32', 'wedding_graph_nodes_v33', 'wedding_graph_nodes_v34', 'wedding_graph_nodes_v35', 'wedding_graph_nodes_v36', 'wedding_graph_nodes_v37', 'wedding_graph_nodes_v38', 'wedding_graph_nodes_v39', 'wedding_graph_nodes_v40', 'wedding_graph_nodes_v41', 'wedding_graph_nodes_v42', 'wedding_graph_nodes_v43', 'wedding_graph_nodes_v44', 'wedding_graph_nodes_v45', 'wedding_graph_nodes_v46', 'wedding_graph_nodes_v47', 'wedding_graph_nodes_v48', 'wedding_graph_nodes_v49', 'wedding_graph_nodes_v50', 'wedding_graph_nodes_v51', 'wedding_graph_nodes_v52', 'wedding_graph_nodes_v53', 'wedding_graph_nodes_v54', 'wedding_graph_nodes_v55', 'wedding_graph_nodes_v56', 'wedding_graph_nodes_v57', 'wedding_graph_nodes_v58', 'wedding_graph_nodes_v59', 'wedding_graph_nodes_v60', 'wedding_graph_nodes_v61', 'wedding_graph_nodes_v62', 'wedding_graph_nodes_v63', 'wedding_graph_nodes_v64', 'wedding_graph_nodes_v65', 'wedding_graph_nodes_v66', 'wedding_graph_nodes_v67', 'wedding_graph_nodes_v68', 'wedding_graph_nodes_v69', 'wedding_graph_nodes_v70', 'wedding_graph_nodes_v71', 'wedding_graph_nodes_v72', 'wedding_graph_nodes_v73', 'wedding_graph_nodes_v74', 'wedding_graph_nodes_v75', 'wedding_graph_nodes_v76', 'wedding_graph_nodes_v77', 'wedding_graph_nodes_v78', 'wedding_graph_nodes_v79', 'wedding_graph_links_v7', 'wedding_graph_links_v3', 'wedding_graph_links_v10', 'wedding_graph_links_v11', 'wedding_graph_links_v12', 'wedding_graph_links_v13', 'wedding_graph_links_v14', 'wedding_graph_links_v15', 'wedding_graph_links_v16', 'wedding_graph_links_v17', 'wedding_graph_links_v18', 'wedding_graph_links_v19', 'wedding_graph_links_v20', 'wedding_graph_links_v21', 'wedding_graph_links_v22', 'wedding_graph_links_v23', 'wedding_graph_links_v24', 'wedding_graph_links_v25', 'wedding_graph_links_v26', 'wedding_graph_links_v27', 'wedding_graph_links_v28', 'wedding_graph_links_v29', 'wedding_graph_links_v30', 'wedding_graph_links_v31', 'wedding_graph_links_v32', 'wedding_graph_links_v33', 'wedding_graph_links_v34', 'wedding_graph_links_v35', 'wedding_graph_links_v36', 'wedding_graph_links_v37', 'wedding_graph_links_v38', 'wedding_graph_links_v39', 'wedding_graph_links_v40', 'wedding_graph_links_v41', 'wedding_graph_links_v42', 'wedding_graph_links_v43', 'wedding_graph_links_v44', 'wedding_graph_links_v45', 'wedding_graph_links_v46', 'wedding_graph_links_v47', 'wedding_graph_links_v48', 'wedding_graph_links_v49', 'wedding_graph_links_v50', 'wedding_graph_links_v51', 'wedding_graph_links_v52', 'wedding_graph_links_v53', 'wedding_graph_links_v54', 'wedding_graph_links_v55', 'wedding_graph_links_v56', 'wedding_graph_links_v57', 'wedding_graph_links_v58', 'wedding_graph_links_v59', 'wedding_graph_links_v60', 'wedding_graph_links_v61', 'wedding_graph_links_v62', 'wedding_graph_links_v63', 'wedding_graph_links_v64', 'wedding_graph_links_v65', 'wedding_graph_links_v66', 'wedding_graph_links_v67', 'wedding_graph_links_v68', 'wedding_graph_links_v69', 'wedding_graph_links_v70', 'wedding_graph_links_v71', 'wedding_graph_links_v72', 'wedding_graph_links_v73', 'wedding_graph_links_v74', 'wedding_graph_links_v75', 'wedding_graph_links_v76', 'wedding_graph_links_v77', 'wedding_graph_links_v78', 'wedding_graph_links_v79'].forEach(k => {
      try { localStorage.removeItem(k); } catch(e) {}
    });
  }, []);

  const [nodes, setNodes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_graph_nodes_v80');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasLegacyCohorts = Array.isArray(parsed) && parsed.some(n => 
          n.cohort && (n.cohort.includes('&') || n.cohort.includes('Family') || n.cohort === 'Friends' || n.cohort === 'Shaikh Sisters')
        );
        const hasToyo = Array.isArray(parsed) && parsed.some(n => n.id === 'toyo_tsujino');
        if (!hasLegacyCohorts && hasToyo && Array.isArray(parsed) && parsed.length >= SAMPLE_NODES.length && parsed.some(n => n.id === 'maureen')) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved nodes from localStorage:', e);
    }
    return SAMPLE_NODES;
  });

  const [links, setLinks] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_graph_links_v80');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SAMPLE_LINKS.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved links from localStorage:', e);
    }
    return SAMPLE_LINKS;
  });
  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_graph_feedback_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse feedback list:', e);
    }
  });

  // Auto-fetch pending guest proposals from GitHub Issues API into Host Moderation Queue
  useEffect(() => {
    fetchGuestProposalsFromGithub().then(githubProposals => {
      if (Array.isArray(githubProposals) && githubProposals.length > 0) {
        setFeedbackList(prev => {
          const safePrev = Array.isArray(prev) ? prev : [];
          const existingIds = new Set(safePrev.map(p => p && p.id));
          const newRemote = githubProposals.filter(p => p && !existingIds.has(p.id));
          return [...newRemote, ...safePrev];
        });
      }
    });
  }, []);

  // UI Modes & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverNode, setHoverNode] = useState(null);
  const [colorMode, setColorMode] = useState('cohort');
  const [clusterMode, setClusterMode] = useState('cohort');
  const [isLightMode, setIsLightMode] = useState(false);
  const [showHeadshots, setShowHeadshots] = useState(true);

  // Scalable Canvas & Motion Controls
  const [nodeScaleMultiplier, setNodeScaleMultiplier] = useState(1.0);
  const [edgeLengthMultiplier, setEdgeLengthMultiplier] = useState(1.0);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [orbitSpeed, setOrbitSpeed] = useState(0.3);

  // Hidden Security & Host Admin Mode State
  const [isAdmin, setIsAdmin] = useState(() => isSecretUrlAdmin());
  const [passcodePromptOpen, setPasscodePromptOpen] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Modals & Drawers
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);
  const [myGuestId, setMyGuestId] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackTargetNode, setFeedbackTargetNode] = useState(null);
  const [feedbackCategory, setFeedbackCategory] = useState('Missing Interest');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [isFeedbackQueueOpen, setIsFeedbackQueueOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isAddConnectionOpen, setIsAddConnectionOpen] = useState(false);
  const [isSpreadsheetOpen, setIsSpreadsheetOpen] = useState(false);
  const [copyToast, setCopyToast] = useState('');

  const handleSaveSpreadsheetData = async (updatedGuestNodes) => {
    // Preserve non-guest anchor nodes
    const nonGuestNodes = nodes.filter(n => n && n.type !== 'GUEST');
    const combinedNodes = [...nonGuestNodes, ...updatedGuestNodes];
    setNodes(combinedNodes);

    try {
      localStorage.setItem('wedding_graph_nodes_v10', JSON.stringify(combinedNodes));
    } catch (e) {}

    setCopyToast('⚡ Committing updated spreadsheet dataset to GitHub Repo...');
    const jsContent = generateSampleDataJsContent(combinedNodes, links);
    const result = await pushToGithubRepo(jsContent, 'Update guest spreadsheet dataset via Host Admin Suite', '', 'src/data/sampleData.js');
    setCopyToast(result.message);
    setTimeout(() => setCopyToast(''), 4500);
  };

  const handleApplyDataset = useCallback((newNodes, newLinks) => {
    setNodes(newNodes);
    setLinks(newLinks);
    try {
      localStorage.setItem('wedding_graph_nodes_v10', JSON.stringify(newNodes));
      localStorage.setItem('wedding_graph_links_v10', JSON.stringify(newLinks));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, []);

  const handleAddConnection = useCallback((newLink) => {
    setLinks(prev => {
      const updated = [...prev, newLink];
      try {
        localStorage.setItem('wedding_graph_links_v10', JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save links to localStorage:', e);
      }
      return updated;
    });

    // Immediately reheat D3 force simulation to draw the new connection line on canvas!
    if (fgRef.current && typeof fgRef.current.d3ReheatSimulation === 'function') {
      fgRef.current.d3ReheatSimulation();
    }
  }, []);

  // Path Finder State
  const [isPathMode, setIsPathMode] = useState(false);
  const [pathStartId, setPathStartId] = useState('');
  const [pathEndId, setPathEndId] = useState('');
  const [shortestPath, setShortestPath] = useState([]);

  // Direct Profile Editor Drawer State
  const [isEditingDrawer, setIsEditingDrawer] = useState(false);
  const [editName, setEditName] = useState('');
  const [editRelationship, setEditRelationship] = useState('');
  const [editOriginallyFrom, setEditOriginallyFrom] = useState('');
  const [editCurrentlyLivesIn, setEditCurrentlyLivesIn] = useState('');
  const [editCohort, setEditCohort] = useState('');
  const [editSide, setEditSide] = useState('Maureen');
  const [editFamilyStatus, setEditFamilyStatus] = useState('');
  const [editHobbies, setEditHobbies] = useState([]);
  const [newInterestInput, setNewInterestInput] = useState('');

  // Responsive Dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const isMobileViewport = dimensions.width < 768;

  // Window Resize Listener
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync LocalStorage & Theme
  useEffect(() => {
    localStorage.setItem('wedding_graph_nodes_v3', JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem('wedding_graph_feedback_v3', JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  // Secret URL Parameter & Secret Keyboard Shortcut Listener (`Ctrl + Shift + A`)
  useEffect(() => {
    if (isSecretUrlAdmin()) {
      setIsAdmin(true);
    }
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setPasscodePromptOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Passcode Verification Handler
  const handleVerifyPasscodeSubmit = async (e) => {
    e.preventDefault();
    const isValid = await verifyPasscode(passcodeInput);
    if (isValid) {
      setIsAdmin(true);
      setPasscodePromptOpen(false);
      setPasscodeInput('');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  // Location / State Extractor Helper
  const getLocationStateKey = useCallback((node) => {
    const loc = node.currentlyLivesIn || node.originallyFrom || '';
    if (!loc) return 'Default';
    const match = loc.match(/\b([A-Z]{2})\b/);
    if (match) return match[1];
    return loc.split(/[, ]+/).pop() || loc;
  }, []);

  // Node Color Resolver (Generates vibrant dynamic colors for ALL custom cohorts & locations!)
  const getNodeColor = useCallback((node) => {
    if (!node) return '#38bdf8';
    if (colorMode === 'side') return SIDE_COLORS[node.side] || SIDE_COLORS["Joint"];
    
    if (colorMode === 'interests' && node.hobbies && node.hobbies.length > 0) {
      const primaryHobby = node.hobbies[0];
      let hash = 0;
      for (let i = 0; i < primaryHobby.length; i++) {
        hash = primaryHobby.charCodeAt(i) + ((hash << 5) - hash);
      }
      return DYNAMIC_CLUSTER_COLORS[Math.abs(hash) % DYNAMIC_CLUSTER_COLORS.length];
    }

    if (colorMode === 'state' || colorMode === 'location' || colorMode === 'locations' || colorMode === 'current_location' || colorMode === 'original_location') {
      let locKey = 'Default';
      if (colorMode === 'current_location') {
        locKey = node.currentlyLivesIn || node.state || 'Unknown';
      } else if (colorMode === 'original_location') {
        locKey = node.originallyFrom || node.hometown || 'Unknown';
      } else {
        locKey = node.currentlyLivesIn || node.originallyFrom || getLocationStateKey(node);
      }

      if (STATE_COLORS[locKey]) return STATE_COLORS[locKey];
      let hash = 0;
      for (let i = 0; i < locKey.length; i++) {
        hash = locKey.charCodeAt(i) + ((hash << 5) - hash);
      }
      const paletteIndex = Math.abs(hash) % DYNAMIC_CLUSTER_COLORS.length;
      return DYNAMIC_CLUSTER_COLORS[paletteIndex];
    }

    if (COHORT_COLORS[node.cohort]) return COHORT_COLORS[node.cohort];

    // Dynamic hash palette for custom family/friend cohorts
    if (node.cohort) {
      let hash = 0;
      for (let i = 0; i < node.cohort.length; i++) {
        hash = node.cohort.charCodeAt(i) + ((hash << 5) - hash);
      }
      const paletteIndex = Math.abs(hash) % DYNAMIC_CLUSTER_COLORS.length;
      return DYNAMIC_CLUSTER_COLORS[paletteIndex];
    }

    return COHORT_COLORS.Default;
  }, [colorMode, getLocationStateKey]);

  const [selectedClusterFocus, setSelectedClusterFocus] = useState('');

  const availableClusters = useMemo(() => {
    const cohortsSet = new Set();
    const locationsSet = new Set();
    const interestsSet = new Set();

    (nodes || []).forEach(node => {
      if (!node || node.type === 'CONTEXT_HUB') return;
      
      // Cohorts (Exclude family units)
      if (node.cohort && !node.cohort.toLowerCase().includes('family')) {
        cohortsSet.add(node.cohort);
      }
      
      // Union of Locations (Current Town + Hometown, Exclude family units)
      const locs = [node.currentlyLivesIn, node.originallyFrom, node.state, node.hometown];
      locs.forEach(loc => {
        if (loc && !loc.toLowerCase().includes('family')) {
          locationsSet.add(loc);
        }
      });

      // All Interests
      if (node.hobbies && Array.isArray(node.hobbies)) {
        node.hobbies.forEach(h => {
          if (h && !h.toLowerCase().includes('family')) {
            interestsSet.add(h);
          }
        });
      }
    });

    return {
      interests: Array.from(interestsSet).sort((a, b) => a.localeCompare(b)),
      locations: Array.from(locationsSet).sort((a, b) => a.localeCompare(b)),
      cohorts: Array.from(cohortsSet).sort((a, b) => a.localeCompare(b)),
      // Flat list array for quick length checks
      all: [
        ...Array.from(interestsSet),
        ...Array.from(locationsSet),
        ...Array.from(cohortsSet)
      ]
    };
  }, [nodes]);

  // Filtered Nodes & Clean Links
  const filteredNodes = useMemo(() => {
    return (nodes || []).filter(node => {
      if (!node) return false;
      if (selectedClusterFocus) {
        const c = selectedClusterFocus.toLowerCase();
        const matchesCohort = node.cohort ? node.cohort.toLowerCase() === c : false;
        const matchesLocation = (node.currentlyLivesIn && node.currentlyLivesIn.toLowerCase() === c) || 
                                (node.originallyFrom && node.originallyFrom.toLowerCase() === c) ||
                                (node.state && node.state.toLowerCase() === c) ||
                                (node.hometown && node.hometown.toLowerCase() === c);
        const matchesInterest = node.hobbies ? node.hobbies.some(h => h.toLowerCase() === c) : false;
        if (!matchesCohort && !matchesLocation && !matchesInterest && node.type !== 'ANCHOR') {
          return false;
        }
      }
      if (selectedInterests && selectedInterests.length > 0) {
        if (!node.hobbies || !selectedInterests.some(i => node.hobbies.includes(i))) return false;
      }
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = node.name ? node.name.toLowerCase().includes(q) : false;
        const matchesCohort = node.cohort ? node.cohort.toLowerCase().includes(q) : false;
        const matchesSide = node.side ? node.side.toLowerCase().includes(q) : false;
        const matchesInterest = node.hobbies ? node.hobbies.some(h => h.toLowerCase().includes(q)) : false;
        return matchesName || matchesCohort || matchesSide || matchesInterest;
      }
      return true;
    });
  }, [nodes, searchQuery, selectedInterests, selectedClusterFocus]);

  const graphData = useMemo(() => {
    // Robust Node ID Resolver (Handles ID, full name, or slug matching)
    const resolveNodeId = (val) => {
      if (!val) return null;
      if (typeof val === 'object' && val.id) return val.id;
      const str = String(val).trim().toLowerCase();
      const match = nodes.find(n => 
        n.id.toLowerCase() === str || 
        n.name.toLowerCase() === str ||
        n.id.toLowerCase() === str.replace(/[^a-z0-9]/g, '_')
      );
      return match ? match.id : val;
    };

    const validLinks = links.map(link => {
      const sId = resolveNodeId(link.source);
      const tId = resolveNodeId(link.target);
      return { ...link, source: sId, target: tId };
    }).filter(link => {
      return filteredNodes.some(n => n.id === link.source) && 
             filteredNodes.some(n => n.id === link.target);
    });

    return {
      nodes: filteredNodes,
      links: validLinks
    };
  }, [nodes, filteredNodes, links]);

  // Dynamic Clusters
  const dynamicAutoClusters = useMemo(() => {
    const clusterMap = {};
    nodes.forEach(node => {
      if (node.type === 'CONTEXT_HUB') return;
      if (node.hobbies && node.hobbies.length > 0) {
        node.hobbies.forEach(tag => {
          if (!clusterMap[tag]) clusterMap[tag] = [];
          clusterMap[tag].push(node);
        });
      }
    });
    const result = {};
    Object.entries(clusterMap).forEach(([tag, arr]) => {
      if (arr.length >= 2) result[tag] = arr;
    });
    return result;
  }, [nodes]);

  const dynamicLocationClusters = useMemo(() => {
    const clusterMap = {};
    nodes.forEach(node => {
      if (node.type === 'CONTEXT_HUB') return;
      if (node.originallyFrom) {
        const key = `🏡 Originally: ${node.originallyFrom}`;
        if (!clusterMap[key]) clusterMap[key] = [];
        clusterMap[key].push(node);
      }
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

  // Orbit Force Factory with Additive Velocity Blending for Preserving Collision Physics
  const createOrbitForce = useCallback((speedMultiplier = 1.0) => {
    const omega = 0.007 * speedMultiplier;
    return (alpha) => {
      nodes.forEach(node => {
        if (node.id === 'maureen' || node.id === 'matt') return;
        const x = node.x || 0;
        const y = node.y || 0;
        const r = Math.hypot(x, y);
        if (r > 10) {
          const theta = Math.atan2(y, x);
          const newTheta = theta + omega;
          const targetX = r * Math.cos(newTheta);
          const targetY = r * Math.sin(newTheta);
          const vx = targetX - x;
          const vy = targetY - y;
          node.vx += (vx - node.vx) * 0.15;
          node.vy += (vy - node.vy) * 0.15;
        }
      });
    };
  }, [nodes]);

  // Camera & Node Drag Handlers
  const flyToNode = useCallback((node) => {
    setIsOrbiting(false);
    if (node && node.x !== undefined && node.y !== undefined) {
      node.fx = node.x;
      node.fy = node.y;
    }
    if (fgRef.current && typeof fgRef.current.d3ReheatSimulation === 'function') {
      fgRef.current.d3ReheatSimulation();
    }
    if (fgRef.current && node && node.x !== undefined && node.y !== undefined) {
      fgRef.current.centerAt(node.x, node.y, 600);
      fgRef.current.zoom(2.5, 600);
    }
  }, [setIsOrbiting]);

  const handleNodeClick = useCallback((node) => {
    setIsOrbiting(false);
    setIsMobileControlsOpen(false);
    if (isPathMode) {
      if (!pathStartId) {
        setPathStartId(node.id);
      } else if (node.id !== pathStartId) {
        setPathEndId(node.id);
      }
      return;
    }
    setSelectedNode(node);
    setIsEditingDrawer(false);
    flyToNode(node);
  }, [isPathMode, pathStartId, flyToNode, setIsOrbiting]);

  const handleNodeDrag = useCallback((node, translate) => {
    const dx = translate.x;
    const dy = translate.y;
    node._prevX = node._prevX ?? (node.x - dx);
    node._prevY = node._prevY ?? (node.y - dy);
    const shiftX = node.x - node._prevX;
    const shiftY = node.y - node._prevY;

    let memberNodes = [];
    if (clusterMode === 'cohort' && node.cohort) {
      memberNodes = nodes.filter(n => n.cohort === node.cohort);
    } else if (clusterMode === 'locations' || clusterMode === 'current_location' || clusterMode === 'original_location') {
      const loc = node.currentlyLivesIn || node.originallyFrom;
      memberNodes = nodes.filter(n => n.currentlyLivesIn === loc || n.originallyFrom === loc);
    }

    if (memberNodes.length > 1) {
      memberNodes.forEach(other => {
        if (other.id !== node.id && other.id !== 'maureen' && other.id !== 'matt') {
          other.x += shiftX;
          other.y += shiftY;
          other.fx = other.x;
          other.fy = other.y;
        }
      });
    }
    node._prevX = node.x;
    node._prevY = node.y;
  }, [nodes, clusterMode]);

  const handleNodeDragEnd = useCallback((node) => {
    node._prevX = undefined;
    node._prevY = undefined;

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

    if (fgRef.current && typeof fgRef.current.d3ReheatSimulation === 'function') {
      fgRef.current.d3ReheatSimulation();
    }
  }, [nodes, clusterMode]);

  const handleZoom = useCallback(({ k }) => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      if (Math.abs(currentZoom - (fgRef.current._lastZoom || 1)) > 0.15) {
        fgRef.current._lastZoom = currentZoom;
        fgRef.current.d3ReheatSimulation();
      }
    }
  }, []);

  // Sync Selected Node Edit Form Fields
  useEffect(() => {
    if (selectedNode) {
      setEditName(selectedNode.name || '');
      setEditRelationship(selectedNode.relationship || '');
      setEditOriginallyFrom(selectedNode.originallyFrom || selectedNode.hometown || '');
      setEditCurrentlyLivesIn(selectedNode.currentlyLivesIn || selectedNode.state || '');
      setEditCohort(selectedNode.cohort || '');
      setEditSide(selectedNode.side || 'Maureen');
      setEditFamilyStatus(selectedNode.familyStatus || '');
      setEditHobbies(selectedNode.hobbies ? [...selectedNode.hobbies] : []);
    }
  }, [selectedNode]);

  const handleAddInterestTag = (tagToAdd) => {
    const tag = (typeof tagToAdd === 'string' && tagToAdd.trim()) ? tagToAdd.trim() : newInterestInput.trim();
    if (tag && !editHobbies.includes(tag)) {
      setEditHobbies([...editHobbies, tag]);
      setNewInterestInput('');
    }
  };

  const handleRemoveInterestTag = (tag) => {
    setEditHobbies(editHobbies.filter(h => h !== tag));
  };

  const handleSaveProfileEdits = () => {
    if (!selectedNode) return;
    if (!isAdmin) {
      const changeSummary = [];
      if (editName && editName !== (selectedNode.name || '')) {
        changeSummary.push(`Name: ${editName}`);
      }
      if (editCurrentlyLivesIn && editCurrentlyLivesIn !== (selectedNode.currentlyLivesIn || '')) {
        changeSummary.push(`Lives In: ${editCurrentlyLivesIn}`);
      }
      if (editOriginallyFrom && editOriginallyFrom !== (selectedNode.originallyFrom || '')) {
        changeSummary.push(`Originally From: ${editOriginallyFrom}`);
      }
      if (editHobbies.join(', ') !== (selectedNode.hobbies || []).join(', ')) {
        changeSummary.push(`Hobbies: ${editHobbies.join(', ')}`);
      }
      if (editCohort && editCohort !== (selectedNode.cohort || '')) {
        changeSummary.push(`Group: ${editCohort}`);
      }
      if (editRelationship && editRelationship !== (selectedNode.relationship || '')) {
        changeSummary.push(`Relationship: ${editRelationship}`);
      }

      const proposalNote = changeSummary.length > 0 
        ? `Proposed Changes: ${changeSummary.join(' | ')}`
        : `Proposed profile update for ${selectedNode.name}`;

      const proposal = {
        id: `fb_${Date.now()}`,
        targetId: selectedNode.id,
        targetName: editName || selectedNode.name,
        category: 'Profile Edit Proposal',
        proposedHobbies: editHobbies.join(', '),
        proposedLocation: editCurrentlyLivesIn,
        proposedCohort: editCohort,
        proposedSide: editSide,
        proposedRelationship: editRelationship,
        note: proposalNote,
        status: 'PENDING',
        timestamp: new Date().toISOString()
      };
      submitGuestProposalToGithub(proposal);
      setCopyToast('🚀 Proposal Sent to Host Queue for Approval!');
      setTimeout(() => setCopyToast(''), 3500);
      setIsEditingDrawer(false);
      return;
    }

    const updated = nodes.map(n => {
      if (n.id === selectedNode.id) {
        return {
          ...n,
          name: editName || n.name,
          relationship: editRelationship,
          originallyFrom: editOriginallyFrom,
          currentlyLivesIn: editCurrentlyLivesIn,
          cohort: editCohort,
          side: editSide,
          familyStatus: editFamilyStatus,
          hobbies: editHobbies
        };
      }
      return n;
    });
    setNodes(updated);
    setSelectedNode({
      ...selectedNode,
      name: editName || selectedNode.name,
      relationship: editRelationship,
      originallyFrom: editOriginallyFrom,
      currentlyLivesIn: editCurrentlyLivesIn,
      cohort: editCohort,
      side: editSide,
      familyStatus: editFamilyStatus,
      hobbies: editHobbies
    });
    try {
      localStorage.setItem('wedding_graph_nodes_v10', JSON.stringify(updated));
    } catch (e) {}
    const jsContent = generateSampleDataJsContent(updated, links);
    pushToGithubRepo(jsContent, `Update profile dataset for ${selectedNode.name}`, '', 'src/data/sampleData.js');
    setIsEditingDrawer(false);
  };

  // BFS Path Finder Engine
  const computeShortestPath = useCallback((startId, endId) => {
    if (!startId || !endId || startId === endId) return [];
    const adj = {};
    links.forEach(l => {
      const s = typeof l.source === 'object' ? l.source.id : l.source;
      const t = typeof l.target === 'object' ? l.target.id : l.target;
      if (!adj[s]) adj[s] = [];
      if (!adj[t]) adj[t] = [];
      adj[s].push(t);
      adj[t].push(s);
    });

    const queue = [[startId]];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const curr = path[path.length - 1];
      if (curr === endId) return path;

      for (const neighbor of (adj[curr] || [])) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
    return [];
  }, [links]);

  useEffect(() => {
    if (pathStartId && pathEndId) {
      setShortestPath(computeShortestPath(pathStartId, pathEndId));
    } else {
      setShortestPath([]);
    }
  }, [pathStartId, pathEndId, computeShortestPath]);

  // Dynamic Inverse Tag Frequency (IDF) Weights for Interests
  const tagWeights = useMemo(() => {
    const counts = {};
    (nodes || []).filter(n => n.type === 'GUEST').forEach(n => {
      (n.hobbies || []).forEach(h => {
        if (h && h.trim()) {
          const key = h.trim();
          counts[key] = (counts[key] || 0) + 1;
        }
      });
    });

    const weights = {};
    Object.entries(counts).forEach(([tag, count]) => {
      // Inverse Tag Frequency formula: Rare tags (1-2 guests) get ~55-80 pts, common tags get ~10-20 pts
      weights[tag] = Math.min(85, Math.max(10, Math.round(80 / Math.pow(count, 0.55))));
    });
    return weights;
  }, [nodes]);

  // Cocktail Matchmaker Engine (Focuses strictly on shared interests weighted by Inverse Tag Frequency!)
  const matchmakerResults = useMemo(() => {
    if (!myGuestId) return [];
    const me = nodes.find(n => n.id === myGuestId);
    if (!me) return [];

    const meHobbies = new Set(me.hobbies || []);

    return nodes
      .filter(n => n.id !== me.id && n.type === 'GUEST')
      .map(other => {
        let sharedScore = 0;
        const reasons = [];

        // 1. Shared Interests weighted dynamically by Inverse Tag Frequency!
        (other.hobbies || []).forEach(h => {
          if (meHobbies.has(h)) {
            const weight = tagWeights[h] || 40;
            sharedScore += weight;
            reasons.push(`Shared Interest: ${h} (+${weight} pts)`);
          }
        });

        // 2. Shared Hometown / Originally From (+30 points)
        const myHome = (me.originallyFrom || me.hometown || '').toLowerCase();
        const otherHome = (other.originallyFrom || other.hometown || '').toLowerCase();
        if (myHome && otherHome && myHome === otherHome) {
          sharedScore += 30;
          reasons.push(`Both originally from ${me.originallyFrom || me.hometown}`);
        }

        // 3. Shared Current Location (+25 points)
        const myLive = (me.currentlyLivesIn || me.state || '').toLowerCase();
        const otherLive = (other.currentlyLivesIn || other.state || '').toLowerCase();
        if (myLive && otherLive && myLive === otherLive) {
          sharedScore += 25;
          reasons.push(`Both live in ${me.currentlyLivesIn || me.state}`);
        }

        return { node: other, sharedScore, reasons };
      })
      .filter(r => r.sharedScore > 0)
      .sort((a, b) => b.sharedScore - a.sharedScore)
      .slice(0, 8);
  }, [myGuestId, nodes, tagWeights]);

  // 1-Click Host CSV Export Handler
  const handleExportCsv = () => {
    const csvData = nodes.map(n => ({
      ID: n.id,
      Name: n.name,
      Type: n.type,
      Side: n.side || '',
      Cohort: n.cohort || '',
      Relationship: n.relationship || '',
      OriginallyFrom: n.originallyFrom || n.hometown || '',
      CurrentlyLivesIn: n.currentlyLivesIn || n.state || '',
      FamilyStatus: n.familyStatus || '',
      Interests: (n.hobbies || []).join('; ')
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wedding_guest_universe_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Git JS Handler (`sampleData.js`)
  const handleExportGitJs = () => {
    const cleanNodes = nodes.map(({ x, y, vx, vy, fx, fy, index, ...rest }) => rest);
    const jsContent = `export const SAMPLE_NODES = ${JSON.stringify(cleanNodes, null, 2)};\n\nexport const SAMPLE_LINKS = ${JSON.stringify(links, null, 2)};\n`;
    const blob = new Blob([jsContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sampleData.js');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Direct GitHub API Repo Push Handler
  const handlePushToGithub = async () => {
    setCopyToast('⚡ Pushing directly to GitHub Repo...');
    const jsContent = generateSampleDataJsContent(nodes, links);
    const result = await pushToGithubRepo(jsContent, 'Update dataset via Host Admin Suite', '', 'src/data/sampleData.js');
    setCopyToast(result.message);
    setTimeout(() => setCopyToast(''), 4000);
  };

  const handleCopyQrLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopyToast('Deep Link Copied!');
    setTimeout(() => setCopyToast(''), 3000);
  };

  // Suggest Edit Submission Handler
  const handleSubmitFeedback = async () => {
    if (!feedbackNote.trim()) return;
    const newFeedback = {
      id: `fb_${Date.now()}`,
      targetId: feedbackTargetNode ? feedbackTargetNode.id : 'general',
      targetName: feedbackTargetNode ? feedbackTargetNode.name : 'General',
      category: feedbackCategory,
      note: sanitizeInput(feedbackNote),
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };
    setFeedbackList(prev => [newFeedback, ...prev]);
    setIsFeedbackModalOpen(false);
    setFeedbackNote('');
    setCopyToast('🚀 Submitting Suggestion to Host Queue...');

    // Real-time GitHub Issue creation so all hosts receive proposals across all devices!
    await submitGuestProposalToGithub(newFeedback);

    setCopyToast('Suggestion Submitted to Hosts!');
    setTimeout(() => setCopyToast(''), 3000);
  };

  return (
    <div className={`app-container ${isLightMode ? 'light-mode' : ''}`}>
      {/* Top Header Navigation */}
      <TopHeaderNav 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedInterests={selectedInterests}
        setSelectedInterests={setSelectedInterests}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
        clusterMode={clusterMode}
        setClusterMode={setClusterMode}
        colorMode={colorMode}
        setColorMode={setColorMode}
        showHeadshots={showHeadshots}
        setShowHeadshots={setShowHeadshots}
        isOrbiting={isOrbiting}
        setIsOrbiting={setIsOrbiting}
        orbitSpeed={orbitSpeed}
        setOrbitSpeed={setOrbitSpeed}
        nodeScaleMultiplier={nodeScaleMultiplier}
        setNodeScaleMultiplier={setNodeScaleMultiplier}
        edgeLengthMultiplier={edgeLengthMultiplier}
        setEdgeLengthMultiplier={setEdgeLengthMultiplier}
        isPathMode={isPathMode}
        setIsPathMode={setIsPathMode}
        setIsMatchmakerOpen={setIsMatchmakerOpen}
        isAdmin={isAdmin}
        handleExportCsv={handleExportCsv}
        setIsSpreadsheetOpen={setIsSpreadsheetOpen}
        selectedClusterFocus={selectedClusterFocus}
        setSelectedClusterFocus={setSelectedClusterFocus}
        availableClusters={availableClusters}
        onOpenMapControls={() => setIsMobileControlsOpen(true)}
      />

      {/* Dedicated Host Admin Floating Control Panel */}
      <HostAdminPanel 
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        handleExportCsv={handleExportCsv}
        handleExportGitJs={handleExportGitJs}
        handlePushToGithub={handlePushToGithub}
        feedbackQueueCount={(feedbackList || []).filter(f => f && f.status === 'PENDING').length}
        setIsFeedbackQueueOpen={setIsFeedbackQueueOpen}
        handleCopyQrLink={handleCopyQrLink}
        setIsBulkImportOpen={setIsBulkImportOpen}
        setIsAddConnectionOpen={setIsAddConnectionOpen}
        setIsSpreadsheetOpen={setIsSpreadsheetOpen}
      />

      {/* Interactive Host Admin Connection Builder Modal */}
      <AddConnectionModal 
        isOpen={isAddConnectionOpen}
        onClose={() => setIsAddConnectionOpen(false)}
        nodes={nodes}
        onAddConnection={handleAddConnection}
      />

      {/* Bulk 2-Table CSV Data Importer Modal */}
      <BulkCsvImportModal 
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onApplyDataset={handleApplyDataset}
        handleExportGitJs={handleExportGitJs}
      />

      {/* Path Finder Floating Interactive Toolbar (Positioned cleanly below top header at top: 80px) */}
      {isPathMode && (
        <div className="glass-panel no-print" style={{
          position: 'absolute',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 500,
          padding: '12px 20px',
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(15, 23, 42, 0.94)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          maxWidth: '90vw',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Compass style={{ width: 18, height: 18, color: '#38bdf8' }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#f8fafc', whiteSpace: 'nowrap' }}>Path Finder:</span>
          </div>

          {/* 1st Guest Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>From:</span>
            <select 
              value={pathStartId}
              onChange={(e) => setPathStartId(e.target.value)}
              style={{ background: '#0f172a', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '5px 10px', borderRadius: 10, fontSize: 12, fontWeight: 700, outline: 'none', cursor: 'pointer', maxWidth: 160 }}
            >
              <option value="">-- Click or Pick 1st --</option>
              {(nodes || []).filter(n => n && n.type === 'GUEST').map(n => (
                <option key={n.id} value={n.id}>{n.name}</option>
              ))}
            </select>
          </div>

          <span style={{ color: '#94a3b8', fontSize: 12 }}>➔</span>

          {/* 2nd Guest Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>To:</span>
            <select 
              value={pathEndId}
              onChange={(e) => setPathEndId(e.target.value)}
              style={{ background: '#0f172a', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '5px 10px', borderRadius: 10, fontSize: 12, fontWeight: 700, outline: 'none', cursor: 'pointer', maxWidth: 160 }}
            >
              <option value="">-- Click or Pick 2nd --</option>
              {(nodes || []).filter(n => n && n.type === 'GUEST' && n.id !== pathStartId).map(n => (
                <option key={n.id} value={n.id}>{n.name}</option>
              ))}
            </select>
          </div>

          {/* Shortest Path Result Badge */}
          {shortestPath.length > 1 && (
            <div style={{ fontSize: 12, fontWeight: 800, color: '#34d399', background: 'rgba(52, 211, 153, 0.15)', padding: '4px 10px', borderRadius: 9999, border: '1px solid rgba(52, 211, 153, 0.3)' }}>
              Connected in {shortestPath.length - 1} {shortestPath.length - 1 === 1 ? 'hop' : 'hops'}!
            </div>
          )}

          {/* Clear Path Button */}
          <button 
            onClick={() => { setPathStartId(''); setPathEndId(''); setShortestPath([]); }}
            style={{ fontSize: 11, color: '#ec4899', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '4px 10px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}
          >
            Reset
          </button>

          {/* Close Path Finder Banner */}
          <button 
            onClick={() => { setIsPathMode(false); setPathStartId(''); setPathEndId(''); setShortestPath([]); }}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: 4 }}
            title="Exit Path Finder Mode"
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>
      )}

      {/* Floating Micro-Dock Map Controls Trigger & Sheet (Rendered on all viewports when no profile drawer is open) */}
      {!selectedNode && (
        <>
          <button 
            className="mobile-drawer-toggle-fab no-print"
            onClick={() => setIsMobileControlsOpen(true)}
          >
            <SlidersHorizontal style={{ width: 16, height: 16 }} />
            <span>Map Controls</span>
          </button>

          <MobileControlsSheet 
            isOpen={isMobileControlsOpen}
            onClose={() => setIsMobileControlsOpen(false)}
            isOrbiting={isOrbiting}
            setIsOrbiting={setIsOrbiting}
            orbitSpeed={orbitSpeed}
            setOrbitSpeed={setOrbitSpeed}
            nodeScaleMultiplier={nodeScaleMultiplier}
            setNodeScaleMultiplier={setNodeScaleMultiplier}
            edgeLengthMultiplier={edgeLengthMultiplier}
            setEdgeLengthMultiplier={setEdgeLengthMultiplier}
            showHeadshots={showHeadshots}
            setShowHeadshots={setShowHeadshots}
            clusterMode={clusterMode}
            setClusterMode={setClusterMode}
            colorMode={colorMode}
            setColorMode={setColorMode}
            isPathMode={isPathMode}
            setIsPathMode={setIsPathMode}
            setIsMatchmakerOpen={setIsMatchmakerOpen}
            setIsFeedbackModalOpen={setIsFeedbackModalOpen}
            setSelectedNode={setSelectedNode}
            isAdmin={isAdmin}
            handleCopyQrLink={handleCopyQrLink}
            selectedClusterFocus={selectedClusterFocus}
            setSelectedClusterFocus={setSelectedClusterFocus}
            availableClusters={availableClusters}
          />
        </>
      )}

      {/* Dynamic Color Legend */}
      <DynamicColorLegend 
        colorMode={colorMode}
        filteredNodes={filteredNodes}
        getNodeColor={getNodeColor}
        isMobileViewport={isMobileViewport}
        isLightMode={isLightMode}
        selectedNode={selectedNode}
        isMobileControlsOpen={isMobileControlsOpen}
      />

      {/* HTML5 2D Canvas Force Graph */}
      <ForceCanvas 
        fgRef={fgRef}
        dimensions={dimensions}
        graphData={graphData}
        nodes={nodes}
        links={links}
        filteredNodes={filteredNodes}
        clusterMode={clusterMode}
        colorMode={colorMode}
        getNodeColor={getNodeColor}
        showHeadshots={showHeadshots}
        nodeScaleMultiplier={nodeScaleMultiplier}
        edgeLengthMultiplier={edgeLengthMultiplier}
        isOrbiting={isOrbiting}
        orbitSpeed={orbitSpeed}
        createOrbitForce={createOrbitForce}
        selectedNode={selectedNode}
        hoverNode={hoverNode}
        setHoverNode={setHoverNode}
        shortestPath={shortestPath}
        isLightMode={isLightMode}
        isMobileViewport={isMobileViewport}
        dynamicAutoClusters={dynamicAutoClusters}
        dynamicLocationClusters={dynamicLocationClusters}
        dynamicCurrentLocationClusters={dynamicCurrentLocationClusters}
        dynamicOriginalLocationClusters={dynamicOriginalLocationClusters}
        handleNodeClick={handleNodeClick}
        handleNodeDrag={handleNodeDrag}
        handleNodeDragEnd={handleNodeDragEnd}
        handleZoom={handleZoom}
        searchQuery={searchQuery}
        setIsOrbiting={setIsOrbiting}
        imageCacheRef={imageCacheRef}
      />

      {/* Guest Profile Metadata Drawer */}
      <GuestProfileDrawer 
        selectedNode={selectedNode}
        onClose={() => setSelectedNode(null)}
        isEditingDrawer={isEditingDrawer}
        setIsEditingDrawer={setIsEditingDrawer}
        editName={editName}
        setEditName={setEditName}
        editRelationship={editRelationship}
        setEditRelationship={setEditRelationship}
        editOriginallyFrom={editOriginallyFrom}
        setEditOriginallyFrom={setEditOriginallyFrom}
        editCurrentlyLivesIn={editCurrentlyLivesIn}
        setEditCurrentlyLivesIn={setEditCurrentlyLivesIn}
        editCohort={editCohort}
        setEditCohort={setEditCohort}
        editSide={editSide}
        setEditSide={setEditSide}
        editFamilyStatus={editFamilyStatus}
        setEditFamilyStatus={setEditFamilyStatus}
        editHobbies={editHobbies}
        newInterestInput={newInterestInput}
        setNewInterestInput={setNewInterestInput}
        handleAddInterestTag={handleAddInterestTag}
        handleRemoveInterestTag={handleRemoveInterestTag}
        handleSaveProfileEdits={handleSaveProfileEdits}
        selectedInterests={selectedInterests}
        setSelectedInterests={setSelectedInterests}
        colorMode={colorMode}
        getNodeColor={getNodeColor}
      />

      {/* Cocktail Matchmaker Modal */}
      <CocktailMatchmakerModal 
        isOpen={isMatchmakerOpen}
        onClose={() => setIsMatchmakerOpen(false)}
        myGuestId={myGuestId}
        setMyGuestId={setMyGuestId}
        nodes={nodes}
        matchmakerResults={matchmakerResults}
        flyToNode={flyToNode}
        setSelectedNode={setSelectedNode}
      />

      {/* Host Review Queue / Moderation Modal */}
      <HostReviewQueueModal 
        isOpen={isFeedbackQueueOpen}
        onClose={() => setIsFeedbackQueueOpen(false)}
        proposals={feedbackList}
        onApprove={(proposal) => {
          setNodes(prev => {
            const updated = prev.map(node => {
              if (node.id === proposal.targetId || node.name === proposal.targetName) {
                const newNode = { ...node };
                // 1. Proposed Name
                if (proposal.proposedName) {
                  newNode.name = proposal.proposedName;
                } else if (proposal.note && proposal.note.includes('Name:')) {
                  const match = proposal.note.match(/Name:\s*([^|]+)/i);
                  if (match) newNode.name = match[1].trim();
                }

                // 2. Proposed Originally From / Hometown
                if (proposal.proposedOriginallyFrom) {
                  newNode.originallyFrom = proposal.proposedOriginallyFrom;
                  newNode.hometown = proposal.proposedOriginallyFrom;
                } else if (proposal.note && proposal.note.includes('Originally From:')) {
                  const match = proposal.note.match(/Originally From:\s*([^|]+)/i);
                  if (match) {
                    newNode.originallyFrom = match[1].trim();
                    newNode.hometown = match[1].trim();
                  }
                }

                // 3. Proposed Currently Lives In Location
                if (proposal.proposedLocation) {
                  newNode.currentlyLivesIn = proposal.proposedLocation;
                  newNode.state = proposal.proposedLocation;
                }
                if (proposal.proposedCohort) {
                  newNode.cohort = proposal.proposedCohort;
                }
                if (proposal.proposedSide) {
                  newNode.side = proposal.proposedSide;
                }
                if (proposal.proposedRelationship) {
                  newNode.relationship = proposal.proposedRelationship;
                }
                if (proposal.proposedFamilyStatus) {
                  newNode.familyStatus = proposal.proposedFamilyStatus;
                }

                // 4. Proposed Attendance Status
                if (proposal.proposedIsAttending === false || proposal.isAttending === false || (proposal.note && (proposal.note.toLowerCase().includes('not attending') || proposal.note.toLowerCase().includes('declined')))) {
                  newNode.isAttending = false;
                  newNode.rsvpStatus = 'Declined';
                  newNode.attendanceStatus = 'Not Attending';
                }
                
                // 5. Proposed Hobbies
                if (proposal.proposedHobbies || proposal.note) {
                  const hobbyText = proposal.proposedHobbies || proposal.note || '';
                  const newHobbies = hobbyText.split(/[,;\n]/).map(h => h.replace(/^(Add|Proposed|Interest|hobbies|hometown|Name|Lives In|Originally From|Group|Relationship):?/i, '').trim()).filter(Boolean);
                  newNode.hobbies = Array.from(new Set([...(newNode.hobbies || []), ...newHobbies]));
                }
                return newNode;
              }
              return node;
            });

            try {
              localStorage.setItem('wedding_graph_nodes_v10', JSON.stringify(updated));
            } catch (e) {}

            const jsContent = generateSampleDataJsContent(updated, links);
            pushToGithubRepo(jsContent, `Approve proposal for ${proposal.targetName}`, '', 'src/data/sampleData.js');

            return updated;
          });

          if (proposal.issueNumber) {
            closeGithubIssueProposal(proposal.issueNumber);
          }

          setFeedbackList(prev => (prev || []).filter(p => p && ((p.id && proposal.id && p.id !== proposal.id) || p.targetName !== proposal.targetName)));
          setCopyToast(`🚀 Approved edit for ${proposal.targetName} & Auto-Committed to Database!`);
          setTimeout(() => setCopyToast(''), 4500);
        }}
        onReject={(proposal) => {
          if (proposal.issueNumber) {
            closeGithubIssueProposal(proposal.issueNumber);
          }
          setFeedbackList(prev => (prev || []).filter(p => p && ((p.id && proposal.id && p.id !== proposal.id) || p.targetName !== proposal.targetName)));
          setCopyToast(`Rejected edit proposal for ${proposal.targetName}`);
          setTimeout(() => setCopyToast(''), 3000);
        }}
      />

      {/* Suggest Edit Modal */}
      <SuggestEditModal 
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        feedbackTargetNode={feedbackTargetNode}
        setFeedbackTargetNode={setFeedbackTargetNode}
        nodes={nodes}
        feedbackCategory={feedbackCategory}
        setFeedbackCategory={setFeedbackCategory}
        feedbackNote={feedbackNote}
        setFeedbackNote={setFeedbackNote}
        handleSubmitFeedback={handleSubmitFeedback}
      />

      {/* Host Passcode Prompt Modal (Triggered via secret shortcut Ctrl+Shift+A) */}
      {passcodePromptOpen && (
        <div className="modal-backdrop no-print">
          <div className="glass-panel modal-card" style={{ maxWidth: 360 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontWeight: 700, color: '#ec4899', fontSize: 14 }}>Host Authorization</span>
              <button onClick={() => setPasscodePromptOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <form onSubmit={handleVerifyPasscodeSubmit}>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>
                Enter the host passcode to unlock host administrative privileges:
              </p>
              <input 
                type="password"
                placeholder="Enter Passcode..."
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 10, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', outline: 'none', fontSize: 13, marginBottom: 10 }}
              />
              {passcodeError && (
                <div style={{ color: '#ef4444', fontSize: 11, marginBottom: 10, fontWeight: 600 }}>
                  Incorrect passcode. Please try again.
                </div>
              )}
              <button 
                type="submit"
                style={{ width: '100%', padding: '10px', borderRadius: 10, background: '#ec4899', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
              >
                Unlock Host Mode
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Host Live Spreadsheet Grid Editor Modal */}
      <HostSpreadsheetEditorModal 
        isOpen={isSpreadsheetOpen}
        onClose={() => setIsSpreadsheetOpen(false)}
        nodes={nodes}
        onSaveDataset={handleSaveSpreadsheetData}
      />

      {/* Toast Notification */}
      {copyToast && (
        <div className="toast-notification">
          <Check style={{ width: 14, height: 14, color: '#34d399' }} />
          <span>{copyToast}</span>
        </div>
      )}
    </div>
  );
}
