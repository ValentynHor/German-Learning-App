import { IVerb } from '../../../../data/interfaces';
import { verbs } from '../../../../data/verbs';
import { parseString } from '../verbsEditing/VerbsFormModal';
import styles from './verbsFormModal.module.css';

type UnitVerbsForm = {
  name: string;
  index: string;
};

type UnitVerbsFormProps = {
  unitName: string;
  placeholder: string;
  verbNumber: number;
  setVerbData: (data: UnitVerbsForm[]) => void;
  isUpdate?: boolean;
  verb?: IVerb;
  valueName?: any;
  valueIndex?: any;
  setTempData2?: (data: any) => void;
  setNewVerb: (data: any) => void;
  setUpdatedVerb: (data: any) => void;
  newVerb?: any;
  updatedVerb?: any;
  part2Num?: number;
};

export default function VerbsFormUnit(props: UnitVerbsFormProps) {
  const {
    verbNumber,
    setVerbData,
    placeholder,
    setTempData2,
    verb,
    isUpdate,
    updatedVerb,
    setNewVerb,
    setUpdatedVerb,
    newVerb,
    part2Num,
  } = props;
  let { unitName, valueName, valueIndex } = props;

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
    n: string
  ) => {
    let newUpdatedVerb = { ...updatedVerb };
    let newNewVerb = { ...newVerb };
    switch (unitName) {
      case 'PII ': {
        const part3 = { ...newUpdatedVerb.part3 };
        const newPart3 = { ...newNewVerb.part3 };
        if (n === 'name') {
          part3.subName = event.target.value;
          newPart3.subName = event.target.value;
        } else {
          part3.index = event.target.value;
          newPart3.index = event.target.value;
        }
        newUpdatedVerb = { ...newUpdatedVerb, part3: part3 };
        newNewVerb = { ...newNewVerb, part3: newPart3 };
        break;
      }
      case '1.P ': {
        const part1 = { ...newUpdatedVerb.part1 };
        const newPart1 = { ...newNewVerb.part1 };
        if (n === 'name') {
          part1[2].subName = event.target.value;
          newPart1[2].subName = event.target.value;
        } else {
          part1[2].index = event.target.value;
          newPart1[2].index = event.target.value;
        }
        newUpdatedVerb = { ...newUpdatedVerb, part1: part1 };
        newNewVerb = { ...newNewVerb, part1: newPart1 };
        break;
      }
      case '3.S ': {
        const part1 = { ...newUpdatedVerb.part1 };
        const newPart1 = { ...newNewVerb.part1 };
        if (n === 'name') {
          part1[1].subName = event.target.value;
          newPart1[1].subName = event.target.value;
        } else {
          part1[1].index = event.target.value;
          newPart1[1].index = event.target.value;
        }
        newUpdatedVerb = { ...newUpdatedVerb, part1: part1 };
        newNewVerb = { ...newNewVerb, part1: newPart1 };
        break;
      }
      case '1.S ': {
        const part1 = { ...newUpdatedVerb.part1 };
        const newPart1 = { ...newNewVerb.part1 };
        if (n === 'name') {
          part1[0].subName = event.target.value;
          newPart1[0].subName = event.target.value;
        } else {
          part1[0].index = event.target.value;
          newPart1[0].index = event.target.value;
        }
        newUpdatedVerb = { ...newUpdatedVerb, part1: part1 };
        newNewVerb = { ...newNewVerb, part1: newPart1 };
        break;
      }
      case 'Vorsilbe': {
        if (n === 'name') {
          newUpdatedVerb.prefix = event.target.value;
          newNewVerb.prefix = event.target.value;
        } else {
          newUpdatedVerb.prefixIndex = event.target.value;
          newNewVerb.prefixIndex = event.target.value;
        }
        newUpdatedVerb = { ...newUpdatedVerb, prefix: newUpdatedVerb.prefix };
        newNewVerb = { ...newNewVerb, prefix: newNewVerb.prefix };
        break;
      }
      case 'Verb': {
        if (n === 'name') {
          newUpdatedVerb = { ...newUpdatedVerb, name: event.target.value };
          newNewVerb = { ...newNewVerb, name: event.target.value };
        } else {
          newUpdatedVerb = { ...newUpdatedVerb, index: event.target.value };
          newNewVerb = { ...newNewVerb, index: event.target.value };
        }
        break;
      }
      case 'Wort:': {
        if (isUpdate) {
          if (part2Num !== undefined) {
            setUpdatedVerb({
              ...updatedVerb,
              part2: [
                {
                  ...[...updatedVerb.part2][part2Num],
                  [n === 'name' ? 'subName' : 'index']: event.target.value,
                },
              ],
            });
          }
        } else {
          if (part2Num !== undefined) {
            const part2 = [...newVerb.part2];

            part2[part2Num] = {
              ...part2[part2Num],
              [n === 'name' ? 'subName' : 'index']: event.target.value,
            };

            newVerb.part2 = part2;

            setNewVerb({
              ...newVerb,
            });

            // setNewVerb({
            //   ...newVerb,
            //   part2: [
            //     {
            //       ...[...newVerb.part2][part2Num],
            //       [n === 'name' ? 'subName' : 'index']: event.target.value,
            //     },
            //   ],
            // });
          }
        }
        console.log('🚀 ~ VerbsFormUnit ~ newVerb:', newVerb);
        break;
      }
    }
    //setUpdatedVerb({ ...newUpdatedVerb });
    // setNewVerb(newNewVerb);
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <label>{unitName + ' '}</label>
        <input
          type="text"
          name="name"
          value={valueName}
          onChange={(event) => handleChangeName(event, 'name')}
          placeholder={'   ' + placeholder}
          // required={unitName !== 'Vorsilbe'}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>{'Stile' + ' '}</label>
        <input
          type="text"
          name="index"
          value={valueIndex}
          onChange={(event) => handleChangeName(event, 'index')}
          placeholder={'   1, 2'}
          // required={unitName !== 'Vorsilbe'}
        />
      </div>
    </>
  );
}
