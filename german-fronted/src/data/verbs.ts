export const sentsWithHaben = ['ich habe', 'er hat', 'sie hat', 'sie haben'];
export const sentsWithSein = ['ich bin', 'er is', 'sie ist', 'sie haben'];

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

export const verbs = [
  {
    name: 'essen',
    isWithHaben: true,
    index: [3, 4],
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
    part3: ['gegessen'],
  },
  {
    name: 'klettern',
    index: [7],
    picture: '',
    isWithHaben: false,
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
        picture: '',
      },
      {
        subName: 'auf die Mauer',
        index: [4, 5, 6],
        picture: '',
      },
    ],
    part3: ['geklettert'],
  },
];
