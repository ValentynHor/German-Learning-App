import styles from './adminEtiting.module.css';
// import { verbs } from '../../../data/verbs';
import { useEffect, useState } from 'react';

import iconEdit from '../../assets/adminPage/icons/icon_edit.svg';
import iconEditHover from '../../assets/adminPage/icons/icon_editHover.svg';
import iconDelete from '../../assets/adminPage/icons/icon_delete.svg';
import iconDeleteHover from '../../assets/adminPage/icons/icon_deleteHover.svg';
import BtnAdminEditing from './btnAdminEditing/BtnAdminEditing';
import VerbsFormModal from '../../modalWindow/verbsFormModal/VerbsFormModal';
import useGetData from '../../hooks/useGetData';
import { IVerb } from '../../../data/interfaces';

const data = ['Pronomen', 'Verben beugen', 'Verben', 'Nomen', 'Adjektive'];

export default function AdminEditing() {
  let verbs: IVerb[] | undefined;
  let error: any;
  const [isOpen, setIsOpen] = useState(false);

  const [activeButton, setActiveButton] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState(false);
  const dataResponse = useGetData('http://localhost:8080/german/verbs/list');

  if (dataResponse && dataResponse.status === 'success') {
    verbs = dataResponse.data;
  } else if (dataResponse && dataResponse.status === 'error') {
    error = dataResponse.error;
  }

  const handleOnClick = (name: string) => {
    setActiveButton(name);
  };
  const openModal = () => {
    setIsUpdate(false);
    setIsOpen(true);
  };

  return (
    <>
      {error && (
        <p>
          {error.message} from {error.config.url}
        </p>
      )}
      {!verbs ? (
        <div>
          <p>...loading...</p>
        </div>
      ) : verbs.length === 0 ? (
        <div>
          <p>Liste ist leer</p>
        </div>
      ) : (
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
                <button onClick={openModal}>Verb erstellen</button>
                {verbs && (
                  <div>
                    {verbs!.map((item) => (
                      <div key={item.name}>
                        <BtnAdminEditing
                          verbName={item.name}
                          verbId={item.id}
                          iconEdit={iconEdit}
                          iconEditHover={iconEditHover}
                          iconDelete={iconDelete}
                          iconDeleteHover={iconDeleteHover}
                          setIsOpen={setIsOpen}
                          setIsUpdate={setIsUpdate}
                        />
                        {isOpen && (
                          <VerbsFormModal
                            key={item.name}
                            setIsOpen={setIsOpen}
                            isOpen={isOpen}
                            verb={item}
                            isUpdate={isUpdate}
                            setIsUpdate={setIsUpdate}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
