import styles from './navigationButton.module.css';
import arrow from '../assets/navMenu/arrowNavMenu.svg';

interface NavigationButtonProps {
  onClickNext: () => void;
  onClickBack: () => void;
}

export default function NavigationButton(props: NavigationButtonProps) {
  const { onClickNext, onClickBack } = props;

  return (
    <div className={styles.arrowContainer}>
      <button className={styles.btnBack} onClick={onClickBack}>
        <img src={arrow} alt="arrow back" />
      </button>
      <button className={styles.btnNext} onClick={onClickNext}>
        <img src={arrow} alt="arrow next" />
      </button>
    </div>
  );
}
