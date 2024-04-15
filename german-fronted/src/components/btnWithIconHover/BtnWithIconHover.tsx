import { useState } from 'react';
import styles from './btnWithIconHover.module.css';

interface BtnWithIconHoverProps {
  icon: string;
  iconHover: string;
  btnName: string;
}

export default function BtnWithIconHover(props: BtnWithIconHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { icon, iconHover, btnName } = props;

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    <div className={styles.adminPageButton}>
      <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <img src={isHovered ? iconHover : icon} alt={btnName} />
        {btnName}
      </button>
    </div>
  );
}
