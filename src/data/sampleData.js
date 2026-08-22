// Auto-generated & updated from guest profile edits
export const COHORT_COLORS = {
  "Maureen Family": "#e11d48",
  "Matt Family": "#e11d48",
  "The Couple": "#38bdf8",
  "Atlanta": "#f59e0b",
  "Cornell": "#b31b1b",
  "High School": "#8b5cf6",
  "Work": "#10b981",
  "Default": "#64748b"
};

export const SIDE_COLORS = {
  "Maureen": "#ec4899",
  "Matt": "#3b82f6",
  "Joint": "#10b981"
};

export const STATE_COLORS = {
  "GA": "#f59e0b",
  "NY": "#b31b1b",
  "CA": "#06b6d4",
  "UK": "#8b5cf6",
  "Canada": "#ef4444",
  "Default": "#64748b"
};

export const SAMPLE_NODES = [
  {
    "id": "maureen",
    "name": "Maureen",
    "type": "ANCHOR",
    "cohort": "The Couple",
    "side": "Maureen",
    "originallyFrom": "Boston, MA",
    "currentlyLivesIn": "San Francisco, CA",
    "hobbies": [
      "Coffee",
      "Trail Running",
      "Pottery",
      "Dog Lover"
    ],
    "familyStatus": "Bride",
    "relationship": "The Bride",
    "image": ""
  },
  {
    "id": "matt",
    "name": "Matt",
    "type": "ANCHOR",
    "cohort": "The Couple",
    "side": "Matt",
    "originallyFrom": "Chicago, IL",
    "currentlyLivesIn": "San Francisco, CA",
    "hobbies": [
      "Cycling",
      "Mechanical Keyboards",
      "Sourdough"
    ],
    "familyStatus": "Groom",
    "relationship": "The Groom",
    "image": ""
  },
  {
    "id": "avalon_dog_park",
    "name": "Avalon Dog Park",
    "type": "CONTEXT_HUB",
    "cohort": "Dog Park",
    "side": "Joint",
    "originallyFrom": "San Francisco, CA",
    "currentlyLivesIn": "San Francisco, CA",
    "hobbies": [
      "Dog Lover",
      "Outdoors"
    ],
    "familyStatus": "Community Hub",
    "relationship": "Favorite Weekend Spot",
    "image": ""
  },
  {
    "id": "uncle_bob",
    "name": "Uncle Bob",
    "type": "NON_ATTENDING",
    "cohort": "Family",
    "side": "Matt",
    "originallyFrom": "Austin, TX",
    "currentlyLivesIn": "Austin, TX",
    "hobbies": [
      "Barbecue",
      "Guitars"
    ],
    "familyStatus": "Not Attending",
    "relationship": "Mutual Uncle (Connecting Bridge)",
    "image": ""
  },
  {
    "id": "brian_kim",
    "name": "Brian 'Kimmie' Kim",
    "type": "GUEST",
    "cohort": "Cornell",
    "side": "Maureen",
    "originallyFrom": "Seoul, South Korea",
    "currentlyLivesIn": "Seattle, WA",
    "hobbies": [
      "Skiing",
      "Indie Rock",
      "Analog Photography",
      "Coffee"
    ],
    "familyStatus": "Bringing +1 (Jessica)",
    "relationship": "Survived college dorms with Maureen",
    "image": ""
  },
  {
    "id": "freedman_rahmans",
    "name": "The Freedman-Rahmans",
    "type": "GUEST",
    "cohort": "Stanford",
    "side": "Matt",
    "originallyFrom": "London, UK",
    "currentlyLivesIn": "Palo Alto, CA",
    "hobbies": [
      "Bouldering",
      "Matcha",
      "Dog Lover",
      "Cycling"
    ],
    "familyStatus": "Daughter is 17 now!",
    "relationship": "Grad school cohort with Matt",
    "image": ""
  },
  {
    "id": "eleanor_chen",
    "name": "Eleanor Chen",
    "type": "GUEST",
    "cohort": "Google",
    "side": "Maureen",
    "originallyFrom": "Toronto, Canada",
    "currentlyLivesIn": "New York, NY",
    "hobbies": [
      "Urban Planning",
      "Coffee",
      "Modern Art",
      "Wine"
    ],
    "familyStatus": "Solo",
    "relationship": "Co-worker with Maureen at Google",
    "image": ""
  },
  {
    "id": "david_vance",
    "name": "David Vance",
    "type": "GUEST",
    "cohort": "Dog Park",
    "side": "Joint",
    "originallyFrom": "Dublin, Ireland",
    "currentlyLivesIn": "San Francisco, CA",
    "hobbies": [
      "Dog Lover",
      "Camping",
      "Craft Beer",
      "Hiking",
      "Cycling"
    ],
    "familyStatus": "Solo",
    "relationship": "Met Maureen & Matt at Avalon Dog Park",
    "image": ""
  }
];

export const SAMPLE_LINKS = [
  {
    "source": "maureen",
    "target": "matt",
    "label": "Married"
  },
  {
    "source": "brian_kim",
    "target": "maureen",
    "label": "College Friends"
  },
  {
    "source": "freedman_rahmans",
    "target": "matt",
    "label": "Grad School"
  },
  {
    "source": "freedman_rahmans",
    "target": "maureen",
    "label": "Family Friends"
  },
  {
    "source": "eleanor_chen",
    "target": "maureen",
    "label": "Teammates"
  },
  {
    "source": "david_vance",
    "target": "avalon_dog_park",
    "label": "Regulars"
  },
  {
    "source": "maureen",
    "target": "avalon_dog_park",
    "label": "Weekend Spot"
  },
  {
    "source": "matt",
    "target": "avalon_dog_park",
    "label": "Weekend Spot"
  },
  {
    "source": "matt",
    "target": "uncle_bob",
    "label": "Family"
  },
  {
    "source": "freedman_rahmans",
    "target": "uncle_bob",
    "label": "Family Friend"
  }
];

export const DYNAMIC_CLUSTER_COLORS = [
  '#f472b6', '#38bdf8', '#34d399', '#a78bfa', '#fbbf24', 
  '#f87171', '#818cf8', '#4ade80', '#fb923c', '#e879f9'
];

export function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
