import { useState } from 'react';
import styles from './verbsFormModal.module.css';
import { useModal } from '../confirmModal/ModalContext';
import icon_create from '../../assets/adminPage/icons/icon_create.svg';

export default function VerbsFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
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
      };
      reader.readAsDataURL(file);
    }
    console.log('path', imagePaths);
    console.log(previewImages);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (tempData.name.trim() === '') {
      openModal('Warnung', 'Verb darf nicht leer sein.');
    } else if (tempData.index.trim() === '') {
      openModal('Warnung', 'Der Verb-Stil darf nicht leer sein.');
    } else if (!validateInput(tempData.index)) {
      openModal(
        'Warnung',
        'Der Verb-Stil darf nur Zahlen enthalten, die durch Beistriche getrennt sind.'
      );
    } else {
      formData.name = tempData.name;
      formData.index = tempData.index
        .split(',')
        .map((numStr) => parseInt(numStr.trim(), 10) - 1);

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
                <div className={styles.inputContainer}>
                  <label>Verb:</label>
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label>Stil:</label>
                  <input
                    type="text"
                    name="index"
                    value={tempData.index}
                    onChange={handleChange}
                  />
                </div>
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
