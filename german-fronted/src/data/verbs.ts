import { IVerb } from './interfaces';

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

export const verbs: IVerb[] = [
  {
    name: 'essen',
    withHaben: true,
    index: [3, 4],
    prefix: null,
    image: 'essen0',
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
        image: 'essen1',
      },
      {
        subName: 'eine Banane',
        index: [3],
        image: 'essen2',
      },
      {
        subName: 'ein Eis',
        index: [],
        image: 'essen3',
      },
      {
        subName: 'einen Käse',
        index: [3],
        image: 'essen4',
      },
    ],
    part3: { subName: 'gegessen', index: [0, 1] },
  },
  {
    name: 'klettern',
    index: [7],
    withHaben: false,
    prefix: null,
    image: 'klettern0',
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
        image: 'klettern1',
      },
      {
        subName: 'auf die Mauer',
        index: [4, 5, 6],
        image: 'klettern2',
      },
    ],
    part3: { subName: 'geklettert', index: [0, 1] },
  },
  {
    name: 'anziehen',
    index: [6, 7],
    withHaben: true,
    image: 'anziehen0',
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
        image: 'anziehen1',
      },
    ],
    part3: { subName: 'angezogen', index: [2, 3] },
  },
];
