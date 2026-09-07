/**
 * gaggleStore.js
 * Bulletproof, cache-busting storage manager for The Grand Gaggle Championship.
 * Handles automatic version migration, instantaneous local state updates,
 * and cache-bypassing cross-device synchronization.
 */

const GAGGLE_STORE_KEY = 'wedding_graph_gaggle_v101_store';
const ACTIVE_PLAYER_KEY = 'wedding_graph_active_player_v101';
const LEGACY_KEYS = [
  'wedding_graph_gaggle_v1',
  'wedding_graph_gaggle_v100_store',
  'wedding_graph_active_player_v1',
  'wedding_graph_active_player_v100',
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

const OUTBOX_KEY = 'wedding_graph_unsynced_encounters_v100';

export function getUnsyncedEncounters() {
  try {
    const raw = localStorage.getItem(OUTBOX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function saveUnsyncedEncounters(list) {
  try {
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('Error saving unsynced encounters:', err);
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
    e => normalizeName(e.actor) === normalizeName(actorName) &&
         normalizeName(e.target) === normalizeName(targetGuest.name)
  );

  let updatedEncounters = store.encounters;
  let encounterToSync = null;
  if (!exists) {
    encounterToSync = {
      id: `honk_${timestamp}_${Math.random().toString(36).substr(2, 5)}`,
      actor: actorName,
      target: targetGuest.name,
      targetCohort: targetGuest.cohort || 'Other',
      targetCity: extractCityState(targetGuest.location || targetGuest.city),
      timestamp
    };
    updatedEncounters = [encounterToSync, ...store.encounters];
    
    // Add to local Outbox queue for reliable resubmission
    const outbox = getUnsyncedEncounters();
    saveUnsyncedEncounters([encounterToSync, ...outbox]);
  }

  const updatedStore = {
    encounters: updatedEncounters,
    playerSprintStarts: playerStarts
  };

  saveGaggleData(updatedStore);

  // Background flush of outbox queue
  flushUnsyncedEncounters();

  return updatedStore;
}

// Flush local outbox queue to remote GitHub endpoint
export async function flushUnsyncedEncounters() {
  const outbox = getUnsyncedEncounters();
  if (!outbox || outbox.length === 0) return;

  const remaining = [];
  for (const encounter of outbox) {
    const success = await syncEncounterToGithub(encounter);
    if (!success) {
      remaining.push(encounter);
    }
  }

  saveUnsyncedEncounters(remaining);
}

const FIREBASE_DB_URL = 'https://wedding-graph-default-rtdb.firebaseio.com/encounters.json';

// Push encounter to remote Firebase Realtime DB endpoint for instant cross-device sharing
export async function syncEncounterToGithub(encounter) {
  try {
    const payload = {
      actor: encounter.actor,
      target: encounter.target,
      targetCohort: encounter.targetCohort || 'Other',
      timestamp: encounter.timestamp || Date.now()
    };
    const res = await fetch(FIREBASE_DB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return res.ok || res.status === 200;
  } catch (err) {
    console.warn('Remote sync fetch notice (will retry via Outbox queue):', err);
    return false;
  }
}

// Fetch remote encounters from Firebase DB to sync live across devices instantly
export async function fetchRemoteEncounters() {
  // First retry flushing any pending local outbox items
  await flushUnsyncedEncounters();

  try {
    const res = await fetch(FIREBASE_DB_URL);
    if (!res.ok) return null;

    const data = await res.json();
    if (!data) return null;

    const remoteEncounters = Object.entries(data).map(([key, val]) => ({
      id: key,
      actor: val.actor,
      target: val.target,
      targetCohort: val.targetCohort || 'Other',
      timestamp: val.timestamp || Date.now()
    }));

    if (remoteEncounters.length > 0) {
      const store = getStoredGaggleData();
      const existingKeys = new Set(store.encounters.map(e => `${normalizeName(e.actor)}_${normalizeName(e.target)}`));
      
      let hasNew = false;
      const merged = [...store.encounters];

      remoteEncounters.forEach(re => {
        const key = `${normalizeName(re.actor)}_${normalizeName(re.target)}`;
        if (!existingKeys.has(key)) {
          merged.push(re);
          existingKeys.add(key);
          hasNew = true;
        }
      });

      if (hasNew) {
        const updated = { ...store, encounters: merged };
        saveGaggleData(updated);
        return updated;
      }
    }
  } catch (err) {
    console.warn('Remote encounters sync notice:', err);
  }
  return null;
}

// Canonical Name Normalizer to prevent false-positives between family members
export function normalizeName(nameStr) {
  if (!nameStr) return '';
  let str = String(nameStr).toLowerCase().replace(/["']/g, '').trim();
  // Strip common nick names / quotes and resolve aliases
  if (str.includes('j-bibbs') || str.includes('jonathan bibayan')) {
    return 'jonathan bibayan';
  }
  return str;
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

    // Dynamic resolution of all locations (current residence & hometown origins) associated with target guest
    const targetGuestObj = guestMap.get(e.target);
    if (targetGuestObj) {
      if (targetGuestObj.currentlyLivesIn && targetGuestObj.currentlyLivesIn !== 'Other') {
        stats.citiesMet.add(targetGuestObj.currentlyLivesIn);
      }
      if (targetGuestObj.originallyFrom && targetGuestObj.originallyFrom !== 'Other') {
        stats.citiesMet.add(targetGuestObj.originallyFrom);
      }
      if (!targetGuestObj.currentlyLivesIn && !targetGuestObj.originallyFrom && targetGuestObj.state) {
        stats.citiesMet.add(targetGuestObj.state);
      }
    }

    // Soul-Gander Compatibility Matchmaker Score calculation
    if (targetGuestObj) {
      const actorGuestObj = guestMap.get(e.actor);
      if (actorGuestObj) {
        let matchPts = 0;
        // Shared hobbies / interests
        const actorHobbies = Array.isArray(actorGuestObj.hobbies) ? actorGuestObj.hobbies : [];
        const targetHobbies = Array.isArray(targetGuestObj.hobbies) ? targetGuestObj.hobbies : [];
        const actorHobbySet = new Set(actorHobbies.map(h => String(h).trim().toLowerCase()));
        targetHobbies.forEach(h => {
          if (h && actorHobbySet.has(String(h).trim().toLowerCase())) {
            matchPts += 30;
          }
        });
        // Shared current location
        if (actorGuestObj.currentlyLivesIn && targetGuestObj.currentlyLivesIn && actorGuestObj.currentlyLivesIn.toLowerCase() === targetGuestObj.currentlyLivesIn.toLowerCase()) {
          matchPts += 25;
        }
        // Shared hometown
        if (actorGuestObj.originallyFrom && targetGuestObj.originallyFrom && actorGuestObj.originallyFrom.toLowerCase() === targetGuestObj.originallyFrom.toLowerCase()) {
          matchPts += 25;
        }
        // Shared cohort
        if (actorGuestObj.cohort && targetGuestObj.cohort && actorGuestObj.cohort.toLowerCase() === targetGuestObj.cohort.toLowerCase()) {
          matchPts += 20;
        }
        // Shared side
        if (actorGuestObj.side && targetGuestObj.side && actorGuestObj.side.toLowerCase() === targetGuestObj.side.toLowerCase()) {
          matchPts += 15;
        }
        stats.totalMatchScore += matchPts;
      } else {
        stats.totalMatchScore += 10;
      }
    } else {
      stats.totalMatchScore += 10;
    }

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
  });

  const playerList = Object.values(playerStats);

  // 1. Master Gaggle Leader (Most Unique Cohorts)
  const masterGaggleLeaderboard = [...playerList].sort(
    (a, b) => b.cohortsMet.size - a.cohortsMet.size || b.honkCount - a.honkCount
  );

  // 2. Honk Specialist (Most Total Honks / Encounters)
  const honkSpecialistLeaderboard = [...playerList].sort(
    (a, b) => b.honkCount - a.honkCount
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
    (a, b) => b.totalMatchScore - a.totalMatchScore || b.honkCount - a.honkCount
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
