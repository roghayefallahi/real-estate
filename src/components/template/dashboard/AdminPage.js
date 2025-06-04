import AdminCard from "@/module/AdminCard";
import styles from "@/template/dashboard/AdminPage.module.css";

function AdminPage({ ads }) {
  return (
    <div>
      {ads?.length ? null : <p className={styles.text}>موردی یافت نشد!</p>}
      {ads.map((i) => (
        <AdminCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default AdminPage;
