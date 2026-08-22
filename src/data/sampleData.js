export const SAMPLE_NODES = [
  {
    id: "maureen",
    name: "Maureen",
    type: "ANCHOR",
    cohort: "The Couple",
    side: "Maureen",
    state: "CA",
    hometown: "San Francisco, CA",
    hobbies: ["Coffee", "Trail Running", "Pottery", "Dog Lover"],
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
    hobbies: ["Cycling", "Mechanical Keyboards", "Sourdough", "Coffee"],
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
    hobbies: ["Dog Lover", "Outdoors"],
    familyStatus: "Community Hub",
    relationship: "Favorite Weekend Spot",
    image: ""
  },
  {
    id: "uncle_bob",
    name: "Uncle Bob",
    type: "NON_ATTENDING",
    cohort: "Family",
    side: "Matt",
    state: "TX",
    hometown: "Austin, TX",
    hobbies: ["Barbecue", "Guitars"],
    familyStatus: "Not Attending",
    relationship: "Mutual Uncle (Connecting Bridge)",
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
    hobbies: ["Skiing", "Indie Rock", "Analog Photography", "Coffee"],
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
    hobbies: ["Bouldering", "Matcha", "Dog Lover", "Cycling"],
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
    hobbies: ["Urban Planning", "Coffee", "Modern Art", "Wine"],
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
    hobbies: ["Dog Lover", "Camping", "Craft Beer", "Hiking"],
    familyStatus: "Solo",
    relationship: "Met Maureen & Matt at Avalon Dog Park",
    image: ""
  }
];

export const SAMPLE_LINKS = [
  { source: "maureen", target: "matt", label: "Married" },
  { source: "brian_kim", target: "maureen", label: "College Friends" },
  { source: "freedman_rahmans", target: "matt", label: "Grad School" },
  { source: "freedman_rahmans", target: "maureen", label: "Family Friends" },
  { source: "eleanor_chen", target: "maureen", label: "Teammates" },
  { source: "david_vance", target: "avalon_dog_park", label: "Regulars" },
  { source: "maureen", target: "avalon_dog_park", label: "Weekend Spot" },
  { source: "matt", target: "avalon_dog_park", label: "Weekend Spot" },
  { source: "matt", target: "uncle_bob", label: "Family" },
  { source: "freedman_rahmans", target: "uncle_bob", label: "Family Friend" }
];

export const COHORT_COLORS = {
  "The Couple": "#38bdf8",     // Sky Blue
  "Cornell": "#b31b1b",        // Authentic Cornell Red
  "Stanford": "#8c1515",       // Authentic Stanford Cardinal
  "Google": "#64748b",         // Slate Blue-Grey
  "Dog Park": "#10b981",       // Sage Green
  "Family": "#6366f1",         // Indigo Family
  "Default": "#94a3b8"
};

export const SIDE_COLORS = {
  "Maureen": "#52796f",        // Muted Forest Sage
  "Matt": "#0284c7",           // Pacific Slate Blue
  "Joint": "#10b981",          // Emerald Green
  "The Couple": "#38bdf8"
};

export const STATE_COLORS = {
  "CA": "#0284c7",             // Pacific Ocean Slate Blue
  "WA": "#10b981",             // Evergreen State Sage
  "NY": "#6366f1",             // Indigo State
  "TX": "#f59e0b",             // Amber State
  "Default": "#64748b"
};
