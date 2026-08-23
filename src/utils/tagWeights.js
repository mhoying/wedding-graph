/**
 * Dynamic Inverse Tag Frequency (IDF) Weighting Utility
 * Computes exact interest weights dynamically based on live guest frequencies.
 */

export function calculateTagWeights(nodes = []) {
  const counts = {};
  const guestNodes = (nodes || []).filter(n => n && n.type === 'GUEST');

  guestNodes.forEach(n => {
    (n.hobbies || []).forEach(h => {
      if (h && h.trim()) {
        const key = h.trim();
        counts[key] = (counts[key] || 0) + 1;
      }
    });
  });

  const weights = {};
  Object.entries(counts).forEach(([tag, count]) => {
    // IDF Formula: weight = min(85, max(10, round(80 / count^0.55)))
    weights[tag] = Math.min(85, Math.max(10, Math.round(80 / Math.pow(count, 0.55))));
  });

  return weights;
}

export function computeMatchScore(me, other, nodes = []) {
  if (!me || !other || me.id === other.id) return { sharedScore: 0, reasons: [] };

  const tagWeights = calculateTagWeights(nodes);
  const meHobbies = new Set(me.hobbies || []);

  let sharedScore = 0;
  const reasons = [];

  // 1. Shared Interests (Dynamically Weighted by IDF)
  (other.hobbies || []).forEach(h => {
    if (meHobbies.has(h)) {
      const weight = tagWeights[h] || 40;
      sharedScore += weight;
      reasons.push(`Shared Interest: ${h} (+${weight} pts)`);
    }
  });

  // 2. Shared Hometown (+30 pts)
  const myHome = (me.originallyFrom || me.hometown || '').toLowerCase();
  const otherHome = (other.originallyFrom || other.hometown || '').toLowerCase();
  if (myHome && otherHome && myHome === otherHome) {
    sharedScore += 30;
    reasons.push(`Both originally from ${me.originallyFrom || me.hometown}`);
  }

  // 3. Shared Current Location (+25 pts)
  const myLive = (me.currentlyLivesIn || me.state || '').toLowerCase();
  const otherLive = (other.currentlyLivesIn || other.state || '').toLowerCase();
  if (myLive && otherLive && myLive === otherLive) {
    sharedScore += 25;
    reasons.push(`Both live in ${me.currentlyLivesIn || me.state}`);
  }

  return { sharedScore, reasons };
}
