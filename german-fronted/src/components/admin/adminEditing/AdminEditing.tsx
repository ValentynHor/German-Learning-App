import styles from './adminEtiting.module.css';
import { useState } from 'react';

import iconEdit from '../../assets/adminPage/icons/icon_edit.svg';
import iconEditHover from '../../assets/adminPage/icons/icon_editHover.svg';
import iconDelete from '../../assets/adminPage/icons/icon_delete.svg';
import iconDeleteHover from '../../assets/adminPage/icons/icon_deleteHover.svg';
import iconCreate from '../../assets/adminPage/icons/icon_create.svg';
import iconCreateHover from '../../assets/adminPage/icons/icon_createHover.svg';
import VerbsEditing from './verbsEditing/VerbsEditing';
import useGetData from '../../hooks/useGetData';
import { IEditingIcons, IVerb } from '../../../data/interfaces';

const data = ['Pronomen', 'Verben beugen', 'Verben', 'Nomen', 'Adjektive'];

export default function AdminEditing() {
  let verbs: IVerb[] | undefined;
  let error: any;
  const icons: IEditingIcons = {
    iconEdit,
    iconEditHover,
    iconDelete,
    iconDeleteHover,
    iconCreate,
    iconCreateHover,
  };

  const [activeButton, setActiveButton] = useState<string>('');

  const dataResponse = useGetData('http://localhost:8080/german/verbs/list');

  if (dataResponse && dataResponse.status === 'success') {
    verbs = dataResponse.data;
  } else if (dataResponse && dataResponse.status === 'error') {
    error = dataResponse.error;
  }

  const handleOnClick = (name: string) => {
    setActiveButton(name);
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
                {verbs && (
                  <div>
                    {verbs!.map((item) => (
                      <div key={item.name}>
                        <VerbsEditing verb={item} icons={icons} />
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
