import styles from './adminEtiting.module.css';
import { verbs } from '../../../data/verbs';
import { useState } from 'react';

import iconEdit from '../../assets/adminPage/icons/icon_edit.svg';
import iconEditHover from '../../assets/adminPage/icons/icon_editHover.svg';
import iconDelete from '../../assets/adminPage/icons/icon_delete.svg';
import iconDeleteHover from '../../assets/adminPage/icons/icon_deleteHover.svg';
import BtnAdminEditing from './btnAdminEditing/BtnAdminEditing';
import VerbsFormModal from '../../modalWindow/verbsFormModal/VerbsFormModal';

const data = ['Pronomen', 'Verben beugen', 'Verben', 'Nomen', 'Adjektive'];

export default function AdminEditing() {
  const [activeButton, setActiveButton] = useState<string>('');

  const handleOnClick = (name: string) => {
    setActiveButton(name);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainMaterialsContainer}>
        {data.map((item) => (
          <button
            key={item}
            // className={styles.mainMaterial}
            className={`${styles.mainMaterial} ${
              activeButton === item ? styles.active : ''
            }`}
            onClick={() => handleOnClick(item)}
          >
            <span>{item}</span>
            <span>&gt;</span>
          </button>
        ))}
      </div>
      {activeButton === 'Verben' && (
        <>
          <div className={styles.subMaterials}>
            <div>
              {verbs.map((item) => (
                <BtnAdminEditing
                  name={item.name}
                  iconEdit={iconEdit}
                  iconEditHover={iconEditHover}
                  iconDelete={iconDelete}
                  iconDeleteHover={iconDeleteHover}
                />
              ))}
            </div>
          </div>

          <VerbsFormModal />
        </>
      )}
    </div>
  );
}
