export interface IMessage {
  message: string;
  error: boolean;
}

type Prefix = {
  prefix: string;
  prefixIndex: number[] | string;
};

export type Part = {
  subName: string;
  index: number[] | string;
  image?: string | undefined;
};

export interface IVerb {
  id?: string;
  name: string;
  index: number[] | string;
  withHaben: boolean;
  prefix: null | Prefix;
  image: string;
  part1: Part[];
  part2: Part[];
  part3: Part;
}
