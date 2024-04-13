import styles from './navbarMenu.module.css';
import { Link } from 'react-router-dom';

interface MenuProps {
  color: 'black' | 'white';
}

export default function NavbarMenu(props: MenuProps) {
  const menuColorClass =
    props.color === 'black' ? styles.menuColorBlack : styles.menuColorWhite;

  return (
    <nav className={`${styles.menu} ${menuColorClass}`}>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/#sectionAboutUs">Über uns</Link>
      </p>
      <p>
        <Link to="/#sectionMaterial">Material</Link>
      </p>
      <p>
        <Link to="/#sectionTheme">Themen</Link>
      </p>
    </nav>
  );
}
