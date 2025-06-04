import { p2e } from "@/utils/replaceNumber";
import styles from "@/module/TextInput.module.css";

function TextInput({ title, name, adData, setAdData, textarea = false }) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAdData({ ...adData, [name]: p2e(value) });
  };
  return (
    <div className={styles.container}>
      <p>{title}</p>
      {textarea ? (
        <textarea
          type="text"
          name={name}
          value={adData[name]}
          onChange={changeHandler}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={adData[name]}
          onChange={changeHandler}
        />
      )}
    </div>
  );
}

export default TextInput;
