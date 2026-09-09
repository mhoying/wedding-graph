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
import LiveLeaderboardModal from './components/LiveLeaderboardModal';
import MobileQuickDock from './components/MobileQuickDock';
import {
  purgeLegacyStorage,
  getStoredGaggleData,
  getActivePlayer,
  setActivePlayer,
  logHonkEncounter,
  calculateGooseLeaderboards,
  fetchRemoteEncounters,
  flushUnsyncedEncounters,
  normalizeName
} from './utils/gaggleStore';
import HostSpreadsheetEditorModal from './components/HostSpreadsheetEditorModal';
import DynamicColorLegend from './components/DynamicColorLegend';

export default function App() {
  const fgRef = useRef();
  const imageCacheRef = useRef({});

  // Core Data State (Purges old localStorage cache on new build deployment)
  useEffect(() => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('wedding_graph_nodes_') && key !== 'wedding_graph_nodes_v114') {
          localStorage.removeItem(key);
        }
      });
    } catch(e) {}
  }, []);

  const [nodes, setNodes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_graph_nodes_v114');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(n => {
            const sample = SAMPLE_NODES.find(sn => sn.id === n.id);
            return {
              ...n,
              type: sample?.type || n.type,
              image: sample?.image || n.image,
              isAttending: sample ? sample.isAttending : n.isAttending,
              rsvpStatus: sample ? sample.rsvpStatus : n.rsvpStatus,
              attendanceStatus: sample ? sample.attendanceStatus : n.attendanceStatus,
              hobbies: Array.isArray(n.hobbies)
                ? n.hobbies
                : (typeof n.hobbies === 'string'
                  ? n.hobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean)
                  : [])
            };
          });
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
    return [];
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
  const [fontScaleMultiplier, setFontScaleMultiplier] = useState(1.0);
  const [edgeLengthMultiplier, setEdgeLengthMultiplier] = useState(1.3);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [orbitSpeed, setOrbitSpeed] = useState(0.3);
  const wasOrbitingBeforeDetailRef = useRef(false);

  // Security & Event Access Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [gateInput, setGateInput] = useState('');
  const [gateError, setGateError] = useState(false);

  // Hidden Security & Host Admin Mode State
  const [isAdmin, setIsAdmin] = useState(() => isSecretUrlAdmin());
  const [passcodePromptOpen, setPasscodePromptOpen] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Modals & Drawers
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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

  // Grand Gaggle Championship State
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [activePlayer, setActivePlayerState] = useState(() => getActivePlayer());
  const [gaggleStore, setGaggleStore] = useState(() => {
    purgeLegacyStorage();
    return getStoredGaggleData();
  });

  const gaggleLeaderboards = React.useMemo(() => {
    return calculateGooseLeaderboards(
      gaggleStore.encounters,
      gaggleStore.playerSprintStarts,
      nodes.filter(n => n && n.type === 'GUEST')
    );
  }, [gaggleStore, nodes]);

  // On-demand & background polling for remote encounters when leaderboard is open
  const syncRemoteEncounters = useCallback(async () => {
    const updated = await fetchRemoteEncounters();
    if (updated) {
      setGaggleStore({ ...updated });
    }
  }, []);

  useEffect(() => {
    if (isLeaderboardOpen) {
      syncRemoteEncounters();
      const interval = setInterval(() => {
        syncRemoteEncounters();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isLeaderboardOpen, syncRemoteEncounters]);

  const handleOpenLeaderboard = () => {
    setIsLeaderboardOpen(true);
  };

  // Player Identity Selector Modal State
  const [isPlayerSelectOpen, setIsPlayerSelectOpen] = useState(false);
  const [pendingHonkNode, setPendingHonkNode] = useState(null);

  const handleLogHonk = (targetGuest) => {
    if (!targetGuest) return;

    let playerToUse = activePlayer;
    if (!playerToUse || playerToUse === 'Guest Goose') {
      setPendingHonkNode(targetGuest);
      setIsPlayerSelectOpen(true);
      return;
    }

    executeHonk(playerToUse, targetGuest);
  };

  const executeHonk = async (playerToUse, targetGuest) => {
    // Calculate baseline rank before honk
    const beforeStats = calculateGooseLeaderboards(gaggleStore.encounters || [], gaggleStore.playerSprintStarts || {}, nodes.filter(n => n && n.type === 'GUEST'));
    const beforeRank = (beforeStats.masterGaggleLeaderboard || []).findIndex(p => p.name === playerToUse) + 1;

    const updated = logHonkEncounter(playerToUse, targetGuest, nodes);
    if (updated) {
      // 1. Persist active player identity
      setActivePlayer(playerToUse);
      setActivePlayerState(playerToUse);

      // 2. Update store state with fresh object reference to force re-render
      setGaggleStore({ ...updated });

      // 3. Confirm encounter is verified in local store using exact normalizeName matching
      const normActive = normalizeName(playerToUse);
      const normTarget = normalizeName(targetGuest.name);

      const isConfirmed = (updated.encounters || []).some(e => {
        if (!e.actor || !e.target || !normActive || !normTarget) return false;
        return normalizeName(e.actor) === normActive && normalizeName(e.target) === normTarget;
      });

      if (isConfirmed) {
        // Calculate new rank after confirmed honk
        const afterStats = calculateGooseLeaderboards(updated.encounters || [], updated.playerSprintStarts || {}, nodes.filter(n => n && n.type === 'GUEST'));
        const afterRank = (afterStats.masterGaggleLeaderboard || []).findIndex(p => p.name === playerToUse) + 1;
        const rankMsg = (beforeRank > 0 && afterRank < beforeRank) 
          ? ` 🎉 RANK UP! You moved up to #${afterRank}!` 
          : ` (Current Rank: #${afterRank || 1})`;

        setCopyToast(`🪿 HONK CONFIRMED! Encounter logged with ${targetGuest.name}! +1 Flock!${rankMsg}`);
        setTimeout(() => setCopyToast(''), 5000);

        // Update selectedNode object reference to trigger UI transformation to green badge
        setSelectedNode({ ...targetGuest });
      }
    }
  };

  const handleSaveSpreadsheetData = async (updatedGuestNodes) => {
    // Preserve non-guest anchor nodes
    const nonGuestNodes = nodes.filter(n => n && n.type !== 'GUEST');
    const combinedNodes = [...nonGuestNodes, ...updatedGuestNodes];
    setNodes(combinedNodes);

    try {
      localStorage.setItem('wedding_graph_nodes_v112', JSON.stringify(combinedNodes));
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
      localStorage.setItem('wedding_graph_nodes_v112', JSON.stringify(newNodes));
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
    localStorage.setItem('wedding_graph_nodes_v114', JSON.stringify(nodes));
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

  // Expose window test helpers for automated E2E verification
  useEffect(() => {
    window.__selectNodeForTesting = (nodeName) => {
      const found = nodes.find(n => n && n.name && n.name.toLowerCase().includes(nodeName.toLowerCase()));
      if (found) setSelectedNode(found);
      return found;
    };
    window.__setActivePlayerForTesting = (name) => {
      setActivePlayer(name);
      setActivePlayerState(name);
    };
  }, [nodes]);

  // Camera & Node Drag Handlers (Freezes physics simulation & flies camera to target node)
  const flyToNode = useCallback((targetNodeOrNodes) => {
    const nodeArray = Array.isArray(targetNodeOrNodes) ? targetNodeOrNodes.filter(Boolean) : [targetNodeOrNodes].filter(Boolean);
    
    if (nodeArray.length === 0 || !fgRef.current) return;

    // FREEZE NODE MOVEMENT IMMEDIATELY so target node does not drift off screen!
    if (typeof setIsOrbiting === 'function') {
      setIsOrbiting(false);
    }
    if (typeof fgRef.current.d3AlphaTarget === 'function') {
      fgRef.current.d3AlphaTarget(0);
    }
    if (Array.isArray(nodes)) {
      nodes.forEach(n => {
        if (n) {
          n.vx = 0;
          n.vy = 0;
          if (n.id !== 'matt' && n.id !== 'maureen') {
            n.fx = n.x;
            n.fy = n.y;
          }
        }
      });
    }

    if (nodeArray.length === 1) {
      const target = nodeArray[0];
      if (target && target.x !== undefined && target.y !== undefined) {
        const isMobile = window.innerWidth < 768;
        const targetZoom = isMobile ? 3.2 : 4.2;
        let targetX = target.x;
        let targetY = target.y;

        if (isMobile) {
          // Calculate exact midpoint between bottom of top title bar (62px) and top of mobile details drawer (~380px from bottom)
          const headerBottom = 62;
          const drawerHeight = Math.min(window.innerHeight * 0.48, 380);
          const drawerTop = window.innerHeight - drawerHeight;
          const desiredScreenY = headerBottom + (drawerTop - headerBottom) / 2;
          const screenCenterY = window.innerHeight / 2;
          const screenDeltaY = desiredScreenY - screenCenterY;
          targetY = target.y - (screenDeltaY / targetZoom);
        } else {
          targetX = target.x + 50;
        }

        if (typeof fgRef.current.zoom === 'function') {
          // Set zoom level (0ms instant scale change)
          fgRef.current.zoom(targetZoom, 0);
        }
        if (typeof fgRef.current.centerAt === 'function') {
          // Smooth 800ms pan transition to target coordinates
          fgRef.current.centerAt(targetX, targetY, 800);
        }
      }
    } else if (nodeArray.length > 1) {
      const targetIdSet = new Set(nodeArray.map(n => n.id));
      if (typeof fgRef.current.zoomToFit === 'function') {
        fgRef.current.zoomToFit(800, 180, (canvasItem) => Boolean(canvasItem && canvasItem.id && targetIdSet.has(canvasItem.id)));
      }
    }
  }, [nodes, setIsOrbiting]);

  // Secret URL Parameter & Secret Keyboard Shortcut Listener (`Ctrl + Shift + A`)
  useEffect(() => {
    if (isSecretUrlAdmin()) {
      setIsAdmin(true);
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedNode(null);
        setIsLeaderboardOpen(false);
        setIsMatchmakerOpen(false);
        setIsListView(false);
        setIsMobileControlsOpen(false);
        setIsSpreadsheetOpen(false);
        setIsFeedbackQueueOpen(false);
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setPasscodePromptOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initial Mobile Camera Setup: Center on "THE COUPLE" (0, 0) at wide 0.5x zoom on mobile viewports
  useEffect(() => {
    if (isMobileViewport && fgRef.current) {
      const timer = setTimeout(() => {
        if (fgRef.current && typeof fgRef.current.zoom === 'function' && typeof fgRef.current.centerAt === 'function') {
          fgRef.current.centerAt(0, 0, 800);
          fgRef.current.zoom(0.5, 800);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isMobileViewport]);

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
      const hobbiesArr = Array.isArray(node.hobbies) ? node.hobbies : (typeof node.hobbies === 'string' ? node.hobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean) : []);
      if (selectedClusterFocus) {
        const c = selectedClusterFocus.toLowerCase();
        const matchesCohort = node.cohort ? node.cohort.toLowerCase() === c : false;
        const matchesLocation = (node.currentlyLivesIn && node.currentlyLivesIn.toLowerCase() === c) || 
                                (node.originallyFrom && node.originallyFrom.toLowerCase() === c) ||
                                (node.state && node.state.toLowerCase() === c) ||
                                (node.hometown && node.hometown.toLowerCase() === c);
        const matchesInterest = hobbiesArr.some(h => String(h).toLowerCase() === c);
        if (!matchesCohort && !matchesLocation && !matchesInterest && node.type !== 'ANCHOR') {
          return false;
        }
      }
      if (selectedInterests && selectedInterests.length > 0) {
        if (!hobbiesArr.some(i => selectedInterests.includes(i))) return false;
      }
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = node.name ? node.name.toLowerCase().includes(q) : false;
        const matchesCohort = node.cohort ? node.cohort.toLowerCase().includes(q) : false;
        const matchesSide = node.side ? node.side.toLowerCase().includes(q) : false;
        const matchesInterest = hobbiesArr.some(h => String(h).toLowerCase().includes(q));
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

  const dynamicAutoClusters = useMemo(() => {
    const clusterMap = {};
    (nodes || []).forEach(node => {
      if (!node || node.type === 'CONTEXT_HUB') return;
      const hobbiesArr = Array.isArray(node.hobbies) ? node.hobbies : (typeof node.hobbies === 'string' ? node.hobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean) : []);
      if (hobbiesArr.length > 0) {
        hobbiesArr.forEach(tag => {
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

  // Orbit Force Factory: Smooth kinematic rotation with dynamic in-place speed & enable toggles!
  const createOrbitForce = useCallback((initialSpeedMultiplier = 1.0) => {
    let speedMult = initialSpeedMultiplier;
    let enabled = true;

    const force = (alpha) => {
      if (!enabled) return;
      const omega = 0.003 * speedMult;
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

          // Pure smooth orbital velocity without tangential shear
          node.vx += tangVx * 0.15;
          node.vy += tangVy * 0.15;
        }
      });
    };

    force.initialize = () => {};
    force.updateSpeed = (newSpeed) => { speedMult = newSpeed; };
    force.setEnabled = (isEnabled) => { enabled = isEnabled; };
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

  // Auto-pause orbit when opening guest profile detail view, and auto-resume on exit
  useEffect(() => {
    if (selectedNode) {
      if (isOrbiting) {
        wasOrbitingBeforeDetailRef.current = true;
        setIsOrbiting(false);
      }
    } else {
      if (wasOrbitingBeforeDetailRef.current) {
        wasOrbitingBeforeDetailRef.current = false;
        setIsOrbiting(true);
      }
    }
  }, [selectedNode]);

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
      const initialHobbies = Array.isArray(selectedNode.hobbies)
        ? [...selectedNode.hobbies]
        : (typeof selectedNode.hobbies === 'string'
          ? selectedNode.hobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean)
          : []);
      setEditHobbies(initialHobbies);
    }
  }, [selectedNode]);

  const handleAddInterestTag = (tagToAdd) => {
    const tag = (typeof tagToAdd === 'string' && tagToAdd.trim()) ? tagToAdd.trim() : (newInterestInput || '').trim();
    if (tag && !editHobbies.includes(tag)) {
      setEditHobbies(prev => [...prev, tag]);
      setNewInterestInput('');
    }
  };

  const handleRemoveInterestTag = (tag) => {
    setEditHobbies(editHobbies.filter(h => h !== tag));
  };

  const handleSaveProfileEdits = async () => {
    if (!selectedNode) return;

    const cleanHobbies = Array.isArray(editHobbies) 
      ? editHobbies 
      : (typeof editHobbies === 'string' && editHobbies.trim() 
        ? editHobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean) 
        : []);

    // Mutate existing node in-place so D3 link pointers (link.source / link.target) stay 100% intact
    const targetNode = nodes.find(n => n.id === selectedNode.id) || selectedNode;
    targetNode.name = editName || targetNode.name;
    targetNode.relationship = editRelationship;
    targetNode.originallyFrom = editOriginallyFrom;
    targetNode.currentlyLivesIn = editCurrentlyLivesIn;
    targetNode.cohort = editCohort;
    targetNode.side = editSide;
    targetNode.familyStatus = editFamilyStatus;
    targetNode.hobbies = cleanHobbies;

    const updated = [...nodes];
    setNodes(updated);
    setSelectedNode({ ...targetNode });

    try {
      localStorage.setItem('wedding_graph_nodes_v112', JSON.stringify(updated));
    } catch (e) {}

    const prevHobbies = Array.isArray(selectedNode.hobbies)
      ? selectedNode.hobbies
      : (typeof selectedNode.hobbies === 'string' ? selectedNode.hobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean) : []);

    const changeSummary = [];
    if (editName && editName !== (selectedNode.name || '')) changeSummary.push(`Name: ${editName}`);
    if (editCurrentlyLivesIn && editCurrentlyLivesIn !== (selectedNode.currentlyLivesIn || '')) changeSummary.push(`Lives In: ${editCurrentlyLivesIn}`);
    if (editOriginallyFrom && editOriginallyFrom !== (selectedNode.originallyFrom || '')) changeSummary.push(`Originally From: ${editOriginallyFrom}`);
    if (cleanHobbies.join(', ') !== prevHobbies.join(', ')) changeSummary.push(`Hobbies: ${cleanHobbies.join(', ')}`);
    if (editCohort && editCohort !== (selectedNode.cohort || '')) changeSummary.push(`Group: ${editCohort}`);
    if (editRelationship && editRelationship !== (selectedNode.relationship || '')) changeSummary.push(`Relationship: ${editRelationship}`);

    const proposalNote = changeSummary.length > 0 
      ? `Proposed Changes: ${changeSummary.join(' | ')}`
      : `Profile update for ${selectedNode.name}`;

    const proposal = {
      id: `fb_${Date.now()}`,
      targetId: selectedNode.id,
      targetName: editName || selectedNode.name,
      category: 'Profile Edit Proposal',
      proposedHobbies: cleanHobbies.join(', '),
      proposedLocation: editCurrentlyLivesIn,
      proposedCohort: editCohort,
      proposedSide: editSide,
      proposedRelationship: editRelationship,
      note: proposalNote,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };

    setFeedbackList(prev => [proposal, ...(prev || [])]);
    setIsEditingDrawer(false);
    setCopyToast('✨ Profile updated & auto-saved to database!');
    setTimeout(() => setCopyToast(''), 3500);

    // 2. Submit to GitHub Issues to trigger automated zero-moderation workflow
    await submitGuestProposalToGithub(proposal);
  };

  const handleGuestPhotoUpload = useCallback(async (targetId, dataUrl) => {
    if (!targetId || !dataUrl) return;
    const targetNode = nodes.find(n => n.id === targetId) || (selectedNode && selectedNode.id === targetId ? selectedNode : null);
    if (!targetNode) return;

    const relativeImagePath = `headshots/${targetNode.id}.jpg`;
    const publicHeadshotPath = `public/${relativeImagePath}`;
    const rawSourcePath = `raw_sources/${targetNode.id}__orig_media.jpg`;

    targetNode.image = dataUrl;

    const updated = [...nodes];
    setNodes(updated);
    setSelectedNode({ ...targetNode });

    try {
      localStorage.setItem('wedding_graph_nodes_v112', JSON.stringify(updated));
    } catch (e) {}

    setCopyToast(`📷 Uploading master raw photo & headshot directly to GitHub repository...`);

    // 1. Commit raw master image to raw_sources/<guest_id>__orig_media.jpg in Git repo
    await pushToGithubRepo(dataUrl, `feat(raw_sources): save raw photo master for ${targetNode.name}`, '', rawSourcePath, true);

    // 2. Commit cropped JPEG to public/headshots/<guest_id>.jpg in Git repo
    await pushToGithubRepo(dataUrl, `feat(headshots): upload headshot file for ${targetNode.name}`, '', publicHeadshotPath, true);

    // 3. Update node image reference to relative path and push sampleData.js to Git repo
    targetNode.image = relativeImagePath;
    const sampleDataCode = generateSampleDataJsContent(updated, links);
    const result = await pushToGithubRepo(sampleDataCode, `feat(data): link public/headshots/${targetNode.id}.jpg for ${targetNode.name}`);

    // 4. Create GitHub Issue with direct clickable links to the subfolder files & embedded preview
    const rawSourceUrl = `https://github.com/mhoying/wedding-graph/blob/main/raw_sources/${targetNode.id}__orig_media.jpg`;
    const publicHeadshotUrl = `https://github.com/mhoying/wedding-graph/blob/main/public/headshots/${targetNode.id}.jpg`;
    const rawImageCdnUrl = `https://raw.githubusercontent.com/mhoying/wedding-graph/main/public/headshots/${targetNode.id}.jpg`;

    await submitGuestProposalToGithub({
      targetId: targetNode.id,
      targetName: targetNode.name,
      category: 'Profile Picture / Photo Upload',
      note: `📷 Photo uploaded directly to GitHub repo subfolders!\n\n• **Raw Master Photo**: [raw_sources/${targetNode.id}__orig_media.jpg](${rawSourceUrl})\n• **Rendered Avatar**: [public/headshots/${targetNode.id}.jpg](${publicHeadshotUrl})\n\n![Avatar Preview](${rawImageCdnUrl})`,
      rawSourceUrl,
      publicHeadshotUrl,
      rawImageCdnUrl,
      timestamp: new Date().toISOString()
    });

    if (result && result.success) {
      setCopyToast(`🎉 Photo uploaded, saved to repo subfolders & logged to GitHub Issue with links!`);
    } else {
      setCopyToast(`✅ Photo saved locally! (${result ? result.message : ''})`);
    }
    setTimeout(() => setCopyToast(''), 5500);
  }, [nodes, links, selectedNode]);

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

  // Map direct neighbor IDs for each node
  const neighborMap = useMemo(() => {
    const map = new Map();
    (links || []).forEach(l => {
      if (!l) return;
      const sId = typeof l.source === 'object' ? l.source.id : l.source;
      const tId = typeof l.target === 'object' ? l.target.id : l.target;
      if (!map.has(sId)) map.set(sId, new Set());
      if (!map.has(tId)) map.set(tId, new Set());
      map.get(sId).add(tId);
      map.get(tId).add(sId);
    });
    return map;
  }, [links]);

  // Cocktail Matchmaker Engine (Guarantees 100% match & action prompt coverage across all guests)
  const matchmakerResults = useMemo(() => {
    if (!myGuestId) return [];
    const me = nodes.find(n => n.id === myGuestId);
    if (!me) return [];

    const meHobbiesArr = Array.isArray(me.hobbies) ? me.hobbies : (typeof me.hobbies === 'string' ? me.hobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean) : []);
    const meHobbies = new Set(meHobbiesArr.map(h => String(h).trim()));
    const myNeighbors = neighborMap.get(me.id) || new Set();

    return nodes
      .filter(n => n && n.id !== me.id && n.type !== 'CONTEXT_HUB')
      .map(other => {
        let sharedScore = 0;
        const reasonsSet = new Set();

        // 1. Strict Spouse / Partner Filter
        const myRel = (me.relationship || '').trim().toLowerCase();
        const otherRel = (other.relationship || '').trim().toLowerCase();
        const myName = (me.name || '').trim().toLowerCase();
        const otherName = (other.name || '').trim().toLowerCase();

        const isSamePartnerUnit = 
          (myRel.length > 3 && myRel === otherRel && !myRel.includes('family')) ||
          (myRel.length > 3 && myRel.includes(otherName)) ||
          (otherRel.length > 3 && otherRel.includes(myName)) ||
          (me.id === 'matt' && other.id === 'maureen') ||
          (me.id === 'maureen' && other.id === 'matt');

        if (isSamePartnerUnit) {
          return { node: other, sharedScore: -999, reasons: [] };
        }

        // 2. Heavy Direct Connection Penalty (-120 points) so new acquaintances ALWAYS rank higher!
        if (myNeighbors.has(other.id)) {
          sharedScore -= 120;
        } else {
          // 2nd-degree mutual connections boost (+25 points)
          const otherNeighbors = neighborMap.get(other.id) || new Set();
          let mutualsCount = 0;
          myNeighbors.forEach(nId => {
            if (otherNeighbors.has(nId)) mutualsCount++;
          });
          if (mutualsCount > 0) {
            sharedScore += 25;
          }
        }

        // 2. Shared Interests (+40 points)
        const otherHobbiesArr = Array.isArray(other.hobbies) ? other.hobbies : (typeof other.hobbies === 'string' ? other.hobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean) : []);
        otherHobbiesArr.forEach(h => {
          if (h && meHobbies.has(String(h).trim())) {
            const cleanH = String(h).trim();
            const weight = tagWeights[cleanH] || 40;
            sharedScore += weight;
            reasonsSet.add(cleanH);
          }
        });

        // 3. Shared Hometown / Originally From (+30 points)
        const myHome = (me.originallyFrom || me.hometown || '').trim();
        const otherHome = (other.originallyFrom || other.hometown || '').trim();
        if (myHome && otherHome && myHome.toLowerCase() === otherHome.toLowerCase() && !myHome.toLowerCase().includes('family')) {
          sharedScore += 30;
          reasonsSet.add(myHome);
        }

        // 4. Shared Current Location (+25 points)
        const myLive = (me.currentlyLivesIn || me.state || '').trim();
        const otherLive = (other.currentlyLivesIn || other.state || '').trim();
        if (myLive && otherLive && myLive.toLowerCase() === otherLive.toLowerCase() && !myLive.toLowerCase().includes('family')) {
          sharedScore += 25;
          reasonsSet.add(myLive);
        }

        // 5. Shared Cohort (+20 points)
        const myCohort = (me.cohort || '').trim();
        const otherCohort = (other.cohort || '').trim();
        if (myCohort && otherCohort && myCohort.toLowerCase() === otherCohort.toLowerCase() && !['other', 'default', 'the couple'].includes(myCohort.toLowerCase())) {
          sharedScore += 20;
          reasonsSet.add(myCohort);
        }

        // 6. Shared Wedding Side (+15 points)
        const mySide = (me.side || '').trim();
        const otherSide = (other.side || '').trim();
        if (mySide && otherSide && mySide.toLowerCase() === otherSide.toLowerCase()) {
          sharedScore += 15;
          if (reasonsSet.size === 0) {
            reasonsSet.add(`${mySide} Side`);
          }
        }

        return { node: other, sharedScore, reasons: Array.from(reasonsSet) };
      })
      .filter(r => r.sharedScore > 0)
      .sort((a, b) => b.sharedScore - a.sharedScore)
      .slice(0, 8);
  }, [myGuestId, nodes, tagWeights, neighborMap]);

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
    setCopyToast('⚡ Submitting edit...');

    // Real-time GitHub Issue creation so all hosts receive proposals across all devices!
    await submitGuestProposalToGithub(newFeedback);

    setCopyToast('✨ Profile edit submitted & auto-saved!');
    setTimeout(() => setCopyToast(''), 3500);
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
        onOpenLeaderboard={handleOpenLeaderboard}
        onOpenMapControls={() => setIsMobileControlsOpen(true)}
        isListView={isListView}
        setIsListView={setIsListView}
        isMobileViewport={isMobileViewport}
        isMobileSearchOpen={isMobileSearchOpen}
        setIsMobileSearchOpen={setIsMobileSearchOpen}
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

      {/* Floating Micro-Dock Map Controls Sheet (Triggered via Quick Dock on mobile or FAB on desktop) */}
      {!selectedNode && (
        <>
          {!isMobileViewport && (
            <button 
              className="mobile-drawer-toggle-fab no-print"
              onClick={() => setIsMobileControlsOpen(true)}
            >
              <SlidersHorizontal style={{ width: 16, height: 16 }} />
              <span>Map Controls</span>
            </button>
          )}

          <MobileControlsSheet 
            isOpen={isMobileControlsOpen}
            onClose={() => setIsMobileControlsOpen(false)}
            isOrbiting={isOrbiting}
            setIsOrbiting={setIsOrbiting}
            orbitSpeed={orbitSpeed}
            setOrbitSpeed={setOrbitSpeed}
            nodeScaleMultiplier={nodeScaleMultiplier}
            setNodeScaleMultiplier={setNodeScaleMultiplier}
            fontScaleMultiplier={fontScaleMultiplier}
            setFontScaleMultiplier={setFontScaleMultiplier}
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
            filteredNodes={filteredNodes}
            getNodeColor={getNodeColor}
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

      {/* Mobile-First Illustrative Quick Dock (Rendered on Mobile Viewports < 768px when no drawer open) */}
      {isMobileViewport && !selectedNode && (
        <MobileQuickDock 
          onOpenSearch={() => setIsMobileSearchOpen(true)}
          onOpenLeaderboard={handleOpenLeaderboard}
          onOpenDirectory={() => setIsListView(!isListView)}
          onOpenMatchmaker={() => setIsMatchmakerOpen(true)}
          onOpenMapControls={() => setIsMobileControlsOpen(true)}
          isListView={isListView}
          honkCount={(gaggleStore.encounters || []).length}
          isLightMode={isLightMode}
          setIsLightMode={setIsLightMode}
        />
      )}

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
        fontScaleMultiplier={fontScaleMultiplier}
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
        links={links}
        onClose={handleCloseProfile}
        onSelectNode={(node) => {
          setSelectedNode(node);
          setIsEditingDrawer(false);
          flyToNode(node);
        }}
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
        onLogHonk={handleLogHonk}
        gaggleStore={gaggleStore}
        activePlayer={activePlayer}
        onPhotoUpload={handleGuestPhotoUpload}
      />

      {/* The Grand Gaggle Championship Live Leaderboard Modal */}
      <LiveLeaderboardModal 
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        gaggleData={gaggleLeaderboards}
        allGuests={nodes.filter(n => n && n.type === 'GUEST')}
        activePlayer={activePlayer}
        onOpenPlayerSelect={() => setIsPlayerSelectOpen(true)}
        onUpdatePlayer={(name) => {
          setActivePlayer(name);
          setActivePlayerState(name);
        }}
        onSelectGuest={(guestName) => {
          const found = nodes.find(n => n && n.name === guestName);
          if (found) {
            flyToNode(found);
            setSelectedNode(found);
          }
        }}
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
                      const existingHobbies = Array.isArray(newNode.hobbies)
                        ? newNode.hobbies
                        : (typeof newNode.hobbies === 'string' ? newNode.hobbies.split(/[,;]/).map(h => h.trim()).filter(Boolean) : []);
                      newNode.hobbies = Array.from(new Set([...existingHobbies, ...newHobbies]));
                    }
                  }
                }

                return newNode;
              }
              return node;
            });

            try {
              localStorage.setItem('wedding_graph_nodes_v112', JSON.stringify(updated));
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
        onPhotoUpload={handleGuestPhotoUpload}
      />

      {/* Player Identity Selection Modal (Strict Dropdown) */}
      {isPlayerSelectOpen && (
        <PlayerSelectModal 
          isOpen={isPlayerSelectOpen}
          onClose={() => setIsPlayerSelectOpen(false)}
          nodes={nodes}
          activePlayer={activePlayer}
          onConfirm={(selectedName) => {
            setActivePlayer(selectedName);
            setActivePlayerState(selectedName);
            setIsPlayerSelectOpen(false);
            if (pendingHonkNode) {
              executeHonk(selectedName, pendingHonkNode);
              setPendingHonkNode(null);
            }
          }}
        />
      )}

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

function PlayerSelectModal({ isOpen, onClose, nodes, activePlayer, onConfirm }) {
  const [selectedName, setSelectedName] = useState(() => activePlayer !== 'Guest Goose' ? activePlayer : '');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop no-print" onClick={onClose}>
      <div className="glass-panel modal-card" style={{ maxWidth: 420, width: '92vw' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🪿</span>
            <span style={{ fontWeight: 800, color: '#f59e0b', fontSize: 16 }}>Select Your Identity</span>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <p style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 16, lineHeight: 1.5 }}>
          Please select your name from the guest list to log your honk encounters and track your score on the Live Leaderboard:
        </p>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Guest Name:
          </label>
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px 14px', 
              borderRadius: 12, 
              background: 'rgba(30, 41, 59, 0.95)', 
              color: '#ffffff', 
              border: '1px solid rgba(245, 158, 11, 0.4)', 
              outline: 'none',
              fontSize: 14,
              fontWeight: 600
            }}
          >
            <option value="">-- Choose Your Name --</option>
            {[...nodes]
              .filter(n => n && n.name && n.type === 'GUEST')
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(n => (
                <option key={n.id} value={n.name}>{n.name}</option>
              ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#cbd5e1',
              border: 'none',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            disabled={!selectedName}
            onClick={() => {
              if (selectedName) onConfirm(selectedName);
            }}
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              background: selectedName ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'rgba(245, 158, 11, 0.3)',
              color: selectedName ? '#0f172a' : '#94a3b8',
              border: 'none',
              fontWeight: 800,
              fontSize: 13,
              cursor: selectedName ? 'pointer' : 'not-allowed',
              boxShadow: selectedName ? '0 4px 14px rgba(245, 158, 11, 0.35)' : 'none'
            }}
          >
            Confirm Identity & Honk 🪿
          </button>
        </div>
      </div>
    </div>
  );
}
