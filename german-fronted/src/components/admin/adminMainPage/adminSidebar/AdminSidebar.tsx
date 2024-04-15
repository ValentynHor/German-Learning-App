import styles from './adminSidebar.module.css';
import logo from '../../../assets/admin_logo.svg';
import AdminMenu from '../adminMenu/AdminMenu';
import {
  logoutIcon,
  logoutIconHover,
} from '../../../assets/adminPageIconMenu/imports';

import BtnWithIconHover from '../../../btnWithIconHover/BtnWithIconHover';

export default function AdminSidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.menuContainer}>
          <AdminMenu />
          <div className={styles.logoutBtn}>
            <BtnWithIconHover
              icon={logoutIcon}
              iconHover={logoutIconHover}
              btnName="Log out"
            />
          </div>
        </div>
      </div>
    </>
  );
}
