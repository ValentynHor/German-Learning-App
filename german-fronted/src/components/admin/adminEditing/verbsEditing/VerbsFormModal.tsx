import { useState } from 'react';
import styles from './verbsEditing.module.css';
import { useModal } from '../../../modalWindow/confirmModal/ModalContext';

import iconCreate from '../../../assets/adminPage/icons/icon_create.svg';

import { IVerb } from '../../../../data/interfaces';

type VerbsFormModalProps = {
  verb: IVerb;
  setIsOpen: (e: boolean) => void;
};

export default function VerbsFormModal(props: VerbsFormModalProps) {
  const { verb, setIsOpen } = props;
  const [part2Count, setPart2Count] = useState<number>(verb.part2.length);
  const [formData, setFormData] = useState({ ...verb });

  const handleAddUnit = () => {
    setPart2Count((prevNumUnits) => prevNumUnits + 1);
  };
  const handleMinusUnit = () => {
    if (part2Count > 1) {
      setPart2Count((prevNumUnits) => prevNumUnits - 1);
    }
  };

  const closeModalForm = () => {
    setIsOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setFormData({
          ...formData,
          image: imageDataUrl,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRadioChange = (e: any) => {
    const value = e.target.value === 'haben';
    setFormData({
      ...formData,
      withHaben: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <form onSubmit={handleSubmit}>
            <div className={styles.closeIcon}>X</div>
            <div className={styles.row}>
              <div className={styles.column}>
                {/* Verb */}
                <div className={styles.inputContainer}>
                  <label>Verb: </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={'essen'}
                    required
                  />
                </div>
                {/* Stile */}
                <div className={styles.inputContainer}>
                  <label>Stile: </label>
                  <input
                    type="text"
                    name="index"
                    value={formData.index as string}
                    onChange={handleChange}
                    placeholder={'1,2,3'}
                    required
                  />
                </div>
                {/* Image */}
                <div className={styles.imageContainer}>
                  <p>Bild</p>
                  {formData.image !== '' && (
                    <img
                      className={styles.imgPeview}
                      src={formData.image}
                      alt="Vorschau"
                    />
                  )}
                  <input
                    type="file"
                    id={'verbFileInput'}
                    accept=".jpg, .png"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                  <label htmlFor={'verbFileInput'}>
                    <img src={iconCreate} alt="create" />
                  </label>
                </div>
                {/* withHaben */}
                <div className={styles.inputContainer}>
                  <label htmlFor="haben">haben</label>
                  <input
                    type="radio"
                    id="haben"
                    name="withHaben"
                    value="haben"
                    checked={formData.withHaben === true}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="sein">sein</label>
                  <input
                    type="radio"
                    id="sein"
                    name="withHaben"
                    value="sein"
                    checked={formData.withHaben === false}
                    onChange={handleRadioChange}
                  />
                </div>
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
