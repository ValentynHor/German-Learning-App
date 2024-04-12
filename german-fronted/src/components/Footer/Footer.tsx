import logo from '../assets/footer_logo.svg';
import NavbarMenu from '../navbarMenu/NavbarMenu';

import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt="logo" />
      <NavbarMenu color="white" />
      <div className={styles.email}>
        <p>Kontaktiere uns</p>
        <button>Email &gt;</button>
      </div>
    </footer>
  );
}
