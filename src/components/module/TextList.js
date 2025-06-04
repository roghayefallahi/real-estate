import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

import styles from "@/module/TextList.module.css";

function TextList({ title, adData, setAdData, type }) {
  const changeHandler = (e, index) => {
    const { value } = e.target;
    const list = [...adData[type]];
    list[index] = value;
    setAdData({ ...adData, [type]: list });
  };

  const deleteHandler = (index) => {
    const list = [...adData[type]];
    list.splice(index, 1);
    setAdData({ ...adData, [type]: list });
  };

  const addHandler = () => {
    setAdData({ ...adData, [type]: [...adData[type], ""] });
  };

  return (
    <div className={styles.container}>
      <p>{title}</p>
      {adData[type].map((i, index) => (
        <div className={styles.card} key={index}>
          <input
            type="text"
            value={i}
            onChange={(e) => changeHandler(e, index)}
          />
          <button onClick={() => deleteHandler(index)}>
            حذف
            <AiOutlineDelete />
          </button>
        </div>
      ))}

      <button onClick={addHandler}>
        افزودن
        <MdOutlineLibraryAdd />
      </button>
    </div>
  );
}

export default TextList;
