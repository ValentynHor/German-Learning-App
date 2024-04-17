import { useState } from 'react';
import styles from './verbsFormModal.module.css';
import { useModal } from '../confirmModal/ModalContext';

import VerbsFormUnit from './UnitVerbsForm';
import VerbsFormUnitWithImg from './UnitVerbsFormWithImg';

export default function VerbsFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const [numWords, setNumWords] = useState<number>(1);
  const [isWithSein, setIsWithSein] = useState<boolean>(true);
  const [isDatenValid, setIsDatenValid] = useState<boolean[]>([false]);

  const [formData, setFormData] = useState({
    name: '',
    isWithHaben: false,
    index: [] as number[],
    image: '',
    prefix: {
      prefix: '',
      prefixIndex: [] as number[],
    },
    part1: [{ subName: '', index: [] as number[] }],
    part2: [{ subName: '', index: [] as number[], image: '' }],
    part3: { subName: '', index: [] as number[] },
  });

  const [tempData, setTempData] = useState([
    {
      name: '',
      index: '',
    },
  ]);

  const [tempImg, setTempImg] = useState<string[]>(['']);

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
    setIsWithSein(event.target.value === 'haben');
  };

  const openModalForm = () => {
    setIsOpen(true);
  };
  const closeModalForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // VALIDATION;
    tempData.forEach((item, index) => {
      if (item && !validateInput(item.index)) {
        openModal(
          'Warnung',
          `Der Verb-Stil für Verb ${
            index + 1
          } darf nur Zahlen enthalten, die durch Beistriche getrennt sind.`
        );
      }
    });
    if (tempImg.length <= 2) {
      openModal('Warnung', `Die Bilder dürfen nicht leer sein.`);
    }
    if (numWords !== 1) {
      for (let i = 7; i <= numWords + 5; i++) {
        if (tempImg[i] === undefined) {
          openModal('Warnung', `Die Bilder dürfen nicht leer sein.`);
        }
      }
    }

    //mainblock

    formData.name = tempData[0].name;
    formData.index = parseString(tempData[0].index);
    formData.isWithHaben = isWithSein;
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
    // for (let i = 5; i <= tempData.length; i++) {
    //   formData.part2.push({
    //     subName: tempData[i].name,
    //     index: parseString(tempData[i].index),
    //     image: tempImg[i - 4],
    //   });
    // }
    // formData.part2 = [
    //   {
    //     subName: tempData[6].name,
    //     index: parseString(tempData[6].index),
    //     image: tempImg[2],
    //   },
    // ];

    console.log(formData);
  };

  return (
    <>
      <button onClick={openModalForm}>Formular öffnen</button>
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
                  />
                  <div className={styles.inputContainer}>
                    <label>haben</label>
                    <input
                      type="radio"
                      name="verbType"
                      value="haben"
                      checked={isWithSein}
                      onChange={handleChangeIsWithHaben}
                    />
                    <label>sein</label>
                    <input
                      type="radio"
                      name="verbType"
                      value="sein"
                      checked={!isWithSein}
                      onChange={handleChangeIsWithHaben}
                    />
                  </div>
                  <VerbsFormUnit
                    unitName="Vorsilbe"
                    verbData={tempData}
                    verbNumber={1}
                    setVerbData={setTempData}
                    placeholder="über"
                  />
                </div>
                <div className={styles.column}>
                  <VerbsFormUnit
                    unitName="1.S "
                    verbData={tempData}
                    verbNumber={2}
                    setVerbData={setTempData}
                    placeholder="esse"
                  />
                  <VerbsFormUnit
                    unitName="3.S "
                    verbData={tempData}
                    verbNumber={3}
                    setVerbData={setTempData}
                    placeholder="isst"
                  />
                  <VerbsFormUnit
                    unitName="1.P "
                    verbData={tempData}
                    verbNumber={4}
                    setVerbData={setTempData}
                    placeholder="essen"
                  />
                </div>
                <div className={styles.columnWithScrolling}>
                  {units}
                  <a onClick={handleAddUnit}>+</a>
                  <a onClick={handleMinusUnit}>-</a>
                </div>
                <div>
                  <VerbsFormUnit
                    unitName="PII"
                    verbData={tempData}
                    verbNumber={5}
                    setVerbData={setTempData}
                    placeholder="gegessen"
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

function parseString(input: string): number[] {
  if (!input) return [];
  if (input.endsWith(',')) {
    input = input.slice(0, -1);
  }
  const parsedNumbers = input
    .split(',')
    .map((numStr) => parseInt(numStr.trim(), 10) - 1);
  return parsedNumbers.filter((num) => !isNaN(num));
}
