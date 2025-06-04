import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import LogoutBtn from "@/module/LogoutBtn";
import styles from "./DashboardSidebar.module.css";

async function DashboardSidebar({ children, role, email }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
          <CgProfile />
          {role === "ADMIN" ? <div>ادمین</div> : null}
          <p>{email}</p>
          <span></span>
     
        <Link href="/dashboard">حساب کاربری</Link>
        <Link href="/dashboard/my-ads">آگهی های من</Link>
        <Link href="/dashboard/post-ad">ثبت آگهی</Link>
        {role === "ADMIN" ? (
          <Link href="/dashboard/admin">در انتظار تایید</Link>
        ) : null}
        <LogoutBtn />
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default DashboardSidebar;
