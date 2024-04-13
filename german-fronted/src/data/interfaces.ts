export interface IMessage {
  message: string;
  error: boolean;
}

type Prefix = {
  prefix: string;
  prefixIndex: number[];
};

type Part = {
  subName: string;
  index: number[];
  image?: string;
};

export interface IVerb {
  name: string;
  index: number[];
  isWithHaben: boolean;
  prefix: null | Prefix;
  image: string;
  part1: Part[];
  part2: Part[];
  part3: Part;
}
