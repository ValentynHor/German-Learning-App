import styles from './navbarMenu.module.css';

interface MenuProps {
  color: 'black' | 'white';
}

export default function NavbarMenu(props: MenuProps) {
  const menuColorClass =
    props.color === 'black' ? styles.menuColorBlack : styles.menuColorWhite;

  return (
    <nav className={`${styles.menu} ${menuColorClass}`}>
      <p>
        <a href="/">Home</a>
      </p>
      <p>
        <a href="/">Über uns</a>
      </p>
      <p>
        <a href="src/components/navbarMenu/NavbarMenu#sectionMaterial">
          Material
        </a>
      </p>
      <p>
        <a href="src/components/navbarMenu/NavbarMenu#sectionTheme">Themen</a>
      </p>
    </nav>
  );
}
