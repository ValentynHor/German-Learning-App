
import styles from './adminEtiting.module.css';

const data = ['Pronomen', 'Verben beugen', 'Verben', 'Nomen', 'Adjektive'];

export default function AdminEditing() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.tabHeader}>
        {data.map((item) => (
          <button key={item}>{item}</button>
        ))}
      </div>
      <div className={styles.tabContent}>body</div>
    </div>
  );
}
