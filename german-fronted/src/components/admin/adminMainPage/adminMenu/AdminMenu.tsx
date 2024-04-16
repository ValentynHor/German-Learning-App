import BtnWithIconHover from '../../../btnWithIconHover/BtnWithIconHover';
import styles from './adminMenu.module.css';
import {
  homeIcon,
  homeIconHover,
  classIcon,
  classIconHover,
  studentIcon,
  studentIconHover,
  messageIcon,
  messageIconHover,
  settingIcon,
  settingIconHover,
  editingIcon,
  editingIconHover,
} from '../../../assets/adminPage/pageIconMenu/imports';
import { useState } from 'react';

type AdminMenuProps = {
  setName: (name: string) => void;
};

export default function AdminMenu(props: AdminMenuProps) {
  const [activeButton, setActiveButton] = useState<string>('');
  const { setName } = props;

  const handleButtonClick = (name: string) => {
    setName(name);
    setActiveButton(name);
  };

  return (
    <div className={styles.adminMemnuContainer}>
      <BtnWithIconHover
        icon={homeIcon}
        iconHover={homeIconHover}
        btnName="Home"
        setName={handleButtonClick}
        active={activeButton === 'Home'}
      />
      <BtnWithIconHover
        icon={classIcon}
        iconHover={classIconHover}
        btnName="Klasse"
        setName={handleButtonClick}
        active={activeButton === 'Klasse'}
      />
      <BtnWithIconHover
        icon={studentIcon}
        iconHover={studentIconHover}
        btnName="Schülern"
        setName={handleButtonClick}
        active={activeButton === 'Schülern'}
      />
      <BtnWithIconHover
        icon={messageIcon}
        iconHover={messageIconHover}
        btnName="Nachrichten"
        setName={handleButtonClick}
        active={activeButton === 'Nachrichten'}
      />
      <BtnWithIconHover
        icon={settingIcon}
        iconHover={settingIconHover}
        btnName="Einstellungen"
        setName={handleButtonClick}
        active={activeButton === 'Einstellungen'}
      />
      <BtnWithIconHover
        icon={editingIcon}
        iconHover={editingIconHover}
        btnName="Bearbeitung"
        setName={handleButtonClick}
        active={activeButton === 'Bearbeitung'}
      />
    </div>
  );
}
