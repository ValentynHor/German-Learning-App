import { IVerb } from '../../../../data/interfaces';
import VerbsFormUnitWithImg from './UnitVerbsFormWithImg';

interface Part2Props {
  unitName: string;

  isUpdate?: boolean;
  valueName?: any;
  valueIndex?: any;
  setNewVerb: (data: any) => void;
  setUpdatedVerb: (data: any) => void;
  newVerb?: any;
  updatedVerb?: any;
  part2Num?: number;
  ind?: number;
}

export default function Part2(props: Part2Props) {
  const {
    isUpdate,
    setNewVerb,
    setUpdatedVerb,
    newVerb,
    updatedVerb,
    ind,
    unitName,
  } = props;
  return (
    <VerbsFormUnitWithImg
      key={ind}
      unitName={unitName}
      placeholder="einen Apfel"
      isUpdate={isUpdate}
      setNewVerb={setNewVerb}
      setUpdatedVerb={setUpdatedVerb}
      newVerb={newVerb}
      updatedVerb={updatedVerb}
      valueName={newVerb.part2[ind!] ? newVerb.part2[ind!].subName : ''}
      valueIndex={newVerb.part2[ind!] ? newVerb.part2[ind!].index : ''}
      part2Num={ind}
    />
  );
}
