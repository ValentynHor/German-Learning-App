import styles from './grammarTabelle.module.css';
import icon from '../assets/tabelle_pfeil.svg';

export default function GrammarTable() {
  return (
    <section id="sectionMaterial" className={styles.tabelleContainer}>
      <h3>
        Bevor Sie mit dem Lernen beginnen, machen Sie sich mit dem Lernstoff
        vertraut. Ich habe Tabellen für Sie vorbereitet, in denen Sie Antworten
        auf alle Grammatikfragen finden.
      </h3>
      <img src={icon} alt="icon lightning bolt arrow" />
      <button>Click</button>
    </section>
  );
}
