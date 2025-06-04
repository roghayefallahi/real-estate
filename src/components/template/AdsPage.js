import Card from "@/module/Card";
import Sidebar from "@/module/Sidebar";
import styles from "@/template/AdsPage.module.css";

function AdsPage({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        {data.length ? null : (
          <p className={styles.text}>هیچ آگهی ثبت نشده است!</p>
        )}
        {data.map((ad) => (
          <Card key={ad._id} data={ad} />
        ))}
      </div>
    </div>
  );
}

export default AdsPage;
