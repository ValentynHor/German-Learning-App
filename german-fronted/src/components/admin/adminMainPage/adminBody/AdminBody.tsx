import styles from './adminBody.module.css';

import {
  AdminClass,
  AdminEditing,
  AdminHome,
  AdminMessage,
  AdminSetting,
  AdminStudent,
} from '../imports';

type AdminBodyProps = {
  name: string;
};

export default function AdminBody(props: AdminBodyProps) {
  const { name } = props;

  const render = (btnName: string): React.ReactNode => {
    switch (btnName) {
      case 'Home':
        return <AdminHome />;
      case 'Klasse':
        return <AdminClass />;
      case 'Schülern':
        return <AdminStudent />;
      case 'Nachrichten':
        return <AdminMessage />;
      case 'Einstellungen':
        return <AdminSetting />;
      case 'Bearbeitung':
        return <AdminEditing />;
      case 'Log out':
        return <h1>Log Out</h1>;
      default:
        return <></>;
    }
  };
  return <>{render(name)}</>;
}
