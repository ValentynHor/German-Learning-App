import styles from './verbs.module.css';
import pic from '../../assets/material/verbs/mainVerb.jpg';
// import { verbs } from '../../../data/verbs';
import { useState } from 'react';
import ShowVerb from './ShowVerb';
import BreadCrumbs from '../../breadcrumbs/BreadCrumbs';
import useGetData from '../../hooks/useGetData';
import { IVerb } from '../../../data/interfaces';

export default function Verbs() {
  let verbs: IVerb[] | undefined;
  let error: any;

  const [showTop, setShowTop] = useState<boolean>(true);
  const [currentVerbIndex, setCurrentVerbIndex] = useState<number>(0);
  const [showVerb, setShowVerb] = useState<boolean>(false);
  const [breadCrumbs, setBreadCrumbs] = useState(['Home', 'Themen', 'Verben']);

  const dataResponse = useGetData('http://localhost:8080/german/verbs/list');
  if (dataResponse && dataResponse.status === 'success') {
    verbs = dataResponse.data;
  } else if (dataResponse && dataResponse.status === 'error') {
    error = dataResponse.error;
  }

  const handleVerbClick = (index: number): void => {
    setCurrentVerbIndex(index);
    setShowTop(false);
    if (breadCrumbs.length === 4) {
      setBreadCrumbs((prevBreadCrumbs) => {
        const updatedBreadCrumbs = [...prevBreadCrumbs];
        updatedBreadCrumbs[3] = verbs![index].name;
        return updatedBreadCrumbs;
      });
    } else {
      setBreadCrumbs((prevBreadCrumbs) => [
        ...prevBreadCrumbs,
        verbs![index].name,
      ]);
    }
    setShowVerb(true);
  };

  return (
    <>
      {error && (
        <p>
          {error.message} from {error.config.url}
        </p>
      )}
      {!verbs ? (
        <div>
          <p>...loading...</p>
        </div>
      ) : verbs.length === 0 ? (
        <div>
          <p>Liste ist leer</p>
        </div>
      ) : (
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
                verb={verbs[currentVerbIndex]}
                setShowVerb={setShowVerb}
                setShowTop={setShowTop}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
