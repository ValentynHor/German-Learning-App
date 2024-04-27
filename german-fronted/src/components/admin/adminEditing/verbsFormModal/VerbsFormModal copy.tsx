import { useEffect, useState } from 'react';
import styles from './verbsFormModal.module.css';
import { useModal } from '../../../modalWindow/confirmModal/ModalContext';

import VerbsFormUnit from './UnitVerbsForm';
import VerbsFormUnitWithImg from './UnitVerbsFormWithImg';
import axios from 'axios';
import { IVerb, Part } from '../../../../data/interfaces';

type VerbsFormModalProps = {
  verb: IVerb;
  setIsOpen: (e: boolean) => void;
  setIsUpdate: (e: boolean) => void;
  isOpen?: boolean;
  isUpdate?: boolean;
};

export default function VerbsFormModal(props: VerbsFormModalProps) {
  const { verb, setIsOpen, isOpen, isUpdate, setIsUpdate } = props;

  const [part2, setPart2] = useState<Part[]>(
    isUpdate
      ? verb.part2
      : [
          {
            subName: '',
            index: '',
            image: '',
          },
        ]
  );

  const { openModal } = useModal();
  const [numWords, setNumWords] = useState<number>(
    isUpdate ? verb.part2.length : 1
  );
  // const [isWithSein, setIsWithSein] = useState<boolean>(
  //   verb ? verb.withHaben : true
  // );
  const [tempImg] = useState<string[]>(['']);

  let a = [];
  for (let i = 0; i < 10; i++) {
    a.push({
      name: '',
      index: '',
    });
  }
  let [tempData, setTempData] = useState([...a]);

  const [newVerb, setNewVerb] = useState<IVerb>({
    name: '',
    withHaben: true,
    index: '',
    prefix: {
      prefix: '',
      prefixIndex: '',
    },
    image: '',
    part1: [
      {
        subName: '',
        index: '',
      },
      {
        subName: '',
        index: '',
      },
      {
        subName: '',
        index: '',
      },
    ],
    part2: [],
    part3: { subName: '', index: '' },
  });

  let [updatedVerb, setUpdatedVerb] = useState({
    ...verb,
  });
  let [tempData2, setTempData2] = useState({
    ...verb,
  });
  const [units, setUnits]: any = useState([]);

  const renderUnits = () => {
    let u = [];
    u[0] = (
      <VerbsFormUnitWithImg
        key={0}
        unitName="Wort:"
        tempImg={tempImg}
        setVerbData={setTempData}
        imgNumber={6}
        placeholder="einen Apfel"
        isUpdate={isUpdate}
        verb={verb}
        setNewVerb={setNewVerb}
        setUpdatedVerb={setUpdatedVerb}
        newVerb={newVerb}
        updatedVerb={updatedVerb}
        valueName={newVerb.part2[0].subName}
        valueIndex={newVerb.part2[0].index}
        part2Num={0}
      />
    );
    setUnits(u);
  };
  const render = () => {
    return units.map((item: any) => {
      return item;
    });
  };

  const handleAddUnit = () => {
    setUnits((prevUnit: any) => [
      ...prevUnit,
      <VerbsFormUnitWithImg
        key={numWords}
        unitName="Wort:"
        tempImg={tempImg}
        setVerbData={setTempData}
        imgNumber={6}
        placeholder="einen Apfel"
        isUpdate={isUpdate}
        verb={verb}
        setNewVerb={setNewVerb}
        setUpdatedVerb={setUpdatedVerb}
        newVerb={newVerb}
        updatedVerb={updatedVerb}
        valueName={
          newVerb.part2[numWords] ? newVerb.part2[numWords].subName : ''
        }
        valueIndex={
          newVerb.part2[numWords] ? newVerb.part2[numWords].index : ''
        }
        part2Num={numWords}
      />,
    ]);
    setNumWords((prevNumUnits) => prevNumUnits + 1);
  };
  const handleMinusUnit = () => {
    if (numWords > 1) {
      setNumWords((prevNumUnits) => prevNumUnits - 1);
    }
  };
  const handleChangeIsWithHaben = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setIsWithSein(event.target.value === 'haben');
  };

  const openModalForm = () => {
    setIsOpen(true);
  };
  const closeModalForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let hasWarnings = false;
    const formData = verb;

    // VALIDATION;
    tempData.forEach((item, index) => {
      if (item && !validateInput(item.index)) {
        openModal(
          'Warnung',
          `Der Verb-Stil für Verb ${
            index + 1
          } darf nur Zahlen enthalten, die durch Beistriche getrennt sind.`
        );
        hasWarnings = true;
        setIsUpdate(true);
      }
    });
    if (verb === undefined) {
      if (tempImg.length <= 2) {
        openModal('Warnung', `Die Bilder dürfen nicht leer sein.`);
        hasWarnings = true;
        setIsUpdate(true);
      }
    }
    if (numWords !== 1) {
      for (let i = 7; i <= numWords + 5; i++) {
        if (verb === undefined) {
          if (tempImg[i] === undefined) {
            openModal('Warnung', `Die Bilder dürfen nicht leer sein.`);
            hasWarnings = true;
            setIsUpdate(true);
          }
        }
      }
    }
    //mainblock
    if (!hasWarnings && formData && !isUpdate) {
      formData.name = tempData[0].name;
      formData.index = parseString(tempData[0].index);
      // formData.withHaben = isWithSein;
      formData.image = tempImg[0];
      if (tempData[1] !== undefined) {
        formData.prefix = {
          prefix: tempData[1].name,
          prefixIndex: parseString(tempData[1].index),
        };
      }
      formData.part1 = [
        {
          subName: tempData[2].name,
          index: parseString(tempData[2].index),
        },
        {
          subName: tempData[3].name,
          index: parseString(tempData[3].index),
        },
        {
          subName: tempData[4].name,
          index: parseString(tempData[4].index),
        },
      ];
      formData.part3 = {
        subName: tempData[5].name,
        index: parseString(tempData[5].index),
      };
      formData.part2 = [];
      for (let i = 6; i < tempData.length; i++) {
        formData.part2.push({
          subName: tempData[i].name,
          index: parseString(tempData[i].index),
          image: tempImg[i],
        });
      }
      if (isUpdate) {
        const url = 'http://localhost:8080/german/verbs/create';
        axios
          .post(url, formData)
          .then(() => {})
          .catch((message) => {
            openModal(
              'ERROR',
              ' *** ' + message.response.data.error_description + ' ***'
            );
          });
        closeModalForm();
      } else {
        const url = 'http://localhost:8080/german/verbs/update/' + verb.id;
        axios
          .post(url, formData)
          .then(() => {})
          .catch((message) => {
            openModal(
              'ERROR',
              ' *** ' + message.response.data.error_description + ' ***'
            );
          });
        closeModalForm();
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
              <div className={styles.closeIcon}>X</div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <VerbsFormUnitWithImg
                    unitName="Verb"
                    tempImg={tempImg}
                    setVerbData={setTempData}
                    verbData={tempData}
                    imgNumber={0}
                    placeholder="essen"
                    isUpdate={isUpdate}
                    verb={verb}
                    valueName={isUpdate ? updatedVerb.name : newVerb.name}
                    valueIndex={isUpdate ? updatedVerb.index : newVerb.index}
                    setNewVerb={setNewVerb}
                    setUpdatedVerb={setUpdatedVerb}
                    newVerb={newVerb}
                    updatedVerb={updatedVerb}
                  />
                  <div className={styles.inputContainer}>
                    <label>haben</label>
                    <input
                      type="radio"
                      name="verbType"
                      value="haben"
                      // checked={isWithSein}
                      onChange={handleChangeIsWithHaben}
                    />
                    <label>sein</label>
                    <input
                      type="radio"
                      name="verbType"
                      value="sein"
                      // checked={!isWithSein}
                      onChange={handleChangeIsWithHaben}
                    />
                  </div>
                  <VerbsFormUnit
                    unitName="Vorsilbe"
                    verbNumber={1}
                    setVerbData={setTempData}
                    placeholder="über"
                    isUpdate={isUpdate}
                    verb={verb}
                    valueName={
                      isUpdate
                        ? updatedVerb.prefix?.prefix
                        : newVerb.prefix?.prefix
                    }
                    valueIndex={
                      isUpdate
                        ? updatedVerb.prefix?.prefixIndex
                        : newVerb.prefix?.prefixIndex
                    }
                    setNewVerb={setNewVerb}
                    setUpdatedVerb={setUpdatedVerb}
                    newVerb={newVerb}
                    updatedVerb={updatedVerb}
                  />
                </div>
                <div className={styles.column}>
                  <VerbsFormUnit
                    unitName="1.S "
                    verbNumber={2}
                    setVerbData={setTempData}
                    placeholder="esse"
                    isUpdate={isUpdate}
                    verb={verb}
                    valueName={
                      isUpdate
                        ? updatedVerb.part1[0].subName
                        : newVerb.part1[0].subName
                    }
                    valueIndex={
                      isUpdate
                        ? updatedVerb.part1[0].index
                        : newVerb.part1[0].index
                    }
                    setNewVerb={setNewVerb}
                    setUpdatedVerb={setUpdatedVerb}
                    newVerb={newVerb}
                    updatedVerb={updatedVerb}
                  />
                  <VerbsFormUnit
                    unitName="3.S "
                    verbNumber={3}
                    setVerbData={setTempData}
                    placeholder="isst"
                    isUpdate={isUpdate}
                    verb={verb}
                    valueName={
                      isUpdate
                        ? updatedVerb.part1[1].subName
                        : newVerb.part1[1].subName
                    }
                    valueIndex={
                      isUpdate
                        ? updatedVerb.part1[1].index
                        : newVerb.part1[1].index
                    }
                    setNewVerb={setNewVerb}
                    setUpdatedVerb={setUpdatedVerb}
                    newVerb={newVerb}
                    updatedVerb={updatedVerb}
                  />
                  <VerbsFormUnit
                    unitName="1.P "
                    verbNumber={4}
                    setVerbData={setTempData}
                    placeholder="essen"
                    isUpdate={isUpdate}
                    verb={verb}
                    valueName={
                      isUpdate
                        ? updatedVerb.part1[2].subName
                        : newVerb.part1[2].subName
                    }
                    valueIndex={
                      isUpdate
                        ? updatedVerb.part1[2].index
                        : newVerb.part1[2].index
                    }
                    setNewVerb={setNewVerb}
                    setUpdatedVerb={setUpdatedVerb}
                    newVerb={newVerb}
                    updatedVerb={updatedVerb}
                  />
                </div>
                <div className={styles.columnWithScrolling}>
                  {units.length === 0 ? renderUnits() : units}
                  <a onClick={handleAddUnit}>+</a>
                  <a onClick={handleMinusUnit}>-</a>
                </div>
                <div>
                  <VerbsFormUnit
                    unitName="PII "
                    verbNumber={5}
                    setVerbData={setTempData}
                    isUpdate={isUpdate}
                    placeholder="gegessen"
                    verb={verb}
                    valueName={
                      isUpdate
                        ? updatedVerb.part3.subName
                        : newVerb.part3.subName
                    }
                    valueIndex={
                      isUpdate ? updatedVerb.part3.index : newVerb.part3.index
                    }
                    setTempData2={setTempData2}
                    setNewVerb={setNewVerb}
                    setUpdatedVerb={setUpdatedVerb}
                    newVerb={newVerb}
                    updatedVerb={updatedVerb}
                  />
                </div>
              </div>
              <div className={styles.formButtonsContainer}>
                <button
                  className={styles.abort}
                  type="button"
                  onClick={closeModalForm}
                >
                  abbrechen
                </button>
                <button className={styles.confirm} type="submit">
                  speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function validateInput(input: string): boolean {
  const regex = /^[0-9,]+$/;
  return regex.test(input);
}

export function parseString(input: string): number[] {
  if (!input) return [];
  if (input.endsWith(',')) {
    input = input.slice(0, -1);
  }
  const parsedNumbers = input
    .split(',')
    .map((numStr) => parseInt(numStr.trim(), 10) - 1);
  return parsedNumbers.filter((num) => !isNaN(num));
}
