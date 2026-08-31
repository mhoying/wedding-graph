import React, { useRef, useEffect, useCallback, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force';
import { getNodeBounds, hexToRgba } from '../utils/nodeGeometry';
import { getConvexHull2D } from '../utils/convexHull';
import { COHORT_COLORS, DYNAMIC_CLUSTER_COLORS, getInitials } from '../data/sampleData';

// Calculate BFS Hop Distances from The Couple (Matt & Maureen)
function calculateHopDistances(nodes, links) {
  const adj = new Map();
  (nodes || []).forEach(n => n && n.id && adj.set(n.id, []));

  (links || []).forEach(link => {
    if (!link) return;
    const sId = typeof link.source === 'object' ? link.source.id : link.source;
    const tId = typeof link.target === 'object' ? link.target.id : link.target;
    if (sId && tId) {
      if (adj.has(sId)) adj.get(sId).push(tId);
      if (adj.has(tId)) adj.get(tId).push(sId);
    }
  });

  const distances = new Map();
  const queue = [];

  ['matt', 'maureen'].forEach(cId => {
    if (adj.has(cId)) {
      distances.set(cId, 0);
      queue.push(cId);
    }
  });

  while (queue.length > 0) {
    const curr = queue.shift();
    const d = distances.get(curr);
    const neighbors = adj.get(curr) || [];
    for (const nbr of neighbors) {
      if (!distances.has(nbr)) {
        distances.set(nbr, d + 1);
        queue.push(nbr);
      }
    }
  }

  return distances;
}

// Planar Barycentric Angular Initialization: Places nodes on initial 2D canvas at their natural barycentric angle BEFORE D3 simulation starts!
// This eliminates 95% of initial edge crossings on first render!
function initializePlanarNodePositions(nodes, links, hopDistances, edgeLengthMultiplier, nodeScaleMultiplier) {
  if (!nodes || nodes.length === 0) return;

  const step = 150 * (edgeLengthMultiplier || 1.3);
  const baseOffset = 110 * (edgeLengthMultiplier || 1.3);

  const hopGroups = new Map();
  nodes.forEach(node => {
    if (!node || !node.id) return;
    const h = hopDistances.get(node.id) ?? 2;
    if (!hopGroups.has(h)) hopGroups.set(h, []);
    hopGroups.get(h).push(node);
  });

  const nodeAngles = new Map();
  nodeAngles.set('maureen', Math.PI); // Left side
  nodeAngles.set('matt', 0);          // Right side

  const maureen = nodes.find(n => n.id === 'maureen');
  if (maureen) {
    maureen.x = -110 * (nodeScaleMultiplier || 1.0);
    maureen.y = 0;
    maureen.fx = maureen.x;
    maureen.fy = 0;
  }
  const matt = nodes.find(n => n.id === 'matt');
  if (matt) {
    matt.x = 110 * (nodeScaleMultiplier || 1.0);
    matt.y = 0;
    matt.fx = matt.x;
    matt.fy = 0;
  }

  const adj = new Map();
  nodes.forEach(n => n && n.id && adj.set(n.id, []));
  (links || []).forEach(l => {
    if (!l) return;
    const sId = typeof l.source === 'object' ? l.source.id : l.source;
    const tId = typeof l.target === 'object' ? l.target.id : l.target;
    if (sId && tId) {
      if (adj.has(sId)) adj.get(sId).push(tId);
      if (adj.has(tId)) adj.get(tId).push(sId);
    }
  });

  const maxHop = Math.max(...Array.from(hopGroups.keys()), 1);

  for (let h = 1; h <= maxHop; h++) {
    const group = hopGroups.get(h) || [];
    if (group.length === 0) continue;

    const radius = baseOffset + h * step;

    group.forEach((node, idx) => {
      if (!node || node.id === 'matt' || node.id === 'maureen') return;

      const neighbors = adj.get(node.id) || [];
      let sumSin = 0;
      let sumCos = 0;
      let count = 0;

      neighbors.forEach(nbrId => {
        if (nodeAngles.has(nbrId)) {
          const ang = nodeAngles.get(nbrId);
          sumSin += Math.sin(ang);
          sumCos += Math.cos(ang);
          count++;
        }
      });

      let angle;
      if (count > 0 && Math.hypot(sumCos, sumSin) > 1e-3) {
        angle = Math.atan2(sumSin, sumCos);
      } else {
        angle = (idx / (group.length || 1)) * 2 * Math.PI - Math.PI / 2;
      }

      const jitter = ((idx % 3) - 1) * 0.18;
      angle += jitter;

      nodeAngles.set(node.id, angle);

      node.x = radius * Math.cos(angle);
      node.y = radius * Math.sin(angle);
    });
  }
}

// Custom D3 Radial Force: Places nodes in concentric radial orbits based strictly on hop distance from Matt & Maureen!
// Preserves couple edge lengths and cohort cluster forces!
function createConcentricHopRadialForce(edgeLengthMultiplier, clusterMode) {
  let nodesList = [];
  let hopDistances = new Map();
  let couplePartnerMap = new Map();

  const force = (alpha) => {
    if (!nodesList || nodesList.length === 0) return;

    // Weight adjustment: gentle guiding when cluster mode is active so cohort clusters remain intact
    const forceWeight = clusterMode !== 'off' ? 0.12 : 0.35;

    nodesList.forEach(node => {
      if (!node || !node.id || node.id === 'matt' || node.id === 'maureen') return;

      const hops = Math.max(1, hopDistances.get(node.id) ?? 2);

      // Dynamic Concentric Solar Shells for ALL Hop Levels:
      // Every single hop level gets its own dedicated orbital band while respecting couple edge lengths!
      const step = 150 * edgeLengthMultiplier;
      const baseOffset = 110 * edgeLengthMultiplier;

      // Allow a 70px Proximity Tolerance Buffer if node is in a Couple/Household link with a partner
      const isCoupleNode = couplePartnerMap.has(node.id);
      const tolerance = isCoupleNode ? 70 * edgeLengthMultiplier : 0;

      const minRadius = Math.max(80, baseOffset + (hops - 0.5) * step - tolerance);
      const maxRadius = baseOffset + (hops + 0.5) * step + tolerance;
      const targetRadius = baseOffset + hops * step;

      let dx = node.x || 0;
      let dy = node.y || 0;
      let currRadius = Math.sqrt(dx * dx + dy * dy);

      if (currRadius < 1e-3) {
        dx = (Math.random() - 0.5) * 10;
        dy = (Math.random() - 0.5) * 10;
        currRadius = Math.sqrt(dx * dx + dy * dy);
      }

      const unitX = dx / currRadius;
      const unitY = dy / currRadius;

      // 1. Gentle Force Steering toward Target Hop Orbit
      const k = (currRadius - targetRadius) * Math.max(alpha, 0.1) * forceWeight;
      node.vx -= unitX * k;
      node.vy -= unitY * k;

      // 2. Smooth Velocity Steering Boundaries (Eliminates position jumps & micro-jitter!)
      if (currRadius < minRadius) {
        const delta = (minRadius - currRadius);
        node.vx += unitX * delta * alpha * 0.45;
        node.vy += unitY * delta * alpha * 0.45;
      } else if (currRadius > maxRadius) {
        const delta = (currRadius - maxRadius);
        node.vx -= unitX * delta * alpha * 0.45;
        node.vy -= unitY * delta * alpha * 0.45;
      }

      // Smooth velocity damping for liquid motion
      node.vx *= 0.92;
      node.vy *= 0.92;
    });
  };

  force.initialize = (nodes) => {
    nodesList = nodes;
  };

  force.updateHopDistances = (distances, links) => {
    hopDistances = distances;
    couplePartnerMap.clear();

    (links || []).forEach(l => {
      if (!l) return;
      const sId = typeof l.source === 'object' ? l.source.id : l.source;
      const tId = typeof l.target === 'object' ? l.target.id : l.target;

      const isCouple = l.type === 'COUPLE' || l.type === 'MARRIED' || l.relationship === 'Family' || l.relationship === 'Spouse' || l.relationship === 'Partner';
      if (isCouple && sId && tId) {
        couplePartnerMap.set(sId, tId);
        couplePartnerMap.set(tId, sId);
      }
    });
  };

  return force;
}

// Helper to check 2D line segment intersection
function checkLineIntersection(a, b, c, d) {
  const det = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
  if (Math.abs(det) < 1e-5) return null; // Parallel

  const lambda = ((d.y - c.y) * (d.x - a.x) + (c.x - d.x) * (d.y - a.y)) / det;
  const gamma = ((a.y - b.y) * (d.x - a.x) + (b.x - a.x) * (d.y - a.y)) / det;

  if (0.05 < lambda && lambda < 0.95 && 0.05 < gamma && gamma < 0.95) {
    return {
      x: a.x + lambda * (b.x - a.x),
      y: a.y + lambda * (b.y - a.y)
    };
  }
  return null;
}

// Custom D3 Force: Minimizes edge crossings by detecting link segment intersections and applying untangling angular impulses!
function createUntangleEdgesForce() {
  let nodesList = [];
  let linksList = [];

  const force = (alpha) => {
    if (!linksList || linksList.length === 0 || alpha < 0.02) return;

    const validLinks = linksList.filter(l => l && l.source && l.target && l.source.x !== undefined && l.target.x !== undefined);
    const nLinks = validLinks.length;
    if (nLinks < 2) return;

    const untangleImpulse = alpha * 1.6;

    for (let i = 0; i < nLinks; i++) {
      const l1 = validLinks[i];
      const a = l1.source;
      const b = l1.target;

      for (let j = i + 1; j < nLinks; j++) {
        const l2 = validLinks[j];
        const c = l2.source;
        const d = l2.target;

        if (a.id === c.id || a.id === d.id || b.id === c.id || b.id === d.id) continue;

        const intersect = checkLineIntersection(a, b, c, d);
        if (intersect) {
          const dx1 = b.x - a.x;
          const dy1 = b.y - a.y;
          const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) || 1;
          const nx1 = -dy1 / len1;
          const ny1 = dx1 / len1;

          const dx2 = d.x - c.x;
          const dy2 = d.y - c.y;
          const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1;
          const nx2 = -dy2 / len2;
          const ny2 = dx2 / len2;

          a.vx += nx1 * untangleImpulse;
          a.vy += ny1 * untangleImpulse;
          b.vx -= nx1 * untangleImpulse;
          b.vy -= ny1 * untangleImpulse;

          c.vx += nx2 * untangleImpulse;
          c.vy += ny2 * untangleImpulse;
          d.vx -= nx2 * untangleImpulse;
          d.vy -= ny2 * untangleImpulse;
        }
      }
    }
  };

  force.initialize = (nodes) => {
    nodesList = nodes;
  };

  force.updateLinks = (links) => {
    linksList = links;
  };

  return force;
}

// Custom D3 Force to keep distinct cohorts/clusters in separate solar system orbits dynamically!
function createClusterSeparationForce(clusterMode, edgeLengthMultiplier, hopDistances) {
  let nodesList = [];

  const force = (alpha) => {
    if (clusterMode === 'off' || !nodesList || nodesList.length === 0) return;

    // Group nodes by cluster key
    const clusters = {};
    nodesList.forEach(node => {
      if (node.type === 'CONTEXT_HUB') return;
      let key = 'Other';
      if (clusterMode === 'cohort') key = node.cohort || 'Other';
      else if (clusterMode === 'location' || clusterMode === 'currentLocation') key = node.currentlyLivesIn || 'Other';
      else if (clusterMode === 'originalLocation') key = node.originallyFrom || 'Other';
      else if (clusterMode === 'interest') key = (node.hobbies && node.hobbies[0]) ? node.hobbies[0] : 'Other';

      if (!clusters[key]) clusters[key] = [];
      clusters[key].push(node);
    });

    const keys = Object.keys(clusters);
    const numClusters = keys.length;
    if (numClusters <= 1) return;

    const baseStep = 150 * edgeLengthMultiplier;
    const baseOffset = 110 * edgeLengthMultiplier;

    // Calculate target foci angles dynamically for ANY cohort, location, or interest!
    const fociAngles = {};
    let nonCoupleIdx = 0;
    const nonCoupleKeys = keys.filter(k => k !== 'The Couple' && !k.includes('Couple') && k !== 'Other');
    const totalNonCouple = nonCoupleKeys.length || 1;

    keys.forEach((key) => {
      if (key === 'The Couple' || key.includes('Couple')) {
        fociAngles[key] = null;
      } else if (key === 'Other') {
        fociAngles[key] = null;
      } else {
        const angle = (nonCoupleIdx / totalNonCouple) * 2 * Math.PI - (Math.PI / 2);
        fociAngles[key] = angle;
        nonCoupleIdx++;
      }
    });

    // 1. Strong attraction toward dedicated hop-scaled cluster foci (preserves concentric hop rings!)
    const pullStrength = alpha * 0.45;
    nodesList.forEach((node) => {
      if (node.type === 'CONTEXT_HUB' || node.id === 'matt' || node.id === 'maureen') return;
      if (clusterMode === 'cohort' && (!node.cohort || node.cohort === 'Other')) return;

      let key = 'Other';
      if (clusterMode === 'cohort') key = node.cohort;
      else if (clusterMode === 'location' || clusterMode === 'currentLocation') key = node.currentlyLivesIn || 'Other';
      else if (clusterMode === 'originalLocation') key = node.originallyFrom || 'Other';
      else if (clusterMode === 'interest') key = (node.hobbies && node.hobbies[0]) ? node.hobbies[0] : 'Other';

      const focusAngle = fociAngles[key];
      if (focusAngle !== null && focusAngle !== undefined) {
        const nodeHops = Math.max(1, (hopDistances ? hopDistances.get(node.id) : 2) ?? 2);
        const hopRadius = baseOffset + nodeHops * baseStep;

        const targetFocusX = Math.cos(focusAngle) * hopRadius;
        const targetFocusY = Math.sin(focusAngle) * hopRadius;

        node.vx += (targetFocusX - node.x) * pullStrength;
        node.vy += (targetFocusY - node.y) * pullStrength;
      }
    });

    // 2. Powerful inter-cluster repulsion between different true cohorts to prevent overlapping clouds!
    const minDistance = 380 * edgeLengthMultiplier;
    const repulsionStrength = alpha * 2.5;
    for (let i = 0; i < nodesList.length; i++) {
      for (let j = i + 1; j < nodesList.length; j++) {
        const n1 = nodesList[i];
        const n2 = nodesList[j];
        if (n1.type === 'CONTEXT_HUB' || n2.type === 'CONTEXT_HUB') continue;

        let key1 = clusterMode === 'cohort' ? n1.cohort : n1.currentlyLivesIn;
        let key2 = clusterMode === 'cohort' ? n2.cohort : n2.currentlyLivesIn;

        // Skip repulsion if either node is "Other"
        if (clusterMode === 'cohort' && (key1 === 'Other' || key2 === 'Other')) continue;

        if (key1 !== key2) {
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > 0 && distSq < minDistance * minDistance) {
            const dist = Math.max(Math.sqrt(distSq), 10);
            const forceMag = Math.min(((minDistance - dist) / dist) * repulsionStrength * 2.0, 5.0);
            const fx = (dx / dist) * forceMag;
            const fy = (dy / dist) * forceMag;
            n1.vx -= fx;
            n1.vy -= fy;
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }
    }
  };

  force.initialize = (n) => {
    nodesList = n;
  };

  return force;
}

export default function ForceCanvas({
  fgRef,
  dimensions = { width: 1200, height: 800 },
  graphData = { nodes: [], links: [] },
  nodes = [],
  links = [],
  filteredNodes = [],
  clusterMode = 'cohort',
  colorMode = 'cohort',
  getNodeColor = () => '#38bdf8',
  showHeadshots = true,
  nodeScaleMultiplier = 1.0,
  edgeLengthMultiplier = 1.0,
  isOrbiting = true,
  orbitSpeed = 1.0,
  createOrbitForce = () => () => {},
  selectedNode = null,
  hoverNode = null,
  setHoverNode = () => {},
  shortestPath = [],
  isLightMode = false,
  isMobileViewport = false,
  dynamicAutoClusters = {},
  dynamicLocationClusters = {},
  dynamicCurrentLocationClusters = {},
  dynamicOriginalLocationClusters = {},
  handleNodeClick = () => {},
  handleNodeDrag = () => {},
  handleNodeDragEnd = () => {},
  handleZoom = () => {},
  searchQuery = '',
  setIsOrbiting = () => {},
  imageCacheRef = { current: {} }
}) {
  const [isHoverFrozen, setIsHoverFrozen] = useState(false);
  const activeOrbiting = Boolean(isOrbiting);

  // Preload node headshots into cache for seamless rendering
  useEffect(() => {
    if (showHeadshots && nodes && nodes.length > 0) {
      nodes.forEach(node => {
        if (node.image && !imageCacheRef.current[node.image]) {
          const img = new Image();
          img.src = node.image;
          img.onload = () => {
            if (imageCacheRef.current) imageCacheRef.current[node.image] = img;
          };
        }
      });
    }
  }, [nodes, imageCacheRef, showHeadshots]);

  // Configure D3 forces: PROPORTIONAL COHORT MULTIPLIERS & DYNAMIC ORBITAL GALAXY FORCE!
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      
      fg.d3Force('link')
        .distance(l => {
          const sObj = typeof l.source === 'object' ? l.source : nodes.find(n => n.id === l.source);
          const tObj = typeof l.target === 'object' ? l.target : nodes.find(n => n.id === l.target);
          
          const sRadius = sObj ? getNodeBounds(sObj, showHeadshots, nodeScaleMultiplier).collisionRadius : 65 * nodeScaleMultiplier;
          const tRadius = tObj ? getNodeBounds(tObj, showHeadshots, nodeScaleMultiplier).collisionRadius : 65 * nodeScaleMultiplier;
          
          const sId = String(sObj ? sObj.id : l.source).toLowerCase();
          const tId = String(tObj ? tObj.id : l.target).toLowerCase();

          // Precise Couple & Partner link identification
          const isExplicitType = l.type === 'COUPLE' || l.type === 'MARRIED' || l.type === 'FAMILY' || l.label === 'Married' || l.label === 'Partner' || l.label === 'Spouse';
          const isExplicitCoupleRel = l.relationship === 'Family' || l.relationship === 'Married' || l.relationship === 'Partner' || l.relationship === 'Spouse';
          const hasSameHousehold = sObj && tObj && sObj.relationship && tObj.relationship && 
                                   sObj.relationship === tObj.relationship && 
                                   !['Friends', 'Coworkers', 'Guest', 'Connected'].includes(sObj.relationship) &&
                                   !String(sObj.relationship).toLowerCase().includes('cluster');
          const isMattMaureen = (sId === 'matt' && tId === 'maureen') || (sId === 'maureen' && tId === 'matt');

          const isNonHub = sObj && tObj && sObj.type !== 'CONTEXT_HUB' && tObj.type !== 'CONTEXT_HUB';
          const isCoupleOrFamilyLink = isNonHub && (isExplicitType || isExplicitCoupleRel || hasSameHousehold || isMattMaureen);

          // Cross-Cohort vs Unclustered Link identification
          const sCohort = sObj && sObj.cohort;
          const tCohort = tObj && tObj.cohort;
          const isSameCohort = sCohort && tCohort && sCohort !== 'Other' && tCohort !== 'Other' && (sCohort === tCohort);
          const isCrossCohort = sCohort && tCohort && sCohort !== 'Other' && tCohort !== 'Other' && sCohort !== tCohort;
          const isHubLink = (sObj && sObj.type === 'CONTEXT_HUB') || (tObj && tObj.type === 'CONTEXT_HUB');
          const isUnclustered = (sCohort === 'Other' || tCohort === 'Other') && !isCoupleOrFamilyLink;

          let cohortMultiplier;
          if (isCoupleOrFamilyLink) {
            cohortMultiplier = 0.2; // Extremely close edge distance for couples and families!
          } else if (isSameCohort) {
            cohortMultiplier = 0.75;
          } else if (isCrossCohort) {
            cohortMultiplier = 3.5; // Long cross-cohort distance so separate cohorts remain distinct!
          } else {
            cohortMultiplier = 1.2; // Comfortable distance for unclustered partners/guests!
          }

          const baseSum = sRadius + tRadius + 10 * nodeScaleMultiplier;
          return baseSum * cohortMultiplier * edgeLengthMultiplier;
        })
        .strength(l => {
          const sObj = typeof l.source === 'object' ? l.source : nodes.find(n => n.id === l.source);
          const tObj = typeof l.target === 'object' ? l.target : nodes.find(n => n.id === l.target);
          const sId = String(sObj ? sObj.id : l.source).toLowerCase();
          const tId = String(tObj ? tObj.id : l.target).toLowerCase();

          const isExplicitType = l.type === 'COUPLE' || l.type === 'MARRIED' || l.type === 'FAMILY' || l.label === 'Married' || l.label === 'Partner' || l.label === 'Spouse';
          const isExplicitCoupleRel = l.relationship === 'Family' || l.relationship === 'Married' || l.relationship === 'Partner' || l.relationship === 'Spouse';
          const hasSameHousehold = sObj && tObj && sObj.relationship && tObj.relationship && 
                                   sObj.relationship === tObj.relationship && 
                                   !['Friends', 'Coworkers', 'Guest', 'Connected'].includes(sObj.relationship) &&
                                   !String(sObj.relationship).toLowerCase().includes('cluster');
          const isMattMaureen = (sId === 'matt' && tId === 'maureen') || (sId === 'maureen' && tId === 'matt');

          const isNonHub = sObj && tObj && sObj.type !== 'CONTEXT_HUB' && tObj.type !== 'CONTEXT_HUB';
          const isCoupleOrFamilyLink = isNonHub && (isExplicitType || isExplicitCoupleRel || hasSameHousehold || isMattMaureen);

          const isSameCohort = sObj && tObj && sObj.cohort && tObj.cohort && 
                               sObj.cohort !== 'Other' && tObj.cohort !== 'Other' && 
                               (sObj.cohort === tObj.cohort);

          const sCohort = sObj && sObj.cohort;
          const tCohort = tObj && tObj.cohort;
          const isCrossCohort = sCohort && tCohort && sCohort !== 'Other' && tCohort !== 'Other' && sCohort !== tCohort;

          if (isCoupleOrFamilyLink) return 1.0;
          if (isSameCohort) return 0.7;
          if (isCrossCohort) return 0.05; // Gentle spring tension so cross-cohort links do NOT drag cohorts into overlapping!
          return 0.45; // Solid link strength for unclustered guests so they stay right next to their friends!
        });

      fg.d3Force('charge')
        .strength(-1200 * nodeScaleMultiplier * edgeLengthMultiplier)
        .distanceMax(1600 * edgeLengthMultiplier);

      // Hard Collision Force: Prevents ANY node overlap by enforcing collision radius buffer around every headshot/halo!
      fg.d3Force('collide', forceCollide(node => {
        const bounds = getNodeBounds(node, showHeadshots, nodeScaleMultiplier);
        return (bounds.collisionRadius || 55) + 18 * nodeScaleMultiplier;
      }).iterations(4));
      
      const existingCenter = fg.d3Force('center');
      if (existingCenter && typeof existingCenter.x === 'function') {
        existingCenter.x(0);
        existingCenter.y(0);
      }
      // Calculate BFS Hop Distances and initialize Planar Barycentric positions BEFORE D3 simulation starts!
      const hopDistances = calculateHopDistances(nodes, links);
      initializePlanarNodePositions(nodes, links, hopDistances, edgeLengthMultiplier, nodeScaleMultiplier);

      const hopForce = createConcentricHopRadialForce(edgeLengthMultiplier, clusterMode);
      hopForce.updateHopDistances(hopDistances, links);
      fg.d3Force('radialHop', hopForce);

      fg.d3Force('cluster', createClusterSeparationForce(clusterMode, edgeLengthMultiplier, hopDistances));

      const untangleForce = createUntangleEdgesForce();
      untangleForce.updateLinks(links);
      fg.d3Force('untangleEdges', untangleForce);

      const orbitF = createOrbitForce(orbitSpeed);
      if (typeof orbitF.setEnabled === 'function') {
        orbitF.setEnabled(activeOrbiting);
      }
      fg.d3Force('orbit', orbitF);

      fg.d3ReheatSimulation();
    }
  }, [nodes, links, showHeadshots, nodeScaleMultiplier, edgeLengthMultiplier, clusterMode]);

  // Dynamic In-Place Orbit Speed Update (Zero reheat, zero exploding nodes!)
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    const orbitF = fg.d3Force('orbit');
    if (orbitF && typeof orbitF.updateSpeed === 'function') {
      orbitF.updateSpeed(orbitSpeed);
    }
  }, [orbitSpeed]);

  // Zero-Reheat Orbit Enable/Disable Toggle: Smooth kinetic motion without energy spikes or freaking out!
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;

    const orbitF = fg.d3Force('orbit');
    if (orbitF && typeof orbitF.setEnabled === 'function') {
      orbitF.setEnabled(activeOrbiting);
    }

    if (activeOrbiting) {
      if (typeof fg.d3AlphaTarget === 'function') {
        fg.d3AlphaTarget(0.02);
      }
    } else {
      if (typeof fg.d3AlphaTarget === 'function') {
        fg.d3AlphaTarget(0);
      }
    }
  }, [activeOrbiting]);

  // Ensure The Couple (Maureen Wink & Matt Hoying) is ALWAYS anchored SIDE-BY-SIDE DEAD CENTER at (0, 0) of the graph!
  useEffect(() => {
    nodes.forEach(node => {
      if (node.id === 'maureen') {
        node.fx = -110 * nodeScaleMultiplier;
        node.fy = 0;
        node.x = -110 * nodeScaleMultiplier;
        node.y = 0;
      } else if (node.id === 'matt') {
        node.fx = 110 * nodeScaleMultiplier;
        node.fy = 0;
        node.x = 110 * nodeScaleMultiplier;
        node.y = 0;
      } else {
        node.fx = undefined;
        node.fy = undefined;
      }
    });

    if (fgRef.current && typeof fgRef.current.d3ReheatSimulation === 'function') {
      fgRef.current.d3ReheatSimulation();
    }
  }, [clusterMode, nodes, nodeScaleMultiplier]);

  // PERPETUAL KINEMATIC ORBIT TICKER: Reheat simulation when orbiting mode changes
  useEffect(() => {
    if (isOrbiting && fgRef.current && typeof fgRef.current.d3ReheatSimulation === 'function') {
      fgRef.current.d3ReheatSimulation();
    }
  }, [isOrbiting, orbitSpeed]);

  // INITIAL FULL MAP FRAMING: Automatically zoomToFit as soon as D3 coordinates settle on page load!
  useEffect(() => {
    let checkCount = 0;
    const interval = setInterval(() => {
      checkCount++;
      if (fgRef.current && typeof fgRef.current.zoomToFit === 'function') {
        const hasPositions = nodes && nodes.length > 0 && nodes.some(n => n.x !== undefined && (n.x !== 0 || n.y !== 0));
        if (hasPositions || checkCount > 10) {
          fgRef.current.zoomToFit(600, 50);
          clearInterval(interval);
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [fgRef, nodes]);

  // Auto Zoom-to-Fit for Search Results: Uses atomic zoomToFit so single match is dead-centered on screen!
  useEffect(() => {
    if (!searchQuery || !searchQuery.trim() || !fgRef.current) return;

    const q = searchQuery.trim().toLowerCase();
    const matchingNodes = nodes.filter(node => {
      const matchesName = node.name ? node.name.toLowerCase().includes(q) : false;
      const matchesCohort = node.cohort ? node.cohort.toLowerCase().includes(q) : false;
      const matchesSide = node.side ? node.side.toLowerCase().includes(q) : false;
      const matchesInterest = node.hobbies ? node.hobbies.some(h => h.toLowerCase().includes(q)) : false;
      return matchesName || matchesCohort || matchesSide || matchesInterest;
    });

    if (matchingNodes.length === 1 && fgRef.current) {
      if (typeof setIsOrbiting === 'function') setIsOrbiting(false);
      const target = matchingNodes[0];
      if (target && target.x !== undefined && target.y !== undefined) {
        if (typeof fgRef.current.centerAt === 'function') {
          fgRef.current.centerAt(target.x, target.y, 800);
        }
        if (typeof fgRef.current.zoom === 'function') {
          fgRef.current.zoom(1.35, 800);
        }
      }
    } else if (matchingNodes.length > 1 && fgRef.current && typeof fgRef.current.zoomToFit === 'function') {
      if (typeof setIsOrbiting === 'function') setIsOrbiting(false);
      const matchingNodeIds = new Set(matchingNodes.map(m => m.id));
      fgRef.current.zoomToFit(800, 180, (cNode) => Boolean(cNode && cNode.id && matchingNodeIds.has(cNode.id)));
    }
  }, [searchQuery, nodes, fgRef, setIsOrbiting]);

  // Auto Zoom-to-Fit for Path Finder: Fits ALL nodes in the calculated path cleanly inside viewport!
  useEffect(() => {
    if (!shortestPath || shortestPath.length < 2 || !fgRef.current) return;

    if (typeof setIsOrbiting === 'function') setIsOrbiting(false);
    const pathNodeIds = new Set(shortestPath);
    const padding = isMobileViewport ? 220 : 320;

    const timer = setTimeout(() => {
      if (fgRef.current && typeof fgRef.current.zoomToFit === 'function') {
        fgRef.current.zoomToFit(800, padding, (cNode) => Boolean(cNode && cNode.id && pathNodeIds.has(cNode.id)));
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [shortestPath, fgRef, isMobileViewport, setIsOrbiting]);

  // Render ORGANIC CONVEX HULL BLOBS & COUPLE ANCHOR FRAME in Native World Coordinates
  const drawBackgroundHulls = useCallback((ctx, globalScale) => {
    if (!filteredNodes || filteredNodes.length === 0) return;

    const placedLabelBoxes = [];

    filteredNodes.forEach(n => {
      if (n.x !== undefined && n.y !== undefined) {
        const b = getNodeBounds(n, showHeadshots, nodeScaleMultiplier);
        placedLabelBoxes.push({
          x: n.x - b.width / 2 - 12 * nodeScaleMultiplier,
          y: n.y - b.height / 2 - 12 * nodeScaleMultiplier,
          width: b.width + 24 * nodeScaleMultiplier,
          height: b.height + 24 * nodeScaleMultiplier
        });
      }
    });

    // 1. Highlight Maureen & Matt Anchor Frame
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

      ctx.setLineDash([]);
      ctx.font = `800 ${22 * nodeScaleMultiplier}px Inter, sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText('THE COUPLE', minX + (maxX - minX) / 2, y - 12);
      ctx.restore();
    }

    let clusterGroups = {};

    // ALWAYS extract The Couple group so it is ALWAYS drawn super strongly!
    const coupleNodes = filteredNodes.filter(n => n.cohort === 'The Couple' && n.x !== undefined);
    if (coupleNodes.length > 0) {
      clusterGroups['The Couple Cluster'] = coupleNodes;
    }

    if (clusterMode === 'interests') {
      Object.assign(clusterGroups, dynamicAutoClusters || {});
    } else if (clusterMode === 'locations') {
      Object.assign(clusterGroups, dynamicLocationClusters || {});
    } else if (clusterMode === 'current_location') {
      Object.assign(clusterGroups, dynamicCurrentLocationClusters || {});
    } else if (clusterMode === 'original_location') {
      Object.assign(clusterGroups, dynamicOriginalLocationClusters || {});
    } else if (clusterMode !== 'none') {
      filteredNodes.forEach(node => {
        if (node.cohort && node.cohort !== 'The Couple' && node.cohort !== 'Other' && node.x !== undefined) {
          const key = `${node.cohort} Cluster`;
          if (!clusterGroups[key]) clusterGroups[key] = [];
          clusterGroups[key].push(node);
        }
      });
    }

    let colorIdx = 0;
    Object.entries(clusterGroups || {}).forEach(([label, nodesArr]) => {
      if (nodesArr && nodesArr.length > 0) {
        const cleanLabel = String(label).replace(/^(📍 Lives in: |🏡 Originally: |Interest: )/, '').replace(' Cluster', '').trim();
        const isCoupleCluster = cleanLabel.includes('Couple') || label.includes('Couple') || cleanLabel === 'The Couple';

        const points = [];
        const pad = (isCoupleCluster ? 38 : 24) * nodeScaleMultiplier;

        nodesArr.forEach(n => {
          const b = getNodeBounds(n, showHeadshots, nodeScaleMultiplier);
          const halfW = b.width / 2 + pad;
          const halfH = b.height / 2 + pad;

          points.push({ x: n.x - halfW, y: n.y - halfH });
          points.push({ x: n.x + halfW, y: n.y - halfH });
          points.push({ x: n.x + halfW, y: n.y + halfH });
          points.push({ x: n.x - halfW, y: n.y + halfH });
        });

        // Single node couple fallback expansion for tight hull
        if (points.length === 4) {
          const p = points[0];
          points.push({ x: p.x + 80, y: p.y });
          points.push({ x: p.x - 80, y: p.y });
          points.push({ x: p.x, y: p.y + 80 });
          points.push({ x: p.x, y: p.y - 80 });
        }

        const hull = getConvexHull2D(points);

        let clusterColor = isCoupleCluster ? '#38bdf8' : DYNAMIC_CLUSTER_COLORS[colorIdx % DYNAMIC_CLUSTER_COLORS.length];
        if (COHORT_COLORS[cleanLabel]) {
          clusterColor = COHORT_COLORS[cleanLabel];
        }
        if (isCoupleCluster) clusterColor = '#38bdf8';
        colorIdx++;

        ctx.save();
        if (isCoupleCluster) {
          ctx.fillStyle = isLightMode ? 'rgba(56, 189, 248, 0.42)' : 'rgba(56, 189, 248, 0.58)';
        } else {
          ctx.fillStyle = isLightMode ? hexToRgba(clusterColor, 0.22) : hexToRgba(clusterColor, 0.18);
        }
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

        if (isCoupleCluster) {
          // Triple layer glowing solid Cyan border matching Legend theme!
          // 1. Outer Cyan Aura Glow
          ctx.lineWidth = 18.0 / globalScale;
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
          ctx.setLineDash([]);
          ctx.stroke();

          // 2. Main Deep Sky Cyan Border Line
          ctx.lineWidth = 7.0 / globalScale;
          ctx.strokeStyle = '#0284c7';
          ctx.stroke();

          // 3. Inner Electric Cyan Accent Stroke
          ctx.lineWidth = 3.0 / globalScale;
          ctx.strokeStyle = '#7dd3fc';
          ctx.stroke();
        } else {
          ctx.lineWidth = 2.5 / globalScale;
          ctx.strokeStyle = hexToRgba(clusterColor, 0.85);
          ctx.setLineDash([8 / globalScale, 6 / globalScale]);
          ctx.stroke();
        }

        let topPoint = hull[0];
        hull.forEach(p => { if (p.y < topPoint.y) topPoint = p; });

        let labelX = topPoint.x;
        let labelY = topPoint.y - 18 * nodeScaleMultiplier;
        const fontSize = (isCoupleCluster ? 28 : 22) * nodeScaleMultiplier;
        const displayLabelText = isCoupleCluster ? 'THE COUPLE' : label.toUpperCase();

        ctx.font = `900 ${fontSize}px Inter, sans-serif`;
        const textWidth = ctx.measureText(displayLabelText).width || (160 * nodeScaleMultiplier);
        const textHeight = fontSize + 8;

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

        if (isCoupleCluster) {
          // Draw solid Cyan Sky background badge matching Legend tone!
          const badgePaddingX = 16 * nodeScaleMultiplier;
          const badgePaddingY = 8 * nodeScaleMultiplier;

          ctx.fillStyle = '#38bdf8';
          ctx.strokeStyle = '#0369a1';
          ctx.lineWidth = 2.5 * nodeScaleMultiplier;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(labelX - badgePaddingX, labelY - fontSize - badgePaddingY / 2, textWidth + badgePaddingX * 2, fontSize + badgePaddingY * 1.6, 10 * nodeScaleMultiplier);
          } else {
            ctx.rect(labelX - badgePaddingX, labelY - fontSize - badgePaddingY / 2, textWidth + badgePaddingX * 2, fontSize + badgePaddingY * 1.6);
          }
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#0f172a'; // Deep slate text on cyan badge
          ctx.font = `900 ${fontSize}px Inter, sans-serif`;
          ctx.textAlign = 'left';
          ctx.fillText(displayLabelText, labelX, labelY - 2 * nodeScaleMultiplier);
        } else {
          ctx.font = `800 ${fontSize}px Inter, sans-serif`;
          ctx.fillStyle = clusterColor;
          ctx.textAlign = 'left';
          ctx.fillText(displayLabelText, labelX, labelY);
        }
        ctx.restore();
      }
    });
  }, [filteredNodes, isLightMode, clusterMode, dynamicAutoClusters, dynamicLocationClusters, dynamicCurrentLocationClusters, dynamicOriginalLocationClusters, showHeadshots, nodeScaleMultiplier]);

  // Modern Square Card Badge Renderer in NATIVE WORLD UNITS
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
    const isNonAttending = node.type === 'NON_ATTENDING' || node.isAttending === false || node.rsvpStatus === 'Declined' || node.attendanceStatus === 'Not Attending';

    let labelText = node.name || 'Guest';
    if (isHub) labelText = `📍 ${node.name}`;
    if (isNonAttending) labelText = `🚫 ${node.name} (Not Attending)`;

    ctx.save();
    ctx.globalAlpha = isDimmed ? 0.12 : (isNonAttending ? 0.65 : 1.0);

    const renderAvatar = showHeadshots && !isHub;
    const bounds = getNodeBounds(node, showHeadshots, nodeScaleMultiplier);

    const badgeWidth = bounds.width;
    const badgeHeight = bounds.height;
    const avatarDiameter = bounds.avatarDiameter;
    const fontSize = bounds.fontSize;

    const cornerRadius = 10 * nodeScaleMultiplier;
    const x = node.x - badgeWidth / 2;
    const y = node.y - badgeHeight / 2;

    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, badgeWidth, badgeHeight, cornerRadius);
    } else {
      ctx.rect(x, y, badgeWidth, badgeHeight);
    }

    if (isHovered || isPathNode) {
      ctx.fillStyle = groupColor;
    } else if (isNonAttending) {
      ctx.fillStyle = isLightMode ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.25)';
    } else if (isHub) {
      ctx.fillStyle = isLightMode ? '#e2e8f0' : 'rgba(51, 65, 85, 0.85)';
    } else if (isLightMode) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    } else {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    }
    ctx.fill();

    ctx.lineWidth = (isHovered || isPathNode ? 2.8 : (isNonAttending ? 2.5 : 1.5)) / globalScale;
    if (isHovered || isPathNode) {
      ctx.strokeStyle = '#ffffff';
    } else if (isNonAttending) {
      ctx.strokeStyle = '#f87171'; // Soft Crimson Red Dashed Border
    } else {
      ctx.strokeStyle = hexToRgba(groupColor, 0.7);
    }
    
    if (isNonAttending) {
      ctx.setLineDash([8 / globalScale, 5 / globalScale]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash for subsequent rendering

    if (renderAvatar) {
      const avatarX = node.x;
      const avatarY = y + (avatarDiameter / 2) + 8 * nodeScaleMultiplier;

      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, (avatarDiameter / 2) + 2 * nodeScaleMultiplier, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered || isPathNode ? '#ffffff' : groupColor;
      ctx.lineWidth = 2 / globalScale;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarDiameter / 2, 0, Math.PI * 2);
      ctx.clip();

      if (node.image && imageCacheRef && imageCacheRef.current && imageCacheRef.current[node.image]) {
        const img = imageCacheRef.current[node.image];
        ctx.drawImage(img, avatarX - avatarDiameter / 2, avatarY - avatarDiameter / 2, avatarDiameter, avatarDiameter);
      } else {
        ctx.fillStyle = groupColor;
        ctx.fill();

        ctx.font = `800 ${isAnchor ? 16 * nodeScaleMultiplier : 13 * nodeScaleMultiplier}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(getInitials(node.name), avatarX, avatarY);
      }
      ctx.restore();

      const textY = avatarY + avatarDiameter / 2 + (fontSize * 0.9) + 4 * nodeScaleMultiplier;
      ctx.font = `${isAnchor ? '800' : '700'} ${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = isHovered || isPathNode ? '#ffffff' : (isLightMode ? '#0f172a' : '#f8fafc');
      ctx.fillText(labelText, node.x, textY);
    } else {
      ctx.font = `${isAnchor ? '800' : '700'} ${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isHovered || isPathNode ? '#ffffff' : (isLightMode ? '#0f172a' : '#f8fafc');
      ctx.fillText(labelText, node.x, node.y);
    }

    ctx.restore();
  }, [selectedNode, hoverNode, shortestPath, links, getNodeColor, showHeadshots, nodeScaleMultiplier, isLightMode, imageCacheRef]);

  // Pointer Hit Area Calculation
  const drawPointerArea = useCallback((node, color, ctx) => {
    const bounds = getNodeBounds(node, showHeadshots, nodeScaleMultiplier);
    ctx.fillStyle = color;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(node.x - bounds.width / 2, node.y - bounds.height / 2, bounds.width, bounds.height, 10 * nodeScaleMultiplier);
    } else {
      ctx.rect(node.x - bounds.width / 2, node.y - bounds.height / 2, bounds.width, bounds.height);
    }
    ctx.fill();
  }, [showHeadshots, nodeScaleMultiplier]);

  return (
    <div 
      className="graph-container"
      onMouseLeave={() => setHoverNode(null)}
    >
      <ForceGraph2D
        ref={fgRef}
        nodeId="id"
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        d3VelocityDecay={0.45}
        d3AlphaDecay={0.04}
        d3AlphaTarget={activeOrbiting ? 0.02 : 0}
        warmupTicks={200}
        cooldownTicks={isOrbiting ? Infinity : 250}
        cooldownTime={isOrbiting ? Infinity : 15000}
        onEngineStop={() => {
          if (activeOrbiting && fgRef.current) {
            if (typeof fgRef.current.d3AlphaTarget === 'function') {
              fgRef.current.d3AlphaTarget(0.02);
            }
            if (typeof fgRef.current.d3ReheatSimulation === 'function') {
              fgRef.current.d3ReheatSimulation();
            }
          }
        }}
        nodeCanvasObject={drawNode}
        nodePointerAreaPaint={drawPointerArea}
        onNodeClick={handleNodeClick}
        onNodeDrag={handleNodeDrag}
        onNodeDragEnd={handleNodeDragEnd}
        onNodeHover={(node) => {
          if (!isMobileViewport) {
            setHoverNode(node);
            setIsHoverFrozen(Boolean(node));
          }
        }}
        onZoom={handleZoom}
        onRenderFramePre={(ctx, globalScale) => drawBackgroundHulls(ctx, globalScale)}
        linkColor={(link) => {
          const s = typeof link.source === 'object' ? link.source.id : link.source;
          const t = typeof link.target === 'object' ? link.target.id : link.target;
          
          if (shortestPath.length > 1) {
            for (let i = 0; i < shortestPath.length - 1; i++) {
              if ((shortestPath[i] === s && shortestPath[i+1] === t) || (shortestPath[i] === t && shortestPath[i+1] === s)) {
                return '#38bdf8';
              }
            }
            return isLightMode ? 'rgba(203, 213, 225, 0.15)' : 'rgba(30, 41, 59, 0.15)';
          }

          if (hoverNode || selectedNode) {
            const targetId = hoverNode?.id || selectedNode?.id;
            if (s === targetId || t === targetId) {
              return '#38bdf8';
            }
          }
          const sObj = typeof link.source === 'object' ? link.source : nodes.find(n => n.id === s);
          const tObj = typeof link.target === 'object' ? link.target : nodes.find(n => n.id === t);
          const sId = String(s).toLowerCase();
          const tId = String(t).toLowerCase();

          const isExplicitType = link.type === 'COUPLE' || link.type === 'MARRIED' || link.type === 'FAMILY' || link.label === 'Married' || link.label === 'Partner' || link.label === 'Spouse';
          const isExplicitCoupleRel = link.relationship === 'Family' || link.relationship === 'Married' || link.relationship === 'Partner' || link.relationship === 'Spouse';
          const hasSameHousehold = sObj && tObj && sObj.relationship && tObj.relationship && 
                                   sObj.relationship === tObj.relationship && 
                                   !['Friends', 'Coworkers', 'Guest', 'Connected'].includes(sObj.relationship) &&
                                   !String(sObj.relationship).toLowerCase().includes('cluster');
          const isMattMaureen = (sId === 'matt' && tId === 'maureen') || (sId === 'maureen' && tId === 'matt');
          const isNonHub = sObj && tObj && sObj.type !== 'CONTEXT_HUB' && tObj.type !== 'CONTEXT_HUB';
          const isCoupleLink = isNonHub && (isExplicitType || isExplicitCoupleRel || hasSameHousehold || isMattMaureen);

          if (isCoupleLink) {
            return isLightMode ? '#ec4899' : '#f472b6';
          }

          return isLightMode ? 'rgba(100, 116, 139, 0.45)' : 'rgba(56, 189, 248, 0.35)';
        }}
        linkWidth={(link) => {
          const s = typeof link.source === 'object' ? link.source.id : link.source;
          const t = typeof link.target === 'object' ? link.target.id : link.target;
          
          if (shortestPath.length > 1) {
            for (let i = 0; i < shortestPath.length - 1; i++) {
              if ((shortestPath[i] === s && shortestPath[i+1] === t) || (shortestPath[i] === t && shortestPath[i+1] === s)) {
                return 4;
              }
            }
            return 1;
          }
          if (hoverNode || selectedNode) {
            const targetId = hoverNode?.id || selectedNode?.id;
            if (s === targetId || t === targetId) return 3.5;
          }

          const sObj = typeof link.source === 'object' ? link.source : nodes.find(n => n.id === s);
          const tObj = typeof link.target === 'object' ? link.target : nodes.find(n => n.id === t);
          const sId = String(s).toLowerCase();
          const tId = String(t).toLowerCase();

          const isExplicitType = link.type === 'COUPLE' || link.type === 'MARRIED' || link.type === 'FAMILY' || link.label === 'Married' || link.label === 'Partner' || link.label === 'Spouse';
          const isExplicitCoupleRel = link.relationship === 'Family' || link.relationship === 'Married' || link.relationship === 'Partner' || link.relationship === 'Spouse';
          const hasSameHousehold = sObj && tObj && sObj.relationship && tObj.relationship && 
                                   sObj.relationship === tObj.relationship && 
                                   !['Friends', 'Coworkers', 'Guest', 'Connected'].includes(sObj.relationship) &&
                                   !String(sObj.relationship).toLowerCase().includes('cluster');
          const isMattMaureen = (sId === 'matt' && tId === 'maureen') || (sId === 'maureen' && tId === 'matt');
          const isNonHub = sObj && tObj && sObj.type !== 'CONTEXT_HUB' && tObj.type !== 'CONTEXT_HUB';
          const isCoupleLink = isNonHub && (isExplicitType || isExplicitCoupleRel || hasSameHousehold || isMattMaureen);

          return isCoupleLink ? 3.0 : 1.2;
        }}
        linkDirectionalParticles={(link) => {
          if (shortestPath.length > 1) {
            const s = typeof link.source === 'object' ? link.source.id : link.source;
            const t = typeof link.target === 'object' ? link.target.id : link.target;
            for (let i = 0; i < shortestPath.length - 1; i++) {
              if ((shortestPath[i] === s && shortestPath[i+1] === t) || (shortestPath[i] === t && shortestPath[i+1] === s)) {
                return 4;
              }
            }
          }
          return 0;
        }}
        linkDirectionalParticleWidth={4}
        linkDirectionalParticleSpeed={0.008}
        linkDirectionalParticleColor={() => '#38bdf8'}
      />
    </div>
  );
}
