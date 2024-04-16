import styles from './adminSidebar.module.css';
import logo from '../../../assets/admin_logo.svg';
import AdminMenu from '../adminMenu/AdminMenu';
import {
  logoutIcon,
  logoutIconHover,
} from '../../../assets/adminPage/pageIconMenu/imports';
import BtnWithIconHover from '../../../btnWithIconHover/BtnWithIconHover';

type AdminSidebarProps = {
  setName: (name: string) => void;
};

export default function AdminSidebar(props: AdminSidebarProps) {
  return (
    <>
      <div className={styles.sidebar}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.menuContainer}>
          <AdminMenu setName={props.setName} />
          <div className={styles.logoutBtn}>
            <BtnWithIconHover
              setName={props.setName}
              icon={logoutIcon}
              iconHover={logoutIconHover}
              btnName="Log out"
              active={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
