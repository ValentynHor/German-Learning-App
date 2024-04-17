import styles from './verbsFormModal.module.css';

type UnitVerbsForm = {
  name: string;
  index: string;
};

type UnitVerbsFormProps = {
  unitName: string;
  placeholder: string;
  verbData: UnitVerbsForm[];
  verbNumber: number;
  setVerbData: (data: UnitVerbsForm[]) => void;
};

export default function VerbsFormUnit(props: UnitVerbsFormProps) {
  const { unitName, verbNumber, verbData, setVerbData, placeholder } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedVerbData = [...verbData];
    updatedVerbData[verbNumber] = {
      ...updatedVerbData[verbNumber],
      [name]: value,
    };
    setVerbData(updatedVerbData);
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <label>{unitName + ' '}</label>
        <input
          type="text"
          name="name"
          value={verbData[verbNumber]?.name || ''}
          onChange={handleChange}
          placeholder={'   ' + placeholder}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>{'Stile' + '    '}</label>
        <input
          type="text"
          name="index"
          value={verbData[verbNumber]?.index || ''}
          onChange={handleChange}
          placeholder={'   1, 2'}
        />
      </div>
    </>
  );
}
