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
    "image": "/headshots/matt_hoying.jpg",
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
    "x": 527.5817422995382,
    "y": -651.8500462894627,
    "vx": 7.318942215850077,
    "vy": -2.5234615154099806
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
    "x": 264.9511523371304,
    "y": -253.5177194110599,
    "vx": 8.378437776245073,
    "vy": -0.36100097982468843
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
    "x": 548.7903954484843,
    "y": 443.82667757936514,
    "vx": -5.9540711297826965,
    "vy": -10.877280184849596
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
    "x": -106.66113412461286,
    "y": -613.1626294456722,
    "vx": 2.51461408178474,
    "vy": -7.217963925201531
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
    "x": -107.78354540590853,
    "y": 193.61142566214215,
    "vx": 2.526759018668859,
    "vy": 4.983665943809125
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
    "x": -105.21610923334224,
    "y": -204.18007389123838,
    "vx": 2.661987038119516,
    "vy": -4.372121153200708,
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
    "x": -207.27931096659574,
    "y": -361.4612118442421,
    "vx": 4.7361365179629615,
    "vy": -2.3775554706430815,
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
    "x": -649.8333619459929,
    "y": -105.83188839402965,
    "vx": 5.396357709852722,
    "vy": -6.563492353977094,
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
    "x": -250.06991550574983,
    "y": 256.277672950567,
    "vx": 1.8079229130142853,
    "vy": 1.9749609854954302,
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
    "x": -368.25006336828477,
    "y": 395.8122533832223,
    "vx": 4.719318509414744,
    "vy": 1.0686462135725379,
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
    "x": -230.89424456970238,
    "y": -803.6560594611377,
    "vx": 3.973573027045572,
    "vy": -3.75945172563198,
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
    "x": -274.08036770779637,
    "y": -958.497013308529,
    "vx": 4.0545761256339885,
    "vy": -5.623705658054866,
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
    "x": 308.40685687295934,
    "y": -512.2211223240878,
    "vx": -0.964482565567061,
    "vy": 3.629230338617555,
    "index": 14,
    "image": "headshots/becky_spohr.jpg"
  },
  {
    "id": "brian_kim",
    "name": "Brian Kim",
    "type": "GUEST",
    "image": "/headshots/brian_kim.jpg",
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
    "x": 75.8917785072688,
    "y": 565.8506520723525,
    "vx": 1.3527422835267482,
    "vy": -8.965425583507187,
    "index": 15
  },
  {
    "id": "michelle_preston",
    "name": "Michelle Preston",
    "type": "GUEST",
    "image": "/headshots/michelle_preston.jpg",
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
    "x": 111.82812802272107,
    "y": 749.4537689918358,
    "vx": 2.964649585969986,
    "vy": -7.8344257684315926,
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
    "x": 624.8844360631625,
    "y": 406.13831226682316,
    "vx": 2.1273975817721613,
    "vy": -6.035432312793916,
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
    "x": 433.61186314850426,
    "y": -596.0919955655565,
    "vx": 3.0013036793551917,
    "vy": -0.2679627947970369,
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
      "Baking"
    ],
    "__indexColor": "#700014",
    "x": 666.6362809046658,
    "y": -851.3699254935003,
    "vx": 6.44364900200735,
    "vy": -3.5950127160179246,
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
    "x": 1047.5505016428285,
    "y": 451.380581561997,
    "vx": 5.841661068833292,
    "vy": -4.485707826392464,
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
    "x": 509.35084300567553,
    "y": -789.4093060437294,
    "vx": 4.019281211849977,
    "vy": -2.3805830667186565,
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
      "Wine"
    ],
    "__indexColor": "#340017",
    "x": 630.6169521432525,
    "y": -930.7157662767956,
    "vx": 4.961932259120426,
    "vy": -3.6590514137759556,
    "index": 22
  },
  {
    "id": "krista_kobeski",
    "name": "Krista Kobeski",
    "type": "GUEST",
    "image": "/headshots/krista_kobeski.jpg",
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
    "x": -156.6989239846665,
    "y": -861.4868999492669,
    "vx": 5.4630764147981825,
    "vy": -4.766181834380211,
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
    "x": -510.19187905639876,
    "y": 557.8363249686473,
    "vx": 4.545576764910695,
    "vy": -0.2943188380408899,
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
    "x": 767.113027995378,
    "y": 414.8882094648291,
    "vx": 6.255970628630803,
    "vy": -1.6825408901570045,
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
    "x": -404.9064919638331,
    "y": 356.3477949263513,
    "vx": -0.46485914583478066,
    "vy": 5.324989923411228,
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
    "x": 380.7904165016512,
    "y": 208.3654320226244,
    "vx": 4.611340642814616,
    "vy": 3.339124877942293,
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
    "x": 683.7257124499805,
    "y": 615.8105708491578,
    "vx": 5.804282921584773,
    "vy": -2.908893112337444,
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
    "x": 44.95757886288059,
    "y": 250.0213717353003,
    "vx": 3.5661074929081873,
    "vy": -8.704522559116596,
    "index": 29
  },
  {
    "id": "romana_rajput",
    "name": "Romana Rajput",
    "type": "GUEST",
    "image": "/headshots/romana_rajput.jpg",
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
    "x": -1211.2125290027398,
    "y": -190.15014667866367,
    "vx": -0.49683475844830405,
    "vy": -8.196054859206942,
    "index": 30
  },
  {
    "id": "steve_nares",
    "name": "Steve Nares",
    "type": "GUEST",
    "image": "/headshots/steve_nares.jpg",
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
    "x": -1375.2329003671284,
    "y": -187.7869573835674,
    "vx": -2.199707834545017,
    "vy": -7.953167729001613,
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
    "x": 413.84497025880387,
    "y": 538.3726539890837,
    "vx": -3.074844552158859,
    "vy": 7.076242205840431,
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
    "x": 66.57461740747198,
    "y": 429.4130366394428,
    "vx": 6.325445555139767,
    "vy": -5.302943306042472,
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
    "x": 352.2811037146681,
    "y": -438.20516075711083,
    "vx": 6.740345818560428,
    "vy": -1.777827323266726,
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
    "x": 647.0941765013312,
    "y": -377.01475268226716,
    "vx": 4.090294970033263,
    "vy": 3.298468401934665,
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
    "x": 248.62827407140668,
    "y": -373.55068878186336,
    "vx": 1.4121601541688253,
    "vy": 7.014161734222929,
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
    "x": 1050.8350531167994,
    "y": -6.153849793415221,
    "vx": 5.178657046973227,
    "vy": -0.042828755069766584,
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
    "x": 1305.0673807098185,
    "y": 3.8741642048727356,
    "vx": 6.097752831337585,
    "vy": 0.582130349287539,
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
    "x": -307.9825418593431,
    "y": 638.3180122611116,
    "vx": 1.1477777938472427,
    "vy": 10.263466119204601,
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
    "x": -401.5246776362076,
    "y": 810.1518593134772,
    "vx": 0.026524979216844005,
    "vy": 11.72596126730696,
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
    "x": -965.4252343679128,
    "y": -173.987316081641,
    "vx": -0.6320479700110788,
    "vy": -2.3232192557525857,
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
    "x": -776.2233695440152,
    "y": -155.45435190364356,
    "vx": 1.221911239099182,
    "vy": -2.5184959308625596,
    "index": 42
  },
  {
    "id": "james_freedman",
    "name": "James Freedman",
    "type": "GUEST",
    "image": "/headshots/james_freedman.jpg",
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
    "x": -988.9068398781136,
    "y": -396.97143191686945,
    "vx": 3.8355538418306265,
    "vy": -4.689165155362861,
    "index": 43
  },
  {
    "id": "nur_e_freedman",
    "name": "Nur-e Rahman Freedman",
    "type": "GUEST",
    "image": "/headshots/nur_e_freedman.jpg",
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
    "x": -598.5617153800622,
    "y": -574.0062983234434,
    "vx": 2.0623857774851455,
    "vy": -0.3027170482176755,
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
    "x": -576.4644323489513,
    "y": -29.356344294966696,
    "vx": 4.363249119540984,
    "vy": -1.5522913334161894,
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
    "x": -298.3941919894737,
    "y": -15.628768694146489,
    "vx": 6.333594468861754,
    "vy": -0.5035854014301081,
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
    "x": -949.9234373725958,
    "y": -15.80482231462635,
    "vx": 5.285583764932202,
    "vy": 2.745208323776599,
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
    "x": -450.4616145163497,
    "y": -508.38310250398933,
    "vx": 2.8458957953697737,
    "vy": -0.5983955205448611,
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
    "x": -367.40772978694264,
    "y": -402.9433219942902,
    "vx": 3.785683706379972,
    "vy": -0.03146369669249541,
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
    "x": 627.3768094430444,
    "y": -596.1614059049596,
    "vx": 8.388252739184539,
    "vy": 0.2275336573513923,
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
    "x": 384.69988389950333,
    "y": -666.541016787063,
    "vx": 2.2499401654705973,
    "vy": -1.769210216813691,
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
    "x": -298.5775904531334,
    "y": -561.5039713600307,
    "vx": 5.6102304762281605,
    "vy": -3.7587700590058595,
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
    "x": -470.2252510301924,
    "y": -777.3405097078322,
    "vx": 4.231557987781131,
    "vy": -2.607260682763343,
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
    "x": 993.636108083215,
    "y": 682.6778437770666,
    "vx": 6.576701036367742,
    "vy": -0.3441255373380642,
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
    "x": 764.1704926416169,
    "y": 508.6732555482942,
    "vx": -3.0789700350265985,
    "vy": -4.986419310484311,
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
    "x": 16.74764594241572,
    "y": 628.681621273183,
    "vx": 2.600432302593689,
    "vy": 3.678327248906219,
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
    "x": 469.73189068646076,
    "y": -446.6533135465354,
    "vx": 6.839526436272559,
    "vy": 2.290211753156391,
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
    "x": -13.817355421612742,
    "y": 782.4052901042493,
    "vx": 7.879317253057731,
    "vy": 5.773977364127664,
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
    "x": -27.1156371377527,
    "y": 972.9940162176632,
    "vx": 3.9900091998028673,
    "vy": 13.848320275951014,
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
    "x": -9.139022186654824,
    "y": 415.2146198618533,
    "vx": 3.9274705607887666,
    "vy": 1.6178941878322184,
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
    "x": 691.4561283757578,
    "y": 180.93435068548575,
    "vx": 9.99025917814945,
    "vy": -8.513728923820658,
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
    "x": -485.2900517976856,
    "y": 2.48805398263882,
    "vx": 5.795272690238306,
    "vy": 2.5030343511861135,
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
    "x": 1250.5776614219862,
    "y": -78.36359029577054,
    "vx": 5.8000741032767005,
    "vy": -0.3120285431326954,
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
    "x": 709.5801248859175,
    "y": -743.5951782114524,
    "vx": 7.254658420529761,
    "vy": -3.933572256600812,
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
    "x": 483.03145983525695,
    "y": -533.7223693125621,
    "vx": 5.157985028024807,
    "vy": -1.7510403544012494,
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
    "x": -479.0138673362045,
    "y": -72.2502377266525,
    "vx": 3.5714314416770834,
    "vy": 0.05747949930939402,
    "index": 66
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
    "x": -315.93694495003894,
    "y": -79.66354841792125,
    "vx": 4.516456242115728,
    "vy": -0.5138153756111429,
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
    "x": -643.447186345134,
    "y": 703.0994142324901,
    "vx": 4.832959320369837,
    "vy": 2.198857480286814,
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
    "x": -536.7550426943599,
    "y": 458.46390123472673,
    "vx": -5.251260103862781,
    "vy": 4.118062464767506,
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
    "x": -681.684823280996,
    "y": 589.822513364918,
    "vx": -2.5638838221318405,
    "vy": 4.811461659560707,
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
    "x": -684.8418325831075,
    "y": 21.79216590065525,
    "vx": 7.057368387711365,
    "vy": 2.583976064293023,
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
    "x": 540.9826433258287,
    "y": -47.639825250890496,
    "vx": -0.22122244995120244,
    "vy": 0.5667467124146912,
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
    "x": -1146.5590494947212,
    "y": -39.09024972545502,
    "vx": 6.920539832891277,
    "vy": 0.9542354969875431,
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
    "x": -835.2241542901386,
    "y": -109.07377945039141,
    "vx": 2.5222733667452744,
    "vy": -5.777759984184151,
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
    "x": 848.7486333190144,
    "y": 592.7547167555967,
    "vx": 9.090601674318075,
    "vy": -1.7598859869319143,
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
    "x": 47.22500745572361,
    "y": 994.1711019693375,
    "vx": 15.23771916848797,
    "vy": -9.390148011012787,
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
    "x": 37.57280209843523,
    "y": 1188.153322448661,
    "vx": 15.234246072135695,
    "vy": -7.99807523082272,
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
