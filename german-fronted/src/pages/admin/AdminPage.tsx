import styles from './adminPage.module.css';

import {
  AdminSidebar,
  AdminBody,
  AdminHeader,
} from '../../components/admin/adminMainPage/imports';
import { useState } from 'react';

export default function AdminPage() {
  const [name, setName] = useState<string>('Home');
  return (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar setName={setName} />
      </div>
      <div className={styles.bodyContainer}>
        <AdminHeader />
        <AdminBody name={name} />
      </div>
    </div>
  );
}
