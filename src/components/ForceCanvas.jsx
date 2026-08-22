import React, { useRef, useEffect, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force';
import { getNodeBounds, hexToRgba } from '../utils/nodeGeometry';
import { getConvexHull2D } from '../utils/convexHull';
import { COHORT_COLORS, DYNAMIC_CLUSTER_COLORS, getInitials } from '../data/sampleData';

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
  imageCacheRef = { current: {} }
}) {
  // Pre-load guest photo images into ref cache
  useEffect(() => {
    if (nodes && imageCacheRef && imageCacheRef.current) {
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
  }, [nodes, imageCacheRef]);

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

    if (clusterMode === 'none') return;

    let clusterGroups = {};

    if (clusterMode === 'interests') {
      clusterGroups = dynamicAutoClusters || {};
    } else if (clusterMode === 'locations') {
      clusterGroups = dynamicLocationClusters || {};
    } else if (clusterMode === 'current_location') {
      clusterGroups = dynamicCurrentLocationClusters || {};
    } else if (clusterMode === 'original_location') {
      clusterGroups = dynamicOriginalLocationClusters || {};
    } else {
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
      if (nodesArr && nodesArr.length > 1) {
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
          clusterColor = '#f59e0b';
        } else if (label.startsWith('📍 Lives in:')) {
          clusterColor = '#06b6d4';
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

        let topPoint = hull[0];
        hull.forEach(p => { if (p.y < topPoint.y) topPoint = p; });

        let labelX = topPoint.x;
        let labelY = topPoint.y - 14 * nodeScaleMultiplier;
        const fontSize = 22 * nodeScaleMultiplier;
        ctx.font = `800 ${fontSize}px Inter, sans-serif`;
        const textWidth = ctx.measureText(label.toUpperCase()).width || (120 * nodeScaleMultiplier);
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
        ctx.font = `800 ${fontSize}px Inter, sans-serif`;
        ctx.fillStyle = clusterColor;
        ctx.textAlign = 'left';
        ctx.fillText(label.toUpperCase(), labelX, labelY);
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
    const isNonAttending = node.type === 'NON_ATTENDING';

    let labelText = node.name || 'Guest';
    if (isHub) labelText = `📍 ${node.name}`;
    if (isNonAttending) labelText = `${node.name} (Not Attending)`;

    ctx.save();
    ctx.globalAlpha = isDimmed ? 0.12 : (isNonAttending ? 0.75 : 1.0);

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
            return isLightMode ? 'rgba(244, 114, 182, 0.6)' : 'rgba(244, 114, 182, 0.45)';
          }
          if (link.type === 'FAMILY' || link.type === 'SIBLING') {
            return isLightMode ? 'rgba(56, 189, 248, 0.5)' : 'rgba(56, 189, 248, 0.35)';
          }
          return isLightMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(148, 163, 184, 0.18)';
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
            if (s === targetId || t === targetId) return 3;
            return 1;
          }
          if (link.type === 'COUPLE') return 2.5;
          return 1.2;
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
