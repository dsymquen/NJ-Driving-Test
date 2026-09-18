export type SignGroup =
  | 'regulatory'
  | 'warning'
  | 'construction'
  | 'school'
  | 'railroad'
  | 'guide'
  | 'marker'

export interface SignSpec {
  /** MUTCD code. Also the filename under public/signs/. */
  code: string
  name: string
  /** Shape in plain words — the test asks about shapes on their own. */
  shape: string
  /** Color in plain words, for the same reason. */
  color: string
  meaning: string
  group: SignGroup
}

/**
 * Artwork is prerendered from the FHWA 2024 Standard Highway Signs by
 * scripts/generate-signs.mjs; the meanings below are written for the New
 * Jersey Driver Manual.
 */
export const SIGNS: SignSpec[] = [
  // ---------- Regulatory ----------
  {
    code: 'R1-1',
    name: 'Stop',
    shape: 'Octagon',
    color: 'Red and white',
    meaning:
      'Come to a full stop at the stop line, before the crosswalk, or before entering the intersection. Yield to pedestrians and cross traffic, then go when it is safe. The octagon is used only for stop.',
    group: 'regulatory',
  },
  {
    code: 'R1-2',
    name: 'Yield',
    shape: 'Downward triangle',
    color: 'Red and white',
    meaning:
      'Slow down and give the right of way to traffic and pedestrians ahead; stop if necessary. The downward-pointing triangle is used only for yield.',
    group: 'regulatory',
  },
  {
    code: 'R2-1',
    name: 'Speed Limit',
    shape: 'Vertical rectangle',
    color: 'Black on white',
    meaning:
      'The maximum legal speed in ideal conditions. In New Jersey 25 mph is the default in school zones and business or residential districts, 35 in suburban districts, 50 on rural roads and 55 on most highways.',
    group: 'regulatory',
  },
  {
    code: 'R3-1',
    name: 'No Right Turn',
    shape: 'Vertical rectangle',
    color: 'Red, black and white',
    meaning: 'Right turns are prohibited at this intersection. A red circle with a slash always means the movement shown is not allowed.',
    group: 'regulatory',
  },
  {
    code: 'R3-2',
    name: 'No Left Turn',
    shape: 'Vertical rectangle',
    color: 'Red, black and white',
    meaning: 'Left turns are prohibited here. Continue and find a legal place to turn around.',
    group: 'regulatory',
  },
  {
    code: 'R3-3',
    name: 'No Turns',
    shape: 'Vertical rectangle',
    color: 'Black on white',
    meaning: 'No turns of any kind are permitted at this intersection — you must proceed straight through.',
    group: 'regulatory',
  },
  {
    code: 'R3-4',
    name: 'No U-Turn',
    shape: 'Vertical rectangle',
    color: 'Red, black and white',
    meaning:
      'U-turns are prohibited here. Even where no sign is posted, a U-turn is illegal on a curve or near a hill crest where you cannot be seen for 500 feet, and on divided highways and freeways.',
    group: 'regulatory',
  },
  {
    code: 'R3-5',
    name: 'Mandatory Lane Control',
    shape: 'Vertical rectangle',
    color: 'Black on white',
    meaning: 'Traffic in this lane must make the movement shown by the arrow. Get into the correct lane well before the intersection.',
    group: 'regulatory',
  },
  {
    code: 'R4-1',
    name: 'Do Not Pass',
    shape: 'Vertical rectangle',
    color: 'Black on white',
    meaning:
      'Passing is prohibited from here to the next PASS WITH CARE sign. Passing is also illegal within 100 feet of an intersection, bridge, tunnel or railroad crossing, or wherever you cannot see far enough ahead.',
    group: 'regulatory',
  },
  {
    code: 'R4-7',
    name: 'Keep Right',
    shape: 'Vertical rectangle',
    color: 'Black on white',
    meaning: 'Stay to the right of the island, median or obstruction ahead.',
    group: 'regulatory',
  },
  {
    code: 'R4-8',
    name: 'Keep Left',
    shape: 'Vertical rectangle',
    color: 'Black on white',
    meaning: 'Pass to the left of the divider or obstruction ahead.',
    group: 'regulatory',
  },
  {
    code: 'R5-1',
    name: 'Do Not Enter',
    shape: 'Square',
    color: 'Red and white',
    meaning:
      'Do not drive into this roadway — it is an exit ramp, a one-way street coming toward you, or a closed road.',
    group: 'regulatory',
  },
  {
    code: 'R5-1a',
    name: 'Wrong Way',
    shape: 'Horizontal rectangle',
    color: 'Red and white',
    meaning:
      'You are already traveling against traffic. Pull over safely, stop and turn around immediately.',
    group: 'regulatory',
  },
  {
    code: 'R5-2',
    name: 'No Trucks',
    shape: 'Vertical rectangle',
    color: 'Red, black and white',
    meaning: 'Trucks are prohibited on this road, usually because of a weight limit, a low bridge or a residential restriction.',
    group: 'regulatory',
  },
  {
    code: 'R6-1',
    name: 'One Way',
    shape: 'Horizontal rectangle',
    color: 'Black and white',
    meaning: 'Traffic flows only in the direction of the arrow. Never turn against it.',
    group: 'regulatory',
  },
  {
    code: 'R6-2',
    name: 'One Way (vertical)',
    shape: 'Vertical rectangle',
    color: 'Black and white',
    meaning: 'The same message as the horizontal version: traffic moves only in the direction of the arrow.',
    group: 'regulatory',
  },
  {
    code: 'R7-1',
    name: 'No Parking Any Time',
    shape: 'Vertical rectangle',
    color: 'Red on white',
    meaning:
      'Parking is prohibited here. Statewide you may never park within 10 feet of a fire hydrant, 25 feet of a crosswalk or stop sign, or 50 feet of a railroad crossing.',
    group: 'regulatory',
  },
  {
    code: 'R8-3',
    name: 'No Parking (symbol)',
    shape: 'Vertical rectangle',
    color: 'Red, black and white',
    meaning: 'The symbol version of the no-parking rule. You may still stop briefly to obey traffic or let a passenger out where that is allowed.',
    group: 'regulatory',
  },
  {
    code: 'R10-11',
    name: 'No Turn On Red',
    shape: 'Vertical rectangle',
    color: 'Black on white',
    meaning:
      'Right on red is legal in New Jersey after a complete stop — except where this sign is posted. Here you must wait for a green light.',
    group: 'regulatory',
  },
  {
    code: 'R11-2',
    name: 'Road Closed',
    shape: 'Horizontal rectangle',
    color: 'Black on white',
    meaning: 'The road ahead is closed to all traffic. Follow the posted detour.',
    group: 'regulatory',
  },

  // ---------- Warning ----------
  {
    code: 'W1-1',
    name: 'Sharp Turn',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'A sharp right-angle turn is ahead. Slow down well before the turn — the square-cornered arrow means a tighter bend than a curve sign.',
    group: 'warning',
  },
  {
    code: 'W1-2',
    name: 'Curve',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The road curves in the direction shown. Reduce speed before you enter the curve, not while you are in it.',
    group: 'warning',
  },
  {
    code: 'W1-3',
    name: 'Reverse Turn',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'Two sharp turns in opposite directions. Slow down and stay in your lane through both.',
    group: 'warning',
  },
  {
    code: 'W1-4',
    name: 'Reverse Curve',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The road curves one way and then back the other. Do not pass through a reverse curve.',
    group: 'warning',
  },
  {
    code: 'W1-5',
    name: 'Winding Road',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'A series of curves is ahead. Expect limited sight distance for some distance.',
    group: 'warning',
  },
  {
    code: 'W1-6',
    name: 'One-Direction Large Arrow',
    shape: 'Horizontal rectangle',
    color: 'Black on yellow',
    meaning: 'Posted at a sharp change of direction — the roadway turns the way the arrow points.',
    group: 'warning',
  },
  {
    code: 'W1-8',
    name: 'Chevron Alignment',
    shape: 'Vertical rectangle',
    color: 'Black on yellow',
    meaning: 'A series of these marks the outside of a sharp curve. Keep them on your left as you go around.',
    group: 'warning',
  },
  {
    code: 'W2-1',
    name: 'Crossroad',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'A four-way intersection is ahead. Watch for traffic entering from either side.',
    group: 'warning',
  },
  {
    code: 'W2-2',
    name: 'Side Road',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'Another road joins yours from the side. Watch for vehicles entering the roadway.',
    group: 'warning',
  },
  {
    code: 'W2-4',
    name: 'T-Intersection',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The road you are on ends ahead — you must turn right or left. Slow down and yield to traffic on the through road.',
    group: 'warning',
  },
  {
    code: 'W2-5',
    name: 'Y-Intersection',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The road ahead splits. Choose a direction early and signal before you reach the fork.',
    group: 'warning',
  },
  {
    code: 'W3-1',
    name: 'Stop Ahead',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'A stop sign is ahead, often hidden by a curve or hill. Begin slowing now so you can stop at the line.',
    group: 'warning',
  },
  {
    code: 'W3-2',
    name: 'Yield Ahead',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'A yield sign is ahead. Prepare to give the right of way.',
    group: 'warning',
  },
  {
    code: 'W3-3',
    name: 'Signal Ahead',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'A traffic light is ahead where it is hard to see in time. Cover your brake and be ready to stop.',
    group: 'warning',
  },
  {
    code: 'W4-1',
    name: 'Merge',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'Traffic from another roadway is joining yours. Adjust your speed or change lanes to let vehicles in.',
    group: 'warning',
  },
  {
    code: 'W4-2',
    name: 'Lane Ends',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'One lane ends ahead. Merge early and take turns with other drivers instead of racing to the end of the lane.',
    group: 'warning',
  },
  {
    code: 'W5-1',
    name: 'Road Narrows',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The pavement gets narrower ahead. Slow down and keep to your side of the road.',
    group: 'warning',
  },
  {
    code: 'W5-2',
    name: 'Narrow Bridge',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The bridge ahead is barely wide enough for two lanes. Slow down and stay centered in your lane.',
    group: 'warning',
  },
  {
    code: 'W6-1',
    name: 'Divided Highway Begins',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The road ahead is split by a median. Keep to the right of the divider.',
    group: 'warning',
  },
  {
    code: 'W6-2',
    name: 'Divided Highway Ends',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The median ends and you will share an undivided road with oncoming traffic. Keep right.',
    group: 'warning',
  },
  {
    code: 'W6-3',
    name: 'Two-Way Traffic',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The one-way roadway ends and you will meet oncoming traffic. Do not pass unless the markings allow it.',
    group: 'warning',
  },
  {
    code: 'W8-1',
    name: 'Bump',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'A bump or rough patch is ahead. Slow down before you reach it.',
    group: 'warning',
  },
  {
    code: 'W8-5',
    name: 'Slippery When Wet',
    shape: 'Diamond',
    color: 'Yellow',
    meaning:
      'The road is slippery in rain, snow or ice. Slow down, increase your following distance, and avoid hard braking or sharp steering.',
    group: 'warning',
  },
  {
    code: 'W11-1',
    name: 'Bicycle Crossing',
    shape: 'Diamond',
    color: 'Fluorescent yellow-green',
    meaning:
      'Bicyclists cross or share the road ahead. New Jersey requires at least four feet of space when you pass a rider, or slowing to 25 mph if four feet is impossible.',
    group: 'warning',
  },
  {
    code: 'W11-2',
    name: 'Pedestrian Crossing',
    shape: 'Diamond',
    color: 'Fluorescent yellow-green',
    meaning:
      'People cross ahead. NJ law requires you to stop and stay stopped for a pedestrian in a marked crosswalk. Fluorescent yellow-green is reserved for pedestrian, bicycle and school warnings.',
    group: 'warning',
  },
  {
    code: 'W11-3',
    name: 'Deer Crossing',
    shape: 'Diamond',
    color: 'Yellow',
    meaning:
      'Deer cross here, most often at dawn and dusk. If one crosses, expect others; brake firmly rather than swerving into another lane.',
    group: 'warning',
  },
  {
    code: 'W13-1P',
    name: 'Advisory Speed plaque',
    shape: 'Small square plaque',
    color: 'Black on yellow',
    meaning:
      'The safe speed for the curve or ramp it hangs beneath. Unlike a white speed-limit sign it is advisory, but taking a ramp faster than the advisory speed is how vehicles roll over.',
    group: 'warning',
  },
  {
    code: 'W14-1',
    name: 'Dead End',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The road ahead has no outlet — you will have to turn around.',
    group: 'warning',
  },
  {
    code: 'W14-2',
    name: 'No Outlet',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'The road network you are entering has no through route; the only way out is back the way you came.',
    group: 'warning',
  },
  {
    code: 'W17-1',
    name: 'Speed Hump',
    shape: 'Diamond',
    color: 'Yellow',
    meaning: 'A raised speed hump is ahead, usually in a residential area. Slow to the posted advisory speed.',
    group: 'warning',
  },

  // ---------- Work zones ----------
  {
    code: 'W20-1',
    name: 'Road Work Ahead',
    shape: 'Diamond',
    color: 'Orange',
    meaning:
      'Orange always means a construction or maintenance zone. Slow down and watch for workers — New Jersey doubles fines in work zones.',
    group: 'construction',
  },

  // ---------- School ----------
  {
    code: 'S1-1',
    name: 'School Zone',
    shape: 'Pentagon (five sides)',
    color: 'Fluorescent yellow-green',
    meaning:
      'A school or school crossing is ahead. The pentagon is used only for school signs; the NJ school-zone limit is 25 mph and fines are doubled.',
    group: 'school',
  },
  {
    code: 'S5-1',
    name: 'School Speed Limit When Flashing',
    shape: 'Vertical rectangle',
    color: 'Fluorescent yellow-green and white',
    meaning:
      'The school-zone speed limit applies while the beacon flashes. Obey it exactly — speeding here carries doubled fines.',
    group: 'school',
  },

  // ---------- Railroad ----------
  {
    code: 'W10-1',
    name: 'Railroad Crossing Ahead',
    shape: 'Round',
    color: 'Yellow',
    meaning:
      'A railroad crossing is ahead. The circle is used only for this advance warning. Slow down, look and listen; never stop on the tracks.',
    group: 'railroad',
  },
  {
    code: 'R15-1',
    name: 'Railroad Crossbuck',
    shape: 'Crossbuck (X)',
    color: 'Black on white',
    meaning:
      'Marks the crossing itself. Yield to trains and stop no closer than 15 feet from the nearest rail; a sign below shows how many tracks you must clear.',
    group: 'railroad',
  },

  // ---------- Guide ----------
  {
    code: 'D1-1',
    name: 'Destination sign',
    shape: 'Horizontal rectangle',
    color: 'Green',
    meaning: 'Green signs give directions, distances, exits and destinations.',
    group: 'guide',
  },
  {
    code: 'D1-2',
    name: 'Destination sign (two lines)',
    shape: 'Horizontal rectangle',
    color: 'Green',
    meaning: 'Several destinations with the direction to each. Read them before the intersection, not at it.',
    group: 'guide',
  },
  {
    code: 'D1-3',
    name: 'Destination sign (three lines)',
    shape: 'Horizontal rectangle',
    color: 'Green',
    meaning: 'The same guidance for a junction serving three destinations.',
    group: 'guide',
  },
  {
    code: 'D3-1',
    name: 'Street Name',
    shape: 'Horizontal rectangle',
    color: 'Green',
    meaning: 'Names the cross street. Green is used for all guide information.',
    group: 'guide',
  },
  {
    code: 'E5-1',
    name: 'Exit Gore',
    shape: 'Horizontal rectangle',
    color: 'Green',
    meaning:
      'Marks the point where the exit ramp leaves the highway. Never cross the striped gore area to catch an exit you almost missed — go on to the next one.',
    group: 'guide',
  },

  // ---------- Route markers ----------
  {
    code: 'M1-1',
    name: 'Interstate Route marker',
    shape: 'Shield',
    color: 'Red, white and blue',
    meaning: 'Identifies an interstate highway. Even numbers generally run east-west, odd numbers north-south.',
    group: 'marker',
  },
  {
    code: 'M1-4',
    name: 'US Route marker',
    shape: 'Shield',
    color: 'Black and white',
    meaning: 'Identifies a US highway, such as US 9 or US 130 in New Jersey.',
    group: 'marker',
  },
  {
    code: 'M1-5',
    name: 'State Route marker',
    shape: 'Square with a circle',
    color: 'Black and white',
    meaning: 'Identifies a state highway, such as NJ Route 35.',
    group: 'marker',
  },
]

export const SIGN_BY_CODE: Record<string, SignSpec> = Object.fromEntries(
  SIGNS.map((s) => [s.code, s]),
)

/** Path to the prerendered artwork for a sign code. */
export function signUrl(code: string): string {
  return `${import.meta.env.BASE_URL}signs/${encodeURIComponent(code)}.svg`
}
