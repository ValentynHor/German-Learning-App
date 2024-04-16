import { useState } from 'react';
import styles from './verbsFormModal.module.css';

export default function VerbsFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    isWithHaben: false,
    index: [],
    prefix: {
      prefix: '',
      prefixIndex: [],
    },
    part1: [{ subName: '', index: [] }],
    part2: [{ subName: '', index: [], image: '' }],
    part3: { subName: '', index: [] },
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);

    closeModal();
  };

  return (
    <>
      <button onClick={openModal}>Formular öffnen</button>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>name:</label>
                <input
                  className={styles.boldText}
                  type="text"
                  name="name"
                  placeholder="Verb:"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <button type="submit">Absenden</button>
            </form>
            <button onClick={closeModal}>Abbrechen</button>
          </div>
        </div>
      )}
    </>
  );
}
