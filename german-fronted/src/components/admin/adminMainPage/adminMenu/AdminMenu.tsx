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
} from '../../../assets/adminPageIconMenu/imports';

export default function AdminMenu() {
  return (
    <div className={styles.adminMemnuContainer}>
      <BtnWithIconHover
        icon={homeIcon}
        iconHover={homeIconHover}
        btnName="Home"
      />
      <BtnWithIconHover
        icon={classIcon}
        iconHover={classIconHover}
        btnName="Klasse"
      />
      <BtnWithIconHover
        icon={studentIcon}
        iconHover={studentIconHover}
        btnName="Schülern"
      />
      <BtnWithIconHover
        icon={messageIcon}
        iconHover={messageIconHover}
        btnName="Nachrichten"
      />
      <BtnWithIconHover
        icon={settingIcon}
        iconHover={settingIconHover}
        btnName="Einstellungen"
      />
      <BtnWithIconHover
        icon={editingIcon}
        iconHover={editingIconHover}
        btnName="Bearbeitung"
      />
    </div>
  );
}
