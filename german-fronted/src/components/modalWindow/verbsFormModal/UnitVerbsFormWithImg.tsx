import { useState } from 'react';
import VerbsFormUnit from './UnitVerbsForm';
import styles from './verbsFormModal.module.css';
import icon_create from '../../assets/adminPage/icons/icon_create.svg';

type VerbData = {
  name: string;
  index: string;
};

type UnitVerbsFormWithImgProps = {
  setTempImg: (img: string) => void;
  setVerbData: (data: VerbData) => void;
  verbData: VerbData;
};

export default function VerbsFormUnitWithImg(props: UnitVerbsFormWithImgProps) {
  const { setTempImg, verbData, setVerbData } = props;
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imagePaths, setImagePaths] = useState<string[]>(['']);

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
        setImagePaths((prevPaths) => {
          const newPaths = [...prevPaths];
          newPaths[index] = imagePath;
          return newPaths;
        });
        setTempImg(imagePath);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <VerbsFormUnit
        unitName="Verb:"
        verbData={verbData}
        setVerbData={setVerbData}
      />
      <div className={styles.imageContainer}>
        <p>Bild:</p>
        {previewImages.length > 0 && (
          <img
            className={styles.imgPeview}
            src={previewImages[0]}
            alt="Vorschau"
          />
        )}
        <input
          type="file"
          id="fileInput0"
          accept=".jpg, .png"
          style={{ display: 'none' }}
          onChange={handleFileSelection(0)}
        />
        <label htmlFor="fileInput0">
          <img src={icon_create} alt="create" />
        </label>
      </div>
    </>
  );
}
