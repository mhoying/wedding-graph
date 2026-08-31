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
    "Ask: What's the funniest cat chaos moment they've ever witnessed?",
    "Debate: Are cats secretly running the household?",
    "Swap hilarious pet photos & favorite feline memories!"
  ],
  dog: [
    "Ask: What's the wildest dog adventure or mischief story they have?",
    "Debate: What is the single best dog breed of all time?",
    "Trade pet photo show-and-tells & favorite park spots!"
  ],
  whiskey: [
    "Ask: What's the prized bottle on their top shelf right now?",
    "Debate: Neat, on the rocks, or classic Old Fashioned?",
    "Toast to discovering your next favorite whiskey or bourbon!"
  ],
  beer: [
    "Ask: Which local craft brewery is their absolute #1 pick?",
    "Debate: Hazy IPAs vs. classic crisp lagers!",
    "Toast with a craft beer recommendation at the bar!"
  ],
  wine: [
    "Ask: What's their go-to secret value wine region?",
    "Debate: Bold Red Cabernets vs. crisp Chardonnays!",
    "Cheers over a glass of wine & favorite vineyard trips!"
  ],
  cocktail: [
    "Ask: What is their ultimate signature drink order?",
    "Debate: What makes a truly perfect cocktail bar ambiance?",
    "Cheers over a signature cocktail recommendation!"
  ],
  campus: [
    "Ask: What was their favorite late-night campus food spot?",
    "Bond over the worst-kept secrets of college campus life!",
    "Exchange campus memories, rivalries, & alumni traditions!"
  ],
  sports: [
    "Ask: What was the single most electric game they've watched live?",
    "Compare your boldest match predictions & team highlights!",
    "Trade matchday stories, stadium food, & fan traditions!"
  ],
  food: [
    "Ask: What secret local restaurant do they swear by?",
    "Debate: Is sweet or savory the ultimate food craving?",
    "Trade favorite secret recipes & local dining hidden gems!"
  ],
  travel: [
    "Ask: What was the most unexpected travel adventure of their life?",
    "Debate: Relaxing beach resort vs. packed city exploration!",
    "Swap top bucket-list travel spots & road trip highlights!"
  ],
  music: [
    "Ask: What was the first live concert they ever attended?",
    "Debate: What is the greatest album of all time?",
    "Trade favorite live show memories & playlist picks!"
  ],
  outdoor: [
    "Ask: What is the most breathtaking hiking trail they've completed?",
    "Debate: Tent camping under stars vs. cozy cabin getaway!",
    "Trade secret trail maps & epic outdoor fail stories!"
  ],
  golf: [
    "Ask: What was the most memorable hole-in-one or round of their life?",
    "Debate: Early morning tee times vs. twilight rounds!",
    "Swap favorite course recommendations & round stories!"
  ],
  tennis: [
    "Ask: Who is their favorite all-time tennis legend?",
    "Debate: Hard court speed vs. clay court rallies!",
    "Swap tennis match highlights & court recommendations!"
  ],
  cycling: [
    "Ask: What is the longest or most scenic bike ride they've done?",
    "Debate: Road cycling speed vs. mountain trail adrenaline!",
    "Talk cycling adventures & favorite scenic routes!"
  ],
  books: [
    "Ask: What book completely changed the way they view the world?",
    "Debate: Physical paper books vs. audiobooks on the go!",
    "Swap favorite authors & current reading recommendations!"
  ],
  crafts: [
    "Ask: What is the coolest DIY or creative project they've finished?",
    "Bond over favorite artistic inspirations & creative outlets!",
    "Trade creative craft projects & design ideas!"
  ],
  gaming: [
    "Ask: What game consumed the most hours of their life?",
    "Debate: Cozy board games vs. competitive multiplayer gaming!",
    "Swap favorite game picks & high score memories!"
  ],
  vehicles: [
    "Ask: What was their dream first car or ultimate dream ride?",
    "Debate: Classic vintage cruisers vs. modern high-tech rigs!",
    "Talk road trips, vehicle builds, & mechanic stories!"
  ],
  kids: [
    "Ask: What is the funniest or sweetest thing their kids have said?",
    "Bond over the chaos & joys of parenting & family life!",
    "Trade fun family moments & weekend outing spots!"
  ],
  gardening: [
    "Ask: What is their proudest plant achievement or garden bloom?",
    "Debate: Growing fresh veggies vs. lush colorful flower beds!",
    "Trade green thumb tips & garden secret hacks!"
  ],
  bayarea: [
    "Ask: What secret Bay Area local spot do they swear by?",
    "Debate: SF microclimates — fog, sun, or ocean breeze?",
    "Swap stories about living in the Bay Area & NorCal!"
  ],
  eastcoast: [
    "Ask: What is their absolute favorite East Coast diner order?",
    "Toast to surviving East Coast winters & late-night diner runs!",
    "Exchange Jersey, NY & PA memories and favorite local spots!"
  ],
  chicago: [
    "Ask: What is their go-to Chicago neighborhood spot?",
    "Challenge them to a friendly debate: Deep dish vs. tavern style pizza!",
    "Talk Chicago food, lakefront summers, & city stories!"
  ],
  dc_md: [
    "Ask: What is their favorite hidden hangout in DC or Baltimore?",
    "Debate: Steamed crabs vs. iconic DMV mumbo sauce!",
    "Exchange stories about living in the Capital region!"
  ],
  midwest: [
    "Ask: What is the most iconic Midwest comfort food they love?",
    "Debate: Midwest nice vs. brutal winter snowstorms!",
    "Exchange Midwest community memories & favorite spots!"
  ],
  islands: [
    "Ask: What was the most stunning beach or island sunset they've seen?",
    "Debate: Snorkeling coral reefs vs. lounging with a tropical drink!",
    "Swap island travel highlights & beach recommendations!"
  ],
  mountains: [
    "Ask: What mountain view took their breath away the most?",
    "Debate: Fresh powder skiing vs. summer mountain hiking!",
    "Swap alpine adventure stories & mountain trip tips!"
  ],
  south: [
    "Ask: What is their ultimate southern comfort food or BBQ spot?",
    "Debate: Sweet tea vs. lemonade on a hot summer afternoon!",
    "Exchange sunshine stories & southern hospitalities!"
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
