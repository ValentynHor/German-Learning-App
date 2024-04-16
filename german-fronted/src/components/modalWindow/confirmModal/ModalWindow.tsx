import { useModal } from './ModalContext';
import styles from './modal.module.css';

// interface ModalInfo {
//   isOpen: boolean;
//   title: string;
//   text: string;
//   confirmButtonText?: string;
//   onConfirm?: () => void;
// }

export default function ModalWindow() {
  const { modalInfo, closeModal } = useModal();

  const handleConfirmButtonClick = () => {
    if (modalInfo.onConfirm) {
      modalInfo.onConfirm();
    }
  };

  return modalInfo.isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>{modalInfo.title}</h2>
        <p className={styles.p}>{modalInfo.text}</p>
        <div className={styles.row}>
          <div>
            {modalInfo.confirmButtonText && (
              <button
                className={styles.button}
                onClick={handleConfirmButtonClick}
              >
                {modalInfo.confirmButtonText}
              </button>
            )}
          </div>
          <div>
            <button className={styles.button} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
