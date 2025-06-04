"use client";

import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import styles from "@/module/LogoutBtn.module.css";

function LogoutBtn() {
  return (
    <button className={styles.button} onClick={signOut}>
      <FiLogOut />
      خروج
    </button>
  );
}

export default LogoutBtn;
