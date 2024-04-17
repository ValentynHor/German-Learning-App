import { useState } from 'react';
import styles from './verbsFormModal.module.css';
import { useModal } from '../confirmModal/ModalContext';

import VerbsFormUnit from './UnitVerbsForm';
import VerbsFormUnitWithImg from './UnitVerbsFormWithImg';

export default function VerbsFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const [numWords, setNumWords] = useState<number>(1);
  const [isWithHaben, setIsWithHaben] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    name: '',
    isWithHaben: false,
    index: [] as number[],
    image: '',
    prefix: {
      prefix: '',
      prefixIndex: [],
    },
    part1: [{ subName: '', index: [] }],
    part2: [{ subName: '', index: [], image: '' }],
    part3: { subName: '', index: [] },
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
        imgNumber={6 + i}
        placeholder="einen Apfel"
      />
    );
  }

  const handleAddWord = () => {
    setNumWords((prevNumUnits) => prevNumUnits + 1);
  };
  const handleMinusWord = () => {
    if (numWords > 1) {
      setNumWords((prevNumUnits) => prevNumUnits - 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsWithHaben(event.target.value === 'haben');
  };

  const openModalForm = () => {
    setIsOpen(true);
  };
  const closeModalForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    //VALIDATION

    if (tempData[0].name.trim() === '') {
      openModal('Warnung', 'Verb darf nicht leer sein.');
    } else if (tempData[0].index.trim() === '') {
      openModal('Warnung', 'Der Verb-Stil darf nicht leer sein.');
    } else if (!validateInput(tempData[0].index)) {
      openModal(
        'Warnung',
        'Der Verb-Stil darf nur Zahlen enthalten, die durch Beistriche getrennt sind.'
      );
    } else if (tempImg[0].trim() === '') {
      openModal('Warnung', 'Das Verbbild darf nicht leer sein.');
    } else {
      formData.name = tempData[0].name;

      if (tempData[0].index.endsWith(',')) {
        tempData[0].index = tempData[0].index.slice(0, -1);
      }
      formData.index = tempData[0].index
        .split(',')
        .map((numStr) => parseInt(numStr.trim(), 10) - 1);

      formData.image = tempImg[0];

      formData.part1[0].subName = tempData[1].name;

      console.log(formData);

      closeModalForm();
    }
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
                      checked={isWithHaben}
                      onChange={handleChange}
                    />
                    <label>sein</label>
                    <input
                      type="radio"
                      name="verbType"
                      value="sin"
                      checked={!isWithHaben}
                      onChange={handleChange}
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
                  <a onClick={handleAddWord}>+</a>
                  <a onClick={handleMinusWord}>-</a>
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
