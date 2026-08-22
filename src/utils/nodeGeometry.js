// Dynamic Layout Math & Bounding Geometry Calculations in World Coordinates

/**
 * Calculates exact native world dimensions and collision radius for a graph node
 * @param {Object} node 
 * @param {boolean} showHeadshots 
 * @param {number} scaleMult 
 * @returns {{width: number, height: number, avatarDiameter: number, fontSize: number, textWidth: number, collisionRadius: number}}
 */
export function getNodeBounds(node, showHeadshots = true, scaleMult = 1.0) {
  if (!node) return { width: 100, height: 40, avatarDiameter: 40, fontSize: 11, textWidth: 60, collisionRadius: 75 };

  const isAnchor = node.id === 'maureen' || node.id === 'matt';
  const isHub = node.type === 'CONTEXT_HUB';
  const isNonAttending = node.type === 'NON_ATTENDING';
  const renderAvatar = showHeadshots && !isHub;

  let labelText = node.name || 'Guest';
  if (isHub) labelText = `📍 ${node.name}`;
  if (isNonAttending) labelText = `${node.name} (Not Attending)`;

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

  const halfW = width / 2;
  const halfH = height / 2;
  const collisionRadius = (Math.hypot(halfW, halfH) + 22 * scaleMult) * 1.25;

  return { width, height, avatarDiameter, fontSize, textWidth, collisionRadius };
}

/**
 * Helper to convert hex color to rgba with opacity
 * @param {string} hex 
 * @param {number} alpha 
 * @returns {string}
 */
export function hexToRgba(hex, alpha = 1.0) {
  if (!hex || typeof hex !== 'string') return `rgba(56, 189, 248, ${alpha})`;
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return `rgba(56, 189, 248, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
