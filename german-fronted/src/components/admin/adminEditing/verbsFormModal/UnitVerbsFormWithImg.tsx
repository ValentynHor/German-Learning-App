import { useState } from 'react';
import VerbsFormUnit from './UnitVerbsForm';
import styles from './verbsFormModal.module.css';
import icon_create from '../../assets/adminPage/icons/icon_create.svg';
import { useModal } from '../../../modalWindow/confirmModal/ModalContext';
import { IVerb } from '../../../../data/interfaces';

type UnitVerbsForm = {
  name: string;
  index: string;
  image?: string;
};

type UnitVerbsFormWithImgProps = {
  unitName: string;
  tempImg?: string[];
  setVerbData?: (data: UnitVerbsForm[]) => void;
  verbData?: UnitVerbsForm[];
  imgNumber?: number;
  placeholder: string;
  isUpdate?: boolean;
  verb?: IVerb;
  valueName?: any;
  valueIndex?: any;
  setNewVerb: (data: any) => void;
  setUpdatedVerb: (data: any) => void;
  newVerb?: any;
  updatedVerb?: any;
  part2Num?: number;
};

export default function VerbsFormUnitWithImg(props: UnitVerbsFormWithImgProps) {
  const {
    tempImg,
    verbData,
    setVerbData,
    imgNumber,
    placeholder,
    unitName,
    isUpdate,
    setNewVerb,
    setUpdatedVerb,
    updatedVerb,
    newVerb,
    valueIndex,
    valueName,
    part2Num,
  } = props;
  let [previewImages, setPreviewImages] = useState<string[]>([]);
  const { openModal } = useModal();

  // if (verb !== undefined) {
  //   let a = verb.image;
  //   try {
  //     previewImages[0] = JSON.parse(a);
  //     verb.part2.map((item, index) => {
  //       if (item.image) previewImages[index + 6] = JSON.parse(item.image);
  //     });
  //   } catch (error) {
  //     // Wenn ein Fehler auftritt, ist es kein gültiges JSON
  //     console.error('Fehler beim Parsen des JSON:', error);
  //   }
  // }
  // const handleFileSelection = (index: number, event: any) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.result) {
  //         // Stelle sicher, dass reader.result nicht null ist
  //         const imageBlob = new Blob([reader.result], { type: file.type });

  //         const imageDataUrl = reader.result as string;
  //         setPreviewImages((prevImages) => {
  //           const newImages = [...prevImages];
  //           newImages[index] = imageDataUrl;
  //           return newImages;
  //         });
  //         tempImg[imgNumber] = JSON.stringify({
  //           name: `image_${index}`,
  //           blob: imageBlob,
  //           fileName: file.name,
  //         });
  //       } else {
  //         console.error('Failed to read file');
  //       }
  //     };

  //     reader.readAsArrayBuffer(file);
  //   }
  // };
  const readFileOnUpload = (index: number, e: any) => {
    // const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     tempImg[index] = JSON.stringify(reader.result);
    //     const imageDataUrl = reader.result as string;
    //     setPreviewImages((prevImages) => {
    //       const newImages = [...prevImages];
    //       newImages[index] = imageDataUrl;
    //       return newImages;
    //     });
    //   };
    //   reader.readAsDataURL(file); // Lese die Datei als Daten-URL ein
    // }
  };

  return (
    <>
      <VerbsFormUnit
        unitName={unitName}
        setVerbData={setVerbData!}
        verbNumber={imgNumber!}
        placeholder={placeholder}
        isUpdate={isUpdate}
        valueName={valueName}
        valueIndex={valueIndex}
        setNewVerb={setNewVerb}
        setUpdatedVerb={setUpdatedVerb}
        newVerb={newVerb}
        updatedVerb={updatedVerb}
        part2Num={part2Num}
      />
      <div className={styles.imageContainer}>
        <p>Bild</p>
        {previewImages.length > 0 && (
          <img
            className={styles.imgPeview}
            src={previewImages[imgNumber!]}
            alt="Vorschau"
          />
        )}
        <input
          type="file"
          id={'fileInput' + imgNumber}
          accept=".jpg, .png"
          style={{ display: 'none' }}
          onChange={(e) => readFileOnUpload(imgNumber!, e)}
        />
        <label htmlFor={'fileInput' + imgNumber}>
          <img src={icon_create} alt="create" />
        </label>
      </div>
    </>
  );
}
