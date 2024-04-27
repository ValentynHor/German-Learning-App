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

  const closeModalForm = () => {
    setIsOpen(false);
  };

  //Main part
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleChangePrefix = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      prefix: {
        ...prevFormData.prefix!,
        [name]: value,
      },
    }));
  };

  //Part1
  const renderPart1Inputs = (index: number) => {
    return (
      <>
        <div className={styles.inputContainer}>
          <label>Verb: </label>
          <input
            type="text"
            value={formData.part1[index].subName}
            onChange={(e) => handleChangePart1(e, index, 'subName')}
            placeholder={'Verb'}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Stile: </label>
          <input
            type="text"
            value={formData.part1[index].index as string}
            onChange={(e) => handleChangePart1(e, index, 'index')}
            placeholder={'1,2,3'}
            required
          />
        </div>
      </>
    );
  };

  const handleChangePart1 = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'subName' | 'index'
  ) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedPart1 = [...prevFormData.part1];
      updatedPart1[index] = {
        ...updatedPart1[index],
        [field]: value,
      };
      return {
        ...prevFormData,
        part1: updatedPart1,
      };
    });
  };

  //Part2
  const handleChangePart2 = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'subName' | 'index'
  ) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedPart2 = [...prevFormData.part2];
      updatedPart2[index] = {
        ...updatedPart2[index],
        [field]: value,
      };
      return {
        ...prevFormData,
        part2: updatedPart2,
      };
    });
  };

  const handleFileUploadPart2 = (e: any, index: number) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setFormData((prevFormData) => {
          const updatedPart2 = [...prevFormData.part2];
          updatedPart2[index] = {
            ...updatedPart2[index],
            image: imageDataUrl,
          };
          return {
            ...prevFormData,
            part2: updatedPart2,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPart2Inputs = (index: number) => {
    const part2SubName = formData.part2[index]?.subName || '';
    const part2SubIndex = (formData.part2[index]?.index as string) || '';
    const part2SubImage = formData.part2[index]?.image || '';

    return (
      <>
        <div className={styles.inputContainer}>
          <label>Verb: </label>
          <input
            type="text"
            value={part2SubName}
            onChange={(e) => handleChangePart2(e, index, 'subName')}
            placeholder={'Verb'}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Stile: </label>
          <input
            type="text"
            value={part2SubIndex}
            onChange={(e) => handleChangePart2(e, index, 'index')}
            placeholder={'1,2,3'}
            required
          />
        </div>
        <div className={styles.imageContainer}>
          <p>Bild</p>
          {part2SubImage !== '' && (
            <img
              className={styles.imgPeview}
              src={part2SubImage}
              alt="Vorschau"
            />
          )}
          <input
            type="file"
            id={'verbFileInput' + index}
            accept=".jpg, .png"
            style={{ display: 'none' }}
            onChange={(e) => handleFileUploadPart2(e, index)}
          />
          <label htmlFor={'verbFileInput' + index}>
            <img src={iconCreate} alt="create" />
          </label>
        </div>
      </>
    );
  };

  const renderPart2 = () => {
    const part2Inputs = [];
    for (let i = 0; i < part2Count; i++) {
      part2Inputs.push(renderPart2Inputs(i));
    }
    return part2Inputs;
  };

  const handleAddUnit = () => {
    setPart2Count((prevNumUnits) => prevNumUnits + 1);
  };
  const handleMinusUnit = () => {
    if (part2Count > 1) {
      setPart2Count((prevNumUnits) => prevNumUnits - 1);
    }
  };

  const handleRadioChange = (e: any) => {
    const value = e.target.value === 'haben';
    setFormData({
      ...formData,
      withHaben: value,
    });
  };

  //Part3
  const handleChangePart3 = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'subName' | 'index'
  ) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      part3: {
        ...prevFormData.part3,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);
    //part 2 teile löschen
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <form onSubmit={handleSubmit}>
            <div className={styles.closeIcon}>X</div>
            <div className={styles.row}>
              {/* I Column */}
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
                {/* Vorsilbe */}
                <div className={styles.inputContainer}>
                  <label>Vorsilbe: </label>
                  <input
                    type="text"
                    name="prefix"
                    value={formData.prefix?.prefix}
                    onChange={handleChangePrefix}
                    placeholder={'über'}
                  />
                </div>
                {/* VorsilbeStile */}
                <div className={styles.inputContainer}>
                  <label>Stile: </label>
                  <input
                    type="text"
                    name="prefixIndex"
                    value={formData.prefix?.prefixIndex as string}
                    onChange={handleChangePrefix}
                    placeholder={'1,2,3'}
                  />
                </div>
              </div>
              {/* II Column Part1 */}
              <div className={styles.column}>
                {/* Verb I Form Singular */}
                {renderPart1Inputs(0)}
                {/* Verb III Form Singular */}
                {renderPart1Inputs(1)}
                {/* Verb I Form Plural */}
                {renderPart1Inputs(2)}
              </div>
              {/* III Column Part2 */}
              <div className={styles.columnWithScrolling}>
                {renderPart2()}
                <div className={styles.inputContainer}>
                  <button type="button" onClick={handleAddUnit}>
                    +
                  </button>
                  <button type="button" onClick={handleMinusUnit}>
                    -
                  </button>
                </div>
              </div>
              {/* IV Column Part3 */}
              <div className={styles.column}>
                <div className={styles.inputContainer}>
                  <label>Verb: </label>
                  <input
                    type="text"
                    value={formData.part3.subName}
                    onChange={(e) => handleChangePart3(e, 'subName')}
                    placeholder={'Verb'}
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label>Index: </label>
                  <input
                    type="text"
                    value={formData.part3.index as string}
                    onChange={(e) => handleChangePart3(e, 'index')}
                    placeholder={'Index'}
                    required
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
