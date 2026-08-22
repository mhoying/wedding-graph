export const SAMPLE_NODES = [
  {
    id: "maureen_matt",
    name: "Maureen & Matt",
    type: "ANCHOR",
    cohort: "The Couple",
    side: "Joint",
    state: "CA",
    hometown: "San Francisco, CA",
    icebreakers: "Hosts of the weekend!",
    familyStatus: "Newlyweds",
    relationship: "The Bride & Groom",
    image: ""
  },
  {
    id: "maureen",
    name: "Maureen",
    type: "ANCHOR",
    cohort: "The Couple",
    side: "Maureen",
    state: "CA",
    hometown: "San Francisco, CA",
    icebreakers: "Coffee, Trail Running, Pottery",
    familyStatus: "Bride",
    relationship: "The Bride",
    image: ""
  },
  {
    id: "matt",
    name: "Matt",
    type: "ANCHOR",
    cohort: "The Couple",
    side: "Matt",
    state: "CA",
    hometown: "San Francisco, CA",
    icebreakers: "Cycling, Mechanical Keyboards, Sourdough",
    familyStatus: "Groom",
    relationship: "The Groom",
    image: ""
  },
  {
    id: "avalon_dog_park",
    name: "Avalon Dog Park",
    type: "CONTEXT_HUB",
    cohort: "Dog Park",
    side: "Joint",
    state: "CA",
    hometown: "San Francisco, CA",
    icebreakers: "Where dog lovers collide!",
    familyStatus: "Community Hub",
    relationship: "Favorite Weekend Spot",
    image: ""
  },
  {
    id: "brian_kim",
    name: "Brian 'Kimmie' Kim",
    type: "GUEST",
    cohort: "Cornell",
    side: "Maureen",
    state: "WA",
    hometown: "Seattle, WA",
    icebreakers: "Skiing, Indie Rock, Analog Photography",
    familyStatus: "Bringing +1 (Jessica)",
    relationship: "Survived college dorms with Maureen",
    image: ""
  },
  {
    id: "freedman_rahmans",
    name: "The Freedman-Rahmans",
    type: "GUEST",
    cohort: "Stanford",
    side: "Matt",
    state: "CA",
    hometown: "Palo Alto, CA",
    icebreakers: "Bouldering, Matcha, Golden Retrievers",
    familyStatus: "Family of 4 (bringing 2 kids, ages 4 & 6)",
    relationship: "Grad school cohort with Matt",
    image: ""
  },
  {
    id: "eleanor_chen",
    name: "Eleanor Chen",
    type: "GUEST",
    cohort: "Google",
    side: "Maureen",
    state: "NY",
    hometown: "New York, NY",
    icebreakers: "Urban Planning, Espresso, Modern Art",
    familyStatus: "Solo",
    relationship: "Co-worker with Maureen at Google",
    image: ""
  },
  {
    id: "david_vance",
    name: "David Vance",
    type: "GUEST",
    cohort: "Dog Park",
    side: "Joint",
    state: "CA",
    hometown: "San Francisco, CA",
    icebreakers: "Rescue Dogs, Camping, Craft Beer",
    familyStatus: "Solo",
    relationship: "Met Maureen & Matt at Avalon Dog Park",
    image: ""
  }
];

export const SAMPLE_LINKS = [
  { source: "maureen", target: "maureen_matt", label: "" },
  { source: "matt", target: "maureen_matt", label: "" },
  { source: "brian_kim", target: "maureen", label: "College Friends" },
  { source: "freedman_rahmans", target: "matt", label: "Grad School" },
  { source: "eleanor_chen", target: "maureen", label: "Teammates" },
  { source: "david_vance", target: "avalon_dog_park", label: "Regulars" },
  { source: "maureen_matt", target: "avalon_dog_park", label: "Weekend Spot" },
  { source: "freedman_rahmans", target: "maureen_matt", label: "Family Friends" }
];

export const COHORT_COLORS = {
  "The Couple": "#38bdf8",
  "Cornell": "#ef4444",      // Cornell Red
  "Stanford": "#b91c1c",     // Stanford Cardinal
  "Google": "#64748b",       // Slate
  "Dog Park": "#10b981",     // Sage Green
  "Default": "#94a3b8"
};

export const SIDE_COLORS = {
  "Maureen": "#ec4899",     // Pink/Rose accent for Maureen's side
  "Matt": "#0284c7",        // Deep Sky Blue for Matt's side
  "Joint": "#10b981",       // Emerald Green for Joint friends
  "The Couple": "#38bdf8"
};

export const STATE_COLORS = {
  "CA": "#0284c7",          // Pacific Ocean Blue
  "WA": "#10b981",          // Evergreen State
  "NY": "#8b5cf6",          // Purple
  "Default": "#64748b"
};
