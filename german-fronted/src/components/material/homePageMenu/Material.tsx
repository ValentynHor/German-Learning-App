import BtnWithHover from './BtnWithHover';
import styles from './material.module.css';

import {
  btnPronomen,
  btnPronomenHover,
  btnAdjektive,
  btnAdjektiveHover,
  btnNomen,
  btnNomenHover,
  btnVerben,
  btnVerbenHover,
  btnVerbenBeugen,
  btnVerbenBeugenHover,
  arrows,
} from '../../assets/material/btnMenu/importSvgForMaterielMenu';

//Themen!
export default function Material() {
  return (
    <section id="sectionTheme" className={styles.themeContainer}>
      <h3>Themen</h3>

      <img className={styles.arrows} src={arrows} alt="arrows" />
      <div className={styles.headerContainer}>
        <BtnWithHover
          href="#sectionTheme"
          btn={btnPronomen}
          btnHover={btnPronomenHover}
          btnName="Menuknopf für Pronomen"
        />
        <BtnWithHover
          href="/verbs"
          btn={btnVerben}
          btnHover={btnVerbenHover}
          btnName="Menuknopf für Verben"
        />
        <BtnWithHover
          href="#sectionTheme"
          btn={btnAdjektive}
          btnHover={btnAdjektiveHover}
          btnName="Menuknopf für Adjektive"
        />
      </div>
      <div className={styles.footerContainer}>
        <BtnWithHover
          href="#sectionTheme"
          btn={btnVerbenBeugen}
          btnHover={btnVerbenBeugenHover}
          btnName="Menuknopf für Verben beugen"
        />
        <BtnWithHover
          href="#sectionTheme"
          btn={btnNomen}
          btnHover={btnNomenHover}
          btnName="Menuknopf für Nomen"
        />
      </div>
    </section>
  );
}
