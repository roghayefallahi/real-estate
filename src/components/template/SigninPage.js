"use client";

import Link from "next/link";
import { useState } from "react";
import Loader from "@/module/Loader";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import styles from "@/template/SignupPage.module.css";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signinHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div className={styles.form}>
        <h4>فرم ورود</h4>
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

          {loading ? (
            <Loader />
          ) : (
            <button type="submit" onClick={signinHandler}>
              ورود
            </button>
          )}
        </form>
        <p>
          حساب کاربری ندارید؟
          <Link href="/signup">ثبت نام</Link>
        </p>
      </div>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default SigninPage;
