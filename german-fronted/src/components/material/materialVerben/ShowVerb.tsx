import styles from './showVerb.module.css';
import { useEffect, useState } from 'react';
import { verbs } from '../../../data/verbs';
import { pronouns } from '../../../data/verbs';
import NavigationButton from '../../navBtn/NavigationButton';
import { sentsWithHaben } from '../../../data/verbs';
import { sentsWithSein } from '../../../data/verbs';

interface ShowVerbProps {
  index: number;
  setShowVerb: (value: boolean) => void;
  setShowTop: (value: boolean) => void;
}

export default function ShowVerb(props: ShowVerbProps) {
  const { index } = props;
  const name = verbs[index].name;
  const count = verbs[index].part2.length;
  const [part1Ind, setPart1Ind] = useState<number>(0);
  const [part2Ind, setPart2Ind] = useState<number>(0);
  const [showMenu0, setShowMenu0] = useState<boolean>(true);
  const [showMenu1, setShowMenu1] = useState<boolean>(false);
  const [showMenu2, setShowMenu2] = useState<boolean>(false);
  const [showMenu3, setShowMenu3] = useState<boolean>(false);

  //Images loading
  const [images, setImages] = useState<(string | undefined)[]>(
    Array.from({ length: count }, () => null) as any[]
  );
  useEffect(() => {
    const loadImages = async () => {
      try {
        const loadedImages = await Promise.all(
          Array.from({ length: count + 1 }, async (_, i) => {
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

  const handleClickToMenu0 = () => {
    setShowMenu0(true);
    setShowMenu1(false);
  };
  const handleClickToMenu1 = () => {
    setShowMenu0(false);
    setShowMenu1(true);
    setShowMenu2(false);
  };
  const handleClickToMenu2 = () => {
    setShowMenu1(false);
    setShowMenu2(true);
    setShowMenu3(false);
  };
  const handleClickToMenu3 = () => {
    setShowMenu0(false);
    setShowMenu2(false);
    setShowMenu3(true);
  };
  const handleClickToVerbsMenu = () => {
    props.setShowVerb(false);
    props.setShowTop(true);
  };

  const handleBtnPart1 = () => {
    setPart1Ind((prevIndex) => (prevIndex + 1) % verbs[index].part1.length);
  };

  const handleBtnPart2 = () => {
    setPart2Ind((prevIndex) => (prevIndex + 1) % verbs[index].part2.length);
  };

  return (
    <>
      {showMenu0 && (
        <>
          <div className={styles.part}>
            <h3>{renderStyledWord(name, verbs[index].index)}</h3>
            <img src={images[0]} alt={`${name}`} />
          </div>
          <NavigationButton
            onClickBack={handleClickToVerbsMenu}
            onClickNext={handleClickToMenu1}
          />
        </>
      )}

      {showMenu1 && (
        <>
          <div className={styles.part}>
            <button onClick={handleBtnPart1}>
              <h3>{pronouns[part1Ind]}</h3>
              <h3>
                {renderStyledWord(
                  verbs[index].part1[part1Ind].subName,
                  verbs[index].part1[part1Ind].index
                )}
              </h3>
              {verbs[index].prefix && (
                <h3>
                  {renderStyledWord(
                    verbs[index].prefix!.prefix,
                    verbs[index].prefix!.prefixIndex
                  )}
                </h3>
              )}
            </button>
          </div>
          <NavigationButton
            onClickBack={handleClickToMenu0}
            onClickNext={handleClickToMenu2}
          />
        </>
      )}

      {showMenu2 && (
        <>
          <div className={styles.part2}>
            <button onClick={handleBtnPart1}>
              <h3>
                {pronouns[part1Ind]}
                <span> </span>
                {renderStyledWord(
                  verbs[index].part1[part1Ind].subName,
                  verbs[index].part1[part1Ind].index
                )}
              </h3>
            </button>
            <button onClick={handleBtnPart2}>
              <h3>
                {renderStyledWord(
                  verbs[index].part2[part2Ind].subName,
                  verbs[index].part2[part2Ind].index
                )}
                <span> </span>
                {verbs[index].prefix && (
                  <>
                    {renderStyledWord(
                      verbs[index].prefix!.prefix,
                      verbs[index].prefix!.prefixIndex
                    )}
                  </>
                )}
              </h3>
              <img src={images[part2Ind + 1]} alt={`${name}`} />
            </button>
          </div>
          <NavigationButton
            onClickBack={handleClickToMenu1}
            onClickNext={handleClickToMenu3}
          />
        </>
      )}

      {showMenu3 && (
        <>
          <div className={styles.part2}>
            <button onClick={handleBtnPart1}>
              <h3>
                {pronouns[part1Ind]}
                <span> </span>
                {verbs[index].isWithHaben
                  ? renderStyledWord(
                      sentsWithHaben[part1Ind].name,
                      sentsWithHaben[part1Ind].index
                    )
                  : renderStyledWord(
                      sentsWithSein[part1Ind].name,
                      sentsWithSein[part1Ind].index
                    )}
              </h3>
            </button>
            <button onClick={handleBtnPart2}>
              <img src={images[part2Ind + 1]} alt={`${name}`} />
            </button>
            <h3>
              {renderStyledWord(
                verbs[index].part3.subName,
                verbs[index].part3.index
              )}
            </h3>
          </div>
          <NavigationButton
            onClickBack={handleClickToMenu2}
            onClickNext={handleClickToVerbsMenu}
          />
        </>
      )}
    </>
  );
}
