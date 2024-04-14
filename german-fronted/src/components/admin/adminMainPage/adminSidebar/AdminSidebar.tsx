import styles from './adminSidebar.module.css';
import logo from '../../../assets/admin_logo.svg';
import AdminMenu from '../adminMenu/AdminMenu';
import icon from '../../../assets/Icon_logout.svg';

export default function AdminSidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        <img className={styles.logo} src={logo} alt="logo" />
        <AdminMenu />
        <button className={styles.logout}>
          <img src={icon} alt="logout" />
          Log out
        </button>
      </div>
    </>
  );
}
