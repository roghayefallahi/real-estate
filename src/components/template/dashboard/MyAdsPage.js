import DashboardCard from "@/module/DashboardCard";
import styles from "@/template/dashboard/MyAdsPage.module.css";

function MyAdsPage({ ads }) {
  return (
    <div>
      {ads.length ? null : (
        <p className={styles.text}>هیچ آگهی ثبت نشده است!</p>
      )}
      {ads.map((i) => (
        <DashboardCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default MyAdsPage;
