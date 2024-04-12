import { verbs } from '../../../data/verbs';

interface ShowVerbProps {
  index: number;
}

export default function ShowVerb(props: ShowVerbProps) {
  const { index } = props;
  return (
    <>
      <h1>{verbs[index].name}</h1>
    </>
  );
}
