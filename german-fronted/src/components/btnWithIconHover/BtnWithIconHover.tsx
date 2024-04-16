import { useState } from 'react';
import styles from './btnWithIconHover.module.css';

interface BtnWithIconHoverProps {
  icon: string;
  iconHover: string;
  btnName: string;
  setName: (name: string) => void;
  active: boolean;
}

export default function BtnWithIconHover(props: BtnWithIconHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { icon, iconHover, btnName, setName, active } = props;

  const handleMouseOver = () => {
    if (!active) {
      setIsHovered(true);
    }
  };

  const handleMouseOut = () => {
    if (!active) {
      setIsHovered(false);
    }
  };
  const handleMouseDown = () => {
    if (!active) {
      setIsHovered(true);
    }
  };

  const handleMouseUp = () => {
    if (!active) {
      setIsHovered(false);
    }
  };
  return (
    <div className={styles.adminPageButton}>
      <button
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={() => setName(btnName)}
        style={{
          backgroundColor:
            active || isHovered ? 'var(--color-bg)' : 'var(--color-bg2)',
          color:
            active || isHovered
              ? 'var(--color-text3)'
              : 'color: var(--color-bg)',
        }}
      >
        <img src={isHovered || active ? iconHover : icon} alt={btnName} />
        {btnName}
      </button>
    </div>
  );
}
