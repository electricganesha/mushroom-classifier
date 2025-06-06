export type MushroomRow = string[]; // raw data: 23 features

export type EncodedSample = {
  input: Record<string, number>;
  output: { edible?: 1; poisonous?: 1 };
};

// Column names from UCI dataset:
export const COLUMN_NAMES = [
  "class",
  "cap-shape",
  "cap-surface",
  "cap-color",
  "bruises",
  "odor",
  "gill-attachment",
  "gill-spacing",
  "gill-size",
  "gill-color",
  "stalk-shape",
  "stalk-root",
  "stalk-surface-above-ring",
  "stalk-surface-below-ring",
  "stalk-color-above-ring",
  "stalk-color-below-ring",
  "veil-type",
  "veil-color",
  "ring-number",
  "ring-type",
  "spore-print-color",
  "population",
  "habitat",
];

export const featureOptions = {
  "cap-shape": [
    { label: "Bell", value: "b" },
    { label: "Conical", value: "c" },
    { label: "Convex", value: "x" },
    { label: "Flat", value: "f" },
    { label: "Knobbed", value: "k" },
    { label: "Sunken", value: "s" },
  ],
  "cap-surface": [
    { label: "Fibrous", value: "f" },
    { label: "Grooves", value: "g" },
    { label: "Scaly", value: "y" },
    { label: "Smooth", value: "s" },
  ],
  "cap-color": [
    { label: "Brown", value: "n" },
    { label: "Buff", value: "b" },
    { label: "Cinnamon", value: "c" },
    { label: "Gray", value: "g" },
    { label: "Green", value: "r" },
    { label: "Pink", value: "p" },
    { label: "Purple", value: "u" },
    { label: "Red", value: "e" },
    { label: "White", value: "w" },
    { label: "Yellow", value: "y" },
  ],
  bruises: [
    { label: "Bruises", value: "t" },
    { label: "No", value: "f" },
  ],
  odor: [
    { label: "Almond", value: "a" },
    { label: "Anise", value: "l" },
    { label: "Creosote", value: "c" },
    { label: "Fishy", value: "y" },
    { label: "Foul", value: "f" },
    { label: "Musty", value: "m" },
    { label: "None", value: "n" },
    { label: "Pungent", value: "p" },
    { label: "Spicy", value: "s" },
  ],
  "gill-attachment": [
    { label: "Attached", value: "a" },
    { label: "Descending", value: "d" },
    { label: "Free", value: "f" },
    { label: "Notched", value: "n" },
  ],
  "gill-spacing": [
    { label: "Close", value: "c" },
    { label: "Crowded", value: "w" },
    { label: "Distant", value: "d" },
  ],
  "gill-size": [
    { label: "Broad", value: "b" },
    { label: "Narrow", value: "n" },
  ],
  "gill-color": [
    { label: "Black", value: "k" },
    { label: "Brown", value: "n" },
    { label: "Buff", value: "b" },
    { label: "Chocolate", value: "h" },
    { label: "Gray", value: "g" },
    { label: "Green", value: "r" },
    { label: "Orange", value: "o" },
    { label: "Pink", value: "p" },
    { label: "Purple", value: "u" },
    { label: "Red", value: "e" },
    { label: "White", value: "w" },
    { label: "Yellow", value: "y" },
  ],
  "stalk-shape": [
    { label: "Enlarging", value: "e" },
    { label: "Tapering", value: "t" },
  ],
  "stalk-root": [
    { label: "Bulbous", value: "b" },
    { label: "Club", value: "c" },
    { label: "Cup", value: "u" },
    { label: "Equal", value: "e" },
    { label: "Rhizomorphs", value: "z" },
    { label: "Rooted", value: "r" },
    { label: "Missing", value: "?" },
  ],
  "stalk-surface-above-ring": [
    { label: "Fibrous", value: "f" },
    { label: "Scaly", value: "y" },
    { label: "Silky", value: "k" },
    { label: "Smooth", value: "s" },
  ],
  "stalk-surface-below-ring": [
    { label: "Fibrous", value: "f" },
    { label: "Scaly", value: "y" },
    { label: "Silky", value: "k" },
    { label: "Smooth", value: "s" },
  ],
  "stalk-color-above-ring": [
    { label: "Brown", value: "n" },
    { label: "Buff", value: "b" },
    { label: "Cinnamon", value: "c" },
    { label: "Gray", value: "g" },
    { label: "Orange", value: "o" },
    { label: "Pink", value: "p" },
    { label: "Red", value: "e" },
    { label: "White", value: "w" },
    { label: "Yellow", value: "y" },
  ],
  "stalk-color-below-ring": [
    { label: "Brown", value: "n" },
    { label: "Buff", value: "b" },
    { label: "Cinnamon", value: "c" },
    { label: "Gray", value: "g" },
    { label: "Orange", value: "o" },
    { label: "Pink", value: "p" },
    { label: "Red", value: "e" },
    { label: "White", value: "w" },
    { label: "Yellow", value: "y" },
  ],
  "veil-type": [
    { label: "Partial", value: "p" },
    { label: "Universal", value: "u" },
  ],
  "veil-color": [
    { label: "Brown", value: "n" },
    { label: "Orange", value: "o" },
    { label: "White", value: "w" },
    { label: "Yellow", value: "y" },
  ],
  "ring-number": [
    { label: "None", value: "n" },
    { label: "One", value: "o" },
    { label: "Two", value: "t" },
  ],
  "ring-type": [
    { label: "Cobwebby", value: "c" },
    { label: "Evanescent", value: "e" },
    { label: "Flaring", value: "f" },
    { label: "Large", value: "l" },
    { label: "None", value: "n" },
    { label: "Pendant", value: "p" },
    { label: "Sheathing", value: "s" },
    { label: "Zone", value: "z" },
  ],
  "spore-print-color": [
    { label: "Black", value: "k" },
    { label: "Brown", value: "n" },
    { label: "Buff", value: "b" },
    { label: "Chocolate", value: "h" },
    { label: "Green", value: "r" },
    { label: "Orange", value: "o" },
    { label: "Purple", value: "u" },
    { label: "White", value: "w" },
    { label: "Yellow", value: "y" },
  ],
  population: [
    { label: "Abundant", value: "a" },
    { label: "Clustered", value: "c" },
    { label: "Numerous", value: "n" },
    { label: "Scattered", value: "s" },
    { label: "Several", value: "v" },
    { label: "Solitary", value: "y" },
  ],
  habitat: [
    { label: "Grasses", value: "g" },
    { label: "Leaves", value: "l" },
    { label: "Meadows", value: "m" },
    { label: "Paths", value: "p" },
    { label: "Urban", value: "u" },
    { label: "Waste", value: "w" },
    { label: "Woods", value: "d" },
  ],
} as const;

export const featureKeys = Object.keys(featureOptions) as Array<
  keyof typeof featureOptions
>;

// Numeric encoding for each feature value (must match your training encoding)
export const featureValueMap = {
  "cap-shape": { b: 0, c: 0.2, x: 0.4, f: 0.6, k: 0.8, s: 1 },
  "cap-surface": { f: 0, g: 0.33, y: 0.66, s: 1 },
  "cap-color": {
    n: 0,
    b: 0.11,
    c: 0.22,
    g: 0.33,
    r: 0.44,
    p: 0.55,
    u: 0.66,
    e: 0.77,
    w: 0.88,
    y: 1,
  },
  bruises: { t: 1, f: 0 },
  odor: {
    a: 0,
    l: 0.125,
    c: 0.25,
    y: 0.375,
    f: 0.5,
    m: 0.625,
    n: 0.75,
    p: 0.875,
    s: 1,
  },
  "gill-attachment": { a: 0, d: 0.33, f: 0.66, n: 1 },
  "gill-spacing": { c: 0, w: 0.5, d: 1 },
  "gill-size": { b: 1, n: 0 },
  "gill-color": {
    k: 0,
    n: 0.09,
    b: 0.18,
    h: 0.27,
    g: 0.36,
    r: 0.45,
    o: 0.54,
    p: 0.63,
    u: 0.72,
    e: 0.81,
    w: 0.9,
    y: 1,
  },
  "stalk-shape": { e: 0, t: 1 },
  "stalk-root": { b: 0, c: 0.16, u: 0.33, e: 0.5, z: 0.66, r: 0.83, "?": 1 },
  "stalk-surface-above-ring": { f: 0, y: 0.33, k: 0.66, s: 1 },
  "stalk-surface-below-ring": { f: 0, y: 0.33, k: 0.66, s: 1 },
  "stalk-color-above-ring": {
    n: 0,
    b: 0.14,
    c: 0.28,
    g: 0.42,
    o: 0.57,
    p: 0.71,
    e: 0.85,
    w: 0.92,
    y: 1,
  },
  "stalk-color-below-ring": {
    n: 0,
    b: 0.14,
    c: 0.28,
    g: 0.42,
    o: 0.57,
    p: 0.71,
    e: 0.85,
    w: 0.92,
    y: 1,
  },
  "veil-type": { p: 0, u: 1 },
  "veil-color": { n: 0, o: 0.33, w: 0.66, y: 1 },
  "ring-number": { n: 0, o: 0.5, t: 1 },
  "ring-type": {
    c: 0,
    e: 0.14,
    f: 0.28,
    l: 0.42,
    n: 0.57,
    p: 0.71,
    s: 0.85,
    z: 1,
  },
  "spore-print-color": {
    k: 0,
    n: 0.13,
    b: 0.25,
    h: 0.38,
    r: 0.5,
    o: 0.63,
    u: 0.75,
    w: 0.88,
    y: 1,
  },
  population: { a: 0, c: 0.2, n: 0.4, s: 0.6, v: 0.8, y: 1 },
  habitat: { g: 0, l: 0.16, m: 0.33, p: 0.5, u: 0.66, w: 0.83, d: 1 },
} as const;
