import { useState } from 'react';
import VerbsFormUnit from './UnitVerbsForm';
import styles from './verbsFormModal.module.css';
import icon_create from '../../assets/adminPage/icons/icon_create.svg';
import { useModal } from '../confirmModal/ModalContext';

type UnitVerbsForm = {
  name: string;
  index: string;
};

type UnitVerbsFormWithImgProps = {
  unitName: string;
  tempImg: string[];
  setVerbData: (data: UnitVerbsForm[]) => void;
  verbData: UnitVerbsForm[];
  imgNumber: number;
  placeholder: string;
};

export default function VerbsFormUnitWithImg(props: UnitVerbsFormWithImgProps) {
  const { tempImg, verbData, setVerbData, imgNumber, placeholder, unitName } =
    props;
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { openModal } = useModal();

  const handleFileSelection = (index: number) => (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        const imagePath = URL.createObjectURL(file);
        setPreviewImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = imageDataUrl;
          return newImages;
        });
        tempImg[imgNumber] = imagePath;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <VerbsFormUnit
        unitName={unitName}
        verbData={verbData}
        setVerbData={setVerbData}
        verbNumber={imgNumber}
        placeholder={placeholder}
      />
      <div className={styles.imageContainer}>
        <p>Bild</p>
        {previewImages.length > 0 && (
          <img
            className={styles.imgPeview}
            src={previewImages[imgNumber]}
            alt="Vorschau"
          />
        )}
        <input
          type="file"
          id={'fileInput' + imgNumber}
          accept=".jpg, .png"
          style={{ display: 'none' }}
          onChange={handleFileSelection(imgNumber)}
        />
        <label htmlFor={'fileInput' + imgNumber}>
          <img src={icon_create} alt="create" />
        </label>
      </div>
    </>
  );
}
