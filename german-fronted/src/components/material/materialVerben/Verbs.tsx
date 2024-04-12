import styles from './verbs.module.css';
import pic from '../../assets/material/verbs/mainVerb.jpg';
import { verbs } from '../../../data/verbs';
import { useState } from 'react';
import ShowVerb from './ShowVerb';

export default function Verbs() {
  const [showTop, setShowTop] = useState<boolean>(true);
  const [currentVerbIndex, setCurrentVerbIndex] = useState<number>(0);
  const [showVerb, setShowVerb] = useState<boolean>(false);

  const handleVerbClick = (index: number): void => {
    setCurrentVerbIndex(index);
    setShowTop(false);
    setShowVerb(true);
  };

  return (
    <>
      <p>breadcrsumbs/shgidsh/igsdhg</p>
      {showTop && (
        <div className={styles.topContainer}>
          <h1>VERBEN</h1>
          <img src={pic} alt="ein lehrendes Mädchen" />
        </div>
      )}
      <div className={styles.verbsContainer}>
        {!showVerb && verbs && (
          <>
            {verbs.map((verb, index) => (
              <button key={index} onClick={() => handleVerbClick(index)}>
                {verb.name}
              </button>
            ))}
          </>
        )}
      </div>
      {showVerb && <ShowVerb index={currentVerbIndex} />}
    </>
  );
}
