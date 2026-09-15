export const BUILD_TIMESTAMP = 1789489668150;
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
    "x": 755.8335797634003,
    "y": -719.6257121404101,
    "vx": 0.013518025535580694,
    "vy": 0.048738452298273
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
    "x": 300.55709359618106,
    "y": -235.56506283797512,
    "vx": 0.17367709259031944,
    "vy": -0.030373194703042592
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
    "x": 786.3088350972786,
    "y": 318.17672601201326,
    "vx": 0.1687649120494742,
    "vy": -0.12829278718926182
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
    "x": -76.09325244140685,
    "y": -731.3800249298176,
    "vx": 0.20990294742094778,
    "vy": -0.2953116892207547
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
    "x": -24.150952605493,
    "y": 183.9393364649899,
    "vx": 0.09803761339505308,
    "vy": -0.024846286672236696
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
    "x": -178.10146746749086,
    "y": -372.8462274633992,
    "vx": 0.08526089248070338,
    "vy": -0.05040550556806887,
    "index": 7
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
    "x": -298.5185816357825,
    "y": -600.8559015886402,
    "vx": 0.27744020394496255,
    "vy": -0.1659476724048246,
    "index": 8
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
    "x": -845.0967619788344,
    "y": -55.877938026777244,
    "vx": 0.1273545515707895,
    "vy": -0.07536160526677549,
    "index": 9
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
    "x": -234.38292226527582,
    "y": 257.7260239321816,
    "vx": 0.08495134451295272,
    "vy": 0.03813840636076671,
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
    "x": -266.3691011102653,
    "y": 516.4310084993587,
    "vx": 0.18697478181358776,
    "vy": 0.07822334007199909,
    "index": 11
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
    "x": -335.7315184080412,
    "y": -856.71768015811,
    "vx": 0.09072854894889265,
    "vy": -0.11435369987422898,
    "index": 12
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
    "x": -403.32736729948704,
    "y": -1122.4071441890649,
    "vx": 0.010255214283811853,
    "vy": -0.10057241109215499,
    "index": 13
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
    "x": 443.268763083608,
    "y": -699.9584217057848,
    "vx": 0.0016958122404435593,
    "vy": -0.06193010494824889,
    "index": 14,
    "image": "headshots/becky_spohr.jpg"
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
    "x": 200.26719816123202,
    "y": 507.51724239445616,
    "vx": 0.3145325243834371,
    "vy": -0.21342528681793344,
    "index": 15
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
    "x": 204.55114619448918,
    "y": 765.8589216083908,
    "vx": -0.12802043948462002,
    "vy": -0.1931208328862486,
    "index": 16
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
    "x": 886.1813339551019,
    "y": 750.4896584707071,
    "vx": -0.0029112458430081835,
    "vy": 0.13808396087010624,
    "index": 17
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
    "x": 966.1615276090722,
    "y": -471.01628402768574,
    "vx": 0.05504620254034386,
    "vy": 0.0019489481764258696,
    "index": 18
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
    "x": 1073.9596124503244,
    "y": -705.931448987397,
    "vx": 0.013187715042532787,
    "vy": -0.024650415605301523,
    "index": 19
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
    "x": 953.4302878426306,
    "y": 90.09769543731436,
    "vx": 0.20375219957316912,
    "vy": -0.11382977017130744,
    "index": 20
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
      "Cats"
    ],
    "__indexColor": "#480016",
    "x": 560.0627573850716,
    "y": -188.62200355658055,
    "vx": 0.1599313677887778,
    "vy": 0.04793914983596146,
    "index": 21
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
    "x": 797.9261916485592,
    "y": -281.75542153443973,
    "vx": 0.21080895745096406,
    "vy": 0.14120325124179373,
    "index": 22
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
    "x": -104.62731252869523,
    "y": -997.6918071321106,
    "vx": -0.00902186337647125,
    "vy": -0.2745897829795728,
    "index": 23
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
    "x": -760.2987744001667,
    "y": 623.1121917496324,
    "vx": 0.1689663190534144,
    "vy": -0.040908260942991756,
    "index": 24
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
    "x": 599.5715769051052,
    "y": 818.0585409636717,
    "vx": -0.12040696793725542,
    "vy": 0.06591423433735363,
    "index": 25
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
    "x": -498.7762036712657,
    "y": 321.44451377273316,
    "vx": 0.07080346143476064,
    "vy": -0.03893193730231846,
    "index": 26
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
    "x": 487.25101441511407,
    "y": 322.84326726791323,
    "vx": 0.1635289051576883,
    "vy": 0.0019823882420264734,
    "index": 27
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
    "x": 690.3203295698974,
    "y": 579.1333218847325,
    "vx": 0.011457808503004605,
    "vy": 0.12395302710604869,
    "index": 28
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
    "x": -40.23077180568851,
    "y": 660.7799273429825,
    "vx": -0.11001338092737328,
    "vy": -0.22967156669023434,
    "index": 29
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
    "x": -1144.2268422665838,
    "y": 284.07704302274726,
    "vx": 0.2681903429982969,
    "vy": 0.36384146027251935,
    "index": 30
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
    "x": -1358.6797198284492,
    "y": 161.50550369111792,
    "vx": 0.7236480176079407,
    "vy": -0.3718993919463304,
    "index": 31
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
    "x": -305.8092331630714,
    "y": 806.6246702594194,
    "vx": 0.0750437046921919,
    "vy": 0.06352320277037994,
    "index": 32
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
    "x": -28.68286948326496,
    "y": 411.48761859141234,
    "vx": 0.26576658728427155,
    "vy": -0.17019088173178265,
    "index": 33
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
    "x": 575.7549024889189,
    "y": -450.49586580809745,
    "vx": -0.0010492349035038236,
    "vy": 0.03302220475084557,
    "index": 34
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
    "x": 981.020260577141,
    "y": -934.6497001047205,
    "vx": -0.03704674579347371,
    "vy": -0.007856980411242654,
    "index": 35
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
    "x": 686.3310090315783,
    "y": -1022.0325945053235,
    "vx": -0.1257909558053036,
    "vy": 0.08008502466434465,
    "index": 36
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
    "x": 1286.1726704621974,
    "y": -21.12826208926564,
    "vx": 0.22002558926778848,
    "vy": -0.03918152344574112,
    "index": 37
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
    "x": 1593.6513693663098,
    "y": 12.300522041880953,
    "vx": 0.21219504858071184,
    "vy": 0.03153105864480132,
    "index": 38
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
    "x": 395.87804669447644,
    "y": 13.816793393457182,
    "vx": 0.1016428816693309,
    "vy": 0.010743776702936213,
    "index": 39
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
    "x": 657.1396516597487,
    "y": 50.04810904651216,
    "vx": 0.19208770967784386,
    "vy": 0.020625519332767843,
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
    "x": -935.9459508207283,
    "y": -283.7615081131566,
    "vx": 0.3172155526703229,
    "vy": -0.16180675683650794,
    "index": 41
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
    "x": -703.3215470053807,
    "y": -347.10738576840697,
    "vx": 0.3292308852169707,
    "vy": -0.0318835846088217,
    "index": 42
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
      "Cooking"
    ],
    "__indexColor": "#90002c",
    "x": -1098.6535648929714,
    "y": -479.0186573917622,
    "vx": 0.2113204254144884,
    "vy": -0.0805952772058938,
    "index": 43
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
    "x": -832.0413434595412,
    "y": -593.3548852142068,
    "vx": 0.22861787444185747,
    "vy": 0.07893959883121295,
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
    "x": -911.1593717929221,
    "y": 186.90512155646257,
    "vx": 0.08424478524282646,
    "vy": -0.07574298261134335,
    "index": 45,
    "state": "SF Bay Area"
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
    "x": -749.607116345978,
    "y": 374.535839873419,
    "vx": 0.08441784316624006,
    "vy": -0.06083365161419808,
    "index": 46
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
    "x": -1181.7702613761137,
    "y": -226.56311846786085,
    "vx": 0.3450380952909575,
    "vy": -0.034324781736132425,
    "index": 47
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
    "x": -454.836270526607,
    "y": -401.44501880999155,
    "vx": 0.31876596145474856,
    "vy": -0.14809277801423007,
    "index": 48
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
    "x": -548.3939904793199,
    "y": -643.8470372647416,
    "vx": 0.2665399562514185,
    "vy": -0.14969304869739097,
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
    "x": 194.10242158619485,
    "y": -965.0219987615932,
    "vx": -0.16837336500001346,
    "vy": -0.17922450605769052,
    "index": 50,
    "image": "headshots/alex_murillo.jpg"
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
    "x": 65.21298434567905,
    "y": -502.5072738058696,
    "vx": 0.021001273280373677,
    "vy": -0.18458675418896814,
    "index": 51
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
    "x": -591.2530854638088,
    "y": -899.2862157335943,
    "vx": 0.15500540532018445,
    "vy": -0.13405228877360958,
    "index": 52
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
    "x": -841.9938579373672,
    "y": -925.5734524973467,
    "vx": 0.08059279223642538,
    "vy": 0.23920010550996126,
    "index": 53
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
    "x": 1162.0050534491625,
    "y": 619.4312464427092,
    "vx": 0.013114689087900273,
    "vy": -0.028415830230325675,
    "index": 54
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
    "x": 937.3206761681357,
    "y": 496.63938857725935,
    "vx": -0.030270167013257847,
    "vy": 0.05222571865185849,
    "index": 55
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
    "x": -207.77953356361076,
    "y": 1093.583639523027,
    "vx": -0.006883315724304441,
    "vy": 0.08590904296985183,
    "index": 56
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
    "x": 324.173765975801,
    "y": -490.3710678117768,
    "vx": 0.008556405621727648,
    "vy": -0.05539300938199796,
    "index": 57
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
    "x": -13.692797213049463,
    "y": 906.6822118711298,
    "vx": -0.170146205914353,
    "vy": -0.2318723240104924,
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
    "x": 40.36337953412417,
    "y": 1141.571020117298,
    "vx": 0.08139662181622652,
    "vy": -0.2909551158891208,
    "index": 59
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
    "x": 174.36123159623125,
    "y": 258.1013558242334,
    "vx": 0.24868127689772201,
    "vy": -0.23774068859256609,
    "index": 60
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
    "x": 45.28235543480013,
    "y": -245.50297712263142,
    "vx": 0.188929153635969,
    "vy": -0.18704243929467723,
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
    "x": -423.010864907215,
    "y": 75.31463943391776,
    "vx": 0.13198117108001178,
    "vy": -0.011674624167461468,
    "index": 62
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
    "x": 1045.3134412067595,
    "y": -207.3894970621435,
    "vx": 0.30163682899802025,
    "vy": -0.1589024869470355,
    "index": 63
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
    "x": 450.18529916005383,
    "y": -951.4141205833015,
    "vx": -0.18043133653202717,
    "vy": -0.07155074517570308,
    "index": 64
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
    "x": 199.75859640316352,
    "y": -720.8067976832554,
    "vx": 0.021299077424737214,
    "vy": -0.18327722588168693,
    "index": 65
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
      "Photography"
    ],
    "__indexColor": "#c40043",
    "x": -346.0790406578724,
    "y": -171.08015783999232,
    "vx": 0.11281688222359543,
    "vy": -0.0359190142670356,
    "index": 66,
    "image": "headshots/yannick_carer.jpg"
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
    "x": -670.284922454637,
    "y": 123.98959882405086,
    "vx": 0.10502803974743469,
    "vy": -0.043220206465680165,
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
    "x": -912.0133238477441,
    "y": 819.9864275888025,
    "vx": 0.17922841307981238,
    "vy": -0.041199096649908236,
    "index": 68
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
    "x": -506.5159553472381,
    "y": 580.4852513380523,
    "vx": 0.15184816085763825,
    "vy": -0.009034388789860494,
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
    "x": -599.3878233459161,
    "y": 813.4476663897487,
    "vx": 0.12437478782368978,
    "vy": -0.0026216657846292596,
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
    "x": -600.1615829401709,
    "y": -121.30093622138726,
    "vx": 0.1241130532092126,
    "vy": 0.010822444561287094,
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
    "x": 432.60476859502756,
    "y": 635.3751541780588,
    "vx": -0.022076208410456447,
    "vy": -0.030395411206390794,
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
    "x": -1439.974006412729,
    "y": -142.86603285672496,
    "vx": 0.4345155336951033,
    "vy": 0.254959406614017,
    "index": 73
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
    "x": -1094.412432660887,
    "y": 18.168456324636953,
    "vx": -0.15083853538481887,
    "vy": 0.1246840497946321,
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
    "x": 1107.2449338369304,
    "y": 863.4401851255384,
    "vx": 0.07055894921289792,
    "vy": -0.011290710108445663,
    "index": 75
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
    "x": 257.82137273297957,
    "y": 1025.0138231415037,
    "vx": 0.12350232065208769,
    "vy": -0.2520863759687788,
    "index": 76
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
    "x": 256.8821692647786,
    "y": 1294.526332982613,
    "vx": 0.05368182914329146,
    "vy": -0.25032547360524204,
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
