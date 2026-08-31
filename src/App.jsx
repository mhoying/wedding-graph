import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  SlidersHorizontal, X, Camera, Sun, Moon, Layers, Palette, 
  Compass, Wand2, Edit3, Copy, Download, Heart, ShieldAlert, Check, Sparkles, Search
} from 'lucide-react';
import Papa from 'papaparse';

import { SAMPLE_NODES, SAMPLE_LINKS, SIDE_COLORS, STATE_COLORS, COHORT_COLORS, DYNAMIC_CLUSTER_COLORS } from './data/sampleData';
import { isSecretUrlAdmin, verifyPasscode, sanitizeInput } from './utils/security';
import { pushToGithubRepo, submitGuestProposalToGithub, fetchGuestProposalsFromGithub, closeGithubIssueProposal, generateSampleDataJsContent, generateGuestsCsvContent } from './utils/githubSync';
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
    ['wedding_graph_nodes_master', 'wedding_graph_nodes_v7', 'wedding_graph_nodes_v3', 'wedding_graph_nodes_v4', 'wedding_graph_nodes_v8', 'wedding_graph_nodes_v9', 'wedding_graph_nodes_v10', 'wedding_graph_nodes_v11', 'wedding_graph_nodes_v12', 'wedding_graph_nodes_v13', 'wedding_graph_nodes_v14', 'wedding_graph_nodes_v15', 'wedding_graph_nodes_v16', 'wedding_graph_nodes_v17', 'wedding_graph_nodes_v18', 'wedding_graph_nodes_v19', 'wedding_graph_nodes_v20', 'wedding_graph_nodes_v21', 'wedding_graph_nodes_v22', 'wedding_graph_nodes_v23', 'wedding_graph_nodes_v24', 'wedding_graph_nodes_v25', 'wedding_graph_nodes_v26', 'wedding_graph_nodes_v27', 'wedding_graph_nodes_v28', 'wedding_graph_nodes_v29', 'wedding_graph_nodes_v30', 'wedding_graph_nodes_v31', 'wedding_graph_nodes_v32', 'wedding_graph_nodes_v33', 'wedding_graph_nodes_v34', 'wedding_graph_nodes_v35', 'wedding_graph_nodes_v36', 'wedding_graph_nodes_v37', 'wedding_graph_nodes_v38', 'wedding_graph_nodes_v39', 'wedding_graph_nodes_v40', 'wedding_graph_nodes_v41', 'wedding_graph_nodes_v42', 'wedding_graph_nodes_v43', 'wedding_graph_nodes_v44', 'wedding_graph_nodes_v45', 'wedding_graph_nodes_v46', 'wedding_graph_nodes_v47', 'wedding_graph_nodes_v48', 'wedding_graph_nodes_v49', 'wedding_graph_nodes_v50', 'wedding_graph_nodes_v51', 'wedding_graph_nodes_v52', 'wedding_graph_nodes_v53', 'wedding_graph_nodes_v54', 'wedding_graph_nodes_v55', 'wedding_graph_nodes_v56', 'wedding_graph_nodes_v57', 'wedding_graph_nodes_v58', 'wedding_graph_nodes_v59', 'wedding_graph_nodes_v60', 'wedding_graph_nodes_v61', 'wedding_graph_nodes_v62', 'wedding_graph_nodes_v63', 'wedding_graph_nodes_v64', 'wedding_graph_nodes_v65', 'wedding_graph_nodes_v66', 'wedding_graph_nodes_v67', 'wedding_graph_nodes_v68', 'wedding_graph_nodes_v69', 'wedding_graph_nodes_v70', 'wedding_graph_nodes_v71', 'wedding_graph_nodes_v72', 'wedding_graph_nodes_v73', 'wedding_graph_nodes_v74', 'wedding_graph_nodes_v75', 'wedding_graph_nodes_v76', 'wedding_graph_nodes_v77', 'wedding_graph_nodes_v78', 'wedding_graph_nodes_v79', 'wedding_graph_nodes_v80', 'wedding_graph_nodes_v81', 'wedding_graph_nodes_v82', 'wedding_graph_nodes_v83', 'wedding_graph_nodes_v84', 'wedding_graph_nodes_v85', 'wedding_graph_nodes_v86', 'wedding_graph_nodes_v87', 'wedding_graph_nodes_v88', 'wedding_graph_nodes_v89', 'wedding_graph_links_v7', 'wedding_graph_links_v3', 'wedding_graph_links_v10', 'wedding_graph_links_v11', 'wedding_graph_links_v12', 'wedding_graph_links_v13', 'wedding_graph_links_v14', 'wedding_graph_links_v15', 'wedding_graph_links_v16', 'wedding_graph_links_v17', 'wedding_graph_links_v18', 'wedding_graph_links_v19', 'wedding_graph_links_v20', 'wedding_graph_links_v21', 'wedding_graph_links_v22', 'wedding_graph_links_v23', 'wedding_graph_links_v24', 'wedding_graph_links_v25', 'wedding_graph_links_v26', 'wedding_graph_links_v27', 'wedding_graph_links_v28', 'wedding_graph_links_v29', 'wedding_graph_links_v30', 'wedding_graph_links_v31', 'wedding_graph_links_v32', 'wedding_graph_links_v33', 'wedding_graph_links_v34', 'wedding_graph_links_v35', 'wedding_graph_links_v36', 'wedding_graph_links_v37', 'wedding_graph_links_v38', 'wedding_graph_links_v39', 'wedding_graph_links_v40', 'wedding_graph_links_v41', 'wedding_graph_links_v42', 'wedding_graph_links_v43', 'wedding_graph_links_v44', 'wedding_graph_links_v45', 'wedding_graph_links_v46', 'wedding_graph_links_v47', 'wedding_graph_links_v48', 'wedding_graph_links_v49', 'wedding_graph_links_v50', 'wedding_graph_links_v51', 'wedding_graph_links_v52', 'wedding_graph_links_v53', 'wedding_graph_links_v54', 'wedding_graph_links_v55', 'wedding_graph_links_v56', 'wedding_graph_links_v57', 'wedding_graph_links_v58', 'wedding_graph_links_v59', 'wedding_graph_links_v60', 'wedding_graph_links_v61', 'wedding_graph_links_v62', 'wedding_graph_links_v63', 'wedding_graph_links_v64', 'wedding_graph_links_v65', 'wedding_graph_links_v66', 'wedding_graph_links_v67', 'wedding_graph_links_v68', 'wedding_graph_links_v69', 'wedding_graph_links_v70', 'wedding_graph_links_v71', 'wedding_graph_links_v72', 'wedding_graph_links_v73', 'wedding_graph_links_v74', 'wedding_graph_links_v75', 'wedding_graph_links_v76', 'wedding_graph_links_v77', 'wedding_graph_links_v78', 'wedding_graph_links_v79', 'wedding_graph_links_v80', 'wedding_graph_links_v81', 'wedding_graph_links_v82', 'wedding_graph_links_v83', 'wedding_graph_links_v84', 'wedding_graph_links_v85', 'wedding_graph_links_v86', 'wedding_graph_links_v87', 'wedding_graph_links_v88', 'wedding_graph_links_v89'].forEach(k => {
      try { localStorage.removeItem(k); } catch(e) {}
    });
  }, []);

  const [nodes, setNodes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_graph_nodes_v90');
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
      const saved = localStorage.getItem('wedding_graph_links_v90');
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
        let processedSet = new Set();
        try {
          processedSet = new Set(JSON.parse(localStorage.getItem('wedding_graph_processed_proposals') || '[]'));
        } catch (e) {}

        setFeedbackList(prev => {
          const safePrev = Array.isArray(prev) ? prev : [];
          const existingIds = new Set(safePrev.map(p => p && p.id));
          const newRemote = githubProposals.filter(p => {
            if (!p || !p.id) return false;
            if (processedSet.has(p.id)) return false;
            if (p.issueNumber && processedSet.has(`issue_${p.issueNumber}`)) return false;
            if (existingIds.has(p.id)) return false;
            return true;
          });
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
  const [edgeLengthMultiplier, setEdgeLengthMultiplier] = useState(1.3);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [orbitSpeed, setOrbitSpeed] = useState(0.3);

  // Security & Event Access Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (isSecretUrlAdmin()) return true;
    try {
      return localStorage.getItem('wedding_graph_authenticated') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [gateInput, setGateInput] = useState('');
  const [gateError, setGateError] = useState(false);

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
      localStorage.setItem('wedding_graph_nodes_v85', JSON.stringify(combinedNodes));
    } catch (e) {}

    setCopyToast('⚡ Committing updated spreadsheet dataset to GitHub Repo...');
    const jsContent = generateSampleDataJsContent(combinedNodes, links);
    let result = await pushToGithubRepo(jsContent, 'Update guest spreadsheet dataset via Host Admin Suite', '', 'src/data/sampleData.js');

    if (!result.success && result.isTokenError) {
      const userToken = window.prompt(
        '🔑 GitHub Token Permission Error (403): "Resource not accessible by personal access token"\n\n' +
        'If using a GitHub Fine-Grained Token, ensure Repository Permissions has:\n' +
        '• Contents: Read and write\n' +
        '• Issues: Read and write\n\n' +
        'Please enter a GitHub Personal Access Token (PAT) with repo / contents permission:'
      );
      if (userToken && userToken.trim()) {
        localStorage.setItem('wedding_graph_gh_token', userToken.trim());
        setCopyToast('⚡ Retrying direct commit with new token...');
        result = await pushToGithubRepo(jsContent, 'Update guest spreadsheet dataset via Host Admin Suite', userToken.trim(), 'src/data/sampleData.js');
      }
    }

    setCopyToast(result.message);
    setTimeout(() => setCopyToast(''), 5500);
  };

  const handleApplyDataset = useCallback((newNodes, newLinks) => {
    setNodes(newNodes);
    setLinks(newLinks);
    try {
      localStorage.setItem('wedding_graph_nodes_v85', JSON.stringify(newNodes));
      localStorage.setItem('wedding_graph_links_v85', JSON.stringify(newLinks));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, []);

  const handleAddConnection = useCallback((newLink) => {
    setLinks(prev => {
      const updated = [...prev, newLink];
      try {
        localStorage.setItem('wedding_graph_links_v85', JSON.stringify(updated));
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

  const [isListView, setIsListView] = useState(false);

  // Camera & Node Drag Handlers (Uses centerAt + 1.35x Zoom for Single Node to take up exactly ~1/5th of viewport width!)
  const flyToNode = useCallback((targetNodeOrNodes) => {
    setIsOrbiting(false);
    const nodeArray = Array.isArray(targetNodeOrNodes) ? targetNodeOrNodes.filter(Boolean) : [targetNodeOrNodes].filter(Boolean);
    
    if (nodeArray.length === 0 || !fgRef.current) return;

    nodeArray.forEach(node => {
      if (node && node.x !== undefined && node.y !== undefined) {
        node.fx = node.x;
        node.fy = node.y;
      }
    });

    if (typeof fgRef.current.d3ReheatSimulation === 'function') {
      fgRef.current.d3ReheatSimulation();
    }

    if (nodeArray.length === 1) {
      const target = nodeArray[0];
      if (target && target.x !== undefined && target.y !== undefined) {
        if (typeof fgRef.current.centerAt === 'function') {
          fgRef.current.centerAt(target.x, target.y, 800);
        }
        if (typeof fgRef.current.zoom === 'function') {
          fgRef.current.zoom(1.35, 800);
        }
      }
    } else if (nodeArray.length > 1) {
      const targetIdSet = new Set(nodeArray.map(n => n.id));
      if (typeof fgRef.current.zoomToFit === 'function') {
        fgRef.current.zoomToFit(800, 180, (canvasItem) => Boolean(canvasItem && canvasItem.id && targetIdSet.has(canvasItem.id)));
      }
    }
  }, [setIsOrbiting]);

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

  // Magic Link Auto-Targeting Effect (?guest=id or ?name=Name or ?id=node_id)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest') || params.get('id') || params.get('node');
    const nameParam = params.get('name');

    if (!guestParam && !nameParam) return;

    let targetNode = null;
    if (guestParam) {
      const q = guestParam.toLowerCase().trim();
      targetNode = nodes.find(n => n && n.id && n.id.toLowerCase() === q) ||
                   nodes.find(n => n && n.name && n.name.toLowerCase().replace(/\s+/g, '_') === q);
    }
    if (!targetNode && nameParam) {
      const q = nameParam.toLowerCase().trim();
      targetNode = nodes.find(n => n && n.name && n.name.toLowerCase().includes(q));
    }

    if (targetNode) {
      const timer = setTimeout(() => {
        setSelectedNode(targetNode);
        flyToNode(targetNode);
        setCopyToast(`✨ Welcome! Zoomed in on ${targetNode.name}`);
        setTimeout(() => setCopyToast(''), 4500);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [nodes, flyToNode]);

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
    if (node.cohort === 'Other' || !node.cohort) return '#64748b';

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
      if (!node) return;
      
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

  // Orbit Force Factory: Smooth kinematic rotation with dynamic in-place speed updates!
  const createOrbitForce = useCallback((initialSpeedMultiplier = 1.0) => {
    let speedMult = initialSpeedMultiplier;

    const force = (alpha) => {
      const omega = 0.006 * speedMult;
      nodes.forEach(node => {
        if (!node || node.id === 'maureen' || node.id === 'matt' || node.type === 'CONTEXT_HUB') return;
        const x = node.x || 0;
        const y = node.y || 0;
        const r = Math.hypot(x, y);
        if (r > 10) {
          const theta = Math.atan2(y, x);
          const newTheta = theta + omega;
          const targetX = r * Math.cos(newTheta);
          const targetY = r * Math.sin(newTheta);

          const tangVx = targetX - x;
          const tangVy = targetY - y;

          node.vx += (tangVx * 1.5 - node.vx) * 0.35;
          node.vy += (tangVy * 1.5 - node.vy) * 0.35;
        }
      });
    };

    force.initialize = () => {};
    force.updateSpeed = (newSpeed) => {
      speedMult = newSpeed;
    };
    return force;
  }, [nodes]);

  // Camera & Node Drag Handlers

  const handleNodeClick = useCallback((node) => {
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
  }, [isPathMode, pathStartId, flyToNode]);

  const handleNodeDrag = useCallback((node) => {
    if (!node || node.id === 'matt' || node.id === 'maureen') return;
    node.fx = node.x;
    node.fy = node.y;

    // Apply gentle elastic spring pull to directly attached neighbor nodes while dragging
    (links || []).forEach(l => {
      if (!l) return;
      const sId = typeof l.source === 'object' ? l.source.id : l.source;
      const tId = typeof l.target === 'object' ? l.target.id : l.target;

      let nbrObj = null;
      if (sId === node.id) nbrObj = typeof l.target === 'object' ? l.target : nodes.find(n => n.id === tId);
      else if (tId === node.id) nbrObj = typeof l.source === 'object' ? l.source : nodes.find(n => n.id === sId);

      if (nbrObj && nbrObj.id !== 'matt' && nbrObj.id !== 'maureen') {
        const dx = node.x - (nbrObj.x || 0);
        const dy = node.y - (nbrObj.y || 0);
        nbrObj.vx += dx * 0.06;
        nbrObj.vy += dy * 0.06;
      }
    });
  }, [links, nodes]);

  const handleNodeDragEnd = useCallback((node) => {
    if (!node || node.id === 'matt' || node.id === 'maureen') return;
    // Release fixed anchor on drag end so the node resumes orbiting with the rest of the galaxy!
    node.fx = undefined;
    node.fy = undefined;
  }, []);

  const handleZoom = useCallback(({ k }) => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      if (Math.abs(currentZoom - (fgRef.current._lastZoom || 1)) > 0.15) {
        fgRef.current._lastZoom = currentZoom;
        fgRef.current.d3ReheatSimulation();
      }
    }
  }, []);

  // Clear node pins on deselection
  const handleCloseProfile = useCallback(() => {
    setSelectedNode(null);
    (nodes || []).forEach(n => {
      if (n && n.id !== 'matt' && n.id !== 'maureen') {
        n.fx = undefined;
        n.fy = undefined;
      }
    });
  }, [nodes]);

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
      localStorage.setItem('wedding_graph_nodes_v85', JSON.stringify(updated));
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
      const path = computeShortestPath(pathStartId, pathEndId);
      setShortestPath(path);
      if (path && path.length >= 2) {
        const pathNodes = (nodes || []).filter(n => n && path.includes(n.id));
        flyToNode(pathNodes, 300);
      }
    } else {
      setShortestPath([]);
    }
  }, [pathStartId, pathEndId, computeShortestPath, nodes, flyToNode]);

  // Dynamic Inverse Tag Frequency (IDF) Weights for Interests
  const tagWeights = useMemo(() => {
    const counts = {};
    (nodes || []).filter(gn => gn && gn.type === 'GUEST').forEach(itemNode => {
      (itemNode.hobbies || []).forEach(h => {
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
        isListView={isListView}
        setIsListView={setIsListView}
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
              {(nodes || []).filter(n => n && n.name).sort((a, b) => (a.name || '').localeCompare(b.name || '')).map(n => (
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
              {(nodes || []).filter(n => n && n.name && n.id !== pathStartId).sort((a, b) => (a.name || '').localeCompare(b.name || '')).map(n => (
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

      {/* Path Connections Table Modal Breakdown Card */}
      {isPathMode && shortestPath.length >= 2 && (
        <div className="glass-panel path-table-card no-print" style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9000,
          width: 'calc(100vw - 40px)',
          maxWidth: 720,
          maxHeight: '40vh',
          overflowY: 'auto',
          padding: '16px 20px',
          borderRadius: 20,
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6)',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="drawer-badge" style={{ backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Compass style={{ width: 12, height: 12 }} /> Connection Path Breakdown
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#34d399' }}>
                {shortestPath.length - 1} {shortestPath.length - 1 === 1 ? 'hop' : 'hops'} between {nodes.find(n => n.id === shortestPath[0])?.name} & {nodes.find(n => n.id === shortestPath[shortestPath.length - 1])?.name}
              </span>
            </div>
            <button 
              onClick={() => { setPathStartId(''); setPathEndId(''); setShortestPath([]); }}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X style={{ width: 16, height: 16 }} />
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 6px', width: 40 }}>#</th>
                <th style={{ padding: '8px 6px' }}>Person</th>
                <th style={{ padding: '8px 6px' }}>Cohort</th>
                <th style={{ padding: '8px 6px' }}>Location</th>
                <th style={{ padding: '8px 6px' }}>Tags & Interests</th>
              </tr>
            </thead>
            <tbody>
              {shortestPath.map((nodeId, index) => {
                const n = nodes.find(item => item.id === nodeId);
                if (!n) return null;
                const isStart = index === 0;
                const isEnd = index === shortestPath.length - 1;
                const cohortColor = COHORT_COLORS[n.cohort] || '#64748b';
                const loc = n.currentlyLivesIn || n.originallyFrom || n.state || 'N/A';
                const tags = (n.hobbies && n.hobbies.length > 0) ? n.hobbies : [n.relationship || n.side || 'Guest'];

                return (
                  <tr 
                    key={n.id}
                    onClick={() => { flyToNode(n); setSelectedNode(n); }}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '8px 6px', fontWeight: 800, color: isStart || isEnd ? '#38bdf8' : '#94a3b8' }}>
                      {index + 1}
                    </td>
                    <td style={{ padding: '8px 6px', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {n.image ? (
                        <img src={n.image} alt={n.name} style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ width: 22, height: 22, borderRadius: '50%', background: cohortColor, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#fff' }}>
                          {n.name?.charAt(0)}
                        </span>
                      )}
                      <span>{n.name}</span>
                      {isStart && <span style={{ fontSize: 10, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '1px 6px', borderRadius: 9999, fontWeight: 700 }}>Start</span>}
                      {isEnd && <span style={{ fontSize: 10, background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '1px 6px', borderRadius: 9999, fontWeight: 700 }}>End</span>}
                    </td>
                    <td style={{ padding: '8px 6px' }}>
                      <span style={{ fontSize: 11, background: `${cohortColor}25`, color: cohortColor, border: `1px solid ${cohortColor}40`, padding: '2px 8px', borderRadius: 9999, fontWeight: 700 }}>
                        {n.cohort || 'Other'}
                      </span>
                    </td>
                    <td style={{ padding: '8px 6px', color: '#cbd5e1', fontSize: 12 }}>
                      {loc}
                    </td>
                    <td style={{ padding: '8px 6px' }}>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {tags.slice(0, 3).map(tag => (
                          <span key={tag} style={{ fontSize: 10, background: 'rgba(255, 255, 255, 0.08)', color: '#94a3b8', padding: '1px 6px', borderRadius: 6 }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
            isListView={isListView}
            setIsListView={setIsListView}
            isLightMode={isLightMode}
            setIsLightMode={setIsLightMode}
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

      {/* Alphabetical Guest Directory List View Modal Panel */}
      {isListView && (
        <div className="modal-backdrop no-print" onClick={() => setIsListView(false)} style={{ zIndex: 99950 }}>
          <div 
            className="glass-panel modal-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: 680, 
              width: '94vw', 
              maxHeight: '85vh', 
              display: 'flex', 
              flexDirection: 'column', 
              padding: 20, 
              borderRadius: 24,
              background: 'rgba(15, 23, 42, 0.96)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)'
            }}
          >
            {/* Header Title & Close Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>📋</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: '#f8fafc' }}>Guest Directory List</h2>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>
                    Showing {(filteredNodes || []).filter(n => n && n.type === 'GUEST').length} of {(nodes || []).filter(n => n && n.type === 'GUEST').length} wedding guests
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsListView(false)} 
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#94a3b8', padding: '6px 12px', borderRadius: 9999, cursor: 'pointer', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <span>Close</span>
                <X style={{ width: 14, height: 14 }} />
              </button>
            </div>

            {/* Quick Search & Filter Filter Input */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search style={{ position: 'absolute', left: 12, width: 14, height: 14, color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Filter directory by name, cohort, location, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 34px',
                    borderRadius: 12,
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: 12
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    style={{ position: 'absolute', right: 10, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                  >
                    <X style={{ width: 12, height: 12 }} />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Guest Directory Cards List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 4 }}>
              {(filteredNodes || [])
                .filter(n => n && n.type === 'GUEST')
                .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
                .map(guest => {
                  const cohortColor = COHORT_COLORS[guest.cohort] || '#38bdf8';
                  return (
                    <div 
                      key={guest.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        gap: 12,
                        padding: 12,
                        borderRadius: 16,
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* Left: Avatar + Name + Info */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
                        <div style={{
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          background: cohortColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 900,
                          fontSize: 15,
                          flexShrink: 0,
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}>
                          {guest.name ? guest.name.charAt(0) : '?'}
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 800, fontSize: 14, color: '#f8fafc' }}>{guest.name}</span>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 9999, background: `${cohortColor}25`, color: cohortColor, border: `1px solid ${cohortColor}50` }}>
                              {guest.cohort || 'Other'}
                            </span>
                          </div>
                          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {guest.currentlyLivesIn && (
                              <span>📍 {guest.currentlyLivesIn}</span>
                            )}
                            {guest.originallyFrom && (
                              <span>🏡 Originally: {guest.originallyFrom}</span>
                            )}
                          </div>
                          {guest.hobbies && guest.hobbies.length > 0 && (
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                              {guest.hobbies.map(tag => (
                                <span key={tag} style={{ fontSize: 9, background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', padding: '1px 6px', borderRadius: 6 }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Quick Action Buttons */}
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <button 
                          onClick={() => {
                            setIsListView(false);
                            flyToNode(guest);
                            setSelectedNode(guest);
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 10,
                            background: 'rgba(56, 189, 248, 0.2)',
                            color: '#38bdf8',
                            border: '1px solid rgba(56, 189, 248, 0.4)',
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Search style={{ width: 12, height: 12 }} />
                          <span>Inspect</span>
                        </button>
                        <button 
                          onClick={() => {
                            setIsListView(false);
                            setIsPathMode(true);
                            setPathStartId(guest.id);
                            flyToNode(guest);
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 10,
                            background: 'rgba(16, 185, 129, 0.2)',
                            color: '#34d399',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Compass style={{ width: 12, height: 12 }} />
                          <span>Path</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Guest Profile Metadata Drawer */}
      <GuestProfileDrawer 
        selectedNode={selectedNode}
        nodes={nodes}
        onClose={handleCloseProfile}
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
        nodes={nodes}
        onApprove={(proposal) => {
          const cleanTarget = (proposal.targetName || '').split(':')[0].replace(/^(Edit|Proposal|Update|Fix):?/i, '').trim().toLowerCase();
          const cleanTargetId = (proposal.targetId || '').toLowerCase();
          const category = (proposal.category || '').toLowerCase();
          const noteText = (proposal.note || '').trim();

          setNodes(prev => {
            const updated = prev.map(node => {
              const nodeName = (node.name || '').toLowerCase();
              const nodeId = (node.id || '').toLowerCase();

              const isMatch = (cleanTargetId && nodeId === cleanTargetId) ||
                              (cleanTarget && (nodeName === cleanTarget || nodeName.includes(cleanTarget) || cleanTarget.includes(nodeName)));

              if (isMatch) {
                const newNode = { ...node };

                // 1. Name Updates
                if (proposal.proposedName) {
                  newNode.name = proposal.proposedName;
                } else if (noteText.includes('Name:')) {
                  const match = noteText.match(/Name:\s*([^|\n]+)/i);
                  if (match) newNode.name = match[1].trim();
                }

                // 2. Location / Hometown Updates
                if (proposal.proposedLocation) {
                  newNode.currentlyLivesIn = proposal.proposedLocation;
                  newNode.state = proposal.proposedLocation;
                }
                if (proposal.proposedOriginallyFrom) {
                  newNode.originallyFrom = proposal.proposedOriginallyFrom;
                  newNode.hometown = proposal.proposedOriginallyFrom;
                }

                // Parse Location from Note or Category
                if (category.includes('hometown') || category.includes('state') || category.includes('location')) {
                  const locVal = noteText.replace(/^(Lives In|Location|Originally From|Hometown|State|State Correction|Edit):?/i, '').trim();
                  if (locVal) {
                    newNode.currentlyLivesIn = locVal;
                    newNode.state = locVal;
                    newNode.originallyFrom = locVal;
                    newNode.hometown = locVal;
                  }
                } else if (noteText.includes('Lives In:') || noteText.includes('Location:')) {
                  const match = noteText.match(/(?:Lives In|Location):\s*([^|\n]+)/i);
                  if (match) {
                    newNode.currentlyLivesIn = match[1].trim();
                    newNode.state = match[1].trim();
                  }
                } else if (noteText.includes('Originally From:') || noteText.includes('Hometown:')) {
                  const match = noteText.match(/(?:Originally From|Hometown):\s*([^|\n]+)/i);
                  if (match) {
                    newNode.originallyFrom = match[1].trim();
                    newNode.hometown = match[1].trim();
                  }
                }

                // 3. Cohort & Side Updates
                if (proposal.proposedCohort) {
                  newNode.cohort = proposal.proposedCohort;
                } else if (noteText.includes('Cohort:')) {
                  const match = noteText.match(/Cohort:\s*([^|\n]+)/i);
                  if (match) newNode.cohort = match[1].trim();
                }

                if (proposal.proposedSide) {
                  newNode.side = proposal.proposedSide;
                } else if (noteText.includes('Side:')) {
                  const match = noteText.match(/Side:\s*([^|\n]+)/i);
                  if (match) newNode.side = match[1].trim();
                }

                // 4. Relationship Updates
                if (proposal.proposedRelationship) {
                  newNode.relationship = proposal.proposedRelationship;
                } else if (category.includes('relationship') || category.includes('family')) {
                  const relVal = noteText.replace(/^(Relationship|Family|Status|Correction|Edit):?/i, '').trim();
                  if (relVal) newNode.relationship = relVal;
                } else if (noteText.includes('Relationship:')) {
                  const match = noteText.match(/Relationship:\s*([^|\n]+)/i);
                  if (match) newNode.relationship = match[1].trim();
                }

                // 5. Hobbies / Interests Updates
                if (proposal.proposedHobbies || category.includes('interest') || category.includes('hobby') || noteText) {
                  const hobbyText = proposal.proposedHobbies || noteText;
                  if (hobbyText && !category.includes('hometown') && !category.includes('state') && !category.includes('location') && !category.includes('relationship')) {
                    const newHobbies = hobbyText
                      .split(/[,;\n]/)
                      .map(h => h.replace(/^(Add|Proposed|Interest|hobbies|hometown|Name|Lives In|Originally From|Group|Relationship|Category|Notes \/ Details):?/i, '').trim())
                      .filter(h => h && !h.includes(':') && !h.toLowerCase().includes('proposal') && !h.toLowerCase().includes('guest name'));

                    if (newHobbies.length > 0) {
                      newNode.hobbies = Array.from(new Set([...(newNode.hobbies || []), ...newHobbies]));
                    }
                  }
                }

                return newNode;
              }
              return node;
            });

            try {
              localStorage.setItem('wedding_graph_nodes_v3', JSON.stringify(updated));
            } catch (e) {}

            const jsContent = generateSampleDataJsContent(updated, links);
            pushToGithubRepo(jsContent, `Approve proposal for ${proposal.targetName}`, '', 'src/data/sampleData.js');

            const csvContent = generateGuestsCsvContent(updated);
            pushToGithubRepo(csvContent, `Sync guests CSV for ${proposal.targetName} approval`, '', 'public/guests_template.csv');

            return updated;
          });

          try {
            const processedSet = new Set(JSON.parse(localStorage.getItem('wedding_graph_processed_proposals') || '[]'));
            if (proposal.id) processedSet.add(proposal.id);
            if (proposal.issueNumber) processedSet.add(`issue_${proposal.issueNumber}`);
            localStorage.setItem('wedding_graph_processed_proposals', JSON.stringify(Array.from(processedSet)));
          } catch (e) {}

          if (proposal.issueNumber) {
            closeGithubIssueProposal(proposal.issueNumber);
          }

          setFeedbackList(prev => (prev || []).filter(p => p && p.id !== proposal.id && (p.issueNumber ? p.issueNumber !== proposal.issueNumber : true)));
          setCopyToast(`🚀 Approved edit for ${proposal.targetName} & Auto-Committed to Database!`);
          setTimeout(() => setCopyToast(''), 4500);
        }}
        onReject={(proposal) => {
          try {
            const processedSet = new Set(JSON.parse(localStorage.getItem('wedding_graph_processed_proposals') || '[]'));
            if (proposal.id) processedSet.add(proposal.id);
            if (proposal.issueNumber) processedSet.add(`issue_${proposal.issueNumber}`);
            localStorage.setItem('wedding_graph_processed_proposals', JSON.stringify(Array.from(processedSet)));
          } catch (e) {}

          if (proposal.issueNumber) {
            closeGithubIssueProposal(proposal.issueNumber);
          }
          setFeedbackList(prev => (prev || []).filter(p => p && p.id !== proposal.id && (p.issueNumber ? p.issueNumber !== proposal.issueNumber : true)));
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
        allInterests={availableClusters.interests}
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

      {/* First-Time Visitor Event Passcode Gate Screen */}
      {!isAuthenticated && (
        <div className="passcode-gate-container no-print">
          <div className="passcode-card glass-panel">
            <div className="passcode-icon-ring">
              <Sparkles style={{ width: 32, height: 32, color: '#38bdf8' }} />
            </div>
            <h1 className="passcode-title" style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 6 }}>
              Maureen & Matt's Wedding Universe
            </h1>
            <p className="passcode-subtitle" style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>
              Please enter the event passcode to enter the guest universe:
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const code = gateInput.trim().toLowerCase();
                if (code === 'hoyingwink-honk') {
                  try {
                    localStorage.setItem('wedding_graph_authenticated', 'true');
                  } catch (err) {}
                  setIsAuthenticated(true);
                  setGateError(false);
                } else {
                  setGateError(true);
                }
              }}
              style={{ width: '100%' }}
            >
              <div style={{ position: 'relative', width: '100%', marginBottom: 14 }}>
                <input 
                  type="password"
                  placeholder="Enter Event Passcode..."
                  value={gateInput}
                  onChange={(e) => {
                    setGateInput(e.target.value);
                    setGateError(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: 14,
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: gateError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 700,
                    letterSpacing: 1
                  }}
                  autoFocus
                />
              </div>

              {gateError && (
                <div style={{ color: '#f87171', fontSize: 12, marginBottom: 14, fontWeight: 700 }}>
                  ❌ Incorrect passcode. Please try again!
                </div>
              )}

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.4)'
                }}
              >
                Enter Wedding Universe 🚀
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
