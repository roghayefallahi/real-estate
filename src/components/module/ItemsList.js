import styles from "@/module/ItemsList.module.css";

function ItemsList({ data }) {
  
  return (
    <div className={styles.container}>
      {data.length ? (
        <ul>
          {data.map((d, index) => (
            <li key={index}>{d}</li>
          ))}
        </ul>
      ) : (
        <p>هیچ موردی ذکر نشده است.</p>
      )}
    </div>
  );
}

export default ItemsList;
