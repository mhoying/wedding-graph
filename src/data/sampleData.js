export const SAMPLE_NODES = [
  {
    id: "sarah_michael",
    name: "Sarah & Michael",
    type: "ANCHOR",
    cohort: "The Couple",
    hometown: "San Francisco, CA",
    icebreakers: "Hosts of the weekend!",
    familyStatus: "Newlyweds",
    relationship: "The Bride & Groom",
    image: ""
  },
  {
    id: "sarah",
    name: "Sarah",
    type: "ANCHOR",
    cohort: "The Couple",
    hometown: "San Francisco, CA",
    icebreakers: "Coffee, Trail Running, Pottery",
    familyStatus: "Bride",
    relationship: "The Bride",
    image: ""
  },
  {
    id: "michael",
    name: "Michael",
    type: "ANCHOR",
    cohort: "The Couple",
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
    hometown: "Seattle, WA",
    icebreakers: "Skiing, Indie Rock, Analog Photography",
    familyStatus: "Bringing +1 (Jessica)",
    relationship: "Survived college dorms with Sarah",
    image: ""
  },
  {
    id: "freedman_rahmans",
    name: "The Freedman-Rahmans",
    type: "GUEST",
    cohort: "Stanford",
    hometown: "Palo Alto, CA",
    icebreakers: "Bouldering, Matcha, Golden Retrievers",
    familyStatus: "Family of 4 (bringing 2 kids, ages 4 & 6)",
    relationship: "Grad school cohort with Michael",
    image: ""
  },
  {
    id: "eleanor_chen",
    name: "Eleanor Chen",
    type: "GUEST",
    cohort: "Google",
    hometown: "New York, NY",
    icebreakers: "Urban Planning, Espresso, Modern Art",
    familyStatus: "Solo",
    relationship: "Co-worker with Sarah at Google",
    image: ""
  },
  {
    id: "david_vance",
    name: "David Vance",
    type: "GUEST",
    cohort: "Dog Park",
    hometown: "San Francisco, CA",
    icebreakers: "Rescue Dogs, Camping, Craft Beer",
    familyStatus: "Solo",
    relationship: "Met Sarah & Michael at Avalon Dog Park",
    image: ""
  }
];

export const SAMPLE_LINKS = [
  { source: "sarah", target: "sarah_michael", label: "" },
  { source: "michael", target: "sarah_michael", label: "" },
  { source: "brian_kim", target: "sarah", label: "College Friends" },
  { source: "brian_kim", target: "cornell", label: "" },
  { source: "freedman_rahmans", target: "michael", label: "Grad School" },
  { source: "eleanor_chen", target: "sarah", label: "Teammates" },
  { source: "david_vance", target: "avalon_dog_park", label: "Regulars" },
  { source: "sarah_michael", target: "avalon_dog_park", label: "Weekend Spot" },
  { source: "freedman_rahmans", target: "sarah_michael", label: "Family Friends" }
];

export const COHORT_COLORS = {
  "The Couple": "#38bdf8",
  "Cornell": "#ef4444",      // Cornell Red
  "Stanford": "#b91c1c",     // Stanford Cardinal
  "Google": "#64748b",       // Slate / Blue-Grey
  "Dog Park": "#10b981",     // Sage Green
  "Default": "#94a3b8"       // Muted Cool Grey
};
