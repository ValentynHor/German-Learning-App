import { useState } from 'react';
import styles from './verbsFormModal.module.css';
import { useModal } from '../confirmModal/ModalContext';

import VerbsFormUnit from './UnitVerbsForm';
import VerbsFormUnitWithImg from './UnitVerbsFormWithImg';

export default function VerbsFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
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

  const [tempData, setTempData] = useState({
    name: '',
    index: '',
    image: '',
    isWithHaben: false,
    // prefix: {
    //   prefix: '',
    //   prefixIndex: [],
    // },
    // part1: [{ subName: '', index: [] }],
    // part2: [{ subName: '', index: [], image: '' }],
    // part3: { subName: '', index: [] },
  });

  const [tempData0, setTempData0] = useState({
    name: '',
    index: '',
  });

  const [tempImg, setTempImg] = useState<string>('');

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
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

    if (tempData0.name.trim() === '') {
      openModal('Warnung', 'Verb darf nicht leer sein.');
    } else if (tempData0.index.trim() === '') {
      openModal('Warnung', 'Der Verb-Stil darf nicht leer sein.');
    } else if (!validateInput(tempData0.index)) {
      openModal(
        'Warnung',
        'Der Verb-Stil darf nur Zahlen enthalten, die durch Beistriche getrennt sind.'
      );
    } else if (tempImg.trim() === '') {
      openModal('Warnung', 'Das Verbbild darf nicht leer sein.');
    } else {
      formData.name = tempData0.name;

      if (tempData0.index.endsWith(',')) {
        tempData0.index = tempData0.index.slice(0, -1);
      }
      formData.index = tempData0.index
        .split(',')
        .map((numStr) => parseInt(numStr.trim(), 10) - 1);

      formData.image = tempImg;

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
              <div>
                <VerbsFormUnitWithImg
                  setTempImg={setTempImg}
                  setVerbData={setTempData0}
                  verbData={tempData0}
                />
              </div>

              <div>
                <button type="submit">Absenden</button>
              </div>
            </form>
            <button onClick={closeModalForm}>Abbrechen</button>
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
