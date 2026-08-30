import React, { useRef, useEffect, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force';
import { getNodeBounds, hexToRgba } from '../utils/nodeGeometry';
import { getConvexHull2D } from '../utils/convexHull';
import { COHORT_COLORS, DYNAMIC_CLUSTER_COLORS, getInitials } from '../data/sampleData';

// Custom D3 Force to keep distinct cohorts/clusters in separate solar system orbits!
function createClusterSeparationForce(clusterMode, edgeLengthMultiplier) {
  let nodesList = [];

  // Dedicated Foci Map for Cohort Mode to guarantee massive separation between main clusters
  const COHORT_FOCI = {
    "The Couple": { x: 0, y: 0 },
    "Cornell": { x: -1100, y: -700 },      // Top Left
    "Stanford": { x: 1100, y: -700 },      // Top Right
    "Google": { x: 0, y: 1150 },           // Bottom Center
    "Lehigh": { x: -1100, y: 700 },        // Bottom Left
    "Dog Park": { x: 1100, y: 700 },       // Bottom Right
    "OWFL Blog": { x: 1450, y: 0 },        // Far Right
    "Bay FC": { x: -1450, y: 0 },          // Far Left
    "Jenna": { x: -600, y: -1250 },        // Top Left Sector
    "Other": { x: 600, y: -1250 }          // Top Right Sector
  };

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

    const baseRadius = 850 * edgeLengthMultiplier;

    // Calculate target foci coordinates
    const foci = {};
    if (clusterMode === 'cohort') {
      keys.forEach(k => {
        foci[k] = COHORT_FOCI[k] ? {
          x: COHORT_FOCI[k].x * edgeLengthMultiplier,
          y: COHORT_FOCI[k].y * edgeLengthMultiplier
        } : { x: 0, y: 0 };
      });
    } else {
      let nonCoupleIdx = 0;
      const nonCoupleKeys = keys.filter(k => !k.includes('Couple'));

      keys.forEach((key) => {
        if (key === 'The Couple' || key.includes('Couple')) {
          foci[key] = { x: 0, y: 0 };
        } else {
          const angle = (nonCoupleIdx / (nonCoupleKeys.length || 1)) * 2 * Math.PI - (Math.PI / 2);
          foci[key] = {
            x: Math.cos(angle) * baseRadius,
            y: Math.sin(angle) * baseRadius
          };
          nonCoupleIdx++;
        }
      });
    }

    // 1. Strong attraction toward dedicated cluster foci center
    const pullStrength = alpha * 0.65;
    nodesList.forEach(node => {
      if (node.type === 'CONTEXT_HUB') return;
      let key = 'Other';
      if (clusterMode === 'cohort') key = node.cohort || 'Other';
      else if (clusterMode === 'location' || clusterMode === 'currentLocation') key = node.currentlyLivesIn || 'Other';
      else if (clusterMode === 'originalLocation') key = node.originallyFrom || 'Other';
      else if (clusterMode === 'interest') key = (node.hobbies && node.hobbies[0]) ? node.hobbies[0] : 'Other';

      const focus = foci[key];
      if (focus) {
        node.vx += (focus.x - node.x) * pullStrength;
        node.vy += (focus.y - node.y) * pullStrength;
      }
    });

    // 2. High-power inter-cluster repulsion between different cohort nodes
    const minDistance = 550 * edgeLengthMultiplier;
    const repulsionStrength = alpha * 1.5;
    for (let i = 0; i < nodesList.length; i++) {
      for (let j = i + 1; j < nodesList.length; j++) {
        const n1 = nodesList[i];
        const n2 = nodesList[j];
        if (n1.type === 'CONTEXT_HUB' || n2.type === 'CONTEXT_HUB') continue;

        let key1 = clusterMode === 'cohort' ? n1.cohort : n1.currentlyLivesIn;
        let key2 = clusterMode === 'cohort' ? n2.cohort : n2.currentlyLivesIn;

        if (key1 !== key2) {
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > 0 && distSq < minDistance * minDistance) {
            const dist = Math.sqrt(distSq);
            const forceMag = (minDistance - dist) / dist * repulsionStrength;
            const fx = dx * forceMag;
            const fy = dy * forceMag;
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

          const isSameCohort = sObj && tObj && sObj.cohort && tObj.cohort && (sObj.cohort === tObj.cohort);
          const isHubLink = (sObj && sObj.type === 'CONTEXT_HUB') || (tObj && tObj.type === 'CONTEXT_HUB');

          let cohortMultiplier;
          if (isCoupleOrFamilyLink) {
            cohortMultiplier = 0.15; // Extremely close edge distance for couples and families!
          } else if (isSameCohort) {
            cohortMultiplier = 0.65;
          } else if (isHubLink) {
            cohortMultiplier = 3.5;
          } else {
            cohortMultiplier = 3.0;
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

          const isSameCohort = sObj && tObj && sObj.cohort && tObj.cohort && (sObj.cohort === tObj.cohort);

          if (isCoupleOrFamilyLink) return 1.0;
          if (isSameCohort) return 0.7;
          return 0.05; // Relaxed loose tension for cross-cohort links so they don't collapse different cohort clusters into each other!
        });

      fg.d3Force('charge')
        .strength(-3200 * nodeScaleMultiplier * edgeLengthMultiplier)
        .distanceMax(3200 * edgeLengthMultiplier);
      
      fg.d3Force('collide', forceCollide().radius(node => {
        return getNodeBounds(node, showHeadshots, nodeScaleMultiplier).collisionRadius;
      }).iterations(40));

      // Multi-foci Cohort Cluster Separation Force to prevent cohort cloud overlap!
      fg.d3Force('cluster', createClusterSeparationForce(clusterMode, edgeLengthMultiplier));

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

    if (fgRef.current && typeof fgRef.current.d3ReheatSimulation === 'function') {
      fgRef.current.d3ReheatSimulation();
    }
  }, [clusterMode, nodes]);

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

  // Auto Zoom-to-Fit for Search Results: Frames 100% of all matching search result nodes!
  useEffect(() => {
    if (!searchQuery || !searchQuery.trim() || !fgRef.current || typeof fgRef.current.zoomToFit !== 'function') return;

    const q = searchQuery.trim().toLowerCase();
    const matchingNodeIds = new Set(
      nodes.filter(node => {
        const matchesName = node.name.toLowerCase().includes(q);
        const matchesCohort = node.cohort ? node.cohort.toLowerCase().includes(q) : false;
        const matchesSide = node.side ? node.side.toLowerCase().includes(q) : false;
        const matchesInterest = node.hobbies ? node.hobbies.some(h => h.toLowerCase().includes(q)) : false;
        return matchesName || matchesCohort || matchesSide || matchesInterest;
      }).map(n => n.id)
    );

    if (matchingNodeIds.size > 0) {
      if (typeof setIsOrbiting === 'function') setIsOrbiting(false);
      fgRef.current.zoomToFit(800, 60, (node) => matchingNodeIds.has(node.id));
    }
  }, [searchQuery, nodes, fgRef, setIsOrbiting]);

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
      ctx.fillText('THE COUPLE (MAUREEN & MATT)', minX + (maxX - minX) / 2, y - 12);
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
        if (node.cohort && node.cohort !== 'The Couple' && node.x !== undefined) {
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
        const displayLabelText = isCoupleCluster ? '👑 THE COUPLE (MATT & MAUREEN)' : label.toUpperCase();

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
            return isLightMode ? 'rgba(203, 213, 225, 0.15)' : 'rgba(30, 41, 59, 0.15)';
          }

          if (link.type === 'COUPLE' || link.label === 'Married' || link.label === 'Partner') {
            return isLightMode ? 'rgba(244, 114, 182, 0.7)' : 'rgba(244, 114, 182, 0.6)';
          }
          if (link.type === 'FAMILY' || link.type === 'SIBLING') {
            return isLightMode ? 'rgba(56, 189, 248, 0.65)' : 'rgba(56, 189, 248, 0.5)';
          }
          return isLightMode ? 'rgba(100, 116, 139, 0.45)' : 'rgba(56, 189, 248, 0.35)';
        }}
        linkWidth={(link) => {
          if (shortestPath.length > 1) {
            const s = typeof link.source === 'object' ? link.source.id : link.source;
            const t = typeof link.target === 'object' ? link.target.id : link.target;
            for (let i = 0; i < shortestPath.length - 1; i++) {
              if ((shortestPath[i] === s && shortestPath[i+1] === t) || (shortestPath[i] === t && shortestPath[i+1] === s)) {
                return 4;
              }
            }
            return 1;
          }
          if (hoverNode || selectedNode) {
            const s = typeof link.source === 'object' ? link.source.id : link.source;
            const t = typeof link.target === 'object' ? link.target.id : link.target;
            const targetId = hoverNode?.id || selectedNode?.id;
            if (s === targetId || t === targetId) return 3.5;
            return 1;
          }
          if (link.type === 'COUPLE') return 2.5;
          return 1.8;
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
