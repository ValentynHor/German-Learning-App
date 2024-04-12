export const sentsWithHaben = ['ich habe', 'er hat', 'sie hat', 'sie haben'];
export const sentsWithSein = ['ich bin', 'er is', 'sie ist', 'sie haben'];

export const pronouns = ['ich', 'er,sie,es', 'sie'];

export const verbs = [
  {
    name: 'essen',
    isWithHaben: true,
    index: [3, 4],
    picture: '',
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
        picture: '',
      },
      {
        subName: 'eine Banane',
        index: [3],
        picture: '',
      },
      {
        subName: 'ein Eis',
        index: [],
        picture: '',
      },
      {
        subName: 'eine Käse',
        index: [3],
        picture: '',
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
