import logo from '../assets/header_logo.svg';
import NavbarMenu from '../navbarMenu/NavbarMenu';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" />
      <NavbarMenu color="black" />

      <div className={styles.buttons}>
        <button className={styles.btnDEU}>DEU</button>
        <button className={styles.btnLogIn}>Log in</button>
      </div>
    </header>
  );
}
