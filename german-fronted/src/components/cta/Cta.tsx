import styles from './cta.module.css';
import picture from '../assets/cta/cta.svg';

export default function Cta() {
  return (
    <div className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.ctaLeft}>
          <h1>Lerne ganz einfach Deutsch!</h1>
          <p>Bei uns lernst du mühelos Grammatik.</p>
          <button>Los</button>
        </div>
        <div className={styles.ctaRight}>
          <img src={picture} alt="call to action- ukrainian and german" />
        </div>
      </div>
    </div>
  );
}
