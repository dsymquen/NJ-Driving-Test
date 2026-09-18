export type CategoryId =
  | 'signs'
  | 'signals'
  | 'rules'
  | 'rightofway'
  | 'safety'
  | 'alcohol'
  | 'license'
  | 'parking'

export interface Category {
  id: CategoryId
  name: string
  short: string
  blurb: string
  /** Roughly how many of the 50 real exam questions come from this area. */
  examWeight: number
}

export interface Question {
  id: string
  category: CategoryId
  prompt: string
  choices: string[]
  /** Index into `choices`. */
  answer: number
  explanation: string
  /** Optional road-sign graphic shown with the question. */
  sign?: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'signs',
    name: 'Road signs, shapes & colors',
    short: 'Road signs',
    blurb: 'Shapes and colors tell you what a sign means before you can read it.',
    examWeight: 10,
  },
  {
    id: 'signals',
    name: 'Traffic signals & pavement markings',
    short: 'Signals & markings',
    blurb: 'Lights, arrows, yellow and white lines, crosswalks and stop lines.',
    examWeight: 6,
  },
  {
    id: 'rules',
    name: 'Rules of the road & speed limits',
    short: 'Rules & speed',
    blurb: 'NJ speed limits, passing, turning, signaling and lane use.',
    examWeight: 9,
  },
  {
    id: 'rightofway',
    name: 'Right of way & intersections',
    short: 'Right of way',
    blurb: 'Who goes first at stops, circles, ramps and uncontrolled intersections.',
    examWeight: 6,
  },
  {
    id: 'safety',
    name: 'Safe driving & emergencies',
    short: 'Safe driving',
    blurb: 'Following distance, bad weather, skids, breakdowns and crashes.',
    examWeight: 8,
  },
  {
    id: 'alcohol',
    name: 'Alcohol, drugs & penalties',
    short: 'Alcohol & penalties',
    blurb: 'BAC limits, implied consent, points, fines and suspensions.',
    examWeight: 5,
  },
  {
    id: 'license',
    name: 'Licensing, GDL & paperwork',
    short: 'Licensing & GDL',
    blurb: 'Permits, red decals, curfews, insurance, inspection and renewals.',
    examWeight: 3,
  },
  {
    id: 'parking',
    name: 'Parking & sharing the road',
    short: 'Parking & sharing',
    blurb: 'Parking distances, hills, school buses, trucks, bikes and pedestrians.',
    examWeight: 3,
  },
]

export const CATEGORY_BY_ID: Record<CategoryId, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>
