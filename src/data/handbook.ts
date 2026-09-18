export interface Fact {
  /** Prompt side of the flashcard. */
  label: string
  /** Answer side. */
  value: string
  note?: string
}

export interface HandbookSection {
  id: string
  title: string
  summary: string
  facts: Fact[]
}

export const HANDBOOK: HandbookSection[] = [
  {
    id: 'speeds',
    title: 'NJ speed limits',
    summary:
      'These are the limits that apply when nothing is posted. A posted sign always wins, and you must still drive slowly enough for conditions.',
    facts: [
      { label: 'School zone, business or residential district', value: '25 mph' },
      { label: 'Suburban business and residential districts', value: '35 mph' },
      { label: 'Rural roadway with no posted limit', value: '50 mph' },
      { label: 'Most state highways and interstates', value: '55 mph' },
      { label: 'Highest posted limit in New Jersey', value: '65 mph', note: 'Only on certain interstates and freeways.' },
      { label: 'Passing a school bus loading in front of a school', value: '10 mph maximum' },
      { label: 'Fines are doubled in', value: 'School zones, safe corridors and construction zones' },
    ],
  },
  {
    id: 'distances',
    title: 'Distances to memorize',
    summary: 'Nearly every NJ knowledge test includes a few "how many feet" questions. These are the ones that show up.',
    facts: [
      { label: 'No parking within ___ of a fire hydrant', value: '10 feet' },
      { label: 'No parking within ___ of a crosswalk or stop sign', value: '25 feet' },
      { label: 'No parking within ___ of a railroad crossing', value: '50 feet' },
      { label: 'No parking within ___ of a fire station driveway (same side)', value: '20 feet' },
      { label: 'No parking within ___ of a fire station driveway (opposite side)', value: '75 feet' },
      { label: 'Signal before turning or changing lanes', value: 'At least 100 feet' },
      { label: 'No passing within ___ of an intersection, bridge, tunnel or railroad crossing', value: '100 feet' },
      { label: 'Stop for a school bus with flashing red lights', value: 'At least 25 feet away' },
      { label: 'Stop no closer than ___ to the nearest rail at a crossing', value: '15 feet' },
      { label: 'Dim high beams for oncoming traffic within', value: '500 feet' },
      { label: 'Dim high beams when following a vehicle within', value: '300 feet' },
      { label: 'Do not follow an emergency vehicle closer than', value: '300 feet' },
      { label: 'Headlights required when visibility is less than', value: '500 feet' },
      { label: 'U-turn illegal near a hill crest if you cannot be seen for', value: '500 feet' },
      { label: 'Minimum space when passing a bicyclist', value: '4 feet' },
      { label: 'Parallel parking: distance from the curb', value: 'Within 6 inches' },
    ],
  },
  {
    id: 'shapes',
    title: 'Sign shapes & colors',
    summary: 'Shape and color tell you the message before you can read the words — which is exactly what the test asks about.',
    facts: [
      { label: 'Octagon (8 sides)', value: 'Stop' },
      { label: 'Downward triangle', value: 'Yield' },
      { label: 'Pennant (sideways triangle, left side of road)', value: 'No passing zone' },
      { label: 'Diamond', value: 'Warning of a hazard ahead' },
      { label: 'Pentagon (5 sides)', value: 'School zone / school crossing' },
      { label: 'Round', value: 'Railroad crossing ahead' },
      { label: 'Crossbuck (X)', value: 'At the railroad crossing itself' },
      { label: 'Vertical rectangle', value: 'Regulatory — states the law' },
      { label: 'Horizontal rectangle', value: 'Guide / directional information' },
      { label: 'Red', value: 'Stop or prohibited' },
      { label: 'Yellow', value: 'General warning' },
      { label: 'Orange', value: 'Construction and maintenance' },
      { label: 'Green', value: 'Directions, distances, exits' },
      { label: 'Blue', value: 'Motorist services' },
      { label: 'Brown', value: 'Recreation and cultural interest' },
      { label: 'Fluorescent yellow-green', value: 'Pedestrian, bicycle and school warnings' },
      { label: 'White with black letters', value: 'Regulatory (speed limits, turn rules)' },
    ],
  },
  {
    id: 'markings',
    title: 'Signals & pavement markings',
    summary: 'Yellow separates opposing traffic; white separates traffic going the same way.',
    facts: [
      { label: 'Steady yellow light', value: 'Red is next — stop if you can do so safely' },
      { label: 'Flashing red light', value: 'Treat as a stop sign: full stop, then go when safe' },
      { label: 'Flashing yellow light', value: 'Slow down, proceed with caution' },
      { label: 'Green arrow', value: 'Protected turn in that direction; still yield to pedestrians' },
      { label: 'Red arrow', value: 'No turn at all until it changes' },
      { label: 'Flashing yellow arrow', value: 'Turn permitted after yielding to oncoming traffic' },
      { label: 'Dark / dead signal', value: 'Treat the intersection as a four-way stop' },
      { label: 'Solid yellow on your side', value: 'No passing' },
      { label: 'Broken yellow on your side', value: 'Passing allowed when safe' },
      { label: 'Double solid yellow', value: 'No passing either direction (turns into driveways allowed)' },
      { label: 'Solid white line', value: 'Lane changes discouraged' },
      { label: 'Broken white line', value: 'Lane changes permitted' },
      { label: 'Right turn on red in NJ', value: 'Legal after a full stop unless a sign prohibits it' },
    ],
  },
  {
    id: 'gdl',
    title: 'Graduated Driver License (GDL)',
    summary: 'New Jersey phases in driving privileges. Permit and probationary drivers live by extra rules.',
    facts: [
      { label: 'Special Learner’s Permit age', value: '16, with an approved driver training course' },
      { label: 'Examination Permit age', value: '17' },
      { label: 'Red reflective decals', value: 'Required on front and rear plates (Kyleigh’s Law)' },
      { label: 'GDL driving curfew', value: '11:01 p.m. to 5 a.m.' },
      { label: 'GDL passenger limit', value: 'One additional passenger, unless a parent/guardian is along' },
      { label: 'Cell phone use for GDL drivers', value: 'Prohibited entirely — hands-free included' },
      { label: 'Supervising driver requirements', value: 'At least 21, licensed, with 3+ years of driving experience' },
      { label: 'Minimum supervised practice before the road test', value: '6 months' },
      { label: 'Seat belts', value: 'Required for the driver and every passenger' },
      { label: 'Probationary period before a basic license', value: 'At least one year' },
    ],
  },
  {
    id: 'alcohol',
    title: 'Alcohol, drugs & points',
    summary: 'Only time removes alcohol from your body. Nothing else works.',
    facts: [
      { label: 'BAC limit, age 21 and over', value: '0.08%' },
      { label: 'BAC limit, under 21 (zero tolerance)', value: '0.01%' },
      { label: 'BAC limit, commercial drivers', value: '0.04%' },
      { label: 'Time to eliminate one standard drink', value: 'About one hour' },
      { label: 'Implied consent', value: 'Refusing a breath test brings its own fines, forfeiture and interlock' },
      { label: 'First thing alcohol impairs', value: 'Judgment and self-control' },
      { label: 'Points that trigger suspension', value: '12 or more' },
      { label: 'Points that trigger a surcharge', value: '6 or more within three years' },
      { label: 'Point credit for a clean year', value: '3 points removed per violation-free year' },
      { label: 'Open container in the passenger area', value: 'Illegal for driver and passengers' },
      { label: 'Cannabis and prescription drugs', value: 'Driving impaired by any drug is a DWI' },
    ],
  },
  {
    id: 'safety',
    title: 'Safe driving numbers',
    summary: 'Space and speed are the two things you always control.',
    facts: [
      { label: 'Following distance in good conditions', value: 'Two-second rule' },
      { label: 'Following distance in rain, snow or fog', value: 'Four seconds or more' },
      { label: 'Hydroplaning can begin at', value: 'About 35 mph with worn tires' },
      { label: 'Doubling your speed multiplies braking distance by', value: 'About four times' },
      { label: 'Correct skid response', value: 'Steer where you want to go, ease off the gas, do not brake hard' },
      { label: 'Correct ABS panic stop', value: 'Press firmly and hold while steering' },
      { label: 'Slipperiest moment', value: 'Just as rain or snow begins' },
      { label: 'Where ice forms first', value: 'Bridges, overpasses and shaded spots' },
      { label: 'In fog, use', value: 'Low beams, not high beams' },
      { label: 'Only cure for drowsiness', value: 'Stop and sleep, or change drivers' },
    ],
  },
  {
    id: 'paperwork',
    title: 'Paperwork & deadlines',
    summary: 'Small deadlines that make easy test questions.',
    facts: [
      { label: 'Knowledge test format', value: '50 questions; 40 correct (80%) to pass' },
      { label: 'Report a crash in writing if no police report and damage over $500', value: 'Within 10 days' },
      { label: 'Report a crash with injury or death', value: 'Immediately, and stay at the scene' },
      { label: 'License renewal cycle', value: 'Every 4 years' },
      { label: 'Vehicle inspection cycle', value: 'Every 2 years (new cars exempt 5 years)' },
      { label: 'Notify MVC of an address change within', value: 'One month' },
      { label: 'New residents must transfer an out-of-state license within', value: '60 days' },
      { label: 'Always carry', value: 'License, registration and insurance card' },
      { label: 'Driving uninsured (first offense)', value: 'Fine, community service and one-year suspension' },
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing the road',
    summary: 'School buses, trucks, bikes and pedestrians have their own rules — and they show up on the test.',
    facts: [
      { label: 'School bus with flashing red lights, undivided road', value: 'Stop at least 25 feet away, both directions' },
      { label: 'School bus across a raised median or safety island', value: 'No stop required — slow to 10 mph' },
      { label: 'Pedestrian in a marked crosswalk', value: 'Stop and remain stopped' },
      { label: 'Pedestrian with a white cane or guide dog', value: 'Always yield; never sound your horn' },
      { label: 'Walking where there is no sidewalk', value: 'Walk facing traffic, on the left' },
      { label: 'Passing a bicyclist', value: 'At least 4 feet, or slow to 25 mph' },
      { label: 'Large truck blind spots', value: 'Called "No Zones" — never linger beside or behind' },
      { label: 'Truck making a right turn', value: 'It swings left first — never pass on its right' },
      { label: 'Stopped emergency or tow vehicle with flashing lights', value: 'Move over a lane, or slow below the limit' },
      { label: 'Bus signaling to leave a bus stop', value: 'Yield to it' },
      { label: 'Parking uphill with a curb', value: 'Wheels away from the curb' },
      { label: 'Parking downhill with a curb', value: 'Wheels toward the curb' },
    ],
  },
]

export const ALL_FACTS: { section: string; fact: Fact }[] = HANDBOOK.flatMap((s) =>
  s.facts.map((fact) => ({ section: s.title, fact })),
)
