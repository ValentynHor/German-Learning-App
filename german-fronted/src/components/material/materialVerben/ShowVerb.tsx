import styles from './showVerb.module.css';
import { useEffect, useState } from 'react';
import { verbs } from '../../../data/verbs';
import { pronouns } from '../../../data/verbs';

import arrow from '../../assets/material/verbs/arrowNavMenu.svg';

interface ShowVerbProps {
  index: number;
}

export default function ShowVerb(props: ShowVerbProps) {
  const { index } = props;
  const name = verbs[index].name;
  const count = verbs[index].part2.length;
  const [part1Ind, setPart1Ind] = useState<number>(0);
  const [showMenu0, setShowMenu0] = useState<boolean>(true);
  const [showMenu1, setShowMenu1] = useState<boolean>(false);

  //Images loading
  const [images, setImages] = useState<(string | null)[]>(
    Array.from({ length: count }, () => null)
  );
  useEffect(() => {
    const loadImages = async () => {
      try {
        const loadedImages = await Promise.all(
          Array.from({ length: count }, async (_, i) => {
            const { default: imgSrc } = await import(
              `./verbs/${name}/${name}${i}.jpg`
            );
            return imgSrc;
          })
        );
        setImages(loadedImages);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };
    loadImages();
  }, [name, count]);

  //Verrotet Buchstaben
  const renderStyledWord = (name: string, arr: number[]) => {
    return (
      <>
        {name.split('').map((letter, ind) => (
          <span
            key={ind}
            style={{
              color: arr.includes(ind) ? '#ee1515' : '#202020',
            }}
          >
            {letter}
          </span>
        ))}
      </>
    );
  };

  const handleClickToMenu1 = () => {
    setShowMenu0(false);
    setShowMenu1(true);
  };
  const handleClickToMenu0 = () => {};
  const handleClickToMenu2 = () => {
    setShowMenu0(false);
    setShowMenu1(true);
  };

  const handleBtnPart1 = () => {
    setPart1Ind((prevIndex) => (prevIndex + 1) % verbs[index].part1.length);
  };

  return (
    <>
      {showMenu0 && (
        <>
          <div className={styles.part0}>
            <h3>{renderStyledWord(name, verbs[index].index)}</h3>
            {images[0] && <img src={images[0]} alt={`${name}`} />}
          </div>
          <div className={styles.arrow}>
            <button className={styles.btnNext} onClick={handleClickToMenu1}>
              <img src={arrow} alt="arrow next" />
            </button>
          </div>
        </>
      )}

      {showMenu1 && (
        <>
          <div className={styles.part1}>
            <button onClick={handleBtnPart1}>
              <h3>{pronouns[part1Ind]}</h3>
              <h3>
                {renderStyledWord(
                  verbs[index].part1[part1Ind].subName,
                  verbs[index].part1[part1Ind].index
                )}
              </h3>
            </button>
          </div>
          <div className={styles.arrow}>
            <button className={styles.btnNext} onClick={handleClickToMenu2}>
              <img src={arrow} alt="arrow next" />
            </button>
            <button className={styles.btnBack} onClick={handleClickToMenu0}>
              <img src={arrow} alt="arrow next" />
            </button>
          </div>
        </>
      )}
    </>
  );
}
