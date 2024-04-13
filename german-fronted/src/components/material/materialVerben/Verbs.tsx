import styles from './verbs.module.css';
import pic from '../../assets/material/verbs/mainVerb.jpg';
import { verbs } from '../../../data/verbs';
import { useState } from 'react';
import ShowVerb from './ShowVerb';
import BreadCrumbs from '../../breadcrumbs/BreadCrumbs';

export default function Verbs() {
  const [showTop, setShowTop] = useState<boolean>(true);
  const [currentVerbIndex, setCurrentVerbIndex] = useState<number>(0);
  const [showVerb, setShowVerb] = useState<boolean>(false);
  const [breadCrumbs, setBreadCrumbs] = useState(['Home', 'Themen', 'Verben']);

  const handleVerbClick = (index: number): void => {
    setCurrentVerbIndex(index);
    setShowTop(false);
    if (breadCrumbs.length === 4) {
      setBreadCrumbs((prevBreadCrumbs) => {
        const updatedBreadCrumbs = [...prevBreadCrumbs];
        updatedBreadCrumbs[3] = verbs[index].name;
        return updatedBreadCrumbs;
      });
    } else {
      setBreadCrumbs((prevBreadCrumbs) => [
        ...prevBreadCrumbs,
        verbs[index].name,
      ]);
    }
    setShowVerb(true);
  };

  return (
    <>
      <div className={styles.verbsBreadCrumbs}>
        <BreadCrumbs breadCrumbs={breadCrumbs} />
      </div>
      <div className={styles.verbs}>
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
        {showVerb && (
          <ShowVerb
            index={currentVerbIndex}
            setShowVerb={setShowVerb}
            setShowTop={setShowTop}
          />
        )}
      </div>
    </>
  );
}
