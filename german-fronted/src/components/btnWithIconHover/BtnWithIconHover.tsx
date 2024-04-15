import { useState } from 'react';
import styles from './btnWithIconHover.module.css';

interface BtnWithIconHoverProps {
  icon: string;
  iconHover: string;
  btnName: string;
  setName: (name: string) => void;
}

export default function BtnWithIconHover(props: BtnWithIconHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { icon, iconHover, btnName, setName } = props;

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    <div className={styles.adminPageButton}>
      <button
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={() => setName(btnName)}
      >
        <img src={isHovered ? iconHover : icon} alt={btnName} />
        {btnName}
      </button>
    </div>
  );
}
