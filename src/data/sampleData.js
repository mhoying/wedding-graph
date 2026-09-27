export const BUILD_TIMESTAMP = 1790476690152;
// Real Wedding Guest List Data - Auto-updated via Host Admin Suite
export const COHORT_COLORS = {
  "The Couple": "#38bdf8",
  "Cornell": "#ef4444",
  "Google": "#4285f4",
  "Stanford": "#881337",
  "Lehigh": "#653819",
  "Dog Park": "#10b981",
  "OWFL Blog": "#ec4899",
  "Bay FC": "#f59e0b",
  "Jenna": "#a855f7",
  "Other": "#64748b",
  "Default": "#64748b"
};

export const SIDE_COLORS = {
  "Maureen": "#ec4899",
  "Matt": "#3b82f6",
  "Joint": "#10b981"
};

export const STATE_COLORS = {
  "SF Bay Area": "#38bdf8",
  "NJ": "#ec4899",
  "Chicago": "#10b981",
  "NYC": "#f59e0b",
  "DC": "#8b5cf6",
  "Madison, WI": "#06b6d4",
  "Bermuda": "#f97316",
  "Upstate NY": "#ef4444",
  "Baltimore": "#14b8a6",
  "Western PA": "#eab308",
  "Boston, MA": "#6366f1",
  "Minnesota": "#84cc16",
  "Northern CA": "#d946ef",
  "Southern CA": "#f43f5e",
  "Maryland": "#0284c7",
  "Puerto Rico": "#b45309",
  "Eastern PA": "#4f46e5",
  "NY": "#db2777",
  "Colorado": "#0891b2",
  "Houston": "#ca8a04",
  "Florida": "#65a30d",
  "Zurich": "#7c3aed",
  "Bay FC": "#f59e0b",
  "Other": "#64748b",
  "Default": "#64748b"
};

export const DYNAMIC_CLUSTER_COLORS = [
  "#38bdf8", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6",
  "#06b6d4", "#ef4444", "#a855f7", "#eab308", "#14b8a6",
  "#f97316", "#6366f1", "#84cc16", "#d946ef", "#0284c7",
  "#059669", "#b45309", "#4f46e5", "#db2777", "#0891b2",
  "#ca8a04", "#65a30d", "#7c3aed", "#c026d3", "#2563eb",
  "#16a34a", "#dc2626", "#9333ea", "#ea580c", "#0d9488",
  "#475569", "#e11d48"
];

export const SAMPLE_NODES = [
  {
    "id": "matt",
    "name": "Matt Hoying",
    "type": "ANCHOR",
    "image": "headshots/matt.jpg",
    "cohort": "The Couple",
    "side": "Matt",
    "relationship": "Honk Family",
    "originallyFrom": "Upstate NY",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Cocktails",
      "Whiskey",
      "Dogs",
      "Beer",
      "Bay FC",
      "Music",
      "Photography",
      "Outdoors",
      "RPI Medal",
      "Gaming",
      "Aquaria"
    ],
    "__indexColor": "#ec0001",
    "fx": 110,
    "fy": 0,
    "x": 110,
    "y": 0,
    "index": 0,
    "vx": 0,
    "vy": 0,
    "state": "SF Bay Area"
  },
  {
    "id": "maureen",
    "name": "Maureen Wink",
    "type": "ANCHOR",
    "image": "/headshots/maureen_wink.jpg",
    "cohort": "The Couple",
    "side": "Maureen",
    "relationship": "Honk Family",
    "originallyFrom": "NJ",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Cocktails",
      "Whiskey",
      "Dogs",
      "Beer",
      "Bay FC",
      "Lehigh",
      "Wine",
      "RPI Medal",
      "Books",
      "Buffalo Bills",
      "Camping"
    ],
    "__indexColor": "#d80002",
    "fx": -110,
    "fy": 0,
    "x": -110,
    "y": 0,
    "index": 1,
    "vx": 0,
    "vy": 0
  },
  {
    "id": "cole_armstrong",
    "image": "headshots/cole_armstrong.jpg",
    "name": "Cole Armstrong",
    "type": "NON_ATTENDING",
    "cohort": "Dog Park",
    "side": "Joint",
    "relationship": "The Armstrong Family",
    "originallyFrom": "",
    "currentlyLivesIn": "Northern CA",
    "familyStatus": "Family",
    "hobbies": [
      "Beer",
      "Music",
      "Dogs",
      "Kids"
    ],
    "__indexColor": "#c40003",
    "index": 2,
    "x": 974.6776425380423,
    "y": -480.24293253833804,
    "vx": 0,
    "vy": 0,
    "fx": 974.6776425380423,
    "fy": -480.24293253833804
  },
  {
    "id": "dog_park",
    "name": "Avalon Dog Park",
    "type": "CONTEXT_HUB",
    "cohort": "Dog Park",
    "side": "Joint",
    "relationship": "Dog Park",
    "originallyFrom": "SF Bay Area",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Hub",
    "hobbies": [
      "Dogs"
    ],
    "__indexColor": "#b00004",
    "index": 3,
    "x": 153.84632637158936,
    "y": -270.07888497417093,
    "vx": 0,
    "vy": 0,
    "fx": 153.84632637158936,
    "fy": -270.07888497417093
  },
  {
    "id": "owfl_blog",
    "name": "OWFL Blog",
    "type": "CONTEXT_HUB",
    "cohort": "OWFL Blog",
    "side": "Joint",
    "relationship": "",
    "originallyFrom": "DC",
    "currentlyLivesIn": "DC",
    "familyStatus": "Hub",
    "hobbies": [
      "Food"
    ],
    "__indexColor": "#9c0005",
    "index": 4,
    "x": 781.5556033875005,
    "y": 206.09035080814147,
    "vx": 0,
    "vy": 0,
    "fx": 781.5556033875005,
    "fy": 206.09035080814147
  },
  {
    "id": "bay_fc",
    "name": "Bay FC Tailgate",
    "type": "CONTEXT_HUB",
    "cohort": "Bay FC",
    "side": "Joint",
    "relationship": "Bay FC",
    "originallyFrom": "SF Bay Area",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Hub",
    "hobbies": [
      "Bay FC",
      "Soccer"
    ],
    "__indexColor": "#880006",
    "index": 5,
    "x": 0.6846372982030795,
    "y": -839.4556701883595,
    "vx": 0,
    "vy": 0,
    "fx": 0.6846372982030795,
    "fy": -839.4556701883595
  },
  {
    "id": "honk",
    "name": "Honk",
    "type": "CONTEXT_HUB",
    "cohort": "The Couple",
    "side": "Joint",
    "relationship": "Guest",
    "originallyFrom": "",
    "currentlyLivesIn": "",
    "familyStatus": "Single",
    "hobbies": [],
    "__indexColor": "#740007",
    "index": 6,
    "x": 32.1425605447413,
    "y": -467.48690645945476,
    "vx": 0,
    "vy": 0,
    "fx": 32.1425605447413,
    "fy": -467.48690645945476
  },
  {
    "id": "allison_williams",
    "name": "Allison Williams",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Lehigh",
    "relationship": "Allison Williams & Jim Merizio",
    "image": "headshots/allison_williams.jpg",
    "originallyFrom": "NJ",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Lehigh",
      "Food",
      "Gardening"
    ],
    "__indexColor": "#600008",
    "x": -377.1218157012709,
    "y": -342.04204609981474,
    "vx": 0,
    "vy": 0,
    "index": 7,
    "fx": -377.1218157012709,
    "fy": -342.04204609981474
  },
  {
    "id": "jim_merizio",
    "name": "Jim Merizio",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Other",
    "relationship": "Allison Williams & Jim Merizio",
    "image": "headshots/jim_merizio.jpg",
    "originallyFrom": "",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Beer",
      "Knicks"
    ],
    "__indexColor": "#4c0009",
    "x": -432.284812201156,
    "y": -596.9898801529047,
    "vx": 0,
    "vy": 0,
    "index": 8,
    "fx": -432.284812201156,
    "fy": -596.9898801529047
  },
  {
    "id": "andy_schmitt",
    "image": "headshots/andy_schmitt.jpg",
    "name": "Andy Schmitt",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Google",
    "relationship": "Andy & Victoria",
    "originallyFrom": "Maryland",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Beer",
      "Cocktails",
      "Hiking"
    ],
    "__indexColor": "#38000a",
    "x": -780.8709209900903,
    "y": -41.24236394381244,
    "vx": 0,
    "vy": 0,
    "index": 9,
    "fx": -780.8709209900903,
    "fy": -41.24236394381244
  },
  {
    "id": "anne_sweeney",
    "image": "headshots/anne_sweeney.jpg",
    "name": "Anne Sweeney-Hoy",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Stanford",
    "relationship": "The Hoy Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Dogs",
      "Kids"
    ],
    "__indexColor": "#24000b",
    "x": -319.5218178110466,
    "y": 654.4638798491006,
    "vx": 0,
    "vy": 0,
    "index": 10,
    "fx": -319.5218178110466,
    "fy": 654.4638798491006
  },
  {
    "id": "jon_hoy",
    "name": "Jon Hoy",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Hoy Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Cocktails",
      "Whiskey",
      "Dogs",
      "Kids"
    ],
    "__indexColor": "#10000c",
    "x": -482.34908187453414,
    "y": 857.7474561718974,
    "vx": 0,
    "vy": 0,
    "index": 11,
    "fx": -482.34908187453414,
    "fy": 857.7474561718974
  },
  {
    "id": "ashley_prichard",
    "name": "Ashley Prichard",
    "image": "headshots/ashley_prichard.jpg",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Bay FC",
    "relationship": "Ashley Prichard & Roopak Kandasamy",
    "originallyFrom": "SF Bay Area",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Bay FC",
      "Soccer",
      "Lehigh"
    ],
    "__indexColor": "#fc000d",
    "x": -266.39189976547436,
    "y": -798.6635660829977,
    "vx": 0,
    "vy": 0,
    "index": 12,
    "fx": -266.39189976547436,
    "fy": -798.6635660829977
  },
  {
    "id": "roopak_kandasamy",
    "name": "Roopak Kandasamy",
    "image": "headshots/roopak_kandasamy.jpg",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Bay FC",
    "relationship": "Ashley Prichard & Roopak Prichard",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Bay FC",
      "Soccer"
    ],
    "__indexColor": "#e8000e",
    "x": -170.1473270907994,
    "y": -1055.3883096681766,
    "vx": 0,
    "vy": 0,
    "index": 13,
    "fx": -170.1473270907994,
    "fy": -1055.3883096681766
  },
  {
    "id": "becky_spohr",
    "name": "Becky Spohr",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "",
    "originallyFrom": "",
    "currentlyLivesIn": "Chicago",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Dogs",
      "Tennis"
    ],
    "__indexColor": "#d4000f",
    "x": 570.1971761806376,
    "y": -401.34243993601353,
    "vx": 0,
    "vy": 0,
    "index": 14,
    "image": "headshots/becky_spohr.jpg",
    "fx": 570.1971761806376,
    "fy": -401.34243993601353
  },
  {
    "id": "brian_kim",
    "image": "/headshots/brian_kim.jpg",
    "name": "Brian Kim",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Kimpreston Family",
    "originallyFrom": "",
    "currentlyLivesIn": "NYC",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Bass",
      "Ska",
      "Music",
      "Tae Kwon Do"
    ],
    "__indexColor": "#c00010",
    "x": 214.463058284632,
    "y": 231.95123912960273,
    "vx": 0,
    "vy": 0,
    "index": 15,
    "fx": 214.463058284632,
    "fy": 231.95123912960273
  },
  {
    "id": "michelle_preston",
    "image": "/headshots/michelle_preston.jpg",
    "name": "Michelle Preston",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Kimpreston Family",
    "originallyFrom": "Iowa",
    "currentlyLivesIn": "NYC",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Dance",
      "Wine"
    ],
    "state": "NYC",
    "hometown": "Iowa",
    "__indexColor": "#ac0011",
    "x": 361.26846499722774,
    "y": 443.7529332025391,
    "vx": 0,
    "vy": 0,
    "index": 16,
    "fx": 361.26846499722774,
    "fy": 443.7529332025391
  },
  {
    "id": "chrissy_fiore",
    "image": "headshots/chrissy_fiore.jpg",
    "name": "Chrissy Fiore",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "OWFL Blog",
    "relationship": "Chrissy Fiore & Will Short",
    "originallyFrom": "",
    "currentlyLivesIn": "DC",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Cocktails",
      "Whiskey",
      "Dogs"
    ],
    "__indexColor": "#980012",
    "x": 897.1496423240479,
    "y": 417.2947319382907,
    "vx": 0,
    "vy": 0,
    "index": 17,
    "fx": 897.1496423240479,
    "fy": 417.2947319382907
  },
  {
    "id": "greg_goetchius",
    "image": "headshots/greg_goetchius.jpg",
    "name": "Greg Goetchius",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "Greg Goetchius & Lauren Sofia",
    "originallyFrom": "New Jersey",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Music",
      "Band",
      "Dogs",
      "Cycling",
      "Golf",
      "Wine",
      "Tennis",
      "Motorcycles",
      "Cars",
      "Motorcycling"
    ],
    "state": "SF Bay Area",
    "hometown": "New Jersey",
    "__indexColor": "#840013",
    "x": 180.9675634882773,
    "y": -648.7324292913021,
    "vx": 0,
    "vy": 0,
    "index": 18,
    "fx": 180.9675634882773,
    "fy": -648.7324292913021
  },
  {
    "id": "lauren_sofia",
    "image": "headshots/lauren_sofia.jpg",
    "name": "Lauren Sofia",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "Greg Goetchius & Lauren Sofia",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Tennis",
      "Cycling",
      "Baking",
      "Running",
      "Movies",
      "Cooking"
    ],
    "__indexColor": "#700014",
    "x": 444.0149337454044,
    "y": -662.8492815590112,
    "vx": 0,
    "vy": 0,
    "index": 19,
    "fx": 444.0149337454044,
    "fy": -662.8492815590112
  },
  {
    "id": "jesse_lindenberger_schutz",
    "name": "Jesse Lindenberger-Schutz",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "",
    "image": "headshots/jesse_lindenberger_schutz.jpg",
    "originallyFrom": "",
    "currentlyLivesIn": "NYC",
    "familyStatus": "Single",
    "hobbies": [
      "Art",
      "Gaming"
    ],
    "__indexColor": "#5c0015",
    "x": 615.5702460864665,
    "y": 1005.7784477674344,
    "vx": 0,
    "vy": 0,
    "index": 20,
    "fx": 615.5702460864665,
    "fy": 1005.7784477674344
  },
  {
    "id": "katie_conniff",
    "image": "headshots/katie_conniff.jpg",
    "name": "Katie Conniff",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "Katie Conniff & Ryan Podolak",
    "originallyFrom": "Chicago",
    "currentlyLivesIn": "Madison, WI",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Dogs",
      "Brains",
      "Darkness",
      "Cats",
      "Hiking",
      "Running",
      "Travel",
      "Wine"
    ],
    "__indexColor": "#480016",
    "x": 412.8840359155243,
    "y": -206.06501150074908,
    "vx": 0,
    "vy": 0,
    "index": 21,
    "fx": 412.8840359155243,
    "fy": -206.06501150074908
  },
  {
    "id": "ryan_podolak",
    "image": "headshots/ryan_podolak.jpg",
    "name": "Ryan Podolak",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "Katie Conniff & Ryan Podolak",
    "originallyFrom": "",
    "currentlyLivesIn": "Madison, WI",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Wine",
      "virgo",
      "Sailing"
    ],
    "__indexColor": "#340017",
    "x": 691.5890566198816,
    "y": -613.3698533705342,
    "vx": 0,
    "vy": 0,
    "index": 22,
    "fx": 691.5890566198816,
    "fy": -613.3698533705342
  },
  {
    "id": "krista_kobeski",
    "image": "/headshots/krista_kobeski.jpg",
    "name": "Krista Kobeski",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Bay FC",
    "relationship": "",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Lehigh",
      "Bay FC",
      "Soccer",
      "Wrestling"
    ],
    "__indexColor": "#200018",
    "x": -427.51309287849983,
    "y": -1112.7254374424308,
    "vx": 0,
    "vy": 0,
    "index": 23,
    "fx": -427.51309287849983,
    "fy": -1112.7254374424308
  },
  {
    "id": "leanna_habana",
    "name": "Leanna Habana",
    "type": "GUEST",
    "image": "headshots/leanna_habana.jpg",
    "side": "Matt",
    "cohort": "Stanford",
    "relationship": "The Habana Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Dogs"
    ],
    "state": "SF Bay Area",
    "__indexColor": "#0c0019",
    "x": -826.6664567425166,
    "y": 615.4841031935064,
    "vx": 0,
    "vy": 0,
    "index": 24,
    "fx": -826.6664567425166,
    "fy": 615.4841031935064
  },
  {
    "id": "liz_scott",
    "image": "headshots/liz_scott.jpg",
    "name": "Liz Scott",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "OWFL Blog",
    "relationship": "",
    "originallyFrom": "",
    "currentlyLivesIn": "Bermuda",
    "familyStatus": "Single",
    "hobbies": [
      "Travel",
      "Food"
    ],
    "__indexColor": "#f8001a",
    "x": 715.2322697234724,
    "y": 645.5846705410846,
    "vx": 0,
    "vy": 0,
    "index": 25,
    "fx": 715.2322697234724,
    "fy": 645.5846705410846
  },
  {
    "id": "marissa_lavelle",
    "image": "headshots/marissa_lavelle.jpg",
    "name": "Marissa Lavelle",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Stanford",
    "relationship": "",
    "originallyFrom": "SF Bay Area",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Music",
      "Art",
      "Travel"
    ],
    "__indexColor": "#e4001b",
    "x": -673.3978025548148,
    "y": 401.76906286101985,
    "vx": 0,
    "vy": 0,
    "index": 26,
    "fx": -673.3978025548148,
    "fy": 401.76906286101985
  },
  {
    "id": "missy_ruminski",
    "name": "Missy Ruminski",
    "type": "NON_ATTENDING",
    "isAttending": false,
    "rsvpStatus": "Declined",
    "attendanceStatus": "Not Attending",
    "side": "Matt",
    "cohort": "OWFL Blog",
    "relationship": "",
    "originallyFrom": "Upstate NY",
    "currentlyLivesIn": "Chicago",
    "familyStatus": "Single",
    "hobbies": [],
    "__indexColor": "#d0001c",
    "x": 497.01109265006187,
    "y": 105.10306421478815,
    "vx": 0,
    "vy": 0,
    "index": 27,
    "fx": 497.01109265006187,
    "fy": 105.10306421478815
  },
  {
    "id": "nichole_remmert",
    "name": "Nichole Remmert",
    "image": "headshots/nichole_remmert.jpg",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "OWFL Blog",
    "relationship": "",
    "originallyFrom": "Western PA",
    "currentlyLivesIn": "Baltimore",
    "familyStatus": "Single",
    "hobbies": [
      "Whiskey",
      "Dogs",
      "Food"
    ],
    "__indexColor": "#bc001d",
    "x": 634.2435611778393,
    "y": 405.6064342656493,
    "vx": 0,
    "vy": 0,
    "index": 28,
    "fx": 634.2435611778393,
    "fy": 405.6064342656493
  },
  {
    "id": "nishat_shaikh",
    "name": "Nishat Shaikh",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Shaikh Sisters",
    "image": "headshots/nishat_shaikh.jpg",
    "originallyFrom": "",
    "currentlyLivesIn": "Boston, MA",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Knitting",
      "Aquaria"
    ],
    "__indexColor": "#a8001e",
    "x": 216.0014314152133,
    "y": 666.8389645807296,
    "vx": 0,
    "vy": 0,
    "index": 29,
    "fx": 216.0014314152133,
    "fy": 666.8389645807296
  },
  {
    "id": "romana_rajput",
    "image": "/headshots/romana_rajput.jpg",
    "name": "Romana Rajput",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Other",
    "relationship": "Romana Rajput & Steve Nares",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Cocktails",
      "Travel"
    ],
    "__indexColor": "#94001f",
    "x": -999.7024803804328,
    "y": -464.4576589210265,
    "vx": 0,
    "vy": 0,
    "index": 30,
    "fx": -999.7024803804328,
    "fy": -464.4576589210265
  },
  {
    "id": "steve_nares",
    "image": "/headshots/steve_nares.jpg",
    "name": "Steve Nares",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Other",
    "relationship": "Romana Rajput & Steve Nares",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Chargers",
      "Beer"
    ],
    "__indexColor": "#800020",
    "x": -1227.6479469713292,
    "y": -569.2816061775659,
    "vx": 0,
    "vy": 0,
    "index": 31,
    "fx": -1227.6479469713292,
    "fy": -569.2816061775659
  },
  {
    "id": "poukhan_philavanh_anthony",
    "image": "headshots/poukhan_philavanh_anthony.jpg",
    "name": "Poukhan Philavanh Anthony",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Anthony Family",
    "originallyFrom": "Minnesota",
    "currentlyLivesIn": "Minnesota",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Dogs"
    ],
    "__indexColor": "#6c0021",
    "x": -202.6080323881056,
    "y": 941.1331442942271,
    "vx": 0,
    "vy": 0,
    "index": 32,
    "fx": -202.6080323881056,
    "fy": 941.1331442942271
  },
  {
    "id": "ryan_anthony",
    "name": "Ryan Anthony",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Anthony Family",
    "image": "headshots/ryan_anthony.jpg",
    "originallyFrom": "Minnesota",
    "currentlyLivesIn": "Minnesota",
    "familyStatus": "Family",
    "hobbies": [
      "Whiskey",
      "Kids"
    ],
    "__indexColor": "#580022",
    "x": -41.58634713495313,
    "y": 665.0077348498266,
    "vx": 0,
    "vy": 0,
    "index": 33,
    "fx": -41.58634713495313,
    "fy": 665.0077348498266
  },
  {
    "id": "tracy_armstrong",
    "image": "headshots/tracy_armstrong.jpg",
    "name": "Tracy Armstrong",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "The Armstrong Family",
    "originallyFrom": "",
    "currentlyLivesIn": "Northern CA",
    "familyStatus": "Family",
    "hobbies": [
      "Goats",
      "Kids",
      "Dogs",
      "Gardening",
      "Baking"
    ],
    "__indexColor": "#440023",
    "x": 761.6248817748217,
    "y": -235.44819042158275,
    "vx": 0,
    "vy": 0,
    "index": 34,
    "fx": 761.6248817748217,
    "fy": -235.44819042158275
  },
  {
    "id": "jenna_auer",
    "image": "headshots/jenna_auer.jpg",
    "name": "Jenna Auer",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Jenna",
    "relationship": "The Auer Family",
    "originallyFrom": "Maryland",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Outdoors",
      "Kids",
      "Dogs",
      "cheese",
      "Books",
      "Dance"
    ],
    "state": "SF Bay Area",
    "__indexColor": "#300024",
    "x": 1080.134679567512,
    "y": -912.1678823392398,
    "vx": 0,
    "vy": 0,
    "index": 35,
    "fx": 1080.134679567512,
    "fy": -912.1678823392398
  },
  {
    "id": "tim_auer",
    "image": "headshots/tim_auer.jpg",
    "name": "Tim Auer",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "The Auer Family",
    "originallyFrom": "Maryland",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Photography",
      "Dogs",
      "Outdoors",
      "Kids",
      "Swimming",
      "Woodworking",
      "Travel",
      "LandCruisers",
      "Bears",
      "RVs",
      "Camping",
      "Yellowstone",
      "Beer",
      "Grateful Dead",
      "Bluegrass"
    ],
    "state": "SF Bay Area",
    "__indexColor": "#1c0025",
    "x": 759.8326671272566,
    "y": -1038.539610997264,
    "vx": 0,
    "vy": 0,
    "index": 36,
    "fx": 759.8326671272566,
    "fy": -1038.539610997264
  },
  {
    "id": "jonathan_bibayan",
    "image": "headshots/jonathan_bibayan.jpg",
    "name": "Jonathan \"J-Bibbs\" Bibayan",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Jenna",
    "relationship": "The Bibayan-Mayott Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Green Onions",
      "Music"
    ],
    "__indexColor": "#080026",
    "x": 1212.794168677123,
    "y": -55.12041625153777,
    "vx": 0,
    "vy": 0,
    "index": 37,
    "fx": 1212.794168677123,
    "fy": -55.12041625153777
  },
  {
    "id": "lindsay_mayott",
    "name": "Lindsay Mayott",
    "type": "GUEST",
    "image": "headshots/lindsay_mayott.jpg",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "The Bibayan-Mayott Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#f40027",
    "x": 1521.7479573351968,
    "y": -44.45753821458757,
    "vx": 0,
    "vy": 0,
    "index": 38,
    "fx": 1521.7479573351968,
    "fy": -44.45753821458757
  },
  {
    "id": "jeff_domanski",
    "name": "Jeff Domanski",
    "type": "GUEST",
    "image": "headshots/jeff_domanski.jpg",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "The Domanski Family",
    "originallyFrom": "",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#e00028",
    "x": -31.75508669746481,
    "y": 221.29041226597914,
    "vx": 0,
    "vy": 0,
    "index": 39,
    "fx": -31.75508669746481,
    "fy": 221.29041226597914
  },
  {
    "id": "jill_domanski",
    "name": "Jill Domanski",
    "type": "GUEST",
    "image": "headshots/jill_domanski.jpg",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "The Domanski Family",
    "originallyFrom": "",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#cc0029",
    "x": -162.51490572236455,
    "y": 446.21569525835713,
    "vx": 0,
    "vy": 0,
    "index": 40,
    "fx": -162.51490572236455,
    "fy": 446.21569525835713
  },
  {
    "id": "dave_festa",
    "name": "Dave Festa",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Festa Family",
    "originallyFrom": "",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#b8002a",
    "x": -1254.213572659162,
    "y": 88.67006794522088,
    "vx": 0,
    "vy": 0,
    "index": 41,
    "fx": -1254.213572659162,
    "fy": 88.67006794522088
  },
  {
    "id": "erica_festa",
    "name": "Erica Festa",
    "type": "GUEST",
    "image": "headshots/erica_festa.jpg",
    "side": "Matt",
    "cohort": "Google",
    "relationship": "The Festa Family",
    "originallyFrom": "",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#a4002b",
    "x": -1021.0783171473059,
    "y": 26.843435625827052,
    "vx": 0,
    "vy": 0,
    "index": 42,
    "fx": -1021.0783171473059,
    "fy": 26.843435625827052
  },
  {
    "id": "james_freedman",
    "image": "/headshots/james_freedman.jpg",
    "name": "James Freedman",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Other",
    "relationship": "The Freedman Family",
    "originallyFrom": "Puerto Rico",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Bay FC",
      "Bad Bunny",
      "RPI Medal",
      "Hiking",
      "Rock Climbing",
      "Cooking",
      "Yellowstone",
      "Movies",
      "Knicks",
      "Travel",
      "Trivia"
    ],
    "__indexColor": "#90002c",
    "x": -984.221714014271,
    "y": -725.8835607221673,
    "vx": 0,
    "vy": 0,
    "index": 43,
    "fx": -984.221714014271,
    "fy": -725.8835607221673
  },
  {
    "id": "nur_e_freedman",
    "image": "/headshots/nur_e_freedman.jpg",
    "name": "Nur-e Rahman Freedman",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Lehigh",
    "relationship": "The Freedman Family",
    "originallyFrom": "NJ",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Whiskey",
      "Kids",
      "Bay FC",
      "Lehigh",
      "Books",
      "Bad Bunny",
      "Wine",
      "Cooking"
    ],
    "__indexColor": "#7c002d",
    "x": -708.5475527482242,
    "y": -640.2902794687375,
    "vx": 0,
    "vy": 0,
    "index": 44,
    "fx": -708.5475527482242,
    "fy": -640.2902794687375
  },
  {
    "id": "angela_govig",
    "name": "Angela Govig",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Govig Family",
    "originallyFrom": "Illinois",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "49ers",
      "Music",
      "Books",
      "Embroidery"
    ],
    "__indexColor": "#68002e",
    "x": -766.4080413452601,
    "y": -366.6908291819751,
    "vx": 0,
    "vy": 0,
    "index": 45,
    "state": "SF Bay Area",
    "fx": -766.4080413452601,
    "fy": -366.6908291819751
  },
  {
    "id": "jason_govig",
    "image": "headshots/jason_govig.jpg",
    "name": "Jason Govig",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Google",
    "relationship": "The Govig Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Whiskey",
      "Music",
      "Band",
      "Kids",
      "Outdoors"
    ],
    "__indexColor": "#54002f",
    "x": -592.6478361531329,
    "y": -199.00394331734492,
    "vx": 0,
    "vy": 0,
    "index": 46,
    "fx": -592.6478361531329,
    "fy": -199.00394331734492
  },
  {
    "id": "janaki_lahorani",
    "image": "headshots/janaki_lahorani.jpg",
    "name": "Janaki Lahorani",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Google",
    "relationship": "The Lahorani Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Cooking",
      "Hiking"
    ],
    "__indexColor": "#400030",
    "x": -1212.8150409947907,
    "y": -164.51307738222107,
    "vx": 0,
    "vy": 0,
    "index": 47,
    "fx": -1212.8150409947907,
    "fy": -164.51307738222107
  },
  {
    "id": "jason_mcmullan",
    "name": "Jason McMullan",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Lehigh",
    "relationship": "The McMullan Family",
    "image": "headshots/jason_mcmullan.jpg",
    "originallyFrom": "NY",
    "currentlyLivesIn": "Eastern PA",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Lehigh"
    ],
    "__indexColor": "#2c0031",
    "x": -112.65159412551044,
    "y": -287.65758477074394,
    "vx": 0,
    "vy": 0,
    "index": 48,
    "fx": -112.65159412551044,
    "fy": -287.65758477074394
  },
  {
    "id": "jessi_mcmullan",
    "name": "Jessi McMullan",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Lehigh",
    "relationship": "The McMullan Family",
    "image": "headshots/jessi_mcmullan.jpg",
    "originallyFrom": "Colorado",
    "currentlyLivesIn": "Eastern PA",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Lehigh",
      "Books"
    ],
    "__indexColor": "#180032",
    "x": -183.67522817105106,
    "y": -541.6459609466709,
    "vx": 0,
    "vy": 0,
    "index": 49,
    "fx": -183.67522817105106,
    "fy": -541.6459609466709
  },
  {
    "id": "alex_murillo",
    "name": "Alex Murillo",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "The Murillo-Davisson Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Whiskey",
      "Beer",
      "Gardening",
      "Kids",
      "Chargers"
    ],
    "__indexColor": "#040033",
    "x": 603.4214245415156,
    "y": -849.4786218548869,
    "vx": 0,
    "vy": 0,
    "index": 50,
    "image": "headshots/alex_murillo.jpg",
    "fx": 603.4214245415156,
    "fy": -849.4786218548869
  },
  {
    "id": "leslie_davidsson",
    "name": "Leslie Davisson",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "The Murillo-Davisson Family",
    "image": "headshots/leslie_davisson.jpg",
    "originallyFrom": "Stockton, CA",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Pottery",
      "Design",
      "Spa days"
    ],
    "__indexColor": "#f00034",
    "x": 310.72917625085864,
    "y": -883.6968369094537,
    "vx": 0,
    "vy": 0,
    "index": 51,
    "fx": 310.72917625085864,
    "fy": -883.6968369094537
  },
  {
    "id": "jess_phan",
    "image": "headshots/jess_phan.jpg",
    "name": "Jess Phan",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "The Phan-Macdonald Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Cycling"
    ],
    "__indexColor": "#dc0035",
    "x": -520.9374810112437,
    "y": -846.1556390765069,
    "vx": 0,
    "vy": 0,
    "index": 52,
    "fx": -520.9374810112437,
    "fy": -846.1556390765069
  },
  {
    "id": "mark_macdonald",
    "image": "headshots/mark_macdonald.jpg",
    "name": "Mark Macdonald",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "The Phan-Macdonald Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Cycling"
    ],
    "__indexColor": "#c80036",
    "x": -706.4632429829425,
    "y": -1018.402442736391,
    "vx": 0,
    "vy": 0,
    "index": 53,
    "fx": -706.4632429829425,
    "fy": -1018.402442736391
  },
  {
    "id": "katie_richter",
    "image": "headshots/katie_richter.jpg",
    "name": "Katie Richter",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "The Richter Family",
    "originallyFrom": "",
    "currentlyLivesIn": "DC",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#b40037",
    "x": 1181.0208026600321,
    "y": 786.0026974983361,
    "vx": 0,
    "vy": 0,
    "index": 54,
    "fx": 1181.0208026600321,
    "fy": 786.0026974983361
  },
  {
    "id": "paul_richter",
    "image": "headshots/paul_richter.jpg",
    "name": "Paul Richter",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "OWFL Blog",
    "relationship": "The Richter Family",
    "originallyFrom": "",
    "currentlyLivesIn": "DC",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Pollinators",
      "Cooking",
      "Whiskey",
      "Wine"
    ],
    "state": "DC",
    "__indexColor": "#a00038",
    "x": 956.2484413663307,
    "y": 663.2007229407734,
    "vx": 0,
    "vy": 0,
    "index": 55,
    "fx": 956.2484413663307,
    "fy": 663.2007229407734
  },
  {
    "id": "lauren_schmied",
    "name": "Lauren Schmied",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Schmied-Misra Family",
    "image": "headshots/lauren_schmied.jpg",
    "originallyFrom": "Eastern PA",
    "currentlyLivesIn": "Houston",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Embroidery"
    ],
    "__indexColor": "#8c0039",
    "x": 335.6299853359194,
    "y": 896.2958879718703,
    "vx": 0,
    "vy": 0,
    "index": 56,
    "fx": 335.6299853359194,
    "fy": 896.2958879718703
  },
  {
    "id": "tina_silva",
    "image": "headshots/tina_silva.jpg",
    "name": "Tina Silva",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "The Silva Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Dogs",
      "Kids",
      "Rockets"
    ],
    "__indexColor": "#78003a",
    "x": 489.6138623273184,
    "y": -1065.442172850309,
    "vx": 0,
    "vy": 0,
    "index": 57,
    "fx": 489.6138623273184,
    "fy": -1065.442172850309
  },
  {
    "id": "george_sun",
    "name": "George Sun",
    "image": "headshots/george_sun.jpg",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Sun Family",
    "originallyFrom": "",
    "currentlyLivesIn": "NYC",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#64003b",
    "x": 83.28059415615759,
    "y": 876.8535083401622,
    "vx": 0,
    "vy": 0,
    "index": 58,
    "fx": 83.28059415615759,
    "fy": 876.8535083401622
  },
  {
    "id": "sohyun_sun",
    "name": "Sohyun Sun",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Sun Family",
    "originallyFrom": "",
    "currentlyLivesIn": "NYC",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#50003c",
    "x": 35.3323411748118,
    "y": 1114.1919757030205,
    "vx": 0,
    "vy": 0,
    "index": 59,
    "fx": 35.3323411748118,
    "fy": 1114.1919757030205
  },
  {
    "id": "chuck_tempest",
    "name": "Chuck Tempest",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Tempest Family",
    "image": "headshots/chuck_tempest.jpg",
    "originallyFrom": "Western PA",
    "currentlyLivesIn": "Upstate NY",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Rugby"
    ],
    "__indexColor": "#3c003d",
    "x": 93.90616460950666,
    "y": 448.971342383565,
    "vx": 0,
    "vy": 0,
    "index": 60,
    "fx": 93.90616460950666,
    "fy": 448.971342383565
  },
  {
    "id": "clyde_tsai",
    "image": "headshots/clyde_tsai.jpg",
    "name": "Clyde Tsai",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Tsai-Luong Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#28003e",
    "x": -173.4689847695103,
    "y": 1231.0344110219264,
    "vx": 0,
    "vy": 0,
    "index": 61,
    "fx": -173.4689847695103,
    "fy": 1231.0344110219264
  },
  {
    "id": "ivan_vojvodic",
    "name": "Ivan Vojvodic",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Google",
    "relationship": "The Vojvodic Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Whiskey",
      "Kids",
      "Woodworking",
      "Cars"
    ],
    "state": "SF Bay Area",
    "__indexColor": "#14003f",
    "x": -565.8461058186659,
    "y": 97.29669199473541,
    "vx": 0,
    "vy": 0,
    "index": 62,
    "fx": -565.8461058186659,
    "fy": 97.29669199473541
  },
  {
    "id": "becca_winslow",
    "image": "headshots/becca_winslow.jpg",
    "name": "Becca Winslow",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Jenna",
    "relationship": "The Winslow Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#000040",
    "x": 912.8064799943256,
    "y": -12.136026984762434,
    "vx": 0,
    "vy": 0,
    "index": 63,
    "fx": 912.8064799943256,
    "fy": -12.136026984762434
  },
  {
    "id": "mary_mitchell",
    "image": "headshots/mary_mitchell.jpg",
    "name": "Mary Mitchell",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "Tim Coble & Mary Fucking Mitchell",
    "originallyFrom": "Chicago",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Whiskey",
      "Dogs",
      "Bad Bunny"
    ],
    "__indexColor": "#ec0041",
    "x": 855.9713395478643,
    "y": -806.7798947348309,
    "vx": 0,
    "vy": 0,
    "index": 64,
    "fx": 855.9713395478643,
    "fy": -806.7798947348309
  },
  {
    "id": "tim_coble",
    "image": "headshots/tim_coble.jpg",
    "name": "Tim Coble",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "Tim Coble & Mary Fucking Mitchell",
    "originallyFrom": "Florida",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Whiskey",
      "Dogs",
      "Gaming",
      "Ska",
      "Camping"
    ],
    "__indexColor": "#d80042",
    "x": 332.2855856091783,
    "y": -445.89139820483797,
    "vx": 0,
    "vy": 0,
    "index": 65,
    "fx": 332.2855856091783,
    "fy": -445.89139820483797
  },
  {
    "id": "yannick_carer",
    "name": "Yannick Carer",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Google",
    "relationship": "",
    "originallyFrom": "",
    "currentlyLivesIn": "Zurich",
    "familyStatus": "Family",
    "hobbies": [
      "Dogs",
      "Kids",
      "Cycling",
      "Photography",
      "Running",
      "Travel",
      "Skiing",
      "Outdoors"
    ],
    "__indexColor": "#c40043",
    "x": -316.1137106767087,
    "y": 170.6868790690575,
    "vx": 0,
    "vy": 0,
    "index": 66,
    "image": "headshots/yannick_carer.jpg",
    "fx": -316.1137106767087,
    "fy": 170.6868790690575
  },
  {
    "id": "chuchu_zhang",
    "image": "headshots/chuchu_zhang.jpg",
    "name": "Chuchu Zhang",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Google",
    "relationship": "",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Single",
    "hobbies": [],
    "__indexColor": "#b00044",
    "x": -379.39218695134133,
    "y": -75.4218962566126,
    "vx": 0,
    "vy": 0,
    "index": 67,
    "fx": -379.39218695134133,
    "fy": -75.4218962566126
  },
  {
    "id": "emy_habana",
    "name": "Emy Habana",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Habana Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [],
    "__indexColor": "#9c0045",
    "x": -863.029796972806,
    "y": 857.8480025976114,
    "vx": 0,
    "vy": 0,
    "index": 68,
    "fx": -863.029796972806,
    "fy": 857.8480025976114
  },
  {
    "id": "kathryn_potts",
    "image": "headshots/kathryn_potts.jpg",
    "name": "Kathryn Potts",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Stanford",
    "relationship": "Kathryn Flack & Joe Wernet",
    "originallyFrom": "Ohio",
    "currentlyLivesIn": "Amherst, MA",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Words",
      "Books",
      "cheese"
    ],
    "state": "Amherst, MA",
    "hometown": "Ohio",
    "__indexColor": "#880046",
    "x": -415.64045626752096,
    "y": 407.99498730630677,
    "vx": 0,
    "vy": 0,
    "index": 69,
    "fx": -415.64045626752096,
    "fy": 407.99498730630677
  },
  {
    "id": "joe_wernet",
    "name": "Joe Wernet",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "Kathryn Flack & Joe Wernet",
    "originallyFrom": "Ohio",
    "currentlyLivesIn": "Amherst, MA",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Cats",
      "Gaming",
      "Beer"
    ],
    "state": "Amherst, MA",
    "hometown": "Ohio",
    "__indexColor": "#740047",
    "x": -577.3116626319411,
    "y": 637.8214985180408,
    "vx": 0,
    "vy": 0,
    "index": 70,
    "fx": -577.3116626319411,
    "fy": 637.8214985180408
  },
  {
    "id": "mira_vojvodic",
    "name": "Mira Vojvodic",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Vojvodic Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#600048",
    "x": -848.4821366413412,
    "y": 204.3395365988249,
    "vx": 0,
    "vy": 0,
    "index": 71,
    "fx": -848.4821366413412,
    "fy": 204.3395365988249
  },
  {
    "id": "nadia_shaikh",
    "name": "Nadia Shaikh",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "Shaikh Sisters",
    "originallyFrom": "",
    "currentlyLivesIn": "",
    "familyStatus": "Couple / Group",
    "hobbies": [],
    "__indexColor": "#4c0049",
    "x": 474.35896460199353,
    "y": 681.1447711986966,
    "vx": 0,
    "vy": 0,
    "index": 72,
    "fx": 474.35896460199353,
    "fy": 681.1447711986966,
    "image": "headshots/nadia_shaikh.jpg"
  },
  {
    "id": "sumeet_lahorani",
    "name": "Sumeet Lahorani",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "The Lahorani Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#38004a",
    "x": -1483.4805611235583,
    "y": -180.17234906373028,
    "vx": 0,
    "vy": 0,
    "index": 73,
    "fx": -1483.4805611235583,
    "fy": -180.17234906373028
  },
  {
    "id": "victoria_shi",
    "name": "Victoria Shi",
    "type": "GUEST",
    "image": "headshots/victoria_shi.jpg",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "Andy & Victoria",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [],
    "__indexColor": "#24004b",
    "x": -959.2077617472687,
    "y": -211.3540577581715,
    "vx": 0,
    "vy": 0,
    "index": 74,
    "fx": -959.2077617472687,
    "fy": -211.3540577581715
  },
  {
    "id": "will_short",
    "name": "Will Short",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "Chrissy Fiore & Will Short",
    "originallyFrom": "",
    "currentlyLivesIn": "",
    "familyStatus": "Couple / Group",
    "hobbies": [],
    "__indexColor": "#10004c",
    "x": 1135.7967384729034,
    "y": 492.05698587215807,
    "vx": 0,
    "vy": 0,
    "index": 75,
    "fx": 1135.7967384729034,
    "fy": 492.05698587215807
  },
  {
    "id": "toyo_tsujino",
    "name": "Toyo Tsujino",
    "image": "headshots/toyo_tsujino.jpg",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "Toyo Tsujino and Danielle Sullivan",
    "originallyFrom": "",
    "currentlyLivesIn": "Southern CA",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Chargers",
      "Dogs",
      "Swimming"
    ],
    "__indexColor": "#fc004d",
    "x": 280.1634286798636,
    "y": 1146.6233979074607,
    "vx": 0,
    "vy": 0,
    "index": 76,
    "fx": 280.1634286798636,
    "fy": 1146.6233979074607
  },
  {
    "id": "danielle_sullivan",
    "image": "headshots/danielle_sullivan.jpg",
    "name": "Danielle Sullivan",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "Toyo Tsujino and Danielle Sullivan",
    "originallyFrom": "",
    "currentlyLivesIn": "Southern CA",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Dogs"
    ],
    "__indexColor": "#e8004e",
    "x": 263.3819896665601,
    "y": 1415.6406719349848,
    "vx": 0,
    "vy": 0,
    "index": 77,
    "fx": 263.3819896665601,
    "fy": 1415.6406719349848
  }
];

export const SAMPLE_LINKS = [
  {
    "source": "allison_williams",
    "target": "jim_merizio",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "andy_schmitt",
    "target": "victoria_shi",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "anne_sweeney",
    "target": "jon_hoy",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "brian_kim",
    "target": "michelle_preston",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "chrissy_fiore",
    "target": "will_short",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "greg_goetchius",
    "target": "lauren_sofia",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "katie_conniff",
    "target": "ryan_podolak",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "leanna_habana",
    "target": "emy_habana",
    "relationship": "Mother / Daughter",
    "type": "FAMILY"
  },
  {
    "source": "matt",
    "target": "maureen",
    "relationship": "Married",
    "type": "COUPLE"
  },
  {
    "source": "romana_rajput",
    "target": "steve_nares",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "poukhan_philavanh_anthony",
    "target": "ryan_anthony",
    "relationship": "Connected"
  },
  {
    "source": "cole_armstrong",
    "target": "tracy_armstrong",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "jenna_auer",
    "target": "tim_auer",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "jonathan_bibayan",
    "target": "lindsay_mayott",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "jeff_domanski",
    "target": "jill_domanski",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "dave_festa",
    "target": "erica_festa",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "nur_e_freedman",
    "target": "james_freedman",
    "relationship": "Connected"
  },
  {
    "source": "angela_govig",
    "target": "jason_govig",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "janaki_lahorani",
    "target": "sumeet_lahorani",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "jason_mcmullan",
    "target": "jessi_mcmullan",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "alex_murillo",
    "target": "leslie_davidsson",
    "relationship": "Connected"
  },
  {
    "source": "jess_phan",
    "target": "mark_macdonald",
    "relationship": "Family",
    "type": "COUPLE"
  },
  {
    "source": "katie_richter",
    "target": "paul_richter",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "george_sun",
    "target": "sohyun_sun",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "ivan_vojvodi_",
    "target": "mira_vojvodi_",
    "relationship": "Connected"
  },
  {
    "source": "mary_mitchell",
    "target": "tim_coble",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "kathryn_potts",
    "target": "joe_wernet",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "roopak_kandasamy",
    "target": "ashley_prichard",
    "relationship": "Partner",
    "type": "COUPLE"
  },
  {
    "source": "allison_williams",
    "target": "maureen",
    "relationship": "Connected"
  },
  {
    "source": "andy_schmitt",
    "target": "jason_govig",
    "relationship": "Coworkers"
  },
  {
    "source": "anne_sweeney",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "ashley_prichard",
    "target": "james_freedman",
    "relationship": "Connected"
  },
  {
    "source": "ashley_prichard",
    "target": "bay_fc",
    "relationship": "Connected"
  },
  {
    "source": "roopak_kandasamy",
    "target": "bay_fc",
    "relationship": "Connected"
  },
  {
    "source": "becky_spohr",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "brian_kim",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "chrissy_fiore",
    "target": "owfl_blog",
    "relationship": "Connected"
  },
  {
    "source": "greg_goetchius",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "katie_conniff",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "liz_scott",
    "target": "owfl_blog",
    "relationship": "Connected"
  },
  {
    "source": "marissa_lavelle",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "missy_ruminski",
    "target": "owfl_blog",
    "relationship": "Connected"
  },
  {
    "source": "missy_ruminski",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "nichole_remmert",
    "target": "owfl_blog",
    "relationship": "Connected"
  },
  {
    "source": "nishat_shaikh",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "ryan_anthony",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "cole_armstrong",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "tracy_armstrong",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "tim_auer",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "erica_festa",
    "target": "ivan_vojvodic",
    "relationship": "Coworkers"
  },
  {
    "source": "nur_e_freedman",
    "target": "jessi_mcmullan",
    "relationship": "Connected"
  },
  {
    "source": "jason_govig",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "andy_schmitt",
    "target": "janaki_lahorani",
    "relationship": "Coworkers"
  },
  {
    "source": "jason_mcmullan",
    "target": "maureen",
    "relationship": "Connected"
  },
  {
    "source": "jessi_mcmullan",
    "target": "maureen",
    "relationship": "Connected"
  },
  {
    "source": "alex_murillo",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "leslie_davidsson",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "paul_richter",
    "target": "owfl_blog",
    "relationship": "Connected"
  },
  {
    "source": "lauren_schmied",
    "target": "nishat_shaikh",
    "relationship": "Connected"
  },
  {
    "source": "tina_silva",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "george_sun",
    "target": "ryan_anthony",
    "relationship": "Connected"
  },
  {
    "source": "chuck_tempest",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "clyde_tsai",
    "target": "ryan_anthony",
    "relationship": "Connected"
  },
  {
    "source": "ivan_vojvodi_",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "tim_coble",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "yannick_carer",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "chuchu_zhang",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "kathryn_potts",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "leanna_habana",
    "target": "kathryn_potts",
    "relationship": "Connected"
  },
  {
    "source": "honk",
    "target": "matt",
    "relationship": "Connected"
  },
  {
    "source": "honk",
    "target": "maureen",
    "relationship": "Connected"
  },
  {
    "source": "honk",
    "target": "dog_park",
    "relationship": "Connected"
  },
  {
    "source": "honk",
    "target": "bay_fc",
    "relationship": "Connected"
  },
  {
    "source": "nadia_shaikh",
    "target": "nishat_shaikh",
    "relationship": "Sister",
    "type": "SIBLING"
  },
  {
    "source": "becca_winslow",
    "target": "jenna_auer",
    "relationship": ""
  },
  {
    "source": "maureen",
    "target": "jeff_domanski",
    "relationship": "Coworkers"
  },
  {
    "source": "jess_phan",
    "target": "leslie_davidsson",
    "relationship": ""
  },
  {
    "source": "clyde_tsai",
    "target": "jesse_lindenberger_schutz",
    "relationship": "Coworkers"
  },
  {
    "source": "ivan_vojvodic",
    "target": "matt",
    "relationship": "Coworkers"
  },
  {
    "source": "jonathan_bibayan",
    "target": "jenna_auer",
    "relationship": ""
  },
  {
    "source": "mira_vojvodic",
    "target": "ivan_vojvodic",
    "relationship": "Family",
    "type": "COUPLE"
  },
  {
    "source": "toyo_tsujino",
    "target": "danielle_sullivan",
    "relationship": "Connected",
    "type": "COUPLE"
  },
  {
    "source": "toyo_tsujino",
    "target": "george_sun",
    "relationship": "Connected"
  },
  {
    "source": "romana_rajput",
    "target": "nur_e_freedman",
    "relationship": "Coworkers"
  },
  {
    "source": "krista_kobeski",
    "target": "bay_fc",
    "relationship": "Connected"
  }
];

export function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
