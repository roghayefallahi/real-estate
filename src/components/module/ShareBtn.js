"use client";

import { useEffect, useState } from "react";
import { LuShare2 } from "react-icons/lu";
import styles from "@/module/ShareBtn.module.css";

function ShareBtn() {
  const [url, setUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container} onClick={handleCopy}>
        <LuShare2 />
        <button>اشتراک گذاری</button>
      </div>
      {isCopied && <div className={styles.message}>لینک کپی شد!</div>}
    </section>
  );
}

export default ShareBtn;
