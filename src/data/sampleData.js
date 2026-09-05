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
      "Books"
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
    "x": 953.8709242359424,
    "y": -845.6729242835733,
    "vx": -0.12816360228111312,
    "vy": 0.26854074499486896
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
    "x": 415.31917722415267,
    "y": -196.75810607600704,
    "vx": -0.1842485215587835,
    "vy": 0.2190724391785533
  },
  {
    "id": "owfl_blog",
    "name": "OWFL Blog",
    "type": "CONTEXT_HUB",
    "cohort": "OWFL Blog",
    "side": "Joint",
    "relationship": "OWFL Blog",
    "originallyFrom": "DC",
    "currentlyLivesIn": "DC",
    "familyStatus": "Hub",
    "hobbies": [
      "Food"
    ],
    "__indexColor": "#9c0005",
    "index": 4,
    "x": 555.6839197142945,
    "y": 274.8326251852298,
    "vx": 0.01820943712020816,
    "vy": -0.05786406075654543
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
    "x": 24.742172912484072,
    "y": -519.2865420296228,
    "vx": 0.26825852741471967,
    "vy": 0.03736838763933361
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
    "x": 529.9846362301925,
    "y": 1.0934140693937378,
    "vx": 0.17823998348448278,
    "vy": -0.013617075003784751
  },
  {
    "id": "allison_williams",
    "name": "Allison Williams",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Lehigh",
    "relationship": "Allison Williams & Jim Merizio",
    "originallyFrom": "NJ",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Lehigh",
      "Food",
      "Gardening"
    ],
    "__indexColor": "#600008",
    "x": -85.30839736326749,
    "y": -271.72863664996646,
    "vx": -0.1080512079795056,
    "vy": -0.14181608060037734,
    "index": 7
  },
  {
    "id": "jim_merizio",
    "name": "Jim Merizio",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Other",
    "relationship": "Allison Williams & Jim Merizio",
    "originallyFrom": "",
    "currentlyLivesIn": "NJ",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Beer",
      "Knicks"
    ],
    "__indexColor": "#4c0009",
    "x": -231.0165375281375,
    "y": -544.0142262511255,
    "vx": 0.2664337977863217,
    "vy": -0.3177963520931879,
    "index": 8
  },
  {
    "id": "andy_schmitt",
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
    "x": -798.7733756700673,
    "y": 7.868082184729715,
    "vx": -0.01635882371674555,
    "vy": -0.021398603503122532,
    "index": 9
  },
  {
    "id": "anne_sweeney",
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
    "x": -399.0034373700851,
    "y": 339.63016498109005,
    "vx": 0.0239040484065084,
    "vy": -0.07081292137133172,
    "index": 10
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
    "x": -467.0853281085908,
    "y": 585.0344159979238,
    "vx": 0.005876820990039087,
    "vy": -0.0691968832354366,
    "index": 11
  },
  {
    "id": "ashley_prichard",
    "name": "Ashley Prichard",
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
    "x": -0.16517968689584722,
    "y": -1056.7336495296747,
    "vx": 0.28302202817426464,
    "vy": 0.181386304019939,
    "index": 12
  },
  {
    "id": "roopak_kandasamy",
    "name": "Roopak Kandasamy",
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
    "x": -37.19793591336064,
    "y": -786.2146018414654,
    "vx": -0.045380081858104195,
    "vy": 0.1337349654132399,
    "index": 13
  },
  {
    "id": "becky_spohr",
    "name": "Becky Spohr",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "Becky Spohr",
    "originallyFrom": "",
    "currentlyLivesIn": "Chicago",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Dogs",
      "Tennis"
    ],
    "__indexColor": "#d4000f",
    "x": 474.42891602836426,
    "y": -647.7976043884898,
    "vx": 0.007804640503336421,
    "vy": 0.1981676979706353,
    "index": 14
  },
  {
    "id": "brian_kim",
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
    "x": 119.21674811457463,
    "y": 241.77008043873434,
    "vx": 0.05700919887155009,
    "vy": -0.06482754463596953,
    "index": 15
  },
  {
    "id": "michelle_preston",
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
    "x": 37.340437298886535,
    "y": 489.0814279958168,
    "vx": -0.00866899237262871,
    "vy": -0.08612385858869202,
    "index": 16
  },
  {
    "id": "chrissy_fiore",
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
    "x": 694.7784368754216,
    "y": 713.60448362699,
    "vx": 0.03725431916264411,
    "vy": -0.07162951841739774,
    "index": 17
  },
  {
    "id": "greg_goetchius",
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
    "x": 341.2080695355507,
    "y": -941.7977531070333,
    "vx": 0.11580525265516824,
    "vy": -0.16345661308659878,
    "index": 18
  },
  {
    "id": "lauren_sofia",
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
      "Baking"
    ],
    "__indexColor": "#700014",
    "x": 495.61452778906096,
    "y": -1148.6650382730943,
    "vx": 0.06671133444819331,
    "vy": -0.20413060579400258,
    "index": 19
  },
  {
    "id": "jesse_lindenberger_schutz",
    "name": "Jesse Lindenberger-Schutz",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "Friends",
    "originallyFrom": "",
    "currentlyLivesIn": "NYC",
    "familyStatus": "Single",
    "hobbies": [
      "Art",
      "Gaming"
    ],
    "__indexColor": "#5c0015",
    "x": -301.0483878263224,
    "y": 1062.075771568238,
    "vx": -0.12704040201410227,
    "vy": 0.07425043393258461,
    "index": 20
  },
  {
    "id": "katie_conniff",
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
      "Cats"
    ],
    "__indexColor": "#480016",
    "x": 602.2799733973173,
    "y": -860.6540217251899,
    "vx": -0.0436279500085675,
    "vy": 0.1670459485468819,
    "index": 21
  },
  {
    "id": "ryan_podolak",
    "name": "Ryan Podolak",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Other",
    "relationship": "Katie Conniff & Ryan Podolak",
    "originallyFrom": "",
    "currentlyLivesIn": "Madison, WI",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Wine"
    ],
    "__indexColor": "#340017",
    "x": 737.2433999690802,
    "y": -1078.23232024571,
    "vx": -0.03330137491771969,
    "vy": 0.173234130444358,
    "index": 22
  },
  {
    "id": "krista_kobeski",
    "name": "Krista Kobeski",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Bay FC",
    "relationship": "Krista Kobeski & Guest",
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
    "x": -197.3626522968772,
    "y": -1237.820947301754,
    "vx": 0.35457885044431503,
    "vy": 0.1266176833147635,
    "index": 23
  },
  {
    "id": "leanna_habana",
    "name": "Leanna Habana",
    "type": "GUEST",
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
    "x": -494.3824690410594,
    "y": 829.640061736646,
    "vx": 0.029868396074989853,
    "vy": -0.06879090919130683,
    "index": 24
  },
  {
    "id": "liz_scott",
    "name": "Liz Scott",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "OWFL Blog",
    "relationship": "OWFL Blog",
    "originallyFrom": "",
    "currentlyLivesIn": "Bermuda",
    "familyStatus": "Single",
    "hobbies": [
      "Travel",
      "Food"
    ],
    "__indexColor": "#f8001a",
    "x": 687.4275870410771,
    "y": 462.9642123443804,
    "vx": 0.11639903589455886,
    "vy": -0.08655590499793248,
    "index": 25
  },
  {
    "id": "marissa_lavelle",
    "name": "Marissa Lavelle",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Stanford",
    "relationship": "Marissa Lavelle",
    "originallyFrom": "SF Bay Area",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Music",
      "Art",
      "Travel"
    ],
    "__indexColor": "#e4001b",
    "x": -135.74370991400642,
    "y": 274.3213736464962,
    "vx": 0.03725262803086735,
    "vy": -0.1190524157699822,
    "index": 26
  },
  {
    "id": "missy_ruminski",
    "name": "Missy Ruminski",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "OWFL Blog",
    "relationship": "OWFL Blog",
    "originallyFrom": "Upstate NY",
    "currentlyLivesIn": "Chicago",
    "familyStatus": "Single",
    "hobbies": [],
    "__indexColor": "#d0001c",
    "x": 352.14894811602,
    "y": 142.23022815380142,
    "vx": 0.04865142241212667,
    "vy": -0.17019460809885717,
    "index": 27
  },
  {
    "id": "nichole_remmert",
    "name": "Nichole Remmert",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "OWFL Blog",
    "relationship": "OWFL Blog",
    "originallyFrom": "Western PA",
    "currentlyLivesIn": "Baltimore",
    "familyStatus": "Single",
    "hobbies": [
      "Whiskey",
      "Dogs",
      "Food"
    ],
    "__indexColor": "#bc001d",
    "x": 892.9094704067236,
    "y": 309.330198592558,
    "vx": 0.18909072852962278,
    "vy": -0.008115620649536715,
    "index": 28
  },
  {
    "id": "nishat_shaikh",
    "name": "Nishat Shaikh",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Shaikh Sisters",
    "originallyFrom": "",
    "currentlyLivesIn": "Boston, MA",
    "familyStatus": "Couple / Group",
    "hobbies": [
      "Knitting",
      "Aquaria"
    ],
    "__indexColor": "#a8001e",
    "x": 310.04144307928783,
    "y": 399.46120886015666,
    "vx": 0.14175888456440977,
    "vy": -0.17253272545824028,
    "index": 29
  },
  {
    "id": "romana_rajput",
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
    "x": -897.7977022174365,
    "y": -464.42629921291206,
    "vx": 0.10301001096676911,
    "vy": -0.18048005081763524,
    "index": 30
  },
  {
    "id": "steve_nares",
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
    "x": -1123.0502430538897,
    "y": -575.4287121521346,
    "vx": 0.05279070250885692,
    "vy": -0.08010172305591863,
    "index": 31
  },
  {
    "id": "poukhan_philavanh_anthony",
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
    "x": 439.2454521927953,
    "y": 873.8084025304712,
    "vx": -0.016495304708723305,
    "vy": -0.12245579534330377,
    "index": 32
  },
  {
    "id": "ryan_anthony",
    "name": "Ryan Anthony",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Anthony Family",
    "originallyFrom": "Minnesota",
    "currentlyLivesIn": "Minnesota",
    "familyStatus": "Family",
    "hobbies": [
      "Whiskey",
      "Kids"
    ],
    "__indexColor": "#580022",
    "x": 244.05034316756428,
    "y": 642.9920444188771,
    "vx": 0.07392342396312938,
    "vy": -0.20322048248659447,
    "index": 33
  },
  {
    "id": "tracy_armstrong",
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
    "x": 727.191378380139,
    "y": -614.7519342509265,
    "vx": 0.005713688868133279,
    "vy": 0.40160254217699554,
    "index": 34
  },
  {
    "id": "jenna_auer",
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
    "x": 1002.3278192531841,
    "y": -537.9482908713256,
    "vx": -0.21721896490572723,
    "vy": 0.3139315884857784,
    "index": 35
  },
  {
    "id": "tim_auer",
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
    "x": 175.2996371624715,
    "y": -273.7538745871676,
    "vx": -0.10612740016354395,
    "vy": 0.09964961904657463,
    "index": 36
  },
  {
    "id": "jonathan_bibayan",
    "name": "Jonathan Bibayan",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Jenna",
    "relationship": "The Bibayan-Mayott Family",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Family",
    "hobbies": [
      "Kids"
    ],
    "__indexColor": "#080026",
    "x": 1215.0495009347562,
    "y": 23.33144451055068,
    "vx": 0.053935736790566846,
    "vy": 0.12568836445066492,
    "index": 37
  },
  {
    "id": "lindsay_mayott",
    "name": "Lindsay Mayott",
    "type": "GUEST",
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
    "x": 1487.0049513290608,
    "y": 41.052937823555226,
    "vx": 0.0539811094589719,
    "vy": 0.1275958687013043,
    "index": 38
  },
  {
    "id": "jeff_domanski",
    "name": "Jeff Domanski",
    "type": "GUEST",
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
    "x": -651.7576309622395,
    "y": 422.1527257513174,
    "vx": 0.00587794066608763,
    "vy": -0.04667815347744262,
    "index": 39
  },
  {
    "id": "jill_domanski",
    "name": "Jill Domanski",
    "type": "GUEST",
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
    "x": -897.4816611574468,
    "y": 508.76483373895996,
    "vx": 0.009187020741926078,
    "vy": -0.038347475128759204,
    "index": 40
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
    "x": -1258.065441482674,
    "y": -6.300599237728354,
    "vx": 0.07604976764274805,
    "vy": -0.2757977769609336,
    "index": 41
  },
  {
    "id": "erica_festa",
    "name": "Erica Festa",
    "type": "GUEST",
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
    "x": -1031.5774814703068,
    "y": 80.62962340436755,
    "vx": -0.03153617556351631,
    "vy": -0.010016359297749081,
    "index": 42
  },
  {
    "id": "james_freedman",
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
      "Cooking"
    ],
    "__indexColor": "#90002c",
    "x": -859.314467952168,
    "y": -724.3298270161666,
    "vx": 0.12291890958403169,
    "vy": -0.10522240283173498,
    "index": 43
  },
  {
    "id": "nur_e_freedman",
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
      "Wine"
    ],
    "__indexColor": "#7c002d",
    "x": -568.2462444581323,
    "y": -834.0087501178427,
    "vx": -0.08267964754357075,
    "vy": -0.1596526476499858,
    "index": 44
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
    "x": -678.9797229317716,
    "y": -299.1979548722635,
    "vx": 0.3243526322361128,
    "vy": -0.15047124023031191,
    "index": 45,
    "state": "SF Bay Area"
  },
  {
    "id": "jason_govig",
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
    "x": -567.9286839186132,
    "y": -79.91187311216692,
    "vx": -0.046797984055613896,
    "vy": -0.003966784118963437,
    "index": 46
  },
  {
    "id": "janaki_lahorani",
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
    "x": -1167.8003151827136,
    "y": -247.59920614322795,
    "vx": 0.3066839150256572,
    "vy": -0.18874890399486247,
    "index": 47
  },
  {
    "id": "jason_mcmullan",
    "name": "Jason McMullan",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Lehigh",
    "relationship": "The McMullan Family",
    "originallyFrom": "NY",
    "currentlyLivesIn": "Eastern PA",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Lehigh"
    ],
    "__indexColor": "#2c0031",
    "x": -653.1173783439809,
    "y": -556.7646122578917,
    "vx": 0.1188273769299273,
    "vy": -0.07840484151335089,
    "index": 48
  },
  {
    "id": "jessi_mcmullan",
    "name": "Jessi McMullan",
    "type": "GUEST",
    "side": "Maureen",
    "cohort": "Lehigh",
    "relationship": "The McMullan Family",
    "originallyFrom": "Colorado",
    "currentlyLivesIn": "Eastern PA",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Lehigh",
      "Books"
    ],
    "__indexColor": "#180032",
    "x": -442.4456246119483,
    "y": -403.30318641767474,
    "vx": 0.2794361649930231,
    "vy": -0.26534815299938924,
    "index": 49
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
    "x": 566.8925115799186,
    "y": -408.60210380975946,
    "vx": -0.1503521831939277,
    "vy": 0.279076427498205,
    "index": 50
  },
  {
    "id": "leslie_davidsson",
    "name": "Leslie Davisson",
    "type": "GUEST",
    "side": "Joint",
    "cohort": "Dog Park",
    "relationship": "The Murillo-Davisson Family",
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
    "x": 222.90091456096292,
    "y": -703.2218997039375,
    "vx": 0.07287325263768567,
    "vy": -0.1861425376869004,
    "index": 51
  },
  {
    "id": "jess_phan",
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
    "x": -298.1976602827892,
    "y": -780.5281516820776,
    "vx": -0.0595532540559782,
    "vy": -0.2377825018975654,
    "index": 52
  },
  {
    "id": "mark_macdonald",
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
    "x": -349.68817038094403,
    "y": -1029.45219161667,
    "vx": -0.1505506356256325,
    "vy": -0.21677467483840282,
    "index": 53
  },
  {
    "id": "katie_richter",
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
    "x": 1102.7710671677412,
    "y": 733.6865585399308,
    "vx": -0.031086040517297745,
    "vy": 0.12565144900414732,
    "index": 54
  },
  {
    "id": "paul_richter",
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
    "x": 906.2420209198037,
    "y": 569.9095543741196,
    "vx": 0.08020074715993351,
    "vy": -0.008746299932115245,
    "index": 55
  },
  {
    "id": "lauren_schmied",
    "name": "Lauren Schmied",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Schmied-Misra Family",
    "originallyFrom": "Eastern PA",
    "currentlyLivesIn": "Houston",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Embroidery"
    ],
    "__indexColor": "#8c0039",
    "x": -78.1132954803332,
    "y": 758.3534366695523,
    "vx": -0.2403426849893671,
    "vy": 0.1533212207809543,
    "index": 56
  },
  {
    "id": "tina_silva",
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
    "x": 325.9459982507092,
    "y": -460.24370270717,
    "vx": -0.12838166784837546,
    "vy": 0.0847519031246575,
    "index": 57
  },
  {
    "id": "george_sun",
    "name": "George Sun",
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
    "x": 147.72160804912846,
    "y": 864.6947243364198,
    "vx": -0.028181517497830932,
    "vy": -0.2633960657455924,
    "index": 58
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
    "x": 240.39452601353108,
    "y": 1089.922377046238,
    "vx": -0.1315185346844607,
    "vy": -0.22011703764776375,
    "index": 59
  },
  {
    "id": "chuck_tempest",
    "name": "Chuck Tempest",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Cornell",
    "relationship": "The Tempest Family",
    "originallyFrom": "Western PA",
    "currentlyLivesIn": "Upstate NY",
    "familyStatus": "Family",
    "hobbies": [
      "Kids",
      "Rugby"
    ],
    "__indexColor": "#3c003d",
    "x": -226.08377791505302,
    "y": 540.2114771000104,
    "vx": 0.005736745162986409,
    "vy": -0.03520166721155019,
    "index": 60
  },
  {
    "id": "clyde_tsai",
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
    "x": 482.52305484109706,
    "y": 584.2484450129309,
    "vx": 0.09088764874054191,
    "vy": -0.11307944536657043,
    "index": 61
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
    "x": -608.7607673455435,
    "y": 170.69289329681294,
    "vx": -0.00003817112268841572,
    "vy": -0.058284482536618214,
    "index": 62
  },
  {
    "id": "becca_winslow",
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
    "x": 951.8840275511428,
    "y": -16.335450135635153,
    "vx": 0.08048533538465752,
    "vy": -0.052546619452113696,
    "index": 63
  },
  {
    "id": "mary_mitchell",
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
    "x": 681.7633449704852,
    "y": -174.03865673421183,
    "vx": -0.17762289855850225,
    "vy": 0.3993394789428033,
    "index": 64
  },
  {
    "id": "tim_coble",
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
      "Ska"
    ],
    "__indexColor": "#d80042",
    "x": 823.2598429361572,
    "y": -376.6031943436506,
    "vx": -0.09233500011508498,
    "vy": 0.45324242120062763,
    "index": 65
  },
  {
    "id": "yannick_carer",
    "name": "Yannick Carer",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Google",
    "relationship": "Yannick Carer & Guest",
    "originallyFrom": "",
    "currentlyLivesIn": "Zurich",
    "familyStatus": "Family",
    "hobbies": [
      "Dogs",
      "Kids",
      "Cycling",
      "Photography"
    ],
    "__indexColor": "#c40043",
    "x": -331.61665345271257,
    "y": -171.5912721113692,
    "vx": -0.08846539442463065,
    "vy": -0.09167889757672,
    "index": 66
  },
  {
    "id": "chuchu_zhang",
    "name": "Chuchu Zhang",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Google",
    "relationship": "Google",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Single",
    "hobbies": [],
    "__indexColor": "#b00044",
    "x": -373.651927156485,
    "y": 81.73664941565293,
    "vx": 0.0075251949206088615,
    "vy": -0.0786304203197494,
    "index": 67
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
    "x": -664.3694500694128,
    "y": 1013.7612813153933,
    "vx": -0.03214286212778243,
    "vy": -0.12942658553136663,
    "index": 68
  },
  {
    "id": "kathryn_potts",
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
    "x": -697.6401701516545,
    "y": 672.5180948944214,
    "vx": 0.021149306367565266,
    "vy": -0.055798024700339705,
    "index": 69
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
    "x": -855.6937278973113,
    "y": 867.179595504353,
    "vx": -0.048306530450672625,
    "vy": -0.11044173222944353,
    "index": 70
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
    "x": -850.9345049743423,
    "y": 255.84092599056075,
    "vx": -0.0013556551153100724,
    "vy": -0.041639007401285795,
    "index": 71
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
    "x": 723.2278950127294,
    "y": 107.57313046173704,
    "vx": 0.1410761739981178,
    "vy": 0.03493070542509306,
    "index": 72
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
    "x": -1434.0428929085253,
    "y": -204.377524304388,
    "vx": 0.35533321145516455,
    "vy": 0.09013285065645806,
    "index": 73
  },
  {
    "id": "victoria_shi",
    "name": "Victoria Shi",
    "type": "GUEST",
    "side": "Matt",
    "cohort": "Other",
    "relationship": "Andy & Victoria",
    "originallyFrom": "",
    "currentlyLivesIn": "SF Bay Area",
    "familyStatus": "Couple / Group",
    "hobbies": [],
    "__indexColor": "#24004b",
    "x": -911.4110413787479,
    "y": -208.53186299921316,
    "vx": 0.30909288280176306,
    "vy": -0.18194521428173496,
    "index": 74
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
    "x": 890.7724676594869,
    "y": 867.8307287033861,
    "vx": -0.07443275077932376,
    "vy": 0.06823097738591329,
    "index": 75
  },
  {
    "id": "toyo_tsujino",
    "name": "Toyo Tsujino",
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
    "x": -4.423316829278939,
    "y": 1058.3188503570923,
    "vx": -0.12070579072104352,
    "vy": -0.33548260693310084,
    "index": 76
  },
  {
    "id": "danielle_sullivan",
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
    "x": 50.81723819498134,
    "y": 1322.170140692382,
    "vx": -0.05607834309861666,
    "vy": -0.3508919765616145,
    "index": 77
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
    "relationship": "Friends"
  },
  {
    "source": "maureen",
    "target": "jeff_domanski",
    "relationship": "Coworkers"
  },
  {
    "source": "jess_phan",
    "target": "leslie_davidsson",
    "relationship": "Friends"
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
    "relationship": "Friends"
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
