export const sentsWithHaben = [
  { name: 'habe', index: [0, 1, 2, 3] },
  { name: 'hat', index: [0, 1, 2] },
  { name: 'haben', index: [0, 1, 2, 3, 4] },
];
export const sentsWithSein = [
  { name: 'bin', index: [0, 1, 2] },
  { name: 'ist', index: [0, 1, 2] },
  { name: 'sind', index: [0, 1, 2, 3] },
];

export const pronouns = ['ich', 'er,sie,es', 'sie'];

/* export const verbs = [
  { name: 'gehen' },
  { name: 'kommen' },
  { name: 'sprechen' },
  { name: 'essen' },
  { name: 'trinken' },
  { name: 'sehen' },
  { name: 'schlafen' },
  { name: 'lesen' },
  { name: 'spielen' },
  { name: 'lernen' },
  { name: 'laufen' },
  { name: 'arbeiten' },
  { name: 'tanzen' },
  { name: 'fahren' },
  { name: 'springen' },
  { name: 'hören' },
  { name: 'schreiben' },
  { name: 'verstehen' },
  { name: 'finden' },
  { name: 'machen' },
  { name: 'bleiben' },
  { name: 'geben' },
  { name: 'nehmen' },
  { name: 'stellen' },
  { name: 'sitzen' },
  { name: 'stehen' },
  { name: 'legen' },
  { name: 'fliegen' },
  { name: 'kaufen' },
  { name: 'fahren' },
  { name: 'gehen' },
  { name: 'kommen' },
  { name: 'sprechen' },
  { name: 'essen' },
  { name: 'trinken' },
  { name: 'sehen' },
  { name: 'schlafen' },
  { name: 'lesen' },
  { name: 'spielen' },
  { name: 'lernen' },
  { name: 'laufen' },
  { name: 'arbeiten' },
  { name: 'tanzen' },
  { name: 'fahren' },
  { name: 'springen' },
  { name: 'hören' },
  { name: 'schreiben' },
  { name: 'verstehen' },
  { name: 'finden' },
  { name: 'machen' },
  { name: 'bleiben' },
  { name: 'geben' },
  { name: 'nehmen' },
  { name: 'stellen' },
  { name: 'sitzen' },
  { name: 'stehen' },
  { name: 'legen' },
  { name: 'fliegen' },
  { name: 'kaufen' },
  { name: 'fahren' },
]; */

type Prefix = {
  prefix: string;
  prefixIndex: number[];
};

type Part = {
  subName: string;
  index: number[];
};

export interface IVerbs {
  name: string;
  index: number[];
  isWithHaben: boolean;
  prefix: null | Prefix;
  part1: Part[];
  part2: Part[];
  part3: Part;
}

export const verbs: IVerbs[] = [
  {
    name: 'essen',
    isWithHaben: true,
    index: [3, 4],
    prefix: null,
    part1: [
      {
        subName: 'esse',
        index: [3],
      },
      {
        subName: 'isst',
        index: [1, 2],
      },
      {
        subName: 'essen',
        index: [3, 4],
      },
    ],
    part2: [
      {
        subName: 'einen Apfel',
        index: [3, 4],
      },
      {
        subName: 'eine Banane',
        index: [3],
      },
      {
        subName: 'ein Eis',
        index: [],
      },
      {
        subName: 'eine Käse',
        index: [3],
      },
    ],
    part3: { subName: 'gegessen', index: [0, 1] },
  },
  {
    name: 'klettern',
    index: [7],
    isWithHaben: false,
    prefix: null,
    part1: [
      {
        subName: 'klettere',
        index: [7],
      },
      {
        subName: 'klettert',
        index: [7],
      },
      {
        subName: 'klettern',
        index: [7],
      },
    ],
    part2: [
      {
        subName: 'auf den Baum',
        index: [4, 5, 6],
      },
      {
        subName: 'auf die Mauer',
        index: [4, 5, 6],
      },
    ],
    part3: { subName: 'geklettert', index: [0, 1] },
  },
  {
    name: 'anziehen',
    index: [6, 7],
    isWithHaben: true,
    prefix: {
      prefix: 'an',
      prefixIndex: [0, 1],
    },

    part1: [
      {
        subName: 'ziehe',
        index: [4],
      },
      {
        subName: 'zieht',
        index: [4],
      },
      {
        subName: 'ziehen',
        index: [4, 5],
      },
    ],
    part2: [
      {
        subName: 'eine Jacke',
        index: [3],
      },
    ],
    part3: { subName: 'angezogen', index: [2, 3] },
  },
];
