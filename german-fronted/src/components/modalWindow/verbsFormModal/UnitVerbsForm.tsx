import styles from './verbsFormModal.module.css';

type UnitVerbsForm = {
  name: string;
  index: string;
};

type UnitVerbsFormProps = {
  unitName: string;
  setVerbData: (data: UnitVerbsForm) => void;
  verbData: UnitVerbsForm;
};

export default function VerbsFormUnit(props: UnitVerbsFormProps) {
  const { unitName, setVerbData, verbData } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVerbData({
      ...verbData,
      [name]: value,
    });
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="name"
          value={verbData.name}
          onChange={handleChange}
          placeholder={unitName}
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="index"
          value={verbData.index}
          onChange={handleChange}
          placeholder="Stile: 1,2,3"
        />
      </div>
    </>
  );
}
