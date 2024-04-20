import { IVerb } from '../../../../data/interfaces';
import { useModal } from '../../../modalWindow/confirmModal/ModalContext';
import VerbsFormModal from '../../../modalWindow/verbsFormModal/VerbsFormModal';
import styles from './btnAdminEditing.module.css';
import { useState } from 'react';

type BtnAdminEditingProps = {
  verbName: string;
  verbId: string | undefined;
  iconEdit: string;
  iconEditHover: string;
  iconDelete: string;
  iconDeleteHover: string;
  setIsOpen: (e: boolean) => void;
  setIsUpdate: (data: boolean) => void;
};

export default function BtnAdminEditing(props: BtnAdminEditingProps) {
  const {
    verbName,
    verbId,
    iconEdit,
    iconEditHover,
    iconDelete,
    iconDeleteHover,
    setIsOpen,
    setIsUpdate,
  } = props;
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

  const handleEdit = () => {
    setIsUpdate(true);
    setIsOpen(true);
  };

  const handleDelete = (id: string | undefined) => {
    console.log('Deleting:', id);
    openModal('Warnung', 'Verb ' + id + ' wird gelöscht', 'Bestätigen');
  };

  return (
    <div className={styles.adminEditingButton}>
      <span>{verbName}</span>
      <div className={styles.icons}>
        <button
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleEdit}
        >
          <img src={isHovered ? iconEditHover : iconEdit} alt="edit" />
        </button>
        <button
          onMouseOver={handleMouseOver2}
          onMouseOut={handleMouseOut2}
          onClick={() => handleDelete(verbId)}
        >
          <img src={isHovered2 ? iconDeleteHover : iconDelete} alt="delete" />
        </button>
      </div>
    </div>
  );
}
