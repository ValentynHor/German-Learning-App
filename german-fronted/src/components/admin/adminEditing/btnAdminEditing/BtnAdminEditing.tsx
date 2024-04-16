import { useModal } from '../../../modalWindow/confirmModal/ModalContext';
import styles from './btnAdminEditing.module.css';
import { useState } from 'react';

type BtnAdminEditingProps = {
  name: string;
  iconEdit: string;
  iconEditHover: string;
  iconDelete: string;
  iconDeleteHover: string;
};

export default function BtnAdminEditing(props: BtnAdminEditingProps) {
  const { name, iconEdit, iconEditHover, iconDelete, iconDeleteHover } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const { openModal } = useModal();

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };
  const handleMouseOver2 = () => {
    setIsHovered2(true);
  };
  const handleMouseOut2 = () => {
    setIsHovered2(false);
  };

  const handleEdit = (id: string) => {
    console.log('Editing:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting:', id);
    openModal('Warnung', 'Verb ' + id + ' wird gelöscht', 'Bestätigen');
  };

  return (
    <div className={styles.adminEditingButton}>
      <span>{name}</span>
      <div className={styles.icons}>
        <button
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={() => handleEdit(name)}
        >
          <img src={isHovered ? iconEditHover : iconEdit} alt="edit" />
        </button>
        <button
          onMouseOver={handleMouseOver2}
          onMouseOut={handleMouseOut2}
          onClick={() => handleDelete(name)}
        >
          <img src={isHovered2 ? iconDeleteHover : iconDelete} alt="delete" />
        </button>
      </div>
    </div>
  );
}
