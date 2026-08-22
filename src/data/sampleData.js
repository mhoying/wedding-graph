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
  "Default": "#64748b"
};

export const SAMPLE_NODES = [
  {
    "id": "maureen",
    "name": "Maureen",
    "type": "ANCHOR",
    "cohort": "The Couple",
    "side": "Maureen",
    "state": "CA",
    "hometown": "San Francisco, CA",
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
    "state": "CA",
    "hometown": "San Francisco, CA",
    "hobbies": [
      "Cycling",
      "Mechanical Keyboards",
      "Sourdough"
    ],
    "familyStatus": "Groom",
    "relationship": "The Groom and baddass",
    "image": ""
  },
  {
    "id": "avalon_dog_park",
    "name": "Avalon Dog Park",
    "type": "CONTEXT_HUB",
    "cohort": "Dog Park",
    "side": "Joint",
    "state": "CA",
    "hometown": "San Francisco, CA",
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
    "state": "TX",
    "hometown": "Austin, TX",
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
    "state": "WA",
    "hometown": "Seattle, WA",
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
    "state": "CA",
    "hometown": "Palo Alto, CA",
    "hobbies": [
      "Bouldering",
      "Matcha",
      "Dog Lover",
      "Cycling"
    ],
    "familyStatus": "My daughter is 17 now!",
    "relationship": "Grad school cohort with Matt",
    "image": ""
  },
  {
    "id": "eleanor_chen",
    "name": "Eleanor Chen",
    "type": "GUEST",
    "cohort": "Google",
    "side": "Maureen",
    "state": "NY",
    "hometown": "New York, NY",
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
    "state": "CA",
    "hometown": "San Francisco, CA",
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
