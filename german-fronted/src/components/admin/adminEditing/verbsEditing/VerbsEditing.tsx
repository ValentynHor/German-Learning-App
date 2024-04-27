import { IEditingIcons, IVerb } from '../../../../data/interfaces';
import { useModal } from '../../../modalWindow/confirmModal/ModalContext';
import styles from './verbsEditing.module.css';
import { useState } from 'react';

import VerbsFormModal from './VerbsFormModal';

type BtnAdminEditingProps = {
  icons: IEditingIcons;
  verb: IVerb;
};

const initialHovered = {
  isHovered1: false,
  isHovered2: false,
  isHovered3: false,
};

export default function VerbsEditing(props: BtnAdminEditingProps) {
  const { verb, icons } = props;

  const verbName = verb.name;
  const verbId = verb.id;
  const newVerb: IVerb = {
    name: '',
    withHaben: true,
    index: '',
    prefix: {
      prefix: '',
      prefixIndex: '',
    },
    image: '',
    part1: [
      {
        subName: '',
        index: '',
      },
      {
        subName: '',
        index: '',
      },
      {
        subName: '',
        index: '',
      },
    ],
    part2: [
      {
        subName: '',
        index: '',
        image: '',
      },
    ],
    part3: { subName: '', index: '' },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [hovered, setHovered] = useState(initialHovered);
  const { openModal } = useModal();

  const handleMouseOver = (key: string) => {
    setHovered({ ...hovered, [key]: true });
  };
  const handleMouseOut = (key: string) => {
    setHovered(initialHovered);
  };

  const handleEdit = () => {
    setIsUpdate(true);
    setIsOpen(true);
  };

  const handleDelete = (id: string | undefined) => {
    console.log('Deleting:', id);
    openModal('Warnung', 'Verb ' + id + ' wird gelöscht', 'Bestätigen');
  };

  const handleAdd = () => {
    setIsUpdate(false);
    setIsOpen(true);
  };

  return (
    <>
      <button
        className={styles.adminEditingButton}
        onMouseOver={() => handleMouseOver('isHovered3')}
        onMouseOut={() => handleMouseOut('isHovered3')}
        onClick={handleAdd}
      >
        <span>Verb hinzufügen</span>
        <img
          src={hovered.isHovered3 ? icons.iconCreateHover : icons.iconCreate}
          alt="create"
        />
      </button>
      <div className={styles.adminEditingButton}>
        <span>{verbName}</span>
        <div className={styles.icons}>
          <button
            onMouseOver={() => handleMouseOver('isHovered1')}
            onMouseOut={() => handleMouseOut('isHovered1')}
            onClick={handleEdit}
          >
            <img
              src={hovered.isHovered1 ? icons.iconEditHover : icons.iconEdit}
              alt="edit"
            />
          </button>
          <button
            onMouseOver={() => handleMouseOver('isHovered2')}
            onMouseOut={() => handleMouseOut('isHovered2')}
            onClick={() => handleDelete(verbId)}
          >
            <img
              src={
                hovered.isHovered2 ? icons.iconDeleteHover : icons.iconDelete
              }
              alt="delete"
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <VerbsFormModal
          setIsOpen={setIsOpen}
          verb={isUpdate ? verb : newVerb}
        />
      )}
    </>
  );
}
