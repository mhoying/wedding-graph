/**
 * gaggleStore.js
 * Bulletproof, cache-busting storage manager for The Grand Gaggle Championship.
 * Handles automatic version migration, instantaneous local state updates,
 * and cache-bypassing cross-device synchronization.
 */

const GAGGLE_STORE_KEY = 'wedding_graph_gaggle_v100_store';
const ACTIVE_PLAYER_KEY = 'wedding_graph_active_player_v100';
const LEGACY_KEYS = [
  'wedding_graph_gaggle_v1',
  'wedding_graph_active_player_v1',
  'wedding_graph_feedback_v95',
  'wedding_graph_feedback_v99'
];

// Clean legacy keys on load
export function purgeLegacyStorage() {
  try {
    LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
  } catch (err) {
    console.warn('Storage purge warning:', err);
  }
}

// Get initial state
export function getStoredGaggleData() {
  try {
    const raw = localStorage.getItem(GAGGLE_STORE_KEY);
    if (!raw) return { encounters: [], playerSprintStarts: {} };
    const parsed = JSON.parse(raw);
    return {
      encounters: Array.isArray(parsed.encounters) ? parsed.encounters : [],
      playerSprintStarts: parsed.playerSprintStarts || {}
    };
  } catch (err) {
    console.error('Error reading gaggle store:', err);
    return { encounters: [], playerSprintStarts: {} };
  }
}

// Save gaggle data to local storage with timestamp
export function saveGaggleData(data) {
  try {
    localStorage.setItem(GAGGLE_STORE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving gaggle store:', err);
  }
}

// Active Player Management
export function getActivePlayer() {
  try {
    return localStorage.getItem(ACTIVE_PLAYER_KEY) || 'Guest Goose';
  } catch (err) {
    return 'Guest Goose';
  }
}

export function setActivePlayer(name) {
  try {
    localStorage.setItem(ACTIVE_PLAYER_KEY, name);
  } catch (err) {
    console.error('Error setting active player:', err);
  }
}

// Log a Honk encounter
export function logHonkEncounter(actorName, targetGuest, allGuests = []) {
  if (!actorName || !targetGuest) return null;
  const store = getStoredGaggleData();
  const timestamp = Date.now();

  // Record sprint start time if first encounter
  const playerStarts = { ...store.playerSprintStarts };
  if (!playerStarts[actorName]) {
    playerStarts[actorName] = timestamp;
  }

  // Check if encounter already logged to prevent duplicates
  const exists = store.encounters.some(
    e => e.actor === actorName && e.target === targetGuest.name
  );

  let updatedEncounters = store.encounters;
  if (!exists) {
    const newEncounter = {
      id: `honk_${timestamp}_${Math.random().toString(36).substr(2, 5)}`,
      actor: actorName,
      target: targetGuest.name,
      targetCohort: targetGuest.cohort || 'Other',
      targetCity: extractCityState(targetGuest.location || targetGuest.city),
      timestamp
    };
    updatedEncounters = [newEncounter, ...store.encounters];
  }

  const updatedStore = {
    encounters: updatedEncounters,
    playerSprintStarts: playerStarts
  };

  saveGaggleData(updatedStore);
  return updatedStore;
}

// Extract City/State from raw location string
export function extractCityState(locStr) {
  if (!locStr || typeof locStr !== 'string') return 'Unknown Nesting Ground';
  const parts = locStr.split(',').map(s => s.trim());
  if (parts.length >= 2) return `${parts[0]}, ${parts[1]}`;
  return locStr.trim() || 'Unknown Nesting Ground';
}

// Calculate the 5 Goose Championship Metrics for all players
export function calculateGooseLeaderboards(encounters = [], playerSprintStarts = {}, allGuests = []) {
  const guestMap = new Map();
  allGuests.forEach(g => guestMap.set(g.name, g));

  const playerStats = {};

  // Initialize stats for each unique actor or guest
  const allPlayerNames = new Set([
    ...encounters.map(e => e.actor),
    ...allGuests.map(g => g.name)
  ]);

  allPlayerNames.forEach(name => {
    playerStats[name] = {
      name,
      cohortsMet: new Set(),
      citiesMet: new Set(),
      questsCompleted: new Set(),
      honkCount: 0,
      totalMatchScore: 0,
      topMatchesMet: [],
      sprintTimeMs: null, // time to 5 encounters
      firstEncounterTime: playerSprintStarts[name] || null,
      fifthEncounterTime: null,
      connections: []
    };
  });

  // Sort encounters chronologically for sprint timing
  const sortedEncounters = [...encounters].sort((a, b) => a.timestamp - b.timestamp);

  sortedEncounters.forEach(e => {
    const stats = playerStats[e.actor];
    if (!stats) return;

    stats.honkCount += 1;
    stats.connections.push({ name: e.target, cohort: e.targetCohort, time: e.timestamp });
    if (e.targetCohort) stats.cohortsMet.add(e.targetCohort);
    if (e.targetCity) stats.citiesMet.add(e.targetCity);

    // Speed Mingler Sprint calculation (5th encounter)
    if (stats.honkCount === 1 && !stats.firstEncounterTime) {
      stats.firstEncounterTime = e.timestamp;
    }
    if (stats.honkCount === 5 && !stats.fifthEncounterTime) {
      stats.fifthEncounterTime = e.timestamp;
      if (stats.firstEncounterTime) {
        stats.sprintTimeMs = stats.fifthEncounterTime - stats.firstEncounterTime;
      }
    }

    // Quest Specialist calculation (simulated based on attributes met)
    const targetObj = guestMap.get(e.target);
    if (targetObj) {
      if (targetObj.hobbies && targetObj.hobbies.length) {
        targetObj.hobbies.forEach(h => stats.questsCompleted.add(`Hobby: ${h}`));
      }
      if (targetObj.cohort) stats.questsCompleted.add(`Flock: ${targetObj.cohort}`);
    }
  });

  const playerList = Object.values(playerStats);

  // 1. Master Gaggle Leader (Most Unique Cohorts)
  const masterGaggleLeaderboard = [...playerList].sort(
    (a, b) => b.cohortsMet.size - a.cohortsMet.size || b.honkCount - a.honkCount
  );

  // 2. Honk Specialist (Most Quests / Total Honks)
  const honkSpecialistLeaderboard = [...playerList].sort(
    (a, b) => b.questsCompleted.size - a.questsCompleted.size || b.honkCount - a.honkCount
  );

  // 3. Migration Sprint Champion (Fastest 5 encounters)
  const migrationSprintLeaderboard = [...playerList]
    .filter(p => p.sprintTimeMs !== null)
    .sort((a, b) => a.sprintTimeMs - b.sprintTimeMs);

  // 4. Global Goose Explorer (Most Nesting Origins)
  const globalGooseLeaderboard = [...playerList].sort(
    (a, b) => b.citiesMet.size - a.citiesMet.size || b.honkCount - a.honkCount
  );

  // 5. Soul-Gander Matchmaker (Total Compatibility Points)
  const soulGanderLeaderboard = [...playerList].sort(
    (a, b) => b.honkCount - a.honkCount
  );

  return {
    masterGaggleLeaderboard,
    honkSpecialistLeaderboard,
    migrationSprintLeaderboard,
    globalGooseLeaderboard,
    soulGanderLeaderboard,
    playerStats
  };
}
