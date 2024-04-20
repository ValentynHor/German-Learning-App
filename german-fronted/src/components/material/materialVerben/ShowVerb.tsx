import styles from './showVerb.module.css';
import { useState } from 'react';
import NavigationButton from '../../navBtn/NavigationButton';
import { pronouns } from '../../../data/verbs';
import { sentsWithHaben } from '../../../data/verbs';
import { sentsWithSein } from '../../../data/verbs';
import { IVerb } from '../../../data/interfaces';
// import { verbs } from '../../../data/verbs';

interface ShowVerbProps {
  verb: IVerb;
  setShowVerb: (value: boolean) => void;
  setShowTop: (value: boolean) => void;
}

export default function ShowVerb(props: ShowVerbProps) {
  const verb = props.verb;
  const name = verb.name;
  const [part1Ind, setPart1Ind] = useState<number>(0);
  const [part2Ind, setPart2Ind] = useState<number>(0);
  const [showMenu0, setShowMenu0] = useState<boolean>(true);
  const [showMenu1, setShowMenu1] = useState<boolean>(false);
  const [showMenu2, setShowMenu2] = useState<boolean>(false);
  const [showMenu3, setShowMenu3] = useState<boolean>(false);

  //Images loading
  const imageUrls = verb.part2.map((item) => {
    if (typeof item.image === 'string') {
      return JSON.parse(item.image);
    }
  });

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
    setPart1Ind((prevIndex) => (prevIndex + 1) % verb.part1.length);
  };

  const handleBtnPart2 = () => {
    setPart2Ind((prevIndex) => (prevIndex + 1) % verb.part2.length);
  };

  return (
    <>
      {showMenu0 && (
        <>
          <div className={styles.part}>
            <h3>{renderStyledWord(name, verb.index as number[])}</h3>
            <img src={JSON.parse(verb.image)} alt={`${name}`} />
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
                  verb.part1[part1Ind].subName,
                  verb.part1[part1Ind].index as number[]
                )}
              </h3>
              {verb.prefix && (
                <h3>
                  {renderStyledWord(
                    verb.prefix!.prefix,
                    verb.prefix!.prefixIndex as number[]
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
                  verb.part1[part1Ind].subName,
                  verb.part1[part1Ind].index as number[]
                )}
              </h3>
            </button>
            <button onClick={handleBtnPart2}>
              <h3>
                {renderStyledWord(
                  verb.part2[part2Ind].subName,
                  verb.part2[part2Ind].index as number[]
                )}
                <span> </span>
                {verb.prefix && (
                  <>
                    {renderStyledWord(
                      verb.prefix!.prefix,
                      verb.prefix!.prefixIndex as number[]
                    )}
                  </>
                )}
              </h3>
              <img src={imageUrls[part2Ind]} alt={`${name}`} />
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
                {verb.withHaben
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
              <img src={imageUrls[part2Ind]} alt={`${name}`} />
            </button>
            <h3>
              {renderStyledWord(
                verb.part3.subName,
                verb.part3.index as number[]
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
