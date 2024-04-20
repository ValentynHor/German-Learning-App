import { useState } from 'react';
import styles from './verbsFormModal.module.css';
import { useModal } from '../confirmModal/ModalContext';

import VerbsFormUnit from './UnitVerbsForm';
import VerbsFormUnitWithImg from './UnitVerbsFormWithImg';
import axios from 'axios';
import { IVerb } from '../../../data/interfaces';

type VerbsFormModalProps = {
  verb: IVerb;
  setIsOpen: (e: boolean) => void;
  setIsUpdate: (e: boolean) => void;
  isOpen?: boolean;
  isUpdate?: boolean;
};

export default function VerbsFormModal(props: VerbsFormModalProps) {
  const { verb, setIsOpen, isOpen, isUpdate, setIsUpdate } = props;

  const { openModal } = useModal();
  const [numWords, setNumWords] = useState<number>(1);
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
  let [newVerb, setNewVerb] = useState<IVerb>({
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
    part2: [
      {
        subName: '',
        index: '',
        image: '',
      },
    ],
    part3: { subName: '', index: '' },
  });

  let [tempData2, setTempData2] = useState({
    ...verb,
  });
  let [updatedVerb, setUpdatedVerb] = useState({
    ...verb,
  });
  if (isUpdate && verb) {
  }
  // if (isUpdate && verb) {
  //   let updatedVerb = { ...verb };
  //   updatedVerb.image = JSON.parse(updatedVerb.image);
  //   updatedVerb.part2 = verb.part2.map((i) => {
  //     let updatedPart2Item = { ...i };
  //     updatedPart2Item.image = JSON.parse(updatedPart2Item.image as string);
  //     return updatedPart2Item;
  //   });

  //   tempData[0] = {
  //     name: updatedVerb.name,
  //     index: updatedVerb.index.join(','),
  //   };
  //   if (updatedVerb.prefix) {
  //     tempData[1] = {
  //       name: updatedVerb.prefix.prefix,
  //       index: updatedVerb.prefix.prefixIndex.join(','),
  //     };
  //   }
  //   for (let i = 0; i < updatedVerb.part1.length; i++) {
  //     tempData[i + 2] = {
  //       name: updatedVerb.part1[i].subName,
  //       index: updatedVerb.part1[i].index.join(','),
  //     };
  //   }
  //   tempData[5] = {
  //     name: updatedVerb.part3.subName,
  //     index: updatedVerb.part3.index.join(','),
  //   };
  //   updatedVerb.part2.map((item, index) => {
  //     tempData[6 + index] = {
  //       name: item.subName,
  //       index: item.index.join(','),
  //     };
  //     index++;
  //   });
  //   tempImg[0] = updatedVerb.image;
  //   updatedVerb.part2.map((item, index) => {
  //     if (item.image) tempImg[index + 6] = item.image;
  //   });
  //   setIsUpdate(false);
  // }

  const units = [];
  for (let i = 1; i <= numWords; i++) {
    units.push(
      <VerbsFormUnitWithImg
        key={i}
        unitName="Wort:"
        tempImg={tempImg}
        setVerbData={setTempData}
        verbData={tempData}
        imgNumber={5 + i}
        placeholder="einen Apfel"
        isUpdate={isUpdate}
        verb={verb}
        setNewVerb={setNewVerb}
        setUpdatedVerb={setUpdatedVerb}
        newVerb={newVerb}
        updatedVerb={updatedVerb}
      />
    );
  }

  const handleAddUnit = () => {
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
                    verbData={tempData}
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
                    verbData={tempData}
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
                    verbData={tempData}
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
                    verbData={tempData}
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
                  {units}
                  <a onClick={handleAddUnit}>+</a>
                  <a onClick={handleMinusUnit}>-</a>
                </div>
                <div>
                  <VerbsFormUnit
                    unitName="PII "
                    verbData={tempData}
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
