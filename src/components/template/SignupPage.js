"use client";

import Link from "next/link";
import { useState } from "react";
import Loader from "@/module/Loader";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import styles from "@/template/SignupPage.module.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signupHandler = async (e) => {
    e.preventDefault();
    if (repPassword !== password) {
      toast.error("رمز و تکرار آن برابر نیست!");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);
    if (res.status === 201) {
      router.push("/signin");
    } else {
      toast.error(data.error);
    }
  };

  return (
    <>
      <div className={styles.form}>
        <h4>فرم ثبت نام</h4>
        <form>
          <label htmlFor="email">ایمیل:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">رمز عبور:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="repPassword">تکرار رمز عبور:</label>
          <input
            type="password"
            id="repPassword"
            value={repPassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          {loading ? (
            <Loader />
          ) : (
            <button type="submit" onClick={signupHandler}>
              ثبت نام
            </button>
          )}
        </form>
        <p>
          حساب کاربری دارید؟
          <Link href="/signin">ورود</Link>
        </p>
      </div>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default SignupPage;
