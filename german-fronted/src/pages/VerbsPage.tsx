import Verbs from '../components/material/materialVerben/Verbs';
import { Footer, Header } from '../imports';
import styles from './containers.module.css';

export default function VerbsPage() {
  return (
    <div className={styles.verbsPage}>
      <Header />
      <Verbs />
      <Footer />
    </div>
  );
}
