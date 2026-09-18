export type SignShape =
  | 'octagon'
  | 'triangleDown'
  | 'diamond'
  | 'pennant'
  | 'pentagon'
  | 'circle'
  | 'crossbuck'
  | 'rectV'
  | 'rectH'
  | 'square'

export type SignPalette =
  | 'red'
  | 'yellow'
  | 'orange'
  | 'green'
  | 'blue'
  | 'white'
  | 'brown'
  | 'yellowgreen'
  | 'black'

export type SignGroup =
  | 'regulatory'
  | 'warning'
  | 'construction'
  | 'guide'
  | 'services'
  | 'school'
  | 'railroad'

export interface SignSpec {
  id: string
  name: string
  shape: SignShape
  palette: SignPalette
  /** Text rendered inside the sign face. */
  lines?: string[]
  /** Simple vector symbol rendered inside the sign face. */
  glyph?: string
  meaning: string
  group: SignGroup
}

export const SIGNS: SignSpec[] = [
  // ---------- Regulatory ----------
  {
    id: 'stop',
    name: 'Stop',
    shape: 'octagon',
    palette: 'red',
    lines: ['STOP'],
    meaning:
      'Come to a full stop at the stop line, crosswalk or before entering the intersection. Yield to pedestrians and cross traffic, then go when it is safe.',
    group: 'regulatory',
  },
  {
    id: 'yield',
    name: 'Yield',
    shape: 'triangleDown',
    palette: 'red',
    lines: ['YIELD'],
    meaning:
      'Slow down and give the right of way to traffic and pedestrians ahead. Stop if necessary — the downward triangle is used only for yield.',
    group: 'regulatory',
  },
  {
    id: 'do-not-enter',
    name: 'Do Not Enter',
    shape: 'square',
    palette: 'red',
    glyph: 'doNotEnter',
    meaning:
      'Do not drive into this roadway — it is an exit ramp, a one-way street coming at you, or a closed road.',
    group: 'regulatory',
  },
  {
    id: 'wrong-way',
    name: 'Wrong Way',
    shape: 'rectH',
    palette: 'red',
    lines: ['WRONG', 'WAY'],
    meaning:
      'You are traveling against traffic. Pull over safely, stop and turn around immediately.',
    group: 'regulatory',
  },
  {
    id: 'speed-limit',
    name: 'Speed Limit',
    shape: 'rectV',
    palette: 'white',
    lines: ['SPEED', 'LIMIT', '25'],
    meaning:
      'The maximum legal speed in ideal conditions. In bad weather or heavy traffic the safe speed is lower, and NJ requires you to drive at a safe speed regardless of the posted number.',
    group: 'regulatory',
  },
  {
    id: 'no-parking',
    name: 'No Parking',
    shape: 'rectV',
    palette: 'white',
    glyph: 'noParking',
    meaning: 'Parking is prohibited here. You may still stop briefly to obey traffic or let a passenger out where allowed.',
    group: 'regulatory',
  },
  {
    id: 'no-u-turn',
    name: 'No U-Turn',
    shape: 'rectV',
    palette: 'white',
    glyph: 'noUTurn',
    meaning: 'U-turns are prohibited at this location.',
    group: 'regulatory',
  },
  {
    id: 'no-left-turn',
    name: 'No Left Turn',
    shape: 'rectV',
    palette: 'white',
    glyph: 'noLeftTurn',
    meaning: 'Left turns are prohibited here. Continue and find a legal place to turn around.',
    group: 'regulatory',
  },
  {
    id: 'one-way',
    name: 'One Way',
    shape: 'rectH',
    palette: 'black',
    glyph: 'oneWay',
    meaning: 'Traffic flows only in the direction of the arrow.',
    group: 'regulatory',
  },
  {
    id: 'keep-right',
    name: 'Keep Right',
    shape: 'rectV',
    palette: 'white',
    glyph: 'keepRight',
    meaning: 'Stay to the right of the island, median or obstruction ahead.',
    group: 'regulatory',
  },
  {
    id: 'no-turn-on-red',
    name: 'No Turn On Red',
    shape: 'rectV',
    palette: 'white',
    lines: ['NO', 'TURN', 'ON RED'],
    meaning:
      'Right on red is normally legal in New Jersey after a full stop, but not where this sign is posted. Wait for a green light.',
    group: 'regulatory',
  },
  {
    id: 'hov',
    name: 'HOV Lane',
    shape: 'rectV',
    palette: 'white',
    lines: ['HOV 2+', 'ONLY'],
    meaning: 'High-occupancy vehicle lane — only vehicles carrying the posted number of people may use it during the posted hours.',
    group: 'regulatory',
  },

  // ---------- Warning ----------
  {
    id: 'curve-right',
    name: 'Curve ahead',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'curveRight',
    meaning: 'The road curves in the direction shown. Slow down before you enter the curve.',
    group: 'warning',
  },
  {
    id: 'sharp-turn-right',
    name: 'Sharp turn (right angle)',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'sharpTurn',
    meaning: 'A sharp right-angle turn is ahead. Reduce speed well before the turn.',
    group: 'warning',
  },
  {
    id: 'slippery',
    name: 'Slippery when wet',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'slippery',
    meaning: 'The road is slippery in rain, snow or ice. Slow down, avoid sudden braking and steering.',
    group: 'warning',
  },
  {
    id: 'signal-ahead',
    name: 'Traffic signal ahead',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'signalAhead',
    meaning: 'A traffic light is ahead, often hidden by a curve or hill. Be ready to stop.',
    group: 'warning',
  },
  {
    id: 'stop-ahead',
    name: 'Stop sign ahead',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'stopAhead',
    meaning: 'A stop sign is ahead — slow down now so you can stop at the line.',
    group: 'warning',
  },
  {
    id: 'yield-ahead',
    name: 'Yield ahead',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'yieldAhead',
    meaning: 'A yield sign is ahead. Prepare to give the right of way.',
    group: 'warning',
  },
  {
    id: 'merge',
    name: 'Merging traffic',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'merge',
    meaning: 'Traffic from another roadway is joining yours. Adjust speed or change lanes to let vehicles merge.',
    group: 'warning',
  },
  {
    id: 'divided-begins',
    name: 'Divided highway begins',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'divided',
    meaning: 'The road ahead is split by a median. Keep right of the divider.',
    group: 'warning',
  },
  {
    id: 'two-way',
    name: 'Two-way traffic',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'twoWay',
    meaning: 'The one-way roadway ends ahead and you will meet oncoming traffic. Do not pass unless markings allow it.',
    group: 'warning',
  },
  {
    id: 'lane-ends',
    name: 'Right lane ends',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'laneEnds',
    meaning: 'The road narrows ahead. Merge early and take turns with other drivers.',
    group: 'warning',
  },
  {
    id: 'crossroad',
    name: 'Crossroad ahead',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'crossroad',
    meaning: 'A four-way intersection is ahead. Watch for traffic entering from either side.',
    group: 'warning',
  },
  {
    id: 'side-road',
    name: 'Side road ahead',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'sideRoad',
    meaning: 'Another road joins yours from the side. Watch for vehicles entering.',
    group: 'warning',
  },
  {
    id: 't-intersection',
    name: 'T-intersection',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'tIntersection',
    meaning: 'The road you are on ends ahead. You must turn right or left — slow down and yield to traffic on the through road.',
    group: 'warning',
  },
  {
    id: 'traffic-circle',
    name: 'Traffic circle / roundabout ahead',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'circleArrows',
    meaning: 'A traffic circle is ahead. Slow down and be ready to yield to traffic already in the circle.',
    group: 'warning',
  },
  {
    id: 'steep-hill',
    name: 'Steep hill / downgrade',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'hill',
    meaning: 'A steep downgrade is ahead. Shift to a lower gear instead of riding the brakes.',
    group: 'warning',
  },
  {
    id: 'narrow-bridge',
    name: 'Narrow bridge',
    shape: 'diamond',
    palette: 'yellow',
    glyph: 'narrowBridge',
    meaning: 'The bridge ahead is barely wide enough for two lanes. Slow down and stay centered in your lane.',
    group: 'warning',
  },
  {
    id: 'dead-end',
    name: 'Dead end',
    shape: 'diamond',
    palette: 'yellow',
    lines: ['DEAD', 'END'],
    meaning: 'The road ahead has no outlet — you will have to turn around.',
    group: 'warning',
  },
  {
    id: 'no-passing-zone',
    name: 'No passing zone',
    shape: 'pennant',
    palette: 'yellow',
    lines: ['NO', 'PASSING', 'ZONE'],
    meaning:
      'Posted on the LEFT side of the road at the start of a no-passing zone. The pennant shape is used only for this sign.',
    group: 'warning',
  },
  {
    id: 'pedestrian-crossing',
    name: 'Pedestrian crossing',
    shape: 'diamond',
    palette: 'yellowgreen',
    glyph: 'pedestrian',
    meaning:
      'People are crossing ahead. Fluorescent yellow-green is used for pedestrian, bicycle and school warnings.',
    group: 'warning',
  },
  {
    id: 'bicycle-crossing',
    name: 'Bicycle crossing',
    shape: 'diamond',
    palette: 'yellowgreen',
    glyph: 'bike',
    meaning: 'Bicyclists cross or share the road ahead. Give riders at least four feet when passing in New Jersey.',
    group: 'warning',
  },

  // ---------- School ----------
  {
    id: 'school-zone',
    name: 'School zone',
    shape: 'pentagon',
    palette: 'yellowgreen',
    glyph: 'schoolCrossing',
    meaning:
      'A school or school crossing is ahead. The five-sided pentagon is used only for school signs; the NJ school-zone speed limit is 25 mph and fines are doubled.',
    group: 'school',
  },

  // ---------- Railroad ----------
  {
    id: 'rr-advance',
    name: 'Railroad crossing ahead',
    shape: 'circle',
    palette: 'yellow',
    glyph: 'rrAdvance',
    meaning:
      'A railroad crossing is ahead. The round shape is used only for advance railroad warning. Slow, look and listen.',
    group: 'railroad',
  },
  {
    id: 'crossbuck',
    name: 'Railroad crossbuck',
    shape: 'crossbuck',
    palette: 'white',
    meaning:
      'Marks the crossing itself. Yield to trains; if there is more than one track a small sign below shows the number of tracks.',
    group: 'railroad',
  },

  // ---------- Construction ----------
  {
    id: 'road-work',
    name: 'Road work ahead',
    shape: 'diamond',
    palette: 'orange',
    lines: ['ROAD', 'WORK', 'AHEAD'],
    meaning:
      'Orange means a construction or maintenance zone. Slow down — NJ work-zone fines are doubled and workers may be close to traffic.',
    group: 'construction',
  },
  {
    id: 'flagger',
    name: 'Flagger ahead',
    shape: 'diamond',
    palette: 'orange',
    glyph: 'workers',
    meaning: 'A person is directing traffic ahead. Obey the flagger even if it conflicts with signs or signals.',
    group: 'construction',
  },
  {
    id: 'detour',
    name: 'Detour',
    shape: 'rectH',
    palette: 'orange',
    glyph: 'detour',
    meaning: 'The road ahead is closed. Follow the marked detour route.',
    group: 'construction',
  },

  // ---------- Guide & services ----------
  {
    id: 'guide-exit',
    name: 'Guide sign (green)',
    shape: 'rectH',
    palette: 'green',
    lines: ['EXIT 14', 'NORTH'],
    meaning: 'Green signs give directions, distances, exits and route information.',
    group: 'guide',
  },
  {
    id: 'services-hospital',
    name: 'Motorist services (blue)',
    shape: 'rectV',
    palette: 'blue',
    lines: ['H'],
    meaning: 'Blue signs point to motorist services — hospitals, rest areas, food, fuel, lodging and phones.',
    group: 'services',
  },
  {
    id: 'recreation',
    name: 'Recreation / cultural interest (brown)',
    shape: 'rectH',
    palette: 'brown',
    lines: ['STATE', 'PARK'],
    meaning: 'Brown signs mark parks, historic sites, campgrounds and other recreational or cultural areas.',
    group: 'guide',
  },
]

export const SIGN_BY_ID: Record<string, SignSpec> = Object.fromEntries(
  SIGNS.map((s) => [s.id, s]),
)
