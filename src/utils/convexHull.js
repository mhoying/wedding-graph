// 2D Andrew's Monotone Chain Convex Hull Algorithm for Organic Blob Clusters

/**
 * Computes the 2D convex hull polygon wrapping a set of 2D points
 * @param {Array<{x: number, y: number}>} points 
 * @returns {Array<{x: number, y: number}>}
 */
export function getConvexHull2D(points) {
  if (!points || points.length <= 2) return points || [];
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

/**
 * Draws a smooth organic Bezier spline path around convex hull vertices on HTML5 Canvas
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Array<{x: number, y: number}>} hull 
 */
export function drawOrganicSplinePath(ctx, hull) {
  if (!hull || hull.length < 3) return;
  const n = hull.length;
  const xc0 = (hull[n - 1].x + hull[0].x) / 2;
  const yc0 = (hull[n - 1].y + hull[0].y) / 2;

  ctx.beginPath();
  ctx.moveTo(xc0, yc0);

  for (let i = 0; i < n; i++) {
    const next = hull[(i + 1) % n];
    const xc = (hull[i].x + next.x) / 2;
    const yc = (hull[i].y + next.y) / 2;
    ctx.quadraticCurveTo(hull[i].x, hull[i].y, xc, yc);
  }

  ctx.closePath();
}
