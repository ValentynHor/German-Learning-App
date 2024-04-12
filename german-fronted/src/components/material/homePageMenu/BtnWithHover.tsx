import { useState } from 'react';

interface BtnWithHoverProps {
  href: string;
  btn: string;
  btnHover: string;
  btnName: string;
}

export default function BtnWithHover(props: BtnWithHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { href, btn, btnHover, btnName } = props;

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    <>
      <a href={href} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <img src={isHovered ? btnHover : btn} alt={btnName} />
      </a>
    </>
  );
}
