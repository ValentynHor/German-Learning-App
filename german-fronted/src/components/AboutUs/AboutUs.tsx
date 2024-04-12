import styles from './aboutUs.module.css';
import icon1 from '../assets/aboutUs/aboutUs_icon1.svg';
import icon2 from '../assets/aboutUs/aboutUs_icon2.svg';
import icon3 from '../assets/aboutUs/aboutUs_icon3.svg';
import icon4 from '../assets/aboutUs/aboutUs_icon4.svg';

export default function AboutUs() {
  return (
    <section id="sectionAboutUs" className={styles.aboutUsContainer}>
      <h3>
        Starten Sie noch heute Ihr Deutschlernabenteuer mit unserer
        benutzerfreundlichen und effektiven App
      </h3>
      <div className={styles.iconsContainer}>
        <div className={styles.icon}>
          <img src={icon1} alt="icon taddy" />
          <p>
            Vergessen Sie langweilige Lehrbücher - lernen Sie Deutsch auf
            spielerische Weise
          </p>
        </div>
        <div className={styles.icon}>
          <img src={icon2} alt="icon computer" />
          <p>
            Tauchen Sie ein in eine Welt voller interaktiver Übungen und
            spannender Lektionen mit unserer benutzerfreundlichen App.
          </p>
        </div>
        <div className={styles.icon}>
          <img src={icon3} alt="icon men" />
          <p>
            Ob Anfänger oder Fortgeschrittener, unsere App ist für alle, die
            Deutsch lernen möchten, geeignet.
          </p>
        </div>
        <div className={styles.icon}>
          <img src={icon4} alt="icon window" />
          <p>
            Mit leicht verständlichen Tabellen und praktischen Übungen macht
            unsere App das Deutschlernen zu einem spannenden Erlebnis.
          </p>
        </div>
      </div>
    </section>
  );
}
