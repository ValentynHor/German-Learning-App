import styles from './adminPage.module.css';

import {
  AdminSidebar,
  AdminBody,
  AdminHeader,
} from '../../components/admin/adminMainPage/imports';

export default function AdminPage() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.sidebar}>
          <AdminSidebar />
        </div>
        <div className={styles.bodyContainer}>
          <AdminHeader />
          <AdminBody />
        </div>
      </div>
    </>
  );
}
