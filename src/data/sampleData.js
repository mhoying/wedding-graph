export const BUILD_TIMESTAMP = 1788755424519;
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
    "x": 611.9288155146639,
    "y": -519.6124282329807,
    "vx": 0.8717008077954566,
    "vy": 0.6253045326915345
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
    "x": 143.57338459227427,
    "y": -186.69523437702964,
    "vx": -3.6145255058647994,
    "vy": 1.1270326336421537
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
    "x": 653.6898756516715,
    "y": 308.8172644385666,
    "vx": -1.6407973513612701,
    "vy": -0.060326151035058964
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
    "x": -38.56526397276599,
    "y": -726.918850727548,
    "vx": -0.16733824832461527,
    "vy": -2.0550360102900576
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
    "x": 381.42678665278396,
    "y": -48.747775139928514,
    "vx": -0.4912508816219631,
    "vy": -1.6293209675721296
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
    "x": -128.551532390085,
    "y": -294.40788998274076,
    "vx": -2.153039682225714,
    "vy": -0.7187746467796268,
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
    "x": -199.19974708280913,
    "y": -497.5419379162418,
    "vx": -1.8840985345441192,
    "vy": -1.8138134539903266,
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
    "x": -812.9201525855831,
    "y": -237.24742954466362,
    "vx": -3.6901085467728243,
    "vy": -1.9421431384247865,
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
    "x": -655.9527430112907,
    "y": 542.1789373218478,
    "vx": -6.069853609815472,
    "vy": 2.8442207255435217,
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
    "x": -791.5171747348052,
    "y": 689.2158151583095,
    "vx": -6.554041672368162,
    "vy": 3.713411174299901,
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
    "x": -206.37491195142326,
    "y": -827.1908658531395,
    "vx": -2.447633437797931,
    "vy": 0.2366066597179499,
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
    "x": -246.75281446026693,
    "y": -1030.537785275076,
    "vx": -3.12921580606209,
    "vy": -1.5670727953680996,
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
    "x": 572.3480975856442,
    "y": -691.398839783414,
    "vx": -2.0154518169819657,
    "vy": -1.4324009065987509,
    "index": 14,
    "image": "headshots/becky_spohr.jpg"
  },
  {
    "id": "brian_kim",
    "image": "headshots/brian_kim.jpg",
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
    "x": 257.0782979397159,
    "y": 577.2542744098394,
    "vx": -0.03712855005510374,
    "vy": 1.397677341199078,
    "index": 15
  },
  {
    "id": "michelle_preston",
    "image": "headshots/michelle_preston.jpg",
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
    "x": 337.9851815091599,
    "y": 780.5047615350901,
    "vx": 0.5320803799570055,
    "vy": 1.9348506600140856,
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
    "x": 875.1294390174875,
    "y": 381.86534283570177,
    "vx": -1.229804340756883,
    "vy": 1.6811148665745124,
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
    "x": 527.5875291962965,
    "y": -320.8433187120858,
    "vx": 2.3360227045018744,
    "vy": 3.0084533105871047,
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
    "x": 862.7347884513435,
    "y": -604.1784868330492,
    "vx": 4.3886830748843515,
    "vy": 0.4682520632902208,
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
    "x": -335.8808842809936,
    "y": 976.8003294763548,
    "vx": -2.322146196368846,
    "vy": 2.030713640245274,
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
    "x": 438.74817899820306,
    "y": -546.9386087986196,
    "vx": -3.4894031746018235,
    "vy": -0.14588363910932323,
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
    "x": 688.7562308308877,
    "y": -763.7105391159135,
    "vx": -1.3393745491215219,
    "vy": -2.312234638815813,
    "index": 22
  },
  {
    "id": "krista_kobeski",
    "image": "headshots/krista_kobeski.jpg",
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
    "x": -69.81396570981998,
    "y": -971.5901713764275,
    "vx": -1.1447391369150446,
    "vy": -2.6024407521773987,
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
    "x": -552.8870609129348,
    "y": 685.0766820317965,
    "vx": -3.775649975598842,
    "vy": 3.5852758007421053,
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
    "x": 586.5032519192675,
    "y": 419.9916252997289,
    "vx": -6.9753836291001114,
    "vy": -1.941398680183567,
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
    "x": -448.9743926936672,
    "y": 489.10636726969926,
    "vx": -4.313120843208157,
    "vy": 2.177495282753638,
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
    "x": 428.70085088713915,
    "y": 199.3938819326984,
    "vx": -1.6512500878997913,
    "vy": -1.7361050190406004,
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
    "x": 711.7632026562363,
    "y": 587.0482895948257,
    "vx": -3.9995587733389724,
    "vy": -1.6615360773649146,
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
    "x": 155.81625990659637,
    "y": 381.47273895282416,
    "vx": -0.20149110726793543,
    "vy": -0.3086629055298592,
    "index": 29
  },
  {
    "id": "romana_rajput",
    "image": "headshots/romana_rajput.jpg",
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
    "x": -842.8778193754208,
    "y": 326.42801048085875,
    "vx": -4.791572974679355,
    "vy": 2.3804497492220205,
    "index": 30
  },
  {
    "id": "steve_nares",
    "image": "headshots/steve_nares.jpg",
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
    "x": -1043.1878841544808,
    "y": 406.76561567677453,
    "vx": -5.7335599701174615,
    "vy": 2.2171887756276925,
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
    "x": -311.1480449688883,
    "y": 184.75981183932166,
    "vx": -2.54939297345669,
    "vy": 0.7260335071453143,
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
    "x": 40.682495187064056,
    "y": 193.32429166190047,
    "vx": -2.586806049562353,
    "vy": 0.2789010566452454,
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
    "x": 426.24973108503514,
    "y": -375.75109769582906,
    "vx": -0.4509318505077186,
    "vy": 1.7989198835034452,
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
    "x": 901.3521482801478,
    "y": -821.7655452843375,
    "vx": -0.49637481395121347,
    "vy": -3.593843029760756,
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
    "x": 505.58849188258637,
    "y": -839.3802450177027,
    "vx": -3.19247506380032,
    "vy": -3.3631826016136848,
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
    "x": 1235.6556992797575,
    "y": -55.20432815460396,
    "vx": -2.210036146624848,
    "vy": 0.08186815035982108,
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
    "x": 1498.3862204168704,
    "y": -43.489300694056844,
    "vx": -0.773241215030129,
    "vy": 0.006048241613789252,
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
    "x": -6.404514145886666,
    "y": 370.2920375258078,
    "vx": -2.818731817919331,
    "vy": 2.4308615154627446,
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
    "x": -48.28118177026174,
    "y": 614.808174249847,
    "vx": -3.1526508745901545,
    "vy": 4.294171335606321,
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
    "x": -987.7825600699614,
    "y": -17.41896497999752,
    "vx": -3.224088796434757,
    "vy": 1.4894137596273522,
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
    "x": -1032.983537748675,
    "y": 63.7601945309896,
    "vx": -7.0741490816282715,
    "vy": 3.4067693168010127,
    "index": 42
  },
  {
    "id": "james_freedman",
    "image": "headshots/james_freedman.jpg",
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
    "x": -885.290556446746,
    "y": -649.0556605136538,
    "vx": -3.719476049177,
    "vy": -1.363978574196427,
    "index": 43
  },
  {
    "id": "nur_e_freedman",
    "image": "headshots/nur_e_freedman.jpg",
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
    "x": -568.6285940385103,
    "y": -567.7276468064446,
    "vx": -4.8024617049952445,
    "vy": 0.08067816140473925,
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
    "x": -834.4954582199719,
    "y": -18.02545963988512,
    "vx": -5.223269899452474,
    "vy": 2.083973725616464,
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
    "x": -696.1354837271165,
    "y": -80.5959864092133,
    "vx": -4.520391999694129,
    "vy": -0.006119236813813314,
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
    "x": -1131.3184746601926,
    "y": -98.97912707430268,
    "vx": -6.107666910585434,
    "vy": 0.4186716076747366,
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
    "x": -302.17950953496074,
    "y": -379.2652949186934,
    "vx": -3.9628138060865385,
    "vy": 0.45108438147390467,
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
    "x": -374.51472990123165,
    "y": -526.7743168558347,
    "vx": -3.8447158147893026,
    "vy": -0.9633679453837452,
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
    "x": 281.5982592987745,
    "y": -355.2628995719397,
    "vx": -2.924163610335377,
    "vy": 1.5699464882693377,
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
    "x": 262.66956117735435,
    "y": -502.24797801627545,
    "vx": -4.288021806187706,
    "vy": -0.834354460517884,
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
    "x": -544.9469861926243,
    "y": -763.1036843917628,
    "vx": -0.6187827271616482,
    "vy": -2.224019619153025,
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
    "x": -699.7379510634964,
    "y": -913.333894815153,
    "vx": -1.2018607303212003,
    "vy": -3.3836383608479546,
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
    "x": 1079.0241968324049,
    "y": 686.3612988504975,
    "vx": 9.836449839104112,
    "vy": 6.928177474720223,
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
    "x": 898.506771601451,
    "y": 551.7346119934059,
    "vx": 7.099166192856963,
    "vy": 7.283935494057185,
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
    "x": 0.4987566820204319,
    "y": 847.047451662612,
    "vx": -2.8089062510654377,
    "vy": 4.9285483847296785,
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
    "x": 383.65254540933284,
    "y": -686.962006876755,
    "vx": -3.556699161035272,
    "vy": -1.4614104310037075,
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
    "x": 151.71281643119002,
    "y": 772.813182523077,
    "vx": -1.6373335492055803,
    "vy": 1.4187515444826093,
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
    "x": 162.99785417386195,
    "y": 973.2480501826574,
    "vx": -0.6158760682702623,
    "vy": 2.3181652478732975,
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
    "x": 105.03201118265102,
    "y": 539.4066978651031,
    "vx": -1.3411800617207597,
    "vy": 1.2164325840702217,
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
    "x": -606.4651826885629,
    "y": 323.77587395379095,
    "vx": -4.385722499398578,
    "vy": 2.230283215714162,
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
    "x": -469.24933738194505,
    "y": -67.41090810092594,
    "vx": -3.656783089511172,
    "vy": 0.9794832658550409,
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
    "x": 967.0732646559649,
    "y": -64.1897298690485,
    "vx": -2.9485911137168244,
    "vy": 0.0790060717749548,
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
    "x": 808.7111887494435,
    "y": -1002.9769300391824,
    "vx": -0.48884303049282357,
    "vy": -3.0373684129155913,
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
    "x": 655.8061110605565,
    "y": -873.066271595863,
    "vx": -1.5838504282056995,
    "vy": -2.2601084227707013,
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
    "x": -587.7254653265949,
    "y": 35.06145974454126,
    "vx": -5.424780581240548,
    "vy": 2.5577782874963537,
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
    "x": -278.71469518756084,
    "y": -71.22901352493639,
    "vx": -2.959350434741838,
    "vy": -0.4875253906846694,
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
    "x": -683.7713188817033,
    "y": 854.1605071055889,
    "vx": -4.225788691203684,
    "vy": 4.091299463299762,
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
    "x": -300.67312376540673,
    "y": 428.7619360172674,
    "vx": -1.6692057705805916,
    "vy": 2.5384118719440716,
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
    "x": -399.2948948761454,
    "y": 617.7594661417105,
    "vx": -1.7254104664981174,
    "vy": 3.668121192304778,
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
    "x": -617.3786192409049,
    "y": -143.1284662975165,
    "vx": -3.2019664518557938,
    "vy": -0.50045278362223,
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
    "x": 738.7811972239291,
    "y": 44.92067725087552,
    "vx": -0.7440012613667222,
    "vy": 1.4389636080461334,
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
    "x": -1367.2495389635917,
    "y": -125.8058842657185,
    "vx": -7.0359158211541954,
    "vy": -0.10501881023396008,
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
    "x": -1023.6821372325405,
    "y": -276.1957150621098,
    "vx": -4.791024864096051,
    "vy": -2.247268759674817,
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
    "x": 1071.101574791446,
    "y": 488.69855412540124,
    "vx": 1.468362377554585,
    "vy": 0.4120653133106223,
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
    "x": 282.111431095656,
    "y": 1052.946681621435,
    "vx": 2.5487796375663483,
    "vy": 2.999339517112363,
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
    "x": 266.9715459357502,
    "y": 1240.7471462406165,
    "vx": 1.2422851401988324,
    "vy": 3.2705031618285196,
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
