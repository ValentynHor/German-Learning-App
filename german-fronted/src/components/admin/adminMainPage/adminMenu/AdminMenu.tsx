import BtnWithIconHover from './btnWithIconHover/BtnWithIconHover';
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

  const buttons = [
    {
      icon: homeIcon,
      iconHover: homeIconHover,
      btnName: 'Home',
    },
    {
      icon: classIcon,
      iconHover: classIconHover,
      btnName: 'Klasse',
    },
    {
      icon: studentIcon,
      iconHover: studentIconHover,
      btnName: 'Schülern',
    },
    {
      icon: messageIcon,
      iconHover: messageIconHover,
      btnName: 'Nachrichten',
    },
    {
      icon: settingIcon,
      iconHover: settingIconHover,
      btnName: 'Einstellungen',
    },
    {
      icon: editingIcon,
      iconHover: editingIconHover,
      btnName: 'Bearbeitung',
    },
  ];

  const handleButtonClick = (name: string) => {
    setName(name);
    setActiveButton(name);
  };

  return (
    <div className={styles.adminMemnuContainer}>
      {buttons.map((button, index) => (
        <BtnWithIconHover
          key={index}
          icon={button.icon}
          iconHover={button.iconHover}
          btnName={button.btnName}
          setName={handleButtonClick}
          active={activeButton === button.btnName}
        />
      ))}
    </div>
  );
}
