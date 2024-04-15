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

type AdminMenuProps = {
  setName: (name: string) => void;
};

export default function AdminMenu(props: AdminMenuProps) {
  const { setName } = props;
  return (
    <div className={styles.adminMemnuContainer}>
      <BtnWithIconHover
        icon={homeIcon}
        iconHover={homeIconHover}
        btnName="Home"
        setName={setName}
      />
      <BtnWithIconHover
        icon={classIcon}
        iconHover={classIconHover}
        btnName="Klasse"
        setName={setName}
      />
      <BtnWithIconHover
        icon={studentIcon}
        iconHover={studentIconHover}
        btnName="Schülern"
        setName={setName}
      />
      <BtnWithIconHover
        icon={messageIcon}
        iconHover={messageIconHover}
        btnName="Nachrichten"
        setName={setName}
      />
      <BtnWithIconHover
        icon={settingIcon}
        iconHover={settingIconHover}
        btnName="Einstellungen"
        setName={setName}
      />
      <BtnWithIconHover
        icon={editingIcon}
        iconHover={editingIconHover}
        btnName="Bearbeitung"
        setName={setName}
      />
    </div>
  );
}
