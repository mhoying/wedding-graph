import React from 'react';
import { X, Wand2, Sparkles } from 'lucide-react';

export function getEmojiForInterest(interest) {
  if (!interest) return '✨';
  const r = String(interest).toLowerCase();
  if (r.includes('cat')) return '🐱';
  if (r.includes('dog') || r.includes('pet') || r.includes('goat')) return '🐕';
  if (r.includes('whiskey') || r.includes('bourbon')) return '🥃';
  if (r.includes('cocktail')) return '🍸';
  if (r.includes('beer')) return '🍺';
  if (r.includes('wine')) return '🍷';
  if (r.includes('soccer') || r.includes('bay fc') || r.includes('rugby')) return '⚽';
  if (r.includes('tennis')) return '🎾';
  if (r.includes('golf')) return '⛳';
  if (r.includes('cycling') || r.includes('bike') || r.includes('motorcycle')) return '🚴';
  if (r.includes('running') || r.includes('hike') || r.includes('hiking') || r.includes('outdoor') || r.includes('yellowstone') || r.includes('camping')) return '🏃';
  if (r.includes('lehigh') || r.includes('stanford') || r.includes('cornell') || r.includes('rpi')) return '🎓';
  if (r.includes('food') || r.includes('cook') || r.includes('bake') || r.includes('baking') || r.includes('cheese')) return '🍕';
  if (r.includes('music') || r.includes('art') || r.includes('design') || r.includes('pottery') || r.includes('band') || r.includes('bluegrass') || r.includes('ska')) return '🎨';
  if (r.includes('book') || r.includes('reading') || r.includes('words')) return '📚';
  if (r.includes('travel')) return '✈️';
  if (r.includes('kid')) return '👶';
  if (r.includes('garden') || r.includes('pollinator')) return '🌱';
  if (r.includes('car') || r.includes('landcruiser') || r.includes('rv') || r.includes('rocket')) return '🚗';
  if (r.includes('game') || r.includes('gaming')) return '🎮';
  if (r.includes('sf bay area') || r.includes('ca') || r.includes('california')) return '🌉';
  if (r.includes('bermuda') || r.includes('puerto rico')) return '🏝️';
  if (r.includes('colorado') || r.includes('zurich')) return '🏔️';
  if (r.includes('chicago') || r.includes('nyc') || r.includes('ny') || r.includes('boston') || r.includes('dc') || r.includes('jersey') || r.includes('nj') || r.includes('pa') || r.includes('maryland') || r.includes('baltimore')) return '🏙️';
  return '📍';
}

const ACTION_PROMPTS_MAP = {
  cat: [
    "Ask about their favorite cat stories & feline antics",
    "Swap funny cat photos & favorite pet moments",
    "Compare cat breeds & favorite pet stories"
  ],
  dog: [
    "Ask about their favorite dog & pet stories",
    "Swap funny pet photos & favorite animal moments",
    "Ask what pet breeds & animals they love most"
  ],
  whiskey: [
    "Compare favorite whiskeys & cocktail spots",
    "Swap top bourbon & scotch recommendations",
    "Cheers over a glass of good whiskey"
  ],
  beer: [
    "Cheers over a craft beer recommendation",
    "Swap favorite local breweries & beer styles",
    "Ask what craft beers they recommend trying"
  ],
  wine: [
    "Cheers over a glass of wine",
    "Swap favorite wine regions & vintages",
    "Ask for their go-to wine recommendation"
  ],
  cocktail: [
    "Cheers over a favorite signature cocktail",
    "Swap favorite cocktail bar spots",
    "Ask what drink they recommend trying at the bar"
  ],
  campus: [
    "Exchange campus memories & stories",
    "Ask about their favorite college spots & memories",
    "Swap alumni highlights & traditions"
  ],
  sports: [
    "Talk game highlights & favorite sports moments",
    "Ask about their favorite sports team memories",
    "Swap matchday stories & stadium picks"
  ],
  food: [
    "Swap favorite food & local recipe spots",
    "Ask for their top restaurant & cheese picks",
    "Talk favorite dishes & cooking experiments"
  ],
  travel: [
    "Compare favorite trip destinations",
    "Ask about their best travel adventure",
    "Swap top bucket-list travel spots"
  ],
  music: [
    "Talk concert & playlist recommendations",
    "Swap favorite live music & show memories",
    "Ask what bands & songs they love"
  ],
  outdoor: [
    "Swap favorite hiking & outdoor trail picks",
    "Ask about their best camping & park adventures",
    "Compare outdoor bucket-list destinations"
  ],
  golf: [
    "Talk favorite golf courses & rounds",
    "Ask about their favorite golf memories",
    "Swap course recommendations & tips"
  ],
  tennis: [
    "Chat about tennis matches & favorite players",
    "Ask if they play tennis & favorite courts",
    "Swap match highlights & court picks"
  ],
  cycling: [
    "Swap favorite cycling & bike routes",
    "Ask about their favorite rides & gear",
    "Talk cycling adventures & road trip picks"
  ],
  books: [
    "Compare book & reading recommendations",
    "Ask what great book they read recently",
    "Swap favorite authors & literature picks"
  ],
  crafts: [
    "Swap creative & craft projects",
    "Ask about their favorite artistic inspirations",
    "Talk about favorite creative hobbies"
  ],
  gaming: [
    "Swap favorite game picks & gaming memories",
    "Ask what games they are currently playing",
    "Talk favorite board & video games"
  ],
  vehicles: [
    "Swap favorite vehicle & road trip stories",
    "Ask about their favorite rides & adventures",
    "Talk shop & gear highlights"
  ],
  kids: [
    "Ask about kids & family stories",
    "Swap fun family moments & stories",
    "Talk about family highlights"
  ],
  gardening: [
    "Swap gardening & plant tips",
    "Ask about their favorite garden plants & flowers",
    "Talk backyard & green thumb projects"
  ],
  bayarea: [
    "Compare favorite Bay Area & California spots",
    "Ask for their go-to local CA dining & weekend picks",
    "Swap stories about living in California"
  ],
  eastcoast: [
    "Exchange Jersey, NY & PA memories and favorite spots",
    "Ask about their favorite local East Coast hangouts",
    "Swap top East Coast diner & food picks"
  ],
  chicago: [
    "Talk Chicago food, neighborhoods & city stories",
    "Ask about their favorite Chicago spots & memories",
    "Swap Chicago food picks & favorite hangouts"
  ],
  dc_md: [
    "Talk DMV area memories & favorite local spots",
    "Ask about their go-to Baltimore & DC hangouts",
    "Exchange stories about living in the Capital region"
  ],
  midwest: [
    "Swap Midwest memories & favorite local spots",
    "Ask about their favorite Midwest hangouts & stories",
    "Exchange Midwest food & community memories"
  ],
  islands: [
    "Ask about their island memories & trip highlights",
    "Swap top island dining & beach recommendations",
    "Compare favorite tropical getaway spots"
  ],
  mountains: [
    "Swap mountain & trail stories in Colorado & Europe",
    "Ask about their favorite mountain trips & hikes",
    "Compare outdoor adventures & scenic spots"
  ],
  south: [
    "Exchange local spots & sunshine stories",
    "Ask about their favorite local dining & weekend picks",
    "Swap stories about living in the South"
  ]
};

export function getShortActionPrompt(reason, seed = Math.random()) {
  if (!reason) return null;
  const r = String(reason).toLowerCase();
  
  let key = null;
  if (r.includes('cat')) key = 'cat';
  else if (r.includes('dog') || r.includes('pet') || r.includes('goat')) key = 'dog';
  else if (r.includes('whiskey') || r.includes('bourbon')) key = 'whiskey';
  else if (r.includes('beer')) key = 'beer';
  else if (r.includes('wine')) key = 'wine';
  else if (r.includes('cocktail')) key = 'cocktail';
  else if (r.includes('lehigh') || r.includes('stanford') || r.includes('cornell') || r.includes('rpi')) key = 'campus';
  else if (r.includes('bay fc') || r.includes('soccer') || r.includes('rugby') || r.includes('bears') || r.includes('chargers') || r.includes('knicks') || r.includes('wrestling')) key = 'sports';
  else if (r.includes('food') || r.includes('cook') || r.includes('bake') || r.includes('baking') || r.includes('cheese')) key = 'food';
  else if (r.includes('travel')) key = 'travel';
  else if (r.includes('music') || r.includes('band') || r.includes('bass') || r.includes('bluegrass') || r.includes('ska') || r.includes('bad bunny') || r.includes('grateful dead')) key = 'music';
  else if (r.includes('hiking') || r.includes('hike') || r.includes('camping') || r.includes('outdoors') || r.includes('yellowstone')) key = 'outdoor';
  else if (r.includes('golf')) key = 'golf';
  else if (r.includes('tennis')) key = 'tennis';
  else if (r.includes('cycling') || r.includes('bike') || r.includes('motorcycle')) key = 'cycling';
  else if (r.includes('book') || r.includes('reading') || r.includes('words')) key = 'books';
  else if (r.includes('art') || r.includes('design') || r.includes('pottery') || r.includes('embroidery') || r.includes('knitting') || r.includes('photography') || r.includes('woodworking')) key = 'crafts';
  else if (r.includes('gaming')) key = 'gaming';
  else if (r.includes('cars') || r.includes('landcruiser') || r.includes('rv') || r.includes('rocket')) key = 'vehicles';
  else if (r.includes('kid')) key = 'kids';
  else if (r.includes('garden') || r.includes('pollinator')) key = 'gardening';
  else if (r.includes('sf bay area') || r.includes('stockton') || r.includes('ca') || r.includes('california')) key = 'bayarea';
  else if (r.includes('nj') || r.includes('jersey') || r.includes('ny') || r.includes('nyc') || r.includes('pa') || r.includes('boston') || r.includes('amherst')) key = 'eastcoast';
  else if (r.includes('chicago')) key = 'chicago';
  else if (r.includes('dc') || r.includes('maryland') || r.includes('baltimore')) key = 'dc_md';
  else if (r.includes('madison') || r.includes('iowa') || r.includes('minnesota')) key = 'midwest';
  else if (r.includes('bermuda') || r.includes('puerto rico')) key = 'islands';
  else if (r.includes('colorado') || r.includes('zurich')) key = 'mountains';
  else if (r.includes('houston') || r.includes('florida')) key = 'south';

  let prompts = key ? ACTION_PROMPTS_MAP[key] : null;

  if (!prompts) {
    prompts = [
      `Swap stories & favorite picks for ${reason}`,
      `Ask for their top ${reason} recommendations`,
      `Compare ${reason} experiences & memories`
    ];
  }

  const index = Math.floor(seed * prompts.length) % prompts.length;
  return prompts[index];
}

export default function CocktailMatchmakerModal({
  isOpen,
  onClose,
  myGuestId,
  setMyGuestId,
  nodes,
  matchmakerResults,
  flyToNode,
  setSelectedNode
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop no-print" onClick={onClose}>
      <div className="glass-panel modal-card" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span className="drawer-badge" style={{ backgroundColor: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Wand2 style={{ width: 12, height: 12 }} /> Cocktail Matchmaker
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <h2 className="drawer-title" style={{ fontSize: 20 }}>Find Guest Matches</h2>
        <p className="drawer-subtitle">Pick your name to discover top shared icebreakers!</p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Select Your Name:</label>
          <select 
            value={myGuestId}
            onChange={(e) => setMyGuestId(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: 12, background: 'rgba(30, 41, 59, 0.9)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none' }}
          >
            <option value="">-- Choose Guest --</option>
            {[...nodes]
              .filter(n => n && n.name && n.type !== 'CONTEXT_HUB')
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(n => (
                <option key={n.id} value={n.id}>{n.name}</option>
              ))}
          </select>
        </div>

        {matchmakerResults.length > 0 && (
          <div className="drawer-section">
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981', marginBottom: 8 }}>Top Recommended Matches:</div>
            {matchmakerResults.map(res => (
              <div 
                key={res.node.id} 
                className="match-card"
                onClick={() => {
                  flyToNode(res.node);
                  setSelectedNode(res.node);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: 14 }}>{res.node.name}</span>
                  <span style={{ fontSize: 11, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '2px 8px', borderRadius: 9999, fontWeight: 700 }}>
                    {res.sharedScore} pts
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>
                  {res.node.cohort} • {res.node.side} Side
                </div>
                {res.reasons.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    {/* Shared Interest Emoji Pill Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                      {res.reasons.map(reason => (
                        <span 
                          key={reason} 
                          style={{ 
                            fontSize: 11, 
                            fontWeight: 700, 
                            background: 'rgba(56, 189, 248, 0.15)', 
                            color: '#7dd3fc', 
                            padding: '3px 9px', 
                            borderRadius: 9999, 
                            border: '1px solid rgba(56, 189, 248, 0.3)', 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: 4 
                          }}
                        >
                          <span>{getEmojiForInterest(reason)}</span>
                          <span>{reason}</span>
                        </span>
                      ))}
                    </div>

                    {/* Top 1-2 Concise Action Prompts */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {res.reasons.slice(0, 2).map(reason => {
                        const promptText = getShortActionPrompt(reason);
                        if (!promptText) return null;
                        return (
                          <div 
                            key={reason} 
                            style={{ 
                              fontSize: 11, 
                              color: '#94a3b8', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 6,
                              background: 'rgba(15, 23, 42, 0.4)',
                              padding: '4px 8px',
                              borderRadius: 6,
                              border: '1px solid rgba(255, 255, 255, 0.06)'
                            }}
                          >
                            <Sparkles style={{ width: 11, height: 11, color: '#34d399', flexShrink: 0 }} />
                            <span>💬 <em>"{promptText}"</em></span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
