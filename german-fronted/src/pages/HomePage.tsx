import { Material, Header, Cta } from '../imports';
import { AboutUs, GrammarTable, Footer } from '../imports';
import styles from './containers.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <Header />
      <Cta />
      <AboutUs />
      <GrammarTable />
      <Material />
      <Footer />
    </div>
  );
}
