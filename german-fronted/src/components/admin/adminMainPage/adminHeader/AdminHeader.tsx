import styles from './adminHeader.module.css';
import avatar from '../../../assets/adminPage/AvatarBild.jpg';
import hand from '../../../assets/adminPage/handIcon.svg';

export default function AdminHeader() {
  const name = 'Valentyn';
  const fullName = 'Valentyn Hordiychuk';
  const role = 'Admin';
  return (
    <header className={styles.header}>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcome}>
          <h1>Willkommen, {name}</h1>
          <img src={hand} alt="hand" />
        </div>
        <p>
          Ihr Webservice wartet auf Ihr Talent und Ihre Kreativität. Zeigen Sie
          ihm, wozu Sie fähig sind!
        </p>
      </div>
      <div className={styles.userDetails}>
        <img src={avatar} alt="avatar" />
        <div>
          <h2>{fullName}</h2>
          <p>{role}</p>
        </div>
      </div>
    </header>
  );
}
